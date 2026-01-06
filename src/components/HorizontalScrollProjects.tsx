import { useRef, useState, useEffect, useLayoutEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Project {
  title: string;
  description: string;
  tags: string[];
  link?: string;
  github?: string;
}

interface HorizontalScrollProjectsProps {
  projects: Project[];
}

export const HorizontalScrollProjects = ({ projects }: HorizontalScrollProjectsProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout>>();
  
  // Duplicate projects for circular effect
  const duplicatedProjects = [...projects, ...projects];
  const cardWidth = 720;
  const gap = 24;
  const totalWidth = projects.length * (cardWidth + gap);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const track = trackRef.current;
      const trigger = triggerRef.current;
      
      if (!track || !trigger) return;

      // Calculate the scroll distance needed for one full loop
      const scrollDistance = totalWidth;

      // Create the horizontal scroll animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: trigger,
          start: 'top top',
          end: () => `+=${scrollDistance}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          onUpdate: (self) => {
            setIsScrolling(true);
            
            // Calculate active index based on scroll progress
            const progress = self.progress;
            const currentIndex = Math.floor(progress * projects.length) % projects.length;
            setActiveIndex(currentIndex);
            
            // Clear existing timeout
            if (scrollTimeoutRef.current) {
              clearTimeout(scrollTimeoutRef.current);
            }
            
            // Set timeout to detect scroll stop
            scrollTimeoutRef.current = setTimeout(() => {
              setIsScrolling(false);
            }, 100);
          },
          onLeave: () => {
            // When the loop completes, scroll indicator shows we're at the end
            setActiveIndex(0);
            setIsScrolling(false);
          },
        },
      });

      // Animate the track horizontally
      tl.to(track, {
        x: -totalWidth,
        ease: 'none',
      });

    }, sectionRef);

    return () => {
      ctx.revert();
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [projects.length, totalWidth]);

  const scrollToIndex = (direction: 'next' | 'prev') => {
    const newIndex = direction === 'next' 
      ? (activeIndex + 1) % projects.length
      : (activeIndex - 1 + projects.length) % projects.length;
    
    // Calculate scroll position
    const scrollTrigger = ScrollTrigger.getAll()[0];
    if (scrollTrigger) {
      const progress = newIndex / projects.length;
      const scrollTo = scrollTrigger.start + (scrollTrigger.end - scrollTrigger.start) * progress;
      window.scrollTo({ top: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <section ref={sectionRef} className="relative" id="work">
      <div ref={triggerRef} className="min-h-screen overflow-hidden">
        {/* Section Header */}
        <div className="container max-w-7xl mx-auto px-6 pt-24 pb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-end justify-between"
          >
            <div>
              <p className="text-sm text-muted-foreground tracking-wide uppercase mb-3">
                Selected Work
              </p>
              <h2 className="text-3xl md:text-4xl font-serif text-foreground">
                Projects I've <span className="italic">built</span>
              </h2>
            </div>
            
            {/* Navigation Arrows */}
            <div className="hidden md:flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToIndex('prev')}
                className="p-3 rounded-full border border-border hover:border-accent hover:text-accent transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToIndex('next')}
                className="p-3 rounded-full border border-border hover:border-accent hover:text-accent transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Horizontal Scroll Track */}
        <div className="relative flex items-center min-h-[500px]">
          <div 
            ref={trackRef}
            className="flex gap-6 pl-6 md:pl-[calc((100vw-700px)/2)]"
            style={{ willChange: 'transform' }}
          >
            {duplicatedProjects.map((project, index) => {
              const realIndex = index % projects.length;
              const isActive = realIndex === activeIndex && !isScrolling;
              
              return (
                <div
                  key={`${project.title}-${index}`}
                  className="flex-shrink-0"
                >
                  <ProjectCard 
                    project={project} 
                    isActive={isActive}
                    index={realIndex}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="container max-w-7xl mx-auto px-6 pt-8 pb-12">
          <div className="flex items-center justify-center gap-3">
            {projects.map((_, index) => (
              <motion.div
                key={index}
                className={`rounded-full transition-all duration-300 cursor-pointer ${
                  index === activeIndex 
                    ? 'w-10 h-2 bg-accent' 
                    : 'w-2 h-2 bg-border hover:bg-muted-foreground'
                }`}
                animate={{
                  scale: index === activeIndex ? 1 : 0.8,
                }}
                onClick={() => {
                  const scrollTrigger = ScrollTrigger.getAll()[0];
                  if (scrollTrigger) {
                    const progress = index / projects.length;
                    const scrollTo = scrollTrigger.start + (scrollTrigger.end - scrollTrigger.start) * progress;
                    window.scrollTo({ top: scrollTo, behavior: 'smooth' });
                  }
                }}
              />
            ))}
          </div>
          
          {/* Scroll Hint */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-xs text-muted-foreground mt-6 font-mono"
          >
            {isScrolling ? (
              <span className="flex items-center justify-center gap-2">
                <motion.span
                  animate={{ y: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 1 }}
                >
                  ↓
                </motion.span>
                Scroll to explore
              </span>
            ) : (
              <span>{String(activeIndex + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}</span>
            )}
          </motion.p>
        </div>
      </div>
    </section>
  );
};

interface ProjectCardProps {
  project: {
    title: string;
    description: string;
    tags: string[];
    link?: string;
    github?: string;
  };
  isActive: boolean;
  index: number;
}

const ProjectCard = ({ project, isActive, index }: ProjectCardProps) => {
  const { title, description, tags, link, github } = project;
  
  return (
    <motion.div
      className="group relative"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <div 
        className={`glass-card rounded-3xl transition-all duration-500 w-[85vw] md:w-[650px] lg:w-[700px] min-h-[400px] flex flex-col ${
          isActive 
            ? 'p-10 md:p-12 shadow-glow border-accent/30' 
            : 'p-8 md:p-10 hover:border-border/60'
        }`}
      >
        {/* Project Number */}
        <span className="text-xs font-mono text-muted-foreground/50 mb-4 block">
          0{index + 1}
        </span>
        
        <div className="flex items-start justify-between mb-4">
          <motion.h3 
            className={`font-semibold text-foreground transition-colors duration-300 leading-tight ${
              isActive ? 'text-3xl md:text-4xl text-accent' : 'text-2xl md:text-3xl group-hover:text-accent'
            }`}
            layout
          >
            {title}
          </motion.h3>
          
          <motion.div 
            className="flex items-center gap-2"
            animate={{ opacity: isActive ? 1 : 0.5 }}
          >
            {github && (
              <a 
                href={github} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-3 rounded-xl bg-secondary/50 hover:bg-accent/20 hover:text-accent transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
            )}
            {link && (
              <a 
                href={link} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-3 rounded-xl bg-secondary/50 hover:bg-accent/20 hover:text-accent transition-colors"
              >
                <ExternalLink className="w-5 h-5" />
              </a>
            )}
          </motion.div>
        </div>
        
        {/* Description */}
        <motion.p 
          className={`text-muted-foreground leading-relaxed flex-1 transition-all duration-300 ${
            isActive ? 'text-lg opacity-100' : 'text-base opacity-70'
          }`}
          animate={{ 
            height: isActive ? 'auto' : '4.5rem',
          }}
        >
          {description}
        </motion.p>
        
        <div className="mt-auto pt-6">
          <div className="flex flex-wrap gap-3 mb-6">
            {tags.map((tag) => (
              <span
                key={tag}
                className={`font-medium rounded-full transition-all duration-300 ${
                  isActive 
                    ? 'px-4 py-2 text-sm bg-accent/10 text-accent' 
                    : 'px-3 py-1.5 text-xs bg-secondary/80 text-secondary-foreground'
                }`}
              >
                {tag}
              </span>
            ))}
          </div>
          
          <AnimatePresence>
            {isActive && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="flex items-center gap-2 text-sm text-accent cursor-pointer hover:gap-3 transition-all"
              >
                <span>View Project Details</span>
                <ArrowUpRight className="w-4 h-4" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};
