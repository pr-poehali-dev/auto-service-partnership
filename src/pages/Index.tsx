import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

const NAV_LINKS = [
  { label: "Главная", href: "#home" },
  { label: "Услуги", href: "#services" },
  { label: "Акции", href: "#promo" },
  { label: "Партнёрам", href: "#referral" },
  { label: "О нас", href: "#about" },
];

const SERVICES = [
  {
    id: "osago",
    icon: "Shield",
    label: "ОСАГО",
    tag: "Страхование",
    price: "от 2 800 ₽",
    desc: "Оформим полис за 5 минут. Без очередей, без переплат — всё онлайн.",
    badge: "Популярно",
    badgeColor: "bg-orange text-white",
  },
  {
    id: "kasko",
    icon: "ShieldCheck",
    label: "КАСКО",
    tag: "Страхование",
    price: "от 18 000 ₽",
    desc: "Полная защита вашей машины. Сравниваем предложения от 12 страховых.",
    badge: null,
    badgeColor: "",
  },
  {
    id: "history",
    icon: "FileSearch",
    label: "Проверка авто",
    tag: "История ТС",
    price: "от 299 ₽",
    desc: "ДТП, пробег, ограничения — полный отчёт за 2 минуты.",
    badge: "Быстро",
    badgeColor: "bg-green-500 text-white",
  },
  {
    id: "sale",
    icon: "Tag",
    label: "Продажа авто",
    tag: "Маркетплейс",
    price: "Бесплатно",
    desc: "Разместите объявление — покупатели сами вас найдут.",
    badge: null,
    badgeColor: "",
  },
  {
    id: "china",
    icon: "Globe",
    label: "Авто из Китая",
    tag: "Импорт",
    price: "от 1 200 000 ₽",
    desc: "Новые китайские авто напрямую. Таможня и регистрация — включены.",
    badge: "Хит",
    badgeColor: "bg-orange text-white",
  },
  {
    id: "korea",
    icon: "Anchor",
    label: "Авто из Кореи",
    tag: "Импорт",
    price: "от 900 000 ₽",
    desc: "Надёжные корейские авто с гарантией и официальными документами.",
    badge: null,
    badgeColor: "",
  },
];

const PROMOS = [
  {
    icon: "Percent",
    title: "−15% на ОСАГО",
    desc: "При оформлении онлайн до 31 июля",
    tag: "До 31 июля",
    color: "bg-orange",
    light: false,
  },

];

const REVIEWS = [
  { name: "Максим К.", city: "Москва", text: "Оформил ОСАГО за 7 минут. Всё честно, без скрытых платежей. Рекомендую!", stars: 5 },
  { name: "Светлана Р.", city: "СПб", text: "Заказала авто из Кореи — всё под ключ. Помогли с таможней, привезли быстро.", stars: 5 },
  { name: "Андрей П.", city: "Казань", text: "Проверил подержанный авто перед покупкой. Нашли скрытые ДТП. Спасибо!", stars: 5 },
];

const FILTER_TAGS = ["Все", "Страхование", "История ТС", "Маркетплейс", "Импорт"];

const CAR_BRANDS = ["Toyota", "Kia", "Hyundai", "Chery", "Haval", "BYD", "BMW", "Mercedes"];
const REGIONS = ["Москва", "Санкт-Петербург", "Казань", "Новосибирск", "Екатеринбург", "Краснодар"];

