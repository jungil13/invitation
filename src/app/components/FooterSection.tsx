import { motion } from "motion/react";
import { Flower2, Flame, Gift, Heart } from "lucide-react";
import { useState } from "react";

export function FooterSection({ onAdminClick }: { onAdminClick?: () => void }) {
  const [clickCount, setClickCount] = useState(0);

  const handleSecretClick = () => {
    const next = clickCount + 1;
    setClickCount(next);
    if (next >= 5) { setClickCount(0); onAdminClick?.(); }
  };
  return (
    <footer
      style={{ background: "linear-gradient(135deg, #3D1F2A 0%, #2A1015 100%)" }}
      className="py-16 px-6 text-center"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9 }}
      >
        {/* Icons */}
        <div className="flex justify-center gap-4 mb-6">
          <Flower2 size={24} className="text-[#B76E79]" />
          <Flame size={24} className="text-[#D4AF37]" />
          <Gift size={24} className="text-[#D4AF37]" />
        </div>

        <h2
          style={{
            fontFamily: "'Great Vibes', cursive",
            fontSize: "clamp(2.5rem, 7vw, 4rem)",
            color: "#ffffff",
            lineHeight: 1.2,
            marginBottom: "0.5rem",
          }}
        >
          Glizlen
        </h2>

        <div className="flex items-center justify-center gap-3 mb-6">
          <div style={{ height: "1px", background: "linear-gradient(to right, transparent, #D4AF37)", width: "50px" }} />
          <span
            style={{
              fontFamily: "'Raleway', sans-serif",
              fontSize: "0.75rem",
              letterSpacing: "0.35em",
              color: "#D4AF37",
              fontWeight: 600,
              textTransform: "uppercase",
            }}
          >
            Turns 18
          </span>
          <div style={{ height: "1px", background: "linear-gradient(to left, transparent, #D4AF37)", width: "50px" }} />
        </div>

        <p
          style={{
            fontFamily: "'Raleway', sans-serif",
            fontSize: "1rem",
            color: "#D4AF37",
            letterSpacing: "0.2em",
            fontWeight: 400,
            marginBottom: "1.5rem",
          }}
        >
          #GlizlenTurns18 · #Glizlen18thBirthday
        </p>

        <p
          style={{
            fontFamily: "'Raleway', sans-serif",
            fontSize: "0.9rem",
            color: "#F4A7B9",
            fontWeight: 300,
            lineHeight: 1.7,
            maxWidth: "500px",
            margin: "0 auto 2rem",
          }}
        >
          Thank you for being a beautiful part of this milestone. Your love, presence, and blessings mean the world to us.
        </p>

        <div
          className="flex items-center justify-center gap-4 text-sm"
          style={{
            fontFamily: "'Raleway', sans-serif",
            color: "rgba(255,255,255,0.4)",
            letterSpacing: "0.1em",
            fontWeight: 300,
          }}
        >
          <span>August 08, 2026</span>
          <span>·</span>
          <span>Datag Cordova Cebu</span>
          <span>·</span>
          <span className="flex items-center gap-1">With Love <Heart size={14} className="text-[#F4A7B9]" /></span>
        </div>

        <div className="mt-8 text-xs" style={{ color: "rgba(255,255,255,0.15)", fontFamily: "'Raleway', sans-serif", cursor: "default", userSelect: "none" }}
          onClick={handleSecretClick}
          title="">
          Made with love for Glizlen's 18th Birthday
        </div>
      </motion.div>
    </footer>
  );
}
