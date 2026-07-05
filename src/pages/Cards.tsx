import Seo from "@/components/Seo";

export default function Cards() {
  const cards = [
    {
      title: "Электронное ОСАГО на автомобиль онлайн",
      desc: "Расчёт среди 17 страховых компаний, большую часть данных заполним за Вас и обеспечим полную безопасность",
      accent: "#F97316",
      bg: "#FFF7ED",
      icon: "🛡️",
    },
    {
      title: "Онлайн КАСКО на автомобиль",
      desc: "Расчёт среди 16 страховых компаний, большую часть данных заполним за Вас и обеспечим полную безопасность",
      accent: "#2563EB",
      bg: "#EFF6FF",
      icon: "✅",
    },
    {
      title: "Проверьте историю автомобиля",
      desc: "Мы соберём данные из тысяч источников: проверим ДТП, юридические ограничения, пробег, обслуживание, размещения на Авто.ру и другое",
      accent: "#16A34A",
      bg: "#F0FDF4",
      icon: "🔍",
    },
    {
      title: "Переоборудование автомобиля под ключ",
      desc: "Все виды изменений для любого автомобиля, в кратчайший срок. Быстро, выгодно и с профессиональной консультацией",
      accent: "#7C3AED",
      bg: "#F5F3FF",
      icon: "🔧",
    },
  ];

  return (
    <div style={{ background: "#e5e7eb", minHeight: "100vh", padding: "40px 20px", display: "flex", flexDirection: "column", alignItems: "center", gap: 32 }}>
      <Seo
        title="Карточки МагСибЗап Авто"
        description="Служебная страница карточек для Яндекс.Бизнес"
        noindex
      />
      <p style={{ color: "#6b7280", fontSize: 16, fontWeight: 600, fontFamily: "Inter, sans-serif" }}>
        Карточки для Яндекс.Бизнес — скриншоть каждую отдельно
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 480px)", gap: 32 }}>
        {cards.map((card) => (
          <div
            key={card.title}
            style={{
              width: 480,
              height: 480,
              fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
              background: "#ffffff",
              borderRadius: 32,
              boxShadow: "0 8px 40px rgba(0,0,0,0.10)",
              padding: 48,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              position: "relative",
              overflow: "hidden",
              boxSizing: "border-box",
            }}
          >
            {/* фоновый круг */}
            <div style={{
              position: "absolute",
              top: -80,
              right: -80,
              width: 280,
              height: 280,
              borderRadius: "50%",
              background: card.bg,
            }} />

            {/* верх: иконка + заголовок */}
            <div style={{ position: "relative", zIndex: 1 }}>
              <div style={{ fontSize: 48, marginBottom: 20, lineHeight: 1 }}>{card.icon}</div>
              <h2 style={{
                fontSize: 30,
                fontWeight: 800,
                color: "#0f172a",
                lineHeight: 1.2,
                margin: 0,
              }}>
                {card.title}
              </h2>
            </div>

            {/* низ: описание + акцент + бренд */}
            <div style={{ position: "relative", zIndex: 1 }}>
              <p style={{
                fontSize: 16,
                color: "#475569",
                lineHeight: 1.65,
                margin: 0,
              }}>
                {card.desc}
              </p>
              <div style={{ marginTop: 24, height: 4, width: 56, background: card.accent, borderRadius: 4 }} />
              <p style={{ marginTop: 14, fontSize: 14, fontWeight: 700, color: card.accent, margin: "14px 0 0 0", letterSpacing: "0.02em" }}>
                МагСибЗап-Авто
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}