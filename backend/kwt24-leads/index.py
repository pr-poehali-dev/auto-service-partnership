import json
import os

import psycopg2

SCHEMA = os.environ.get('MAIN_DB_SCHEMA', 'public')


def get_conn():
    return psycopg2.connect(os.environ['DATABASE_URL'])


def handler(event: dict, context) -> dict:
    """Приём заявок с формы технологического присоединения (kWt24):
    сохранение в БД и уведомление администратора в Telegram."""
    method = event.get('httpMethod', 'GET')

    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400',
            },
            'body': '',
        }

    headers = {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'}

    if method != 'POST':
        return {'statusCode': 405, 'headers': headers, 'body': json.dumps({'error': 'method_not_allowed'})}

    body_raw = event.get('body') or '{}'
    try:
        body = json.loads(body_raw)
    except json.JSONDecodeError:
        return {'statusCode': 400, 'headers': headers, 'body': json.dumps({'error': 'invalid_json'})}

    name = (body.get('name') or '').strip()
    phone = (body.get('phone') or '').strip()
    comment = (body.get('comment') or '').strip()

    if not name or not phone:
        return {'statusCode': 400, 'headers': headers, 'body': json.dumps({'error': 'name_and_phone_required'})}

    conn = get_conn()
    cur = conn.cursor()
    try:
        cur.execute(
            f"""INSERT INTO {SCHEMA}.kwt24_leads (name, phone, comment)
                VALUES (%s, %s, %s) RETURNING id, created_at""",
            (name, phone, comment),
        )
        row = cur.fetchone()
        conn.commit()

        cur.execute(f"SELECT value FROM {SCHEMA}.settings WHERE key = 'admin_chat_id'")
        admin_row = cur.fetchone()
        if admin_row:
            import urllib.request
            bot_token = os.environ.get('TELEGRAM_BOT_TOKEN', '')
            if bot_token:
                text = f"Новая заявка kWt24 (технологическое присоединение):\nИмя: {name}\nТелефон: {phone}"
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
