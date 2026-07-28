import { motion } from "motion/react";
import { Flower2 } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase, CeremonyMember } from "../../lib/supabase";

const DEFAULT_ROSES = [
  { name: "Maria Garcia", relation: "Mother", message: "For the woman who gave me life and endless love." },
  { name: "Roberto Garcia", relation: "Father", message: "To my princess, forever my little girl." },
  { name: "Isabella Garcia", relation: "Sister", message: "My best friend since day one." },
  { name: "Miguel Garcia", relation: "Brother", message: "My constant protector and confidant." },
  { name: "Lola Carmen", relation: "Grandmother", message: "You are my sunshine and pride." },
  { name: "Lolo Jose", relation: "Grandfather", message: "Watching you grow has been my greatest joy." },
  { name: "Tita Rosa", relation: "Aunt", message: "Your grace and beauty inspire us all." },
  { name: "Tito Marco", relation: "Uncle", message: "May all your dreams blossom like this rose." },
  { name: "Cousin Ana", relation: "Cousin", message: "Partners in crime and forever sisters." },
  { name: "Cousin Luis", relation: "Cousin", message: "You are the light of our family." },
  { name: "Andrea Santos", relation: "Best Friend", message: "Through every laugh and every tear." },
  { name: "Claire Reyes", relation: "Best Friend", message: "A true friend for a lifetime." },
  { name: "Jake Torres", relation: "Special Friend", message: "Your kindness touches everyone around you." },
  { name: "Nina Flores", relation: "Friend", message: "Dancing through life together." },
  { name: "Marc Lim", relation: "Friend", message: "You make every room brighter." },
  { name: "Aunt Elena", relation: "Aunt", message: "To my godchild, my heart's delight." },
  { name: "Ninong Tony", relation: "Godfather", message: "Always here to guide and support you." },
  { name: "Ninang Grace", relation: "Godmother", message: "My answered prayer, my beautiful gift." },
];

export function EighteenRoses() {
  const [roses, setRoses] = useState<Pick<CeremonyMember, "name"|"relation"|"message">[]>(DEFAULT_ROSES);

  useEffect(() => {
    supabase.from("ceremony_members").select("name,relation,message,position")
      .eq("category", "roses").order("position")
      .then(({ data }) => { if (data && data.length > 0) setRoses(data); });
  }, []);

  return (
    <section
      id="roses"
      className="py-24 px-6"
      style={{ background: "linear-gradient(180deg, #FDF6F0 0%, #FFF0F3 100%)" }}
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
              color: "#FFA500",
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
              color: "#FFA500",
              lineHeight: 1.2,
            }}
          >
            18 Roses
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
              color: "#8B5563",
              fontWeight: 300,
              marginTop: "1rem",
              lineHeight: 1.7,
              maxWidth: "600px",
              margin: "1rem auto 0",
            }}
          >
            Eighteen roses, each given by someone who has bloomed alongside her — a symbol of love, admiration, and the beautiful relationships she has cultivated.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {roses.map((rose, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
              className="p-6 rounded-2xl relative overflow-hidden group hover:shadow-lg transition-shadow duration-300"
              style={{
                background: "rgba(255,255,255,0.9)",
                border: "1px solid rgba(183, 110, 121, 0.15)",
                boxShadow: "0 2px 15px rgba(183, 110, 121, 0.08)",
              }}
            >
              {/* Number badge */}
              <div
                className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, #FFA500, #FFD700)",
                  color: "#ffffff",
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                }}
              >
                {i + 1}
              </div>

              {/* Rose icon */}
              <Flower2 className="text-[#FFA500] mb-3" size={32} />

              <p
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "1.1rem",
                  color: "#241846",
                  fontWeight: 600,
                  marginBottom: "0.2rem",
                }}
              >
                {rose.name}
              </p>
              <p
                style={{
                  fontFamily: "'Raleway', sans-serif",
                  fontSize: "0.75rem",
                  color: "#FFA500",
                  letterSpacing: "0.15em",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  marginBottom: "0.75rem",
                }}
              >
                {rose.relation}
              </p>
              <p
                style={{
                  fontFamily: "'Raleway', sans-serif",
                  fontSize: "0.9rem",
                  color: "#8B5563",
                  fontWeight: 300,
                  lineHeight: 1.6,
                  fontStyle: "italic",
                }}
              >
                "{rose.message}"
              </p>

              {/* Hover accent */}
              <div
                className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-500"
                style={{ background: "linear-gradient(to right, #FFA500, #FFD700)" }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
