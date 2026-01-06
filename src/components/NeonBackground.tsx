import { motion } from 'framer-motion';
import { useMemo } from 'react';

export const NeonBackground = () => {
  const orbs = useMemo(() => [
    { id: 1, color: 'neon-purple', x: '10%', y: '20%', size: 400, delay: 0 },
    { id: 2, color: 'neon-cyan', x: '80%', y: '10%', size: 350, delay: 2 },
    { id: 3, color: 'neon-pink', x: '70%', y: '70%', size: 450, delay: 4 },
    { id: 4, color: 'neon-orange', x: '20%', y: '80%', size: 300, delay: 1 },
    { id: 5, color: 'neon-green', x: '50%', y: '40%', size: 380, delay: 3 },
  ], []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-background" />
      
      {/* Animated neon orbs */}
      {orbs.map((orb) => (
        <motion.div
          key={orb.id}
          className={`absolute rounded-full bg-${orb.color} blur-[120px] opacity-30 dark:opacity-20`}
          style={{
            left: orb.x,
            top: orb.y,
            width: orb.size,
            height: orb.size,
            transform: 'translate(-50%, -50%)',
          }}
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 30, -20, 0],
            y: [0, -20, 30, 0],
            opacity: [0.2, 0.35, 0.2],
          }}
          transition={{
            duration: 12 + orb.delay,
            delay: orb.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Grid overlay for depth */}
      <div 
        className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(to right, hsl(var(--foreground)) 1px, transparent 1px),
            linear-gradient(to bottom, hsl(var(--foreground)) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Radial gradient overlay for focus */}
      <div className="absolute inset-0 bg-radial-fade" />
    </div>
  );
};
