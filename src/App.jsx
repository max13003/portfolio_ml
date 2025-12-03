import React, { useState, useRef } from 'react';
import { Github, Linkedin, Mail, ExternalLink, Code2, Database, Terminal, Menu, ArrowRight, Home, User, Folder, Send, Download, Calendar, MapPin, GitCommit } from 'lucide-react';
import { 
  motion, 
  useScroll, 
  useSpring, 
  useTransform, 
  useMotionValue, 
  useVelocity, 
  useAnimationFrame,
  AnimatePresence
} from 'framer-motion';

// --- FONCTION UTILITAIRE ---
const wrap = (min, max, v) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

// --- VARIANTES D'ANIMATION (CASCADE) ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100, damping: 15 }
  }
};

// --- DONNÉES ---
const projects = [
  {
    title: "SaaS Indépendant",
    desc: "Dashboard analytique pour freelances. Architecture complexe (Auth, API, BDD) pour un apprentissage approfondi du SaaS.",
    tech: ["En developpement"],
    github: "#", demo: null, color: "from-blue-500 to-cyan-500"
  },
  {
    title: "Master M&A",
    desc: "Site vitrine officiel pour l'association du Master 2 Paris Saclay. Design institutionnel, animations douces et SEO.",
    tech: ["HTML/CSS", "JS", "SEO"],
    github: "#", demo: "#", color: "from-emerald-500 to-teal-500"
  },
  {
    title: "Jeux",
    desc: "Application web de jeux (Motus, Mots mêlés). Logique algorithmique et gestion de base de données.",
    tech: ["PHP", "MySQL", "CSS","HTML", "JS"],
    github: "https://github.com/LoanKma/projet-web-v2", demo: null, color: "from-purple-500 to-pink-500"
  }
];

const skills = [
  { name: "Frontend", icon: <Code2 size={24} />, items: ["HTML", "CSS", "JS", "React en apprentissage", "Tailwind en apprentissage", "Framer Motion en apprentissage"] },
  { name: "Backend", icon: <Database size={24} />, items: ["PHP", "MySQL"] },
  { name: "Outils", icon: <Terminal size={24} />, items: ["Git", "VS Code", "Figma", "Vercel", "Trello"] },
];

const timelineData = [
  { year: "2025 - Présent", title: "Bachelor Pro Développeur Full Stack", place: "ESEO, Angers", desc: "Algorithmique • Logique • Fondements informatique • Frontend (HTML, CSS, JS) • Backend (PHP) • Bases de données • POO • Réseau • Infrastructure • Cybersécurité • Web3 • Blockchain • Éco-conception • Git • Projet Web • Application de bureau • Anglais • Communication • Gestion de projet" },
  { year: "2024 - Présent", title: "Expériences Professionnelles", place: "Nantes-Angers", desc: "Équipier polyvalent Domino’s Pizza – Agent de quai DPD – Livreur Deliveroo (actuel)" },
  { year: "2024", title: "Formation Web3 Blockchain et stage au sein de la BBS School", place: "Hybride", desc: "Formation de 3 mois dédiée à la découverte du Web3 et de la Blockchain, suivie d’un stage d’un mois chez Metafight." },
];

// --- COMPOSANTS DE FOND (ESPACE + PARTICULES) ---
const MovingParticles = () => {
  const particles = [...Array(40)].map((_, i) => ({
    top: Math.random() * 100 + "%",
    left: Math.random() * 100 + "%",
    size: Math.random() * 3 + "px",
    duration: Math.random() * 20 + 10,
    xMove: Math.random() * 60 - 30, 
    yMove: Math.random() * 60 - 30,
  }));
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p, i) => (
        <motion.div key={i} className="absolute bg-white rounded-full blur-[0.5px]" style={{ top: p.top, left: p.left, width: p.size, height: p.size }} animate={{ x: [0, p.xMove, 0], y: [0, p.yMove, 0], opacity: [0.1, 0.6, 0.1] }} transition={{ duration: p.duration, repeat: Infinity, ease: "easeInOut", delay: Math.random() * 10 }} />
      ))}
    </div>
  );
};

const SpaceBackground = () => (
  <div className="fixed inset-0 z-[-1] bg-slate-950 overflow-hidden">
    <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none"></div>
    <MovingParticles />
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-blue-900/5 rounded-full blur-[150px] pointer-events-none"></div>
  </div>
);

