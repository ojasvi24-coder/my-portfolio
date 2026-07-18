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
        <div className="space-y-6">
          <div className="bg-white shadow-xl rounded-2xl p-8 border">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-4">
              <div>
                <h3 className="text-xl font-semibold">Developer · LG NOVA</h3>
                <p className="text-gray-600">July 2026 – August 2026</p>
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed">
              Worked as a technical team member in collaboration with LG NOVA to develop Atlas, an AI-powered internal operations dashboard designed to centralize and structure fragmented team data. Contributed to the engineering of data integration pipelines to streamline cross-team coordination, while assisting in the implementation of an LLM-powered natural language interface for seamless, conversational data querying. Developed clean code and collaborated closely with peer developers to meet technical specifications and project milestones provided by the corporate partner.
            </p>
          </div>

          <div className="bg-white shadow-xl rounded-2xl p-8 border">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-4">
              <div>
                <h3 className="text-xl font-semibold">Machine Learning Engineer · Open Project</h3>
                <p className="text-gray-600">Feb 2026 – May 2026</p>
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed">
              Engineered spatial ML pipelines and regression models using PyTorch and scikit-learn, with a focus on feature engineering, high-dimensional geospatial data ingestion, and robust cross-validation strategies for multi-source datasets.
            </p>
          </div>

          <div className="bg-white shadow-xl rounded-2xl p-8 border">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-4">
              <div>
                <h3 className="text-xl font-semibold">Private Mathematics Tutor</h3>
                <p className="text-gray-600">Jan 2024 – Sep 2025</p>
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed">
              Delivered first-principles tutoring for calculus, linear algebra, and statistics while helping students improve exam performance through structured problem libraries and consistent, high-impact sessions.
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
