import { useEffect, useState } from "react";
import Seo from "@/components/Seo";
import Icon from "@/components/ui/icon";
import { CABINET_API, getAdminToken, setAdminToken, clearAdminToken } from "@/lib/api";

interface Lead {
  source: "magsibzap" | "kwt24" | "website";
  source_label: string;
  id: number;
  name: string;
  phone: string | null;
  title: string;
  stage: string | null;
  status: string | null;
  comment: string | null;
  created_at: string;
}

const sourceStyle: Record<string, string> = {
  magsibzap: "bg-orange-pale text-orange",
  kwt24: "bg-blue-100 text-blue-700",
  website: "bg-green-100 text-green-700",
};

export default function Admin() {
  const [token, setToken] = useState<string | null>(getAdminToken());
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState<"all" | "magsibzap" | "kwt24" | "website">("all");

  const loadLeads = async (t: string) => {
    setLoading(true);
    try {
      const res = await fetch(`${CABINET_API}?action=admin-leads`, {
        headers: { "X-Admin-Token": t },
      });
      if (res.status === 401) {
        clearAdminToken();
        setToken(null);
        return;
      }
      const data = await res.json();
      setLeads(data.leads || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) loadLeads(token);
  }, [token]);

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoggingIn(true);
    setLoginError("");
    try {
      const res = await fetch(`${CABINET_API}?action=admin-login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        setLoginError("Неверный пароль");
        return;
      }
      const data = await res.json();
      setAdminToken(data.token);
      setToken(data.token);
    } finally {
      setLoggingIn(false);
    }
  };

  const logout = () => {
    clearAdminToken();
    setToken(null);
  };

  if (!token) {
    return (
      <div className="min-h-screen bg-surface-2 flex items-center justify-center px-5 font-body">
        <Seo title="Админ-панель" description="Служебная страница" noindex />
        <form onSubmit={login} className="max-w-sm w-full bg-white rounded-2xl shadow-lg p-8">
          <div className="flex items-center gap-2.5 mb-6">
            <div className="w-9 h-9 bg-orange rounded-lg flex items-center justify-center">
              <Icon name="ShieldCheck" size={16} className="text-white" />
            </div>
            <span className="font-display text-xl font-bold text-ink">Админ-панель</span>
          </div>
          <label className="text-sm font-medium text-ink-mid mb-1.5 block">Пароль</label>
          <input
            type="password"
            className="input-clean mb-4"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Введите пароль"
            autoFocus
          />
          {loginError && <p className="text-destructive text-sm mb-4">{loginError}</p>}
          <button type="submit" disabled={loggingIn} className="btn-primary w-full py-3 rounded-xl text-base">
            {loggingIn ? "Входим..." : "Войти"}
          </button>
        </form>
      </div>
    );
  }

  const filteredLeads = filter === "all" ? leads : leads.filter((l) => l.source === filter);

  return (
    <div className="min-h-screen bg-surface-2 font-body">
      <Seo title="Админ-панель" description="Служебная страница" noindex />
      <nav className="bg-white border-b border-surface-4 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-5 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-orange rounded-lg flex items-center justify-center">
              <Icon name="ShieldCheck" size={16} className="text-white" />
            </div>
            <span className="font-display text-lg font-bold text-ink">Админ-панель</span>
          </div>
          <button onClick={logout} className="text-ink-light hover:text-orange text-sm flex items-center gap-1.5 transition-colors">
            <Icon name="LogOut" size={16} />
            Выйти
          </button>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-5 py-8">
        <h1 className="font-display text-2xl md:text-3xl font-bold text-ink mb-1">Заявки</h1>
        <p className="text-ink-light text-sm mb-6">Все заявки МагСибЗап Авто и kWt24 в одном месте</p>

        <div className="flex gap-2 mb-6">
          {[
            { key: "all" as const, label: "Все" },
            { key: "website" as const, label: "Заявки с сайта" },
            { key: "magsibzap" as const, label: "МагСибЗап Авто" },
            { key: "kwt24" as const, label: "kWt24" },
          ].map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                filter === f.key ? "bg-orange text-white" : "bg-white text-ink-mid hover:bg-surface-3"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="py-20 flex justify-center">
            <Icon name="Loader" size={28} className="animate-spin text-orange" />
          </div>
        ) : filteredLeads.length === 0 ? (
          <div className="bg-white rounded-2xl p-10 text-center">
            <Icon name="Inbox" size={36} className="text-ink-light mx-auto mb-3" />
            <p className="text-ink-light text-sm">Заявок пока нет</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {filteredLeads.map((lead) => (
              <div key={`${lead.source}-${lead.id}`} className="bg-white rounded-2xl p-5">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${sourceStyle[lead.source]}`}>
                      {lead.source_label}
                    </span>
                    <h3 className="font-display font-bold text-ink">{lead.title}</h3>
                  </div>
                  <span className="text-xs text-ink-light whitespace-nowrap">
                    {new Date(lead.created_at).toLocaleString("ru-RU")}
                  </span>
                </div>
                <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-ink-mid">
                  <span className="flex items-center gap-1.5">
                    <Icon name="User" size={14} className="text-ink-light" />
                    {lead.name}
                  </span>
                  {lead.phone && (
                    <span className="flex items-center gap-1.5">
                      <Icon name="Phone" size={14} className="text-ink-light" />
                      {lead.phone}
                    </span>
                  )}
                  {lead.stage && (
                    <span className="flex items-center gap-1.5">
                      <Icon name="Tag" size={14} className="text-ink-light" />
                      {lead.stage}
                    </span>
                  )}
                </div>
                {lead.comment && <p className="text-ink-light text-sm mt-2">{lead.comment}</p>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}