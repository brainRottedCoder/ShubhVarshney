import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, ArrowUpRight } from 'lucide-react';

const socialLinks = [
  { icon: Github, href: 'https://github.com/brainRottedCoder', label: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/shubh-varshney-25b897314/', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:shubhvars2006@gmail.com', label: 'Email' },
];

export const Footer = () => {
  return (
    <footer className="py-16 border-t border-border/50">
      <div className="container max-w-5xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-serif italic text-foreground mb-4">
              Let's connect
            </h3>
            <p className="text-muted-foreground text-sm max-w-sm leading-relaxed">
              Open to interesting projects, collaborations,
              or just a good conversation about code.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col gap-4"
          >
            {socialLinks.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ x: 5 }}
                className="group flex items-center justify-between py-3 border-b border-border/50 hover:border-foreground/20 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <social.icon className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                  <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                    {social.label}
                  </span>
                </div>
                <ArrowUpRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.a>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-16 pt-8 border-t border-border/30 flex items-center justify-between"
        >
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Shubh Varshney
          </p>
          <p className="text-xs text-muted-foreground">
            Crafted with care
          </p>
        </motion.div>
      </div>
    </footer>
  );
};
