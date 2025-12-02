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
} from "react-icons/fa";
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
        <div className="absolute top-1/3 left-0 w-80 h-80 bg-[#10b981]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-0 w-96 h-96 bg-[#00f5ff]/5 rounded-full blur-3xl" />
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
