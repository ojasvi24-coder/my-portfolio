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

      {/* FOOTER */}
      <footer className="text-center text-gray-400 pb-10">
        © {new Date().getFullYear()} Ojasvi Shrivastava
      </footer>
    </div>
  );
}
