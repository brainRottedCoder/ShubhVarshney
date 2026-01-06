import { motion } from 'framer-motion';

interface SmokeEffectProps {
  color?: 'purple' | 'cyan' | 'pink' | 'orange' | 'green' | 'mixed';
  intensity?: 'light' | 'medium' | 'strong';
}

export const SmokeEffect = ({ color = 'mixed', intensity = 'medium' }: SmokeEffectProps) => {
  const opacityMap = {
    light: 0.15,
    medium: 0.25,
    strong: 0.4,
  };

  const baseOpacity = opacityMap[intensity];

  const colorMap = {
    purple: 'hsl(var(--neon-purple))',
    cyan: 'hsl(var(--neon-cyan))',
    pink: 'hsl(var(--neon-pink))',
    orange: 'hsl(var(--neon-orange))',
    green: 'hsl(var(--neon-green))',
    mixed: 'hsl(var(--neon-purple))',
  };

  const smokeVariants = {
    animate: {
      x: [0, 30, -20, 10, 0],
      y: [0, -20, 10, -10, 0],
      scale: [1, 1.1, 0.95, 1.05, 1],
      opacity: [baseOpacity, baseOpacity * 1.2, baseOpacity * 0.8, baseOpacity * 1.1, baseOpacity],
    },
  };

  const smokeTransition = {
    duration: 8,
    repeat: Infinity,
    ease: 'easeInOut' as const,
  };

  if (color === 'mixed') {
    return (
      <div className="absolute inset-0 overflow-hidden rounded-inherit pointer-events-none">
        {/* Primary smoke cloud */}
        <motion.div
          className="absolute -top-1/2 -left-1/2 w-full h-full rounded-full blur-3xl"
          style={{
            background: `radial-gradient(circle, hsl(var(--neon-purple) / ${baseOpacity}) 0%, transparent 70%)`,
          }}
          animate={smokeVariants.animate}
          transition={{ ...smokeTransition, delay: 0 }}
        />
        
        {/* Secondary smoke cloud */}
        <motion.div
          className="absolute -bottom-1/2 -right-1/2 w-full h-full rounded-full blur-3xl"
          style={{
            background: `radial-gradient(circle, hsl(var(--neon-cyan) / ${baseOpacity}) 0%, transparent 70%)`,
          }}
          animate={{
            x: [0, -25, 15, -10, 0],
            y: [0, 15, -20, 10, 0],
            scale: [1, 0.95, 1.1, 1, 1],
            opacity: [baseOpacity, baseOpacity * 0.9, baseOpacity * 1.2, baseOpacity, baseOpacity],
          }}
          transition={{ ...smokeTransition, delay: 2 }}
        />

        {/* Tertiary smoke cloud */}
        <motion.div
          className="absolute top-1/4 right-1/4 w-3/4 h-3/4 rounded-full blur-3xl"
          style={{
            background: `radial-gradient(circle, hsl(var(--neon-pink) / ${baseOpacity * 0.6}) 0%, transparent 60%)`,
          }}
          animate={{
            x: [0, 20, -15, 5, 0],
            y: [0, -10, 20, -15, 0],
            scale: [1, 1.05, 0.9, 1.1, 1],
          }}
          transition={{ ...smokeTransition, delay: 4, duration: 10 }}
        />

        {/* Wispy trail */}
        <motion.div
          className="absolute top-0 left-1/3 w-1/2 h-full blur-2xl"
          style={{
            background: `linear-gradient(180deg, hsl(var(--neon-orange) / ${baseOpacity * 0.4}) 0%, transparent 50%, hsl(var(--neon-green) / ${baseOpacity * 0.3}) 100%)`,
          }}
          animate={{
            x: [0, 40, -30, 20, 0],
            opacity: [baseOpacity * 0.5, baseOpacity * 0.8, baseOpacity * 0.4, baseOpacity * 0.6, baseOpacity * 0.5],
            skewX: [0, 5, -5, 3, 0],
          }}
          transition={{ ...smokeTransition, delay: 1, duration: 12 }}
        />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 overflow-hidden rounded-inherit pointer-events-none">
      <motion.div
        className="absolute -top-1/4 -left-1/4 w-3/4 h-3/4 rounded-full blur-3xl"
        style={{
          background: `radial-gradient(circle, ${colorMap[color]} 0%, transparent 70%)`,
          opacity: baseOpacity,
        }}
        animate={smokeVariants.animate}
        transition={smokeTransition}
      />
      <motion.div
        className="absolute -bottom-1/4 -right-1/4 w-3/4 h-3/4 rounded-full blur-3xl"
        style={{
          background: `radial-gradient(circle, ${colorMap[color]} 0%, transparent 70%)`,
          opacity: baseOpacity * 0.7,
        }}
        animate={{
          x: [0, -20, 15, -10, 0],
          y: [0, 10, -15, 5, 0],
          scale: [1, 0.95, 1.08, 0.98, 1],
        }}
        transition={{ ...smokeTransition, delay: 3 }}
      />
    </div>
  );
};
