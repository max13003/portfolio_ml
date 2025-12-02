import React, { useState, useRef } from 'react';
import { Github, Linkedin, Mail, ExternalLink, Code2, Database, Terminal, Menu, ArrowRight } from 'lucide-react';
import { 
  motion, 
  useScroll, 
  useSpring, 
  useTransform, 
  useMotionValue, 
  useVelocity, 
  useAnimationFrame 
} from 'framer-motion';

// --- FONCTION UTILITAIRE ---
const wrap = (min, max, v) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

// --- DONNÉES ---
const projects = [
  {
    title: "SaaS Indépendant",
    desc: "Dashboard analytique pour freelances. Architecture complexe (Auth, API, BDD) pour un apprentissage approfondi du SaaS.",
    tech: ["React", "Node.js", "Tailwind"],
    github: "#", 
    demo: null,
    color: "from-blue-500 to-cyan-500"
  },
  {
    title: "Master M&A",
    desc: "Site vitrine officiel pour l'association du Master 2 Paris Saclay. Design institutionnel, animations douces et SEO.",
    tech: ["HTML/CSS", "JS", "SEO"],
    github: "#", 
    demo: "#",
    color: "from-emerald-500 to-teal-500"
  },
  {
    title: "Jeux",
    desc: "Application web de jeux (Motus, Mots mêlés). Logique algorithmique et gestion de base de données.",
    tech: ["PHP", "MySQL", "CSS", "HTML", "JS"],
    github: "https://github.com/LoanKma/projet-web-v2",
    demo: null,
    color: "from-purple-500 to-pink-500"
  }
];

const skills = [
  { name: "Frontend", icon: <Code2 size={24} />, items: ["CSS","HTML", "JavaScript", "Tailwind en apprentissage", "Framer Motion en apprentissage", "React en apprentissage"] },
  { name: "Backend", icon: <Database size={24} />, items: ["PHP", "MySQL", "Node.js en apprentissage", "API REST en apprentissage"] },
  { name: "Outils", icon: <Terminal size={24} />, items: ["Git", "VS Code", "Figma", "Trello"] },
];

// --- COMPOSANT : VELOCITY SCROLL ---
function ParallaxText({ children, baseVelocity = 100 }) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], { clamp: false });
  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);
  const directionFactor = useRef(1);
  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);
    if (velocityFactor.get() < 0) { directionFactor.current = -1; } 
    else if (velocityFactor.get() > 0) { directionFactor.current = 1; }
    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });
  return (
    <div className="overflow-hidden m-0 whitespace-nowrap flex flex-nowrap">
      <motion.div className="font-bold uppercase text-6xl md:text-9xl text-transparent bg-clip-text bg-gradient-to-r from-slate-800 to-slate-700 flex flex-nowrap whitespace-nowrap" style={{ x }}>
        <span className="block mr-10">{children} </span>
        <span className="block mr-10">{children} </span>
        <span className="block mr-10">{children} </span>
        <span className="block mr-10">{children} </span>
      </motion.div>
    </div>
  );
}

// --- FOND ANIMÉ ---
const AnimatedBackground = () => (
  <div className="fixed inset-0 z-[-1] bg-slate-950">
    <motion.div animate={{ x: [0, 100, 0], y: [0, -50, 0], scale: [1, 1.2, 1] }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px]" />
    <motion.div animate={{ x: [0, -100, 0], y: [0, 100, 0], scale: [1, 1.5, 1] }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }} className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[120px]" />
    <motion.div animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.1, 1] }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-900/10 rounded-full blur-[120px]" />
  </div>
);

// --- AUTRES COMPOSANTS ---
const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  return <motion.div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 origin-left z-[100]" style={{ scaleX: useSpring(scrollYProgress, { stiffness: 100, damping: 30 }) }} />;
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="fixed w-full bg-slate-950/50 backdrop-blur-md z-50 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">&lt;MaximeDev /&gt;</span>
        <div className="hidden md:flex space-x-8">
          {['Accueil', 'Compétences', 'Projets', 'Contact'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-medium text-slate-300 hover:text-white transition-colors relative group">{item}<span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all group-hover:w-full"></span></a>
          ))}
        </div>
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white"><Menu /></button>
      </div>
      {isOpen && <div className="md:hidden bg-slate-900 p-4 absolute w-full border-b border-slate-800">{['Accueil', 'Compétences', 'Projets', 'Contact'].map((item) => <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setIsOpen(false)} className="block py-3 text-center text-slate-300 hover:text-white">{item}</a>)}</div>}
    </nav>
  );
};

const Hero = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 200]); 
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section id="accueil" className="min-h-screen flex items-center justify-center pt-20 relative overflow-hidden">
      <motion.div style={{ y, opacity }} className="text-center px-4 max-w-5xl mx-auto z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 text-xs font-semibold tracking-wider text-blue-300 uppercase bg-blue-500/10 rounded-full border border-blue-500/20 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
            Recherche Alternance
          </div>
          <h1 className="text-5xl md:text-8xl font-bold mb-6 text-white tracking-tight">
            Développeur <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Full Stack</span>
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg md:text-xl mb-10 leading-relaxed p-4 rounded-xl">
            Étudiant en Bachelor Pro. Je construis des expériences web modernes et performantes.
            Passionné par l'architecture logicielle et l'UX Design.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} href="#projets" className="group bg-white text-slate-900 px-8 py-4 rounded-full font-bold transition-all flex items-center justify-center gap-2">
              Voir mes travaux <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform"/>
            </motion.a>
            <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} href="#contact" className="px-8 py-4 rounded-full font-bold text-white border border-slate-700 hover:bg-slate-800/80 backdrop-blur-sm transition-all">Me contacter</motion.a>
          </div>
      </motion.div>
    </section>
  );
};

