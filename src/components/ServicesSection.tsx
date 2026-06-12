import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

function AutozixWidget({ widgetId, widgetTarget, refUrl }: { widgetId: string; widgetTarget: string; refUrl?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!containerRef.current) return;
    const script = document.createElement("script");
    script.src = "https://autozix.ru/widget/index.js";
    script.className = "autozixWidget";
    script.setAttribute("widgetId", widgetId);
    script.setAttribute("target", widgetTarget);
    if (refUrl) script.setAttribute("ref", refUrl);
    containerRef.current.appendChild(script);
    return () => { script.remove(); };
  }, [widgetId, widgetTarget, refUrl]);
  return <div ref={containerRef} />;
}

const SERVICES = [
  {
    id: "osago",
    icon: "Shield",
    label: "ОСАГО",
    tag: "Страхование",
    price: "от 2 800 ₽",
    desc: "Оформим полис за 5 минут через 17 страховых компаний. Без очередей, без переплат — всё онлайн.",
    badge: "Популярно",
    badgeColor: "bg-orange text-white",
    widgetId: "108",
    widgetTarget: "osago",
    link: "https://autozix.ru/link/TElOS19fZTExY2NhMTBXBFE=",
  },
  {
    id: "kasko",
    icon: "ShieldCheck",
    label: "КАСКО",
    tag: "Страхование",
    price: "от 18 000 ₽",
    desc: "Полная защита вашей машины. Сравниваем предложения от 17 страховых компаний.",
    badge: null,
    badgeColor: "",
    widgetId: "109",
    widgetTarget: "kasko",
    link: "https://autozix.ru/link/TElOS19fMzc2YzcwMWIIB1Y=",
  },
  {
    id: "history",
    icon: "FileSearch",
    label: "История автомобиля",
    tag: "История ТС",
    price: "от 299 ₽",
    desc: "29 параметров проверки: ДТП, пробег, владельцы, ограничения, залог и многое другое.",
    badge: "29 параметров",
    badgeColor: "bg-green-500 text-white",
    widgetId: "110",
    widgetTarget: "history",
    link: "https://autozix.ru/link/TElOS19fYjMwMWQyYWNVV1A=",
  },
  {
    id: "sale",
    icon: "Tag",
    label: "Продажа авто",
    tag: "Маркетплейс",
    price: "Индивидуально",
    desc: "Разместим ваш автомобиль на площадке и найдём покупателя. Комиссия после продажи — зависит от марки, модели и года авто.",
    badge: "Комиссия после продажи",
    badgeColor: "bg-ink text-white",
    link: "https://autozix.ru/link/TElOS19fYWRlMTYwOGICAAs=",
  },
  {
    id: "china",
    icon: "Globe",
    label: "Авто из Китая",
    tag: "Импорт",
    price: "Смотреть каталог →",
    desc: "Цена «под ключ»: авто + доставка + таможня + СБКТС и ЭПТС до г. Уссурийск. Доставка до Москвы +200 000 ₽.",
    badge: "Хит",
    badgeColor: "bg-orange text-white",
    link: "https://autozix.ru/ordauto/catalog",
  },
  {
    id: "korea",
    icon: "Anchor",
    label: "Авто из Кореи",
    tag: "Импорт",
    price: "Смотреть каталог →",
    desc: "Цена «под ключ»: авто + доставка + таможня + СБКТС и ЭПТС до г. Уссурийск. Доставка до Москвы +200 000 ₽.",
    badge: null,
    badgeColor: "",
    link: "https://autozix.ru/ordauto/catalog",
  },
];

const REVIEWS = [
  { name: "Максим К.", city: "Москва", text: "Оформил ОСАГО за 7 минут. Всё честно, без скрытых платежей. Рекомендую!", stars: 5 },
  { name: "Светлана Р.", city: "СПб", text: "Заказала авто из Кореи — всё под ключ. Помогли с таможней, привезли быстро.", stars: 5 },
  { name: "Андрей П.", city: "Казань", text: "Проверил подержанный авто перед покупкой. Нашли скрытые ДТП. Спасибо!", stars: 5 },
];

const FILTER_TAGS = ["Все", "Страхование", "История ТС", "Маркетплейс", "Импорт"];

