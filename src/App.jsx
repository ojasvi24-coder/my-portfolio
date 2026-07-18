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
import AskAI from "./components/AskAI";

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
      {/* HERO */}
      <section className="pt-32 pb-24 text-center max-w-5xl mx-auto px-6">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-6xl font-bold mb-6"
        >
          I build intelligent systems from messy data
        </motion.h1>

        <p className="text-lg md:text-xl text-gray-600 mb-8">
          Data Science @ UC Berkeley • Machine Learning • Software Engineering
        </p>

        <div className="flex justify-center gap-4">
          <a
            href="#demo"
            className="px-6 py-3 bg-black text-white rounded-xl shadow hover:opacity-90 transition"
          >
            Try Demo
          </a>

          <a
            href="mailto:ojasvi24@berkeley.edu"
            className="px-6 py-3 border border-gray-300 rounded-xl hover:bg-gray-100 transition"
          >
            Contact
          </a>
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

      {/* EXPERIENCE */}
      <section id="work" className="max-w-5xl mx-auto mb-24 px-6">
        <h2 className="text-3xl font-semibold mb-6">Experience</h2>
        <div className="space-y-8">
          <div className="border-l-2 border-gray-200 pl-6">
            <h3 className="text-xl font-semibold">Developer</h3>
            <p className="text-gray-700 font-medium">LG NOVA</p>
            <p className="text-gray-500 mb-3">July 2026 – August 2026</p>
            <p className="text-gray-700 leading-relaxed">
              Worked as a technical team member in collaboration with LG NOVA to develop Atlas, an AI-powered internal operations dashboard designed to centralize and structure fragmented team data. Contributed to the engineering of data integration pipelines to streamline cross-team coordination, while assisting in the implementation of an LLM-powered natural language interface for seamless, conversational data querying. Developed clean code and collaborated closely with peer developers to meet technical specifications and project milestones provided by the corporate partner.
            </p>
          </div>

          <div className="border-l-2 border-gray-200 pl-6">
            <h3 className="text-xl font-semibold">Machine Learning Engineer</h3>
            <p className="text-gray-700 font-medium">Open Project · Berkeley, CA</p>
            <p className="text-gray-500 mb-3">Feb 2026 – May 2026</p>
            <p className="text-gray-700 leading-relaxed">
              Built production-grade spatial ML systems from first principles, architecting pipelines that ingested multi-source geospatial datasets and engineered high-dimensional feature sets across census tracts. Implemented PyTorch neural networks and scikit-learn ensemble models optimized through rigorous cross-validation and hyperparameter tuning, solving real data challenges like handling missing values, normalizing disparate sources, and preventing data leakage in temporal splits.
            </p>
          </div>

          <div className="border-l-2 border-gray-200 pl-6">
            <h3 className="text-xl font-semibold">Founder, Private Tutoring Services</h3>
            <p className="text-gray-700 font-medium">Mathematics Tutor · Los Angeles, CA</p>
            <p className="text-gray-500 mb-3">Jan 2024 – Sep 2025</p>
            <p className="text-gray-700 leading-relaxed">
              Pioneered a first-principles teaching methodology that rewired how students approach mathematics by deriving every concept from foundational axioms rather than memorizing procedures. Instead of “here’s the formula,” I built custom problem sequences that forced students to discover why the formula works, turning passive learners into mathematicians who understand the why behind the mechanics. This pedagogical approach generated a 60% average exam score improvement not through harder studying, but through better understanding.
            </p>
          </div>
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