const Skills = () => (
  <section id="compétences" className="py-32 relative">
    <div className="max-w-6xl mx-auto px-6">
      <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-3xl md:text-4xl font-bold mb-16 text-center text-white">
        Mon Arsenal <span className="text-blue-500">Technique</span>
      </motion.h2>
      <div className="grid md:grid-cols-3 gap-8">
        {skills.map((cat, idx) => (
          <motion.div key={idx} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ delay: idx * 0.2 }} className="bg-slate-900/50 p-8 rounded-2xl border border-slate-800 hover:border-blue-500/30 transition-colors backdrop-blur-sm">
            <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center text-blue-400 mb-6">{cat.icon}</div>
            <h3 className="text-xl font-bold mb-4 text-white">{cat.name}</h3>
            <div className="flex flex-wrap gap-2">
              {cat.items.map((s) => <span key={s} className="px-3 py-1 bg-slate-800/80 rounded-md text-sm text-slate-300 border border-slate-700">{s}</span>)}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const Projects = () => (
  <section id="projets" className="py-32">
    <div className="max-w-6xl mx-auto px-6">
      <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-3xl md:text-4xl font-bold mb-16 text-center text-white">
        Projets <span className="text-purple-500">Sélectionnés</span>
      </motion.h2>
      
      {/* Grille de projets (Version Clean sans effet 3D flou) */}
      <div className="grid md:grid-cols-3 gap-8">
        {projects.map((p, i) => (
          <motion.div 
            key={i}
            whileHover={{ y: -10 }} // C'est ici : la carte monte simplement de 10px
            transition={{ type: "spring", stiffness: 300 }}
            className="h-full relative bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-800 overflow-hidden group hover:border-blue-500/30 transition-colors hover:shadow-2xl hover:shadow-blue-500/10"
          >
              <div className={`h-2 bg-gradient-to-r ${p.color}`} />
              <div className="p-8">
                <div className="mb-6 inline-flex p-3 rounded-xl bg-slate-800 text-white"><Code2 size={24} /></div>
                <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-blue-400 transition-colors">{p.title}</h3>
                <p className="text-slate-400 mb-6 leading-relaxed">{p.desc}</p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {p.tech.map((t) => <span key={t} className="text-xs font-mono text-blue-200 bg-blue-500/10 px-2 py-1 rounded">{t}</span>)}
                </div>
                <div className="flex items-center gap-4">
                  <a href={p.github} className="text-sm font-medium text-slate-300 hover:text-white flex items-center gap-2"><Github size={16} /> Code</a>
                  {p.demo && <a href={p.demo} className="text-sm font-medium text-blue-400 hover:text-blue-300 flex items-center gap-2"><ExternalLink size={16} /> Live Demo</a>}
                </div>
              </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const Contact = () => (
  <section id="contact" className="py-32 relative">
    <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
      <h2 className="text-4xl font-bold mb-8 text-white">Prêt à coder ?</h2>
      <p className="text-slate-400 mb-12 text-lg">Je suis actuellement à la recherche d'une alternance.</p>
      <div className="flex justify-center gap-6">
        {[ { icon: <Mail />, href: "mailto:tonemail@gmail.com" }, { icon: <Github />, href: "https://github.com" }, { icon: <Linkedin />, href: "https://linkedin.com" } ].map((social, i) => (
          <motion.a key={i} whileHover={{ y: -5, scale: 1.1 }} href={social.href} className="p-4 bg-slate-800 rounded-full border border-slate-700 text-white hover:bg-blue-600 hover:border-blue-500 transition-all">{social.icon}</motion.a>
        ))}
      </div>
      <footer className="mt-20 pt-8 border-t border-slate-800/50 text-slate-600 text-sm">© 2025 • Designé & Codé avec passion.</footer>
    </div>
  </section>
);

export default function App() {
  return (
    <div className="min-h-screen text-slate-200 font-sans selection:bg-blue-500/30 overflow-x-hidden relative">
      <AnimatedBackground />
      <ScrollProgress />
      <Navbar />
      
      <Hero />
      
      {/* SECTION SCROLL VELOCITY */}
      <section className="py-10 border-y border-slate-800/50 bg-slate-900/30 backdrop-blur-sm">
        <ParallaxText baseVelocity={-2}>REACT • NODE.JS • PHP • MYSQL • FULL STACK •</ParallaxText>
        <ParallaxText baseVelocity={2}>FREELANCE • CREATIVE • DEVELOPER • FRONTEND •</ParallaxText>
      </section>

      <Skills />
      <Projects />
      <Contact />
    </div>
  );
}