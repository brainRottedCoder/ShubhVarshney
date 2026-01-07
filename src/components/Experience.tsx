import { motion } from 'framer-motion';
import { Calendar, MapPin, ExternalLink } from 'lucide-react';

interface Experience {
    title: string;
    company: string;
    companyUrl?: string;
    location: string;
    period: string;
    description: string[];
    technologies: string[];
}

const experiences: Experience[] = [
    {
        title: 'Software Development Engineer Intern',
        company: 'Temflo',
        companyUrl: 'https://temflo.co.in/',
        location: 'Remote',
        period: 'Jan 2026 - Present',
        description: [
            'Building scalable web applications using React and Node.js, serving 1000+ active users',
            'Collaborating with product and design teams to ship new features on weekly sprints',
            'Implemented lazy loading and code splitting, achieving 40% improvement in page load times',
            'Writing comprehensive unit tests and documentation to maintain code quality',
        ],
        technologies: ['React', 'TypeScript', 'Node.js', 'MongoDB', 'AWS'],
    },
    {
        title: 'Quant & Crypto Team Lead',
        company: 'FAAST Fintech Club',
        companyUrl: 'https://www.amufaast.com/',
        location: 'Hybrid',
        period: 'Sep 2025 - Present',
        description: [
            'Architected and developed the official club website from scratch, increasing member engagement by 60%',
            'Leading a team of 5 developers to build quantitative trading tools and backtesting frameworks',
            'Researching and implementing algorithmic trading strategies using Python and financial APIs',
        ],
        technologies: ['React', 'Next.js', 'Tailwind CSS', 'MongoDB', 'Python'],
    },
    {
        title: 'Core Team Member',
        company: 'CodeChef AMU Chapter',
        companyUrl: 'https://AMUcodechef.com',
        location: 'Hybrid',
        period: 'Sep 2024 - May 2025',
        description: [
            'Organized and coordinated 3 hackathons with 200+ participants, managing logistics and judging',
            'Mentored 50+ students in competitive programming and data structures & algorithms',
            'Developed problem sets and conducted weekly coding sessions to improve community skills',
        ],
        technologies: ['C++', 'Python', 'Data Structures', 'Algorithms'],
    },
];

const ExperienceCard = ({ experience, index }: { experience: Experience; index: number }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative group"
        >
            {/* Timeline connector */}
            {index !== experiences.length - 1 && (
                <div className="absolute left-[19px] top-14 w-[2px] h-[calc(100%+1.5rem)] bg-gradient-to-b from-border to-transparent hidden md:block" />
            )}

            <div className="flex gap-6">
                {/* Timeline dot */}
                <div className="hidden md:flex flex-col items-center">
                    <motion.div
                        whileHover={{ scale: 1.2 }}
                        className="w-10 h-10 rounded-full bg-secondary border-2 border-border flex items-center justify-center group-hover:border-primary/50 transition-colors"
                    >
                        <div className="w-3 h-3 rounded-full bg-primary/70 group-hover:bg-primary transition-colors" />
                    </motion.div>
                </div>

                {/* Card */}
                <motion.div
                    whileHover={{ y: -5 }}
                    className="flex-1 p-6 rounded-2xl bg-secondary/50 border border-border/50 hover:border-border hover:bg-secondary/70 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-primary/5"
                >
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-4">
                        <div>
                            <h3 className="text-xl font-semibold text-foreground">{experience.title}</h3>
                            <div className="flex items-center gap-2 mt-1">
                                {experience.companyUrl ? (
                                    <a
                                        href={experience.companyUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-primary hover:underline flex items-center gap-1 font-medium"
                                    >
                                        {experience.company}
                                        <ExternalLink className="w-3 h-3" />
                                    </a>
                                ) : (
                                    <span className="text-primary font-medium">{experience.company}</span>
                                )}
                            </div>
                        </div>
                        <div className="flex flex-col md:items-end gap-1 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1.5">
                                <Calendar className="w-3.5 h-3.5" />
                                <span>{experience.period}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <MapPin className="w-3.5 h-3.5" />
                                <span>{experience.location}</span>
                            </div>
                        </div>
                    </div>

                    {/* Description */}
                    <ul className="space-y-2 mb-4">
                        {experience.description.map((item, i) => (
                            <motion.li
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.3, delay: 0.2 + i * 0.1 }}
                                className="flex items-start gap-2 text-muted-foreground text-sm leading-relaxed"
                            >
                                <span className="text-primary mt-1.5">•</span>
                                {item}
                            </motion.li>
                        ))}
                    </ul>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2">
                        {experience.technologies.map((tech, i) => (
                            <motion.span
                                key={tech}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.2, delay: 0.3 + i * 0.05 }}
                                className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-colors"
                            >
                                {tech}
                            </motion.span>
                        ))}
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
};

export const Experience = () => {
    return (
        <section id="experience" className="py-24 md:py-32">
            <div className="container max-w-4xl mx-auto px-6">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="mb-16"
                >
                    <p className="text-sm text-muted-foreground tracking-wide uppercase mb-3">
                        Experience
                    </p>
                    <h2 className="text-3xl md:text-4xl font-serif text-foreground">
                        Where I've <span className="italic">worked</span>
                    </h2>
                </motion.div>

                {/* Experience Timeline */}
                <div className="space-y-8">
                    {experiences.map((experience, index) => (
                        <ExperienceCard key={index} experience={experience} index={index} />
                    ))}
                </div>

                {/* Optional: Resume Download */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="mt-12 text-center"
                >
                    <motion.a
                        href="/ShubhVarshney.pdf"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium border border-border rounded-full hover:bg-secondary transition-colors gradient-border"
                    >
                        <span>Download Resume</span>
                        <ExternalLink className="w-4 h-4" />
                    </motion.a>
                </motion.div>
            </div>
        </section>
    );
};
