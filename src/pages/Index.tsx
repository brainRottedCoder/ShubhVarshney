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
    title: 'Resumify – AI Resume Builder & ATS Analyzer',
    description: 'Transform your job search with an intelligent resume builder that crafts ATS-optimized resumes in minutes. Features real-time scoring, keyword optimization, and personalized suggestions powered by generative AI to help you land more interviews.',
    tags: ['React', 'Next.js', 'GenAI', 'Firebase', 'Tailwind CSS', 'NextAuth.js'],
    github: 'https://github.com/shubhvars/resumify/',
    link: 'https://resumify-rho-six.vercel.app/',
  },
  {
    title: 'Voltway ERP – AI-Native Operations Platform',
    description: 'A next-generation ERP system built for electric scooter manufacturing. Featuring Hugo AI—an intelligent copilot that automates procurement, analyzes operational data in real-time, and enables natural language queries across your entire operations database.',
    tags: ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind CSS', 'LangChain', 'Firebase', 'HuggingFace'],
    github: 'https://github.com/brainRottedCoder/Amulate-vedant-shubh',
    link: 'https://amulate-vedant-shubh.vercel.app',
  },
  {
    title: 'DreamGlobe – Immersive Travel Experience',
    description: 'An award-winning hackathon project that reimagines travel discovery. Users don\'t just browse destinations—they dream them into existence through an immersive 3D interface with WebGL-powered globe visualization and fluid animations.',
    tags: ['Framer Motion', 'React', 'TypeScript', 'Tailwind CSS', 'Three.js', 'Shadcn UI', 'Figma'],
    github: 'https://github.com/brainRottedCoder/DreamGlobe-dreamwareHackathon',
    link: 'https://dreamglobe.life/',
  },
  {
    title: 'Santaviour – 2D Platformer Game',
    description: 'An action-packed holiday-themed platformer built with Rust and Turbo Genesis SDK. Features smooth gameplay mechanics, custom sprite animations, challenging boss battles, and a heartwarming story about saving Christmas.',
    tags: ['Rust', 'Turbo Genesis SDK', 'Game Development', 'Figma'],
    github: 'https://github.com/brainRottedCoder/Santaviour',
    link: 'https://santaviour.vercel.app',
  },
  {
    title: 'QuantAI – Smart Finance Platform',
    description: 'Take control of your financial future with an AI-powered platform that tracks investments, analyzes spending patterns, and delivers personalized insights. Featuring real-time portfolio tracking and intelligent automation for smarter money management.',
    tags: ['Next.js 16', 'React 19', 'Supabase', 'Tailwind CSS', 'Clerk', 'Shadcn UI'],
    github: 'https://github.com/brainRottedCoder/QuantAI',
    link: 'https://quant-ai-olive.vercel.app/',
  },
];

const skills = [
  'JavaScript', 'TypeScript', 'Python', 'Java', 'Rust',
  'React', 'Next.js', 'Node.js', 'Express.js',
  'MongoDB', 'PostgreSQL', 'Prisma ORM', 'Firebase', 'Supabase',
  'Tailwind CSS', 'GSAP', 'Framer Motion', 'Three.js',
  'Git', 'RESTful APIs', 'Postman', 'LangChain',
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
                    I'm a full-stack developer with a passion for building products
                    that solve real problems. From AI-powered applications to immersive
                    web experiences, I love turning complex ideas into elegant solutions.
                  </p>
                  <p>
                    My journey began with competitive programming—solving 500+ problems
                    taught me to think algorithmically and optimize relentlessly. Today,
                    I apply that same rigor to architecting scalable systems, writing
                    clean code, and crafting intuitive user experiences.
                  </p>
                  <p>
                    Currently exploring the intersection of AI and web development,
                    building tools that leverage LLMs, and contributing to open-source.
                    When I'm not coding, you'll find me reading tech blogs or gaming.
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
                Whether you have a project idea, want to collaborate on something exciting,
                or just want to chat about tech—I'm always open to new opportunities.
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