// --- NAVBAR STYLE IOS ---
const IOSDock = () => {
  const items = [
    { id: 'accueil', icon: <Home size={20} />, label: 'Accueil' },
    { id: 'parcours', icon: <GitCommit size={20} />, label: 'Parcours' }, // Changé pour Parcours
    { id: 'compétences', icon: <User size={20} />, label: 'Skills' },
    { id: 'projets', icon: <Folder size={20} />, label: 'Projets' },
    { id: 'contact', icon: <Send size={20} />, label: 'Contact' },
  ];
  const [hovered, setHovered] = useState(null);

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
      <motion.div initial={{ y: -100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5, type: "spring" }} className="flex items-center gap-3 px-4 py-3 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-full shadow-2xl shadow-black/50">
        {items.map((item) => (
          <a key={item.id} href={`#${item.id}`} onMouseEnter={() => setHovered(item.id)} onMouseLeave={() => setHovered(null)} className="relative group">
            <AnimatePresence>
              {hovered === item.id && (
                <motion.div initial={{ opacity: 0, y: 10, scale: 0.8 }} animate={{ opacity: 1, y: 45, scale: 1 }} exit={{ opacity: 0, y: 10, scale: 0.8 }} className="absolute left-1/2 -translate-x-1/2 px-3 py-1 bg-slate-800 text-white text-xs rounded-lg whitespace-nowrap border border-white/10 shadow-xl z-20">
                  {item.label}
                  <div className="absolute top-[-4px] left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-800 rotate-45 border-l border-t border-white/10"></div>
                </motion.div>
              )}
            </AnimatePresence>
            <motion.div whileHover={{ scale: 1.2, y: 5 }} whileTap={{ scale: 0.9 }} className="w-12 h-12 flex items-center justify-center rounded-2xl bg-slate-800/50 hover:bg-blue-600 border border-white/5 hover:border-blue-400 text-slate-300 hover:text-white transition-colors">{item.icon}</motion.div>
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-white/0 group-hover:bg-blue-400 rounded-full transition-colors"></div>
          </a>
        ))}
      </motion.div>
    </div>
  );
};

// --- COMPOSANTS DE SECTION ---

const Hero = () => (
  <section id="accueil" className="min-h-screen flex items-center justify-center pt-32 relative overflow-hidden">
    <div className="text-center px-4 max-w-5xl mx-auto z-10">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="inline-flex items-center gap-2 px-3 py-1 mb-6 text-xs font-semibold tracking-wider text-blue-300 uppercase bg-blue-500/10 rounded-full border border-blue-500/20 backdrop-blur-sm">
        <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span> Recherche Alternance
      </motion.div>
      <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="text-5xl md:text-8xl font-bold mb-6 text-white tracking-tight">
        Développeur <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Full Stack</span>
      </motion.h1>
      <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="text-slate-400 max-w-2xl mx-auto text-lg md:text-xl mb-10 leading-relaxed">
        Avec une grande envie d'apprendre et de monter en compétence, je m’investis pleinement dans chaque projet.
      </motion.p>
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }} className="flex flex-col sm:flex-row justify-center gap-4">
        <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} href="#projets" className="group bg-white text-slate-900 px-8 py-4 rounded-full font-bold transition-all flex items-center justify-center gap-2">
          Voir mes travaux <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform"/>
        </motion.a>
        {/* NOUVEAU : BOUTON CV */}
        <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} href="/cv.pdf" target="_blank" className="px-8 py-4 rounded-full font-bold text-white border border-slate-700 hover:bg-slate-800/80 backdrop-blur-sm transition-all flex items-center justify-center gap-2">
          <Download size={18} /> Télécharger mon CV
        </motion.a>
      </motion.div>
    </div>
  </section>
);

