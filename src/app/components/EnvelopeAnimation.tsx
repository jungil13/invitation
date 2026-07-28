import { useState, ReactNode } from "react";
import { motion, AnimatePresence } from "motion/react";

interface EnvelopeAnimationProps {
  children: ReactNode;
}

// The real Tangled / Corona Sun emblem as an SVG
function TangledSunSeal({ glowing }: { glowing?: boolean }) {
  return (
    <svg
      viewBox="0 0 100 100"
      width="100%"
      height="100%"
      xmlns="http://www.w3.org/2000/svg"
      style={{ filter: glowing ? "drop-shadow(0 0 8px #FFD700) drop-shadow(0 0 18px #FFA500)" : "none" }}
    >
      {/* Outer ring */}
      <circle cx="50" cy="50" r="47" fill="none" stroke="#FFD700" strokeWidth="1.5" opacity="0.7" />
      <circle cx="50" cy="50" r="43" fill="none" stroke="#FFD700" strokeWidth="0.5" opacity="0.4" />

      {/* Sun rays — 8 long pointed rays */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i * 360) / 8;
        const rad = (angle * Math.PI) / 180;
        const x1 = 50 + Math.cos(rad) * 20;
        const y1 = 50 + Math.sin(rad) * 20;
        const x2 = 50 + Math.cos(rad) * 44;
        const y2 = 50 + Math.sin(rad) * 44;
        const lx = 50 + Math.cos(rad - 0.28) * 22;
        const ly = 50 + Math.sin(rad - 0.28) * 22;
        const rx = 50 + Math.cos(rad + 0.28) * 22;
        const ry = 50 + Math.sin(rad + 0.28) * 22;
        return (
          <polygon
            key={`long-${i}`}
            points={`${lx},${ly} ${x2},${y2} ${rx},${ry}`}
            fill="#FFD700"
            opacity="0.95"
          />
        );
      })}

      {/* Short rays between long rays */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i * 360) / 8 + 22.5;
        const rad = (angle * Math.PI) / 180;
        const x2 = 50 + Math.cos(rad) * 36;
        const y2 = 50 + Math.sin(rad) * 36;
        const lx = 50 + Math.cos(rad - 0.22) * 22;
        const ly = 50 + Math.sin(rad - 0.22) * 22;
        const rx = 50 + Math.cos(rad + 0.22) * 22;
        const ry = 50 + Math.sin(rad + 0.22) * 22;
        return (
          <polygon
            key={`short-${i}`}
            points={`${lx},${ly} ${x2},${y2} ${rx},${ry}`}
            fill="#FFA500"
            opacity="0.85"
          />
        );
      })}

      {/* Center sun face circle */}
      <circle cx="50" cy="50" r="18" fill="#FFD700" />
      <circle cx="50" cy="50" r="15" fill="#FFA500" opacity="0.6" />
      <circle cx="50" cy="50" r="10" fill="#FFD700" />

      {/* Sun face – eyes */}
      <ellipse cx="45" cy="48" rx="2" ry="2.5" fill="#241846" />
      <ellipse cx="55" cy="48" rx="2" ry="2.5" fill="#241846" />
      {/* Sun face – smile */}
      <path d="M44 54 Q50 59 56 54" stroke="#241846" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    </svg>
  );
}

// Star particle component
function StarField() {
  const stars = Array.from({ length: 80 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2.5 + 0.5,
    delay: Math.random() * 4,
    duration: Math.random() * 3 + 2,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden">
      {stars.map((s) => (
        <motion.div
          key={s.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
          }}
          animate={{ opacity: [0.1, 1, 0.1], scale: [1, 1.5, 1] }}
          transition={{ duration: s.duration, delay: s.delay, repeat: Infinity }}
        />
      ))}
    </div>
  );
}

// Floating sparkle particles around the envelope
function Sparkles() {
  const particles = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    x: Math.random() * 120 - 10,
    y: Math.random() * 120 - 10,
    delay: Math.random() * 3,
    duration: Math.random() * 2 + 1.5,
    size: Math.random() * 6 + 4,
  }));
  return (
    <>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute pointer-events-none"
          style={{ left: `${p.x}%`, top: `${p.y}%` }}
          animate={{ opacity: [0, 1, 0], y: [0, -20, -40], scale: [0.5, 1, 0] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity }}
        >
          <svg width={p.size} height={p.size} viewBox="0 0 24 24" fill="none">
            <path d="M12 2L13.5 9.5L21 11L13.5 12.5L12 20L10.5 12.5L3 11L10.5 9.5Z" fill="#FFD700" />
          </svg>
        </motion.div>
      ))}
    </>
  );
}

