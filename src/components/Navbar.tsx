import { useState } from "react";
import Icon from "@/components/ui/icon";

const NAV_LINKS = [
  { label: "Главная", href: "#home" },
  { label: "Авто из Азии", href: "#auto-import" },
  { label: "Услуги", href: "#services" },
  { label: "Города", href: "#cities" },
  { label: "Партнёрам", href: "#referral" },
  { label: "О нас", href: "#about" },
];

export default function Navbar({ activeSection }: { activeSection: string }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-surface-4 shadow-sm">
      <div className="max-w-7xl mx-auto px-5 py-3.5 flex items-center justify-between">
        <a href="#home" className="flex items-center gap-2.5">
          <img
            src="https://cdn.poehali.dev/projects/77b19e44-bfe9-4fb0-8874-b004bc1f4262/files/01f2bbd9-3fd7-48f9-9583-19decc60f384.jpg"
            alt="МагСибЗап Авто логотип"
            className="w-9 h-9 rounded-lg object-cover"
          />
          <div className="w-8 h-8 bg-orange rounded-lg flex items-center justify-center">
            <Icon name="Car" size={16} className="text-white" />
          </div>
          <span className="font-display text-xl font-bold tracking-wide text-ink">
            МагСибЗап<span className="text-orange"> Авто</span>
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
          <a href="/login">
            <button className="btn-secondary text-sm px-5 py-2 rounded-lg flex items-center gap-1.5">
              <Icon name="User" size={15} />
              Войти
            </button>
          </a>
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
          <a href="https://autozix.ru/link/TElOS19fZTExY2NhMTBXBFE=" target="_blank" rel="noopener noreferrer" className="w-full">
            <button className="btn-primary text-sm px-5 py-3 rounded-lg w-full mt-1">Оформить ОСАГО</button>
          </a>
          <a href="/login" className="w-full">
            <button className="btn-secondary text-sm px-5 py-3 rounded-lg w-full flex items-center justify-center gap-1.5">
              <Icon name="User" size={15} />
              Войти
            </button>
          </a>
        </div>
      )}
    </nav>
  );
}