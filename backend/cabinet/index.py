import json
import os
import secrets
import string
from datetime import datetime, timedelta

import psycopg2

SCHEMA = os.environ.get('MAIN_DB_SCHEMA', 'public')


def get_conn():
    return psycopg2.connect(os.environ['DATABASE_URL'])


def get_user_id(cur, session_token):
    cur.execute(
        f"""SELECT user_id FROM {SCHEMA}.login_sessions
            WHERE session_token = %s AND status = 'confirmed'""",
        (session_token,),
    )
    row = cur.fetchone()
    return row[0] if row else None


def gen_admin_token(length=48):
    alphabet = string.ascii_letters + string.digits
    return ''.join(secrets.choice(alphabet) for _ in range(length))


def check_admin_auth(cur, admin_token):
    if not admin_token:
        return False
    cur.execute(
        f"""SELECT id FROM {SCHEMA}.admin_sessions
            WHERE token = %s AND expires_at > now()""",
        (admin_token,),
    )
    return cur.fetchone() is not None


def handler(event: dict, context) -> dict:
    """Личный кабинет клиента: получение списка заказов, истории сообщений
    чата с менеджером и отправка нового сообщения. Также обслуживает вход
    в веб-админку владельца бизнеса, приём заявок с главной страницы сайта
    (submit-lead) и объединённый список заявок из проектов МагСибЗап Авто,
    kWt24 и главной страницы с меткой источника."""
    method = event.get('httpMethod', 'GET')

    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-Session-Token, X-Admin-Token',
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

    if action == 'admin-login' and method == 'POST':
        conn = get_conn()
        cur = conn.cursor()
        try:
            password = body.get('password', '')
            correct = os.environ.get('ADMIN_PANEL_PASSWORD', '')
            if not correct or password != correct:
                return {'statusCode': 401, 'headers': headers, 'body': json.dumps({'error': 'invalid_password'})}
            token = gen_admin_token()
            expires_at = datetime.utcnow() + timedelta(days=7)
            cur.execute(
                f"INSERT INTO {SCHEMA}.admin_sessions (token, expires_at) VALUES (%s, %s)",
                (token, expires_at),
            )
            conn.commit()
            return {'statusCode': 200, 'headers': headers, 'body': json.dumps({'token': token})}
        finally:
            cur.close()
            conn.close()

    if action == 'admin-leads' and method == 'GET':
        conn = get_conn()
        cur = conn.cursor()
        try:
            admin_token = event.get('headers', {}).get('X-Admin-Token') or params.get('admin_token', '')
            if not check_admin_auth(cur, admin_token):
                return {'statusCode': 401, 'headers': headers, 'body': json.dumps({'error': 'unauthorized'})}

            cur.execute(
                f"""SELECT o.id, u.first_name, u.phone, u.telegram_username,
                           o.title, o.stage, o.status, o.description, o.created_at
                    FROM {SCHEMA}.orders o
                    JOIN {SCHEMA}.users u ON u.id = o.user_id
                    ORDER BY o.created_at DESC"""
            )
            auto_rows = cur.fetchall()
            auto_leads = [
                {
                    'source': 'magsibzap',
                    'source_label': 'МагСибЗап Авто',
                    'id': r[0],
                    'name': r[1] or r[3] or 'Клиент',
                    'phone': r[2],
                    'title': r[4],
                    'stage': r[5],
                    'status': r[6],
                    'comment': r[7],
                    'created_at': r[8].isoformat(),
                }
                for r in auto_rows
            ]

            cur.execute(
                f"""SELECT id, name, phone, comment, created_at
                    FROM {SCHEMA}.kwt24_leads ORDER BY created_at DESC"""
            )
            kwt24_rows = cur.fetchall()
            kwt24_leads = [
                {
                    'source': 'kwt24',
                    'source_label': 'kWt24',
                    'id': r[0],
                    'name': r[1],
                    'phone': r[2],
                    'title': 'Технологическое присоединение',
                    'stage': None,
                    'status': None,
                    'comment': r[3],
                    'created_at': r[4].isoformat(),
                }
                for r in kwt24_rows
            ]

            cur.execute(
                f"""SELECT id, name, phone, service, comment, created_at
                    FROM {SCHEMA}.magsibzap_leads ORDER BY created_at DESC"""
            )
            site_rows = cur.fetchall()
            site_leads = [
                {
                    'source': 'website',
                    'source_label': 'Заявка с сайта',
                    'id': r[0],
                    'name': r[1],
                    'phone': r[2],
                    'title': r[3] or 'Заявка с главной страницы',
                    'stage': None,
                    'status': None,
                    'comment': r[4],
                    'created_at': r[5].isoformat(),
                }
                for r in site_rows
            ]

            all_leads = sorted(auto_leads + kwt24_leads + site_leads, key=lambda x: x['created_at'], reverse=True)
            return {'statusCode': 200, 'headers': headers, 'body': json.dumps({'leads': all_leads})}
        finally:
            cur.close()
            conn.close()

    if action == 'submit-lead' and method == 'POST':
        website = (body.get('website') or '').strip()
        if website:
            return {'statusCode': 200, 'headers': headers, 'body': json.dumps({'id': 0, 'created_at': datetime.utcnow().isoformat()})}

        name = (body.get('name') or '').strip()
        phone = (body.get('phone') or '').strip()
        service = (body.get('service') or '').strip()
        comment = (body.get('comment') or '').strip()

        if not name or not phone:
            return {'statusCode': 400, 'headers': headers, 'body': json.dumps({'error': 'name_and_phone_required'})}
        if len(name) > 255 or len(phone) > 50 or len(service) > 100:
            return {'statusCode': 400, 'headers': headers, 'body': json.dumps({'error': 'field_too_long'})}

        conn = get_conn()
        cur = conn.cursor()
        try:
            cur.execute(
                f"""SELECT id FROM {SCHEMA}.magsibzap_leads
                    WHERE phone = %s AND created_at > now() - interval '60 seconds'""",
                (phone,),
            )
            if cur.fetchone():
                return {'statusCode': 429, 'headers': headers, 'body': json.dumps({'error': 'too_many_requests'})}

            cur.execute(
                f"""INSERT INTO {SCHEMA}.magsibzap_leads (name, phone, service, comment)
                    VALUES (%s, %s, %s, %s) RETURNING id, created_at""",
                (name, phone, service, comment),
            )
            row = cur.fetchone()
            conn.commit()

            cur.execute(f"SELECT value FROM {SCHEMA}.settings WHERE key = 'admin_chat_id'")
            admin_row = cur.fetchone()
            if admin_row:
                import urllib.request
                bot_token = os.environ.get('TELEGRAM_BOT_TOKEN', '')
                if bot_token:
                    text = "Новая заявка МагСибЗап Авто:\n"
                    if service:
                        text += f"Услуга: {service}\n"
                    text += f"Имя: {name}\nТелефон: {phone}"
                    if comment:
                        text += f"\nКомментарий: {comment}"
                    url = f"https://api.telegram.org/bot{bot_token}/sendMessage"
                    data = json.dumps({'chat_id': admin_row[0], 'text': text}).encode('utf-8')
                    req = urllib.request.Request(url, data=data, headers={'Content-Type': 'application/json'})
                    try:
                        urllib.request.urlopen(req, timeout=5)
                    except Exception:
                        pass

            return {
                'statusCode': 200,
                'headers': headers,
                'body': json.dumps({'id': row[0], 'created_at': row[1].isoformat()}),
            }
        finally:
            cur.close()
            conn.close()

    session_token = event.get('headers', {}).get('X-Session-Token') or params.get('session_token') or body.get('session_token', '')

    conn = get_conn()
    cur = conn.cursor()

    try:
        user_id = get_user_id(cur, session_token)
        if not user_id:
            return {'statusCode': 401, 'headers': headers, 'body': json.dumps({'error': 'unauthorized'})}

        if action == 'orders' and method == 'GET':
            cur.execute(
                f"""SELECT id, title, stage, status, description, created_at
                    FROM {SCHEMA}.orders WHERE user_id = %s ORDER BY created_at DESC""",
                (user_id,),
            )
            rows = cur.fetchall()
            orders = [
                {
                    'id': r[0], 'title': r[1], 'stage': r[2], 'status': r[3],
                    'description': r[4], 'created_at': r[5].isoformat(),
                }
                for r in rows
            ]
            return {'statusCode': 200, 'headers': headers, 'body': json.dumps({'orders': orders})}

        if action == 'messages' and method == 'GET':
            cur.execute(
                f"""SELECT id, sender, text, created_at FROM {SCHEMA}.messages
                    WHERE user_id = %s ORDER BY created_at ASC""",
                (user_id,),
            )
            rows = cur.fetchall()
            messages = [
                {'id': r[0], 'sender': r[1], 'text': r[2], 'created_at': r[3].isoformat()}
                for r in rows
            ]
            return {'statusCode': 200, 'headers': headers, 'body': json.dumps({'messages': messages})}

        if action == 'send-message' and method == 'POST':
            text = body.get('text', '').strip()
            if not text:
                return {'statusCode': 400, 'headers': headers, 'body': json.dumps({'error': 'empty_text'})}
            cur.execute(
                f"""INSERT INTO {SCHEMA}.messages (user_id, sender, text) VALUES (%s, 'client', %s)
                    RETURNING id, created_at""",
                (user_id, text),
            )
            row = cur.fetchone()
            conn.commit()

            cur.execute(f"SELECT value FROM {SCHEMA}.settings WHERE key = 'admin_chat_id'")
            admin_row = cur.fetchone()
            if admin_row:
                import urllib.request
                bot_token = os.environ.get('TELEGRAM_BOT_TOKEN', '')
                if bot_token:
                    url = f"https://api.telegram.org/bot{bot_token}/sendMessage"
                    data = json.dumps({
                        'chat_id': admin_row[0],
                        'text': f"Сообщение из кабинета от клиента #{user_id}:\n{text}\n\nОтветить: /reply {user_id} текст",
                    }).encode('utf-8')
                    req = urllib.request.Request(url, data=data, headers={'Content-Type': 'application/json'})
                    try:
                        urllib.request.urlopen(req, timeout=5)
                    except Exception:
                        pass

            return {
                'statusCode': 200,
                'headers': headers,
                'body': json.dumps({'id': row[0], 'created_at': row[1].isoformat()}),
            }

        return {'statusCode': 400, 'headers': headers, 'body': json.dumps({'error': 'unknown_action'})}
    finally:
        cur.close()
        conn.close()