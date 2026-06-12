import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/77b19e44-bfe9-4fb0-8874-b004bc1f4262/files/26bf016e-513d-4811-a46a-e7dcd03d3f09.jpg";
const DASHBOARD_IMAGE = "https://cdn.poehali.dev/projects/77b19e44-bfe9-4fb0-8874-b004bc1f4262/files/7f9bf84c-b532-4be9-8ed3-94d95dde10c1.jpg";

const NAV_LINKS = [
  { label: "Главная", href: "#home" },
  { label: "Услуги", href: "#services" },
  { label: "Партнёрам", href: "#referral" },
  { label: "О платформе", href: "#about" },
];

const SERVICES = [
  {
    id: "osago",
    icon: "Shield",
    label: "ОСАГО",
    tag: "Страхование",
    desc: "Оформление и продление полиса ОСАГО онлайн. QR-код для быстрой оплаты, мгновенная проверка.",
    cta: "Оформить ОСАГО",
    badge: "Популярное",
    color: "from-blue-900/40 to-navy-card",
  },
  {
    id: "kasko",
    icon: "ShieldCheck",
    label: "КАСКО",
    tag: "Страхование",
    desc: "Полная защита вашего автомобиля. Подбираем лучшие условия от ведущих страховых компаний.",
    cta: "Рассчитать КАСКО",
    badge: null,
    color: "from-indigo-900/40 to-navy-card",
  },
  {
    id: "history",
    icon: "FileSearch",
    label: "Проверка авто",
    tag: "История ТС",
    desc: "Полный отчёт об истории транспортного средства: ДТП, пробег, владельцы, ограничения.",
    cta: "Проверить авто",
    badge: null,
    color: "from-purple-900/40 to-navy-card",
  },
  {
    id: "sale",
    icon: "Tag",
    label: "Продажа авто",
    tag: "Маркетплейс",
    desc: "Разместите объявление на нашей торговой площадке и получите доступ к тысячам покупателей.",
    cta: "Продать авто",
    badge: null,
    color: "from-emerald-900/40 to-navy-card",
  },
  {
    id: "china",
    icon: "Globe",
    label: "Авто из Китая",
    tag: "Импорт",
    desc: "Заказ новых автомобилей напрямую из Китая. Таможня, доставка, регистрация — под ключ.",
    cta: "Заказать из Китая",
    badge: "Хит",
    color: "from-red-900/40 to-navy-card",
  },
  {
    id: "korea",
    icon: "Anchor",
    label: "Авто из Кореи",
    tag: "Импорт",
    desc: "Корейские автомобили по выгодным ценам. Проверенные дилеры, официальные документы.",
    cta: "Заказать из Кореи",
    badge: null,
    color: "from-orange-900/40 to-navy-card",
  },
];

const PARTNERS = [
  { icon: "Wrench", label: "Автосервисы", desc: "Сеть проверенных СТО и ремонтных мастерских по всей стране" },
  { icon: "Droplets", label: "Автомойки", desc: "Ручные и автоматические мойки — партнёры платформы" },
  { icon: "Building2", label: "Автосалоны", desc: "Официальные дилеры и независимые автосалоны" },
];

const STEPS = [
  { num: "01", title: "Регистрация", desc: "Создайте партнёрский аккаунт за 2 минуты" },
  { num: "02", title: "Получите ссылку", desc: "Уникальная реферальная ссылка и готовые виджеты" },
  { num: "03", title: "Размещайте", desc: "Встраивайте виджеты на свой сайт или отправляйте ссылки клиентам" },
  { num: "04", title: "Зарабатывайте", desc: "Получайте процент с каждой успешной сделки" },
];

const FILTER_TAGS = ["Все услуги", "Страхование", "История ТС", "Маркетплейс", "Импорт"];

const CHAT_MESSAGES = [
  { from: "manager", text: "Здравствуйте! Чем могу помочь?" },
];

