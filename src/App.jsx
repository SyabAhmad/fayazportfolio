import React from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Experience from "./components/Experience";
import Skills from "./components/Skills";
import Education from "./components/Education";
import Publications from "./components/Publications";
import Contact from "./components/Contact";

function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="relative">
        <Hero />
        <Experience />
        <Skills />
        <Education />
        <Publications />
        <Contact />
      </main>
    </div>
  );
}

export default App;
