import { useEffect, useState, useCallback } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

interface TrailPoint {
  x: number;
  y: number;
  id: number;
}

export const CursorGlow = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [trail, setTrail] = useState<TrailPoint[]>([]);
  const [colorIndex, setColorIndex] = useState(0);

  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  const colors = [
    'hsl(var(--neon-purple))',
    'hsl(var(--neon-cyan))',
    'hsl(var(--neon-pink))',
    'hsl(var(--neon-orange))',
    'hsl(var(--neon-green))',
  ];

  const handleMouseMove = useCallback((e: MouseEvent) => {
    cursorX.set(e.clientX);
    cursorY.set(e.clientY);
    setIsVisible(true);

    setTrail(prev => {
      const newPoint = { x: e.clientX, y: e.clientY, id: Date.now() };
      const updated = [newPoint, ...prev].slice(0, 10);
      return updated;
    });

    // Cycle colors based on movement
    setColorIndex(prev => (prev + 0.02) % colors.length);
  }, [cursorX, cursorY, colors.length]);

  const handleMouseLeave = useCallback(() => {
    setIsVisible(false);
    setTrail([]);
  }, []);

  useEffect(() => {
    // Check if touch device
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [handleMouseMove, handleMouseLeave]);

  // Clean up old trail points
  useEffect(() => {
    const interval = setInterval(() => {
      setTrail(prev => prev.slice(0, 8));
    }, 50);
    return () => clearInterval(interval);
  }, []);

  if (!isVisible) return null;

  const currentColor = colors[Math.floor(colorIndex)];
  const nextColor = colors[(Math.floor(colorIndex) + 1) % colors.length];

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {/* Trail particles */}
      {trail.map((point, index) => {
        const size = Math.max(8, 40 - index * 4);
        const opacity = Math.max(0.05, 0.4 - index * 0.04);
        const blur = 8 + index * 2;

        return (
          <motion.div
            key={point.id}
            className="absolute rounded-full mix-blend-screen"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            style={{
              left: point.x,
              top: point.y,
              width: size / 2,
              height: size / 2,
              x: -size / 4,
              y: -size / 4,
              background: `radial-gradient(circle, ${colors[(Math.floor(colorIndex) + index) % colors.length]} 0%, transparent 70%)`,
              filter: `blur(${blur}px)`,
            }}
            transition={{ duration: 0.15 }}
          />
        );
      })}

      {/* Main glow */}
      <motion.div
        className="absolute rounded-full mix-blend-screen"
        style={{
          left: smoothX,
          top: smoothY,
          width: 120,
          height: 120,
          x: -60,
          y: -60,
          background: `radial-gradient(circle, ${currentColor} 0%, ${nextColor} 30%, transparent 70%)`,
          filter: 'blur(60px)',
          opacity: 0.35,
        }}
      />

      {/* Inner bright core */}
      <motion.div
        className="absolute rounded-full mix-blend-screen"
        style={{
          left: smoothX,
          top: smoothY,
          width: 50,
          height: 50,
          x: -25,
          y: -25,
          background: `radial-gradient(circle, white 0%, ${currentColor} 40%, transparent 70%)`,
          filter: 'blur(20px)',
          opacity: 0.5,
        }}
      />

      {/* Sparkle ring */}
      <motion.div
        className="absolute rounded-full border mix-blend-screen"
        style={{
          left: smoothX,
          top: smoothY,
          width: 80,
          height: 80,
          x: -40,
          y: -40,
          borderColor: currentColor,
          borderWidth: 1,
          filter: 'blur(2px)',
          opacity: 0.3,
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.1, 0.3],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </div>
  );
};
