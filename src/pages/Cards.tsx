export default function Cards() {
  const cards = [
    {
      title: "Электронное ОСАГО онлайн",
      desc: "Расчёт среди 17 страховых компаний. Большую часть данных заполним за вас — полис придёт на почту за 5 минут.",
      accent: "#F97316",
      icon: "🛡️",
    },
    {
      title: "Онлайн КАСКО на автомобиль",
      desc: "Расчёт среди 16 страховых компаний. Большую часть данных заполним за вас и обеспечим полную безопасность.",
      accent: "#2563EB",
      icon: "✅",
    },
    {
      title: "Проверка истории автомобиля",
      desc: "29 параметров: ДТП, пробег, владельцы, юридические ограничения, залог и многое другое.",
      accent: "#16A34A",
      icon: "🔍",
    },
    {
      title: "Переоборудование автомобиля под ключ",
      desc: "Все виды изменений для любого автомобиля в кратчайший срок. Быстро, выгодно и с профессиональной консультацией.",
      accent: "#7C3AED",
      icon: "🔧",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-10 flex flex-col gap-10 items-center">
      <h1 className="text-2xl font-bold text-gray-500">Карточки для Яндекс.Бизнес — делай скриншот каждой</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {cards.map((card) => (
          <div
            key={card.title}
            style={{ width: 480, height: 480, fontFamily: "Inter, sans-serif" }}
            className="bg-white rounded-3xl shadow-xl p-10 flex flex-col justify-between relative overflow-hidden"
          >
            <div
              style={{ background: card.accent, opacity: 0.07, borderRadius: "50%", width: 260, height: 260, position: "absolute", top: -60, right: -60 }}
            />
            <div className="flex flex-col gap-4 z-10">
              <div style={{ fontSize: 52 }}>{card.icon}</div>
              <h2 style={{ fontSize: 32, fontWeight: 800, color: "#0f172a", lineHeight: 1.15 }}>
                {card.title}
              </h2>
            </div>
            <div className="z-10">
              <p style={{ fontSize: 18, color: "#64748b", lineHeight: 1.6 }}>{card.desc}</p>
              <div style={{ marginTop: 24, height: 4, width: 60, background: card.accent, borderRadius: 4 }} />
              <p style={{ marginTop: 12, fontSize: 15, fontWeight: 600, color: card.accent }}>МагСибЗап-Авто</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
