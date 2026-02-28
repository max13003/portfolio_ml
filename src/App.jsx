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
  useMotionTemplate,
  AnimatePresence
} from 'framer-motion';

// --- FONCTION UTILITAIRE ---
const wrap = (min, max, v) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

// --- COMPOSANT SPOTLIGHT CARD (Lumière uniquement, pas de mouvement) ---
function SpotlightCard({ children, className = "" }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    let { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      className={`relative border border-slate-800 bg-slate-900/50 overflow-hidden group ${className}`}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(14, 165, 233, 0.15),
              transparent 80%
            )
          `,
        }}
      />
      <div className="relative h-full">
        {children}
      </div>
    </div>
  );
}

// --- VARIANTES D'ANIMATION (CASCADE CLASSIQUE) ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 50, damping: 20 } // Animation douce et lente
  }
};

// --- DONNÉES ---
const projects = [
  {
    title: "Site Vitrine Restaurant",
    desc: "Site de démonstration conçu pour le démarchage de restaurants afin de leur proposer mes services. Vitrine complète et responsive pour présenter menus et ambiance.",
    tech: ["HTML/CSS/JS", "PHP", "Responsive"],
    github: null, demo: "https://ubud-restaurant.alwaysdata.net/index.php", 
    color: "from-blue-500 to-cyan-500" 
  },
  {
    title: "Master M&A",
    desc: "Site vitrine officiel pour l'association du Master 2 Fusions & acquisitions Paris Saclay. Responsive, design institutionnel, animations douces et SEO.",
    tech: ["HTML/CSS", "JS", "SEO", "RESPONSIVE"],
    github: "https://github.com/max13003/ProjetWebMaster", demo: "http://master-fusac.alwaysdata.net/", 
    color: "from-indigo-500 to-blue-600" 
  },
  {
    title: "Jeux",
    desc: "Application web de jeux (Motus, Mots mêlés). Logique algorithmique et gestion de base de données.",
    tech: ["PHP", "MySQL", "CSS", "HTML", "JS"],
    github: "https://github.com/LoanKma/projet-web-v2", demo: null, 
    color: "from-emerald-500 to-cyan-500" 
  }
];

const skills = [
  { name: "Frontend", icon: <Code2 size={32} />, items: ["HTML", "CSS", "JS", "React (Learning)", "Tailwind (Learning)", "Framer Motion (Learning)"] },
  { name: "Backend", icon: <Database size={32} />, items: ["JAVA", "PHP", "MySQL"] },
  { name: "Outils", icon: <Terminal size={32} />, items: ["Git", "Github", "VS Code","IntelliJ", "Figma", "Vercel", "Trello"] },
];

const timelineData = [
  { year: "2025 - Présent", title: "Bachelor Pro Développeur Full Stack", place: "ESEO, Angers", desc: "Algorithmique • Frontend/Backend • Bases de données • POO • Réseau • Cybersécurité • Web3 • Gestion de projet Agile." },
  { year: "2024 - Présent", title: "Expériences Professionnelles", place: "Nantes-Angers", desc: "Équipier polyvalent Domino's Pizza – Agent de quai DPD – Livreur Deliveroo (actuel)." },
  { year: "2024", title: "Formation Web3 & Stage", place: "BBS School / Metafight", desc: "Formation intensive de 3 mois sur la Blockchain, suivie d'un stage d'un mois chez Metafight." },
];

// --- FOND ---
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

// --- NAVBAR ---
const IOSDock = () => {
  const items = [
    { id: 'accueil', icon: <Home size={20} />, label: 'Accueil' },
    { id: 'parcours', icon: <GitCommit size={20} />, label: 'Parcours' },
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

// --- HERO (SIMPLE ET EFFICACE) ---
const Hero = () => {
  return (
    <section id="accueil" className="min-h-screen flex items-center justify-center pt-32 relative overflow-hidden">
      <div className="text-center px-4 max-w-5xl mx-auto z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="inline-flex items-center gap-2 px-3 py-1 mb-6 text-xs font-semibold tracking-wider text-blue-300 uppercase bg-blue-500/10 rounded-full border border-blue-500/20 backdrop-blur-sm">
          <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>A la recherche d'une alternance pour septembre 2026, 2 ans et plus si affinité ;)
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="text-5xl md:text-8xl font-bold mb-6 text-white tracking-tight">
          Développeur <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-[length:200%_auto] animate-gradient">Full Stack</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="text-slate-400 max-w-2xl mx-auto text-lg md:text-xl mb-10 leading-relaxed">
          2 semaines à l'école - 2 semaines en entreprise
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }} className="flex flex-col sm:flex-row justify-center gap-4">
          <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} href="#projets" className="group bg-white text-slate-900 px-8 py-4 rounded-full font-bold transition-all flex items-center justify-center gap-2">
            Voir mes travaux <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform"/>
          </motion.a>
          
          <motion.a 
            href="/CvMaximeLUNEAU.pdf" 
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              backgroundSize: "200% 100%",
              backgroundImage: "linear-gradient(110deg, rgba(30, 41, 59, 0.5) 45%, rgba(255, 255, 255, 0.3) 50%, rgba(30, 41, 59, 0.5) 55%)"
            }}
            animate={{ backgroundPosition: ["200% 0", "-200% 0"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="px-8 py-4 rounded-full font-bold text-white border border-slate-700 backdrop-blur-sm flex items-center justify-center gap-2 shadow-lg"
          >
            <Download size={18} /> 
            <span>Télécharger mon CV</span>
          </motion.a>

        </motion.div>
      </div>
    </section>
  );
};

const TerminalBox = () => {
  const [typedText, setTypedText] = useState('');
  const [showContent, setShowContent] = useState(false);
  const fullCommand = 'cat ~/story.txt';

  React.useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullCommand.length) {
        setTypedText(fullCommand.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        setTimeout(() => setShowContent(true), 300);
      }
    }, 80);

    return () => clearInterval(typingInterval);
  }, []);

  return (
    <section className="py-20 px-4 max-w-4xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 50 }} 
        whileInView={{ opacity: 1, y: 0 }} 
        viewport={{ once: true }} 
        className="bg-[#0f172a]/90 backdrop-blur-md rounded-xl border border-slate-700 shadow-2xl overflow-hidden font-mono text-sm md:text-base"
      >
        <div className="bg-slate-800/50 px-4 py-3 flex items-center gap-2 border-b border-slate-700">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <span className="ml-2 text-slate-400 text-xs">maxime@portfolio: ~</span>
        </div>
        
        <div className="p-6 space-y-6 text-slate-300">
          <div>
            <div className="flex gap-2 items-center">
              <span className="text-blue-400">➜</span>
              <span className="text-purple-400">~</span>
              <span className="text-slate-200">{typedText}</span>
              {!showContent && (
                <motion.div 
                  animate={{ opacity: [0, 1, 0] }} 
                  transition={{ duration: 0.8, repeat: Infinity }} 
                  className="w-2.5 h-5 bg-slate-400"
                />
              )}
            </div>
            
            <AnimatePresence>
              {showContent && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }} 
                  animate={{ opacity: 1, height: 'auto' }} 
                  transition={{ duration: 0.5 }}
                  className="mt-4 text-slate-400 space-y-4 leading-relaxed overflow-hidden"
                >
                  <motion.p 
                    initial={{ opacity: 0, x: -20 }} 
                    animate={{ opacity: 1, x: 0 }} 
                    transition={{ delay: 0.1 }}
                  >
                    <span className="text-emerald-400">21 ans</span> • <span className="text-blue-400">Bachelor Pro Developpeur Full Stack</span> @ <span className="text-purple-400">ESEO Angers</span>
                  </motion.p>
                  
                  <motion.p 
                    initial={{ opacity: 0, x: -20 }} 
                    animate={{ opacity: 1, x: 0 }} 
                    transition={{ delay: 0.3 }}
                  >
                    Passionné d'informatique depuis l'adolescence : <span className="text-cyan-400">montage PC</span> → <span className="text-yellow-400">blockchain</span> → <span className="text-emerald-400">développement</span>
                  </motion.p>
                  
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }} 
                    animate={{ opacity: 1, x: 0 }} 
                    transition={{ delay: 0.5 }}
                    className="pl-4 border-l-2 border-slate-700"
                  >
                    <p className="text-slate-500 italic">
                      "Parcours non linéaire : Bac Pro Vente → BTS SAM → Réorientation"
                    </p>
                  </motion.div>
                  
                  <motion.p 
                    initial={{ opacity: 0, x: -20 }} 
                    animate={{ opacity: 1, x: 0 }} 
                    transition={{ delay: 0.7 }}
                  >
                    <span className="text-orange-400">BBS School</span> (Web3 + Stage) → <span className="text-red-400">Domino's Pizza</span> → <span className="text-pink-400">✈️ Bali 1 mois</span> (solo trip)
                  </motion.p>
                  
                  <motion.p 
                    initial={{ opacity: 0, x: -20 }} 
                    animate={{ opacity: 1, x: 0 }} 
                    transition={{ delay: 0.9 }}
                  >
                    De retour en France : intégration <span className="text-indigo-400">ESEO</span> (école d'ingénieurs) • Jobs : <span className="text-slate-300">DPD</span> + <span className="text-green-400">Deliveroo</span> (actuel)
                  </motion.p>
                  
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }} 
                    animate={{ opacity: 1, scale: 1 }} 
                    transition={{ delay: 1.1 }}
                    className="pt-4 mt-4 border-t border-slate-800"
                  >
                    <p className="text-blue-300">
                      <span className="text-emerald-400 font-bold">$ mission</span> : Devenir un développeur{' '}
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                        compétent, polyvalent et passionné
                      </span>
                    </p>
                  </motion.div>
                  
                  <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    transition={{ delay: 1.3 }}
                    className="flex flex-wrap gap-2 pt-2"
                  >
                    <span className="px-2 py-1 bg-emerald-500/10 text-emerald-400 text-xs rounded border border-emerald-500/20">
                      Déterminé
                    </span>
                    <span className="px-2 py-1 bg-blue-500/10 text-blue-400 text-xs rounded border border-blue-500/20">
                      Autonome
                    </span>
                    <span className="px-2 py-1 bg-purple-500/10 text-purple-400 text-xs rounded border border-purple-500/20">
                      Adaptable
                    </span>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          {showContent && (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              transition={{ delay: 1.5 }}
              className="flex gap-2 items-center"
            >
              <span className="text-blue-400">➜</span>
              <span className="text-purple-400">~</span>
              <motion.div 
                animate={{ opacity: [0, 1, 0] }} 
                transition={{ duration: 0.8, repeat: Infinity }} 
                className="w-2.5 h-5 bg-slate-400"
              />
            </motion.div>
          )}
        </div>
      </motion.div>
    </section>
  );
};

const Timeline = () => (
  <section id="parcours" className="py-20 px-4 max-w-4xl mx-auto">
    <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-3xl font-bold mb-12 text-center text-white">Mon Parcours</motion.h2>
    <div className="relative border-l-2 border-slate-800 ml-3 md:ml-6 space-y-12">
      {timelineData.map((item, index) => (
        <motion.div key={index} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.2 }} className="ml-8 relative">
          <span className="absolute -left-[41px] top-0 flex items-center justify-center w-6 h-6 bg-slate-900 border-2 border-blue-500 rounded-full"></span>
          
          <SpotlightCard className="p-6 rounded-xl border border-slate-800 bg-slate-900/50">
            <h3 className="text-xl font-bold text-white">{item.title}</h3>
            <div className="flex items-center gap-4 text-sm text-blue-400 mb-2 mt-1">
              <span className="flex items-center gap-1"><Calendar size={14}/> {item.year}</span>
              <span className="flex items-center gap-1"><MapPin size={14}/> {item.place}</span>
            </div>
            <p className="text-slate-400">{item.desc}</p>
          </SpotlightCard>

        </motion.div>
      ))}
    </div>
  </section>
);

const GithubActivity = () => {
  const stats = [
    { label: "Repositories", value: "11", icon: <Folder size={20} /> },
    { label: "Contributions (2025)", value: "54", icon: <GitCommit size={20} /> },
    { label: "Projets Web", value: "3", icon: <Code2 size={20} /> },
    { label: "Followers", value: "2", icon: <User size={20} /> },
  ];

  return (
    <section className="py-24 border-y border-slate-800/50 bg-slate-900/30">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          
          <div className="text-left max-w-md">
            <h2 className="text-3xl font-bold text-white mb-4 flex items-center gap-3">
              <Github className="text-blue-500" /> Open Source
            </h2>
            <p className="text-slate-400 leading-relaxed mb-6">
              Je partage l'ensemble de mes projets d'études et personnels sur GitHub. 
              Mon code est public, transparent et reflète ma progression quotidienne.
            </p>
            <motion.a 
              href="https://github.com/max13003"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ x: 5 }}
              className="text-blue-400 font-bold flex items-center gap-2 group"
            >
              Explorer mon compte @max13003 
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </motion.a>
          </div>

          <div className="grid grid-cols-2 gap-4 w-full md:w-auto">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <SpotlightCard className="p-6 rounded-2xl min-w-[160px] text-center">
                  <div className="text-blue-500 mb-2 flex justify-center">{stat.icon}</div>
                  <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-xs uppercase tracking-wider text-slate-500 font-semibold">{stat.label}</div>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

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
          <motion.div key={idx} variants={itemVariants} className="h-full">
            <SpotlightCard className="p-8 rounded-2xl h-full group">
              <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center text-blue-400 mb-6 transition-transform duration-300 group-hover:scale-110">{cat.icon}</div>
              <h3 className="text-xl font-bold mb-4 text-white">{cat.name}</h3>
              <div className="flex flex-wrap gap-2">{cat.items.map((s) => <span key={s} className="px-3 py-1 bg-slate-800/80 rounded-md text-sm text-slate-300 border border-slate-700">{s}</span>)}</div>
            </SpotlightCard>
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
          <motion.div key={i} variants={itemVariants} whileHover={{ y: -10 }} className="h-full">
             <SpotlightCard className="h-full rounded-2xl">
                <div className={`h-2 bg-gradient-to-r ${p.color}`} />
                <div className="p-8">
                  <div className="mb-6 inline-flex p-3 rounded-xl bg-slate-800 text-white"><Code2 size={24} /></div>
                  <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-blue-400 transition-colors">{p.title}</h3>
                  <p className="text-slate-400 mb-6 leading-relaxed">{p.desc}</p>
                  <div className="flex flex-wrap gap-2 mb-8">{p.tech.map((t) => <span key={t} className="text-xs font-mono text-blue-200 bg-blue-500/10 px-2 py-1 rounded">{t}</span>)}</div>
                  <div className="flex items-center gap-4">
                    <a href={p.github} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-slate-300 hover:text-white flex items-center gap-2">
                      <Github size={16} /> Code
                    </a>
                    {p.demo && (
                      <a href={p.demo} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-blue-400 hover:text-blue-300 flex items-center gap-2">
                        <ExternalLink size={16} /> Live Demo
                      </a>
                    )}
                  </div>
                </div>
             </SpotlightCard>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

const Contact = () => (
  <section id="contact" className="py-32 relative">
    <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
      <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-4xl font-bold mb-8 text-white">SKY IS THE LIMIT</motion.h2>
      <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-slate-400 mb-12 text-lg">Pret à passer un entretien demain !</motion.p>
      
      <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex justify-center gap-6 mt-12">
        {[ 
          { icon: <Mail />, href: "mailto:maximeluneau3@gmail.com" }, 
          { icon: <Github />, href: "https://github.com", target: "_blank" }, 
          { icon: <Linkedin />, href: "https://linkedin.com", target: "_blank" } 
        ].map((social, i) => (
          <motion.a 
            key={i} 
            variants={itemVariants} 
            whileHover={{ y: -5, scale: 1.1 }} 
            href={social.href} 
            target={social.target} 
            rel={social.target ? "noopener noreferrer" : undefined} 
            className="p-4 bg-slate-800 rounded-full border border-slate-700 text-white hover:bg-blue-600 hover:border-blue-500 transition-all"
          >
            {social.icon}
          </motion.a>
        ))}
      </motion.div>
      <footer className="mt-20 pt-8 border-t border-slate-800/50 text-slate-600 text-sm">© 2025 • Designé & Codé par Maxime LUNEAU.</footer>
    </div>
  </section>
);

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <div className="hidden xl:block fixed z-[100] right-8 top-1/2 -translate-y-1/2 h-96 w-3 rounded-full bg-slate-800/40 backdrop-blur-xl border border-white/10 shadow-lg overflow-hidden p-[2px]">
      <motion.div
        className="w-full h-full bg-gradient-to-b from-blue-500 to-cyan-500 rounded-full origin-top"
        style={{ scaleY }}
      />
    </div>
  );
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
        <ParallaxText baseVelocity={-1}>HTML • JS • PHP • MYSQL • FULL STACK • JAVA • CSS •</ParallaxText>
      </section>
      <Timeline />
      <GithubActivity />
      <Skills />
      <Projects />
      <Contact />
    </div>
  );
}