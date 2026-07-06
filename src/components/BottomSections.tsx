import { useState } from "react";
import Icon from "@/components/ui/icon";

const NAV_LINKS = [
  { label: "Главная", href: "#home" },
  { label: "Услуги", href: "#services" },
  { label: "Партнёрам", href: "#referral" },
  { label: "О нас", href: "#about" },
];

const CITIES = [
  "Москва", "Санкт-Петербург", "Новосибирск", "Екатеринбург", "Казань",
  "Красноярск", "Нижний Новгород", "Челябинск", "Уфа", "Самара",
  "Ростов-на-Дону", "Краснодар", "Омск", "Воронеж", "Пермь",
  "Волгоград", "Саратов", "Тюмень", "Тольятти", "Махачкала",
  "Барнаул", "Ижевск", "Хабаровск", "Ульяновск", "Иркутск",
  "Владивосток", "Ярославль", "Ставрополь", "Набережные Челны", "Томск",
  "Кемерово", "Балашиха", "Оренбург", "Новокузнецк", "Рязань",
];

export default function BottomSections() {
  return (
    <>
      {/* REFERRAL */}
      <section id="referral" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-5">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <div>
              <span className="section-label mb-4 inline-flex">
                <Icon name="Users" size={13} />
                Для партнёров
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-ink mt-3 mb-4">
                Зарабатывайте вместе с нами
              </h2>
              <p className="text-ink-light text-base leading-relaxed mb-4">
                Разместите нашу ссылку или виджет и получайте вознаграждение с каждой успешной сделки.
              </p>
              <div className="flex flex-wrap gap-2 mb-8">
                {["Автомойки", "Автосалоны", "Магазины запчастей", "Автосервисы"].map((t) => (
                  <span key={t} className="bg-orange-pale text-orange text-sm font-medium px-3 py-1.5 rounded-full">
                    {t}
                  </span>
                ))}
              </div>
              <div className="flex flex-col gap-4 mb-8">
                {[
                  { step: "01", text: "Зарегистрируйтесь за 2 минуты" },
                  { step: "02", text: "Получите уникальную ссылку и виджет" },
                  { step: "03", text: "Разместите на своём сайте" },
                  { step: "04", text: "Получайте выплаты каждую неделю" },
                ].map((s) => (
                  <div key={s.step} className="flex items-center gap-4">
                    <div className="w-9 h-9 bg-orange-pale text-orange font-display font-bold text-sm rounded-xl flex items-center justify-center shrink-0">
                      {s.step}
                    </div>
                    <span className="text-ink-mid text-base">{s.text}</span>
                  </div>
                ))}
              </div>
              <a href="https://autozix.ru/ref/U2FsdGVkX18wNmYxNzI3MQIMAQ%3D%3D" target="_blank" rel="noopener noreferrer">
                <button className="btn-primary px-8 py-3.5 rounded-xl text-base flex items-center gap-2">
                  <Icon name="UserPlus" size={16} />
                  Стать партнёром
                </button>
              </a>
            </div>

            <div className="flex flex-col gap-4">
              <div className="bg-orange rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                    <Icon name="Shield" size={20} className="text-white" />
                  </div>
                  <div>
                    <div className="text-white/70 text-xs uppercase tracking-wide font-medium">Страхование</div>
                    <div className="text-white font-display text-lg font-bold">ОСАГО для партнёров</div>
                  </div>
                </div>
                <p className="text-white/85 text-sm leading-relaxed mb-4">
                  Оформление полиса ОСАГО через все страховые компании с AI-распознаванием документов.
                </p>
                <div className="bg-white/15 rounded-xl px-4 py-3 flex items-center justify-between">
                  <span className="text-white/80 text-sm">Комиссия с каждого полиса</span>
                  <span className="text-white font-display text-xl font-bold">до 20%</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {[
                  { val: "до 20%", label: "Комиссия" },
                  { val: "500+", label: "Партнёров" },
                  { val: "24/7", label: "Поддержка" },
                ].map((stat) => (
                  <div key={stat.label} className="bg-orange-pale rounded-2xl p-4 text-center">
                    <div className="font-display text-xl font-bold text-orange">{stat.val}</div>
                    <div className="text-xs text-ink-light mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-16 bg-surface-3">
        <div className="max-w-7xl mx-auto px-5">
          <div className="max-w-2xl">
            <span className="section-label mb-4 inline-flex">
              <Icon name="Info" size={13} />
              О платформе
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-ink mt-3 mb-4">
              Всё для вашего автомобиля — в одном месте
            </h2>
            <p className="text-ink-light text-base leading-relaxed mb-6">
              АвтоПартнёр — это сервис, где можно быстро оформить страховку, проверить историю
              подержанного авто, купить машину из Китая, Кореи или Японии (в том числе на аукционах),
              а также найти покупателя на свой автомобиль.
            </p>
            <p className="text-ink-light text-base leading-relaxed mb-8">
              Работаем с 2020 года. Оформили более 50 000 полисов ОСАГО.
              Без скрытых комиссий — платите только то, что видите на экране.
            </p>
            <div className="flex flex-wrap gap-4">
              {[
                { icon: "Award", text: "Лицензия ЦБ РФ" },
                { icon: "Lock", text: "Безопасные платежи" },
                { icon: "Headphones", text: "Поддержка 24/7" },
                { icon: "RotateCcw", text: "Возврат, если что" },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-2 bg-white rounded-xl px-4 py-2.5 text-sm text-ink-mid border border-surface-4">
                  <Icon name={item.icon} size={15} className="text-orange" />
                  {item.text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CITIES */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-5">
          <span className="section-label mb-4 inline-flex">
            <Icon name="MapPin" size={13} />
            География работы
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-ink mt-3 mb-4">
            Работаем по всей России
          </h2>
          <p className="text-ink-light text-base leading-relaxed mb-6 max-w-2xl">
            Оформляем ОСАГО и КАСКО онлайн, а также организуем доставку автомобилей
            из Кореи, Китая и Японии под ключ в городах:
          </p>
          <div className="flex flex-wrap gap-2">
            {CITIES.map((city) => (
              <span key={city} className="bg-surface-3 text-ink-mid text-sm px-3.5 py-1.5 rounded-full">
                {city}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <div className="py-16 bg-orange relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-10"
          style={{ backgroundImage: "radial-gradient(circle at 20% 50%, white 0%, transparent 50%), radial-gradient(circle at 80% 50%, white 0%, transparent 40%)" }} />
        <div className="max-w-3xl mx-auto px-5 text-center relative">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            Оформите ОСАГО прямо сейчас
          </h2>
          <p className="text-white/80 text-lg mb-8">−15% при онлайн-оформлении. Полис придёт на почту за 5 минут.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://autozix.ru/link/TElOS19fZTExY2NhMTBXBFE=" target="_blank" rel="noopener noreferrer">
              <button className="bg-white text-orange font-bold px-10 py-4 rounded-xl text-base hover:bg-orange-pale transition-colors">
                Рассчитать стоимость
              </button>
            </a>
            <a href="tel:+79237716465">
              <button className="border-2 border-white text-white font-semibold px-10 py-4 rounded-xl text-base hover:bg-white/10 transition-colors">
                Позвонить: +7 923-771-6465
              </button>
            </a>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="py-10 bg-ink">
        <div className="max-w-7xl mx-auto px-5 flex flex-col md:flex-row items-center justify-between gap-5">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 bg-orange rounded-lg flex items-center justify-center">
              <Icon name="Car" size={14} className="text-white" />
            </div>
            <span className="font-display text-lg font-bold text-white tracking-wide">
              МагСибЗап<span className="text-orange"> Авто</span>
            </span>
          </div>
          <div className="flex flex-wrap gap-6 justify-center">
            {NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href}
                className="text-white/40 text-sm hover:text-white transition-colors">{link.label}</a>
            ))}
          </div>
          <div className="flex flex-col items-center md:items-end gap-2">
            <p className="text-white/25 text-xs">© {new Date().getFullYear()} МагСибЗап Авто</p>
          </div>
        </div>
      </footer>

      {/* CHAT */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
        <div className="flex items-end gap-3">
          {/* Кнопка чата — Telegram-бот */}
          <a
            href="https://t.me/magsibzap_auto_bot"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary w-14 h-14 rounded-full flex items-center justify-center shadow-lg relative"
            title="Написать в Telegram"
          >
            <Icon name="Send" size={22} />
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center text-[10px] text-white font-bold">1</span>
          </a>
        </div>
      </div>
    </>
  );
}