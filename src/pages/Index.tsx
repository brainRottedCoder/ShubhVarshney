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
    title: 'Resume Builder & ATS analyser',
    description: 'A modern, feature-rich portfolio and resume builder application that helps developers create professional portfolios with ease. Built with Next.js, React, and shadcn/ui for a seamless user experience.',
    tags: ['React', 'Next.js', 'GenAI', 'Firebase', 'Tailwind CSS', 'NextAuth.js'],
    github: 'https://github.com/shubhvars/resumify/',
    link: 'https://resumify-rho-six.vercel.app/',
  },
  {
    title: 'Voltway ERP - AI-Native Operations Platform',
    description: 'Voltway ERP is a next-generation enterprise resource planning system specifically designed for electric scooter manufacturing operations. Unlike traditional ERPs, Voltway integrates artificial intelligence at its core through Hugo AI, an intelligent copilot that automates procurement workflows, analyzes operational data, and enables natural language interactions with your entire operations database.',
    tags: ['Next.js 16.1', 'React 19', 'TypeScript 5', 'Tailwind CSS', 'LangChain', 'Firebase', 'HuggingFace', ''],
    github: 'https://github.com/brainRottedCoder/Amulate-vedant-shubh',
    link: 'https://amulate-vedant-shubh.vercel.app',
  },
  {
    title: 'DreamGlobe',
    description: `Dream Globe is not just a travel app — it's an emotional voyage through consciousness. We've built an immersive, surreal experience where users don't browse destinations, they dream them into existence.`,
    tags: ['Framer.js', 'React', 'TypeScript', 'Tailwind CSS', 'Three.js', 'Shadcn UI', 'Figma'],
    github: 'https://github.com/brainRottedCoder/DreamGlobe-dreamwareHackathon',
    link: 'https://dreamglobe.life/',
  },
  {
    title: 'Santaviour',
    description: `Santa's Rescue is an action-packed 2D platformer built with the Turbo Genesis SDK and Rust. Play as Santa on a mission to rescue kidnapped children and defeat the Evil Santa in an epic boss battle to save Christmas!`,
    tags: ['Rust', 'Turbo Genesis SDK', 'Canva', 'Figma',],
    github: 'https://github.com/brainRottedCoder/Santaviour',
    link: 'https://santaviour.vercel.app',
  },
  {
    title: 'QuantAI',
    description: 'A modern, AI-powered financial platform that helps users manage their personal finances, track investments, and gain valuable financial insights through intelligent automation and machine learning.',
    tags: ['Next.js 16.1', 'React 19', 'Supabase', 'Tailwind css', 'Clerk', 'Shadcn UI', 'Tailwind CSS'],
    github: 'https://github.com/brainRottedCoder/QuantAI',
    link: 'https://quant-ai-olive.vercel.app/',
  },

];

const skills = [
  'Java', 'Javascript', 'Python', 'Express. js', 'Git', 'GitHub', 'Next.js', 'MongoDB', 'Node.js', 'PostgreSQL', 'Postman', 'Prisma ORM', 'RESTful APIs', 'GSAP', 'Next. js', 'React. js', 'Tailwind CSS',
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
                    reading books, or playing video games.
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
