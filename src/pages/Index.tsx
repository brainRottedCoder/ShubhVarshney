import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { Experience } from '@/components/Experience';
import { HorizontalScrollProjects } from '@/components/HorizontalScrollProjects';
import { SkillChip } from '@/components/SkillChip';
import { Footer } from '@/components/Footer';
import { FloatingDots } from '@/components/FloatingDots';
import { NeonBackground } from '@/components/NeonBackground';
import { CursorGlow } from '@/components/CursorGlow';
import { motion } from 'framer-motion';

const projects = [
  {
    title: 'Real-time Collaboration Tool',
    description: 'A multiplayer whiteboard with WebSocket sync, drawing tools, and live cursors. Built for seamless team collaboration.',
    tags: ['React', 'Socket.io', 'Canvas', 'Node.js'],
    github: '#',
    link: '#',
  },
  {
    title: 'Algorithm Visualizer',
    description: 'Interactive visualization of sorting and pathfinding algorithms with step controls and complexity analysis.',
    tags: ['TypeScript', 'D3.js', 'Algorithms', 'React'],
    github: '#',
    link: '#',
  },
  {
    title: 'CLI Task Manager',
    description: 'A terminal-based productivity app with natural language parsing, recurring tasks, and cloud sync.',
    tags: ['Node.js', 'SQLite', 'CLI', 'TypeScript'],
    github: '#',
  },
  {
    title: 'Design System',
    description: 'A comprehensive component library built for consistency, accessibility, and exceptional developer experience.',
    tags: ['React', 'Storybook', 'CSS', 'Figma'],
    github: '#',
    link: '#',
  },
];

const skills = [
  'TypeScript', 'React', 'Next.js', 'Node.js', 'Python',
  'PostgreSQL', 'Redis', 'Docker', 'AWS', 'System Design',
  'Data Structures', 'Algorithms',
];

const Index = () => {
  return (
    <div className="relative min-h-screen bg-background overflow-x-hidden">
      <CursorGlow />
      <NeonBackground />
      <FloatingDots />
      <Navbar />

      <main className="relative z-10">
        <Hero />

        {/* Experience Section */}
        <Experience />

        {/* Horizontal Scroll Projects */}
        <HorizontalScrollProjects projects={projects} />

        {/* About Section */}
        <section id="about" className="py-24 md:py-32 bg-secondary/30">
          <div className="container max-w-5xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <p className="text-sm text-muted-foreground tracking-wide uppercase mb-3">
                  About
                </p>
                <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-8">
                  A bit about <span className="italic">me</span>
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    I'm a developer who finds joy in solving complex problems
                    and building tools that people actually want to use.
                  </p>
                  <p>
                    My journey started with competitive programming, which taught
                    me to think algorithmically. Now I apply that same rigor to
                    building web applications — clean architecture, performant code,
                    and intuitive interfaces.
                  </p>
                  <p>
                    When I'm not coding, you'll find me exploring new technologies,
                    contributing to open source, or deep in a LeetCode session.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <p className="text-sm text-muted-foreground tracking-wide uppercase mb-6">
                  Technologies
                </p>
                <div className="flex flex-wrap gap-3">
                  {skills.map((skill, index) => (
                    <SkillChip key={skill} name={skill} index={index} />
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-24 md:py-32">
          <div className="container max-w-5xl mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-sm text-muted-foreground tracking-wide uppercase mb-3">
                Get in Touch
              </p>
              <h2 className="text-4xl md:text-5xl font-serif text-foreground mb-6">
                Let's work <span className="italic">together</span>
              </h2>
              <p className="text-muted-foreground max-w-md mx-auto mb-8">
                Have a project in mind or just want to chat?
                I'd love to hear from you.
              </p>
              <motion.a
                href="mailto:shubhvars2006@gmail.com"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex px-8 py-4 text-sm font-medium bg-foreground text-background rounded-full hover:opacity-90 transition-opacity"
              >
                Say Hello
              </motion.a>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
