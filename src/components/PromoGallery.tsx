import Icon from "@/components/ui/icon";

const PROMO_ITEMS = [
  {
    image: "https://cdn.poehali.dev/projects/77b19e44-bfe9-4fb0-8874-b004bc1f4262/files/e3e1a5c6-4337-44cb-93ea-f0e7f413f766.jpg",
    icon: "Car",
    tag: "🇰🇷 Корея",
    title: "Авто из Кореи под ключ",
    desc: "Официальная таможня и документы",
    link: "https://autozix.ru/ordauto/catalog",
  },
  {
    image: "https://cdn.poehali.dev/projects/77b19e44-bfe9-4fb0-8874-b004bc1f4262/files/af9a3770-c294-455b-a6d8-81b69f1743c7.jpg",
    icon: "Car",
    tag: "🇨🇳 Китай",
    title: "Авто из Китая под ключ",
    desc: "Haval, Chery, Geely, BYD и другие",
    link: "https://autozix.ru/ordauto/catalog",
  },
  {
    image: "https://cdn.poehali.dev/projects/77b19e44-bfe9-4fb0-8874-b004bc1f4262/files/9c9dbd1c-a6f6-4461-a8b9-ef5b6c936cd3.jpg",
    icon: "Sparkles",
    tag: "🇯🇵 Япония",
    title: "Авто из Японии — скидка 20 000 ₽",
    desc: "Покупка напрямую на аукционах Японии",
    link: "https://autozix.ru/ordauto/catalog",
    badge: "-20 000 ₽",
  },
  {
    image: "https://cdn.poehali.dev/projects/77b19e44-bfe9-4fb0-8874-b004bc1f4262/files/f4318011-e98e-4e5a-aeda-e71959c12207.jpg",
    icon: "Shield",
    tag: "ОСАГО",
    title: "ОСАГО онлайн за 5 минут",
    desc: "Сравниваем цены сразу в 17 компаниях",
    link: "https://autozix.ru/link/TElOS19fZTExY2NhMTBXBFE=",
  },
  {
    image: "https://cdn.poehali.dev/projects/77b19e44-bfe9-4fb0-8874-b004bc1f4262/files/dfcd757f-6f14-4f3c-a4fa-0488bfb5fbc7.jpg",
    icon: "ShieldCheck",
    tag: "КАСКО",
    title: "КАСКО онлайн за 5 минут",
    desc: "Подбор из 15 страховых компаний",
    link: "https://autozix.ru/link/TElOS19fZTExY2NhMTBXBFE=",
  },
  {
    image: "https://cdn.poehali.dev/projects/77b19e44-bfe9-4fb0-8874-b004bc1f4262/files/474e4ae7-b637-48d1-b88e-7ca7cf2b86cf.jpg",
    icon: "Globe",
    tag: "Импорт авто",
    title: "Китай, Корея, Япония",
    desc: "Выбирайте страну — привезём под ключ",
    link: "https://autozix.ru/ordauto/catalog",
  },
  {
    image: "https://cdn.poehali.dev/projects/77b19e44-bfe9-4fb0-8874-b004bc1f4262/files/04b8d6a9-14d3-477a-86ca-5face6ee098f.jpg",
    icon: "MapPin",
    tag: "Вся Россия",
    title: "Авто под ключ по всей России",
    desc: "Доставка в любой регион страны",
    link: "#cities",
  },
  {
    image: "https://cdn.poehali.dev/projects/77b19e44-bfe9-4fb0-8874-b004bc1f4262/files/4d3f8f06-1737-4cbf-b90f-d081067f6714.jpg",
    icon: "Search",
    tag: "Проверка авто",
    title: "История авто за 299 ₽",
    desc: "28 пунктов проверки перед покупкой",
    link: "#services",
    badge: "299 ₽",
  },
  {
    image: "https://cdn.poehali.dev/projects/77b19e44-bfe9-4fb0-8874-b004bc1f4262/files/8f8b9edf-058e-4b75-b0e3-90cec4d6dc76.jpg",
    icon: "Handshake",
    tag: "Партнёрам",
    title: "Агентский договор — честно",
    desc: "Прозрачные и выгодные условия",
    link: "#referral",
  },
  {
    image: "https://cdn.poehali.dev/projects/77b19e44-bfe9-4fb0-8874-b004bc1f4262/files/38f26f51-6926-46ae-923b-c6b980b2558f.jpg",
    icon: "Truck",
    tag: "Доставка",
    title: "Доставка авто под ключ",
    desc: "Быстро, честно и прозрачно",
    link: "#auto-import",
  },
];

export default function PromoGallery() {
  return (
    <section id="promo" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-5">
        <div className="text-center mb-12">
          <span className="section-label inline-flex mb-4">
            <Icon name="Sparkles" size={13} />
            Наши предложения
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-ink mt-3 mb-4">
            Быстро. Честно. <span className="text-orange">Прозрачно.</span>
          </h2>
          <p className="text-ink-light text-base md:text-lg max-w-2xl mx-auto">
            Всё, что мы умеем — в одной подборке: страхование, импорт авто и выгодные условия для партнёров.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {PROMO_ITEMS.map((item) => (
            <a
              key={item.title}
              href={item.link}
              target={item.link.startsWith("http") ? "_blank" : undefined}
              rel={item.link.startsWith("http") ? "noopener noreferrer" : undefined}
              className="card-lift group relative rounded-2xl overflow-hidden border border-surface-4 h-56"
            >
              <img
                src={item.image}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {item.badge && (
                <span className="absolute top-4 right-4 bg-orange text-white text-xs font-bold uppercase tracking-wide px-2.5 py-1 rounded-full shadow-lg">
                  {item.badge}
                </span>
              )}

              <div className="absolute top-4 left-4 flex items-center gap-2 bg-white/15 backdrop-blur-sm text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                <Icon name={item.icon} size={13} />
                {item.tag}
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h3 className="font-display text-lg font-bold text-white leading-snug mb-1">
                  {item.title}
                </h3>
                <p className="text-white/80 text-sm leading-snug">{item.desc}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
