INSERT INTO t_p8129092_auto_service_partner.users (telegram_chat_id, telegram_username, first_name, phone)
VALUES (2058761738, 'test_client', 'Иван', '+7 900 123-45-67')
ON CONFLICT DO NOTHING;

INSERT INTO t_p8129092_auto_service_partner.orders (user_id, title, stage, status, description)
SELECT id, 'Двигатель Toyota Camry 2.5, из Японии', 'В пути', 'in_progress', 'Контрактный двигатель 2AR-FE, пробег 45 000 км'
FROM t_p8129092_auto_service_partner.users WHERE telegram_chat_id = 2058761738;

INSERT INTO t_p8129092_auto_service_partner.orders (user_id, title, stage, status, description)
SELECT id, 'АКПП Honda CR-V', 'Готово', 'done', 'Автомат U760E, установлена и проверена'
FROM t_p8129092_auto_service_partner.users WHERE telegram_chat_id = 2058761738;

INSERT INTO t_p8129092_auto_service_partner.messages (user_id, sender, text)
SELECT id, 'client', 'Здравствуйте! Подскажите, когда придёт двигатель?'
FROM t_p8129092_auto_service_partner.users WHERE telegram_chat_id = 2058761738;

INSERT INTO t_p8129092_auto_service_partner.messages (user_id, sender, text)
SELECT id, 'manager', 'Добрый день! Двигатель уже в пути, ожидаем на складе через 5-7 дней.'
FROM t_p8129092_auto_service_partner.users WHERE telegram_chat_id = 2058761738;
