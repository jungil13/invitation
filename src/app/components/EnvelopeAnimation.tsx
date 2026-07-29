import { useState, ReactNode, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";

interface EnvelopeAnimationProps {
  children: ReactNode;
}

// The real Tangled / Corona Sun emblem as an SVG - memoized static
function TangledSunSeal({ glowing }: { glowing?: boolean }) {
  const longRays = useMemo(
    () =>
      Array.from({ length: 8 }, (_, i) => {
        const angle = (i * 360) / 8;
        const rad = (angle * Math.PI) / 180;
        const x2 = 50 + Math.cos(rad) * 44;
        const y2 = 50 + Math.sin(rad) * 44;
        const lx = 50 + Math.cos(rad - 0.28) * 22;
        const ly = 50 + Math.sin(rad - 0.28) * 22;
        const rx = 50 + Math.cos(rad + 0.28) * 22;
        const ry = 50 + Math.sin(rad + 0.28) * 22;
        return { key: i, points: `${lx},${ly} ${x2},${y2} ${rx},${ry}` };
      }),
    []
  );

  const shortRays = useMemo(
    () =>
      Array.from({ length: 8 }, (_, i) => {
        const angle = (i * 360) / 8 + 22.5;
        const rad = (angle * Math.PI) / 180;
        const x2 = 50 + Math.cos(rad) * 36;
        const y2 = 50 + Math.sin(rad) * 36;
        const lx = 50 + Math.cos(rad - 0.22) * 22;
        const ly = 50 + Math.sin(rad - 0.22) * 22;
        const rx = 50 + Math.cos(rad + 0.22) * 22;
        const ry = 50 + Math.sin(rad + 0.22) * 22;
        return { key: i, points: `${lx},${ly} ${x2},${y2} ${rx},${ry}` };
      }),
    []
  );

  return (
    <svg
      viewBox="0 0 100 100"
      width="100%"
      height="100%"
      xmlns="http://www.w3.org/2000/svg"
      style={{ filter: glowing ? "drop-shadow(0 0 8px #FFD700) drop-shadow(0 0 18px #FFA500)" : "none" }}
    >
      <circle cx="50" cy="50" r="47" fill="none" stroke="#FFD700" strokeWidth="1.5" opacity="0.7" />
      <circle cx="50" cy="50" r="43" fill="none" stroke="#FFD700" strokeWidth="0.5" opacity="0.4" />
      {longRays.map((r) => (
        <polygon key={`long-${r.key}`} points={r.points} fill="#FFD700" opacity="0.95" />
      ))}
      {shortRays.map((r) => (
        <polygon key={`short-${r.key}`} points={r.points} fill="#FFA500" opacity="0.85" />
      ))}
      <circle cx="50" cy="50" r="18" fill="#FFD700" />
      <circle cx="50" cy="50" r="15" fill="#FFA500" opacity="0.6" />
      <circle cx="50" cy="50" r="10" fill="#FFD700" />
      <ellipse cx="45" cy="48" rx="2" ry="2.5" fill="#241846" />
      <ellipse cx="55" cy="48" rx="2" ry="2.5" fill="#241846" />
      <path d="M44 54 Q50 59 56 54" stroke="#241846" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    </svg>
  );
}

// GPU-accelerated canvas-based star + sparkle field — single draw call
function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize, { passive: true });

    // Stars — static positions, only opacity twinkling
    const stars = Array.from({ length: 60 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 1.2 + 0.3,
      phase: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.015 + 0.005,
    }));

    // Sparkles — float upward
    const sparkles = Array.from({ length: 10 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 5 + 3,
      phase: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.4 + 0.2,
      drift: (Math.random() - 0.5) * 0.3,
    }));

    let t = 0;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      t += 0.016;

      // Draw stars
      for (const s of stars) {
        const alpha = 0.15 + 0.6 * (0.5 + 0.5 * Math.sin(s.phase + t * s.speed * 60));
        ctx.globalAlpha = alpha;
        ctx.fillStyle = "#fff";
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw sparkle stars (4-pointed)
      for (const sp of sparkles) {
        sp.y -= sp.speed;
        sp.x += sp.drift;
        if (sp.y < -20) {
          sp.y = canvas.height + 10;
          sp.x = Math.random() * canvas.width;
        }
        const alpha = 0.3 + 0.5 * (0.5 + 0.5 * Math.sin(sp.phase + t * 2));
        ctx.globalAlpha = alpha;
        ctx.fillStyle = "#FFD700";
        const s = sp.size;
        const x = sp.x;
        const y = sp.y;
        ctx.beginPath();
        ctx.moveTo(x, y - s);
        ctx.lineTo(x + s * 0.3, y - s * 0.3);
        ctx.lineTo(x + s, y);
        ctx.lineTo(x + s * 0.3, y + s * 0.3);
        ctx.lineTo(x, y + s);
        ctx.lineTo(x - s * 0.3, y + s * 0.3);
        ctx.lineTo(x - s, y);
        ctx.lineTo(x - s * 0.3, y - s * 0.3);
        ctx.closePath();
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ willChange: "transform" }}
    />
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
            exit={{ opacity: 0, scale: 1.05, transition: { duration: 0.9, ease: "easeInOut" } }}
          >
            {/* Single canvas handles all particles — far cheaper than 95 motion.divs */}
            <ParticleCanvas />

            {/* Radial aurora glow */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: "radial-gradient(ellipse 80% 60% at 50% 60%, rgba(100,50,200,0.15) 0%, transparent 70%)",
              }}
            />

            {/* Title */}
            <motion.div
              className="relative z-20 mb-8 text-center"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
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
              initial={{ opacity: 0, y: 30, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.5, ease: "easeOut" }}
            >
              <div
                className="relative cursor-pointer"
                style={{
                  width: "clamp(280px, 80vw, 500px)",
                  aspectRatio: "4/3",
                  perspective: "1200px",
                  filter: "drop-shadow(0 20px 50px rgba(100, 50, 200, 0.35))",
                }}
                onClick={handleOpen}
              >
                {/* === ENVELOPE BODY === */}
                <div
                  className="absolute inset-0 rounded-lg overflow-hidden"
                  style={{
                    background: "linear-gradient(160deg, #2A1C5A 0%, #1D1040 100%)",
                    boxShadow: "inset 0 0 40px rgba(100,60,200,0.25)",
                  }}
                >
                  <div
                    className="absolute inset-0"
                    style={{
                      background: "radial-gradient(ellipse at center, rgba(255,215,0,0.04) 0%, transparent 70%)",
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
                  transition={{ duration: 1, delay: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
                >
                  <div className="w-full h-full flex flex-col items-center justify-start pt-8 px-8">
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

                {/* Top Flap (Animated) — GPU-only transform */}
                <motion.div
                  className="absolute top-0 left-0 right-0 h-2/3 origin-top"
                  initial={{ rotateX: 0 }}
                  animate={{ rotateX: isOpen ? 185 : 0 }}
                  transition={{ duration: 1.1, ease: [0.4, 0, 0.2, 1] }}
                  style={{
                    zIndex: isOpen ? 0 : 20,
                    transformStyle: "preserve-3d",
                    willChange: "transform",
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
                    {/* CSS-based pulse ring — no Framer Motion for this continuous loop */}
                    <div
                      className="relative flex items-center justify-center rounded-full cursor-pointer"
                      style={{ width: 72, height: 72 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpen();
                      }}
                      aria-label="Open envelope"
                    >
                      {/* Pulse ring — pure CSS, no JS */}
                      {!isOpen && (
                        <span
                          className="absolute inset-0 rounded-full border border-yellow-400"
                          style={{ animation: "seal-pulse 2s ease-in-out infinite" }}
                        />
                      )}
                      {/* Seal background */}
                      <div
                        className="absolute inset-0 rounded-full"
                        style={{
                          background: "radial-gradient(circle at 40% 35%, #FFEC6E 0%, #FFD700 40%, #FFA500 75%, #CC7700 100%)",
                          boxShadow: "0 4px 20px rgba(255,165,0,0.6), inset 0 2px 4px rgba(255,255,255,0.4)",
                          transition: "transform 0.15s ease",
                        }}
                      />
                      {/* Sun emblem */}
                      <div className="relative z-10" style={{ width: 56, height: 56 }}>
                        <TangledSunSeal glowing />
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Golden border frame */}
                <div
                  className="absolute inset-0 rounded-lg pointer-events-none z-30"
                  style={{
                    border: "1px solid rgba(255,215,0,0.25)",
                    boxShadow: "inset 0 0 30px rgba(255,165,0,0.04), 0 0 40px rgba(100,60,200,0.25)",
                  }}
                />
              </div>
            </motion.div>

            {/* Tap instruction — CSS blink, no Framer Motion loop */}
            {!isOpen && (
              <motion.div
                className="relative z-20 mt-8 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
              >
                <p
                  style={{
                    fontFamily: "'Raleway', sans-serif",
                    fontSize: "0.7rem",
                    letterSpacing: "0.35em",
                    color: "#FFD700",
                    textTransform: "uppercase",
                    fontWeight: 400,
                    animation: "text-blink 2.5s ease-in-out infinite",
                  }}
                >
                  ✦ Tap the sun seal to open ✦
                </p>
              </motion.div>
            )}

            {/* Reveal burst — fires once, not looping */}
            <AnimatePresence>
              {phase === "revealing" && (
                <motion.div
                  className="fixed inset-0 z-50 pointer-events-none"
                  style={{ background: "radial-gradient(circle at center, #FFD700 0%, #FFA500 30%, transparent 70%)" }}
                  initial={{ opacity: 0, scale: 0.2 }}
                  animate={{ opacity: [0, 0.5, 0], scale: [0.2, 2.5, 4] }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.1, ease: "easeOut" }}
                />
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Website Content */}
      {showContent && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          {children}
        </motion.div>
      )}

      {/* CSS keyframes injected once */}
      <style>{`
        @keyframes seal-pulse {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 0; transform: scale(1.35); }
        }
        @keyframes text-blink {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
        }
      `}</style>
    </>
  );
}
