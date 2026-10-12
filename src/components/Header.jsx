import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import ThemeToggle from "./ThemeToggle";

const NAV_LINKS = [
  { label: "Experience", to: "/#experience" },
  { label: "Skills", to: "/#skills" },
  { label: "Education", to: "/#education" },
  { label: "Publications", to: "/#publications" },
  { label: "Writing", to: "/blog" },
  { label: "Contact", to: "/#contact" },
];

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      setProgress(max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const isBlog = pathname.startsWith("/blog");

  return (
    <header
      className={[
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled
          ? "border-b border-rule bg-page/92 backdrop-blur-md"
          : "border-b border-transparent",
      ].join(" ")}
    >
      <div className="sheet flex h-[4.5rem] items-center justify-between gap-6">
        <Link to="/" className="font-sans text-[0.9375rem] font-semibold tracking-tight">
          Sayyad Fayaz Ahmad Shah
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((link) => {
            const active = link.to === "/blog" && isBlog;
            return (
              <Link
                key={link.label}
                to={link.to}
                className={[
                  "font-sans text-[0.8125rem] transition-colors duration-200",
                  active ? "text-accent" : "text-fg-soft hover:text-fg",
                ].join(" ")}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="inline-flex h-10 w-10 items-center justify-center border border-rule text-fg transition-colors duration-200 hover:border-accent hover:text-accent lg:hidden"
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      <div aria-hidden="true" className="relative h-px w-full bg-rule-soft">
        <div
          className="absolute inset-y-0 left-0 bg-accent transition-[width] duration-150 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {menuOpen && (
        <div className="border-b border-rule bg-page lg:hidden">
          <nav className="sheet flex flex-col py-2">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                className="border-b border-rule-soft py-3.5 font-display text-lg text-fg last:border-b-0 transition-colors hover:text-accent"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;