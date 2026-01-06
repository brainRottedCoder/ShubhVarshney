import { motion } from 'framer-motion';
import { ThemeToggle } from './ThemeToggle';

export const Navbar = () => {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 py-5"
    >
      <div className="container  mx-auto px-6">
        <div className="flex items-center justify-between">
          <motion.a
            href="#"
            whileHover={{ scale: 1.05 }}
            className="text-xl font-serif italic text-foreground"
          >
            Shubh_.
          </motion.a>

          <div className="flex items-center gap-8">
            <div className="hidden sm:flex items-center gap-8">
              {['work', 'about', 'contact'].map((link) => (
                <motion.a
                  key={link}
                  href={`#${link}`}
                  whileHover={{ y: -2 }}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 capitalize"
                >
                  {link}
                </motion.a>
              ))}
            </div>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </motion.nav>
  );
};
