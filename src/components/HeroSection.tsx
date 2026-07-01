import { useEffect, useRef } from "react";
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

export default function HeroSection() {
  return (
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

            <div className="flex flex-wrap gap-6 animate-fade-in-up delay-500">
              {[
                { icon: "CheckCircle2", text: "Без скрытых платежей" },
                { icon: "Clock", text: "Полис за 5 минут" },
                { icon: "Phone", text: "+7 923-771-6465" },
              ].map((b) => (
                <div key={b.text} className="flex items-center gap-2 text-ink-mid text-sm">
                  <Icon name={b.icon} size={16} className="text-orange" />
                  {b.text}
                </div>
              ))}
            </div>
          </div>

          {/* Right — виджеты */}
          <div id="calc" className="animate-fade-in-up delay-300 flex flex-col gap-3">

            {/* Авто из Кореи */}
            <a href="#auto-import">
              <div className="bg-white rounded-2xl border-2 border-orange shadow-sm p-4 flex items-center gap-3 hover:shadow-md transition-shadow cursor-pointer">
                <div className="w-8 h-8 bg-orange-pale rounded-lg flex items-center justify-center shrink-0">
                  <Icon name="Globe" size={16} className="text-orange" />
                </div>
                <span className="font-display text-lg font-semibold text-orange">Авто из Кореи</span>
                <Icon name="ArrowRight" size={16} className="text-orange ml-auto" />
              </div>
            </a>

            {/* Авто из Китая */}
            <a href="#auto-import">
              <div className="bg-white rounded-2xl border-2 border-orange shadow-sm p-4 flex items-center gap-3 hover:shadow-md transition-shadow cursor-pointer">
                <div className="w-8 h-8 bg-orange-pale rounded-lg flex items-center justify-center shrink-0">
                  <Icon name="Globe" size={16} className="text-orange" />
                </div>
                <span className="font-display text-lg font-semibold text-orange">Авто из Китая</span>
                <Icon name="ArrowRight" size={16} className="text-orange ml-auto" />
              </div>
            </a>

            {/* ОСАГО виджет */}
            <div className="bg-white rounded-2xl border-2 border-orange/15 shadow-xl p-4 overflow-hidden">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-orange-pale rounded-lg flex items-center justify-center">
                  <Icon name="Shield" size={16} className="text-orange" />
                </div>
                <span className="font-display text-xl font-semibold text-ink">Оформить ОСАГО</span>
              </div>
              <AutozixWidget widgetId="108" widgetTarget="osago" refUrl="https://autozix.ru/link/TElOS19fZTExY2NhMTBXBFE=" />
            </div>

          </div>

        </div>
      </div>

      {/* wave divider */}
      <div style={{ background: "var(--surface-3)", marginTop: "-2px" }}>
        <div style={{
          height: "60px",
          background: "white",
          borderRadius: "0 0 50% 50% / 0 0 40px 40px",
        }} />
      </div>
    </section>
  );
}