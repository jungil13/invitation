import "../styles/fonts.css";
import { useState, useEffect } from "react";
import { HeroSection } from "./components/HeroSection";
import { WelcomeSection } from "./components/WelcomeSection";
import { LocationSection } from "./components/LocationSection";
import { GallerySection } from "./components/GallerySection";
import { EighteenRoses } from "./components/EighteenRoses";
import { EighteenCandles } from "./components/EighteenCandles";
import { EighteenTreasures } from "./components/EighteenTreasures";
import { FooterSection } from "./components/FooterSection";
import { MusicPlayer } from "./components/MusicPlayer";
import { EnvelopeAnimation } from "./components/EnvelopeAnimation";
import { AdminDashboard } from "./components/AdminDashboard";
import {
  Home, Heart, Image, MapPin, Flower2, Flame, Gift
} from "lucide-react";

const NAV_ITEMS = [
  { id: "home",      label: "Home",       icon: <Home size={18} /> },
  { id: "welcome",   label: "Welcome",    icon: <Heart size={18} /> },
  { id: "gallery",   label: "Gallery",    icon: <Image size={18} /> },
  { id: "location",  label: "Details",    icon: <MapPin size={18} /> },
  { id: "roses",     label: "Roses",      icon: <Flower2 size={18} /> },
  { id: "candles",   label: "Candles",    icon: <Flame size={18} /> },
  { id: "treasures", label: "Treasures",  icon: <Gift size={18} /> },
];

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export default function App() {
  const [showAdmin, setShowAdmin] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  // Check URL for admin parameter
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("admin") === "true") setShowAdmin(true);
  }, []);

  // Track active section for mobile nav highlight
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActiveSection(e.target.id); });
      },
      { threshold: 0.4 }
    );
    NAV_ITEMS.forEach(item => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  if (showAdmin) {
    return <AdminDashboard onClose={() => {
      setShowAdmin(false);
      // Remove admin param from URL
      const url = new URL(window.location.href);
      url.searchParams.delete("admin");
      window.history.replaceState({}, "", url.toString());
    }} />;
  }

  return (
    <>
      <EnvelopeAnimation>
        <div
        className="min-h-screen"
        style={{ fontFamily: "'Raleway', sans-serif", overflowX: "hidden" }}
      >
        {/* ── Desktop top navbar (hidden on mobile) ── */}
        <nav
          className="hidden md:flex fixed top-0 left-0 right-0 z-40 items-center justify-center px-6 py-3 gap-1 sm:gap-2"
          style={{
            background: "rgba(61, 31, 42, 0.85)",
            backdropFilter: "blur(12px)",
            borderBottom: "1px solid rgba(212, 175, 55, 0.15)",
          }}
        >
          <div
            className="flex items-center gap-1 sm:gap-2 overflow-x-auto"
            style={{ scrollbarWidth: "none" }}
          >
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="px-3 py-1.5 rounded-full transition-all duration-200 hover:bg-white/10 whitespace-nowrap"
                style={{
                  fontFamily: "'Raleway', sans-serif",
                  fontSize: "0.7rem",
                  letterSpacing: "0.12em",
                  color: activeSection === item.id ? "#D4AF37" : "rgba(255,255,255,0.75)",
                  fontWeight: activeSection === item.id ? 700 : 500,
                  textTransform: "uppercase",
                  border: "none",
                  background: "none",
                  cursor: "pointer",
                }}
              >
                {item.label}
              </button>
            ))}
          </div>
        </nav>

        {/* ── Page sections ── */}
        <HeroSection onScrollTo={scrollTo} />
        <WelcomeSection />
        <GallerySection />
        <LocationSection />
        <EighteenRoses />
        <EighteenCandles />
        <EighteenTreasures />
        <FooterSection onAdminClick={() => setShowAdmin(true)} />

        {/* ── Mobile bottom navbar (shown only on mobile) ── */}
        <nav
          className="md:hidden fixed bottom-0 left-0 right-0 z-40 flex items-center justify-around"
          style={{
            background: "rgba(26, 10, 16, 0.97)",
            backdropFilter: "blur(20px)",
            borderTop: "1px solid rgba(212, 175, 55, 0.2)",
            paddingBottom: "env(safe-area-inset-bottom, 0.5rem)",
            paddingTop: "0.5rem",
          }}
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="flex flex-col items-center gap-0.5 px-2 py-1 transition-all duration-200"
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: isActive ? "#D4AF37" : "rgba(255,255,255,0.4)",
                  minWidth: "2.5rem",
                }}
              >
                <span
                  className="flex items-center justify-center w-8 h-8 rounded-full transition-all duration-200"
                  style={{
                    background: isActive ? "rgba(212,175,55,0.15)" : "transparent",
                    transform: isActive ? "scale(1.1)" : "scale(1)",
                  }}
                >
                  {item.icon}
                </span>
                <span
                  style={{
                    fontFamily: "'Raleway', sans-serif",
                    fontSize: "0.55rem",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    fontWeight: isActive ? 700 : 400,
                    color: isActive ? "#D4AF37" : "rgba(255,255,255,0.4)",
                  }}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </nav>

        {/* Bottom padding on mobile to account for nav bar */}
        <div className="md:hidden h-20" />
      </div>
    </EnvelopeAnimation>
    <MusicPlayer />
  </>
  );
}
