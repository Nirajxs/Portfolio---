import profileImg from './assets/profile.jpg';
import resumePDF from './assets/cv.pdf';
import hospitalImg from './assets/hospital-project.jpg';
import googleCert from './assets/google.jpg'; 
import votingImg from './assets/voting-project.jpg';
import budgetQuestCert from "./assets/budgetQuestCert.png";
import ecommerceImg from './assets/ecommerce-project.jpg';
import pythonCert from './assets/python-cert.jpg';
import yuvaAICert from "./assets/yuvaAIcert.jpg";
import designImg from "./assets/Design.jpg";
import enrolledImg from "./assets/enrolled.jpg";
import pythonImg from "./assets/python.jpg";
import mernImg from "./assets/mern.jpg";
import webLor from "./assets/web-lor.pdf";
import webAppreciation from "./assets/web-appreciation.pdf";
import webCert from './assets/web-cert.jpg';
import React, { useState, useEffect, useRef } from 'react';
import { 
  Home, 
  User, 
  Code2, 
  GraduationCap, 
  Briefcase, 
  FolderRoot, 
  Award, 
  Mail, 
  Github, 
  Linkedin, 
  Twitter, 
  ExternalLink, 
  ChevronRight, 
  Moon, 
  Sun, 
  X, 
  Send,
  Phone,
  MessageSquare,
  Globe,
  Database,
  Layout,
  Server,
  Wrench,
  Keyboard,
  Download,
  Menu,
  ArrowUp,
  Instagram,
  Calendar,
  MapPin,
  Percent,
  School,
  Library,
  Puzzle,
  Brain,
  Users,
  ChevronDown,
  ChevronUp,
  Copy,
  CheckCircle2,
  Terminal
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Types ---
interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tech: string[];
  link: string;
}

interface Skill {
  name: string;
  percentage?: number;
}

interface SkillCategory {
  title: string;
  icon: React.ReactNode;
  skills: Skill[];
  displayType?: 'bar' | 'tag';
  color?: string;
}

interface Education {
  degree: string;
  institute: string;
  duration: string;
  location: string;
  score: string;
  details: string;
  courses: string[];
  status: string;
  isCurrent?: boolean;
  color: string;
}

interface Experience {
  role: string;
  company: string;
  duration: string;
  description: string;
  image: string;
  tags?: string[];
}

interface Certification {
  title: string;
  issuer: string;
  image: string;
  date: string;
  description: string;
  pdfs?: string[] 
}

// --- Components ---

const SectionTitle = ({ children, icon }: { children: React.ReactNode; icon?: React.ReactNode }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="flex items-center gap-3 mb-12"
  >
    <div className="p-3 rounded-2xl bg-primary/10 text-primary shadow-[0_0_15px_rgba(99,102,241,0.2)]">
      {icon}
    </div>
    <h2 className="text-3xl md:text-4xl font-bold font-display tracking-tight">{children}</h2>
  </motion.div>
);

