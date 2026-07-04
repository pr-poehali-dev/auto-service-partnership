import json
import os

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


def handler(event: dict, context) -> dict:
    """Личный кабинет клиента: получение списка заказов, истории сообщений
    чата с менеджером и отправка нового сообщения."""
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
