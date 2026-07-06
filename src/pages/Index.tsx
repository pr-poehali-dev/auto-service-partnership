import { useState, useEffect } from "react";
import Seo from "@/components/Seo";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AutoImportSection from "@/components/AutoImportSection";
import ServicesSection from "@/components/ServicesSection";
import BottomSections from "@/components/BottomSections";

export default function Index() {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "auto-import", "services", "promo", "cities", "referral", "about"];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) { setActiveSection(id); break; }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white font-body text-ink overflow-x-hidden">
      <Seo
        title="ОСАГО, КАСКО, история авто, авто из Кореи и Китая — МагСибЗап Авто"
        description="МагСибЗап Авто — ОСАГО онлайн за 5 минут по всей России. КАСКО, история автомобиля, пробив авто, заказать автомобиль из Кореи и Китая под ключ."
        canonical="https://magsibzap-avto.ru/"
      />
      <Navbar activeSection={activeSection} />
      <HeroSection />
      <AutoImportSection />
      <ServicesSection />
      <BottomSections />
    </div>
  );
}