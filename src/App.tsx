/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from "react";
import {
  Menu,
  X,
  Github,
  Linkedin,
  Mail,
  Phone,
  ExternalLink,
  ChevronRight,
  Code2,
  Database,
  BarChart3,
  Cpu,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// --- Types ---
interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  liveLink: string;
  githubLink: string;
}

interface Skill {
  name: string;
  level: "Expert" | "Intermediate";
  icon: React.ReactNode;
}

// --- Data ---
const PROJECTS: Project[] = [
  {
    id: "launch360",
    title: "Launch360",
    description:
      "An end-to-end business assistance platform designed to streamline operations and provide comprehensive digital solutions for emerging enterprises.",
    tags: ["Full Stack", "Business Platform", "React"],
    liveLink: "#",
    githubLink: "#",
  },
  {
    id: "servicesphere",
    title: "ServiceSphere",
    description:
      "A SaaS platform tailored for small business merchants to seamlessly transition their services online, including booking and inventory management.",
    tags: ["SaaS", "E-commerce", "Node.js"],
    liveLink: "#",
    githubLink: "#",
  },
  {
    id: "smart-city",
    title: "Smart City Prediction",
    description:
      "A data-driven system for urban planning and resource allocation using predictive analytics to prioritize city infrastructure improvements.",
    tags: ["Data Science", "Python", "Automation"],
    liveLink: "#",
    githubLink: "#",
  },
];

const SKILLS: Skill[] = [
  { name: "HTML/CSS", level: "Expert", icon: <Code2 size={20} /> },
  { name: "Python Django", level: "Expert", icon: <Cpu size={20} /> },
  { name: "GitHub", level: "Expert", icon: <Github size={20} /> },
  { name: "Figma", level: "Expert", icon: <BarChart3 size={20} /> },
  { name: "Digital Marketing", level: "Expert", icon: <BarChart3 size={20} /> },
  { name: "JavaScript", level: "Intermediate", icon: <Code2 size={20} /> },
  { name: "Python", level: "Intermediate", icon: <Database size={20} /> },
  { name: "FastAPI", level: "Intermediate", icon: <Database size={20} /> },
];

// --- Components ---

