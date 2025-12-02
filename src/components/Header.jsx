import React, { useState, useEffect } from "react";
import {
  FaFlask,
  FaBars,
  FaTimes,
  FaAtom,
  FaSun,
  FaMoon,
} from "react-icons/fa";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("about");
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Toggle theme
  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    if (newMode) {
      document.documentElement.classList.remove("light-mode");
    } else {
      document.documentElement.classList.add("light-mode");
    }
    localStorage.setItem("theme", newMode ? "dark" : "light");
  };

  // Load saved theme on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
      setIsDarkMode(false);
      document.documentElement.classList.add("light-mode");
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Update active section based on scroll position
      const sections = [
        "about",
        "experience",
        "skills",
        "education",
        "publications",
        "contact",
      ];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#about", label: "About" },
    { href: "#experience", label: "Experience" },
    { href: "#skills", label: "Skills" },
    { href: "#education", label: "Education" },
    { href: "#publications", label: "Publications" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "glass-dark py-3 shadow-2xl shadow-black/20"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#about" className="flex items-center gap-3 group">
            <div className="relative">
              <FaFlask className="text-3xl text-[#00f5ff] animate-glow-pulse group-hover:text-[#a855f7] transition-colors duration-300" />
              <FaAtom className="absolute -top-1 -right-1 text-xs text-[#a855f7] animate-rotate-slow opacity-60" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold gradient-text tracking-wide">
                Sayyad Fayaz
              </span>
              <span className="text-[10px] text-[#94a3b8] uppercase tracking-widest">
                Chemistry Researcher
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 group ${
                  activeSection === link.href.slice(1)
                    ? "text-[#00f5ff]"
                    : "text-[#cbd5e1] hover:text-[#00f5ff]"
                }`}
              >
                <span className="relative z-10">{link.label}</span>
                {activeSection === link.href.slice(1) && (
                  <span className="absolute inset-0 bg-[#00f5ff]/10 rounded-full animate-scale-in" />
                )}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-[#00f5ff] to-[#a855f7] group-hover:w-3/4 transition-all duration-300" />
              </a>
            ))}
          </nav>

          {/* Theme Toggle & CTA Button - Desktop */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="p-3 rounded-full glass border border-white/10 hover:border-[#00f5ff]/50 transition-all duration-300 hover:shadow-lg hover:shadow-[#00f5ff]/20 group"
              aria-label="Toggle theme"
            >
              {isDarkMode ? (
                <FaSun className="text-lg text-[#f97316] group-hover:rotate-180 transition-transform duration-500" />
              ) : (
                <FaMoon className="text-lg text-[#a855f7] group-hover:-rotate-12 transition-transform duration-300" />
              )}
            </button>
            <a
              href="#contact"
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#00f5ff] to-[#a855f7] text-[#0a0a1a] font-semibold text-sm hover:shadow-lg hover:shadow-[#00f5ff]/30 transition-all duration-300 hover:-translate-y-0.5"
            >
              <FaFlask className="text-sm" />
              Let's Connect
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-[#00f5ff] hover:text-[#a855f7] transition-colors"
          >
            {isMobileMenuOpen ? (
              <FaTimes className="text-2xl" />
            ) : (
              <FaBars className="text-2xl" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-500 ${
            isMobileMenuOpen ? "max-h-96 mt-4" : "max-h-0"
          }`}
        >
          <nav className="flex flex-col gap-2 glass rounded-2xl p-4">
            {navLinks.map((link, index) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 animate-fade-in-left ${
                  activeSection === link.href.slice(1)
                    ? "bg-[#00f5ff]/10 text-[#00f5ff]"
                    : "text-[#cbd5e1] hover:bg-white/5 hover:text-[#00f5ff]"
                }`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {link.label}
              </a>
            ))}
            <div className="flex items-center gap-3 mt-2">
              <button
                onClick={toggleTheme}
                className="flex-1 px-4 py-3 rounded-xl glass border border-white/10 flex items-center justify-center gap-2 text-sm font-medium"
              >
                {isDarkMode ? (
                  <>
                    <FaSun className="text-[#f97316]" /> Light Mode
                  </>
                ) : (
                  <>
                    <FaMoon className="text-[#a855f7]" /> Dark Mode
                  </>
                )}
              </button>
              <a
                href="#contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-[#00f5ff] to-[#a855f7] text-[#0a0a1a] font-semibold text-sm text-center"
              >
                Let's Connect
              </a>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
