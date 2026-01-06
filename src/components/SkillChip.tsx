import { motion } from 'framer-motion';

interface SkillChipProps {
  name: string;
  index: number;
}

export const SkillChip = ({ name, index }: SkillChipProps) => {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ 
        scale: 1.05,
        backgroundColor: 'hsl(var(--accent) / 0.1)',
      }}
      className="px-4 py-2 text-sm font-medium bg-secondary text-secondary-foreground rounded-lg border border-border/50 cursor-default transition-colors duration-200"
    >
      {name}
    </motion.span>
  );
};