export function EnvelopeAnimation({ children }: EnvelopeAnimationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [phase, setPhase] = useState<"idle" | "opening" | "revealing">("idle");

  const handleOpen = () => {
    if (isOpen) return;
    setIsOpen(true);
    setPhase("opening");
    window.dispatchEvent(new Event("envelope-opened"));
    setTimeout(() => setPhase("revealing"), 1200);
    setTimeout(() => setShowContent(true), 2200);
  };

  return (
    <>
      <AnimatePresence>
        {!showContent && (
          <motion.div
            className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden"
            style={{ background: "linear-gradient(160deg, #06030F 0%, #0B0818 40%, #150E30 70%, #0A0520 100%)" }}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1, transition: { duration: 1.2, ease: "easeInOut" } }}
          >
            {/* Starfield background */}
            <StarField />

            {/* Radial aurora glow in background */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: "radial-gradient(ellipse 80% 60% at 50% 60%, rgba(100,50,200,0.18) 0%, transparent 70%)",
              }}
            />

            {/* Magical title above envelope */}
            <motion.div
              className="relative z-20 mb-8 text-center"
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.3 }}
            >
              <p
                style={{
                  fontFamily: "'Raleway', sans-serif",
                  fontSize: "clamp(0.65rem, 2vw, 0.8rem)",
                  letterSpacing: "0.5em",
                  color: "#FFD700",
                  textTransform: "uppercase",
                  fontWeight: 300,
                  marginBottom: "0.5rem",
                  opacity: 0.8,
                }}
              >
                ✦ A Royal Invitation ✦
              </p>
              <p
                style={{
                  fontFamily: "'Great Vibes', cursive",
                  fontSize: "clamp(2rem, 6vw, 3.5rem)",
                  color: "#ffffff",
                  textShadow: "0 0 40px rgba(255, 215, 0, 0.5), 0 2px 10px rgba(0,0,0,0.5)",
                  lineHeight: 1.1,
                }}
              >
                Glizlen's 18th
              </p>
            </motion.div>

            {/* Envelope Wrapper */}
            <motion.div
              className="relative z-20"
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
            >
              <div
                className="relative cursor-pointer"
                style={{
                  width: "clamp(280px, 80vw, 500px)",
                  aspectRatio: "4/3",
                  perspective: "1200px",
                  filter: "drop-shadow(0 20px 60px rgba(100, 50, 200, 0.4))",
                }}
                onClick={handleOpen}
              >
                {/* Sparkle particles */}
                <div className="absolute inset-0 z-40 pointer-events-none overflow-visible">
                  <Sparkles />
                </div>

                {/* === ENVELOPE BODY === */}
                {/* Back of envelope */}
                <div
                  className="absolute inset-0 rounded-lg overflow-hidden"
                  style={{
                    background: "linear-gradient(160deg, #2A1C5A 0%, #1D1040 100%)",
                    boxShadow: "inset 0 0 40px rgba(100,60,200,0.3)",
                  }}
                >
                  {/* Subtle inner glow */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: "radial-gradient(ellipse at center, rgba(255,215,0,0.05) 0%, transparent 70%)",
                    }}
                  />
                </div>

                {/* Letter peeking out */}
                <motion.div
                  className="absolute top-[12%] left-[6%] right-[6%] bottom-0 rounded-t-md overflow-hidden"
                  style={{
                    background: "linear-gradient(180deg, #F8F4E8 0%, #EDE5CC 100%)",
                    boxShadow: "0 -4px 20px rgba(0,0,0,0.3)",
                    zIndex: 5,
                  }}
                  initial={{ y: 0 }}
                  animate={{ y: isOpen ? -70 : 0 }}
                  transition={{ duration: 1.2, delay: 0.4, ease: "backOut" }}
                >
                  <div className="w-full h-full flex flex-col items-center justify-start pt-8 px-8">
                    {/* Sun emblem on letter */}
                    <div style={{ width: 40, height: 40, marginBottom: "0.75rem" }}>
                      <TangledSunSeal />
                    </div>
                    <p
                      style={{
                        fontFamily: "'Great Vibes', cursive",
                        color: "#3A2271",
                        fontSize: "clamp(1.2rem, 4vw, 1.8rem)",
                        textAlign: "center",
                        lineHeight: 1.4,
                      }}
                    >
                      You are invited...
                    </p>
                    <div style={{ width: "60%", height: "1px", background: "rgba(58,34,113,0.3)", margin: "0.75rem auto" }} />
                    <p
                      style={{
                        fontFamily: "'Raleway', sans-serif",
                        color: "#5A3D8A",
                        fontSize: "0.65rem",
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        textAlign: "center",
                      }}
                    >
                      To Glizlen's 18th Birthday
                    </p>
                  </div>
                </motion.div>

                {/* Bottom Flap */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-2/3 z-10 pointer-events-none"
                  style={{
                    clipPath: "polygon(0 100%, 100% 100%, 50% 0)",
                    background: "linear-gradient(180deg, #2E1F6A 0%, #1A0F40 100%)",
                  }}
                />

                {/* Left Flap */}
                <div
                  className="absolute inset-y-0 left-0 w-1/2 z-10 pointer-events-none"
                  style={{
                    clipPath: "polygon(0 0, 100% 50%, 0 100%)",
                    background: "linear-gradient(90deg, #1D1245 0%, #2A1A60 100%)",
                  }}
                />

                {/* Right Flap */}
                <div
                  className="absolute inset-y-0 right-0 w-1/2 z-10 pointer-events-none"
                  style={{
                    clipPath: "polygon(100% 0, 0 50%, 100% 100%)",
                    background: "linear-gradient(270deg, #1D1245 0%, #2A1A60 100%)",
                  }}
                />

                {/* Top Flap (Animated – flips open) */}
                <motion.div
                  className="absolute top-0 left-0 right-0 h-2/3 origin-top"
                  initial={{ rotateX: 0 }}
                  animate={{ rotateX: isOpen ? 185 : 0 }}
                  transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
                  style={{
                    zIndex: isOpen ? 0 : 20,
                    transformStyle: "preserve-3d",
                  }}
                >
                  {/* Front of top flap */}
                  <div
                    className="absolute inset-0"
                    style={{
                      clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                      backfaceVisibility: "hidden",
                      background: "linear-gradient(180deg, #3A2590 0%, #241860 100%)",
                      boxShadow: "inset 0 -10px 30px rgba(0,0,0,0.3)",
                    }}
                  >
                    {/* Decorative pattern on flap */}
                    <div
                      className="absolute inset-0"
                      style={{
                        clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                        background:
                          "repeating-linear-gradient(45deg, rgba(255,215,0,0.03) 0px, rgba(255,215,0,0.03) 1px, transparent 1px, transparent 10px)",
                      }}
                    />
                  </div>

                  {/* Back of top flap */}
                  <div
                    className="absolute inset-0"
                    style={{
                      clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                      transform: "rotateX(180deg)",
                      backfaceVisibility: "hidden",
                      background: "linear-gradient(180deg, #2A1C5A 0%, #1D1040 100%)",
                    }}
                  />

                  {/* === SEAL === */}
                  <div
                    className="absolute bottom-0 left-1/2"
                    style={{ transform: "translate(-50%, 50%)", zIndex: 30, pointerEvents: isOpen ? "none" : "auto" }}
                  >
                    <motion.button
                      className="relative flex items-center justify-center rounded-full cursor-pointer border-0 bg-transparent p-0"
                      style={{ width: 72, height: 72 }}
                      whileHover={{ scale: 1.12 }}
                      whileTap={{ scale: 0.93 }}
                      animate={
                        !isOpen
                          ? {
                              boxShadow: [
                                "0 0 0px rgba(255,215,0,0)",
                                "0 0 30px rgba(255,165,0,0.8)",
                                "0 0 0px rgba(255,215,0,0)",
                              ],
                            }
                          : {}
                      }
                      transition={
                        !isOpen ? { duration: 2.5, repeat: Infinity } : { type: "spring", stiffness: 400, damping: 20 }
                      }
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpen();
                      }}
                      aria-label="Open envelope"
                    >
                      {/* Outer glow ring */}
                      <motion.div
                        className="absolute inset-0 rounded-full border border-yellow-400"
                        animate={{ scale: [1, 1.3, 1], opacity: [0.6, 0, 0.6] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      {/* Seal background circle */}
                      <div
                        className="absolute inset-0 rounded-full"
                        style={{
                          background: "radial-gradient(circle at 40% 35%, #FFEC6E 0%, #FFD700 40%, #FFA500 75%, #CC7700 100%)",
                          boxShadow: "0 4px 20px rgba(255,165,0,0.6), inset 0 2px 4px rgba(255,255,255,0.4)",
                        }}
                      />
                      {/* Sun emblem */}
                      <div className="relative z-10" style={{ width: 56, height: 56 }}>
                        <TangledSunSeal glowing />
                      </div>
                    </motion.button>
                  </div>
                </motion.div>

                {/* Golden border frame on envelope */}
                <div
                  className="absolute inset-0 rounded-lg pointer-events-none z-30"
                  style={{
                    border: "1px solid rgba(255,215,0,0.25)",
                    boxShadow: "inset 0 0 30px rgba(255,165,0,0.05), 0 0 50px rgba(100,60,200,0.3)",
                  }}
                />
              </div>
            </motion.div>

            {/* Animated instruction text */}
            {!isOpen && (
              <motion.div
                className="relative z-20 mt-8 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1 }}
              >
                <motion.p
                  style={{
                    fontFamily: "'Raleway', sans-serif",
                    fontSize: "0.7rem",
                    letterSpacing: "0.35em",
                    color: "#FFD700",
                    textTransform: "uppercase",
                    fontWeight: 400,
                  }}
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                >
                  ✦ Tap the sun seal to open ✦
                </motion.p>
              </motion.div>
            )}

            {/* Reveal phase overlay – golden burst */}
            <AnimatePresence>
              {phase === "revealing" && (
                <motion.div
                  className="fixed inset-0 z-50 pointer-events-none"
                  style={{ background: "radial-gradient(circle at center, #FFD700 0%, #FFA500 30%, transparent 70%)" }}
                  initial={{ opacity: 0, scale: 0.2 }}
                  animate={{ opacity: [0, 0.6, 0], scale: [0.2, 2.5, 4] }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                />
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Website Content */}
      {showContent && (
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          {children}
        </motion.div>
      )}
    </>
  );
}



