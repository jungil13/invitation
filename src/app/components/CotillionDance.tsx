import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import { Users } from "lucide-react";

export interface CotillionCouple {
  id?: string;
  pair_number: number;
  gentleman: string;
  lady: string;
}

const DEFAULT_COTILLION_COUPLES: CotillionCouple[] = [
  {
    pair_number: 1,
    gentleman: "Aljess Casquejo",
    lady: "Pretsie Babatuan",
  },
  {
    pair_number: 2,
    gentleman: "Stephen Barbadillo",
    lady: "Deah Bancale",
  },
  {
    pair_number: 3,
    gentleman: "Jayden Kent Orbiso",
    lady: "Noren Albios",
  },
  {
    pair_number: 4,
    gentleman: "Fritz Ivan Robles Laroda",
    lady: "Nicey Caballes Ybanez",
  },
  {
    pair_number: 5,
    gentleman: "Kenneth Inoc",
    lady: "Lharrajen Larobis",
  },
  {
    pair_number: 6,
    gentleman: "Darios Marquez",
    lady: "Lyanne Aledon",
  },
  {
    pair_number: 7,
    gentleman: "Albert Ecat",
    lady: "Precious Nicole",
  },
  {
    pair_number: 8,
    gentleman: "Joshua Ando",
    lady: "Loreen Jean Nacar",
  },
];

export function CotillionDance() {
  const [couples, setCouples] = useState<CotillionCouple[]>(DEFAULT_COTILLION_COUPLES);

  useEffect(() => {
    supabase
      .from("cotillion_couples")
      .select("*")
      .order("pair_number", { ascending: true })
      .then(({ data }) => {
        if (data && data.length > 0) {
          setCouples(data);
        }
      });
  }, []);

  return (
    <section
      id="cotillion"
      className="py-16 sm:py-24 px-4 sm:px-6 relative overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #0E0720 0%, #1A0D36 50%, #0E0720 100%)",
      }}
    >
      {/* Background ambient lighting */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[600px] sm:h-[600px] rounded-full pointer-events-none opacity-20 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(255, 215, 0, 0.25) 0%, rgba(138, 43, 226, 0.15) 50%, transparent 70%)",
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="text-center mb-10 sm:mb-16"
        >
          <p
            style={{
              fontFamily: "'Raleway', sans-serif",
              fontSize: "0.7rem",
              letterSpacing: "0.3em",
              color: "#FFD700",
              fontWeight: 600,
              textTransform: "uppercase",
              marginBottom: "0.75rem",
            }}
          >
            ✦ Court of Honor ✦
          </p>
          <h2
            style={{
              fontFamily: "'Great Vibes', cursive",
              fontSize: "clamp(2.5rem, 10vw, 5.5rem)",
              color: "#ffffff",
              lineHeight: 1.2,
              textShadow: "0 0 25px rgba(255,215,0,0.3)",
            }}
          >
            Cotillion Dance
          </h2>
          <div className="flex items-center justify-center gap-3 mt-4">
            <div
              style={{
                height: "1px",
                background: "linear-gradient(to right, transparent, #FFD700)",
                width: "50px",
              }}
            />
            <span style={{ color: "#FFD700" }}>✦</span>
            <div
              style={{
                height: "1px",
                background: "linear-gradient(to left, transparent, #FFD700)",
                width: "50px",
              }}
            />
          </div>
          <p
            style={{
              fontFamily: "'Raleway', sans-serif",
              fontSize: "clamp(0.85rem, 2.5vw, 1rem)",
              color: "rgba(255,255,255,0.75)",
              fontWeight: 300,
              lineHeight: 1.7,
              maxWidth: "600px",
              margin: "1rem auto 0",
              padding: "0 0.5rem",
            }}
          >
            A traditional dance of elegance and grace. Meet the eight couples of the Court of Honor
            who share the floor in celebration of Glizlen's 18th Birthday.
          </p>
        </motion.div>

        {/* Court of Honor Couples Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          {couples.map((couple, i) => (
            <motion.div
              key={couple.pair_number}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (i % 4) * 0.1 }}
              className="p-4 sm:p-6 rounded-2xl relative overflow-hidden group transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
              style={{
                background: "rgba(255, 255, 255, 0.04)",
                border: "1px solid rgba(255, 215, 0, 0.18)",
                backdropFilter: "blur(10px)",
              }}
            >
              {/* Pair Number Badge */}
              <div
                className="absolute top-3 right-3 sm:top-4 sm:right-4 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shadow-md shrink-0"
                style={{
                  background: "linear-gradient(135deg, #FFD700, #B8960C)",
                  color: "#0E0720",
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "0.8rem",
                  fontWeight: 700,
                }}
              >
                {couple.pair_number}
              </div>

              <div className="flex items-center gap-2 mb-3 pr-8">
                <Users size={16} className="text-[#FFD700] shrink-0" />
                <span
                  style={{
                    fontFamily: "'Raleway', sans-serif",
                    fontSize: "0.7rem",
                    letterSpacing: "0.15em",
                    color: "#FFD700",
                    fontWeight: 600,
                    textTransform: "uppercase",
                  }}
                >
                  Pair {couple.pair_number}
                </span>
              </div>

              {/* Pair Names Container */}
              <div className="flex flex-col gap-2 mt-2">
                {/* Gentleman row */}
                <div
                  className="flex flex-col xs:flex-row xs:items-center xs:justify-between gap-1 p-2.5 rounded-lg bg-white/5 border border-white/5 group-hover:border-[#FFD700]/20 transition-colors"
                >
                  <span
                    className="text-xs text-white/50 uppercase tracking-wider font-semibold shrink-0"
                  >
                    Gentleman
                  </span>
                  <span
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: "clamp(0.9rem, 2.5vw, 1.05rem)",
                      color: "#ffffff",
                      fontWeight: 600,
                      wordBreak: "break-word",
                    }}
                  >
                    {couple.gentleman}
                  </span>
                </div>

                {/* Lady row */}
                <div
                  className="flex flex-col xs:flex-row xs:items-center xs:justify-between gap-1 p-2.5 rounded-lg bg-[#FFD700]/5 border border-[#FFD700]/10 group-hover:border-[#FFD700]/30 transition-colors"
                >
                  <span
                    className="text-xs text-[#FFD700]/70 uppercase tracking-wider font-semibold shrink-0"
                  >
                    Lady
                  </span>
                  <span
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: "clamp(0.9rem, 2.5vw, 1.05rem)",
                      color: "#FFD700",
                      fontWeight: 600,
                      wordBreak: "break-word",
                    }}
                  >
                    {couple.lady}
                  </span>
                </div>
              </div>

              {/* Bottom accent glow bar */}
              <div
                className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-500"
                style={{ background: "linear-gradient(to right, #FFD700, #B8960C)" }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}