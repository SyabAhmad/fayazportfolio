import React, { useEffect, useRef, useState } from "react";
import {
  FaGraduationCap,
  FaAtom,
  FaCertificate,
  FaMedal,
  FaCalendarAlt,
  FaUniversity,
  FaBook,
  FaStar,
  FaFlask,
  FaMicroscope,
  FaVial,
  FaDna,
} from "react-icons/fa";
import { GiMolecule, GiTestTubes, GiDna1, GiAtom } from "react-icons/gi";
import educationData from "../data/educationData.json";

const Education = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="education" className="py-20 relative" ref={sectionRef}>
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Glowing orbs */}
        <div className="absolute top-1/3 left-0 w-80 h-80 bg-[#10b981]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-0 w-96 h-96 bg-[#00f5ff]/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-[#a855f7]/5 rounded-full blur-3xl" />

        {/* Floating Education/Lab Icons */}
        <div className="floating-icon absolute top-[8%] left-[5%] text-green-500/15 animate-float">
          <FaGraduationCap className="text-6xl md:text-8xl" />
        </div>
        <div className="floating-icon absolute top-[15%] right-[10%] text-cyan-500/15 animate-float delay-300">
          <FaAtom className="text-4xl md:text-6xl animate-spin-slow" />
        </div>
        <div className="floating-icon absolute bottom-[20%] left-[8%] text-purple-500/10 animate-float delay-500">
          <FaFlask className="text-4xl md:text-5xl" />
        </div>
        <div className="floating-icon absolute top-[45%] right-[5%] text-pink-500/10 animate-float delay-200">
          <FaMicroscope className="text-4xl md:text-6xl" />
        </div>
        <div className="floating-icon absolute bottom-[10%] right-[15%] text-green-500/10 animate-float delay-700">
          <GiMolecule className="text-5xl md:text-7xl" />
        </div>
        <div className="floating-icon absolute top-[65%] left-[3%] text-cyan-500/10 animate-float delay-400">
          <GiDna1 className="text-4xl md:text-6xl" />
        </div>
        <div className="floating-icon absolute bottom-[35%] right-[3%] text-orange-500/10 animate-float delay-600">
          <FaBook className="text-4xl md:text-5xl" />
        </div>
        <div className="floating-icon absolute top-[30%] left-[12%] text-purple-500/10 animate-float delay-100">
          <GiTestTubes className="text-4xl md:text-5xl" />
        </div>

        {/* Molecular SVG */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.03]">
          <defs>
            <linearGradient
              id="eduGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="50%" stopColor="#00f5ff" />
              <stop offset="100%" stopColor="#a855f7" />
            </linearGradient>
          </defs>
          <g stroke="url(#eduGradient)" strokeWidth="1" fill="none">
            <polygon
              points="100,50 150,75 150,125 100,150 50,125 50,75"
              transform="translate(50, 100)"
            />
            <polygon
              points="100,50 150,75 150,125 100,150 50,125 50,75"
              transform="translate(850, 150) scale(1.1)"
            />
            <polygon
              points="100,50 150,75 150,125 100,150 50,125 50,75"
              transform="translate(750, 450) scale(0.9)"
            />
          </g>
        </svg>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-4">
            <FaGraduationCap className="text-4xl text-[#10b981] animate-float" />
            <h2 className="text-4xl sm:text-5xl font-bold gradient-text">
              Academic Journey
            </h2>
          </div>
          <p className="text-[#94a3b8] max-w-2xl mx-auto">
            My educational path in chemistry, from foundational studies to
            advanced research in nanomaterials and organic synthesis.
          </p>
        </div>

        {/* Education Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {educationData.education.map((edu, index) => (
            <div
              key={edu.id}
              className={`glass rounded-3xl p-8 card-hover relative overflow-hidden transition-all duration-700 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{
                animationDelay: `${index * 200}ms`,
                borderTop: `4px solid ${index === 0 ? "#00f5ff" : "#a855f7"}`,
              }}
            >
              {/* Decorative element */}
              <div
                className="absolute top-0 right-0 w-32 h-32 opacity-10"
                style={{
                  background: `radial-gradient(circle, ${
                    index === 0 ? "#00f5ff" : "#a855f7"
                  } 0%, transparent 70%)`,
                }}
              />

              {/* Header */}
              <div className="flex items-start gap-4 mb-6">
                <div
                  className="p-4 rounded-2xl"
                  style={{
                    background:
                      index === 0
                        ? "rgba(0, 245, 255, 0.1)"
                        : "rgba(168, 85, 247, 0.1)",
                  }}
                >
                  <FaUniversity
                    className="text-3xl"
                    style={{ color: index === 0 ? "#00f5ff" : "#a855f7" }}
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <FaCalendarAlt className="text-sm text-[#94a3b8]" />
                    <span className="text-sm text-[#94a3b8]">{edu.period}</span>
                  </div>
                  <h3 className="text-xl font-bold text-[#f8fafc] mb-1">
                    {edu.degree}
                  </h3>
                  <p className="text-[#94a3b8]">{edu.institution}</p>
                </div>
              </div>

              {/* GPA Badge */}
              <div className="flex items-center gap-4 mb-6">
                <div
                  className="flex items-center gap-2 px-4 py-2 rounded-full"
                  style={{
                    background:
                      index === 0
                        ? "rgba(0, 245, 255, 0.1)"
                        : "rgba(168, 85, 247, 0.1)",
                    border: `1px solid ${
                      index === 0
                        ? "rgba(0, 245, 255, 0.3)"
                        : "rgba(168, 85, 247, 0.3)"
                    }`,
                  }}
                >
                  <FaStar
                    style={{ color: index === 0 ? "#00f5ff" : "#a855f7" }}
                  />
                  <span
                    className="font-bold"
                    style={{ color: index === 0 ? "#00f5ff" : "#a855f7" }}
                  >
                    CGPA: {edu.gpa}
                  </span>
                </div>
              </div>

              {/* Thesis */}
              <div className="mb-6">
                <div className="flex items-center gap-2 text-sm text-[#94a3b8] mb-2">
                  <FaBook
                    style={{ color: index === 0 ? "#00f5ff" : "#a855f7" }}
                  />
                  <span>Thesis</span>
                </div>
                <p
                  className="text-[#cbd5e1] text-sm italic pl-5 border-l-2"
                  style={{ borderColor: index === 0 ? "#00f5ff" : "#a855f7" }}
                >
                  "{edu.thesis}"
                </p>
              </div>

              {/* Highlights */}
              <div>
                <div className="flex items-center gap-2 text-sm text-[#94a3b8] mb-3">
                  <FaAtom
                    style={{ color: index === 0 ? "#00f5ff" : "#a855f7" }}
                  />
                  <span>Key Highlights</span>
                </div>
                <ul className="space-y-2">
                  {edu.highlights.map((highlight, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm text-[#cbd5e1]"
                    >
                      <span
                        className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{
                          background: index === 0 ? "#00f5ff" : "#a855f7",
                        }}
                      />
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Certifications */}
        <div>
          <h3 className="text-2xl font-bold text-center mb-8 text-[#f8fafc]">
            <FaCertificate className="inline-block mr-3 text-[#f97316]" />
            Certifications & Achievements
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {educationData.certifications.map((cert, index) => (
              <div
                key={cert.id}
                className={`glass rounded-2xl p-6 text-center card-hover transition-all duration-700 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{ animationDelay: `${(index + 2) * 200}ms` }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#f97316]/10 mb-4">
                  <FaMedal className="text-2xl text-[#f97316]" />
                </div>
                <h4 className="text-lg font-bold text-[#f8fafc] mb-1">
                  {cert.title}
                </h4>
                <p className="text-sm text-[#94a3b8] mb-2">{cert.issuer}</p>
                <span className="inline-block px-3 py-1 rounded-full text-xs bg-[#f97316]/10 text-[#f97316]">
                  {cert.year}
                </span>
                <p className="text-xs text-[#94a3b8] mt-3">
                  {cert.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