// NOUVEAU : TERMINAL
const TerminalBox = () => (
  <section className="py-20 px-4 max-w-4xl mx-auto">
    <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-[#0f172a]/90 backdrop-blur-md rounded-xl border border-slate-700 shadow-2xl overflow-hidden font-mono text-sm md:text-base">
      <div className="bg-slate-800/50 px-4 py-3 flex items-center gap-2 border-b border-slate-700">
        <div className="w-3 h-3 rounded-full bg-red-500"></div><div className="w-3 h-3 rounded-full bg-yellow-500"></div><div className="w-3 h-3 rounded-full bg-green-500"></div>
        <span className="ml-2 text-slate-400 text-xs">maxime@portfolio: ~</span>
      </div>
      <div className="p-6 space-y-6 text-slate-300">
        <div><div className="flex gap-2"><span className="text-blue-400">➜</span><span className="text-purple-400">~</span><span className="text-slate-200">whoami</span></div><p className="mt-2 text-slate-400 pl-4">Âgé de 21 ans, je suis actuellement en Bachelor Pro Développeur Full Stack à l’ESEO d’Angers. Passionné d’informatique depuis l’adolescence, j’ai d’abord exploré l’univers du montage de PC, puis celui des cryptomonnaies, avant de me diriger naturellement vers le développement.

                                                                                                                                                                                                                                Mon parcours n’a pas été linéaire : après un Bac Pro Vente puis un BTS SAM qui ne correspondaient pas à mes ambitions, j’ai choisi de me réorienter. J’ai suivi une formation et un stage au sein de la BBS School, puis travaillé comme équipier polyvalent chez Domino’s Pizza.

                                                                                                                                                                                                                                J’ai ensuite entrepris un voyage en solo d’un mois à Bali, une expérience marquante qui m’a permis de prendre du recul, de rencontrer de nouvelles personnes et de clarifier mes objectifs professionnels. À mon retour, j’ai trouvé ma voie : intégrer l’ESEO, une grande école d’ingénieurs reconnue, pour me former aux métiers du développement.

                                                                                                                                                                                                                                Pour financer mes études, j’ai travaillé chez DPD, et j’exerce aujourd’hui un job étudiant en tant que livreur Deliveroo, tout en poursuivant ma formation.

                                                                                                                                                                                                                                Ce parcours m’a appris la détermination, l’autonomie et la capacité à m’adapter. Aujourd’hui, je suis pleinement engagé dans mon objectif : devenir un développeur compétent, polyvalent et passionné.</p></div>
        <div><div className="flex gap-2"><span className="text-blue-400">➜</span><span className="text-purple-400">~</span><span className="text-slate-200">current_stack</span></div><div className="mt-2 pl-4 flex flex-wrap gap-2">{['React', 'Node.js', 'Tailwind', 'Git'].map(t=><span key={t} className="text-emerald-400">"{t}"</span>)}</div></div>
        <div className="flex gap-2 items-center"><span className="text-blue-400">➜</span><span className="text-purple-400">~</span><motion.div animate={{ opacity: [0, 1, 0] }} transition={{ duration: 0.8, repeat: Infinity }} className="w-2.5 h-5 bg-slate-400"/></div>
      </div>
    </motion.div>
  </section>
);

// NOUVEAU : TIMELINE
const Timeline = () => (
  <section id="parcours" className="py-20 px-4 max-w-4xl mx-auto">
    <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-3xl font-bold mb-12 text-center text-white">Mon Parcours</motion.h2>
    <div className="relative border-l-2 border-slate-800 ml-3 md:ml-6 space-y-12">
      {timelineData.map((item, index) => (
        <motion.div key={index} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.2 }} className="ml-8 relative">
          <span className="absolute -left-[41px] top-0 flex items-center justify-center w-6 h-6 bg-slate-900 border-2 border-blue-500 rounded-full"></span>
          <h3 className="text-xl font-bold text-white">{item.title}</h3>
          <div className="flex items-center gap-4 text-sm text-blue-400 mb-2 mt-1">
            <span className="flex items-center gap-1"><Calendar size={14}/> {item.year}</span>
            <span className="flex items-center gap-1"><MapPin size={14}/> {item.place}</span>
          </div>
          <p className="text-slate-400">{item.desc}</p>
        </motion.div>
      ))}
    </div>
  </section>
);

// NOUVEAU : GITHUB ACTIVITY
const GithubActivity = () => {
  return (
    <section className="py-20 border-y border-slate-800/50 bg-slate-900/30">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-2xl font-bold mb-8 text-white flex items-center justify-center gap-2">
          <Github /> Activité GitHub
        </h2>
        {/* Simulation de grille de contribution */}
        <div className="flex flex-wrap justify-center gap-1 opacity-80">
          {[...Array(60)].map((_, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.01 }}
              className={`w-3 h-3 md:w-4 md:h-4 rounded-sm ${Math.random() > 0.7 ? 'bg-emerald-500' : Math.random() > 0.4 ? 'bg-emerald-900' : 'bg-slate-800'}`}
            />
          ))}
        </div>
        <p className="mt-4 text-sm text-slate-500">Contributions sur les 2 derniers mois</p>
      </div>
    </section>
  );
};

// ... COMPOSANTS EXISTANTS (Parallax, Skills, Projects, Contact) ...
const ParallaxText = ({ children, baseVelocity = 100 }) => {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], { clamp: false });
  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);
  const directionFactor = useRef(1);
  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);
    if (velocityFactor.get() < 0) { directionFactor.current = -1; } else if (velocityFactor.get() > 0) { directionFactor.current = 1; }
    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });
  return (
    <div className="overflow-hidden m-0 whitespace-nowrap flex flex-nowrap">
      <motion.div className="font-bold uppercase text-6xl md:text-9xl text-transparent bg-clip-text bg-gradient-to-r from-slate-800 to-slate-700 flex flex-nowrap whitespace-nowrap" style={{ x }}>
        <span className="block mr-10">{children} </span><span className="block mr-10">{children} </span>
      </motion.div>
    </div>
  );
};

