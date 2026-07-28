import { useState, useRef, useEffect } from "react";
import { Music } from "lucide-react";
import { supabase } from "../../lib/supabase";
import bgMusic from "../../assets/music/bg.mp3";

const DEFAULT_MUSIC = bgMusic;

export function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [musicUrl, setMusicUrl] = useState(DEFAULT_MUSIC);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    supabase.from("app_settings").select("value").eq("key", "music_url").single()
      .then(({ data }) => { if (data?.value) setMusicUrl(data.value); });
  }, []);

  // Blue Danube Waltz — public domain from Wikimedia Commons (default)


  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.25;
    audio.loop = true;
    
    const handleEnvelopeOpen = () => {
      // Auto-play synchronously when the user clicks the seal
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
            setHasInteracted(true);
          })
          .catch(error => {
            console.warn("Autoplay was prevented:", error);
          });
      }
      
      // Show the button when the envelope content appears
      setTimeout(() => {
        setIsVisible(true);
      }, 1500);
    };

    window.addEventListener("envelope-opened", handleEnvelopeOpen);
    return () => window.removeEventListener("envelope-opened", handleEnvelopeOpen);
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    setHasInteracted(true);
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    }
  };

  return (
    <>
      <audio ref={audioRef} src={musicUrl} preload="auto" />

      {isVisible && (
        <>
          {/* Floating music button */}
      <button
        onClick={toggle}
        title={isPlaying ? "Pause music" : "Play background music"}
        className="fixed bottom-24 md:bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
        style={{
          background: "linear-gradient(135deg, #B76E79, #D4AF37)",
          boxShadow: isPlaying
            ? "0 0 0 0 rgba(183,110,121,0.4), 0 4px 20px rgba(183,110,121,0.5)"
            : "0 4px 20px rgba(183,110,121,0.4)",
          animation: isPlaying ? "pulse-ring 2s ease-out infinite" : "none",
          border: "none",
          cursor: "pointer",
        }}
      >
        {isPlaying ? (
          // Pause icon
          <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
            <rect x="6" y="4" width="4" height="16" rx="1" />
            <rect x="14" y="4" width="4" height="16" rx="1" />
          </svg>
        ) : (
          // Music note icon
          <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
            <path d="M9 18V5l12-2v13M9 18c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-2c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2z" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </button>

      {/* Tooltip hint / Now playing text */}
      <div
        className={`fixed bottom-[10rem] md:bottom-[5.5rem] right-4 z-50 px-3 py-1.5 rounded-full text-xs pointer-events-none transition-opacity duration-500 ${
          (!hasInteracted && !isPlaying) || isPlaying ? "opacity-100" : "opacity-0"
        }`}
        style={{
          background: "rgba(61,31,42,0.9)",
          color: "#F4A7B9",
          fontFamily: "'Raleway', sans-serif",
          letterSpacing: "0.1em",
          whiteSpace: "nowrap",
        }}
      >
        <div className="flex items-center gap-2">
          {isPlaying ? (
            <>
              <Music size={12} className="animate-bounce" /> Now playing...
            </>
          ) : (
            <>
              <Music size={12} /> Play music
            </>
          )}
        </div>
      </div>

      <style>{`
        @keyframes pulse-ring {
          0% { box-shadow: 0 0 0 0 rgba(183,110,121,0.5), 0 4px 20px rgba(183,110,121,0.5); }
          70% { box-shadow: 0 0 0 14px rgba(183,110,121,0), 0 4px 20px rgba(183,110,121,0.5); }
          100% { box-shadow: 0 0 0 0 rgba(183,110,121,0), 0 4px 20px rgba(183,110,121,0.5); }
        }
      `}</style>
        </>
      )}
    </>
  );
}
