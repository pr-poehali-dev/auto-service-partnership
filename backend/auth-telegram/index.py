import json
import os
import secrets
import string
from datetime import datetime, timedelta

import psycopg2
import urllib.request
import urllib.parse

SCHEMA = os.environ.get('MAIN_DB_SCHEMA', 'public')
BOT_USERNAME = 'magsibzap_auto_bot'


def get_conn():
    return psycopg2.connect(os.environ['DATABASE_URL'])


def gen_token(length=32):
    alphabet = string.ascii_letters + string.digits
    return ''.join(secrets.choice(alphabet) for _ in range(length))


def handler(event: dict, context) -> dict:
    """Авторизация клиента через Telegram-бота: создание сессии входа,
    проверка статуса подтверждения и получение данных текущего пользователя."""
    method = event.get('httpMethod', 'GET')

    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-Session-Token',
                'Access-Control-Max-Age': '86400',
            },
            'body': '',
        }

    headers = {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'}
    params = event.get('queryStringParameters') or {}
    action = params.get('action', '')
    body_raw = event.get('body') or '{}'
    try:
        body = json.loads(body_raw) if body_raw else {}
    except json.JSONDecodeError:
        body = {}

    conn = get_conn()
    cur = conn.cursor()

    try:
        if action == 'start' and method == 'POST':
            token = gen_token()
            expires_at = datetime.utcnow() + timedelta(minutes=10)
            cur.execute(
                f"INSERT INTO {SCHEMA}.login_sessions (token, status, expires_at) VALUES (%s, 'pending', %s)",
                (token, expires_at),
            )
            conn.commit()
            deep_link = f"https://t.me/{BOT_USERNAME}?start={token}"
            return {
                'statusCode': 200,
                'headers': headers,
                'body': json.dumps({'token': token, 'deep_link': deep_link}),
            }

        if action == 'status' and method == 'GET':
            token = params.get('token', '')
            cur.execute(
                f"SELECT status, session_token FROM {SCHEMA}.login_sessions WHERE token = %s",
                (token,),
            )
            row = cur.fetchone()
            if not row:
                return {'statusCode': 404, 'headers': headers, 'body': json.dumps({'error': 'not_found'})}
            status, session_token = row
            return {
                'statusCode': 200,
                'headers': headers,
                'body': json.dumps({'status': status, 'session_token': session_token}),
            }

        if action == 'me' and method == 'GET':
            session_token = event.get('headers', {}).get('X-Session-Token') or params.get('session_token', '')
            cur.execute(
                f"""SELECT u.id, u.first_name, u.phone, u.telegram_username
                    FROM {SCHEMA}.login_sessions ls
                    JOIN {SCHEMA}.users u ON u.id = ls.user_id
                    WHERE ls.session_token = %s AND ls.status = 'confirmed'""",
                (session_token,),
            )
            row = cur.fetchone()
            if not row:
                return {'statusCode': 401, 'headers': headers, 'body': json.dumps({'error': 'unauthorized'})}
            user_id, first_name, phone, tg_username = row
            return {
                'statusCode': 200,
                'headers': headers,
                'body': json.dumps({
                    'id': user_id,
                    'first_name': first_name,
                    'phone': phone,
                    'telegram_username': tg_username,
                }),
            }

        if action == 'update-profile' and method == 'POST':
            session_token = event.get('headers', {}).get('X-Session-Token') or body.get('session_token', '')
            first_name = body.get('first_name', '')
            phone = body.get('phone', '')
            cur.execute(
                f"""SELECT user_id FROM {SCHEMA}.login_sessions
                    WHERE session_token = %s AND status = 'confirmed'""",
                (session_token,),
            )
            row = cur.fetchone()
            if not row:
                return {'statusCode': 401, 'headers': headers, 'body': json.dumps({'error': 'unauthorized'})}
            user_id = row[0]
            cur.execute(
                f"UPDATE {SCHEMA}.users SET first_name = %s, phone = %s WHERE id = %s",
                (first_name, phone, user_id),
            )
            conn.commit()
            return {'statusCode': 200, 'headers': headers, 'body': json.dumps({'success': True})}

        return {'statusCode': 400, 'headers': headers, 'body': json.dumps({'error': 'unknown_action'})}
    finally:
        cur.close()
        conn.close()
