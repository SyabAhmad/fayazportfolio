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
} from "react-icons/fa";
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
        <div className="absolute top-1/4 right-0 w-72 h-72 bg-[#00f5ff]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-[#a855f7]/5 rounded-full blur-3xl" />
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
