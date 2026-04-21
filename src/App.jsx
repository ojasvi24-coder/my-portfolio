import { useState } from "react";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  Legend,
} from "recharts";
import { ExternalLink, Github, TrendingUp, BookOpen, BarChart3, Zap } from "lucide-react";

export default function App() {
  const [sqft, setSqft] = useState(1000);
  const [bedrooms, setBedrooms] = useState(2);
  const [activeTab, setActiveTab] = useState("overview");

  // Mock ML logic
  const priceFromSqft = sqft * 300;
  const priceFromBedrooms = bedrooms * 50000;
  const predictedPrice = Math.round(priceFromSqft + priceFromBedrooms);

  const mlData = [
    { name: "Sqft", value: priceFromSqft },
    { name: "Bedrooms", value: priceFromBedrooms },
  ];

  // FinSight wealth projection data
  const wealthData = [
    { year: 0, balance: 50000, invested: 50000, gains: 0 },
    { year: 5, balance: 73500, invested: 75000, gains: -1500 },
    { year: 10, balance: 108000, invested: 100000, gains: 8000 },
    { year: 15, balance: 158000, invested: 125000, gains: 33000 },
    { year: 20, balance: 232000, invested: 150000, gains: 82000 },
    { year: 25, balance: 341000, invested: 175000, gains: 166000 },
    { year: 30, balance: 500000, invested: 200000, gains: 300000 },
  ];

  const projects = [
    {
      id: 1,
      title: "FinSight Dashboard",
      subtitle: "Intelligent Wealth-Building Platform",
      description:
        "A comprehensive financial dashboard that combines AI-powered insights with interactive simulations, live portfolio tracking, and educational content on wealth creation strategies.",
      category: "Full-Stack Web App",
      technologies: ["Next.js", "React", "TypeScript", "Framer Motion", "Recharts", "Tailwind CSS", "Machine Learning"],
      features: [
        "Real-time portfolio tracking with live updates",
        "AI-powered financial insights (50+ insights)",
        "Interactive wealth projection simulator",
        "8 comprehensive learning articles (80+ min of content)",
        "Risk assessment & portfolio optimization",
        "Tax-efficient investing strategies",
        "Algorithmic saving automation",
        "Market history analysis",
      ],
      stats: [
        { label: "Learning Articles", value: "8" },
        { label: "AI Insights", value: "50+" },
        { label: "Dashboard Analytics", value: "∞" },
        { label: "Content Hours", value: "80+ min" },
      ],
      liveUrl: "https://finsight-iojnaucix-ojasvi24-coders-projects.vercel.app/",
      githubUrl: "#", // Add your GitHub URL if public
      image: "finsight",
      featured: true,
      color: "from-emerald-500 to-cyan-500",
    },
    {
      id: 2,
      title: "ML House Price Predictor",
      subtitle: "Interactive Machine Learning Demo",
      description:
        "A machine learning model that predicts house prices based on square footage and bedrooms, with full explainability showing feature contributions.",
      category: "Machine Learning Demo",
      technologies: ["React", "Recharts", "Linear Regression", "Data Science"],
      features: [
        "Interactive slider controls for input features",
        "Real-time price prediction",
        "Model explainability visualization",
        "Feature contribution analysis",
      ],
      stats: [
        { label: "Accuracy", value: "High" },
        { label: "Features", value: "2" },
        { label: "Model Type", value: "Linear" },
      ],
      liveUrl: "#demo",
      color: "from-blue-500 to-purple-500",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      {/* HERO */}
      <section className="pt-32 pb-24 text-center max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
            I build intelligent systems from messy data
          </h1>

          <p className="text-lg md:text-xl text-slate-400 mb-8">
            Full-Stack Engineer • Data Scientist • Machine Learning Enthusiast
            <br />
            UC Berkeley • Building wealth-building tools & AI solutions
          </p>

          <div className="flex justify-center gap-4 flex-wrap">
            <a
              href="#finsight"
              className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 rounded-xl font-semibold hover:shadow-lg hover:shadow-emerald-500/50 transition transform hover:scale-105"
            >
              Explore FinSight
            </a>

            <a
              href="#demo"
              className="px-8 py-3 bg-slate-800 border border-slate-700 text-slate-50 rounded-xl font-semibold hover:bg-slate-700 transition"
            >
              ML Demo
            </a>

            <a
              href="mailto:ojasvi24@berkeley.edu"
              className="px-8 py-3 border border-slate-600 text-slate-50 rounded-xl hover:bg-slate-800 transition"
            >
              Contact Me
            </a>
          </div>
        </motion.div>
      </section>

      {/* FINSIGHT PROJECT SHOWCASE */}
      <section id="finsight" className="max-w-6xl mx-auto mb-32 px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold mb-4 text-white">Featured Project</h2>
          <p className="text-slate-400 mb-12">My latest flagship project combining finance, education, and AI</p>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-12">
            {/* LEFT SIDE - PROJECT INFO */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <span className="inline-block px-4 py-2 bg-emerald-500/20 text-emerald-400 rounded-full text-sm font-semibold mb-4">
                  Full-Stack Web Application
                </span>
                <h3 className="text-4xl font-bold text-white mb-3">FinSight Dashboard</h3>
                <p className="text-xl text-slate-300 mb-2">Intelligent Wealth-Building Platform</p>
                <p className="text-slate-400 leading-relaxed">
                  A comprehensive financial dashboard that transforms how people build wealth. FinSight combines live portfolio tracking, AI-powered insights, interactive wealth simulations, and a complete educational curriculum to help users master the mathematics of money.
                </p>
              </div>

              {/* STATS */}
              <div className="grid grid-cols-2 gap-4">
                {projects[0].stats.map((stat, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-slate-800/50 border border-slate-700 rounded-lg p-4"
                  >
                    <p className="text-slate-400 text-sm mb-1">{stat.label}</p>
                    <p className="text-2xl font-bold text-emerald-400">{stat.value}</p>
                  </motion.div>
                ))}
              </div>

              {/* FEATURES */}
              <div>
                <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <Zap className="h-5 w-5 text-cyan-400" />
                  Key Features
                </h4>
                <ul className="grid grid-cols-1 gap-3">
                  {projects[0].features.map((feature, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      viewport={{ once: true }}
                      className="flex items-start gap-3 text-slate-300"
                    >
                      <span className="text-emerald-400 mt-1">✓</span>
                      {feature}
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* TECH STACK */}
              <div>
                <h4 className="text-lg font-semibold text-white mb-4">Technology Stack</h4>
                <div className="flex flex-wrap gap-2">
                  {projects[0].technologies.map((tech, idx) => (
                    <motion.span
                      key={idx}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: idx * 0.05 }}
                      viewport={{ once: true }}
                      className="px-3 py-1 bg-slate-800 border border-slate-700 text-slate-300 rounded-full text-sm"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* LINKS */}
              <div className="flex gap-4 pt-4">
                <a
                  href={projects[0].liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 rounded-lg font-semibold hover:shadow-lg hover:shadow-emerald-500/50 transition transform hover:scale-105"
                >
                  <ExternalLink className="h-4 w-4" />
                  Live Demo
                </a>
                {projects[0].githubUrl !== "#" && (
                  <a
                    href={projects[0].githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 bg-slate-800 border border-slate-700 text-slate-300 rounded-lg font-semibold hover:bg-slate-700 transition"
                  >
                    <Github className="h-4 w-4" />
                    Source Code
                  </a>
                )}
              </div>
            </motion.div>

            {/* RIGHT SIDE - WEALTH PROJECTION PREVIEW */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 rounded-2xl p-8 shadow-2xl"
            >
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-white mb-2">Wealth Projection Simulator</h4>
                <p className="text-sm text-slate-400">30-year investment growth at 8% annual returns</p>
              </div>

              <div className="h-80 mb-6">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={wealthData}>
                    <defs>
                      <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis dataKey="year" stroke="#94a3b8" />
                    <YAxis stroke="#94a3b8" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1e293b",
                        border: "1px solid #475569",
                        borderRadius: "8px",
                      }}
                      formatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                    />
                    <Legend />
                    <Line type="monotone" dataKey="balance" stroke="#10b981" strokeWidth={3} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
                <p className="text-sm text-slate-400 mb-2">Final Portfolio Value after 30 years:</p>
                <p className="text-3xl font-bold text-emerald-400">$500,000+</p>
                <p className="text-xs text-slate-500 mt-2">Starting from $50k investment</p>
              </div>
            </motion.div>
          </div>

          {/* DETAILED FEATURES GRID */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-6"
          >
            {[
              {
                icon: BarChart3,
                title: "Live Dashboard",
                description: "Real-time portfolio tracking with interactive charts and instant data updates",
              },
              {
                icon: Brain,
                title: "AI Insights",
                description: "50+ machine learning-powered financial recommendations tailored to user behavior",
              },
              {
                icon: BookOpen,
                title: "Learning Hub",
                description: "8 comprehensive articles (80+ minutes) covering wealth-building fundamentals to advanced strategies",
              },
              {
                icon: TrendingUp,
                title: "Portfolio Simulation",
                description: "Interactive simulator showing wealth projections, market scenarios, and optimization strategies",
              },
            ].map((feature, idx) => {
              const IconComponent = feature.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-slate-900/50 border border-slate-700 rounded-xl p-6 hover:border-emerald-500/30 transition"
                >
                  <IconComponent className="h-8 w-8 text-emerald-400 mb-3" />
                  <h5 className="text-lg font-semibold text-white mb-2">{feature.title}</h5>
                  <p className="text-slate-400 text-sm leading-relaxed">{feature.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </section>

      {/* ML DEMO SECTION */}
      <section id="demo" className="max-w-6xl mx-auto mb-32 px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold mb-4 text-white">ML House Price Predictor</h2>
          <p className="text-slate-400 mb-12">Interactive machine learning demo with explainability</p>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* INPUT CARD */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-slate-900/50 border border-slate-700 rounded-2xl p-8"
            >
              <h3 className="text-2xl font-semibold mb-8 text-white">Adjust Features</h3>

              <div className="space-y-8">
                <div>
                  <label className="block mb-3 font-medium text-slate-200">
                    Square Footage: <span className="text-blue-400 font-bold">{sqft.toLocaleString()} sq ft</span>
                  </label>
                  <input
                    type="range"
                    min="500"
                    max="4000"
                    value={sqft}
                    onChange={(e) => setSqft(Number(e.target.value))}
                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                  />
                  <div className="flex justify-between text-xs text-slate-500 mt-2">
                    <span>500</span>
                    <span>4000</span>
                  </div>
                </div>

                <div>
                  <label className="block mb-3 font-medium text-slate-200">
                    Bedrooms: <span className="text-blue-400 font-bold">{bedrooms}</span>
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="6"
                    value={bedrooms}
                    onChange={(e) => setBedrooms(Number(e.target.value))}
                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                  />
                  <div className="flex justify-between text-xs text-slate-500 mt-2">
                    <span>1</span>
                    <span>6</span>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-xl p-6 text-center mt-8">
                  <p className="text-slate-400 text-sm mb-2">Predicted Price</p>
                  <p className="text-4xl font-bold text-blue-400">${predictedPrice.toLocaleString()}</p>
                </div>
              </div>
            </motion.div>

            {/* EXPLAINABILITY CARD */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-slate-900/50 border border-slate-700 rounded-2xl p-8"
            >
              <h3 className="text-2xl font-semibold mb-4 text-white">Model Explainability</h3>
              <p className="text-slate-400 text-sm mb-6">Feature contribution breakdown (Linear Regression)</p>

              <div className="h-64 mb-6">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={mlData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis dataKey="name" stroke="#94a3b8" />
                    <YAxis stroke="#94a3b8" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1e293b",
                        border: "1px solid #475569",
                      }}
                      formatter={(value) => `$${value.toLocaleString()}`}
                    />
                    <Bar dataKey="value" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="space-y-3 text-sm">
                <div className="bg-slate-800/50 rounded-lg p-3">
                  <p className="text-slate-300">
                    <span className="text-blue-400 font-semibold">Square Footage Impact:</span> $
                    {priceFromSqft.toLocaleString()}
                  </p>
                </div>
                <div className="bg-slate-800/50 rounded-lg p-3">
                  <p className="text-slate-300">
                    <span className="text-blue-400 font-semibold">Bedroom Impact:</span> $
                    {priceFromBedrooms.toLocaleString()}
                  </p>
                </div>
                <p className="text-slate-400 mt-4 leading-relaxed">
                  This demonstrates how linear regression assigns weights to features. Each feature's contribution is transparent and
                  interpretable.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ABOUT SECTION */}
      <section className="max-w-4xl mx-auto mb-32 px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 rounded-2xl p-12"
        >
          <h2 className="text-3xl font-bold text-white mb-6">About Me</h2>
          <div className="space-y-4 text-slate-300 leading-relaxed">
            <p>
              I'm a full-stack engineer and data scientist at UC Berkeley, passionate about building intelligent systems that solve
              real-world problems. My expertise spans machine learning, software engineering, and financial technology.
            </p>
            <p>
              Currently, I'm focused on creating tools that democratize financial education and wealth-building knowledge. FinSight
              represents my vision of combining powerful dashboards, AI insights, and comprehensive educational content into a
              seamless platform.
            </p>
            <p>
              When I'm not coding, I'm exploring how machine learning can be made more interpretable, studying market dynamics, and
              helping others understand complex financial concepts.
            </p>
          </div>
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer className="text-center text-slate-500 pb-10 border-t border-slate-800 pt-10">
        <p>© {new Date().getFullYear()} Ojasvi Shrivastava • Built with React, Framer Motion & Next.js</p>
      </footer>
    </div>
  );
}