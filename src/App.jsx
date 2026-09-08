import { useState } from "react";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  ArrowUpRight,
  Github,
  Linkedin,
  Mail,
  GraduationCap,
  Award,
} from "lucide-react";
import AskAI from "./components/AskAI";

const NAV_LINKS = [
  { href: "#work", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#demo", label: "Demo" },
  { href: "#education", label: "Education" },
  { href: "#skills", label: "Skills" },
  { href: "#ask-ai", label: "Ask AI" },
];

const EXPERIENCE = [
  {
    role: "Technical Project Manager – AI & LLM Integration",
    org: "LG NOVA",
    time: "Jul 2026 – Present",
    bullets: [
      "Promoted from Developer to lead the Atlas AI subteam, translating client requirements into sprint milestones for an LLM-powered natural language dashboard spanning a Flask/pgvector backend to a React/TypeScript frontend, while bridging stakeholders and engineers to keep the team shipping on a live enterprise product.",
      "Previously engineered data pipelines integrating fragmented team data into Atlas and built core components of the LLM-powered natural language query interface.",
    ],
  },
  {
    role: "AI Researcher, CDSS Data Discovery Program",
    org: "UC Berkeley College of Computing, Data Science, and Society",
    time: "Sep 2026 – Present",
    bullets: [
      "Selected for the CDSS Data Discovery Program to research the KnaiTai Open Initiative, building knowledge-native AI systems that bridge structured programming knowledge with LLM reasoning.",
      "Own the Experts + APPLY workstream, designing a common abstraction for invoking heterogeneous computations.",
    ],
  },
  {
    role: "Machine Learning Team Member",
    org: "Open Project",
    time: "Jan 2026 – May 2026",
    bullets: [
      "Engineered spatial ML pipelines and regression models in PyTorch and scikit-learn on multi-source geospatial data, applying feature engineering, high-dimensional ingestion, and cross-validation to improve model robustness.",
    ],
  },
  {
    role: "Founder, Private Tutoring Services",
    org: "Mathematics Tutor",
    time: "Jan 2024 – Sep 2025",
    bullets: [
      "Designed first-principles frameworks for Calculus, Linear Algebra, and Statistics tailored to individual gaps; delivered personalized curricula across 20+ sessions, driving a 60% average improvement in exam scores.",
    ],
  },
];

const PROJECTS = [
  {
    name: "Scout",
    tagline: "Autonomous AI Market Intelligence Engine",
    description:
      "Architected an agentic LLM/RAG pipeline mining patents, VC funding, and research to surface market opportunities — generating startup concepts, TAM/SAM/SOM sizing, MVP specs, and pitch decks end-to-end from a single query.",
    stack: ["Python", "LLMs", "RAG", "Agentic Workflows", "NLP", "Vector DBs", "FastAPI"],
    href: "https://scout-eight-psi.vercel.app/",
  },
  {
    name: "GIStice League",
    tagline: "Spatial ML for Food Desert Mapping",
    description:
      "Built a spatial ML pipeline in PyTorch/scikit-learn quantifying grocery access inequities across 500 census tracts; engineered a composite Accessibility Index from 10+ variables, shipping dashboards adopted by advocacy groups.",
    stack: ["Python", "PyTorch", "GeoPandas", "scikit-learn", "Leaflet.js", "Plotly.js"],
    href: "https://gistice-league.onrender.com/",
  },
  {
    name: "FinSight",
    tagline: "Full-Stack Wealth & Retirement Simulator",
    description:
      "Built a full-stack retirement simulator in Next.js/TypeScript running Monte Carlo simulations for portfolio modeling; shipped AI-driven expense categorization and budget visualizations via a FastAPI backend on Vercel.",
    stack: ["Python", "Next.js", "TypeScript", "React.js", "Tailwind CSS", "FastAPI"],
    href: "https://finsight-tau-livid.vercel.app/",
  },
];

const EDUCATION = [
  {
    school: "University of California, Berkeley",
    degree: "B.A. Data Science",
    time: "Aug 2025 – May 2027",
    notes: [],
  },
  {
    school: "Los Angeles Pierce College",
    degree: "A.S. Mathematics · A.S. Physics · A.S. Computer Science",
    time: "Jan 2023 – Jul 2025",
    notes: ["President's Honors List", "Full-time Dean's Honors List"],
  },
];

const SKILLS = [
  {
    label: "Languages",
    items: ["Python", "SQL", "Java", "C++", "TypeScript", "JavaScript"],
  },
  {
    label: "Machine Learning",
    items: [
      "PyTorch",
      "TensorFlow",
      "Keras",
      "scikit-learn",
      "XGBoost",
      "LLMs",
      "RAG",
      "NLP",
      "Vector DBs",
      "Agentic AI",
    ],
  },
  {
    label: "Data & Frameworks",
    items: [
      "NumPy",
      "Pandas",
      "GeoPandas",
      "Plotly.js",
      "Next.js",
      "React.js",
      "FastAPI",
      "Tailwind CSS",
      "Vercel",
    ],
  },
];

const CERTIFICATIONS = [
  "Intermediate Machine Learning – Kaggle",
  "Intro to Deep Learning – Kaggle",
  "Artificial Intelligence Fundamentals – IBM",
];

export default function App() {
  const [sqft, setSqft] = useState(1000);
  const [bedrooms, setBedrooms] = useState(2);

  // Mock ML logic
  const priceFromSqft = sqft * 300;
  const priceFromBedrooms = bedrooms * 50000;
  const predictedPrice = Math.round(priceFromSqft + priceFromBedrooms);

  const data = [
    { name: "Sqft", value: priceFromSqft },
    { name: "Bedrooms", value: priceFromBedrooms },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* NAV */}
      <nav className="sticky top-0 z-10 bg-white/80 backdrop-blur border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="#top" className="font-semibold tracking-tight">
            Ojasvi Shrivastava
          </a>
          <div className="hidden md:flex gap-6 text-sm text-gray-600">
            {NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href} className="hover:text-gray-900 transition">
                {link.label}
              </a>
            ))}
          </div>
          <a
            href="/Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
          >
            Resume
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section id="top" className="pt-24 pb-24 text-center max-w-5xl mx-auto px-6">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-6xl font-bold mb-6"
        >
          I turn AI research into products that ship
        </motion.h1>

        <p className="text-lg md:text-xl text-gray-600 mb-3">
          Technical PM, AI & LLM Integration @ LG NOVA
        </p>
        <p className="text-base md:text-lg text-gray-500 mb-8">
          AI Researcher @ UC Berkeley CDSS · B.A. Data Science @ UC Berkeley
        </p>

        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <a
            href="#demo"
            className="px-6 py-3 bg-black text-white rounded-xl shadow hover:opacity-90 transition"
          >
            Try Demo
          </a>
          <a
            href="#projects"
            className="px-6 py-3 border border-gray-300 rounded-xl hover:bg-gray-100 transition"
          >
            View Projects
          </a>
          <a
            href="mailto:oju24.ai@gmail.com"
            className="px-6 py-3 border border-gray-300 rounded-xl hover:bg-gray-100 transition"
          >
            Contact
          </a>
        </div>

        <div className="flex justify-center gap-5 text-gray-500">
          <a
            href="https://github.com/ojasvi24-coder"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-900 transition"
            aria-label="GitHub"
          >
            <Github size={22} />
          </a>
          <a
            href="https://linkedin.com/in/ojasvi-shrivastava-94a00b340"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-900 transition"
            aria-label="LinkedIn"
          >
            <Linkedin size={22} />
          </a>
          <a
            href="mailto:oju24.ai@gmail.com"
            className="hover:text-gray-900 transition"
            aria-label="Email"
          >
            <Mail size={22} />
          </a>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="work" className="max-w-5xl mx-auto mb-24 px-6">
        <h2 className="text-3xl font-semibold mb-6">Experience</h2>
        <div className="space-y-8">
          {EXPERIENCE.map((job) => (
            <div key={job.role} className="border-l-2 border-gray-200 pl-6">
              <h3 className="text-xl font-semibold">{job.role}</h3>
              <p className="text-gray-700 font-medium">{job.org}</p>
              <p className="text-gray-500 mb-3">{job.time}</p>
              {job.bullets.map((b, i) => (
                <p key={i} className="text-gray-700 leading-relaxed mb-2 last:mb-0">
                  {b}
                </p>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="max-w-5xl mx-auto mb-24 px-6">
        <h2 className="text-3xl font-semibold mb-6">Projects</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {PROJECTS.map((project) => (
            <a
              key={project.name}
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white shadow-xl rounded-2xl p-6 border hover:border-gray-400 transition flex flex-col"
            >
              <div className="flex items-start justify-between mb-1">
                <h3 className="text-lg font-semibold">{project.name}</h3>
                <ArrowUpRight
                  size={18}
                  className="text-gray-400 group-hover:text-gray-900 transition shrink-0 mt-1"
                />
              </div>
              <p className="text-sm font-medium text-gray-500 mb-3">{project.tagline}</p>
              <p className="text-sm text-gray-700 leading-relaxed mb-4 flex-1">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* DEMO */}
      <section id="demo" className="max-w-5xl mx-auto mb-24 px-6">
        <h2 className="text-3xl font-semibold mb-6">
          Interactive ML Demo + Explainability
        </h2>

        {/* INPUT CARD */}
        <div className="bg-white shadow-xl rounded-2xl p-8 mb-10 border">
          <div className="space-y-6">
            <div>
              <label className="block mb-2 font-medium">
                Square Footage: {sqft}
              </label>
              <input
                type="range"
                min="500"
                max="4000"
                value={sqft}
                onChange={(e) => setSqft(Number(e.target.value))}
                className="w-full"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Bedrooms: {bedrooms}
              </label>
              <input
                type="range"
                min="1"
                max="6"
                value={bedrooms}
                onChange={(e) => setBedrooms(Number(e.target.value))}
                className="w-full"
              />
            </div>

            <div className="text-center mt-6">
              <p className="text-gray-500">Predicted Price</p>
              <p className="text-4xl font-bold">
                ${predictedPrice.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* EXPLAINABILITY */}
        <div className="bg-white shadow-xl rounded-2xl p-8 border">
          <h3 className="text-xl font-semibold mb-4">
            Model Explainability
          </h3>

          <p className="text-gray-600 mb-6">
            This chart shows how each feature contributes to the prediction.
          </p>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-6 text-sm text-gray-700 space-y-1">
            <p>
              • Square footage contributes $
              {priceFromSqft.toLocaleString()}
            </p>
            <p>
              • Bedrooms contribute $
              {priceFromBedrooms.toLocaleString()}
            </p>
            <p className="mt-2">
              This mimics how linear regression assigns weights to features.
            </p>
          </div>
        </div>
      </section>

      {/* EDUCATION */}
      <section id="education" className="max-w-5xl mx-auto mb-24 px-6">
        <h2 className="text-3xl font-semibold mb-6">Education</h2>
        <div className="space-y-6">
          {EDUCATION.map((school) => (
            <div key={school.school} className="border-l-2 border-gray-200 pl-6 flex gap-4">
              <GraduationCap size={22} className="text-gray-400 shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-semibold">{school.school}</h3>
                <p className="text-gray-700">{school.degree}</p>
                <p className="text-gray-500 mb-2">{school.time}</p>
                {school.notes.length > 0 && (
                  <p className="text-sm text-gray-600">
                    Honors: {school.notes.join(", ")}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SKILLS + CERTIFICATIONS */}
      <section id="skills" className="max-w-5xl mx-auto mb-24 px-6">
        <h2 className="text-3xl font-semibold mb-6">Skills & Certifications</h2>
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {SKILLS.map((group) => (
            <div key={group.label} className="bg-white shadow-xl rounded-2xl p-6 border">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
                {group.label}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white shadow-xl rounded-2xl p-6 border">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
            Certifications
          </h3>
          <ul className="space-y-2">
            {CERTIFICATIONS.map((cert) => (
              <li key={cert} className="flex items-center gap-2 text-sm text-gray-700">
                <Award size={16} className="text-gray-400 shrink-0" />
                {cert}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ASK AI */}
      <section id="ask-ai" className="max-w-5xl mx-auto mb-24 px-6">
        <h2 className="text-3xl font-semibold mb-6">Ask AI</h2>
        <AskAI />
      </section>

      {/* FOOTER */}
      <footer className="text-center text-gray-400 pb-10">
        © {new Date().getFullYear()} Ojasvi Shrivastava
      </footer>
    </div>
  );
}
