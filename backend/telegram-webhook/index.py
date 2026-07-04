import json
import os
from datetime import datetime, timedelta

import psycopg2
import urllib.request

SCHEMA = os.environ.get('MAIN_DB_SCHEMA', 'public')
BOT_TOKEN = os.environ.get('TELEGRAM_BOT_TOKEN', '')
ADMIN_SECRET_CODE = os.environ.get('ADMIN_SECRET_CODE', '')


def get_conn():
    return psycopg2.connect(os.environ['DATABASE_URL'])


def send_message(chat_id, text):
    if not BOT_TOKEN:
        return
    url = f"https://api.telegram.org/bot{BOT_TOKEN}/sendMessage"
    data = json.dumps({'chat_id': chat_id, 'text': text}).encode('utf-8')
    req = urllib.request.Request(url, data=data, headers={'Content-Type': 'application/json'})
    try:
        urllib.request.urlopen(req, timeout=5)
    except Exception:
        pass


def handler(event: dict, context) -> dict:
    """Webhook для приёма обновлений от Telegram-бота: обработка команды /start
    с токеном входа, команды /admin для регистрации администратора и текстовых
    сообщений клиента как обращений в чат поддержки."""
    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
            },
            'body': '',
        }

    headers = {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'}
    params = event.get('queryStringParameters') or {}

    if event.get('httpMethod') == 'GET' and params.get('action') == 'set-webhook':
        webhook_url = params.get('url', '')
        if not webhook_url or not BOT_TOKEN:
            return {'statusCode': 400, 'headers': headers, 'body': json.dumps({'error': 'missing url or token'})}
        api_url = f"https://api.telegram.org/bot{BOT_TOKEN}/setWebhook"
        data = json.dumps({'url': webhook_url}).encode('utf-8')
        req = urllib.request.Request(api_url, data=data, headers={'Content-Type': 'application/json'})
        try:
            resp = urllib.request.urlopen(req, timeout=10)
            result = json.loads(resp.read().decode('utf-8'))
        except Exception as e:
            result = {'ok': False, 'error': str(e)}
        return {'statusCode': 200, 'headers': headers, 'body': json.dumps(result)}

    body_raw = event.get('body') or '{}'
    try:
        update = json.loads(body_raw)
    except json.JSONDecodeError:
        return {'statusCode': 200, 'headers': headers, 'body': json.dumps({'ok': True})}

    message = update.get('message') or {}
    chat = message.get('chat') or {}
    chat_id = chat.get('id')
    text = (message.get('text') or '').strip()
    from_user = message.get('from') or {}
    first_name = from_user.get('first_name', '')
    username = from_user.get('username', '')

    if not chat_id:
        return {'statusCode': 200, 'headers': headers, 'body': json.dumps({'ok': True})}

    conn = get_conn()
    cur = conn.cursor()

    try:
        if text.startswith('/start'):
            parts = text.split(maxsplit=1)
            token = parts[1] if len(parts) > 1 else ''

            cur.execute(
                f"SELECT id FROM {SCHEMA}.users WHERE telegram_chat_id = %s",
                (chat_id,),
            )
            row = cur.fetchone()
            if row:
                user_id = row[0]
                cur.execute(
                    f"UPDATE {SCHEMA}.users SET telegram_username = %s, first_name = COALESCE(first_name, %s) WHERE id = %s",
                    (username, first_name, user_id),
                )
            else:
                cur.execute(
                    f"""INSERT INTO {SCHEMA}.users (telegram_chat_id, telegram_username, first_name)
                        VALUES (%s, %s, %s) RETURNING id""",
                    (chat_id, username, first_name),
                )
                user_id = cur.fetchone()[0]
            conn.commit()

            if token:
                cur.execute(
                    f"""SELECT status, expires_at FROM {SCHEMA}.login_sessions WHERE token = %s""",
                    (token,),
                )
                session_row = cur.fetchone()
                if session_row and session_row[1] > datetime.utcnow():
                    import secrets as pysecrets
                    import string as pystring
                    alphabet = pystring.ascii_letters + pystring.digits
                    session_token = ''.join(pysecrets.choice(alphabet) for _ in range(40))
                    cur.execute(
                        f"""UPDATE {SCHEMA}.login_sessions
                            SET status = 'confirmed', telegram_chat_id = %s, user_id = %s, session_token = %s
                            WHERE token = %s""",
                        (chat_id, user_id, session_token, token),
                    )
                    conn.commit()
                    send_message(chat_id, "Вы успешно вошли в личный кабинет МагСибЗап Авто! Можете вернуться на сайт.")
                else:
                    send_message(chat_id, "Ссылка для входа устарела. Запросите новую на сайте.")
            else:
                send_message(chat_id, "Привет! Это бот МагСибЗап Авто. Для входа в личный кабинет перейдите по ссылке с сайта.")

            return {'statusCode': 200, 'headers': headers, 'body': json.dumps({'ok': True})}

        if text.startswith('/admin'):
            parts = text.split(maxsplit=1)
            code = parts[1].strip() if len(parts) > 1 else ''
            if ADMIN_SECRET_CODE and code == ADMIN_SECRET_CODE.strip():
                cur.execute(
                    f"INSERT INTO {SCHEMA}.settings (key, value) VALUES ('admin_chat_id', %s) "
                    f"ON CONFLICT (key) DO UPDATE SET value = %s",
                    (str(chat_id), str(chat_id)),
                )
                conn.commit()
                send_message(chat_id, "Вы зарегистрированы как администратор чата поддержки.")
            else:
                send_message(chat_id, "Неверный код администратора.")
            return {'statusCode': 200, 'headers': headers, 'body': json.dumps({'ok': True})}

        cur.execute(
            f"SELECT id FROM {SCHEMA}.users WHERE telegram_chat_id = %s",
            (chat_id,),
        )
        row = cur.fetchone()

        cur.execute(f"SELECT value FROM {SCHEMA}.settings WHERE key = 'admin_chat_id'")
        admin_row = cur.fetchone()
        admin_chat_id = admin_row[0] if admin_row else None

        if admin_chat_id and str(chat_id) == str(admin_chat_id):
            if text.startswith('/reply'):
                parts = text.split(maxsplit=2)
                if len(parts) >= 3:
                    target_user_id = parts[1]
                    reply_text = parts[2]
                    cur.execute(
                        f"""INSERT INTO {SCHEMA}.messages (user_id, sender, text) VALUES (%s, 'manager', %s)""",
                        (target_user_id, reply_text),
                    )
                    conn.commit()
                    cur.execute(
                        f"SELECT telegram_chat_id FROM {SCHEMA}.users WHERE id = %s",
                        (target_user_id,),
                    )
                    target_row = cur.fetchone()
                    if target_row and target_row[0]:
                        send_message(target_row[0], f"Менеджер: {reply_text}")
                    send_message(chat_id, "Ответ отправлен клиенту.")
                else:
                    send_message(chat_id, "Формат: /reply user_id текст_ответа")
            return {'statusCode': 200, 'headers': headers, 'body': json.dumps({'ok': True})}

        if row and text:
            user_id = row[0]
            cur.execute(
                f"""INSERT INTO {SCHEMA}.messages (user_id, sender, text) VALUES (%s, 'client', %s)""",
                (user_id, text),
            )
            conn.commit()
            if admin_chat_id:
                send_message(admin_chat_id, f"Новое сообщение от клиента #{user_id} ({first_name}):\n{text}\n\nОтветить: /reply {user_id} текст")
            send_message(chat_id, "Спасибо! Ваше сообщение передано менеджеру. Ответ появится в личном кабинете и здесь.")

        return {'statusCode': 200, 'headers': headers, 'body': json.dumps({'ok': True})}
    finally:
        cur.close()
        conn.close()