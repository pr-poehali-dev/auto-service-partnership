import Icon from "@/components/ui/icon";

const DIRECTIONS = [
  {
    id: "korea",
    flag: "🇰🇷",
    country: "Корея",
    title: "Авто из Кореи под ключ",
    subtitle: "Hyundai, Kia, Genesis и другие",
    desc: "Привозим официально. Полная стоимость: авто + доставка + таможня + СБКТС и ЭПТС до г. Уссурийск. Доставка до Москвы +200 000 ₽.",
    perks: ["Официальная таможня", "Документы под ключ", "Гарантия сделки", "Поддержка 24/7"],
    badge: "Популярно",
    badgeColor: "bg-orange text-white",
    link: "https://autozix.ru/ordauto/catalog",
    accent: "from-orange/5 to-orange/10",
    borderColor: "border-orange/20",
    iconBg: "bg-orange",
  },
  {
    id: "china",
    flag: "🇨🇳",
    country: "Китай",
    title: "Авто из Китая под ключ",
    subtitle: "Haval, Chery, Geely, BYD и другие",
    desc: "Привозим официально. Полная стоимость: авто + доставка + таможня + СБКТС и ЭПТС до г. Уссурийск. Доставка до Москвы +200 000 ₽.",
    perks: ["Официальная таможня", "Документы под ключ", "Гарантия сделки", "Поддержка 24/7"],
    badge: "Хит",
    badgeColor: "bg-red-500 text-white",
    link: "https://autozix.ru/ordauto/catalog",
    accent: "from-red-50 to-red-100/50",
    borderColor: "border-red-200",
    iconBg: "bg-red-500",
  },
];

const STEPS = [
  { num: "01", text: "Выбираете авто из каталога" },
  { num: "02", text: "Вносите предоплату — фиксируем цену" },
  { num: "03", text: "Мы доставляем и оформляем все документы" },
  { num: "04", text: "Получаете авто с ключами на руки" },
];

export default function AutoImportSection() {
  return (
    <section id="auto-import" className="py-20 bg-surface-3">
      <div className="max-w-7xl mx-auto px-5">

        {/* Header */}
        <div className="text-center mb-12">
          <span className="section-label inline-flex mb-4">
            <Icon name="Globe" size={13} />
            Импорт автомобилей
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-ink mt-3 mb-4">
            Авто из Азии — <span className="text-orange">под ключ</span>
          </h2>
          <p className="text-ink-light text-base md:text-lg max-w-2xl mx-auto">
            Привозим новые и подержанные автомобили из Кореи и Китая. Берём на себя всё: выбор, доставку, таможню и оформление документов.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-14">
          {DIRECTIONS.map((d) => (
            <div
              key={d.id}
              className={`bg-gradient-to-br ${d.accent} border ${d.borderColor} rounded-2xl p-6 md:p-8 flex flex-col gap-5 relative overflow-hidden`}
            >
              {/* Badge */}
              <span className={`absolute top-5 right-5 text-[11px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full ${d.badgeColor}`}>
                {d.badge}
              </span>

              {/* Title */}
              <div className="flex items-center gap-4">
                <div className={`w-14 h-14 ${d.iconBg} rounded-2xl flex items-center justify-center text-2xl shrink-0 shadow-lg`}>
                  {d.flag}
                </div>
                <div>
                  <div className="text-xs text-ink-light font-medium uppercase tracking-wide mb-1">{d.subtitle}</div>
                  <h3 className="font-display text-xl md:text-2xl font-bold text-ink">{d.title}</h3>
                </div>
              </div>

              {/* Desc */}
              <p className="text-ink-light text-sm md:text-base leading-relaxed">
                {d.desc}
              </p>

              {/* Perks */}
              <div className="grid grid-cols-2 gap-2">
                {d.perks.map((p) => (
                  <div key={p} className="flex items-center gap-2 text-sm text-ink-mid">
                    <Icon name="CheckCircle2" size={15} className="text-orange shrink-0" />
                    {p}
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-3 mt-2">
                <a href={d.link} target="_blank" rel="noopener noreferrer" className="flex-1">
                  <button className="btn-primary w-full px-6 py-3.5 rounded-xl text-base flex items-center justify-center gap-2">
                    <Icon name="Car" size={16} />
                    Смотреть каталог
                  </button>
                </a>
                <a href="tel:+79237716465" className="flex-1">
                  <button className="btn-secondary w-full px-6 py-3.5 rounded-xl text-base flex items-center justify-center gap-2">
                    <Icon name="Phone" size={16} />
                    Позвонить
                  </button>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* How it works */}
        <div className="bg-white rounded-2xl border border-surface-4 p-6 md:p-10">
          <div className="text-center mb-8">
            <h3 className="font-display text-2xl md:text-3xl font-bold text-ink">Как это работает</h3>
            <p className="text-ink-light text-sm mt-2">Весь процесс от выбора до ключей — под нашим контролем</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {STEPS.map((s) => (
              <div key={s.num} className="flex flex-col items-center text-center gap-3 p-4">
                <div className="w-12 h-12 bg-orange-pale text-orange font-display font-bold text-lg rounded-2xl flex items-center justify-center shrink-0">
                  {s.num}
                </div>
                <p className="text-ink-mid text-sm leading-snug">{s.text}</p>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-8">
            <a href="https://autozix.ru/ordauto/catalog" target="_blank" rel="noopener noreferrer">
              <button className="btn-primary px-10 py-4 rounded-xl text-base flex items-center gap-2">
                <Icon name="Globe" size={16} />
                Открыть каталог автомобилей
              </button>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
