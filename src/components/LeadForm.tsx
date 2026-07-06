import { useState } from "react";
import Icon from "@/components/ui/icon";
import { CABINET_API } from "@/lib/api";

const SERVICES = ["ОСАГО", "КАСКО", "Авто из Кореи", "Авто из Китая", "История авто", "Другое"];

export default function LeadForm() {
  const [form, setForm] = useState({ name: "", phone: "", service: SERVICES[0], comment: "" });
  const [website, setWebsite] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch(`${CABINET_API}?action=submit-lead`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, website }),
      });
      if (res.status === 429) {
        setError("Заявка уже отправлена, ожидайте звонка");
        return;
      }
      if (!res.ok) {
        setError("Не удалось отправить. Попробуйте позвонить нам напрямую.");
        return;
      }
      setSent(true);
    } catch {
      setError("Не удалось отправить. Попробуйте позвонить нам напрямую.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border-2 border-orange/15 shadow-xl p-6">
      {sent ? (
        <div className="text-center py-6">
          <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <Icon name="CheckCircle2" size={28} className="text-green-500" />
          </div>
          <h3 className="font-display text-lg font-bold text-ink mb-1">Заявка отправлена!</h3>
          <p className="text-ink-light text-sm">Перезвоним в ближайшее время.</p>
        </div>
      ) : (
        <>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-orange-pale rounded-lg flex items-center justify-center">
              <Icon name="MessageSquare" size={16} className="text-orange" />
            </div>
            <span className="font-display text-lg font-semibold text-ink">Оставить заявку</span>
          </div>
          <form onSubmit={submit} className="flex flex-col gap-3">
            <input
              type="text"
              name="website"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              autoComplete="off"
              tabIndex={-1}
              className="absolute -left-[9999px] w-px h-px opacity-0"
              aria-hidden="true"
            />
            <input
              required
              placeholder="Ваше имя"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="input-clean"
            />
            <input
              required
              placeholder="Телефон"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="input-clean"
            />
            <select
              value={form.service}
              onChange={(e) => setForm({ ...form, service: e.target.value })}
              className="input-clean"
            >
              {SERVICES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            <textarea
              placeholder="Комментарий (необязательно)"
              value={form.comment}
              onChange={(e) => setForm({ ...form, comment: e.target.value })}
              rows={2}
              className="input-clean resize-none"
            />
            {error && <p className="text-destructive text-sm">{error}</p>}
            <button type="submit" disabled={loading} className="btn-primary w-full py-3 rounded-xl text-base mt-1">
              {loading ? "Отправляем..." : "Отправить заявку"}
            </button>
          </form>
        </>
      )}
    </div>
  );
}
