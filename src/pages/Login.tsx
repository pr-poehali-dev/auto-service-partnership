import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { AUTH_API, setSessionToken } from "@/lib/api";

export default function Login() {
  const navigate = useNavigate();
  const [deepLink, setDeepLink] = useState("");
  const [status, setStatus] = useState<"loading" | "waiting" | "confirmed" | "error">("loading");
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const start = async () => {
      try {
        const res = await fetch(`${AUTH_API}?action=start`, { method: "POST" });
        const data = await res.json();
        setDeepLink(data.deep_link);
        setStatus("waiting");

        pollRef.current = setInterval(async () => {
          const statusRes = await fetch(`${AUTH_API}?action=status&token=${data.token}`);
          const statusData = await statusRes.json();
          if (statusData.status === "confirmed" && statusData.session_token) {
            setSessionToken(statusData.session_token);
            setStatus("confirmed");
            if (pollRef.current) clearInterval(pollRef.current);
            setTimeout(() => navigate("/cabinet"), 800);
          }
        }, 2000);
      } catch {
        setStatus("error");
      }
    };
    start();
    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
    };
  }, [navigate]);

  return (
    <div className="min-h-screen bg-surface-2 flex items-center justify-center px-5 font-body">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
        <a href="/" className="inline-flex items-center gap-2.5 mb-6">
          <div className="w-9 h-9 bg-orange rounded-lg flex items-center justify-center">
            <Icon name="Car" size={16} className="text-white" />
          </div>
          <span className="font-display text-xl font-bold text-ink">
            МагСибЗап<span className="text-orange"> Авто</span>
          </span>
        </a>

        <h1 className="font-display text-2xl font-bold text-ink mb-2">Вход в личный кабинет</h1>
        <p className="text-ink-light text-sm mb-8">Через Telegram — быстро и без пароля</p>

        {status === "loading" && (
          <div className="py-10 flex flex-col items-center gap-3">
            <Icon name="Loader" size={28} className="animate-spin text-orange" />
            <p className="text-ink-light text-sm">Готовим ссылку для входа...</p>
          </div>
        )}

        {status === "waiting" && (
          <div className="flex flex-col items-center gap-5">
            <div className="w-16 h-16 bg-orange-pale rounded-full flex items-center justify-center pulse-orange">
              <Icon name="Send" size={26} className="text-orange" />
            </div>
            <p className="text-ink-mid text-sm leading-relaxed">
              Нажмите кнопку ниже — откроется Telegram-бот.<br />
              Отправьте команду <b>/start</b>, и вход подтвердится автоматически.
            </p>
            <a href={deepLink} target="_blank" rel="noopener noreferrer" className="w-full">
              <button className="btn-primary w-full py-3.5 rounded-xl text-base flex items-center justify-center gap-2">
                <Icon name="Send" size={18} />
                Открыть Telegram
              </button>
            </a>
            <div className="flex items-center gap-2 text-ink-light text-xs">
              <Icon name="Loader" size={14} className="animate-spin" />
              Ожидаем подтверждение...
            </div>
          </div>
        )}

        {status === "confirmed" && (
          <div className="py-10 flex flex-col items-center gap-3">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <Icon name="CheckCircle2" size={32} className="text-green-500" />
            </div>
            <p className="text-ink font-semibold">Вход подтверждён!</p>
            <p className="text-ink-light text-sm">Переходим в личный кабинет...</p>
          </div>
        )}

        {status === "error" && (
          <div className="py-10 flex flex-col items-center gap-3">
            <Icon name="AlertCircle" size={28} className="text-destructive" />
            <p className="text-ink-light text-sm">Не удалось начать вход. Попробуйте обновить страницу.</p>
          </div>
        )}
      </div>
    </div>
  );
}
