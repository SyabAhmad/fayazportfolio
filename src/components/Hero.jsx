import React, { useEffect, useState } from "react";
import {
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaLinkedin,
  FaFlask,
  FaAtom,
  FaMicroscope,
  FaLaptopCode,
  FaDownload,
  FaArrowDown,
  FaVial,
  FaDna,
  FaSyringe,
} from "react-icons/fa";
import { GiMolecule, GiTestTubes, GiChemicalDrop } from "react-icons/gi";
import heroData from "../data/heroData.json";
import contactData from "../data/contactData.json";

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { hero } = heroData;
  const { personal, contact } = contactData;

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const iconMap = {
    atom: FaAtom,
    microscope: FaMicroscope,
    laptop: FaLaptopCode,
    flask: FaFlask,
  };

  // Generate floating particles
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 5}s`,
    duration: `${10 + Math.random() * 10}s`,
    size: `${2 + Math.random() * 4}px`,
  }));

  return (
    <section
      id="about"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00f5ff]/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#a855f7]/10 rounded-full blur-3xl animate-float delay-300" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-[#ec4899]/10 rounded-full blur-3xl animate-float delay-500" />

        {/* Floating Lab Equipment - hidden on small screens */}
        <div className="floating-icon absolute top-[8%] left-[5%] text-cyan-500/15 animate-float">
          <FaFlask className="text-5xl md:text-7xl" />
        </div>
        <div className="floating-icon absolute top-[15%] right-[8%] text-purple-500/20 animate-float delay-300">
          <FaAtom className="text-7xl md:text-9xl animate-spin-slow" />
        </div>
        <div className="floating-icon absolute top-[45%] left-[2%] text-pink-500/15 animate-float delay-500">
          <FaVial className="text-4xl md:text-5xl rotate-12" />
        </div>
        <div className="floating-icon absolute bottom-[20%] right-[5%] text-cyan-500/15 animate-float delay-200">
          <FaMicroscope className="text-6xl md:text-8xl" />
        </div>
        <div className="floating-icon absolute bottom-[35%] left-[8%] text-green-500/15 animate-float delay-700">
          <FaDna className="text-5xl md:text-6xl" />
        </div>
        <div className="floating-icon absolute top-[30%] right-[15%] text-purple-500/10 animate-float delay-400">
          <GiMolecule className="text-6xl md:text-8xl" />
        </div>
        <div className="floating-icon absolute bottom-[10%] left-[20%] text-cyan-500/10 animate-float delay-600">
          <GiTestTubes className="text-5xl md:text-6xl" />
        </div>
        <div className="floating-icon absolute top-[60%] right-[10%] text-pink-500/10 animate-float delay-100">
          <GiChemicalDrop className="text-4xl md:text-5xl" />
        </div>
        <div className="floating-icon absolute bottom-[5%] right-[30%] text-orange-500/10 animate-float delay-800">
          <FaSyringe className="text-4xl md:text-5xl rotate-45" />
        </div>

        {/* Floating particles */}
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute rounded-full bg-[#00f5ff]"
            style={{
              left: particle.left,
              bottom: "-10px",
              width: particle.size,
              height: particle.size,
              animation: `particle-float ${particle.duration} linear infinite`,
              animationDelay: particle.delay,
              opacity: 0.6,
            }}
          />
        ))}

        {/* Molecular Bond SVG */}
        <svg className="absolute inset-0 w-full h-full opacity-5">
          <defs>
            <linearGradient
              id="heroGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#00f5ff" />
              <stop offset="100%" stopColor="#a855f7" />
            </linearGradient>
          </defs>
          <g stroke="url(#heroGradient)" strokeWidth="1" fill="none">
            <polygon
              points="100,50 150,75 150,125 100,150 50,125 50,75"
              transform="translate(80, 150)"
            />
            <polygon
              points="100,50 150,75 150,125 100,150 50,125 50,75"
              transform="translate(850, 100) scale(1.3)"
            />
            <polygon
              points="100,50 150,75 150,125 100,150 50,125 50,75"
              transform="translate(700, 450) scale(0.9)"
            />
          </g>
        </svg>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Profile Image */}
          <div
            className={`mb-8 transition-all duration-1000 ${
              isVisible ? "opacity-100 scale-100" : "opacity-0 scale-75"
            }`}
          >
            <div className="relative inline-block">
              {/* Glowing ring */}
              <div
                className="absolute inset-0 rounded-full bg-gradient-to-r from-[#00f5ff] via-[#a855f7] to-[#ec4899] blur-md opacity-60 animate-spin-slow"
                style={{ padding: "4px", animation: "spin 8s linear infinite" }}
              ></div>
              <div className="relative w-40 h-40 sm:w-48 sm:h-48 mx-auto rounded-full p-1 bg-gradient-to-r from-[#00f5ff] via-[#a855f7] to-[#ec4899]">
                <img
                  src="/PP.jpg"
                  alt="Sayyad Fayaz Ahmad Shah"
                  className="w-full h-full rounded-full object-cover border-4 border-[#0a0a1a]"
                />
              </div>
              {/* Floating badges around image */}
              <div className="absolute -top-2 -right-2 w-10 h-10 rounded-full bg-[#00f5ff]/20 backdrop-blur-sm flex items-center justify-center animate-bounce">
                <FaFlask className="text-[#00f5ff] text-lg" />
              </div>
              <div className="absolute -bottom-2 -left-2 w-10 h-10 rounded-full bg-[#a855f7]/20 backdrop-blur-sm flex items-center justify-center animate-bounce delay-300">
                <FaAtom className="text-[#a855f7] text-lg" />
              </div>
            </div>
          </div>

          {/* Full Name */}
          <div
            className={`mb-2 transition-all duration-1000 delay-100 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              <span className="text-white">Sayyad </span>
              <span className="gradient-text">Fayaz Ahmad</span>
              <span className="text-white"> Shah</span>
            </h1>
          </div>

          {/* Greeting */}
          <div
            className={`mb-4 transition-all duration-1000 delay-200 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-[#94a3b8]">
              <FaFlask className="text-[#00f5ff] animate-glow-pulse" />
              {hero.greeting}
            </span>
          </div>

          {/* Main Title */}
          <h2
            className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-6 transition-all duration-1000 delay-300 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <span className="gradient-text">{hero.title}</span>
          </h2>

          {/* Subtitle with typing effect */}
          <h3
            className={`text-xl sm:text-2xl text-[#00f5ff] font-medium mb-4 transition-all duration-1000 delay-400 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            {hero.subtitle}
          </h3>

          {/* Tagline */}
          <p
            className={`text-lg text-[#94a3b8] mb-8 transition-all duration-1000 delay-400 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            {hero.tagline}
          </p>

          {/* Description */}
          <div
            className={`max-w-3xl mx-auto mb-10 space-y-4 transition-all duration-1000 delay-500 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            {hero.description.map((text, index) => (
              <p key={index} className="text-[#cbd5e1] leading-relaxed">
                {text}
              </p>
            ))}
          </div>

          {/* Stats */}
          <div
            className={`grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 transition-all duration-1000 delay-600 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            {hero.stats.map((stat, index) => (
              <div
                key={index}
                className="glass rounded-2xl p-4 card-hover group"
              >
                <div className="text-3xl font-bold gradient-text group-hover:animate-glow-pulse">
                  {stat.value}
                </div>
                <div className="text-sm text-[#94a3b8]">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Specializations */}
          <div
            className={`flex flex-wrap justify-center gap-4 mb-10 transition-all duration-1000 delay-700 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            {hero.highlights.map((highlight, index) => {
              const IconComponent = iconMap[highlight.icon] || FaFlask;
              return (
                <div
                  key={index}
                  className="group flex items-center gap-3 px-5 py-3 glass rounded-full hover:bg-[#00f5ff]/10 transition-all duration-300 cursor-pointer card-hover"
                >
                  <IconComponent className="text-xl text-[#00f5ff] group-hover:animate-glow-pulse" />
                  <span className="text-[#f8fafc] font-medium">
                    {highlight.text}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Contact Info Pills */}
          <div
            className={`flex flex-wrap justify-center gap-3 mb-10 transition-all duration-1000 delay-800 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <div className="flex items-center gap-2 px-4 py-2 glass rounded-full text-sm text-[#cbd5e1]">
              <FaMapMarkerAlt className="text-[#00f5ff]" />
              {personal.location}
            </div>
            <div className="flex items-center gap-2 px-4 py-2 glass rounded-full text-sm text-[#cbd5e1]">
              <FaPhone className="text-[#a855f7]" />
              {contact.phones[0]}
            </div>
            <div className="flex items-center gap-2 px-4 py-2 glass rounded-full text-sm text-[#cbd5e1]">
              <FaEnvelope className="text-[#ec4899]" />
              {contact.email}
            </div>
            <a
              href={contact.linkedin.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 glass rounded-full text-sm text-[#00f5ff] hover:bg-[#00f5ff]/10 transition-all"
            >
              <FaLinkedin />
              LinkedIn
            </a>
          </div>

          {/* CTA Buttons */}
          <div
            className={`flex flex-wrap justify-center gap-4 transition-all duration-1000 delay-900 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <a
              href="#contact"
              className="btn-glow btn-cyan flex items-center gap-2"
            >
              <FaFlask />
              Get In Touch
            </a>
            <a
              href="#experience"
              className="btn-glow btn-purple flex items-center gap-2"
            >
              <FaMicroscope />
              View My Work
            </a>
          </div>

          {/* Scroll indicator */}
          <div
            className={`mt-16 transition-all duration-1000 delay-1000 ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            <a
              href="#experience"
              className="inline-flex flex-col items-center gap-2 text-[#94a3b8] hover:text-[#00f5ff] transition-colors"
            >
              <span className="text-sm">Scroll to explore</span>
              <FaArrowDown className="animate-bounce" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
