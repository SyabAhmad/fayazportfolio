import React, { useEffect } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Experience from "./components/Experience";
import Skills from "./components/Skills";
import Education from "./components/Education";
import Publications from "./components/Publications";
import Contact from "./components/Contact";
import BlogIndex from "./components/BlogIndex";
import BlogPost from "./components/BlogPost";

/** Hash links (/#experience) need the browser to jump after the route settles. */
const ScrollManager = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
};

const Home = () => (
  <main>
    <Hero />
    <Experience />
    <Skills />
    <Education />
    <Publications />
    <Contact />
  </main>
);

const App = () => (
  <div className="min-h-screen">
    <ScrollManager />
    <Header />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/blog" element={<BlogIndex />} />
      <Route path="/blog/:slug" element={<BlogPost />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </div>
);

export default App;