const SkillBar = ({ name, percentage, color }: { name: string; percentage: number; color?: string; key?: React.Key }) => (
  <div className="mb-6">
    <div className="flex justify-between mb-2">
      <span className="font-medium text-sm">{name}</span>
      <span className="font-bold text-xs" style={{ color: color || 'var(--color-primary)' }}>{percentage}%</span>
    </div>
    <div className="h-2.5 w-full bg-secondary/10 rounded-full overflow-hidden border border-border/20">
      <motion.div 
        initial={{ width: 0 }}
        whileInView={{ width: `${percentage}%` }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: "circOut" }}
        className="h-full rounded-full relative"
        style={{ 
          backgroundColor: color || 'var(--color-primary)',
          boxShadow: `0 0 20px ${(color || 'var(--color-primary)')}44`
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
      </motion.div>
    </div>
  </div>
);

const Card = ({ children, className = "", hoverColor = "rgba(129, 140, 248, 0.4)" }: { children: React.ReactNode; className?: string; hoverColor?: string; key?: React.Key }) => (
  <motion.div 
    whileHover={{ 
      y: -8,
      boxShadow: `0 0 40px ${hoverColor}`,
      borderColor: hoverColor.replace('0.4', '0.6'),
      backgroundColor: hoverColor.replace('0.4', '0.05')
    }}
    className={`bg-card border border-border/50 rounded-3xl p-6 shadow-sm transition-all duration-500 ${className}`}
  >
    {children}
  </motion.div>
);

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);
  const [activeSection, setActiveSection] = useState('home');
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [showSoftSkills, setShowSoftSkills] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const navItems = [
    { id: 'home', label: 'Home', icon: <Home size={20} /> },
    { id: 'overview', label: 'Overview', icon: <User size={20} /> },
    { id: 'skills', label: 'Skills', icon: <Code2 size={20} /> },
    { id: 'education', label: 'Education', icon: <GraduationCap size={20} /> },
    { id: 'projects', label: 'Projects', icon: <FolderRoot size={20} /> },
    { id: 'experience', label: 'Experience', icon: <Briefcase size={20} /> },
    { id: 'certification', label: 'Certification', icon: <Award size={20} /> },
    { id: 'contact', label: 'Contact', icon: <Mail size={20} /> },
  ];

  const skillCategories: SkillCategory[] = [
    {
      title: "Frontend Development",
      icon: <Layout size={24} />,
      displayType: 'bar',
      color: '#6366f1',
      skills: [
        { name: "React JS", percentage: 90 },
        { name: "HTML", percentage: 95 },
        { name: "CSS", percentage: 90 },
        { name: "Bootstrap", percentage: 85 },
        { name: "Tailwind CSS", percentage: 88 },
        { name: "JavaScript", percentage: 92 },
      ]
    },
    {
      title: "Programming Language ",
      icon: <Layout size={2} />,
      displayType: 'bar',
      color: '#6366f1',
      skills: [
        { name: "C++", percentage: 90 },
        { name: "Java", percentage: 70 },
        { name: "Python ", percentage: 90 },
        { name: "JavaScript", percentage: 85 },
       
      ]
    },
    {
      title: "Backend Development",
      icon: <Server size={24} />,
      displayType: 'bar',
      color: '#818cf8',
      skills: [
        { name: "Node JS", percentage: 85 },
        { name: "Express JS", percentage: 82 },
        { name: "Django", percentage: 75 },
        { name: "REST API", percentage: 88 },
        { name: "Python", percentage: 80 },
      ]
    },
    {
      title: "Databases",
      icon: <Database size={24} />,
      displayType: 'bar',
      color: '#a855f7',
      skills: [
        { name: "MongoDB", percentage: 85 },
        { name: "SQLite", percentage: 80 },
        { name: "MySQL", percentage: 78 },
      ]
    },
    {
      title: "Tools",
      icon: <Wrench size={24} />,
      displayType: 'bar',
      color: '#8b5cf6',
      skills: [
        { name: "Git & GitHub", percentage: 90 },
        { name: "VS Code", percentage: 95 },
        { name: "Postman", percentage: 50 },
       
      ]
    },
    {
      title: "Productivity Skills",
      icon: <Wrench size={24} />,
      displayType: 'bar',
      color: '#8b5cf6',
      skills: [
        { name: "MS Word", percentage: 95 },
        { name: "MS Excel", percentage: 85 },
        { name: "MS PowerPoint", percentage: 90 },
        { name: "Tally", percentage: 88 },
        { name: "Presentation Design", percentage: 85 },
      ]
    },
    {
      title: "Languages & Typing",
      icon: <Keyboard size={24} />,
      displayType: 'bar',
      color: '#c084fc',
      skills: [
        { name: "English (Professional)", percentage: 85 },
        { name: "Hindi (Native)", percentage: 60 },
        { name: "English Typing", percentage: 90 },
        { name: "Hindi Typing", percentage: 70},
      ]
    }
  ];

  const softSkills = [
    {
      title: "Problem Solving",
      description: "Strong analytical mindset with ability to break down complex problems into structured, efficient solutions.",
      icon: <Puzzle size={24} />,
      color: "#3b82f6"
    },
    {
      title: "Analytical Thinking",
      description: "Ability to analyze requirements, design logical systems, and optimize workflows.",
      icon: <Brain size={24} />,
      color: "#a855f7"
    },
    {
      title: "Team Collaboration",
      description: "Comfortable working in team environments, contributing ideas, and coordinating effectively.",
      icon: <Users size={24} />,
      color: "#818cf8"
    },
    {
      title: "Communication",
      description: "Clear technical and non-technical communication, documentation, and presentation skills.",
      icon: <MessageSquare size={24} />,
      color: "#a855f7"
    }
  ];

  const educationList: Education[] = [
    { 
      degree: "Bachelor of Computer Applications (BCA)", 
      institute: "RKDF University, Ranchi", 
      duration: "2023 - Present", 
      location: "Ranchi, Jharkhand",
      score: "Currently Pursuing",
      details: "Focusing on Computer Science fundamentals, Data Structures & Algorithms, Full Stack Development, and Artificial Intelligence. Building real-world projects alongside academic curriculum.",
      courses: ["Data Structures", "DBMS", "Web Development", "AI Fundamentals", "Software Engineering"],
      status: "Currently Enrolled",
      isCurrent: true,
      color: "#6366f1"
    },
    { 
      degree: "Intermidiate  (12th)", 
      institute: "Maharana Pratap Inter College, Daltonganj", 
      duration: "2021-2023", 
      location: "Daltonganj,Palamu, Jharkhand",
      score: "72.4%",
      details: "“Completed higher secondary education in Mathematics and Biology from the State Board, which helped develop strong analytical thinking and problem-solving skills useful in web development.”",
      courses: ["Mathematics", "Physics", "Chemistry","Biology"],
      status: "Completed",
      color: "#a855f7"
    },
    { 
      degree: "Secondary School (10th)", 
      institute: "R.N Tagore Public High School", 
      duration: "2020", 
      location: "Daltonganj,Palamu, Jharkhand",
      score: "87%",
      details: "Successfully completed secondary education with a solid academic foundation, strengthening logical thinking and analytical abilities.",
      courses: ["Science", "Mathematics", "Social Studies","Hindi","English"],
      status: "Completed",
      color: "#818cf8"
    },
     { 
      degree: "Web Development Course (Diploma)", 
      institute: "STP Computer Education", 
      duration: "May 2024- May 2025", 
      location: "Patel Nagar,New Delhi, 110008",
      score: "80%",
      details: " Completed a 12-month Web Development Diploma from STP Computer Education, New Delhi. Learned core web technologies including HTML, CSS, JavaScript, and basic backend development, with a focus on building responsive and user-friendly websites. Successfully completed the program with an A Grade. ",
      courses: ["HTML", "CSS", "JavaScript"],
      status: "Completed",
      color: "#818cf8"
    }
  ];

  const projects: Project[] = [
   {
      id: 1,
      title: "Hospital Management System",
      description: "A comprehensive platform for managing patient records, appointments, and billing with real-time dashboard for doctors.",
      image: hospitalImg,
      tech: ["Python", "Django", "Sqlite", "HTML","Bootstrap"],
      link: "https://hospital-management-system-fc8g.onrender.com/"
    },
    {
      id: 2,
      title: "Voting & Polls Realtime",
      description: "Real-time voting application using WebSockets for instant updates and secure authentication for fraud prevention.",
      image: votingImg,
      tech: ["React.js", "Socket.io", "MongoDB", "JWT Authentication "],
      link: "#"
    },
    {
      id: 3,
      title: "E-Commerce Platform",
      description: "Full-featured online store with cart functionality, payment gateway integration, and admin product management.",
      image: ecommerceImg,
      tech: ["React", "Redux", "Express", "Stripe"],
      link: "#"
    }
  ];

  const experiences: Experience[] = [
    {
      role: "Python Full Stack Developer (Intern)",
      company: "Shashi Infotech",
      duration: "45 Days",
      description: "Developed a Hospital Management System using Django, HTML, and CSS. Implemented authentication, appointment scheduling, patient records, and billing management with role-based access control. Designed a responsive UI and managed backend operations using Django ORM following the MVT architecture.",
      image: pythonImg,
      tags: ["#python", "#django", "#html", "#css", "#mvt"]
    },
    {
      role: "Web Development & Designing (Intern)",
      company: "OASIS INFOBYTE",
      duration: "30 Days",
      description: "Successfully completed a 30-day remote internship in Web Development and Designing. During this internship, I worked on creating responsive web interfaces, implementing backend functionalities, and optimizing user experience. I gained practical exposure to modern web technologies, project structuring, debugging, and deployment practices while collaborating in a remote working environment.",
      image: designImg,
      tags: ["#webdesign", "#frontend", "#javascript", "#responsive"]
    },
    {
      role: "MERN STACK DEVELOPER",
      company: "MERN STACK",
      duration: "Jan 2026 - PRESENT",
      description: "MERN Stack Developer with hands-on experience in building full-stack web applications using MongoDB, Express.js, React.js, and Node.js. Skilled in developing responsive user interfaces, RESTful APIs, authentication systems, and scalable backend solutions.",
      image: mernImg,
      tags: ["#mongodb", "#express", "#react", "#nodejs", "#mern"]
    }
  ];

 const certifications: Certification[] = [
  {
    title: "Python Full Stack Developer",
    issuer: "Shashi Infotech (Onsite)",
    image: pythonCert, // Yahan variable use karein
    date: "01 Aug 2025 - 15 Sep 2025 • 45 Days",
    description: "Completed a Full Stack Web Development internship in Python at Shashi Infotech, where I gained hands-on experience in developing web applications and understanding real-world development workflows. During this training, I worked on improving my knowledge of frontend and backend technologies, strengthening my coding skills, and learning how to build efficient and scalable web solutions."
  },
  {
  title: "Web Development And Designing",
  issuer: "OASIS INFOBYTE (Remote)",
  image: webCert,
  pdfs: [webLor, webAppreciation],
  date: "05 Jan 2026 - 15 Feb 2026 • 30 Days",
  description: "Completed a one-month internship in Web Development and Designing under the AICTE OIB-SIP program at Oasis Infobyte. Throughout the internship, I worked on developing responsive web interfaces and improving my skills in modern web technologies. This experience enhanced my practical understanding of web development and strengthened my ability to build user-friendly web applications."
},
    { 
      title: "MERN STACK", 
      issuer: "SB WEBCARE (Onsite)", 
      image: enrolledImg, 
      date: "Appearing • 45 Days",
      description: "Currently learning MongoDB, Express, React, Node.js with real-time full stack project development."
    },
   { 
  title: "Startup School: Prompt to Prototype", 
  issuer: "Google for Startups", 
  image: googleCert, 
  date: "12 Dec 2025",
  description: "Certified by Google for Startups in the 'Prompt to Prototype' track. Learned to accelerate product development using AI-powered workflows, focusing on transforming conceptual prompts into tangible digital prototypes."
},
 { 
  title: "MY Bharat Budget Quest 2026", 
  issuer: "Ministry of Youth Affairs & Sports", 
  image: budgetQuestCert, 
  date: "17 Feb 2026",
  description: "Awarded for successful participation in the national-level 'Online Quiz on MY Bharat Budget Quest 2026' conducted by MYBharat. This certification reflects knowledge of national fiscal policies and a commitment to contributing towards a 'Viksit Bharat'."
},
   { 
  title: "Yuva AI for All", 
  issuer: "NASSCOM FutureSkills Prime & INDIAai", 
  image: yuvaAICert, 
  date: "12 Dec 2025",
  description: "Certificate of Participation awarded for successfully completing the 'Yuva AI for All' course under the INDIAai initiative in collaboration with NASSCOM FutureSkills Prime. The program focused on building foundational knowledge of Artificial Intelligence and emerging technologies."
},
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
      setIsMobileMenuOpen(false);
    }
  };

  const handleDownloadCV = () => {
    // In a real app, this would be a link to a PDF
    alert("Downloading CV... (This is a demo action)");
  };

  return (
    <div className="min-h-screen font-sans selection:bg-primary/30">
      {/* --- Navbar --- */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-5xl">
        <div className="glass rounded-full px-6 py-3 flex items-center justify-between shadow-2xl border border-primary/20">
          <div 
            className="flex items-center gap-2 cursor-pointer group"
            onClick={() => scrollToSection('home')}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white font-bold text-xl group-hover:rotate-12 transition-transform shadow-lg shadow-primary/20">N</div>
            <span className="font-display font-bold text-xl hidden sm:block tracking-tight"><span className="text-primary"></span></span>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${activeSection === item.id ? 'text-primary bg-primary/10 font-bold' : 'text-secondary hover:text-primary hover:bg-primary/5'}`}
              >
                {item.icon}
                <span className="text-sm">{item.label}</span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2.5 rounded-full bg-secondary/10 text-secondary hover:bg-primary/10 hover:text-primary transition-all"
            >
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button 
              onClick={() => setIsContactOpen(true)}
              className="hidden md:block bg-gradient-to-r from-primary to-accent text-white px-6 py-2.5 rounded-full text-sm font-bold hover:shadow-lg hover:shadow-primary/30 transition-all active:scale-95"
            >
            Hire me
            </button>
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-full bg-secondary/10 text-secondary hover:bg-primary/10 hover:text-primary transition-all"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="lg:hidden absolute top-20 left-0 right-0 glass rounded-3xl p-4 shadow-2xl z-40 border border-primary/20"
            >
              <div className="grid grid-cols-2 gap-2">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`flex flex-col items-center justify-center gap-2 p-4 rounded-2xl transition-all ${activeSection === item.id ? 'text-primary bg-primary/10 font-bold border border-primary/20' : 'text-secondary hover:bg-primary/5'}`}
                  >
                    <div className={activeSection === item.id ? 'text-primary' : 'text-secondary'}>{item.icon}</div>
                    <span className="text-xs font-medium">{item.label}</span>
                  </button>
                ))}
                <button 
                  onClick={() => { setIsContactOpen(true); setIsMobileMenuOpen(false); }}
                  className="col-span-2 mt-2 bg-gradient-to-r from-primary to-accent text-white py-4 rounded-2xl font-bold text-sm shadow-lg flex items-center justify-center gap-2"
                >
                  <Mail size={18} /> Contact Me
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main className="max-w-7xl mx-auto px-6 pt-32 pb-20 relative overflow-hidden">
        {/* --- Background Animation Elements --- */}
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[120px] animate-pulse delay-700" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px]" />
          
          {/* Floating Code Snippets */}
          {[
            { icon: <Code2 size={24} />, top: '15%', left: '10%', delay: 0 },
            { icon: <Database size={20} />, top: '20%', right: '15%', delay: 1 },
            { icon: <Layout size={22} />, bottom: '30%', left: '15%', delay: 2 },
            { icon: <Server size={24} />, bottom: '20%', right: '10%', delay: 1.5 },
            { icon: <Globe size={18} />, top: '40%', right: '5%', delay: 0.5 },
            { icon: <Terminal size={20} />, bottom: '45%', left: '5%', delay: 2.5 },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: [0.1, 0.4, 0.1],
                y: [0, -30, 0],
                x: [0, 15, 0],
                rotate: [0, 10, -10, 0]
              }}
              transition={{ 
                duration: 5 + Math.random() * 3, 
                repeat: Infinity, 
                delay: item.delay 
              }}
              className="absolute text-primary/40 hidden md:block"
              style={{ top: item.top, left: item.left, right: item.right, bottom: item.bottom }}
            >
              {item.icon}
            </motion.div>
          ))}
          
          {/* Grid Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        </div>
        
        {/* --- Home Section --- */}
        <section id="home" className="min-h-[85vh] flex flex-col lg:flex-row items-center justify-between gap-16 mb-32 relative">
          {/* Left Side: Image, Buttons, Socials */}
          <div className="flex-1 flex flex-col items-center lg:items-start gap-10">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ type: "spring", stiffness: 100, damping: 15 }}
              className="relative lg:ml-12"
            >
              {/* Animated Rings behind image */}
              <div className="absolute inset-0 -m-8 border-2 border-dashed border-primary/20 rounded-full animate-[spin_20s_linear_infinite]" />
              <div className="absolute inset-0 -m-12 border border-accent/10 rounded-full animate-[spin_30s_linear_infinite_reverse]" />
              
              <motion.div 
                whileHover={{ 
                  scale: 1.05,
                  rotate: [0, -2, 2, 0],
                  transition: { duration: 0.5 }
                }}
                className="relative w-64 h-64 md:w-80 md:h-80 group cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-primary to-accent rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl" />
                <div className="absolute inset-0 bg-card rounded-full p-1 bg-gradient-to-tr from-primary to-accent shadow-[0_0_50px_rgba(99,102,241,0.3)] overflow-hidden">
                 <div className="w-full h-full rounded-full overflow-hidden border-4 border-card">
  <img 
    src={profileImg} 
    alt="Profile" 
    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
  />
</div>
                </div>
                
                {/* Floating badges */}
                <motion.div 
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute -top-4 -right-4 p-3 bg-card rounded-2xl shadow-xl border border-border z-20"
                >
                  <Code2 className="text-primary" size={24} />
                </motion.div>
                <motion.div 
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute -bottom-4 -left-4 p-3 bg-card rounded-2xl shadow-xl border border-border z-20"
                >
                  <Terminal className="text-accent" size={24} />
                </motion.div>
              </motion.div>
            </motion.div>

            <div className="flex flex-col gap-6 w-full max-w-md">
              <div className="flex flex-row items-center justify-center lg:justify-start gap-4">
                <motion.button 
  whileHover={{ scale: 1.05, y: -2 }}
  whileTap={{ scale: 0.95 }}
  onClick={() => {
    const link = document.createElement('a');
    link.href = resumePDF;
    link.download = 'Niraj_Kumar_CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }}
  className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-primary/80 text-white px-6 py-4 rounded-2xl font-bold text-sm shadow-[0_10px_20px_rgba(99,102,241,0.2)] hover:shadow-[0_15px_30px_rgba(99,102,241,0.4)] transition-all group"
>
  <Download size={18} className="group-hover:translate-y-1 transition-transform" /> 
  Download CV
</motion.button>
                
                <motion.button 
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsContactOpen(true)}
                  className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-accent to-accent/80 text-white px-6 py-4 rounded-2xl font-bold text-sm shadow-[0_10px_20px_rgba(168,85,247,0.2)] hover:shadow-[0_15px_30px_rgba(168,85,247,0.4)] transition-all"
                >
                  <Mail size={18} />
                  Hire Me
                </motion.button>
              </div>

              <div className="flex justify-center lg:justify-start gap-4">
                {[
                  { icon: <Github size={20} />, href: "https://github.com/Nirajxs" },
                  { icon: <Linkedin size={20} />, href: "https://www.linkedin.com/in/niraj-kumar-37177530a" },
                  { icon: <Twitter size={20} />, href: "https://x.com/" },
                  { icon: <Instagram size={20} />, href: "https://www.instagram.com/nirajgx/" },
                ].map((social, i) => (
                  <motion.a 
                    key={i}
                    whileHover={{ y: -5, scale: 1.1, color: 'var(--color-primary)', backgroundColor: 'rgba(99, 102, 241, 0.1)' }}
                    href={social.href} 
                    className="p-3 rounded-xl bg-secondary/5 border border-border transition-all text-secondary"
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side: Content Cards & Active Button */}
          <div className="flex-1 flex flex-col gap-8">
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-4"
            >
              <h1 className="text-5xl md:text-7xl font-bold font-display tracking-tight text-center lg:text-left">
                Hi, I'm <span className="text-gradient">Niraj Kumar</span>
              </h1>
              <p className="text-xl text-secondary font-medium text-center lg:text-left">
                Full Stack  Developer
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  title: "MERN Stack",
                  text: "Passionate Full Stack MERN Developer crafting exceptional web experiences.",
                  icon: <Database size={18} className="text-primary" />
                },
                {
                  title: "Clean Code",
                  text: "Writing clean, maintainable code with innovative solutions for complex problems.",
                  icon: <Code2 size={18} className="text-accent" />
                },
                {
                  title: "Innovation",
                  text: "Turning ideas into reality, one line of code at a time with modern architectures.",
                  icon: <Terminal size={18} className="text-primary" />
                },
                {
                  title: "Performance",
                  text: "Building high-performance applications that deliver seamless user experiences.",
                  icon: <Globe size={18} className="text-accent" />
                }
              ].map((card, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + (i * 0.1) }}
                  whileHover={{ y: -5, borderColor: 'var(--color-primary)' }}
                  className="p-5 rounded-2xl bg-card border border-border shadow-sm hover:shadow-md transition-all"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-lg bg-primary/5">
                      {card.icon}
                    </div>
                    <h3 className="font-bold text-sm">{card.title}</h3>
                  </div>
                  <p className="text-xs text-secondary leading-relaxed">
                    {card.text}
                  </p>
                </motion.div>
              ))}
            </div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex justify-center lg:justify-start"
            >
              <motion.button
                animate={{ 
                  boxShadow: ["0 0 0px rgba(168, 85, 247, 0)", "0 0 20px rgba(168, 85, 247, 0.4)", "0 0 0px rgba(168, 85, 247, 0)"],
                  scale: [1, 1.02, 1]
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="flex items-center gap-2 bg-accent/10 text-accent border border-accent/20 px-6 py-3 rounded-full font-bold text-sm"
              >
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-accent"></span>
                </span>
                Available for Hire
              </motion.button>
            </motion.div>
          </div>
        </section>

        {/* --- Overview Section --- */}
        <section id="overview" className="mb-32 scroll-mt-32">
          <SectionTitle icon={<User size={24} />}>Overview</SectionTitle>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card className="lg:col-span-1 flex flex-col items-center text-center">
              <div className="w-32 h-32 rounded-full overflow-hidden p-1 bg-gradient-to-br from-primary to-accent mb-6 shadow-xl">
               <div className="w-full h-full rounded-full overflow-hidden border-4 border-card">
              <img 
                   src={profileImg} 
                   alt="Profile" 
                   className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"/>
              </div>
              </div>
              <h3 className="text-2xl font-bold mb-1">Niraj Kumar</h3>
              <p className="text-primary font-semibold mb-4">Full Stack Developer</p>
              
              <div className="flex flex-col gap-3 w-full mb-6">
                <button 
                  onClick={() => setIsContactOpen(true)}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-primary to-accent text-white font-bold hover:shadow-lg hover:shadow-primary/30 transition-all active:scale-95"
                >
                  Hire Me
                </button>
               <a 
  href={resumePDF} 
  download="Niraj_Kumar_CV.pdf"
  className="w-full py-3 rounded-xl bg-secondary/10 text-foreground font-bold hover:bg-secondary/20 transition-all active:scale-95 flex items-center justify-center gap-2"
>
  <Download size={18} /> Download CV
</a>
              </div>

              <div className="flex gap-4 mb-2">
                <a href="https://github.com/Nirajxs" className="p-2.5 rounded-full bg-secondary/5 hover:bg-primary/10 hover:text-primary transition-all border border-border/50"><Github size={20} /></a>
                <a href="https://www.linkedin.com/in/niraj-kumar-37177530a" className="p-2.5 rounded-full bg-secondary/5 hover:bg-primary/10 hover:text-primary transition-all border border-border/50"><Linkedin size={20} /></a>
                <a href="https://x.com/" className="p-2.5 rounded-full bg-secondary/5 hover:bg-primary/10 hover:text-primary transition-all border border-border/50"><Twitter size={20} /></a>
                <a href="https://www.instagram.com/nirajgx/" className="p-2.5 rounded-full bg-secondary/5 hover:bg-primary/10 hover:text-primary transition-all border border-border/50"><Instagram size={20} /></a>
              </div>
            </Card>
            
            <Card className="lg:col-span-2">
              <h3 className="text-2xl font-bold mb-4">About Me</h3>
              <div className="mb-8 text-secondary leading-relaxed">
                <p className="mb-4">
                  I am a motivated and enthusiastic BCA final-year student from Ranchi, Jharkhand with a strong interest in web development and modern software technologies. As a fresher, I have completed three internships in Python Full Stack Development, MERN Stack Development, and Web Development & Design, where I gained hands-on experience in developing responsive and user-friendly web applications. Through these experiences, I have worked with technologies such as HTML, CSS, JavaScript, React, Node.js, and Python, which helped me build a solid understanding of both frontend and backend development.
                </p>
                <p>
                  I have also developed several academic and personal projects, including a Hospital Management System, where I applied my programming and problem-solving skills to create practical solutions. I am passionate about continuously learning new technologies, improving my development skills, and building efficient, scalable applications. I am currently looking for an opportunity where I can contribute my skills, gain industry experience, and grow as a software developer. More details about my projects and work can be found in the Projects section of this portfolio.
                </p>
              </div>
              
              <h4 className="text-xl font-bold mb-4">Project Highlights</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-secondary/5 border border-border">
                  <h5 className="font-bold text-primary mb-2">Hospital Management</h5>
                  <ul className="text-[10px] text-secondary space-y-1 list-disc pl-3">
                    <li>Real-time appointment scheduling and doctor availability tracking.</li>
                    <li>Secure patient record management with role-based access control.</li>
                    <li>Integrated billing system with automated invoice generation.</li>
                    <li>Comprehensive dashboard for hospital administrators and staff.</li>
                    <li>Mobile-responsive interface for easy access on various devices.</li>
                  </ul>
                </div>
                <div className="p-5 rounded-2xl bg-secondary/5 border border-border">
                  <h5 className="font-bold text-primary mb-2">Public Vote & Polls</h5>
                  <ul className="text-[10px] text-secondary space-y-1 list-disc pl-3">
                    <li>Real-time live voting updates using WebSocket technology.</li>
                    <li>Secure user authentication to prevent duplicate or fraudulent votes.</li>
                    <li>Interactive data visualization for poll results and trends.</li>
                    <li>Customizable poll creation with multiple question types.</li>
                    <li>High-performance backend capable of handling concurrent users.</li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* --- Skills Section --- */}
        <section id="skills" className="mb-32 scroll-mt-32">
          <SectionTitle icon={<Code2 size={24} />}>Skills & Expertise</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {skillCategories.map((category, idx) => (
              <Card key={idx} hoverColor={`${category.color}66`} className="p-3">
                <div className="flex items-center gap-4 mb-5">
                  <div 
                    className="p-2.5 rounded-2xl flex items-center justify-center text-white shadow-lg"
                    style={{ 
                      backgroundColor: category.color || 'var(--color-primary)',
                      boxShadow: `0 0 20px ${(category.color || 'var(--color-primary)')}44`
                    }}
                  >
                    {category.icon}
                  </div>
                  <h3 className="text-xl font-bold" style={{ color: category.color }}>
                    {category.title}
                  </h3>
                </div>
                
                {category.displayType === 'tag' ? (
                  <div className="flex flex-wrap gap-2.5">
                    {category.skills.map((skill, sIdx) => (
                      <motion.span 
                        key={sIdx}
                        whileHover={{ 
                          scale: 1.05, 
                          backgroundColor: `${category.color}22`,
                          borderColor: category.color
                        }}
                        className="px-4 py-2 rounded-xl bg-slate-900/40 border border-slate-800 text-sm font-medium transition-all duration-300 text-slate-300 hover:text-white cursor-default"
                      >
                        {skill.name}
                      </motion.span>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-2">
                    {category.skills.map((skill, sIdx) => (
                      <SkillBar key={sIdx} name={skill.name} percentage={skill.percentage || 0} color={category.color} />
                    ))}
                  </div>
                )}
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowSoftSkills(!showSoftSkills)}
              className="px-8 py-3 rounded-xl bg-primary text-white font-bold shadow-lg shadow-primary/25 flex items-center gap-2 mx-auto"
            >
              {showSoftSkills ? 'Show Less' : 'Show More'}
              {showSoftSkills ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </motion.button>
          </div>

          <AnimatePresence>
            {showSoftSkills && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="mt-24 text-center mb-16">
                  <motion.span 
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest border border-primary/20 inline-flex items-center gap-2 mb-4"
                  >
                    PROFESSIONAL STRENGTHS
                  </motion.span>
                  <h2 className="text-4xl md:text-5xl font-bold mb-4">
                    Soft <span className="text-primary">Skills</span>
                  </h2>
                  <p className="text-secondary max-w-2xl mx-auto">
                    Personal qualities that complement technical expertise and drive professional success
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {softSkills.map((skill, idx) => (
                    <Card key={idx} className="flex gap-4 items-start p-5" hoverColor={`${skill.color}66`}>
                      <div 
                        className="p-3 rounded-2xl flex items-center justify-center text-white shadow-lg shrink-0"
                        style={{ 
                          backgroundColor: skill.color,
                          boxShadow: `0 0 20px ${skill.color}44`
                        }}
                      >
                        {skill.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold mb-2">{skill.title}</h3>
                        <p className="text-sm text-secondary leading-relaxed">{skill.description}</p>
                      </div>
                    </Card>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* --- Education Section --- */}
        <section id="education" className="mb-32 scroll-mt-32">
          <div className="text-center mb-16">
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest border border-primary/20 inline-flex items-center gap-2 mb-4"
            >
              <Award size={14} /> Academic Background
            </motion.span>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Education & <span className="text-primary">Qualifications</span>
            </h2>
            <p className="text-secondary max-w-2xl mx-auto">
              My academic journey that has shaped my technical expertise and problem-solving approach
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            {/* Timeline Line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/50 via-secondary/20 to-transparent transform md:-translate-x-1/2" />

            <div className="space-y-12">
              {educationList.map((edu, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className={`relative flex flex-col md:flex-row items-center ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-4 md:left-1/2 w-8 h-8 rounded-full bg-card border-2 border-primary z-10 flex items-center justify-center transform -translate-x-1/2 shadow-[0_0_20px_rgba(99,102,241,0.4)]">
                    <GraduationCap size={16} className="text-primary" />
                  </div>

                  {/* Content Card */}
                  <div className={`w-full md:w-[45%] ml-12 md:ml-0 ${idx % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                    <div className="bg-card border border-border/50 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 group">
                      {/* Header */}
                      <div 
                        className="p-6 text-white relative overflow-hidden"
                        style={{ backgroundColor: edu.color }}
                      >
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform duration-700">
                          <School size={80} />
                        </div>
                        <div className="relative z-10">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="text-xl font-bold leading-tight">{edu.degree}</h3>
                            {edu.isCurrent && (
                              <span className="px-2 py-0.5 rounded-md bg-white/20 backdrop-blur-md text-[10px] font-bold uppercase tracking-wider">
                                Current
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-2 text-white/80 text-sm">
                            <School size={14} />
                            <span>{edu.institute}</span>
                          </div>
                        </div>
                      </div>

                     {/* Body */}
<div className="p-6">
  {/* Stats Grid - Customized Columns */}
  <div className="grid grid-cols-[1fr_1.5fr_0.8fr] gap-2 mb-6 border-b border-foreground/5 pb-4">
    {/* Duration */}
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-1 text-secondary text-[10px] font-bold uppercase whitespace-nowrap">
        <Calendar size={12} className="text-primary" /> Duration
      </div>
      <div className="text-[13px] font-bold">{edu.duration}</div>
    </div>

    {/* Location */}
    <div className="flex flex-col gap-1 px-2 border-x border-foreground/5">
      <div className="flex items-center gap-1 text-secondary text-[10px] font-bold uppercase whitespace-nowrap">
        <MapPin size={12} className="text-primary" /> Location
      </div>
      <div className="text-[13px] font-bold leading-tight line-clamp-2">
        {edu.location}
      </div>
    </div>

    {/* Score */}
    <div className="flex flex-col gap-1 items-end">
      <div className="flex items-center gap-1 text-secondary text-[10px] font-bold uppercase whitespace-nowrap">
        <Percent size={12} className="text-primary" /> Score
      </div>
      <div className="text-[13px] font-bold text-primary">{edu.score}</div>
    </div>
  </div>

                        <p className="text-secondary text-sm leading-relaxed mb-6">
                          {edu.details}
                        </p>

                        {/* Courses */}
                        <div className="mb-6">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-secondary mb-3 flex items-center gap-2">
                            <Library size={14} className="text-primary" /> Key Courses
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {edu.courses.map((course, cIdx) => (
                              <span 
                                key={cIdx}
                                className="px-3 py-1 rounded-lg bg-secondary/10 text-[11px] font-medium text-secondary border border-border/50"
                              >
                                {course}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Footer */}
                        <div className="pt-4 border-t border-border/50 flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${edu.isCurrent ? 'bg-accent animate-pulse shadow-[0_0_10px_rgba(168,85,247,0.5)]' : 'bg-slate-500'}`} />
                            <span className="text-[11px] font-bold text-secondary uppercase">{edu.status}</span>
                          </div>
                          <span className="text-[11px] font-bold text-primary uppercase" style={{ color: edu.color }}>
                            {edu.isCurrent ? 'Currently Pursuing' : 'Completed'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* --- Projects Section --- */}
        <section id="projects" className="mb-32 scroll-mt-32">
          <SectionTitle icon={<FolderRoot size={24} />}> Projects</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <motion.div 
                key={project.id}
                whileHover={{ y: -12 }}
                className="group relative bg-card border border-border rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500"
              >
                <div className="h-60 overflow-hidden relative">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-115" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                    <a href={project.link} className="bg-white text-black p-3 rounded-full hover:bg-primary hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0 duration-500">
                      <ExternalLink size={20} />
                    </a>
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors duration-200">{project.title}</h3>
                  <p className="text-secondary text-sm mb-6 line-clamp-2">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((t, i) => (
                      <span 
                        key={i} 
                        className="px-3 py-1 rounded-lg bg-secondary/10 text-xs font-bold text-secondary group-hover:bg-primary/10 group-hover:text-primary transition-all duration-500"
                        style={{ transitionDelay: `${i * 50}ms` }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <a href={project.link} className="inline-flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all">
                    Live Preview <ChevronRight size={18} />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* --- Experience Section --- */}
        <section id="experience" className="mb-32 scroll-mt-32">
          <SectionTitle icon={<Briefcase size={24} />}>Experience </SectionTitle>
          <div className="relative max-w-4xl mx-auto">
            {/* Vertical Line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/20 via-primary to-accent/20 -translate-x-1/2" />
            
            <div className="space-y-16">
              {experiences.map((exp, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className={`relative flex items-center justify-between md:justify-normal group ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                >
                  {/* Dot */}
                  <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-gradient-to-br from-primary to-accent border-4 border-background -translate-x-1/2 z-10 shadow-[0_0_15px_rgba(99,102,241,0.6)] group-hover:scale-150 transition-transform" />
                  
                  {/* Content */}
                  <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2.5rem)] ml-auto md:ml-0">
                    <Card className="p-6 group-hover:border-primary/50 relative overflow-hidden" hoverColor="rgba(99, 102, 241, 0.4)">
                      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Briefcase size={48} />
                      </div>
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-xl overflow-hidden border border-border">
                          <img src={exp.image} alt={exp.company} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <h3 className="font-bold text-xl group-hover:text-primary transition-colors">{exp.role}</h3>
                          <p className="text-primary font-semibold">{exp.company}</p>
                        </div>
                      </div>
                      <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold mb-4">
                        {exp.duration}
                      </div>
                      <p className="text-secondary text-sm leading-relaxed mb-4">{exp.description}</p>
                      {exp.tags && (
                        <div className="flex flex-wrap gap-2">
                          {exp.tags.map((tag, tIdx) => (
                            <span key={tIdx} className="text-[10px] font-bold text-primary bg-primary/5 px-2 py-0.5 rounded-md border border-primary/10">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </Card>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* --- Certification Section --- */}
        <section id="certification" className="mb-32 scroll-mt-32">
          <SectionTitle icon={<Award size={24} />}>Certifications</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {certifications.map((cert, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ 
                  scale: 1.03,
                  y: -5,
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
                onClick={() => setSelectedCert(cert)}
                className="cursor-pointer group"
              >
                <Card className="overflow-hidden p-0 transition-all duration-300 group-hover:shadow-[0_0_30px_rgba(99,102,241,0.2)] group-hover:border-primary/30">
                  <div className="h-48 overflow-hidden">
                    <img src={cert.image} alt={cert.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors duration-300">{cert.title}</h3>
                    <p className="text-secondary text-sm mb-2">{cert.issuer}</p>
                    <div className="text-xs text-primary font-bold mb-3">{cert.date}</div>
                    <p className="text-secondary text-xs leading-relaxed">{cert.description}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* --- Let's Connect Section --- */}
        <section id="contact" className="mb-32 scroll-mt-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold font-display mb-6 tracking-tight">Let's <span className="text-gradient">Connect</span></h2>
            <p className="text-secondary max-w-2xl mx-auto text-lg font-medium">
              Interested in collaboration, opportunities, or just want to chat about tech? I'd love to hear from you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Email Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl" />
              <Card className="h-full border-t-4 border-t-primary bg-card/40 backdrop-blur-md border-border/40 p-6 flex flex-col rounded-3xl shadow-lg group-hover:shadow-primary/10">
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 rounded-xl bg-primary text-white shadow-lg shadow-primary/20">
                    <Mail size={24} />
                  </div>
                  <button 
                    onClick={() => { navigator.clipboard.writeText('nirajbpositive@gmail.com'); alert('Email copied!'); }}
                    className="p-2.5 rounded-lg bg-secondary/5 hover:bg-secondary/10 transition-colors group/copy"
                  >
                    <Copy size={18} className="text-secondary group-hover/copy:text-primary transition-colors" />
                  </button>
                </div>
                <h3 className="text-xl font-bold mb-1.5">Email</h3>
                <p className="text-secondary mb-6 font-medium break-all text-sm">nirajbpositive@gmail.com</p>
                <button 
                  onClick={() => { navigator.clipboard.writeText('nirajbpositive@gmail.com'); alert('Email copied!'); }}
                  className="mt-auto w-full py-2.5 rounded-xl bg-secondary/10 hover:bg-primary hover:text-white transition-all font-bold text-base shadow-sm"
                >
                  Copy Email
                </button>
              </Card>
            </motion.div>

            {/* GitHub Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              whileHover={{ y: -8 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-[#333]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl" />
              <Card className="h-full border-t-4 border-t-[#333] bg-card/40 backdrop-blur-md border-border/40 p-6 flex flex-col rounded-3xl shadow-lg group-hover:shadow-black/10">
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 rounded-xl bg-[#333] text-white shadow-lg shadow-black/20">
                    <Github size={24} />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-1.5">GitHub</h3>
                <p className="text-secondary mb-6 font-medium text-sm">https://github.com/Nirajxs</p>
                <a 
                  href="https://github.com/Nirajxs" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="mt-auto w-full py-2.5 rounded-xl bg-secondary/10 hover:bg-[#333] hover:text-white transition-all font-bold text-base text-center shadow-sm"
                >
                  Visit GitHub
                </a>
              </Card>
            </motion.div>

            {/* LinkedIn Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              whileHover={{ y: -8 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl" />
              <Card className="h-full border-t-4 border-t-accent bg-card/40 backdrop-blur-md border-border/40 p-6 flex flex-col rounded-3xl shadow-lg group-hover:shadow-accent/10">
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 rounded-xl bg-accent text-white shadow-lg shadow-accent/20">
                    <Linkedin size={24} />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-1.5">LinkedIn</h3>
                <p className="text-secondary mb-6 font-medium text-sm">https://www.linkedin.com/in/niraj-kumar-37177530a</p>
                <a 
                  href="https://www.linkedin.com/in/niraj-kumar-37177530a" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="mt-auto w-full py-2.5 rounded-xl bg-secondary/10 hover:bg-accent hover:text-white transition-all font-bold text-base text-center shadow-sm"
                >
                  Visit LinkedIn
                </a>
              </Card>
            </motion.div>

            {/* Instagram Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              whileHover={{ y: -8 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl" />
              <Card className="h-full border-t-4 border-t-primary bg-card/40 backdrop-blur-md border-border/40 p-6 flex flex-col rounded-3xl shadow-lg group-hover:shadow-primary/10">
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 rounded-xl bg-primary text-white shadow-lg shadow-primary/20">
                    <Instagram size={24} />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-1.5">Instagram</h3>
                <p className="text-secondary mb-6 font-medium text-sm">@nirajgx</p>
                <a 
                  href="https://www.instagram.com/nirajgx/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="mt-auto w-full py-2.5 rounded-xl bg-secondary/10 hover:bg-primary hover:text-white transition-all font-bold text-base text-center shadow-sm"
                >
                  Visit Instagram
                </a>
              </Card>
            </motion.div>

            {/* Website Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              whileHover={{ y: -8 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl" />
              <Card className="h-full border-t-4 border-t-accent bg-card/40 backdrop-blur-md border-border/40 p-6 flex flex-col rounded-3xl shadow-lg group-hover:shadow-accent/10">
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 rounded-xl bg-accent text-white shadow-lg shadow-accent/20">
                    <CheckCircle2 size={24} />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-1.5">Website</h3>
                <p className="text-secondary mb-6 font-medium text-base">Niraj portfolio
                  
                </p>
              </Card>
            </motion.div>

            {/* Location Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              whileHover={{ y: -8 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl" />
              <Card className="h-full border-t-4 border-t-primary bg-card/40 backdrop-blur-md border-border/40 p-6 flex flex-col rounded-3xl shadow-lg group-hover:shadow-primary/10">
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 rounded-xl bg-primary text-white shadow-lg shadow-primary/20">
                    <MapPin size={24} />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-1.5">Location</h3>
                <p className="text-secondary mb-6 font-medium text-base">Ranchi, Jharkhand, India</p>
              </Card>
            </motion.div>
          </div>
        </section>

      </main>

      {/* --- Footer --- */}
      <footer className="relative bg-card border-t border-border pt-24 pb-12 overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
            {/* Brand Section */}
            <div className="space-y-8">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-3 cursor-pointer group w-fit"
                onClick={() => scrollToSection('home')}
              >
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-lg shadow-primary/20 group-hover:rotate-12 transition-transform">N</div>
                <span className="font-display font-bold text-2xl tracking-tight">Niraj Kumar<span className="text-primary">.</span></span>
              </motion.div>
              <p className="text-secondary leading-relaxed text-lg">
                Crafting digital experiences with precision and passion. Let's build something extraordinary together.
              </p>
              <div className="flex gap-3">
                {[
                  { icon: <Github size={20} />, href: "https://github.com/Nirajxs", color: "#333" },
                  { icon: <Linkedin size={20} />, href: "https://www.linkedin.com/in/niraj-kumar-37177530a", color: "#0077b5" },
                  { icon: <Twitter size={20} />, href: "https://x.com/", color: "#1da1f2" },
                  { icon: <Instagram size={20} />, href: "https://www.instagram.com/nirajgx/", color: "#e1306c" },
                ].map((social, i) => (
                  <motion.a 
                    key={i}
                    whileHover={{ y: -5, scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    href={social.href} 
                    className="p-3 rounded-xl bg-secondary/5 border border-border hover:border-primary/50 hover:bg-primary/5 transition-all text-secondary hover:text-primary"
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Navigation Section */}
            <div>
              <h4 className="font-bold text-lg mb-8 relative w-fit">
                Quick Navigation
                <span className="absolute -bottom-2 left-0 w-8 h-1 bg-primary rounded-full" />
              </h4>
              <ul className="grid grid-cols-1 gap-4">
                {navItems.slice(0, 6).map(item => (
                  <li key={item.id}>
                    <button 
                      onClick={() => scrollToSection(item.id)} 
                      className="group flex items-center gap-2 text-secondary hover:text-primary transition-all text-base"
                    >
                      <ChevronRight size={14} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services Section */}
            <div>
              <h4 className="font-bold text-lg mb-8 relative w-fit">
                Expertise
                <span className="absolute -bottom-2 left-0 w-8 h-1 bg-accent rounded-full" />
              </h4>
              <ul className="space-y-4">
                {[
                  { label: "Frontend Development", icon: <Layout size={16} /> },
                  { label: "Backend Solutions", icon: <Server size={16} /> },
                  { label: "Full Stack MERN", icon: <Database size={16} /> },
                  { label: "UI/UX Optimization", icon: <Wrench size={16} /> },
                ].map((service, i) => (
                  <li key={i} className="flex items-center gap-3 text-secondary group">
                    <div className="p-1.5 rounded-md bg-secondary/5 group-hover:bg-primary/10 group-hover:text-primary transition-all">
                      {service.icon}
                    </div>
                    <span className="text-base">{service.label}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter/Contact Section */}
            <div className="space-y-8">
              <h4 className="font-bold text-lg mb-8 relative w-fit">
                Stay Connected
                <span className="absolute -bottom-2 left-0 w-8 h-1 bg-primary rounded-full" />
              </h4>
              <div className="p-6 rounded-3xl bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/10 space-y-4">
                <p className="text-sm text-secondary font-medium">Ready to start a project?</p>
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setIsContactOpen(true)}
                  className="w-full py-4 bg-gradient-to-r from-primary to-accent text-white rounded-2xl font-bold text-sm shadow-lg shadow-primary/20 flex items-center justify-center gap-2 group"
                >
                  Get in Touch
                  <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </motion.button>
              </div>
              <div className="flex items-center gap-3 text-secondary text-sm">
                <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                Available for new opportunities
              </div>
            </div>
          </div>
          
          {/* Bottom Bar */}
          <div className="border-t border-border pt-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex flex-col items-center md:items-start gap-2">
              <p className="text-secondary text-sm">
                © {new Date().getFullYear()} <span className="font-bold text-foreground">Niraj Kumar</span>. Built with ❤️ and React.
              </p>
            </div>
            
            <div className="flex items-center gap-8 text-sm font-medium">
              <a href="#" className="text-secondary hover:text-primary transition-all relative group">
                
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary group-hover:w-full transition-all" />
              </a>
              <a href="#" className="text-secondary hover:text-primary transition-all relative group">
               
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary group-hover:w-full transition-all" />
              </a>
              <motion.button 
                whileHover={{ y: -2 }}
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="p-2 rounded-full bg-secondary/5 text-secondary hover:text-primary transition-all"
              >
                <ArrowUp size={20} />
              </motion.button>
            </div>
          </div>
        </div>
      </footer>

      {/* --- Modals --- */}
      
      {/* Contact Modal */}
      <AnimatePresence>
        {isContactOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsContactOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-card border border-border rounded-[2rem] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
            >
              <div className="sticky top-0 right-0 p-6 flex justify-end z-10 bg-card/80 backdrop-blur-md border-b border-border/50">
                <button 
                  onClick={() => setIsContactOpen(false)}
                  className="p-3 rounded-full bg-secondary/10 hover:bg-primary/10 hover:text-primary transition-all"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="p-8 md:p-12 pt-0 overflow-y-auto scrollbar-hide">
                <h2 className="text-3xl font-bold font-display mb-2">Get In Touch</h2>
                <p className="text-secondary mb-8">Fill out the form below and I'll get back to you as soon as possible.</p>
                
                <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert('Message Sent Successfully!'); setIsContactOpen(false); }}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold">Full Name</label>
                      <input type="text" required placeholder="Your Name" className="w-full px-4 py-3 rounded-xl bg-secondary/5 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold">Email Address</label>
                      <input type="email" required placeholder="abc@example.com" className="w-full px-4 py-3 rounded-xl bg-secondary/5 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold">Phone Number</label>
                      <input type="tel" placeholder="+91 00000 00000" className="w-full px-4 py-3 rounded-xl bg-secondary/5 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold">Social Username </label>
                      <input type="text" placeholder=" Instagram, linkedin, facebook" className="w-full px-4 py-3 rounded-xl bg-secondary/5 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold">Message</label>
                    <textarea required rows={4} placeholder="How can I help you?" className="w-full px-4 py-3 rounded-xl bg-secondary/5 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"></textarea>
                  </div>
                  <button type="submit" className="w-full py-4 bg-gradient-to-r from-primary to-accent text-white rounded-xl font-bold text-lg flex items-center justify-center gap-2 hover:shadow-xl hover:shadow-primary/30 transition-all active:scale-[0.98]">
                    Send Message <Send size={20} />
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-8 right-8 z-[60] p-4 bg-gradient-to-br from-primary to-accent text-white rounded-full shadow-2xl hover:scale-110 active:scale-90 transition-all glow-primary"
          >
            <ArrowUp size={24} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Certification Modal */}
      <AnimatePresence>
        {selectedCert && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCert(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative max-w-4xl w-full bg-card rounded-[2rem] overflow-hidden shadow-2xl border border-border/50"
            >
              <button 
                onClick={() => setSelectedCert(null)}
                className="absolute top-6 right-6 z-10 p-3 rounded-full bg-black/40 text-white hover:bg-primary transition-all shadow-lg"
              >
                <X size={24} />
              </button>
              <div className="max-h-[85vh] overflow-y-auto">
  <img 
    src={selectedCert.image} 
    alt={selectedCert.title} 
    className="w-full h-auto object-contain mb-4"
  />

  {selectedCert.pdfs?.map((pdf, i) => (
    <iframe
      key={i}
      src={pdf}
      className="w-full h-[600px] mb-4"
    />
  ))}
</div>
              <div className="p-8 bg-card border-t border-border/50">
                <h2 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">{selectedCert.title}</h2>
                <p className="text-secondary font-medium">{selectedCert.issuer} • {selectedCert.date}</p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