export default function ServicesSection() {
  const [activeFilter, setActiveFilter] = useState("Все");
  const filtered = activeFilter === "Все" ? SERVICES : SERVICES.filter((s) => s.tag === activeFilter);

  return (
    <>
      {/* SERVICES */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-5">
          <div className="mb-4">
            <span className="section-label">
              <Icon name="LayoutGrid" size={13} />
              Каталог услуг
            </span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-10">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-ink mt-3">Что мы предлагаем</h2>
            <div className="flex flex-wrap gap-2">
              {FILTER_TAGS.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setActiveFilter(tag)}
                  className={`text-sm font-medium px-4 py-1.5 rounded-full border transition-all ${
                    activeFilter === tag
                      ? "bg-orange text-white border-orange"
                      : "bg-white text-ink-mid border-surface-4 hover:border-orange hover:text-orange"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((s) => (
              <div key={s.id} className={`card-lift bg-white border border-surface-4 rounded-2xl p-6 flex flex-col gap-4 relative ${"widgetId" in s && s.widgetId ? "md:col-span-2 lg:col-span-1" : ""}`}>
                {s.badge && (
                  <span className={`absolute top-5 right-5 text-[11px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full ${s.badgeColor}`}>
                    {s.badge}
                  </span>
                )}
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-orange-pale rounded-xl flex items-center justify-center">
                    <Icon name={s.icon} fallback="Shield" size={22} className="text-orange" />
                  </div>
                  <div>
                    <div className="text-xs text-ink-light font-medium">{s.tag}</div>
                    <h3 className="font-display text-lg font-bold text-ink">{s.label}</h3>
                  </div>
                </div>
                <p className="text-ink-light text-sm leading-relaxed">{s.desc}</p>
                {"widgetId" in s && s.widgetId ? (
                  <div className="flex flex-col gap-3 mt-2">
                    <AutozixWidget widgetId={s.widgetId} widgetTarget={s.widgetTarget ?? ""} refUrl={"link" in s ? s.link : undefined} />
                    {"link" in s && s.link && (
                      <div className="flex items-center justify-between pt-3 border-t border-surface-4">
                        <div>
                          <div className="text-xs text-ink-light">Стоимость</div>
                          <div className="font-display text-lg font-bold text-orange">{s.price}</div>
                        </div>
                        <a href={s.link} target="_blank" rel="noopener noreferrer">
                          <button className="btn-primary px-5 py-2 rounded-xl text-sm flex items-center gap-1.5">
                            Оформить <Icon name="ArrowRight" size={13} />
                          </button>
                        </a>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="mt-auto flex items-center justify-between pt-3 border-t border-surface-4">
                    <div>
                      <div className="text-xs text-ink-light">Стоимость</div>
                      <div className="font-display text-lg font-bold text-orange">{s.price}</div>
                    </div>
                    {"link" in s && s.link ? (
                      <a href={s.link} target="_blank" rel="noopener noreferrer">
                        <button className="btn-primary px-5 py-2 rounded-xl text-sm flex items-center gap-1.5">
                          Заказать <Icon name="ArrowRight" size={13} />
                        </button>
                      </a>
                    ) : (
                      <button className="btn-primary px-5 py-2 rounded-xl text-sm flex items-center gap-1.5">
                        Подробнее <Icon name="ArrowRight" size={13} />
                      </button>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="py-16 bg-surface-3">
        <div className="max-w-7xl mx-auto px-5">
          <div className="mb-4">
            <span className="section-label">
              <Icon name="Star" size={13} />
              Отзывы
            </span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-ink mt-3 mb-10">Что говорят клиенты</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {REVIEWS.map((r) => (
              <div key={r.name} className="card-lift bg-white rounded-2xl p-6 border border-surface-4">
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: r.stars }).map((_, i) => (
                    <Icon key={i} name="Star" size={15} className="text-orange fill-orange" />
                  ))}
                </div>
                <p className="text-ink-mid text-sm leading-relaxed mb-4">«{r.text}»</p>
                <div className="flex items-center gap-2 pt-3 border-t border-surface-4">
                  <div className="w-8 h-8 bg-orange-pale rounded-full flex items-center justify-center text-orange font-bold text-sm">
                    {r.name[0]}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-ink">{r.name}</div>
                    <div className="text-xs text-ink-light">{r.city}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
