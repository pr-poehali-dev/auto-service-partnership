import { useState } from "react";
import Icon from "@/components/ui/icon";

const SERVICES = [
  {
    icon: "FileText",
    title: "Подготовка документов",
    desc: "Собираем полный пакет документов для подачи заявки на технологическое присоединение. Без ошибок и отказов.",
  },
  {
    icon: "Zap",
    title: "Проект электроснабжения",
    desc: "Разрабатываем проект электроснабжения объекта, согласованный с требованиями сетевой организации.",
  },
  {
    icon: "Users",
    title: "Сопровождение в сетевой компании",
    desc: "Представляем ваши интересы в Россети и других сетевых организациях. Вам не нужно никуда ехать.",
  },
  {
    icon: "Key",
    title: "Под ключ",
    desc: "Берём на себя весь процесс — от подачи заявки до получения акта о технологическом присоединении.",
  },
];

const CLIENTS = [
  { icon: "Home", label: "Частные дома и дачи" },
  { icon: "Building2", label: "Бизнес и юр. лица" },
  { icon: "Trees", label: "Садовые товарищества (СНТ)" },
  { icon: "Warehouse", label: "Производства и склады" },
];

const STEPS = [
  { num: "01", title: "Оставляете заявку", desc: "Звонок или форма на сайте — удобно как вам" },
  { num: "02", title: "Бесплатная консультация", desc: "Разбираем вашу ситуацию, называем точную стоимость" },
  { num: "03", title: "Мы делаем всё сами", desc: "Документы, проект, подача, сопровождение" },
  { num: "04", title: "Вы получаете свет", desc: "Акт ТП на руках — объект подключён к сети" },
];

const FAQ = [
  {
    q: "Сколько стоит технологическое присоединение?",
    a: "Стоимость зависит от мощности, категории заявителя и удалённости от сети. Для физлиц до 15 кВт льготная ставка. Точную цену скажем после консультации — бесплатно.",
  },
  {
    q: "Сколько времени занимает весь процесс?",
    a: "По закону сетевая компания обязана выдать ТУ в течение 15 рабочих дней после подачи заявки. Весь процесс до подключения — от 1 до 6 месяцев в зависимости от объекта.",
  },
  {
    q: "Нужно ли мне самому ездить в сетевую компанию?",
    a: "Нет. Мы берём на себя все визиты и переговоры с Россети и другими организациями. Вы только подписываете документы.",
  },
  {
    q: "Работаете ли вы за пределами Красноярска?",
    a: "Да, работаем по всему Красноярскому краю и соседним регионам.",
  },
];

