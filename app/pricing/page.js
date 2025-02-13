"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { CheckCircle, Info } from "lucide-react";

export default function Pricing() {
  const [billingCycle, setBillingCycle] = useState("monthly");

  const plans = [
    {
      name: "Basic",
      price: { monthly: "$9.99", yearly: "$99.99" },
      features: [
        { name: "Limited Content", description: "Access a selected range of content." },
        { name: "Standard Support", description: "Get support within 24 hours." },
        { name: "Basic Analytics", description: "Track your basic usage stats." },
        { name: "Community Access", description: "Join our open community forum." },
      ],
      borderColor: "border-[#4ADE80]",
      glow: "hover:shadow-[0px_0px_30px_rgba(74,222,128,0.8)]",
      defaultGlow: "",
    },
    {
      name: "Pro",
      price: { monthly: "$19.99", yearly: "$199.99" },
      features: [
        { name: "Full Content Access", description: "Unlock all premium content and features." },
        { name: "Priority Support", description: "Get a response within 2 hours." },
        { name: "Advanced Analytics", description: "Gain insights with in-depth stats." },
        { name: "Exclusive Community", description: "Access a members-only discussion group." },
        { name: "Offline Access", description: "Download content for offline use." },
        { name: "Ad-Free Experience", description: "Enjoy without any ads or interruptions." },
      ],
      borderColor: "border-[#E5970F]",
      glow: "hover:shadow-[0px_0px_50px_rgba(229,151,15,1)]",
      defaultGlow: "shadow-[0px_0px_20px_rgba(229,151,15,0.6)]",
    },
    {
      name: "Premium",
      price: { monthly: "$29.99", yearly: "$299.99" },
      features: [
        { name: "All Pro Features", description: "Includes everything from the Pro plan." },
        { name: "Personalized AI Insights", description: "AI-powered suggestions tailored for you." },
        { name: "1-on-1 Mentoring", description: "Private mentoring with industry experts." },
        { name: "VIP Lounge Access", description: "Join our exclusive networking events." },
        { name: "Early Feature Access", description: "Try out new features before anyone else." },
        { name: "Custom Integrations", description: "Seamlessly connect with external tools." },
      ],
      borderColor: "border-[#6366F1]",
      glow: "hover:shadow-[0px_0px_40px_rgba(99,102,241,0.9)]",
      defaultGlow: "",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0E1628] to-[#380643] text-white py-20 px-6 mt-20">
      <div className="max-w-6xl mx-auto text-center">
        <motion.h1
          className="text-5xl font-extrabold mb-6 bg-gradient-to-r from-[#E5970F] to-[#E69A10] text-transparent bg-clip-text"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          Choose Your Plan
        </motion.h1>
        <motion.p
          className="text-lg text-gray-300 mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
        >
          Unlock the best experience with our premium plans.
        </motion.p>

        {/* Billing Cycle Toggle */}
        <div className="flex justify-center mb-10">
          <div className="bg-gray-800 p-1 rounded-full flex">
            <button
              className={`py-2 px-6 rounded-full font-semibold transition-all ${
                billingCycle === "monthly" ? "bg-[#E5970F] text-black" : "text-gray-300"
              }`}
              onClick={() => setBillingCycle("monthly")}
            >
              Monthly
            </button>
            <button
              className={`py-2 px-6 rounded-full font-semibold transition-all ${
                billingCycle === "yearly" ? "bg-[#E5970F] text-black" : "text-gray-300"
              }`}
              onClick={() => setBillingCycle("yearly")}
            >
              Yearly <span className="text-sm text-green-400">(Save 20%)</span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-10">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              className={`relative bg-white/10 backdrop-blur-lg p-8 rounded-xl shadow-xl border ${plan.borderColor} transform transition-all duration-300 ${plan.defaultGlow} ${plan.glow}`}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
            >
              {index === 1 && (
                <span className="absolute top-0 right-0 bg-[#E5970F] text-black text-xs font-bold px-4 py-1 rounded-bl-lg">
                  Most Popular
                </span>
              )}
              <h3 className="text-2xl font-bold mb-4 text-[#E5970F]">{plan.name}</h3>
              <p className="text-4xl font-extrabold mb-6">{plan.price[billingCycle]}</p>
              
              <ul className="text-gray-300 mb-6 space-y-3">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center space-x-2 group relative">
                    <CheckCircle className="text-[#E5970F]" size={18} />
                    <span>{feature.name}</span>
                    <Info
                      className="ml-2 text-gray-400 group-hover:text-[#E5970F] cursor-pointer"
                      size={14}
                    />
                    <span className="absolute left-8 bg-gray-900 text-white text-xs rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition-all duration-300">
                      {feature.description}
                    </span>
                  </li>
                ))}
              </ul>

              <Link href="/signup">
                <button className="w-full bg-[#E5970F] text-black py-3 px-6 rounded-full font-semibold hover:bg-[#e69a10] transition-all duration-300">
                  Get Started
                </button>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