export default function Index() {
  const [activeFilter, setActiveFilter] = useState("Все услуги");
  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState(CHAT_MESSAGES);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const filtered =
    activeFilter === "Все услуги"
      ? SERVICES
      : SERVICES.filter((s) => s.tag === activeFilter);

  const sendMessage = () => {
    if (!chatInput.trim()) return;
    setMessages((prev) => [...prev, { from: "user", text: chatInput }]);
    setChatInput("");
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { from: "manager", text: "Спасибо за обращение! Менеджер ответит вам в течение нескольких минут." },
      ]);
    }, 800);
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "services", "referral", "about"];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(id);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-navy text-foreground font-body overflow-x-hidden">
      {/* NAVIGATION */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 border-b border-gold/10"
        style={{ background: "rgba(10,15,30,0.92)", backdropFilter: "blur(16px)" }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 border border-gold/60 flex items-center justify-center">
              <span className="text-gold text-xs font-display font-bold">АП</span>
            </div>
            <span className="font-display text-xl tracking-widest text-white">
              АВТО<span className="text-gold">ПАРТНЁР</span>
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => {
              const sectionId = link.href.replace("#", "");
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={`text-sm tracking-wider uppercase transition-colors duration-200 ${
                    activeSection === sectionId
                      ? "text-gold"
                      : "text-white/60 hover:text-gold"
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <button className="btn-outline-gold text-xs tracking-widest uppercase px-5 py-2 rounded-sm">
              Войти
            </button>
            <button className="btn-gold text-xs tracking-widest uppercase px-5 py-2 rounded-sm">
              Стать партнёром
            </button>
          </div>

          <button
            className="md:hidden text-white/70 hover:text-gold transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Icon name={mobileMenuOpen ? "X" : "Menu"} size={22} />
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-navy-card border-t border-gold/10 px-6 py-4 flex flex-col gap-4 animate-fade-in">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm tracking-wider uppercase text-white/70 hover:text-gold transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <div className="flex flex-col gap-2 pt-2 border-t border-gold/10">
              <button className="btn-outline-gold text-xs tracking-widest uppercase px-5 py-2 rounded-sm">
                Войти
              </button>
              <button className="btn-gold text-xs tracking-widest uppercase px-5 py-2 rounded-sm">
                Стать партнёром
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={HERO_IMAGE}
            alt="АвтоПартнёр"
            className="w-full h-full object-cover opacity-25"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, rgba(10,15,30,0.97) 0%, rgba(10,15,30,0.75) 50%, rgba(10,15,30,0.9) 100%)",
            }}
          />
        </div>

        <div className="absolute inset-0 pointer-events-none">
          <div
            style={{
              position: "absolute", top: "20%", right: "10%",
              width: "400px", height: "400px",
              background: "radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 70%)",
              borderRadius: "50%",
            }}
          />
          <div
            style={{
              position: "absolute", bottom: "10%", left: "5%",
              width: "300px", height: "300px",
              background: "radial-gradient(circle, rgba(30,60,120,0.15) 0%, transparent 70%)",
              borderRadius: "50%",
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 pt-28 pb-16">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6 animate-fade-in-up delay-100">
              <div className="section-divider" />
              <span className="text-gold text-xs tracking-[0.25em] uppercase font-medium">
                Профессиональная платформа
              </span>
            </div>

            <h1 className="font-display text-5xl md:text-7xl font-bold leading-tight mb-6 animate-fade-in-up delay-200">
              Все автоуслуги <br />
              <span className="gold-shimmer">в одном месте</span>
            </h1>

            <p className="text-white/60 text-lg leading-relaxed mb-10 max-w-xl animate-fade-in-up delay-300">
              ОСАГО, КАСКО, проверка истории, продажа и импорт авто из Китая и Кореи.
              Реферальная программа для партнёров — автосервисов, моек и салонов.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up delay-400">
              <a href="#services">
                <button className="btn-gold px-8 py-4 rounded-sm text-sm tracking-widest uppercase w-full sm:w-auto">
                  Смотреть услуги
                </button>
              </a>
              <a href="#referral">
                <button className="btn-outline-gold px-8 py-4 rounded-sm text-sm tracking-widest uppercase w-full sm:w-auto">
                  Стать партнёром
                </button>
              </a>
            </div>

            <div className="flex flex-wrap gap-8 mt-14 animate-fade-in-up delay-500">
              {[
                { val: "6+", label: "Категорий услуг" },
                { val: "500+", label: "Партнёров" },
                { val: "24/7", label: "Поддержка" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="font-display text-3xl font-bold text-gold">{stat.val}</div>
                  <div className="text-white/40 text-xs tracking-wider uppercase mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-in delay-600">
          <span className="text-white/30 text-xs tracking-widest uppercase">Прокрутите</span>
          <div className="w-px h-10 bg-gradient-to-b from-gold/50 to-transparent" />
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="section-divider" />
            <span className="text-gold text-xs tracking-[0.25em] uppercase font-medium">Каталог</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white">Наши услуги</h2>
            <div className="flex flex-wrap gap-2">
              {FILTER_TAGS.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setActiveFilter(tag)}
                  className={`text-xs tracking-wider uppercase px-4 py-2 rounded-sm border transition-all duration-200 ${
                    activeFilter === tag
                      ? "border-gold bg-gold/10 text-gold"
                      : "border-white/10 text-white/40 hover:border-gold/40 hover:text-white/70"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((service) => (
              <div
                key={service.id}
                className="card-hover relative border border-white/5 rounded-sm p-6 flex flex-col gap-4"
                style={{ backgroundColor: "var(--navy-card)" }}
              >
                {service.badge && (
                  <span className="absolute top-4 right-4 text-[10px] tracking-widest uppercase bg-gold text-navy px-2 py-1 font-semibold rounded-sm">
                    {service.badge}
                  </span>
                )}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 border border-gold/30 flex items-center justify-center shrink-0 rounded-sm">
                    <Icon name={service.icon} fallback="Shield" size={20} className="text-gold" />
                  </div>
                  <div>
                    <span className="text-gold/60 text-[10px] tracking-widest uppercase">{service.tag}</span>
                    <h3 className="font-display text-xl font-semibold text-white mt-0.5">{service.label}</h3>
                  </div>
                </div>
                <p className="text-white/50 text-sm leading-relaxed">{service.desc}</p>
                <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
                  <button className="text-gold text-xs tracking-wider uppercase hover:text-gold-light transition-colors flex items-center gap-2">
                    {service.cta}
                    <Icon name="ArrowRight" size={12} />
                  </button>
                  <div className="flex items-center gap-1 text-white/20">
                    <Icon name="QrCode" size={14} />
                    <span className="text-[10px]">QR</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REFERRAL */}
      <section id="referral" className="py-24 relative" style={{ background: "var(--navy-card)" }}>
        <div className="absolute inset-0 pointer-events-none">
          <div
            style={{
              position: "absolute", top: 0, left: 0, right: 0, height: "1px",
              background: "linear-gradient(90deg, transparent, var(--gold), transparent)",
              opacity: 0.3,
            }}
          />
          <div
            style={{
              position: "absolute", bottom: 0, left: 0, right: 0, height: "1px",
              background: "linear-gradient(90deg, transparent, var(--gold), transparent)",
              opacity: 0.3,
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="section-divider" />
            <span className="text-gold text-xs tracking-[0.25em] uppercase font-medium">Заработок</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            Реферальная программа
          </h2>
          <p className="text-white/50 text-lg mb-16 max-w-2xl">
            Подключитесь к платформе и получайте процент с каждой продажи.
            Готовые виджеты для встраивания на ваш сайт.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <div className="flex flex-col gap-6">
                {STEPS.map((step, i) => (
                  <div key={step.num} className="flex gap-6 group">
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 border border-gold/40 flex items-center justify-center rounded-sm group-hover:border-gold group-hover:bg-gold/5 transition-all">
                        <span className="font-display text-gold text-sm font-bold">{step.num}</span>
                      </div>
                      {i < STEPS.length - 1 && (
                        <div className="w-px flex-1 mt-2 bg-gradient-to-b from-gold/20 to-transparent min-h-[32px]" />
                      )}
                    </div>
                    <div className="pb-6">
                      <h3 className="font-display text-xl font-semibold text-white mb-1">{step.title}</h3>
                      <p className="text-white/40 text-sm leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="btn-gold px-8 py-4 rounded-sm text-sm tracking-widest uppercase mt-4">
                Подключиться бесплатно
              </button>
            </div>

            <div className="flex flex-col gap-4">
              <div className="border border-gold/20 rounded-sm p-6 bg-navy/60">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-display text-lg text-white">Виджет на сайт</span>
                  <Icon name="Code2" size={16} className="text-gold/60" />
                </div>
                <div className="bg-navy rounded-sm p-4 font-mono text-xs text-green-400/70 leading-relaxed">
                  <span className="text-blue-400/70">&lt;iframe</span>
                  <br />
                  <span className="ml-4 text-white/40">
                    src="https://autopartner.ru/widget/osago"
                  </span>
                  <br />
                  <span className="ml-4 text-white/40">
                    ref="<span className="text-gold/60">ВАШ_КОД</span>"
                  </span>
                  <br />
                  <span className="ml-4 text-white/40">width="100%" height="120"</span>
                  <br />
                  <span className="text-blue-400/70">&gt;&lt;/iframe&gt;</span>
                </div>
                <button className="btn-outline-gold w-full text-xs tracking-widest uppercase py-2.5 rounded-sm mt-4 flex items-center justify-center gap-2">
                  <Icon name="Copy" size={12} />
                  Скопировать виджет
                </button>
              </div>

              <div className="border border-gold/20 rounded-sm p-6 bg-navy/60">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-display text-lg text-white">Партнёры платформы</span>
                  <Icon name="Users" size={16} className="text-gold/60" />
                </div>
                <div className="flex flex-col gap-3">
                  {PARTNERS.map((p) => (
                    <div
                      key={p.label}
                      className="flex items-center gap-4 p-3 border border-white/5 rounded-sm hover:border-gold/20 transition-colors"
                    >
                      <div className="w-8 h-8 border border-gold/20 flex items-center justify-center rounded-sm shrink-0">
                        <Icon name={p.icon} fallback="Star" size={14} className="text-gold" />
                      </div>
                      <div>
                        <div className="text-white text-sm font-medium">{p.label}</div>
                        <div className="text-white/35 text-xs leading-relaxed">{p.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="btn-gold w-full text-xs tracking-widest uppercase py-2.5 rounded-sm mt-4">
                  Стать партнёром
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div
            style={{
              position: "absolute", right: "-10%", top: "50%", transform: "translateY(-50%)",
              width: "500px", height: "500px",
              background: "radial-gradient(circle, rgba(201,168,76,0.04) 0%, transparent 70%)",
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="section-divider" />
                <span className="text-gold text-xs tracking-[0.25em] uppercase font-medium">О нас</span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">
                Платформа нового <br />
                <span className="gold-gradient-text">поколения</span>
              </h2>
              <p className="text-white/50 text-base leading-relaxed mb-6">
                АвтоПартнёр — это агрегатор автомобильных услуг и B2B платформа для партнёров.
                Мы объединяем страховые продукты, сервисы проверки авто, площадку для продажи
                и импорта в единую экосистему.
              </p>
              <p className="text-white/50 text-base leading-relaxed mb-10">
                Для автосервисов, моек и салонов мы предлагаем дополнительный источник дохода
                через реферальные ссылки и готовые виджеты для встраивания на сайт.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-10">
                {[
                  { icon: "TrendingUp", text: "До 15% комиссии с продаж" },
                  { icon: "Zap", text: "Мгновенные выплаты" },
                  { icon: "LayoutGrid", text: "Готовые виджеты и QR-коды" },
                  { icon: "Headphones", text: "Персональный менеджер" },
                ].map((item) => (
                  <div key={item.text} className="flex items-start gap-3">
                    <Icon name={item.icon} fallback="Check" size={14} className="text-gold mt-0.5 shrink-0" />
                    <span className="text-white/60 text-sm leading-relaxed">{item.text}</span>
                  </div>
                ))}
              </div>

              <a href="#referral">
                <button className="btn-gold px-8 py-4 rounded-sm text-sm tracking-widest uppercase">
                  Начать сотрудничество
                </button>
              </a>
            </div>

            <div className="relative">
              <div className="border border-gold/15 rounded-sm overflow-hidden">
                <img src={DASHBOARD_IMAGE} alt="Платформа" className="w-full object-cover opacity-80" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy via-transparent to-transparent" />
              </div>
              <div className="absolute -bottom-4 -left-4 border border-gold/20 bg-navy-card px-6 py-4 rounded-sm">
                <div className="flex items-center gap-3">
                  <div
                    className="w-2 h-2 bg-green-400 rounded-full"
                    style={{ boxShadow: "0 0 8px rgba(74,222,128,0.6)" }}
                  />
                  <span className="text-white/70 text-sm">500+ активных партнёров</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <div
        className="py-16 relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #0A0F1E, #1a1200)",
          borderTop: "1px solid rgba(201,168,76,0.2)",
          borderBottom: "1px solid rgba(201,168,76,0.2)",
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at center, rgba(201,168,76,0.06) 0%, transparent 70%)",
          }}
        />
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">Готовы начать?</h2>
          <p className="text-white/50 text-lg mb-8">
            Присоединитесь к сотням партнёров, которые уже зарабатывают с АвтоПартнёр
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-gold px-10 py-4 rounded-sm text-sm tracking-widest uppercase">
              Стать партнёром
            </button>
            <button className="btn-outline-gold px-10 py-4 rounded-sm text-sm tracking-widest uppercase">
              Связаться с нами
            </button>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="py-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 border border-gold/40 flex items-center justify-center">
              <span className="text-gold text-xs font-display font-bold">АП</span>
            </div>
            <span className="font-display text-lg tracking-widest text-white">
              АВТО<span className="text-gold">ПАРТНЁР</span>
            </span>
          </div>
          <div className="flex flex-wrap gap-8 justify-center">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-white/30 text-xs tracking-wider uppercase hover:text-gold transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
          <p className="text-white/20 text-xs tracking-wider">© 2024 АвтоПартнёр</p>
        </div>
      </footer>

      {/* CHAT WIDGET */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
        {chatOpen && (
          <div
            className="w-80 border border-gold/20 rounded-sm overflow-hidden shadow-2xl animate-fade-in"
            style={{ background: "var(--navy-card)" }}
          >
            <div
              className="flex items-center justify-between px-4 py-3 border-b border-gold/10"
              style={{ background: "rgba(201,168,76,0.08)" }}
            >
              <div className="flex items-center gap-2">
                <div
                  className="w-2 h-2 bg-green-400 rounded-full"
                  style={{ boxShadow: "0 0 6px rgba(74,222,128,0.6)" }}
                />
                <span className="text-white text-sm font-medium">Онлайн-консультация</span>
              </div>
              <button
                onClick={() => setChatOpen(false)}
                className="text-white/40 hover:text-white transition-colors"
              >
                <Icon name="X" size={14} />
              </button>
            </div>

            <div className="h-56 overflow-y-auto p-4 flex flex-col gap-3">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[75%] text-sm px-3 py-2 rounded-sm leading-relaxed ${
                      msg.from === "user"
                        ? "bg-gold/20 text-white border border-gold/20"
                        : "bg-navy border border-white/5 text-white/70"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2 px-3 py-3 border-t border-white/5">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Ваш вопрос..."
                className="flex-1 bg-navy border border-white/10 rounded-sm px-3 py-2 text-sm text-white placeholder-white/25 outline-none focus:border-gold/40 transition-colors"
              />
              <button
                onClick={sendMessage}
                className="btn-gold w-8 h-8 flex items-center justify-center rounded-sm shrink-0"
              >
                <Icon name="Send" size={13} />
              </button>
            </div>
          </div>
        )}

        <button
          onClick={() => setChatOpen(!chatOpen)}
          className="btn-gold w-14 h-14 rounded-full flex items-center justify-center shadow-lg relative"
        >
          <Icon name={chatOpen ? "X" : "MessageCircle"} size={20} />
          {!chatOpen && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full flex items-center justify-center text-[9px] text-black font-bold">
              1
            </span>
          )}
        </button>
      </div>
    </div>
  );
}