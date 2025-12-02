import React, { useEffect, useRef, useState } from "react";
import {
  FaMicroscope,
  FaFlask,
  FaAtom,
  FaGraduationCap,
  FaVial,
  FaIndustry,
  FaChalkboardTeacher,
  FaArrowRight,
  FaDna,
  FaSyringe,
  FaThermometerHalf,
} from "react-icons/fa";
import {
  GiMolecule,
  GiTestTubes,
  GiChemicalDrop,
  GiAtom,
} from "react-icons/gi";
import experienceData from "../data/experienceData.json";

const Experience = () => {
  const [visibleItems, setVisibleItems] = useState([]);
  const sectionRef = useRef(null);

  const iconMap = {
    industry: FaIndustry,
    research: FaAtom,
    education: FaChalkboardTeacher,
  };

  const colorMap = {
    industry: { primary: "#00f5ff", secondary: "#0891b2" },
    research: { primary: "#a855f7", secondary: "#7c3aed" },
    education: { primary: "#10b981", secondary: "#059669" },
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.dataset.id;
            setVisibleItems((prev) => [...new Set([...prev, id])]);
          }
        });
      },
      { threshold: 0.2 }
    );

    const items = document.querySelectorAll(".experience-card");
    items.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="experience" className="py-20 relative" ref={sectionRef}>
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Glowing orbs */}
        <div className="absolute top-1/4 right-0 w-72 h-72 bg-[#00f5ff]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-[#a855f7]/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-[#ec4899]/5 rounded-full blur-3xl" />

        {/* Floating Lab Icons - hidden on mobile */}
        <div className="floating-icon absolute top-[5%] right-[8%] text-cyan-500/15 animate-float">
          <FaMicroscope className="text-5xl md:text-7xl" />
        </div>
        <div className="floating-icon absolute top-[20%] left-[5%] text-purple-500/15 animate-float delay-300">
          <FaAtom className="text-4xl md:text-6xl animate-spin-slow" />
        </div>
        <div className="floating-icon absolute bottom-[15%] right-[5%] text-pink-500/10 animate-float delay-500">
          <FaFlask className="text-4xl md:text-5xl" />
        </div>
        <div className="floating-icon absolute top-[50%] left-[3%] text-green-500/10 animate-float delay-200">
          <FaDna className="text-4xl md:text-6xl" />
        </div>
        <div className="floating-icon absolute bottom-[30%] left-[10%] text-cyan-500/10 animate-float delay-700">
          <GiMolecule className="text-6xl md:text-8xl" />
        </div>
        <div className="floating-icon absolute top-[70%] right-[12%] text-purple-500/10 animate-float delay-400">
          <GiTestTubes className="text-4xl md:text-5xl" />
        </div>
        <div className="floating-icon absolute top-[35%] right-[3%] text-orange-500/10 animate-float delay-600">
          <FaSyringe className="text-3xl md:text-4xl rotate-45" />
        </div>
        <div className="floating-icon absolute bottom-[5%] left-[25%] text-cyan-500/10 animate-float delay-100">
          <GiAtom className="text-4xl md:text-6xl animate-spin-slow" />
        </div>

        {/* Molecular SVG */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.03]">
          <defs>
            <linearGradient
              id="expGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#00f5ff" />
              <stop offset="50%" stopColor="#a855f7" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>
          </defs>
          <g stroke="url(#expGradient)" strokeWidth="1" fill="none">
            <polygon
              points="100,50 150,75 150,125 100,150 50,125 50,75"
              transform="translate(100, 80)"
            />
            <polygon
              points="100,50 150,75 150,125 100,150 50,125 50,75"
              transform="translate(800, 200) scale(1.2)"
            />
            <polygon
              points="100,50 150,75 150,125 100,150 50,125 50,75"
              transform="translate(50, 400) scale(0.8)"
            />
            <polygon
              points="100,50 150,75 150,125 100,150 50,125 50,75"
              transform="translate(900, 500)"
            />
          </g>
        </svg>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-4">
            <FaMicroscope className="text-4xl text-[#00f5ff] animate-glow-pulse" />
            <h2 className="text-4xl sm:text-5xl font-bold gradient-text">
              Research Journey
            </h2>
          </div>
          <p className="text-[#94a3b8] max-w-2xl mx-auto">
            A chronicle of my academic and professional experience in chemistry
            research, pharmaceutical analysis, and scientific discovery.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#00f5ff] via-[#a855f7] to-[#ec4899]" />

          <div className="space-y-12">
            {experienceData.experiences.map((exp, index) => {
              const IconComponent = iconMap[exp.type] || FaFlask;
              const colors = colorMap[exp.type] || colorMap.research;
              const isEven = index % 2 === 0;
              const isVisible = visibleItems.includes(String(exp.id));

              return (
                <div
                  key={exp.id}
                  data-id={exp.id}
                  className={`experience-card relative flex flex-col md:flex-row items-center gap-8 ${
                    isEven ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Timeline dot */}
                  <div
                    className="absolute left-8 md:left-1/2 w-4 h-4 rounded-full transform -translate-x-1/2 z-10"
                    style={{
                      background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
                      boxShadow: `0 0 20px ${colors.primary}40`,
                    }}
                  />

                  {/* Content Card */}
                  <div
                    className={`w-full md:w-[calc(50%-3rem)] ml-16 md:ml-0 transition-all duration-700 ${
                      isVisible
                        ? "opacity-100 translate-x-0"
                        : isEven
                        ? "opacity-0 -translate-x-10"
                        : "opacity-0 translate-x-10"
                    }`}
                  >
                    <div
                      className="glass rounded-2xl p-6 card-hover group"
                      style={{ borderLeft: `3px solid ${colors.primary}` }}
                    >
                      {/* Header */}
                      <div className="flex items-start gap-4 mb-4">
                        <div
                          className="p-3 rounded-xl"
                          style={{ background: `${colors.primary}15` }}
                        >
                          <IconComponent
                            className="text-2xl"
                            style={{ color: colors.primary }}
                          />
                        </div>
                        <div className="flex-1">
                          <span
                            className="inline-block px-3 py-1 rounded-full text-xs font-medium mb-2"
                            style={{
                              background: `${colors.primary}15`,
                              color: colors.primary,
                            }}
                          >
                            {exp.period}
                          </span>
                          <h3 className="text-xl font-bold text-[#f8fafc] group-hover:text-[#00f5ff] transition-colors">
                            {exp.title}
                          </h3>
                          <p className="text-[#94a3b8] text-sm">
                            {exp.organization}
                          </p>
                        </div>
                      </div>

                      {/* Description */}
                      <ul className="space-y-2 mb-4">
                        {exp.description.map((desc, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2 text-[#cbd5e1] text-sm"
                          >
                            <FaArrowRight
                              className="text-xs mt-1.5 flex-shrink-0"
                              style={{ color: colors.primary }}
                            />
                            <span>{desc}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2">
                        {exp.tags.map((tag, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 rounded-full text-xs font-medium glass hover:scale-105 transition-transform cursor-default"
                            style={{
                              borderColor: `${colors.primary}30`,
                              color: colors.primary,
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Empty space for timeline alignment */}
                  <div className="hidden md:block w-[calc(50%-3rem)]" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
