"use client";

import { TrendingUp, Wrench, PhoneOutgoing } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}

const FeatureCard = ({ icon, title, subtitle }: FeatureCardProps) => {
  return (
    <motion.li 
      whileHover={{ y: -4 }}
      className="bg-slate-800 text-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition flex flex-col justify-between h-full"
    >
      <div className="text-yellow-500" aria-hidden="true">
        {icon}
      </div>
      <div className="flex flex-col mt-4">
        <h3 className="font-semibold">{title}</h3>
        <p className="text-sm text-gray-300">{subtitle}</p>
      </div>
    </motion.li>
  );
};

const Stats = () => {
  const features = [
    {
      icon: <TrendingUp className="text-yellow-500 h-6 w-6" />,
      title: "Google Ads",
      subtitle: "Campagnes optimisées pour votre secteur"
    },
    {
      icon: <Wrench className="text-yellow-500 h-6 w-6" />,
      title: "Site internet",
      subtitle: "Personnalisé pour votre activité"
    },
    {
      icon: <PhoneOutgoing className="text-yellow-500 h-6 w-6" />,
      title: "Jusqu'à 10",
      subtitle: "Demandes qualifiées par jour"
    }
  ];

  return (
    <section className="w-full relative py-12">
      <div className="mx-auto w-full max-w-5xl px-4 lg:px-8">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="w-full md:w-[40%] bg-slate-100/60 rounded-2xl p-6 shadow-md">
            <h2 className="text-xl md:text-2xl font-semibold text-slate-700 mb-4 flex items-center gap-2">
              <span>
                Comment{" "}
                <span className="text-yellow-500">Trouver-Mon-Chantier.fr</span>{" "}
                vous ramène des chantiers chaque semaine ?
              </span>
              <svg className="inline-block ml-1" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </h2>
          </div>
          
          <ul className="grid grid-cols-1 sm:grid-cols-3 gap-5 w-full md:w-[60%]">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                subtitle={feature.subtitle}
              />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Stats;
