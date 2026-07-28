import { motion } from "motion/react";
import { Flame } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase, CeremonyMember } from "../../lib/supabase";

const DEFAULT_CANDLES = [
  { name: "Maria Garcia", relation: "Mother", wish: "May your light shine brighter than any flame, illuminating the path to your greatest dreams." },
  { name: "Roberto Garcia", relation: "Father", wish: "I wish you the courage to chase every dream, the wisdom to choose well, and love in every step." },
  { name: "Isabella Garcia", relation: "Sister", wish: "May your life be filled with laughter, adventures, and all the things that make your heart sing." },
  { name: "Miguel Garcia", relation: "Brother", wish: "I wish you success in all that you do, and the strength to overcome every challenge." },
  { name: "Lola Carmen", relation: "Grandmother", wish: "May God's blessings pour over you like golden rain, every single day of your life." },
  { name: "Lolo Jose", relation: "Grandfather", wish: "I wish you a life filled with purpose, passion, and the peace that comes from knowing you are loved." },
  { name: "Tita Rosa", relation: "Aunt", wish: "May every candle you blow represent a dream already on its way to coming true." },
  { name: "Tito Marco", relation: "Uncle", wish: "I wish you the boldness to be yourself, unapologetically and beautifully." },
  { name: "Cousin Ana", relation: "Cousin", wish: "May your future be as bright and beautiful as you are tonight." },
  { name: "Cousin Luis", relation: "Cousin", wish: "I wish you happiness in every season and love in every reason." },
  { name: "Andrea Santos", relation: "Best Friend", wish: "May this year be the beginning of the most beautiful chapter of your story." },
  { name: "Claire Reyes", relation: "Best Friend", wish: "I wish you adventures that take your breath away and memories that last forever." },
  { name: "Jake Torres", relation: "Special Friend", wish: "May you always find your way back to joy, no matter where life takes you." },
  { name: "Nina Flores", relation: "Friend", wish: "I wish you a heart full of gratitude and eyes that see beauty everywhere." },
  { name: "Marc Lim", relation: "Friend", wish: "May your 18th year be your most extraordinary one yet." },
  { name: "Aunt Elena", relation: "Aunt", wish: "I wish you the wisdom to know your worth and the grace to carry it always." },
  { name: "Ninong Tony", relation: "Godfather", wish: "May every dream you have be the foundation for the incredible woman you are becoming." },
  { name: "Ninang Grace", relation: "Godmother", wish: "I wish you a life overflowing with love, laughter, and the grace to handle whatever comes your way." },
];

export function EighteenCandles() {
  const [candles, setCandles] = useState<{name: string; relation: string; wish: string}[]>(DEFAULT_CANDLES);

  useEffect(() => {
    supabase.from("ceremony_members").select("name,relation,message,position")
      .eq("category", "candles").order("position")
      .then(({ data }) => {
        if (data && data.length > 0)
          setCandles(data.map(d => ({ name: d.name, relation: d.relation, wish: d.message })));
      });
  }, []);

  return (
    <section
      id="candles"
      className="py-24 px-6 relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, #2A1A10 0%, #3D2415 100%)" }}
    >
      {/* Atmospheric glow effects */}
      <div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-10 pointer-events-none"
        style={{ background: "radial-gradient(circle, #FFA040, transparent)" }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-10 pointer-events-none"
        style={{ background: "radial-gradient(circle, #FFD700, transparent)" }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="text-center mb-16"
        >
          <p
            style={{
              fontFamily: "'Raleway', sans-serif",
              fontSize: "0.75rem",
              letterSpacing: "0.35em",
              color: "#FFD700",
              fontWeight: 600,
              textTransform: "uppercase",
              marginBottom: "1rem",
            }}
          >
            ✦ The Ceremony ✦
          </p>
          <h2
            style={{
              fontFamily: "'Great Vibes', cursive",
              fontSize: "clamp(3rem, 8vw, 5rem)",
              color: "#ffffff",
              lineHeight: 1.2,
            }}
          >
            18 Candles
          </h2>
          <div className="flex items-center justify-center gap-3 mt-4">
            <div style={{ height: "1px", background: "linear-gradient(to right, transparent, #FFD700)", width: "60px" }} />
            <span style={{ color: "#FFD700" }}>✦</span>
            <div style={{ height: "1px", background: "linear-gradient(to left, transparent, #FFD700)", width: "60px" }} />
          </div>
          <p
            style={{
              fontFamily: "'Raleway', sans-serif",
              fontSize: "1rem",
              color: "#C9A080",
              fontWeight: 300,
              marginTop: "1rem",
              lineHeight: 1.7,
              maxWidth: "600px",
              margin: "1rem auto 0",
            }}
          >
            Each flame lit by someone who wishes her a life filled with warmth, hope, and endless light.
          </p>

          {/* Special Instruction Note */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-8 max-w-2xl mx-auto p-5 rounded-xl text-center"
            style={{ 
              background: "rgba(212, 175, 55, 0.1)", 
              border: "1px solid rgba(212, 175, 55, 0.3)",
              boxShadow: "0 4px 20px rgba(0,0,0,0.2)"
            }}
          >
            <p
              style={{
                fontFamily: "'Raleway', sans-serif",
                fontSize: "1rem",
                color: "#ffffffff",
                fontWeight: 400,
                lineHeight: 1.6,
              }}
            >
              <strong style={{ color: "#FFD700", letterSpacing: "0.15em", display: "block", marginBottom: "0.5rem", fontSize: "0.85rem", textTransform: "uppercase" }}>
                ✦ Note for Candle Bearers ✦
              </strong> 
              Please prepare a handmade letter. Before the debutante blows her candles, you will place your letter inside the special box.
            </p>
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {candles.map((candle, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
              className="p-6 rounded-2xl relative overflow-hidden group hover:shadow-xl transition-shadow duration-300"
              style={{
                background: "rgba(255, 200, 100, 0.06)",
                border: "1px solid rgba(212, 175, 55, 0.2)",
              }}
            >
              {/* Number badge */}
              <div
                className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, #FFA040, #FFD700)",
                  color: "#2A1A10",
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "0.8rem",
                  fontWeight: 700,
                }}
              >
                {i + 1}
              </div>

              {/* Candle flicker icon */}
              <Flame className="text-[#FFD700] mb-3" size={32} />

              <p
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "1.1rem",
                  color: "#ffffff",
                  fontWeight: 600,
                  marginBottom: "0.2rem",
                }}
              >
                {candle.name}
              </p>
              <p
                style={{
                  fontFamily: "'Raleway', sans-serif",
                  fontSize: "0.75rem",
                  color: "#FFD700",
                  letterSpacing: "0.15em",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  marginBottom: "0.75rem",
                }}
              >
                {candle.relation}
              </p>
              <p
                style={{
                  fontFamily: "'Raleway', sans-serif",
                  fontSize: "0.88rem",
                  color: "#C9A080",
                  fontWeight: 300,
                  lineHeight: 1.7,
                  fontStyle: "italic",
                }}
              >
                "{candle.wish}"
              </p>

              {/* Glow effect on hover */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: "radial-gradient(ellipse at center, rgba(255,160,64,0.06), transparent)",
                }}
              />
              <div
                className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-500"
                style={{ background: "linear-gradient(to right, #FFA040, #FFD700)" }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
