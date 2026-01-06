import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ExternalLink, Github, ArrowUpRight } from 'lucide-react';
import { SmokeEffect } from './SmokeEffect';

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  link?: string;
  github?: string;
  large?: boolean;
}

export const ProjectCard = ({ title, description, tags, link, github, large = false }: ProjectCardProps) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['8deg', '-8deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-8deg', '8deg']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      whileHover={{ scale: 1.02 }}
      className="group relative h-full"
    >
      <div 
        className={`glass-card rounded-3xl transition-all duration-500 group-hover:shadow-glow group-hover:border-accent/30 h-full flex flex-col gradient-border relative overflow-hidden ${
          large ? 'p-8 md:p-10 min-h-[400px]' : 'p-6'
        }`}
      >
        <SmokeEffect color="mixed" intensity="light" />
        <div style={{ transform: 'translateZ(30px)' }} className="flex flex-col h-full">
          {/* Project Number */}
          {large && (
            <span className="text-xs font-mono text-muted-foreground/50 mb-4">
              /project
            </span>
          )}
          
          <div className="flex items-start justify-between mb-4">
            <h3 className={`font-semibold text-foreground group-hover:text-accent transition-colors duration-300 ${
              large ? 'text-2xl md:text-3xl' : 'text-lg'
            }`}>
              {title}
            </h3>
            <motion.div 
              className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300"
              initial={{ x: -10 }}
              whileHover={{ x: 0 }}
            >
              {github && (
                <a 
                  href={github} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="p-2 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors"
                >
                  <Github className={large ? 'w-5 h-5' : 'w-4 h-4'} />
                </a>
              )}
              {link && (
                <a 
                  href={link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="p-2 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors"
                >
                  <ExternalLink className={large ? 'w-5 h-5' : 'w-4 h-4'} />
                </a>
              )}
            </motion.div>
          </div>
          
          <p className={`text-muted-foreground leading-relaxed flex-1 ${
            large ? 'text-base md:text-lg mb-8' : 'text-sm mb-4'
          }`}>
            {description}
          </p>
          
          <div className="mt-auto">
            <div className={`flex flex-wrap ${large ? 'gap-3' : 'gap-2'}`}>
              {tags.map((tag) => (
                <span
                  key={tag}
                  className={`font-medium bg-secondary/80 text-secondary-foreground rounded-full transition-colors group-hover:bg-accent/10 group-hover:text-accent ${
                    large ? 'px-4 py-2 text-sm' : 'px-2.5 py-1 text-xs'
                  }`}
                >
                  {tag}
                </span>
              ))}
            </div>
            
            {large && (
              <motion.div 
                className="mt-8 flex items-center gap-2 text-sm text-muted-foreground group-hover:text-accent transition-colors"
                initial={{ opacity: 0.5 }}
                whileHover={{ opacity: 1, x: 5 }}
              >
                <span>View Project</span>
                <ArrowUpRight className="w-4 h-4" />
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
