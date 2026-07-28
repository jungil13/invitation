import { motion } from "motion/react";
import { Gift } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";

const DEFAULT_TREASURES = [
  { name: "Maria Garcia", relation: "Mother", gift: "A Mother's Love", description: "The most precious gift of all — unconditional love that has shaped who you are." },
  { name: "Roberto Garcia", relation: "Father", gift: "A Father's Wisdom", description: "Years of guidance, lessons, and quiet support that have prepared you for the world." },
  { name: "Isabella Garcia", relation: "Sister", gift: "Lifelong Sisterhood", description: "A bond that time and distance can never break, your forever confidant." },
  { name: "Miguel Garcia", relation: "Brother", gift: "A Brother's Protection", description: "A promise to always stand by your side and have your back." },
  { name: "Lola Carmen", relation: "Grandmother", gift: "Family Legacy", description: "The stories, traditions, and values passed down with endless love." },
  { name: "Lolo Jose", relation: "Grandfather", gift: "Prayers & Blessings", description: "A lifetime of prayers said for your happiness and well-being." },
  { name: "Tita Rosa", relation: "Aunt", gift: "Golden Necklace", description: "A shimmering piece to adorn your beauty as you shine in this world." },
  { name: "Tito Marco", relation: "Uncle", gift: "Travel Fund", description: "Resources to explore the world and find yourself in its vast beauty." },
  { name: "Cousin Ana", relation: "Cousin", gift: "Friendship Journal", description: "A beautiful journal to capture every thought, dream, and adventure." },
  { name: "Cousin Luis", relation: "Cousin", gift: "Spotify Premium", description: "A year of music for every mood, every moment, every memory." },
  { name: "Andrea Santos", relation: "Best Friend", gift: "Spa & Wellness Day", description: "A day of pampering because you deserve to be treated like the queen you are." },
  { name: "Claire Reyes", relation: "Best Friend", gift: "Personalized Jewelry Box", description: "To hold all the treasures — both given and gathered — in your life." },
  { name: "Jake Torres", relation: "Special Friend", gift: "Photography Session", description: "A session to capture your beautiful self at this incredible milestone." },
  { name: "Nina Flores", relation: "Friend", gift: "Perfume Collection", description: "Scents that capture your elegance, warmth, and unforgettable spirit." },
  { name: "Marc Lim", relation: "Friend", gift: "Book of Dreams", description: "A curated collection of inspiring stories to fuel your wildest ambitions." },
  { name: "Aunt Elena", relation: "Aunt", gift: "Pearl Earrings", description: "Classic elegance for the remarkable young woman you have become." },
  { name: "Ninong Tony", relation: "Godfather", gift: "Educational Fund", description: "An investment in your future, because your potential knows no limits." },
  { name: "Ninang Grace", relation: "Godmother", gift: "A Blessing & A Prayer", description: "The most powerful gift — a heart-full of prayers for your beautiful life ahead." },
];

const categoryColors: Record<string, { bg: string; accent: string; text: string }> = {
  default: { bg: "rgba(212, 175, 55, 0.08)", accent: "#D4AF37", text: "#D4AF37" },
};

export function EighteenTreasures() {
  const [treasures, setTreasures] = useState<{name: string; relation: string; gift: string; description: string}[]>(DEFAULT_TREASURES);

  useEffect(() => {
    supabase.from("ceremony_members").select("name,relation,message,gift,position")
      .eq("category", "treasures").order("position")
      .then(({ data }) => {
        if (data && data.length > 0)
          setTreasures(data.map(d => ({ name: d.name, relation: d.relation, gift: d.gift || "", description: d.message })));
      });
  }, []);

  return (
    <section
      id="treasures"
      className="py-24 px-6"
      style={{ background: "linear-gradient(180deg, #FFF8F4 0%, #FDF6F0 100%)" }}
    >
      <div className="max-w-6xl mx-auto">
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
              color: "#B76E79",
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
              color: "#B76E79",
              lineHeight: 1.2,
            }}
          >
            18 Treasures
          </h2>
          <div className="flex items-center justify-center gap-3 mt-4">
            <div style={{ height: "1px", background: "linear-gradient(to right, transparent, #D4AF37)", width: "60px" }} />
            <span style={{ color: "#D4AF37" }}>✦</span>
            <div style={{ height: "1px", background: "linear-gradient(to left, transparent, #D4AF37)", width: "60px" }} />
          </div>
          <p
            style={{
              fontFamily: "'Raleway', sans-serif",
              fontSize: "1rem",
              color: "#8B5563",
              fontWeight: 300,
              marginTop: "1rem",
              lineHeight: 1.7,
              maxWidth: "600px",
              margin: "1rem auto 0",
            }}
          >
            Eighteen precious gifts from those who treasure her most — each one a token of love, hope, and celebration.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {treasures.map((treasure, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
              className="p-6 rounded-2xl relative overflow-hidden group hover:shadow-lg transition-all duration-300"
              style={{
                background: "rgba(255,255,255,0.9)",
                border: "1px solid rgba(212, 175, 55, 0.2)",
                boxShadow: "0 2px 15px rgba(183, 110, 121, 0.06)",
              }}
            >
              {/* Number badge */}
              <div
                className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, #D4AF37, #B8960C)",
                  color: "#ffffff",
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "0.8rem",
                  fontWeight: 700,
                }}
              >
                {i + 1}
              </div>

              {/* Gift icon */}
              <Gift className="text-[#D4AF37] mb-3" size={32} />

              <p
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "1rem",
                  color: "#B76E79",
                  fontWeight: 600,
                  marginBottom: "0.15rem",
                  fontStyle: "italic",
                }}
              >
                {treasure.gift}
              </p>
              <p
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "1rem",
                  color: "#3D1F2A",
                  fontWeight: 500,
                  marginBottom: "0.2rem",
                }}
              >
                {treasure.name}
              </p>
              <p
                style={{
                  fontFamily: "'Raleway', sans-serif",
                  fontSize: "0.75rem",
                  color: "#D4AF37",
                  letterSpacing: "0.15em",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  marginBottom: "0.75rem",
                }}
              >
                {treasure.relation}
              </p>
              <p
                style={{
                  fontFamily: "'Raleway', sans-serif",
                  fontSize: "0.88rem",
                  color: "#8B5563",
                  fontWeight: 300,
                  lineHeight: 1.65,
                }}
              >
                {treasure.description}
              </p>

              <div
                className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-500"
                style={{ background: "linear-gradient(to right, #B76E79, #D4AF37)" }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