export default function Kwt24() {
  const [form, setForm] = useState({ name: "", phone: "", comment: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch("https://functions.poehali.dev/a9b308c7-8b62-4037-b73b-62315f678f0a", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setSent(true);
    } catch {
      alert("Не удалось отправить заявку. Попробуйте позвонить нам напрямую.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white font-body text-ink overflow-x-hidden">

      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-5 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-yellow-400 rounded-lg flex items-center justify-center">
              <Icon name="Zap" size={18} className="text-gray-900" />
            </div>
            <span className="font-display text-xl font-bold text-gray-900">
              k<span className="text-yellow-500">W</span>t24
            </span>
          </div>
          <div className="hidden md:flex items-center gap-7">
            {[["#services", "Услуги"], ["#how", "Как работаем"], ["#clients", "Клиенты"], ["#faq", "Вопросы"]].map(([href, label]) => (
              <a key={href} href={href} className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">{label}</a>
            ))}
          </div>
          <a href="tel:+79135864111">
            <button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold text-sm px-5 py-2.5 rounded-xl transition-colors flex items-center gap-2">
              <Icon name="Phone" size={14} />
              +7 913 586-41-11
            </button>
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-20"
          style={{ backgroundImage: "radial-gradient(circle at 70% 50%, #facc15 0%, transparent 60%)" }} />
        <div className="max-w-6xl mx-auto px-5 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center min-h-[85vh] py-10">

          <div>
            <span className="inline-flex items-center gap-2 bg-yellow-400/15 text-yellow-400 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-6">
              <Icon name="Zap" size={12} />
              Красноярск и край
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white leading-tight mb-6">
              Технологическое<br />
              присоединение<br />
              <span className="text-yellow-400">к электросетям</span>
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed mb-8 max-w-lg">
              Берём на себя весь процесс — от сбора документов до получения акта. Вам остаётся только ждать свет.
            </p>
            <div className="flex flex-wrap gap-4 mb-10">
              <a href="#form">
                <button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold px-8 py-4 rounded-xl text-base transition-colors flex items-center gap-2">
                  <Icon name="FileText" size={16} />
                  Оставить заявку
                </button>
              </a>
              <a href="tel:+79135864111">
                <button className="border-2 border-white/20 text-white font-semibold px-8 py-4 rounded-xl text-base hover:bg-white/10 transition-colors flex items-center gap-2">
                  <Icon name="Phone" size={16} />
                  Позвонить
                </button>
              </a>
            </div>
            <div className="flex flex-wrap gap-6">
              {[
                { icon: "CheckCircle2", text: "Бесплатная консультация" },
                { icon: "Shield", text: "Гарантия результата" },
                { icon: "Clock", text: "Работаем быстро" },
              ].map((b) => (
                <div key={b.text} className="flex items-center gap-2 text-gray-400 text-sm">
                  <Icon name={b.icon} size={15} className="text-yellow-400" />
                  {b.text}
                </div>
              ))}
            </div>
          </div>

          {/* Форма */}
          <div id="form" className="bg-white rounded-2xl shadow-2xl p-6 md:p-8">
            {sent ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="CheckCircle2" size={32} className="text-green-500" />
                </div>
                <h3 className="font-display text-xl font-bold text-gray-900 mb-2">Заявка отправлена!</h3>
                <p className="text-gray-500 text-sm">Перезвоним в течение 30 минут в рабочее время.</p>
              </div>
            ) : (
              <>
                <h3 className="font-display text-xl font-bold text-gray-900 mb-1">Бесплатная консультация</h3>
                <p className="text-gray-500 text-sm mb-6">Оставьте заявку — перезвоним и расскажем всё по вашей ситуации</p>
                <form onSubmit={submit} className="flex flex-col gap-4">
                  <input
                    required
                    placeholder="Ваше имя"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-yellow-400 transition-colors"
                  />
                  <input
                    required
                    placeholder="Телефон"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-yellow-400 transition-colors"
                  />
                  <textarea
                    placeholder="Коротко опишите объект (дом, СНТ, бизнес...)"
                    value={form.comment}
                    onChange={(e) => setForm({ ...form, comment: e.target.value })}
                    rows={3}
                    className="border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-yellow-400 transition-colors resize-none"
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-3.5 rounded-xl text-base transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
                  >
                    {loading ? <Icon name="Loader" size={16} className="animate-spin" /> : <Icon name="Send" size={16} />}
                    {loading ? "Отправляем..." : "Отправить заявку"}
                  </button>
                  <p className="text-xs text-gray-400 text-center">Нажимая кнопку, вы соглашаетесь с обработкой персональных данных</p>
                </form>
              </>
            )}
          </div>
        </div>
      </section>

      {/* УСЛУГИ */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-5">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 bg-yellow-50 text-yellow-600 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4">
              <Icon name="LayoutGrid" size={12} />
              Что мы делаем
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mt-3">Наши услуги</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {SERVICES.map((s) => (
              <div key={s.title} className="bg-gray-50 border border-gray-100 rounded-2xl p-6 flex gap-4 hover:border-yellow-300 transition-colors">
                <div className="w-12 h-12 bg-yellow-400 rounded-xl flex items-center justify-center shrink-0">
                  <Icon name={s.icon} fallback="Zap" size={22} className="text-gray-900" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-gray-900 mb-2">{s.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* КАК РАБОТАЕМ */}
      <section id="how" className="py-20 bg-gray-900">
        <div className="max-w-6xl mx-auto px-5">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 bg-yellow-400/15 text-yellow-400 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4">
              <Icon name="Route" size={12} />
              Процесс
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mt-3">Как мы работаем</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {STEPS.map((s) => (
              <div key={s.num} className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
                <div className="w-12 h-12 bg-yellow-400 text-gray-900 font-display font-bold text-lg rounded-2xl flex items-center justify-center mx-auto mb-4">
                  {s.num}
                </div>
                <h3 className="font-display text-base font-bold text-white mb-2">{s.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* КЛИЕНТЫ */}
      <section id="clients" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-5">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 bg-yellow-50 text-yellow-600 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4">
              <Icon name="Users" size={12} />
              Кому помогаем
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mt-3">Работаем со всеми</h2>
            <p className="text-gray-500 text-base mt-3 max-w-xl mx-auto">Частники, бизнес, СНТ — у каждого своя специфика, мы знаем её</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {CLIENTS.map((c) => (
              <div key={c.label} className="bg-yellow-50 border border-yellow-100 rounded-2xl p-6 text-center">
                <div className="w-12 h-12 bg-yellow-400 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Icon name={c.icon} fallback="Users" size={22} className="text-gray-900" />
                </div>
                <p className="text-gray-800 text-sm font-semibold leading-snug">{c.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-5">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 bg-yellow-50 text-yellow-600 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4">
              <Icon name="HelpCircle" size={12} />
              Частые вопросы
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mt-3">Отвечаем на вопросы</h2>
          </div>
          <div className="flex flex-col gap-3">
            {FAQ.map((item, i) => (
              <div key={i} className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
                <button
                  className="w-full px-6 py-4 text-left flex items-center justify-between gap-4"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="font-semibold text-gray-900 text-sm md:text-base">{item.q}</span>
                  <Icon name={openFaq === i ? "ChevronUp" : "ChevronDown"} size={18} className="text-gray-400 shrink-0" />
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5">
                    <p className="text-gray-500 text-sm leading-relaxed">{item.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-yellow-400">
        <div className="max-w-3xl mx-auto px-5 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Готовы подключить объект к сети?
          </h2>
          <p className="text-gray-700 text-lg mb-8">Бесплатная консультация — разберём вашу ситуацию за 10 минут</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#form">
              <button className="bg-gray-900 text-white font-bold px-10 py-4 rounded-xl text-base hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
                <Icon name="FileText" size={16} />
                Оставить заявку
              </button>
            </a>
            <a href="https://t.me/+79135864111" target="_blank" rel="noopener noreferrer">
              <button className="border-2 border-gray-900 text-gray-900 font-bold px-10 py-4 rounded-xl text-base hover:bg-gray-900/10 transition-colors flex items-center justify-center gap-2">
                <Icon name="Send" size={16} />
                Написать в Telegram
              </button>
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 bg-gray-900">
        <div className="max-w-6xl mx-auto px-5 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-yellow-400 rounded-lg flex items-center justify-center">
              <Icon name="Zap" size={15} className="text-gray-900" />
            </div>
            <span className="font-display text-lg font-bold text-white">k<span className="text-yellow-400">W</span>t24</span>
          </div>
          <p className="text-gray-500 text-sm">Технологическое присоединение к электросетям · Красноярск</p>
          <div className="flex items-center gap-4">
            <a href="tel:+79135864111" className="text-gray-400 hover:text-white text-sm transition-colors flex items-center gap-1.5">
              <Icon name="Phone" size={14} />
              +7 913 586-41-11
            </a>
            <a href="https://t.me/+79135864111" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white text-sm transition-colors flex items-center gap-1.5">
              <Icon name="Send" size={14} />
              Telegram
            </a>
          </div>
        </div>
        <div className="max-w-6xl mx-auto px-5 flex justify-center md:justify-end mt-4">
          <a href="/admin" className="text-gray-600 text-[11px] hover:text-gray-400 transition-colors flex items-center gap-1">
            <Icon name="ShieldCheck" size={11} />
            Админ-панель
          </a>
        </div>
      </footer>

    </div>
  );
}