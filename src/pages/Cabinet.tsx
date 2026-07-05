import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Seo from "@/components/Seo";
import Icon from "@/components/ui/icon";
import { AUTH_API, CABINET_API, getSessionToken, clearSessionToken } from "@/lib/api";

interface UserInfo {
  id: number;
  first_name: string | null;
  phone: string | null;
  telegram_username: string | null;
}

interface Order {
  id: number;
  title: string;
  stage: string;
  status: string;
  description: string | null;
  created_at: string;
}

interface Message {
  id: number;
  sender: string;
  text: string;
  created_at: string;
}

type Tab = "orders" | "profile" | "chat";

export default function Cabinet() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>("orders");
  const [user, setUser] = useState<UserInfo | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [profileForm, setProfileForm] = useState({ first_name: "", phone: "" });
  const [savingProfile, setSavingProfile] = useState(false);
  const [chatText, setChatText] = useState("");
  const [sendingChat, setSendingChat] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const token = getSessionToken();

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    const load = async () => {
      try {
        const meRes = await fetch(`${AUTH_API}?action=me`, {
          headers: { "X-Session-Token": token },
        });
        if (meRes.status === 401) {
          clearSessionToken();
          navigate("/login");
          return;
        }
        const meData = await meRes.json();
        setUser(meData);
        setProfileForm({ first_name: meData.first_name || "", phone: meData.phone || "" });

        const ordersRes = await fetch(`${CABINET_API}?action=orders`, {
          headers: { "X-Session-Token": token },
        });
        const ordersData = await ordersRes.json();
        setOrders(ordersData.orders || []);

        const messagesRes = await fetch(`${CABINET_API}?action=messages`, {
          headers: { "X-Session-Token": token },
        });
        const messagesData = await messagesRes.json();
        setMessages(messagesData.messages || []);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [token, navigate]);

  useEffect(() => {
    if (tab === "chat") {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [tab, messages]);

  const saveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    setSavingProfile(true);
    try {
      await fetch(`${AUTH_API}?action=update-profile`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-Session-Token": token },
        body: JSON.stringify(profileForm),
      });
      setUser((prev) => (prev ? { ...prev, ...profileForm } : prev));
    } finally {
      setSavingProfile(false);
    }
  };

  const sendChat = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !chatText.trim()) return;
    setSendingChat(true);
    try {
      const res = await fetch(`${CABINET_API}?action=send-message`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-Session-Token": token },
        body: JSON.stringify({ text: chatText }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { id: data.id, sender: "client", text: chatText, created_at: data.created_at }]);
      setChatText("");
    } finally {
      setSendingChat(false);
    }
  };

  const logout = () => {
    clearSessionToken();
    navigate("/");
  };

  const stageColor: Record<string, string> = {
    in_progress: "bg-orange-pale text-orange",
    done: "bg-green-100 text-green-600",
    cancelled: "bg-gray-100 text-gray-500",
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-surface-2 flex items-center justify-center">
        <Icon name="Loader" size={32} className="animate-spin text-orange" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface-2 font-body">
      <Seo
        title="Личный кабинет — МагСибЗап Авто"
        description="Личный кабинет клиента МагСибЗап Авто: заказы, профиль и чат с менеджером"
        noindex
      />
      <nav className="bg-white border-b border-surface-4 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-5 py-3.5 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-orange rounded-lg flex items-center justify-center">
              <Icon name="Car" size={16} className="text-white" />
            </div>
            <span className="font-display text-lg font-bold text-ink">
              МагСибЗап<span className="text-orange"> Авто</span>
            </span>
          </a>
          <button onClick={logout} className="text-ink-light hover:text-orange text-sm flex items-center gap-1.5 transition-colors">
            <Icon name="LogOut" size={16} />
            Выйти
          </button>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-5 py-8">
        <h1 className="font-display text-2xl md:text-3xl font-bold text-ink mb-1">
          Здравствуйте, {user?.first_name || "клиент"}!
        </h1>
        <p className="text-ink-light text-sm mb-6">Личный кабинет МагСибЗап Авто</p>

        <div className="flex gap-2 mb-6 border-b border-surface-4">
          {[
            { key: "orders" as Tab, label: "Мои заказы", icon: "Package" },
            { key: "profile" as Tab, label: "Профиль", icon: "User" },
            { key: "chat" as Tab, label: "Чат с менеджером", icon: "MessageCircle" },
          ].map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                tab === t.key ? "border-orange text-orange" : "border-transparent text-ink-light hover:text-ink"
              }`}
            >
              <Icon name={t.icon} size={16} />
              {t.label}
            </button>
          ))}
        </div>

        {tab === "orders" && (
          <div className="flex flex-col gap-4">
            {orders.length === 0 ? (
              <div className="bg-white rounded-2xl p-10 text-center">
                <Icon name="PackageOpen" size={36} className="text-ink-light mx-auto mb-3" />
                <p className="text-ink-light text-sm">У вас пока нет заказов</p>
              </div>
            ) : (
              orders.map((o) => (
                <div key={o.id} className="bg-white rounded-2xl p-5 flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-display font-bold text-ink mb-1">{o.title}</h3>
                    {o.description && <p className="text-ink-light text-sm mb-2">{o.description}</p>}
                    <span className="text-xs text-ink-light">
                      {new Date(o.created_at).toLocaleDateString("ru-RU")}
                    </span>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${stageColor[o.status] || "bg-orange-pale text-orange"}`}>
                      {o.stage}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {tab === "profile" && (
          <div className="bg-white rounded-2xl p-6 max-w-md">
            <form onSubmit={saveProfile} className="flex flex-col gap-4">
              <div>
                <label className="text-sm font-medium text-ink-mid mb-1.5 block">Имя</label>
                <input
                  className="input-clean"
                  value={profileForm.first_name}
                  onChange={(e) => setProfileForm({ ...profileForm, first_name: e.target.value })}
                  placeholder="Ваше имя"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-ink-mid mb-1.5 block">Телефон</label>
                <input
                  className="input-clean"
                  value={profileForm.phone}
                  onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                  placeholder="+7 900 000-00-00"
                />
              </div>
              {user?.telegram_username && (
                <div className="flex items-center gap-2 text-sm text-ink-light">
                  <Icon name="Send" size={14} />
                  Telegram: @{user.telegram_username}
                </div>
              )}
              <button
                type="submit"
                disabled={savingProfile}
                className="btn-primary py-3 rounded-xl text-sm flex items-center justify-center gap-2 mt-1 disabled:opacity-60"
              >
                {savingProfile ? <Icon name="Loader" size={15} className="animate-spin" /> : <Icon name="Check" size={15} />}
                Сохранить
              </button>
            </form>
          </div>
        )}

        {tab === "chat" && (
          <div className="bg-white rounded-2xl flex flex-col h-[500px]">
            <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-3">
              {messages.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center">
                  <Icon name="MessageCircle" size={36} className="text-ink-light mb-3" />
                  <p className="text-ink-light text-sm">Напишите менеджеру — ответим в ближайшее время</p>
                </div>
              ) : (
                messages.map((m) => (
                  <div key={m.id} className={`flex ${m.sender === "client" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-sm ${
                        m.sender === "client" ? "bg-orange text-white rounded-br-sm" : "bg-surface-3 text-ink rounded-bl-sm"
                      }`}
                    >
                      {m.text}
                    </div>
                  </div>
                ))
              )}
              <div ref={chatEndRef} />
            </div>
            <form onSubmit={sendChat} className="border-t border-surface-4 p-4 flex gap-2">
              <input
                className="input-clean flex-1"
                placeholder="Написать сообщение..."
                value={chatText}
                onChange={(e) => setChatText(e.target.value)}
              />
              <button
                type="submit"
                disabled={sendingChat || !chatText.trim()}
                className="btn-primary px-5 rounded-xl flex items-center justify-center disabled:opacity-60"
              >
                <Icon name={sendingChat ? "Loader" : "Send"} size={18} className={sendingChat ? "animate-spin" : ""} />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}