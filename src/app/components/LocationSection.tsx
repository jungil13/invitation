import { motion } from "motion/react";
import { Calendar, Clock, MapPin, CheckCircle, XCircle } from "lucide-react";
import { useState } from "react";
import { supabase } from "../../lib/supabase";

export function LocationSection() {
  const [guestName, setGuestName] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState<"accept" | "decline" | null>(null);
  const [error, setError] = useState("");

  const handleRsvp = async (response: "accept" | "decline") => {
    if (!guestName.trim()) { setError("Please enter your name."); return; }
    setError("");
    setSubmitting(true);
    const { error: err } = await supabase.from("rsvp_responses").insert({
      guest_name: guestName.trim(),
      response,
      message: message.trim() || null,
    });
    setSubmitting(false);
    if (err) { setError("Something went wrong. Please try again."); }
    else { setSubmitted(response); }
  };

  return (
    <section
      id="location"
      className="py-24 px-6 relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #4A2810 0%, #9B5D22 50%, #D4AF37 100%)" }}
    >
      {/* Decorative elements */}
      <div
        className="absolute top-0 left-0 w-full h-full opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="max-w-5xl mx-auto relative z-10">
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
              color: "#ffffff",
              fontWeight: 600,
              textTransform: "uppercase",
              marginBottom: "1rem",
            }}
          >
            ✦ Join Us ✦
          </p>
          <h2
            style={{
              fontFamily: "'Great Vibes', cursive",
              fontSize: "clamp(3rem, 8vw, 5rem)",
              color: "#ffffff",
              lineHeight: 1.2,
            }}
          >
            Event Details
          </h2>
          <div className="flex items-center justify-center gap-3 mt-4">
            <div style={{ height: "1px", background: "linear-gradient(to right, transparent, rgba(255,255,255,0.5))", width: "60px" }} />
            <span style={{ color: "rgba(255,255,255,0.8)" }}>✦</span>
            <div style={{ height: "1px", background: "linear-gradient(to left, transparent, rgba(255,255,255,0.5))", width: "60px" }} />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {[
            {
              icon: <Calendar className="text-white mx-auto" size={32} />,
              label: "Date",
              main: "August 08, 2026",
              sub: "Saturday",
            },
            {
              icon: <Clock className="text-white mx-auto" size={32} />,
              label: "Time",
              main: "6:00 PM",
              sub: "Doors open at 5:30 PM",
            },
            {
              icon: <MapPin className="text-white mx-auto" size={32} />,
              label: "Venue",
              main: "KLN SKILLS CARWASH",
              sub: "1101 Victorio Pacaldo Sr. St, Cordova, 6017 Cebu"

            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.15 }}
              className="text-center p-8 rounded-2xl"
              style={{
                background: "rgba(255,255,255,0.1)",
                border: "1px solid rgba(255,255,255,0.2)",
                backdropFilter: "blur(10px)",
              }}
            >
              <div className="mb-4">{item.icon}</div>
              <p
                style={{
                  fontFamily: "'Raleway', sans-serif",
                  fontSize: "0.7rem",
                  letterSpacing: "0.3em",
                  color: "rgba(255,255,255,0.8)",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  marginBottom: "0.75rem",
                }}
              >
                {item.label}
              </p>
              <p
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "1.4rem",
                  color: "#ffffff",
                  marginBottom: "0.25rem",
                }}
              >
                {item.main}
              </p>
              <p
                style={{
                  fontFamily: "'Raleway', sans-serif",
                  fontSize: "0.9rem",
                  color: "rgba(255,255,255,0.6)",
                  fontWeight: 300,
                }}
              >
                {item.sub}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Map Embed */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="w-full h-64 md:h-96 rounded-2xl overflow-hidden mb-10"
          style={{
            border: "1px solid rgba(255,255,255,0.2)",
            boxShadow: "0 10px 30px rgba(0,0,0,0.1)"
          }}
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d245.3812949394414!2d123.94602979067716!3d10.253460302829621!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33a99b0066feba7b%3A0x7dc031c8eab4a2e1!2sKLN%20SKILLS%20CARWASH!5e0!3m2!1sen!2sph!4v1785208767710!5m2!1sen!2sph" 
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </motion.div>

        {/* Dress code & RSVP */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="p-8 rounded-2xl text-center"
          style={{
            background: "rgba(255,255,255,0.1)",
            border: "1px solid rgba(255,255,255,0.2)",
            backdropFilter: "blur(10px)",
          }}
        >
          <p
            style={{
              fontFamily: "'Raleway', sans-serif",
              fontSize: "0.7rem",
              letterSpacing: "0.3em",
              color: "rgba(255,255,255,0.8)",
              fontWeight: 600,
              textTransform: "uppercase",
              marginBottom: "0.75rem",
            }}
          >
            Dress Code
          </p>
          <p
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "1.6rem",
              color: "#ffffff",
              fontStyle: "italic",
              marginBottom: "0.5rem",
            }}
          >
            Formal Attire
          </p>
          <p
            style={{
              fontFamily: "'Raleway', sans-serif",
              fontSize: "1rem",
              color: "rgba(255,255,255,0.9)",
              fontWeight: 400,
            }}
          >
            White or White/Yellow
          </p>
          {/* RSVP Form */}
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-8 text-center py-6"
            >
              {submitted === "accept" ? (
                <>
                  <CheckCircle className="mx-auto mb-3 text-white" size={48} />
                  <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.4rem", color: "#fff", marginBottom: "0.5rem" }}>We'll see you there!</p>
                  <p style={{ fontFamily: "'Raleway', sans-serif", fontSize: "0.9rem", color: "rgba(255,255,255,0.7)" }}>Thank you, {guestName}! We're so excited to celebrate with you. 🎉</p>
                </>
              ) : (
                <>
                  <XCircle className="mx-auto mb-3 text-white" size={48} />
                  <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.4rem", color: "#fff", marginBottom: "0.5rem" }}>We'll miss you!</p>
                  <p style={{ fontFamily: "'Raleway', sans-serif", fontSize: "0.9rem", color: "rgba(255,255,255,0.7)" }}>Thank you for letting us know, {guestName}. You'll be in our hearts. 💛</p>
                </>
              )}
            </motion.div>
          ) : (
            <div className="mt-8">
              <p style={{ fontFamily: "'Raleway', sans-serif", fontSize: "0.75rem", color: "rgba(255,255,255,0.7)", letterSpacing: "0.15em", textTransform: "uppercase", textAlign: "center", marginBottom: "1rem" }}>Your Name</p>
              <input
                value={guestName}
                onChange={e => setGuestName(e.target.value)}
                placeholder="Enter your full name..."
                style={{
                  width: "100%",
                  maxWidth: "400px",
                  display: "block",
                  margin: "0 auto 0.75rem",
                  padding: "0.75rem 1.25rem",
                  borderRadius: "9999px",
                  background: "rgba(255,255,255,0.15)",
                  border: "1px solid rgba(255,255,255,0.3)",
                  color: "#fff",
                  fontFamily: "'Raleway', sans-serif",
                  fontSize: "0.95rem",
                  textAlign: "center",
                  outline: "none",
                }}
              />
              <textarea
                value={message}
                onChange={e => setMessage(e.target.value)}
                placeholder="Leave a message (optional)..."
                rows={2}
                style={{
                  width: "100%",
                  maxWidth: "400px",
                  display: "block",
                  margin: "0 auto 1rem",
                  padding: "0.75rem 1.25rem",
                  borderRadius: "1rem",
                  background: "rgba(255,255,255,0.15)",
                  border: "1px solid rgba(255,255,255,0.3)",
                  color: "#fff",
                  fontFamily: "'Raleway', sans-serif",
                  fontSize: "0.9rem",
                  outline: "none",
                  resize: "none",
                }}
              />
              {error && <p style={{ color: "#fca5a5", textAlign: "center", fontFamily: "'Raleway', sans-serif", fontSize: "0.85rem", marginBottom: "0.75rem" }}>{error}</p>}
              <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                <button
                  onClick={() => handleRsvp("accept")}
                  disabled={submitting}
                  className="flex items-center gap-2 px-8 py-3 rounded-full transition-all duration-300 hover:scale-105 disabled:opacity-60"
                  style={{
                    background: "#ffffff",
                    color: "#9B5D22",
                    fontFamily: "'Raleway', sans-serif",
                    fontWeight: 600,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    fontSize: "0.85rem",
                    boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
                    border: "none",
                    cursor: submitting ? "not-allowed" : "pointer",
                  }}
                >
                  <CheckCircle size={16} /> Accept Invitation
                </button>
                <button
                  onClick={() => handleRsvp("decline")}
                  disabled={submitting}
                  className="flex items-center gap-2 px-8 py-3 rounded-full transition-all duration-300 hover:scale-105 disabled:opacity-60"
                  style={{
                    background: "transparent",
                    color: "#ffffff",
                    border: "1px solid rgba(255,255,255,0.5)",
                    fontFamily: "'Raleway', sans-serif",
                    fontWeight: 600,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    fontSize: "0.85rem",
                    cursor: submitting ? "not-allowed" : "pointer",
                  }}
                >
                  <XCircle size={16} /> Regretfully Declines
                </button>
              </div>
            </div>
          )}
          <div
            className="mt-8 flex items-center justify-center gap-3"
          >
            <div style={{ height: "1px", background: "rgba(255,255,255,0.4)", width: "40px" }} />
            <p
              style={{
                fontFamily: "'Raleway', sans-serif",
                fontSize: "0.85rem",
                color: "rgba(255,255,255,0.8)",
                letterSpacing: "0.1em",
              }}
            >
              Kindly RSVP by August 08, 2026 · #GlizlenTurns18
            </p>
            <div style={{ height: "1px", background: "rgba(255,255,255,0.4)", width: "40px" }} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
