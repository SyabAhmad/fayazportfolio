import React, { useEffect, useRef, useState } from "react";
import {
  FaBook,
  FaFilePdf,
  FaCalendarAlt,
  FaUserFriends,
  FaExternalLinkAlt,
  FaFlask,
  FaMicroscope,
  FaAtom,
  FaUniversity,
  FaChalkboardTeacher,
  FaVial,
  FaDna,
  FaFeatherAlt,
} from "react-icons/fa";
import {
  GiMolecule,
  GiTestTubes,
  GiChemicalDrop,
  GiDna2,
} from "react-icons/gi";
import publicationsData from "../data/publicationsData.json";

const Publications = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("publications");
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

  const statusColors = {
    Published: {
      bg: "rgba(16, 185, 129, 0.1)",
      text: "#10b981",
      border: "rgba(16, 185, 129, 0.3)",
    },
    Submitted: {
      bg: "rgba(0, 245, 255, 0.1)",
      text: "#00f5ff",
      border: "rgba(0, 245, 255, 0.3)",
    },
    "Under Preparation": {
      bg: "rgba(249, 115, 22, 0.1)",
      text: "#f97316",
      border: "rgba(249, 115, 22, 0.3)",
    },
  };

  return (
    <section id="publications" className="py-20 relative" ref={sectionRef}>
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Glowing orbs */}
        <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-[#ec4899]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-[#10b981]/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-0 w-72 h-72 bg-[#00f5ff]/5 rounded-full blur-3xl" />

        {/* Floating Publication/Lab Icons - hidden on mobile */}
        <div className="floating-icon absolute top-[5%] right-[5%] text-pink-500/15 animate-float">
          <FaBook className="text-5xl md:text-7xl" />
        </div>
        <div className="floating-icon absolute top-[20%] left-[8%] text-cyan-500/15 animate-float delay-300">
          <FaAtom className="text-4xl md:text-6xl animate-spin-slow" />
        </div>
        <div className="floating-icon absolute bottom-[25%] right-[10%] text-purple-500/10 animate-float delay-500">
          <FaFlask className="text-4xl md:text-5xl" />
        </div>
        <div className="floating-icon absolute top-[50%] left-[3%] text-green-500/10 animate-float delay-200">
          <FaMicroscope className="text-4xl md:text-6xl" />
        </div>
        <div className="floating-icon absolute bottom-[10%] left-[15%] text-pink-500/10 animate-float delay-700">
          <GiMolecule className="text-6xl md:text-8xl" />
        </div>
        <div className="floating-icon absolute top-[70%] right-[5%] text-cyan-500/10 animate-float delay-400">
          <GiDna2 className="text-4xl md:text-6xl" />
        </div>
        <div className="floating-icon absolute top-[35%] right-[15%] text-orange-500/10 animate-float delay-600">
          <FaFeatherAlt className="text-3xl md:text-4xl" />
        </div>
        <div className="floating-icon absolute bottom-[40%] left-[5%] text-purple-500/10 animate-float delay-100">
          <GiTestTubes className="text-4xl md:text-5xl" />
        </div>

        {/* Molecular SVG */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.03]">
          <defs>
            <linearGradient
              id="pubGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#ec4899" />
              <stop offset="50%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#00f5ff" />
            </linearGradient>
          </defs>
          <g stroke="url(#pubGradient)" strokeWidth="1" fill="none">
            <polygon
              points="100,50 150,75 150,125 100,150 50,125 50,75"
              transform="translate(100, 50)"
            />
            <polygon
              points="100,50 150,75 150,125 100,150 50,125 50,75"
              transform="translate(800, 120) scale(1.2)"
            />
            <polygon
              points="100,50 150,75 150,125 100,150 50,125 50,75"
              transform="translate(50, 380) scale(0.8)"
            />
            <polygon
              points="100,50 150,75 150,125 100,150 50,125 50,75"
              transform="translate(850, 450)"
            />
          </g>
        </svg>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-4">
            <FaBook className="text-4xl text-[#ec4899] animate-glow-pulse" />
            <h2 className="text-4xl sm:text-5xl font-bold gradient-text">
              Research Output
            </h2>
          </div>
          <p className="text-[#94a3b8] max-w-2xl mx-auto">
            My contributions to scientific literature, from peer-reviewed
            publications to conference participations.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-4 mb-12">
          <button
            onClick={() => setActiveTab("publications")}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
              activeTab === "publications"
                ? "glass text-[#ec4899] shadow-lg"
                : "text-[#94a3b8] hover:text-white hover:bg-white/5"
            }`}
            style={{
              boxShadow:
                activeTab === "publications"
                  ? "0 0 20px rgba(236, 72, 153, 0.3)"
                  : "none",
            }}
          >
            <FaFilePdf />
            Publications ({publicationsData.publications.length})
          </button>
          <button
            onClick={() => setActiveTab("conferences")}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
              activeTab === "conferences"
                ? "glass text-[#00f5ff] shadow-lg"
                : "text-[#94a3b8] hover:text-white hover:bg-white/5"
            }`}
            style={{
              boxShadow:
                activeTab === "conferences"
                  ? "0 0 20px rgba(0, 245, 255, 0.3)"
                  : "none",
            }}
          >
            <FaChalkboardTeacher />
            Conferences ({publicationsData.conferences.length})
          </button>
        </div>

        {/* Publications */}
        {activeTab === "publications" && (
          <div className="space-y-6">
            {[...publicationsData.publications].sort((a, b) => b.year - a.year).map((pub, index) => {
              const statusStyle =
                statusColors[pub.status] || statusColors.Published;
              return (
                <div
                  key={pub.id}
                  className={`glass rounded-2xl p-6 card-hover transition-all duration-700 ${
                    isVisible
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 -translate-x-10"
                  }`}
                  style={{
                    animationDelay: `${index * 150}ms`,
                    borderLeft: `4px solid ${statusStyle.text}`,
                  }}
                >
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3 mb-2">
                        <span
                          className="px-3 py-1 rounded-full text-xs font-medium"
                          style={{
                            background: statusStyle.bg,
                            color: statusStyle.text,
                            border: `1px solid ${statusStyle.border}`,
                          }}
                        >
                          {pub.status}
                        </span>
                        <span className="flex items-center gap-1 text-sm text-[#94a3b8]">
                          <FaCalendarAlt className="text-xs" />
                          {pub.year}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-[#f8fafc] hover:text-[#ec4899] transition-colors">
                        {pub.title}
                      </h3>
                    </div>
                    {pub.doi && (
                      <a
                        href={`https://doi.org/${pub.doi}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#ec4899]/10 text-[#ec4899] hover:bg-[#ec4899]/20 transition-all"
                      >
                        <FaExternalLinkAlt className="text-sm" />
                        View Paper
                      </a>
                    )}
                  </div>

                  {pub.authors && (
                    <div className="flex items-start gap-2 mb-3 text-sm text-[#94a3b8]">
                      <FaUserFriends className="mt-0.5 flex-shrink-0" />
                      <span>{pub.authors}</span>
                    </div>
                  )}

                  {pub.journal && (
                    <div className="flex items-center gap-2 mb-3 text-sm text-[#00f5ff]">
                      <FaBook className="flex-shrink-0" />
                      <span className="italic">{pub.journal}</span>
                    </div>
                  )}

                  <p className="text-sm text-[#cbd5e1] leading-relaxed">
                    {pub.abstract}
                  </p>
                </div>
              );
            })}
          </div>
        )}

        {/* Conferences */}
        {activeTab === "conferences" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {publicationsData.conferences.map((conf, index) => (
              <div
                key={conf.id}
                className={`glass rounded-2xl p-6 card-hover transition-all duration-700 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div
                    className="p-3 rounded-xl"
                    style={{
                      background:
                        conf.type === "Workshop"
                          ? "rgba(168, 85, 247, 0.1)"
                          : "rgba(0, 245, 255, 0.1)",
                    }}
                  >
                    {conf.type === "Workshop" ? (
                      <FaMicroscope className="text-xl text-[#a855f7]" />
                    ) : (
                      <FaUniversity className="text-xl text-[#00f5ff]" />
                    )}
                  </div>
                  <span
                    className="px-3 py-1 rounded-full text-xs font-medium"
                    style={{
                      background:
                        conf.type === "Workshop"
                          ? "rgba(168, 85, 247, 0.1)"
                          : "rgba(0, 245, 255, 0.1)",
                      color: conf.type === "Workshop" ? "#a855f7" : "#00f5ff",
                      border: `1px solid ${
                        conf.type === "Workshop"
                          ? "rgba(168, 85, 247, 0.3)"
                          : "rgba(0, 245, 255, 0.3)"
                      }`,
                    }}
                  >
                    {conf.type}
                  </span>
                </div>

                <h4 className="text-base font-bold text-[#f8fafc] mb-3 line-clamp-3">
                  {conf.title}
                </h4>

                <p className="text-sm text-[#94a3b8] mb-4">
                  {conf.organization}
                </p>

                <div className="flex items-center gap-2 text-sm text-[#10b981]">
                  <FaCalendarAlt />
                  {conf.year}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Stats Summary */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            {
              label: "Published",
              value: publicationsData.publications.filter(
                (p) => p.status === "Published"
              ).length,
              color: "#10b981",
            },
            {
              label: "Submitted",
              value: publicationsData.publications.filter(
                (p) => p.status === "Submitted"
              ).length,
              color: "#00f5ff",
            },
            {
              label: "In Progress",
              value: publicationsData.publications.filter(
                (p) => p.status === "Under Preparation"
              ).length,
              color: "#f97316",
            },
            {
              label: "Conferences",
              value: publicationsData.conferences.length,
              color: "#a855f7",
            },
          ].map((stat, index) => (
            <div key={stat.label} className="glass rounded-xl p-4 text-center">
              <div
                className="text-3xl font-bold mb-1"
                style={{ color: stat.color }}
              >
                {stat.value}
              </div>
              <div className="text-sm text-[#94a3b8]">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Publications;
