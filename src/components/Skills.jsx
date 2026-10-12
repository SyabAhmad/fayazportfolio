import React, { useEffect, useRef, useState } from "react";
import skillsData from "../data/skillsdata.json";

/* Category registry — id must match a key in skillsdata.json */
const CATEGORIES = [
  { id: "computational_chemistry", label: "Computational Chemistry" },
  { id: "analytical_chemistry", label: "Analytical Chemistry" },
  { id: "synthesis_techniques", label: "Synthesis Techniques" },
  {
    id: "pharmacology_and_biological_evaluation",
    label: "Pharmacology & Biological Evaluation",
  },
  { id: "laboratory_and_general_skills", label: "Laboratory Practice" },
  { id: "software_and_digital_tools", label: "Software & Digital Tools" },
  { id: "research_and_development", label: "Research & Development" },
  { id: "language_skills", label: "Languages" },
];

const titleCase = (key) =>
  key.split("_").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");

/* Flatten the nested JSON into one list of disciplines. */
const DISCIPLINES = CATEGORIES.map((cat) => {
  const node = skillsData.skills[cat.id];
  const groups = Array.isArray(node)
    ? [{ name: cat.label, tools: node }]
    : Object.entries(node ?? {}).map(([k, v]) => ({
        name: titleCase(k),
        tools: Array.isArray(v) ? v : [v],
      }));

  return {
    id: cat.id,
    label: cat.label,
    groups,
    count: groups.reduce((n, g) => n + g.tools.length, 0),
  };
}).filter((d) => d.count > 0);

const Skills = () => {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold: 0.08 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="skills" ref={sectionRef} className="py-20 sm:py-28">
      <div className="sheet">
        <div className="section-head">
          <p className="kicker">
            <span className="kicker-num">02</span> / Skills
          </p>
          <h2 className="title-section">Techniques and instrumentation</h2>
          <p className="lede">
            Everything below is something I have actually run, tuned or debugged —
            not a wish list.
          </p>
        </div>

        <div className="grid gap-x-12 gap-y-12 md:grid-cols-2">
          {DISCIPLINES.map((discipline, i) => (
            <section
              key={discipline.id}
              className={`reveal border-t border-rule pt-7 ${visible ? "is-visible" : ""}`}
              style={{ transitionDelay: `${Math.min(i, 5) * 0.05}s` }}
            >
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="font-display text-[1.25rem] leading-snug text-fg">
                  {discipline.label}
                </h3>
                <p className="figure-label shrink-0 tabular-nums">
                  {discipline.count} {discipline.count === 1 ? "item" : "items"}
                </p>
              </div>

              <div className="mt-5 space-y-5">
                {discipline.groups.map((group) => (
                  <div key={group.name}>
                    <h4 className="font-sans text-[0.8125rem] font-medium text-fg">
                      {group.name}
                    </h4>
                    <ul className="mt-2.5 flex flex-wrap gap-1.5">
                      {group.tools.map((tool) => (
                        <li key={tool}>
                          <span className="tag">{tool}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;