import { useState, useRef, useEffect } from "react";
import { Music, SkipForward, Pause, Play } from "lucide-react";
import { supabase, MusicTrack } from "../../lib/supabase";
import bgMusic from "../../assets/music/bg.mp3";

const DEFAULT_MUSIC = bgMusic;

export function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  const [playlist, setPlaylist] = useState<MusicTrack[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    supabase.from("music_playlist").select("*").order("position")
      .then(({ data }) => { 
        if (data && data.length > 0) setPlaylist(data);
      });
  }, []);

  const currentTrackUrl = playlist.length > 0 ? playlist[currentIndex].url : DEFAULT_MUSIC;
  const currentTrackTitle = playlist.length > 0 ? playlist[currentIndex].title : "Now Playing...";

  // Handle track changes
  useEffect(() => {
    const audio = audioRef.current;
    if (audio && isPlaying) {
      audio.play().catch(() => setIsPlaying(false));
    }
  }, [currentIndex]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.25;
    audio.loop = playlist.length === 0;
    
    const handleEnvelopeOpen = () => {
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
      setTimeout(() => { setIsVisible(true); }, 1500);
    };

    window.addEventListener("envelope-opened", handleEnvelopeOpen);
    return () => window.removeEventListener("envelope-opened", handleEnvelopeOpen);
  }, [playlist.length]);

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

  const nextTrack = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (playlist.length > 0) {
      setCurrentIndex((prev) => (prev + 1) % playlist.length);
      setHasInteracted(true);
      // Auto-play the next track
      if (!isPlaying) setIsPlaying(true);
    }
  };

  const handleEnded = () => {
    if (playlist.length > 0) {
      nextTrack();
    }
  };

  return (
    <>
      <audio ref={audioRef} src={currentTrackUrl} preload="auto" onEnded={handleEnded} />

      {isVisible && (
        <>
          <div
            className="fixed bottom-24 md:bottom-6 right-6 z-50 flex items-center gap-2 transition-all duration-300"
          >
            {/* Tooltip hint / Now playing text */}
            <div
              className={`px-3 py-2 rounded-full text-xs shadow-lg transition-opacity duration-500 flex items-center gap-2 ${
                (!hasInteracted && !isPlaying) || isPlaying ? "opacity-100" : "opacity-0"
              }`}
              style={{
                background: "rgba(61,31,42,0.9)",
                color: "#FFE066",
                fontFamily: "'Raleway', sans-serif",
                letterSpacing: "0.1em",
                whiteSpace: "nowrap",
                border: "1px solid rgba(212,175,55,0.2)",
                maxWidth: "200px"
              }}
            >
              <Music size={12} className={isPlaying ? "animate-bounce shrink-0" : "shrink-0"} />
              <span className="overflow-hidden text-ellipsis whitespace-nowrap">
                {isPlaying ? currentTrackTitle : "Play music"}
              </span>
            </div>

            {/* Next Button */}
            {playlist.length > 1 && (
              <button
                onClick={nextTrack}
                title="Next track"
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                style={{
                  background: "rgba(61,31,42,0.9)",
                  border: "1px solid rgba(212,175,55,0.3)",
                  color: "#FFD700",
                  cursor: "pointer",
                }}
              >
                <SkipForward size={16} fill="currentColor" />
              </button>
            )}

            {/* Play/Pause button */}
            <button
              onClick={toggle}
              title={isPlaying ? "Pause music" : "Play background music"}
              className="w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
              style={{
                background: "linear-gradient(135deg, #FFA500, #FFD700)",
                boxShadow: isPlaying
                  ? "0 0 0 0 rgba(183,110,121,0.4), 0 4px 20px rgba(183,110,121,0.5)"
                  : "0 4px 20px rgba(183,110,121,0.4)",
                animation: isPlaying ? "pulse-ring 2s ease-out infinite" : "none",
                border: "none",
                cursor: "pointer",
              }}
            >
              {isPlaying ? (
                <Pause size={20} fill="white" color="white" />
              ) : (
                <Play size={20} fill="white" color="white" />
              )}
            </button>
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
