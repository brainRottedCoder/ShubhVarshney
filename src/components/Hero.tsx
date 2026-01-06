import { motion } from 'framer-motion';
import { GitHubStatsCard } from './GitHubStatsCard';
import { LeetCodeStatsCard } from './LeetCodeStatsCard';

export const Hero = () => {
  return (
    <section className="flex items-center justify-center relative pt-20 pb-12 min-h-screen overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full -z-10">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover"
        >
          <source src="/backgroundTheme.mp4" type="video/mp4" />
        </video>
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-background/70 backdrop-blur-[1px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 ">
          {/* Left - Intro */}
          <div className="space-y-8 pt-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-sm text-muted-foreground tracking-wide uppercase mb-4">
                Aspiring Software Engineer
              </p>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif leading-[1.1] text-foreground">
                Shubh
                <br />
                <span className="italic">Varshney</span>
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-lg text-muted-foreground max-w-md leading-relaxed"
            >
              Building clean, interactive web experiences.
              Passionate about algorithms, system design,
              and crafting elegant solutions.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex items-center gap-4"
            >
              <motion.a
                href="#work"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-3 text-sm font-medium bg-foreground text-background rounded-full hover:opacity-90 transition-opacity shimmer-button"
              >
                View Projects
              </motion.a>
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-3 text-sm font-medium border border-border rounded-full hover:bg-secondary transition-colors gradient-border"
              >
                Get in Touch
              </motion.a>
            </motion.div>

            {/* Mini stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex items-center gap-8 pt-4"
            >
              {/* <div>
                <p className="text-3xl font-semibold font-mono text-foreground">3+</p>
                <p className="text-xs text-muted-foreground">years exp</p>
              </div> */}
              <div className="w-px h-8 bg-border" />
              <div>
                <p className="text-3xl font-semibold font-mono text-foreground">10+</p>
                <p className="text-xs text-muted-foreground">projects</p>
              </div>
              <div className="w-px h-8 bg-border" />
              <div>
                <p className="text-3xl font-semibold font-mono text-foreground">500+</p>
                <p className="text-xs text-muted-foreground">problems</p>
              </div>
            </motion.div>
          </div>

          {/* Right - Stats Cards */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10">
            <GitHubStatsCard />
            <LeetCodeStatsCard />
          </div>
        </div>
      </div>
    </section>
  );
};
