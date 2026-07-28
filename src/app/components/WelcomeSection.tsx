import { motion } from "motion/react";

export function WelcomeSection() {
  return (
    <section
      id="welcome"
      className="py-24 px-6"
      style={{ background: "linear-gradient(180deg, #FDF6F0 0%, #FFF8F4 100%)" }}
    >
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
        >
          {/* Section label */}
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
            ✦ A Personal Note ✦
          </p>

          <h2
            style={{
              fontFamily: "'Great Vibes', cursive",
              fontSize: "clamp(3rem, 8vw, 5rem)",
              color: "#B76E79",
              lineHeight: 1.2,
              marginBottom: "0.5rem",
            }}
          >
            Welcome, Dearest Guest
          </h2>

          <div
            className="flex items-center justify-center gap-3 my-6"
          >
            <div style={{ height: "1px", background: "linear-gradient(to right, transparent, #D4AF37)", width: "60px" }} />
            <span style={{ color: "#D4AF37", fontSize: "1rem" }}>✦</span>
            <div style={{ height: "1px", background: "linear-gradient(to left, transparent, #D4AF37)", width: "60px" }} />
          </div>

          <p
            style={{
              fontFamily: "'Raleway', sans-serif",
              fontSize: "clamp(1rem, 2.5vw, 1.15rem)",
              color: "#5C3040",
              lineHeight: 1.9,
              fontWeight: 300,
              marginBottom: "1.5rem",
            }}
          >
            With a heart full of joy and gratitude, we warmly welcome you to celebrate this beautiful milestone — the 18th birthday of our beloved daughter, sister, and friend,{" "}
            <span
              style={{
                fontFamily: "'Great Vibes', cursive",
                fontSize: "1.8em",
                color: "#B76E79",
              }}
            >
              Glizlen
            </span>
            .
          </p>

          <p
            style={{
              fontFamily: "'Raleway', sans-serif",
              fontSize: "clamp(0.9rem, 2vw, 1.05rem)",
              color: "#8B5563",
              lineHeight: 1.9,
              fontWeight: 300,
              marginBottom: "1.5rem",
            }}
          >
            Tonight, as she steps into womanhood, we honor the love, laughter, and memories she has shared with each of us. Your presence tonight makes this evening truly magical and complete.
          </p>

          <p
            style={{
              fontFamily: "'Raleway', sans-serif",
              fontSize: "clamp(0.9rem, 2vw, 1.05rem)",
              color: "#8B5563",
              lineHeight: 1.9,
              fontWeight: 300,
            }}
          >
            Join us as we celebrate 18 years of grace, beauty, and boundless dreams. This night belongs to her — and we are so glad you are here to share it with us.
          </p>

          <div className="mt-10 flex justify-center">
            <div
              style={{
                fontFamily: "'Great Vibes', cursive",
                fontSize: "2.5rem",
                color: "#D4AF37",
              }}
            >
              The Casquejo Family
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