const Skills = () => (
  <section id="compétences" className="py-32 relative">
    <div className="max-w-6xl mx-auto px-6">
      <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl md:text-4xl font-bold mb-16 text-center text-white">Mon Arsenal <span className="text-blue-500">Technique</span></motion.h2>
      <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="grid md:grid-cols-3 gap-8">
        {skills.map((cat, idx) => (
          <motion.div key={idx} variants={itemVariants} className="bg-slate-900/50 p-8 rounded-2xl border border-slate-800 hover:border-blue-500/30 transition-colors backdrop-blur-sm">
            <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center text-blue-400 mb-6">{cat.icon}</div>
            <h3 className="text-xl font-bold mb-4 text-white">{cat.name}</h3>
            <div className="flex flex-wrap gap-2">{cat.items.map((s) => <span key={s} className="px-3 py-1 bg-slate-800/80 rounded-md text-sm text-slate-300 border border-slate-700">{s}</span>)}</div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

const Projects = () => (
  <section id="projets" className="py-32">
    <div className="max-w-6xl mx-auto px-6">
      <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl md:text-4xl font-bold mb-16 text-center text-white">Projets <span className="text-cyan-500">Sélectionnés</span></motion.h2>
      <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="grid md:grid-cols-3 gap-8">
        {projects.map((p, i) => (
          <motion.div key={i} variants={itemVariants} whileHover={{ y: -10 }} className="h-full relative bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-800 overflow-hidden group hover:border-blue-500/30 transition-colors hover:shadow-2xl hover:shadow-blue-500/10">
              <div className={`h-2 bg-gradient-to-r ${p.color}`} />
              <div className="p-8">
                <div className="mb-6 inline-flex p-3 rounded-xl bg-slate-800 text-white"><Code2 size={24} /></div>
                <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-blue-400 transition-colors">{p.title}</h3>
                <p className="text-slate-400 mb-6 leading-relaxed">{p.desc}</p>
                <div className="flex flex-wrap gap-2 mb-8">{p.tech.map((t) => <span key={t} className="text-xs font-mono text-blue-200 bg-blue-500/10 px-2 py-1 rounded">{t}</span>)}</div>
                <div className="flex items-center gap-4"><a href={p.github} className="text-sm font-medium text-slate-300 hover:text-white flex items-center gap-2"><Github size={16} /> Code</a>{p.demo && <a href={p.demo} className="text-sm font-medium text-blue-400 hover:text-blue-300 flex items-center gap-2"><ExternalLink size={16} /> Live Demo</a>}</div>
              </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

const Contact = () => (
  <section id="contact" className="py-32 relative">
    <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
      <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-4xl font-bold mb-8 text-white">Prêt à coder ?</motion.h2>
      <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-slate-400 mb-12 text-lg">Je suis actuellement à la recherche d'une alternance.</motion.p>
      <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex justify-center gap-6">
        {[ { icon: <Mail />, href: "mailto:tonemail@gmail.com" }, { icon: <Github />, href: "https://github.com" }, { icon: <Linkedin />, href: "https://linkedin.com" } ].map((social, i) => (
          <motion.a key={i} variants={itemVariants} whileHover={{ y: -5, scale: 1.1 }} href={social.href} className="p-4 bg-slate-800 rounded-full border border-slate-700 text-white hover:bg-blue-600 hover:border-blue-500 transition-all">{social.icon}</motion.a>
        ))}
      </motion.div>
      <footer className="mt-20 pt-8 border-t border-slate-800/50 text-slate-600 text-sm">© 2025 • Designé & Codé avec passion.</footer>
    </div>
  </section>
);

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  return <motion.div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 origin-left z-[100]" style={{ scaleX: useSpring(scrollYProgress, { stiffness: 100, damping: 30 }) }} />;
};

export default function App() {
  return (
    <div className="min-h-screen text-slate-200 font-sans selection:bg-blue-500/30 overflow-x-hidden relative">
      <SpaceBackground />
      <ScrollProgress />
      <IOSDock />
      <Hero />
      <TerminalBox />
      <section className="py-10 border-y border-slate-800/50 bg-slate-900/30 backdrop-blur-sm">
        <ParallaxText baseVelocity={-2}>REACT • NODE.JS • PHP • MYSQL • FULL STACK •</ParallaxText>
      </section>
      <Timeline />
      <GithubActivity />
      <Skills />
      <Projects />
      <Contact />
    </div>
  );
}