import { motion } from "motion/react";
import glizLandscape from "../../assets/images/gliz-landscape1.png";
import glizPortrait from "../../assets/images/gliz-portrait.png";
import { FloatingPetals } from "./FloatingPetals";

interface HeroSectionProps {
  onScrollTo: (id: string) => void;
}

export function HeroSection({ onScrollTo }: HeroSectionProps) {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #3D1F2A 0%, #6B2D40 30%, #B76E79 60%, #F4A7B9 100%)",
      }}
    >
      {/* Background image overlay */}
  <div className="absolute inset-0 opacity-20">
  {/* Desktop */}
  <div
    className="hidden md:block absolute inset-0 bg-contain bg-center"
    style={{ backgroundImage: `url(${glizLandscape})` }}
  />

  {/* Mobile */}
  <div
    className="block md:hidden absolute inset-0 bg-cover bg-center"
    style={{ backgroundImage: `url(${glizPortrait})` }}
  />
</div>
      <FloatingPetals />

      {/* Decorative circles */}
      <div
        className="absolute top-20 left-10 w-64 h-64 rounded-full opacity-10"
        style={{ background: "radial-gradient(circle, #D4AF37, transparent)" }}
      />
      <div
        className="absolute bottom-20 right-10 w-80 h-80 rounded-full opacity-10"
        style={{ background: "radial-gradient(circle, #F9D4DC, transparent)" }}
      />

      <div className="relative z-20 text-center px-6 max-w-4xl mx-auto">
        {/* Pre-title */}
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-sm tracking-[0.4em] uppercase mb-4"
          style={{ color: "#D4AF37", fontFamily: "'Raleway', sans-serif", fontWeight: 300 }}
        >
          — You Are Invited —
        </motion.p>

        {/* Main script heading */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          style={{
            fontFamily: "'Great Vibes', cursive",
            fontSize: "clamp(4rem, 12vw, 9rem)",
            color: "#ffffff",
            lineHeight: 1.1,
            textShadow: "0 2px 20px rgba(212, 175, 55, 0.4)",
          }}
        >
          Glizlen Casquejo
        </motion.h1>

        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="mt-4 mb-8"
        >
          <div
            className="flex items-center justify-center gap-4 mb-3"
            style={{ color: "#F9D4DC" }}
          >
            <span style={{ borderTop: "1px solid rgba(212,175,55,0.5)", width: "60px", display: "inline-block" }} />
            <span
              style={{
                fontFamily: "'Raleway', sans-serif",
                fontSize: "clamp(0.9rem, 2.5vw, 1.1rem)",
                letterSpacing: "0.2em",
                fontWeight: 300,
              }}
            >
              TURNS
            </span>
            <span
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(2rem, 6vw, 3.5rem)",
                color: "#D4AF37",
                fontWeight: 700,
                lineHeight: 1,
              }}
            >
              18
            </span>
            <span
              style={{
                fontFamily: "'Raleway', sans-serif",
                fontSize: "clamp(0.9rem, 2.5vw, 1.1rem)",
                letterSpacing: "0.2em",
                fontWeight: 300,
              }}
            >
              TODAY
            </span>
            <span style={{ borderTop: "1px solid rgba(212,175,55,0.5)", width: "60px", display: "inline-block" }} />
          </div>

          <p
            style={{
              fontFamily: "'Raleway', sans-serif",
              fontSize: "clamp(0.85rem, 2vw, 1rem)",
              color: "#F4A7B9",
              letterSpacing: "0.15em",
              fontWeight: 300,
            }}
          >
            Saturday, the Eighth of August, Two Thousand Twenty-Six
          </p>
        </motion.div>

        {/* Gold divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, delay: 1 }}
          className="flex items-center justify-center gap-3 mb-8"
        >
          <div style={{ height: "1px", background: "linear-gradient(to right, transparent, #D4AF37)", width: "80px" }} />
          <span style={{ color: "#D4AF37", fontSize: "1.2rem" }}>✦</span>
          <div style={{ height: "1px", background: "linear-gradient(to left, transparent, #D4AF37)", width: "80px" }} />
        </motion.div>

        {/* Event details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.1 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12 mb-10"
          style={{ fontFamily: "'Raleway', sans-serif", color: "#ffffff" }}
        >
          <div className="text-center">
            <p style={{ fontSize: "0.7rem", letterSpacing: "0.25em", color: "#D4AF37", fontWeight: 600, textTransform: "uppercase" }}>Time</p>
            <p style={{ fontSize: "1rem", fontWeight: 300 }}>6:00 PM onwards</p>
          </div>
          <div style={{ width: "1px", height: "40px", background: "rgba(212,175,55,0.4)" }} className="hidden sm:block" />
          <div className="text-center">
            <p style={{ fontSize: "0.7rem", letterSpacing: "0.25em", color: "#D4AF37", fontWeight: 600, textTransform: "uppercase" }}>Venue</p>
            <p style={{ fontSize: "1rem", fontWeight: 300 }}>1101 Victorio Pacaldo Sr. St, Cordova, 6017 Cebu</p>
          </div>
          <div style={{ width: "1px", height: "40px", background: "rgba(212,175,55,0.4)" }} className="hidden sm:block" />
          <div className="text-center">
            <p style={{ fontSize: "0.7rem", letterSpacing: "0.25em", color: "#D4AF37", fontWeight: 600, textTransform: "uppercase" }}>Attire</p>
            <p style={{ fontSize: "1rem", fontWeight: 300 }}>White/Yellow or Formal</p>
          </div>
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={() => onScrollTo("gallery")}
            className="px-8 py-3 rounded-full transition-all duration-300 hover:scale-105"
            style={{
              background: "linear-gradient(135deg, #D4AF37, #B8960C)",
              color: "#3D1F2A",
              fontFamily: "'Raleway', sans-serif",
              letterSpacing: "0.15em",
              fontSize: "0.8rem",
              fontWeight: 600,
              textTransform: "uppercase",
              boxShadow: "0 4px 20px rgba(212,175,55,0.4)",
              border: "none",
              cursor: "pointer",
            }}
          >
            View Gallery
          </button>
          <button
            onClick={() => onScrollTo("location")}
            className="px-8 py-3 rounded-full transition-all duration-300 hover:scale-105"
            style={{
              background: "transparent",
              color: "#ffffff",
              fontFamily: "'Raleway', sans-serif",
              letterSpacing: "0.15em",
              fontSize: "0.8rem",
              fontWeight: 600,
              textTransform: "uppercase",
              border: "1px solid rgba(255,255,255,0.5)",
              cursor: "pointer",
            }}
          >
            Event Details
          </button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ color: "rgba(255,255,255,0.6)", cursor: "pointer" }}
            onClick={() => onScrollTo("welcome")}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