const TypingEffect = ({ words }: { words: string[] }) => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);

  useEffect(() => {
    if (subIndex === words[index].length + 1 && !reverse) {
      setReverse(true);
      return;
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }

    const timeout = setTimeout(
      () => {
        setSubIndex((prev) => prev + (reverse ? -1 : 1));
      },
      Math.max(
        reverse ? 75 : subIndex === words[index].length ? 1000 : 150,
        parseInt(Math.random() * 10 + ""),
      ),
    );

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse, words]);

  return (
    <span className="text-gray-600 dark:text-gray-400 font-mono">
      {` ${words[index].substring(0, subIndex)}`}
      <span className="animate-pulse">|</span>
    </span>
  );
};

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [navOpacity, setNavOpacity] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const opacity = Math.min(scrollY / 100, 1);
      setNavOpacity(opacity);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900 selection:bg-gray-200">
      {/* Header */}
      <header
        className="fixed top-0 left-0 w-full z-50 transition-all duration-300"
        style={{
          backgroundColor: `rgba(255, 255, 255, ${navOpacity * 0.9})`,
          backdropFilter: navOpacity > 0 ? "blur(8px)" : "none",
          borderBottom: `1px solid rgba(0, 0, 0, ${navOpacity * 0.1})`,
        }}
      >
        <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
          <a href="#home" className="text-xl font-bold tracking-tighter">
            H. PATEL
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium hover:text-gray-500 dark:hover:text-zinc-400 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center space-x-4">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>

        {/* Mobile Nav Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-full left-0 w-full bg-white border-b border-gray-100 md:hidden"
            >
              <div className="flex flex-col p-6 space-y-4">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="text-lg font-medium hover:text-gray-500 dark:hover:text-zinc-400"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main>
        {/* Subtle Background Pattern */}
        <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.03] dark:opacity-[0.05]">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id="grid"
                width="40"
                height="40"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 40 0 L 0 0 0 40"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Hero Section */}
        <section
          id="home"
          className="pt-32 pb-20 md:pt-60 md:pb-40 container mx-auto px-6 relative z-10"
        >
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex-shrink-0 lg:order-2"
            >
              <div className="relative">
                <div className="w-74 h-74 md:w-80 md:h-80 rounded-full overflow-hidden border-8 border-white dark:border-zinc-900 shadow-2xl relative z-10">
                  <img
                    src={`${import.meta.env.BASE_URL}heetprofile2.jpg`}
                    alt="Heet Patel"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                {/* Decorative Elements */}
                <div className="absolute -top-4 -right-4 w-20 h-20 md:w-24 md:h-24 bg-gray-100 dark:bg-zinc-800 rounded-full z-0 animate-pulse" />
                <div className="absolute -bottom-6 -left-6 w-28 h-28 md:w-32 md:h-32 border border-gray-200 dark:border-zinc-700 rounded-full z-0" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex-1 max-w-3xl lg:order-1 text-center lg:text-left"
            >
              <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider uppercase bg-gray-100 dark:bg-zinc-800 rounded-full mb-6">
                Available for new projects
              </span>
              <h1 className="text-4xl md:text-7xl font-bold tracking-tight mb-6">
                I'm Heet Patel
              </h1>
              <h2 className="text-xl md:text-4xl text-gray-500 dark:text-zinc-400 mb-8 min-h-[1.5em]">
                Expert in
                <TypingEffect
                  words={[
                    "Web Development",
                    "Digital Marketing",
                    "Software Engineering",
                    "Data Engineering",
                  ]}
                />
              </h2>
              <p className="text-lg md:text-xl text-gray-600 dark:text-zinc-400 mb-10 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Building scalable digital solutions with 2+ years of
                professional experience. Bridging the gap between robust
                engineering and strategic marketing.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <a
                  href="#projects"
                  className="inline-flex items-center justify-center px-8 py-4 bg-gray-900 text-white dark:bg-white dark:text-gray-900 font-semibold rounded-lg hover:opacity-90 transition-all hover:scale-[1.02]"
                >
                  View My Work
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center px-8 py-4 border border-gray-200 dark:border-zinc-800 font-semibold rounded-lg hover:bg-gray-50 dark:hover:bg-zinc-900 transition-all"
                >
                  Contact Me
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 bg-gray-50 dark:bg-zinc-900/50">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row gap-12 items-center">
              <motion.div
                whileInView={{ opacity: 1, x: 0 }}
                initial={{ opacity: 0, x: -30 }}
                viewport={{ once: true }}
                className="w-full md:w-1/2"
              >
                <div className="aspect-[4/5] bg-gray-200 dark:bg-zinc-800 rounded-2xl overflow-hidden relative group">
                  <img
                    src={`${import.meta.env.BASE_URL}heetprofile2.png`}
                    alt="Heet Patel Professional"
                    className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gray-900/0 group-hover:bg-gray-900/10 transition-all" />
                </div>
              </motion.div>
              <motion.div
                whileInView={{ opacity: 1, x: 0 }}
                initial={{ opacity: 0, x: 30 }}
                viewport={{ once: true }}
                className="w-full md:w-1/2"
              >
                <h2 className="text-3xl font-bold mb-6">About Me</h2>
                <div className="space-y-4 text-gray-600 dark:text-zinc-400 text-lg leading-relaxed">
                  <p>
                    I hold a B.Tech in Computer Engineering, which provided me
                    with a strong foundation in computational principles and
                    system design.
                  </p>
                  <p>
                    My professional journey focuses on the intersection of
                    robust web development, software engineering, and strategic
                    digital marketing. I believe that a great product isn't just
                    about the lines of code, but how it reaches and serves its
                    users.
                  </p>
                  <p>
                    With over 2 years of experience, I've developed a knack for
                    building scalable applications while maintaining a keen eye
                    for performance and user experience.
                  </p>
                </div>
                <div className="mt-8 flex gap-6">
                  <div>
                    <h4 className="text-2xl font-bold dark:text-white">2+</h4>
                    <p className="text-sm text-gray-500">Years Experience</p>
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold dark:text-white">15+</h4>
                    <p className="text-sm text-gray-500">Projects Completed</p>
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold dark:text-white">100%</h4>
                    <p className="text-sm text-gray-500">Client Satisfaction</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-20">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl font-bold mb-4">Technical Proficiency</h2>
              <p className="text-gray-600 dark:text-zinc-400">
                A comprehensive blend of technical engineering skills and
                strategic marketing expertise.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {SKILLS.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  whileInView={{ opacity: 1, y: 0 }}
                  initial={{ opacity: 0, y: 20 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 border border-gray-100 dark:border-zinc-800 rounded-xl hover:border-gray-300 dark:hover:border-zinc-700 transition-all group"
                >
                  <div className="mb-4 text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                    {skill.icon}
                  </div>
                  <h3 className="text-lg font-bold mb-2">{skill.name}</h3>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium uppercase tracking-wider text-gray-500">
                      {skill.level}
                    </span>
                    <span className="text-xs text-gray-400">
                      {skill.level === "Expert" ? "90%" : "75%"}
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-gray-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                    <motion.div
                      whileInView={{
                        width: skill.level === "Expert" ? "90%" : "75%",
                      }}
                      initial={{ width: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className="h-full bg-gray-900 dark:bg-white"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-20 bg-gray-50 dark:bg-zinc-900/50">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
              <div className="max-w-2xl">
                <h2 className="text-3xl font-bold mb-4">Featured Work</h2>
                <p className="text-gray-600 dark:text-zinc-400">
                  A selection of projects that demonstrate my ability to solve
                  complex problems and deliver quality software.
                </p>
              </div>
              <a
                href="#"
                className="inline-flex items-center text-sm font-bold group"
              >
                All Projects{" "}
                <ChevronRight
                  size={16}
                  className="ml-1 group-hover:translate-x-1 transition-transform"
                />
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {PROJECTS.map((project, index) => (
                <motion.div
                  key={project.id}
                  whileInView={{ opacity: 1, scale: 1 }}
                  initial={{ opacity: 0, scale: 0.95 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden border border-gray-100 dark:border-zinc-800 hover:shadow-xl dark:hover:shadow-white/5 transition-all flex flex-col h-full"
                >
                  <div className="aspect-[16/10] bg-gray-100 dark:bg-zinc-800 relative group overflow-hidden">
                    {/* Project Preview Placeholder */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-20 group-hover:opacity-40 transition-opacity">
                      <Code2 size={64} />
                    </div>
                    <div className="absolute inset-0 bg-gray-900/0 group-hover:bg-gray-900/40 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <div className="flex gap-4">
                        <a
                          href={project.liveLink}
                          className="p-3 bg-white text-gray-900 rounded-full hover:scale-110 transition-transform"
                        >
                          <ExternalLink size={20} />
                        </a>
                        <a
                          href={project.githubLink}
                          className="p-3 bg-white text-gray-900 rounded-full hover:scale-110 transition-transform"
                        >
                          <Github size={20} />
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="p-8 flex flex-col flex-grow">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-gray-100 dark:bg-zinc-800 text-[10px] uppercase font-bold tracking-wider rounded-md"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-xl font-bold mb-3">{project.title}</h3>
                    <p className="text-gray-500 dark:text-zinc-400 text-sm mb-6 flex-grow leading-relaxed">
                      {project.description}
                    </p>
                    <div className="flex items-center justify-between pt-6 border-t border-gray-50 dark:border-zinc-800">
                      <a
                        href={project.liveLink}
                        className="text-sm font-bold flex items-center group"
                      >
                        Live Demo{" "}
                        <ExternalLink
                          size={14}
                          className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        />
                      </a>
                      <a
                        href={project.githubLink}
                        className="text-sm font-bold flex items-center group"
                      >
                        GitHub{" "}
                        <Github
                          size={14}
                          className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        />
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-16">
              <div className="lg:w-1/3">
                <h2 className="text-3xl font-bold mb-6">Let's connect</h2>
                <p className="text-gray-600 dark:text-zinc-400 mb-10 text-lg">
                  Have a job opportunity or a project you'd like to discuss? I'd
                  love to hear from you.
                </p>
                <div className="space-y-6">
                  <a
                    href="mailto:nakraniheet.work@gmail.com"
                    className="flex items-center gap-4 group"
                  >
                    <div className="p-3 bg-gray-100 dark:bg-zinc-900 rounded-lg group-hover:bg-gray-900 group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-gray-900 transition-all">
                      <Mail size={20} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                        Email
                      </p>
                      <p className="font-semibold">
                        nakraniheet.work@gmail.com
                      </p>
                    </div>
                  </a>
                  <a
                    href="tel:+919714095533"
                    className="flex items-center gap-4 group"
                  >
                    <div className="p-3 bg-gray-100 dark:bg-zinc-900 rounded-lg group-hover:bg-gray-900 group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-gray-900 transition-all">
                      <Phone size={20} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                        Phone
                      </p>
                      <p className="font-semibold">+91 9714095533</p>
                    </div>
                  </a>
                  <a
                    href="https://www.linkedin.com/in/heet-nakrani-053301326/"
                    target="_blank"
                    className="flex items-center gap-4 group"
                  >
                    <div className="p-3 bg-gray-100 dark:bg-zinc-900 rounded-lg group-hover:bg-gray-900 group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-gray-900 transition-all">
                      <Linkedin size={20} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                        LinkedIn
                      </p>
                      <p className="font-semibold">
                        linkedin.com/in/heet-nakrani
                      </p>
                    </div>
                  </a>
                </div>
              </div>

              <div className="lg:w-2/3">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.currentTarget);
                    const name = formData.get("name") as string;
                    const email = formData.get("email") as string;
                    const message = formData.get("message") as string;

                    if (!name || !email || !message) {
                      alert("Please fill in all fields.");
                      return;
                    }
                    if (!/\S+@\S+\.\S+/.test(email)) {
                      alert("Please enter a valid email.");
                      return;
                    }

                    alert(
                      "Thank you for your message! I'll get back to you soon.",
                    );
                    (e.target as HTMLFormElement).reset();
                  }}
                  className="space-y-6 bg-gray-50 dark:bg-zinc-900/30 p-8 md:p-12 rounded-3xl"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label
                        htmlFor="name"
                        className="text-sm font-bold tracking-wide uppercase"
                      >
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        placeholder="John Doe"
                        className="w-full px-6 py-4 bg-white dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label
                        htmlFor="email"
                        className="text-sm font-bold tracking-wide uppercase"
                      >
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        placeholder="john@example.com"
                        className="w-full px-6 py-4 bg-white dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white transition-all"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="message"
                      className="text-sm font-bold tracking-wide uppercase"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      required
                      placeholder="Hi Heet, I'd like to talk about..."
                      className="w-full px-6 py-4 bg-white dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white transition-all resize-none"
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full md:w-auto px-10 py-5 bg-gray-900 text-white dark:bg-white dark:text-gray-900 font-bold rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-12 border-t border-gray-100 dark:border-zinc-900">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-center md:text-left">
              <a
                href="#home"
                className="text-xl font-bold tracking-tighter mb-2 block"
              >
                HEET. PATEL
              </a>
              <p className="text-sm text-gray-500">
                © {new Date().getFullYear()} All rights reserved.
              </p>
            </div>
            <div className="flex space-x-6">
              <a
                href="https://github.com"
                className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                <Github size={20} />
              </a>
              <a
                href="https://www.linkedin.com/in/heet-nakrani-053301326/"
                className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="mailto:nakraniheet.work@gmail.com"
                className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
