import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AutoImportSection from "@/components/AutoImportSection";
import ServicesSection from "@/components/ServicesSection";
import BottomSections from "@/components/BottomSections";

export default function Index() {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "auto-import", "services", "promo", "referral", "about"];
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
      <Navbar activeSection={activeSection} />
      <HeroSection />
      <AutoImportSection />
      <ServicesSection />
      <BottomSections />
    </div>
  );
}