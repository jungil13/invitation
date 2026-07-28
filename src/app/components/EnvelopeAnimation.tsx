import { useState, ReactNode } from "react";
import { motion, AnimatePresence } from "motion/react";

interface EnvelopeAnimationProps {
  children: ReactNode;
}

export function EnvelopeAnimation({ children }: EnvelopeAnimationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showContent, setShowContent] = useState(false);

  const handleOpen = () => {
    if (isOpen) return;
    setIsOpen(true);
    window.dispatchEvent(new Event("envelope-opened"));
    setTimeout(() => {
      setShowContent(true);
    }, 1500);
  };

  return (
    <>
      <AnimatePresence>
        {!showContent && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#2A1015]"
            initial={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%", transition: { duration: 1, ease: "easeInOut" } }}
          >
            {/* The Envelope Wrapper */}
            <div 
              className="relative w-[90vw] max-w-lg aspect-[4/3] cursor-pointer"
              style={{ perspective: "1000px" }}
              onClick={handleOpen}
            >
              {/* Back of Envelope (Inside back) */}
              <div className="absolute inset-0 bg-[#C8A882] rounded-sm shadow-inner overflow-hidden">
                {/* A subtle letter peaking out */}
                <motion.div 
                  className="absolute top-[10%] left-[5%] right-[5%] bottom-0 bg-white shadow-md rounded-t-sm"
                  initial={{ y: 0 }}
                  animate={{ y: isOpen ? -60 : 0 }}
                  transition={{ duration: 1, delay: 0.5, ease: "backOut" }}
                >
                  <div className="w-full h-full p-8 flex flex-col items-center justify-start border-2 border-[#D4AF37] border-opacity-20 m-2">
                    <p className="font-['Great_Vibes'] text-[#D4AF37] text-4xl mb-4 mt-2">You are invited...</p>
                  </div>
                </motion.div>
              </div>
              
              {/* Bottom Flap */}
              <div 
                className="absolute bottom-0 left-0 right-0 h-2/3 bg-[#EAD5BA] shadow-[0_-2px_10px_rgba(0,0,0,0.1)] z-10 pointer-events-none"
                style={{ clipPath: "polygon(0 100%, 100% 100%, 50% 0)" }}
              ></div>

              {/* Left Flap */}
              <div 
                className="absolute inset-y-0 left-0 w-1/2 bg-[#DECCB0] z-10 pointer-events-none"
                style={{ clipPath: "polygon(0 0, 100% 50%, 0 100%)" }}
              ></div>

              {/* Right Flap */}
              <div 
                className="absolute inset-y-0 right-0 w-1/2 bg-[#E6D1B5] z-10 pointer-events-none"
                style={{ clipPath: "polygon(100% 0, 0 50%, 100% 100%)" }}
              ></div>

            {/* Top Flap (Animated) */}
<motion.div
  className="absolute top-0 left-0 right-0 h-2/3 origin-top"
  initial={{ rotateX: 0 }}
  animate={{ rotateX: isOpen ? 180 : 0 }}
  transition={{ duration: 1, ease: "easeInOut" }}
  style={{
    zIndex: isOpen ? 0 : 20,
    transformStyle: "preserve-3d",
  }}
>
  {/* Front of top flap */}
  <div
    className="absolute inset-0 bg-[#F3E2CC] shadow-[0_5px_15px_rgba(0,0,0,0.15)]"
    style={{
      clipPath: "polygon(0 0, 100% 0, 50% 100%)",
      backfaceVisibility: "hidden",
    }}
  />

  {/* Back of top flap */}
  <div
    className="absolute inset-0 bg-[#D8BE9A]"
    style={{
      clipPath: "polygon(0 0, 100% 0, 50% 100%)",
      transform: "rotateX(180deg)",
      backfaceVisibility: "hidden",
    }}
  />

  {/* Seal Position Wrapper */}
  <div
    className="absolute bottom-0 left-1/2"
    style={{
      transform: "translate(-50%, 50%)",
      zIndex: 30,
      pointerEvents: isOpen ? "none" : "auto",
    }}
  >
    {/* Animated Seal */}
    <motion.div
      className="relative w-16 h-16 bg-[#8B1E28] rounded-full shadow-lg flex items-center justify-center border-2 border-[#D4AF37] cursor-pointer"
      style={{
        backfaceVisibility: "hidden",
        transformStyle: "preserve-3d",
      }}
      whileHover={{
        scale: 1.1,
      }}
      whileTap={{
        scale: 0.95,
      }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 20,
      }}
      onClick={(e) => {
        e.stopPropagation();
        handleOpen();
      }}
    >
      <span className="text-[#D4AF37] font-['Great_Vibes'] text-3xl pb-1 pr-1">
        S
      </span>

      <div className="absolute inset-1 rounded-full border border-dashed border-[#D4AF37] opacity-60" />
    </motion.div>
  </div>
</motion.div>
              
              {/* Click instruction */}
              {!isOpen && (
                <motion.div 
                  className="absolute -bottom-16 left-0 right-0 text-center text-[#D4AF37] font-['Raleway'] tracking-widest text-sm uppercase pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  Click the seal to open
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Website Content */}
      {showContent && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {children}
        </motion.div>
      )}
    </>
  );
}
