import { useEffect, useRef } from "react";

interface Lantern {
  x: number;
  y: number;
  width: number;
  height: number;
  speed: number;
  drift: number;
  opacity: number;
  flicker: number;
}

export function FloatingLanterns() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

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
    window.addEventListener("resize", resize);

    const lanterns: Lantern[] = Array.from({ length: 25 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight + window.innerHeight * Math.random(),
      width: Math.random() * 12 + 10,
      height: Math.random() * 18 + 14,
      speed: Math.random() * 1.5 + 0.5,
      drift: Math.random() * 1 - 0.5,
      opacity: Math.random() * 0.5 + 0.5,
      flicker: Math.random() * 0.1,
    }));

    let animId: number;

    const drawLantern = (l: Lantern) => {
      ctx.save();
      // Flicker effect
      const currentOpacity = l.opacity + Math.sin(Date.now() * l.flicker) * 0.2;
      ctx.globalAlpha = Math.max(0.1, Math.min(currentOpacity, 1));

      // Glow effect
      ctx.shadowColor = "#FFAA00";
      ctx.shadowBlur = 15;

      // Draw lantern body (gradient from orange to yellow)
      const gradient = ctx.createLinearGradient(l.x, l.y, l.x, l.y + l.height);
      gradient.addColorStop(0, "#FFD700");
      gradient.addColorStop(1, "#FFA500");

      ctx.fillStyle = gradient;
      
      // Draw rounded rectangle
      ctx.beginPath();
      ctx.roundRect(l.x, l.y, l.width, l.height, 4);
      ctx.fill();

      // Top and bottom rims
      ctx.shadowBlur = 0;
      ctx.fillStyle = "#CC8400";
      ctx.fillRect(l.x, l.y - 1, l.width, 2);
      ctx.fillRect(l.x, l.y + l.height - 1, l.width, 2);

      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      lanterns.forEach((l) => {
        l.y -= l.speed;
        l.x += Math.sin(l.y * 0.01) * l.drift;
        
        if (l.y < -50) {
          l.y = canvas.height + 50;
          l.x = Math.random() * canvas.width;
        }
        drawLantern(l);
      });
      animId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-10"
    />
  );
}