export default function Index() {
  const [activeFilter, setActiveFilter] = useState("Все");
  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState([
    { from: "manager", text: "Привет! Помогу оформить ОСАГО, КАСКО или ответить на любой вопрос 🚗" },
  ]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  // Calculator state
  const [calcBrand, setCalcBrand] = useState("");
  const [calcRegion, setCalcRegion] = useState("");
  const [calcYear, setCalcYear] = useState("");
  const [calcPrice, setCalcPrice] = useState<number | null>(null);
  const [calcLoading, setCalcLoading] = useState(false);

  const filtered = activeFilter === "Все" ? SERVICES : SERVICES.filter((s) => s.tag === activeFilter);

  const calculateOsago = () => {
    if (!calcBrand || !calcRegion || !calcYear) return;
    setCalcLoading(true);
    setCalcPrice(null);
    setTimeout(() => {
      const base = 4500;
      const yearFactor = calcYear ? Math.max(0.7, 1 - (2024 - parseInt(calcYear)) * 0.03) : 1;
      const regionFactor = ["Москва", "Санкт-Петербург"].includes(calcRegion) ? 1.8 : 1.2;
      setCalcPrice(Math.round(base * yearFactor * regionFactor / 100) * 100);
      setCalcLoading(false);
    }, 900);
  };

  const sendMessage = () => {
    if (!chatInput.trim()) return;
    setMessages((prev) => [...prev, { from: "user", text: chatInput }]);
    setChatInput("");
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { from: "manager", text: "Принял! Менеджер ответит в течение нескольких минут. Или позвоните: 8-800-000-00-00" },
      ]);
    }, 700);
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "services", "promo", "referral", "about"];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) { setActiveSection(id); break; }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white font-body text-ink overflow-x-hidden">

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-surface-4 shadow-sm">
        <div className="max-w-7xl mx-auto px-5 py-3.5 flex items-center justify-between">
          <a href="#home" className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-orange rounded-lg flex items-center justify-center">
              <Icon name="Car" size={16} className="text-white" />
            </div>
            <span className="font-display text-xl font-bold tracking-wide text-ink">
              АВТО<span className="text-orange">ПАРТНЁР</span>
            </span>
          </a>

          <div className="hidden md:flex items-center gap-7">
            {NAV_LINKS.map((link) => {
              const id = link.href.replace("#", "");
              return (
                <a key={link.href} href={link.href}
                  className={`text-sm font-medium transition-colors ${activeSection === id ? "text-orange" : "text-ink-mid hover:text-orange"}`}>
                  {link.label}
                </a>
              );
            })}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <button className="btn-secondary text-sm px-5 py-2 rounded-lg">Войти</button>
            <button className="btn-primary text-sm px-5 py-2.5 rounded-lg">Оформить ОСАГО</button>
          </div>

          <button className="md:hidden text-ink-mid" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <Icon name={mobileMenuOpen ? "X" : "Menu"} size={22} />
          </button>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-surface-4 px-5 py-4 flex flex-col gap-4 animate-fade-in">
            {NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href}
                className="text-sm font-medium text-ink-mid hover:text-orange transition-colors"
                onClick={() => setMobileMenuOpen(false)}>{link.label}</a>
            ))}
            <button className="btn-primary text-sm px-5 py-3 rounded-lg w-full mt-1">Оформить ОСАГО</button>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="home" className="pt-20 pb-0 overflow-hidden">
        <div className="max-w-7xl mx-auto px-5">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center min-h-[90vh] py-12">

            {/* Left */}
            <div>
              <div className="mb-5 animate-fade-in-up delay-100">
                <span className="section-label">
                  <Icon name="Flame" size={13} />
                  Горячая акция — −15% на ОСАГО
                </span>
              </div>
              <h1 className="font-display text-5xl md:text-6xl font-bold leading-tight text-ink mb-5 animate-fade-in-up delay-200">
                Все авто&shy;услуги —<br />
                <span className="text-orange">быстро</span> и <span className="text-orange">дёшево</span>
              </h1>
              <p className="text-ink-light text-lg leading-relaxed mb-8 max-w-lg animate-fade-in-up delay-300">
                ОСАГО за 5 минут, КАСКО дешевле рынка, проверка авто перед покупкой, 
                машины из Китая и Кореи под ключ.
              </p>

              {/* Quick CTA buttons */}
              <div className="flex flex-wrap gap-3 mb-10 animate-fade-in-up delay-400">
                <a href="#calc">
                  <button className="btn-primary px-7 py-3.5 rounded-xl text-base flex items-center gap-2 pulse-orange">
                    <Icon name="Calculator" size={16} />
                    Рассчитать ОСАГО
                  </button>
                </a>
                <a href="#services">
                  <button className="btn-secondary px-7 py-3.5 rounded-xl text-base">
                    Все услуги
                  </button>
                </a>
              </div>

              {/* Trust badges */}
              <div className="flex flex-wrap gap-6 animate-fade-in-up delay-500">
                {[
                  { icon: "CheckCircle2", text: "Без скрытых платежей" },
                  { icon: "Clock", text: "Полис за 5 минут" },
                  { icon: "Phone", text: "8-800 бесплатно" },
                ].map((b) => (
                  <div key={b.text} className="flex items-center gap-2 text-ink-mid text-sm">
                    <Icon name={b.icon} size={16} className="text-orange" />
                    {b.text}
                  </div>
                ))}
              </div>
            </div>

            {/* Right — inline calc */}
            <div id="calc" className="animate-fade-in-up delay-300">
              <div className="bg-white rounded-2xl border-2 border-orange/15 shadow-xl p-7">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-8 h-8 bg-orange-pale rounded-lg flex items-center justify-center">
                    <Icon name="Calculator" size={16} className="text-orange" />
                  </div>
                  <span className="font-display text-xl font-semibold text-ink">Расчёт ОСАГО</span>
                </div>
                <p className="text-ink-light text-sm mb-5">Узнайте стоимость за 30 секунд</p>

                <div className="flex flex-col gap-3 mb-4">
                  <select
                    value={calcBrand}
                    onChange={(e) => setCalcBrand(e.target.value)}
                    className="input-clean"
                  >
                    <option value="">Марка автомобиля</option>
                    {CAR_BRANDS.map((b) => <option key={b} value={b}>{b}</option>)}
                  </select>
                  <select
                    value={calcRegion}
                    onChange={(e) => setCalcRegion(e.target.value)}
                    className="input-clean"
                  >
                    <option value="">Ваш регион</option>
                    {REGIONS.map((r) => <option key={r} value={r}>{r}</option>)}
                  </select>
                  <input
                    type="number"
                    value={calcYear}
                    onChange={(e) => setCalcYear(e.target.value)}
                    placeholder="Год выпуска (напр. 2019)"
                    className="input-clean"
                    min={1990}
                    max={2024}
                  />
                </div>

                {calcPrice !== null && (
                  <div className="bg-orange-pale rounded-xl p-4 mb-4 flex items-center justify-between animate-fade-in">
                    <div>
                      <div className="text-ink-light text-xs mb-0.5">Примерная стоимость</div>
                      <div className="font-display text-3xl font-bold text-orange">{calcPrice.toLocaleString("ru")} ₽</div>
                    </div>
                    <Icon name="TrendingDown" size={28} className="text-orange/40" />
                  </div>
                )}

                <button
                  onClick={calculateOsago}
                  disabled={calcLoading || !calcBrand || !calcRegion || !calcYear}
                  className="btn-primary w-full py-3.5 rounded-xl text-base font-semibold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {calcLoading ? (
                    <><Icon name="Loader" size={16} className="animate-spin" /> Считаю…</>
                  ) : (
                    <><Icon name="Zap" size={16} /> Рассчитать</>
                  )}
                </button>
                <p className="text-center text-xs text-ink-light mt-3">
                  Окончательная цена — при оформлении. Без доп. комиссий.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Orange wave divider */}
        <div style={{ background: "var(--surface-3)", marginTop: "-2px" }}>
          <div style={{
            height: "60px",
            background: "white",
            borderRadius: "0 0 50% 50% / 0 0 40px 40px",
          }} />
        </div>
      </section>

      {/* PROMOS */}
      <section id="promo" className="py-16 bg-surface-3">
        <div className="max-w-7xl mx-auto px-5">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="section-label mb-3 inline-flex">
                <Icon name="Tag" size={13} />
                Акции и скидки
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-ink mt-3">Выгодные предложения</h2>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {PROMOS.map((p) => (
              <div
                key={p.title}
                className={`card-lift rounded-2xl p-6 flex flex-col gap-3 ${p.color} ${p.light ? "border border-surface-4" : ""}`}
              >
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${p.light ? "bg-orange-pale" : "bg-white/20"}`}>
                  <Icon name={p.icon} size={20} className={p.light ? "text-orange" : "text-white"} />
                </div>
                <div className={`text-xs font-semibold uppercase tracking-wide ${p.light ? "text-orange" : "text-white/70"}`}>
                  {p.tag}
                </div>
                <h3 className={`font-display text-xl font-bold ${p.light ? "text-ink" : "text-white"}`}>{p.title}</h3>
                <p className={`text-sm leading-relaxed ${p.light ? "text-ink-light" : "text-white/80"}`}>{p.desc}</p>
                <button className={`mt-auto text-sm font-semibold flex items-center gap-1.5 ${p.light ? "text-orange" : "text-white"}`}>
                  Подробнее <Icon name="ArrowRight" size={13} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

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
              <div key={s.id} className="card-lift bg-white border border-surface-4 rounded-2xl p-6 flex flex-col gap-4 relative">
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
                <div className="mt-auto flex items-center justify-between pt-3 border-t border-surface-4">
                  <div>
                    <div className="text-xs text-ink-light">Стоимость</div>
                    <div className="font-display text-lg font-bold text-orange">{s.price}</div>
                  </div>
                  <button className="btn-primary px-5 py-2 rounded-xl text-sm flex items-center gap-1.5">
                    Подробнее <Icon name="ArrowRight" size={13} />
                  </button>
                </div>
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
              <p className="text-ink-light text-base leading-relaxed mb-8">
                Если вы владелец автосервиса, мойки или салона — разместите наш виджет на сайте 
                и получайте до 15% с каждой продажи.
              </p>
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
              <button className="btn-primary px-8 py-3.5 rounded-xl text-base">
                Подключиться бесплатно
              </button>
            </div>

            <div className="flex flex-col gap-4">
              <div className="bg-surface-3 rounded-2xl p-6 border border-surface-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-semibold text-ink">Виджет на ваш сайт</span>
                  <Icon name="Code2" size={16} className="text-ink-light" />
                </div>
                <div className="bg-ink rounded-xl p-4 font-mono text-xs leading-relaxed">
                  <span className="text-blue-300">&lt;iframe</span><br />
                  <span className="ml-4 text-gray-400">src="https://autopartner.ru/widget"</span><br />
                  <span className="ml-4 text-gray-400">ref="<span className="text-orange-light">ВАШ_КОД</span>"</span><br />
                  <span className="text-blue-300">&gt;&lt;/iframe&gt;</span>
                </div>
                <button className="btn-secondary w-full py-2.5 rounded-xl text-sm mt-4 flex items-center justify-center gap-2">
                  <Icon name="Copy" size={13} />
                  Скопировать виджет
                </button>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {[
                  { val: "до 15%", label: "Комиссия" },
                  { val: "500+", label: "Партнёров" },
                  { val: "Еженед.", label: "Выплаты" },
                ].map((stat) => (
                  <div key={stat.label} className="bg-orange-pale rounded-2xl p-4 text-center">
                    <div className="font-display text-2xl font-bold text-orange">{stat.val}</div>
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
              подержанного авто, купить машину из Китая или Кореи, а также найти покупателя на 
              свой автомобиль.
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
            <button className="bg-white text-orange font-bold px-10 py-4 rounded-xl text-base hover:bg-orange-pale transition-colors">
              Рассчитать стоимость
            </button>
            <button className="border-2 border-white text-white font-semibold px-10 py-4 rounded-xl text-base hover:bg-white/10 transition-colors">
              Позвонить: 8-800-000-00-00
            </button>
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
              АВТО<span className="text-orange">ПАРТНЁР</span>
            </span>
          </div>
          <div className="flex flex-wrap gap-6 justify-center">
            {NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href}
                className="text-white/40 text-sm hover:text-white transition-colors">{link.label}</a>
            ))}
          </div>
          <p className="text-white/25 text-xs">© 2024 АвтоПартнёр</p>
        </div>
      </footer>

      {/* CHAT */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
        {chatOpen && (
          <div className="w-80 bg-white rounded-2xl shadow-2xl border border-surface-4 overflow-hidden animate-fade-in">
            <div className="bg-orange px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-white rounded-full" />
                <span className="text-white font-semibold text-sm">Онлайн-консультация</span>
              </div>
              <button onClick={() => setChatOpen(false)} className="text-white/70 hover:text-white">
                <Icon name="X" size={14} />
              </button>
            </div>
            <div className="h-56 overflow-y-auto p-4 flex flex-col gap-3 bg-surface-2">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[80%] text-sm px-3.5 py-2.5 rounded-2xl leading-relaxed ${
                    msg.from === "user"
                      ? "bg-orange text-white rounded-br-sm"
                      : "bg-white text-ink-mid border border-surface-4 rounded-bl-sm"
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2 px-3 py-3 border-t border-surface-4 bg-white">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Ваш вопрос..."
                className="flex-1 bg-surface-3 rounded-xl px-3 py-2 text-sm text-ink placeholder-ink-light outline-none focus:bg-surface-2 transition-colors border border-transparent focus:border-orange/30"
              />
              <button onClick={sendMessage}
                className="btn-primary w-9 h-9 rounded-xl flex items-center justify-center shrink-0">
                <Icon name="Send" size={14} />
              </button>
            </div>
          </div>
        )}
        <button
          onClick={() => setChatOpen(!chatOpen)}
          className="btn-primary w-14 h-14 rounded-full flex items-center justify-center shadow-lg relative"
        >
          <Icon name={chatOpen ? "X" : "MessageCircle"} size={22} />
          {!chatOpen && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center text-[10px] text-white font-bold">1</span>
          )}
        </button>
      </div>
    </div>
  );
}