import React, { useState, useEffect, useRef } from "react";
import {
  FaFlask,
  FaLaptopCode,
  FaMicroscope,
  FaAtom,
  FaBrain,
  FaVial,
  FaDna,
  FaSyringe,
  FaThermometerHalf,
  FaFire,
  FaRadiation,
  FaEyeDropper,
} from "react-icons/fa";
import {
  GiMolecule,
  GiChemicalDrop,
  GiTestTubes,
  GiMicroscope,
  GiAtom,
  GiDna1,
  GiDna2,
  GiChemicalTank,
} from "react-icons/gi";
import skillsData from "../data/skillsdata.json";

const Skills = () => {
  const [filter, setFilter] = useState("all");
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  // Transform data into "Periodic Table Elements"
  const categories = [
    {
      id: "computational_chemistry",
      label: "Computational",
      icon: FaLaptopCode,
      color: "cyan",
      hex: "#00f5ff",
      group: "Noble Gases",
    },
    {
      id: "analytical_chemistry",
      label: "Analytical",
      icon: FaMicroscope,
      color: "purple",
      hex: "#a855f7",
      group: "Transition Metals",
    },
    {
      id: "synthesis_techniques",
      label: "Synthesis",
      icon: FaFlask,
      color: "pink",
      hex: "#ec4899",
      group: "Reactive Nonmetals",
    },
    {
      id: "laboratory_and_general_skills",
      label: "Laboratory",
      icon: FaBrain,
      color: "green",
      hex: "#10b981",
      group: "Alkali Metals",
    },
    {
      id: "software_and_digital_tools",
      label: "Software",
      icon: FaLaptopCode,
      color: "blue",
      hex: "#3b82f6",
      group: "Metalloids",
    },
  ];

  // Flatten data for the grid
  const getAllSkills = () => {
    let elements = [];
    let atomicNumber = 1;

    Object.entries(skillsData.skills).forEach(([catKey, subCats]) => {
      const categoryConfig = categories.find((c) => c.id === catKey);

      // Handle arrays directly (like pharmacology_and_biological_evaluation)
      if (Array.isArray(subCats)) {
        const fallbackConfig = {
          label: catKey
            .split("_")
            .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
            .join(" "),
          color: "orange",
          hex: "#f97316",
        };
        const config = categoryConfig || fallbackConfig;

        const nameWords = catKey.split("_");
        let symbol =
          nameWords.length > 1
            ? nameWords[0][0] + nameWords[1][0]
            : nameWords[0].substring(0, 2);
        symbol = symbol.charAt(0).toUpperCase() + symbol.slice(1);

        elements.push({
          atomicNumber: atomicNumber++,
          symbol: symbol,
          name: config.label,
          category: catKey,
          categoryLabel: config.label,
          color: config.color,
          hex: config.hex,
          mass: (Math.random() * 100 + 10).toFixed(2),
          tools: subCats,
        });
        return;
      }

      if (!categoryConfig) return;

      Object.entries(subCats).forEach(([skillName, tools]) => {
        const nameWords = skillName.split("_");
        let symbol =
          nameWords.length > 1
            ? nameWords[0][0] + nameWords[1][0]
            : nameWords[0].substring(0, 2);
        symbol = symbol.charAt(0).toUpperCase() + symbol.slice(1);

        const formattedName = skillName
          .split("_")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");

        elements.push({
          atomicNumber: atomicNumber++,
          symbol: symbol,
          name: formattedName,
          category: catKey,
          categoryLabel: categoryConfig.label,
          color: categoryConfig.color,
          hex: categoryConfig.hex,
          mass: (Math.random() * 100 + 10).toFixed(2),
          tools: Array.isArray(tools) ? tools : [tools],
        });
      });
    });
    return elements;
  };

  const allElements = getAllSkills();
  const filteredElements =
    filter === "all"
      ? allElements
      : allElements.filter((el) => el.category === filter);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="py-24 relative min-h-screen flex flex-col justify-center"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Glowing orbs */}
        <div className="absolute top-20 right-20 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 left-1/3 w-72 h-72 bg-pink-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>

        {/* Floating Lab Equipment Icons - hidden on mobile */}
        <div className="floating-icon absolute top-[10%] left-[5%] text-cyan-500/20 animate-float">
          <FaFlask className="text-4xl md:text-6xl" />
        </div>
        <div className="floating-icon absolute top-[15%] right-[10%] text-purple-500/20 animate-float delay-300">
          <FaMicroscope className="text-5xl md:text-7xl" />
        </div>
        <div className="floating-icon absolute top-[40%] left-[3%] text-pink-500/15 animate-float delay-700">
          <FaVial className="text-4xl md:text-5xl" />
        </div>
        <div className="floating-icon absolute bottom-[30%] right-[5%] text-cyan-500/15 animate-float delay-200">
          <FaAtom className="text-6xl md:text-8xl animate-spin-slow" />
        </div>
        <div className="floating-icon absolute bottom-[15%] left-[15%] text-green-500/15 animate-float delay-500">
          <FaDna className="text-5xl md:text-6xl" />
        </div>
        <div className="floating-icon absolute top-[60%] right-[12%] text-purple-500/10 animate-float delay-100">
          <FaSyringe className="text-4xl md:text-5xl rotate-45" />
        </div>
        <div className="floating-icon absolute top-[25%] left-[20%] text-orange-500/15 animate-float delay-600">
          <FaThermometerHalf className="text-3xl md:text-4xl" />
        </div>
        <div className="floating-icon absolute bottom-[40%] left-[8%] text-yellow-500/10 animate-float delay-400">
          <FaFire className="text-4xl md:text-5xl" />
        </div>
        <div className="floating-icon absolute top-[70%] left-[25%] text-cyan-500/10 animate-float delay-800">
          <FaEyeDropper className="text-3xl md:text-4xl" />
        </div>
        <div className="floating-icon absolute top-[5%] left-[40%] text-purple-500/15 animate-float delay-200">
          <GiMolecule className="text-7xl md:text-9xl" />
        </div>
        <div className="floating-icon absolute bottom-[10%] right-[20%] text-pink-500/10 animate-float delay-700">
          <GiTestTubes className="text-5xl md:text-7xl" />
        </div>
        <div className="floating-icon absolute top-[50%] right-[3%] text-green-500/10 animate-float delay-300">
          <GiChemicalDrop className="text-4xl md:text-6xl" />
        </div>
        <div className="floating-icon absolute bottom-[5%] left-[45%] text-cyan-500/15 animate-float delay-500">
          <GiDna1 className="text-6xl md:text-8xl" />
        </div>
        <div className="floating-icon absolute top-[35%] right-[25%] text-purple-500/10 animate-float delay-100">
          <GiAtom className="text-5xl md:text-7xl animate-spin-slow" />
        </div>
        <div className="floating-icon absolute bottom-[25%] right-[35%] text-orange-500/10 animate-float delay-600">
          <GiChemicalTank className="text-4xl md:text-5xl" />
        </div>

        {/* Molecular Bond Lines */}
        <svg className="absolute inset-0 w-full h-full opacity-5">
          <defs>
            <linearGradient
              id="bondGradient"
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
          {/* Hexagonal molecular structure */}
          <g stroke="url(#bondGradient)" strokeWidth="1" fill="none">
            <polygon
              points="100,50 150,75 150,125 100,150 50,125 50,75"
              transform="translate(50, 100)"
            />
            <polygon
              points="100,50 150,75 150,125 100,150 50,125 50,75"
              transform="translate(200, 300) scale(1.5)"
            />
            <polygon
              points="100,50 150,75 150,125 100,150 50,125 50,75"
              transform="translate(800, 150) scale(0.8)"
            />
            <polygon
              points="100,50 150,75 150,125 100,150 50,125 50,75"
              transform="translate(900, 400)"
            />
            <polygon
              points="100,50 150,75 150,125 100,150 50,125 50,75"
              transform="translate(600, 500) scale(1.2)"
            />
          </g>
          {/* Connection lines */}
          <line
            x1="200"
            y1="175"
            x2="350"
            y2="375"
            stroke="url(#bondGradient)"
            strokeWidth="0.5"
          />
          <line
            x1="950"
            y1="200"
            x2="1000"
            y2="450"
            stroke="url(#bondGradient)"
            strokeWidth="0.5"
          />
        </svg>

        {/* Floating particles */}
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-cyan-500/30"
            style={{
              width: `${3 + Math.random() * 5}px`,
              height: `${3 + Math.random() * 5}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${6 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-4 px-4 py-2 rounded-full glass border border-white/10">
            <FaAtom className="text-2xl text-[#00f5ff]" />
            <span className="text-[#00f5ff] font-mono tracking-wider">
              SYSTEM.ANALYSIS
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="text-white">Periodic Table of </span>
            <span className="gradient-text">Expertise</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            My technical capabilities organized by elemental properties. Explore
            the composition of my research and analytical skillset.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-12 px-2">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 sm:px-6 py-2 text-sm sm:text-base rounded-full border transition-all duration-300 ${
              filter === "all"
                ? "bg-white/10 border-white/30 text-white shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                : "border-white/5 text-gray-500 hover:border-white/20 hover:text-gray-300"
            }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id)}
              className="px-3 sm:px-6 py-2 text-sm sm:text-base rounded-full border flex items-center gap-1 sm:gap-2 transition-all duration-300"
              style={{
                borderColor:
                  filter === cat.id ? cat.hex : "rgba(255,255,255,0.05)",
                color: filter === cat.id ? cat.hex : "rgb(107,114,128)",
                backgroundColor:
                  filter === cat.id ? `${cat.hex}15` : "transparent",
                boxShadow: filter === cat.id ? `0 0 15px ${cat.hex}40` : "none",
              }}
            >
              <cat.icon />
              {cat.label}
            </button>
          ))}
        </div>

        {/* Periodic Table Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {filteredElements.map((el, index) => (
            <div
              key={index}
              className={`group relative aspect-square cursor-pointer transition-all duration-500 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-20"
              }`}
              style={{ transitionDelay: `${index * 50}ms` }}
              onMouseEnter={() => setSelectedSkill(el)}
              onMouseLeave={() => setSelectedSkill(null)}
            >
              {/* Card Content */}
              <div
                className="absolute inset-0 glass rounded-lg hover:bg-white/5 border border-white/10 transition-all duration-300 flex flex-col p-3 sm:p-4"
                style={{
                  borderColor:
                    selectedSkill?.atomicNumber === el.atomicNumber
                      ? el.hex
                      : "rgba(255,255,255,0.1)",
                  boxShadow:
                    selectedSkill?.atomicNumber === el.atomicNumber
                      ? `0 0 30px ${el.hex}20, inset 0 0 20px ${el.hex}10`
                      : "none",
                  transform:
                    selectedSkill?.atomicNumber === el.atomicNumber
                      ? "scale(1.05)"
                      : "scale(1)",
                }}
              >
                <div className="flex justify-between items-start mb-1">
                  <span className="text-xs font-mono text-gray-500">
                    {el.atomicNumber}
                  </span>
                  <span className="text-xs font-bold" style={{ color: el.hex }}>
                    {el.mass}
                  </span>
                </div>
                <div
                  className="flex-grow flex items-center justify-center text-4xl sm:text-5xl font-bold font-serif my-2"
                  style={{
                    color:
                      selectedSkill?.atomicNumber === el.atomicNumber
                        ? "#fff"
                        : el.hex,
                    textShadow:
                      selectedSkill?.atomicNumber === el.atomicNumber
                        ? `0 0 20px ${el.hex}`
                        : "none",
                  }}
                >
                  {el.symbol}
                </div>
                <div className="mt-auto">
                  <div className="text-xs sm:text-sm font-medium text-gray-300 truncate group-hover:text-white transition-colors">
                    {el.name}
                  </div>
                  <div className="text-[10px] text-gray-600 truncate mt-0.5">
                    {el.categoryLabel}
                  </div>
                </div>
              </div>

              {/* Tooltip / Detail Popover */}
              <div
                className={`absolute left-1/2 -translate-x-1/2 bottom-full mb-4 w-64 bg-[#0a0a1a] border border-white/20 rounded-xl p-4 shadow-2xl z-50 pointer-events-none transition-all duration-300 ${
                  selectedSkill?.atomicNumber === el.atomicNumber
                    ? "opacity-100 translate-y-0 scale-100"
                    : "opacity-0 translate-y-4 scale-95"
                }`}
              >
                <div className="flex items-center gap-2 mb-3 border-b border-white/10 pb-2">
                  <div
                    className="w-8 h-8 rounded flex items-center justify-center font-bold text-black"
                    style={{ background: el.hex }}
                  >
                    {el.symbol}
                  </div>
                  <div>
                    <div className="font-bold text-white text-sm">
                      {el.name}
                    </div>
                    <div className="text-xs text-gray-400">
                      {el.categoryLabel} Group
                    </div>
                  </div>
                </div>
                <div className="space-y-1">
                  {el.tools.map((tool, i) => (
                    <div
                      key={i}
                      className="text-xs text-gray-300 flex items-center gap-2"
                    >
                      <span
                        className="w-1 h-1 rounded-full"
                        style={{ background: el.hex }}
                      ></span>
                      {tool}
                    </div>
                  ))}
                </div>
                {/* Arrow */}
                <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-[#0a0a1a]"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Legend / Key */}
        <div className="mt-16 flex flex-wrap justify-center gap-8 opacity-60">
          {categories.map((cat) => (
            <div key={cat.id} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ background: cat.hex }}
              ></div>
              <span className="text-sm text-gray-400">{cat.group}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
