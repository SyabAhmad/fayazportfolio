import React, { useEffect, useRef, useState } from "react";
import { FaFlask, FaAtom, FaIndustry, FaChalkboardTeacher } from "react-icons/fa";
import experienceData from "../data/experienceData.json";

const ICONS = { industry: FaIndustry, research: FaAtom, education: FaChalkboardTeacher };

const Experience = () => {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold: 0.1 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="experience" ref={sectionRef} className="py-20 sm:py-28">
      <div className="sheet">
        <div className="section-head">
          <p className="kicker">
            <span className="kicker-num">01</span> / Experience
          </p>
          <h2 className="title-section">Research, industry and teaching</h2>
          <p className="lede">
            Four roles across pharmaceutical quality control, nanomaterials
            research and chemistry teaching, most recent first.
          </p>
        </div>

        <div className="border-t border-rule">
          {experienceData.experiences.map((exp, index) => {
            const Icon = ICONS[exp.type] || FaFlask;
            return (
              <article
                key={exp.id}
                className={`reveal grid gap-x-10 gap-y-4 border-b border-rule-soft py-10 md:grid-cols-[13rem_1fr] ${
                  visible ? "is-visible" : ""
                }`}
                style={{ transitionDelay: `${index * 0.06}s` }}
              >
                <div>
                  <p className="font-sans text-[0.6875rem] uppercase tracking-[0.12em] text-accent">
                    {exp.period}
                  </p>
                  <p className="mt-2 font-sans text-[0.8125rem] leading-relaxed text-fg-faint">
                    {exp.organization}
                  </p>
                </div>

                <div>
                  <h3 className="flex items-start gap-3 font-display text-[1.375rem] leading-snug text-fg">
                    <Icon aria-hidden="true" className="mt-1 shrink-0 text-base text-accent" />
                    {exp.title}
                  </h3>

                  <ul className="mt-5 space-y-2">
                    {exp.description.map((desc) => (
                      <li
                        key={desc}
                        className="bullet font-display text-[1.0625rem] leading-relaxed text-fg-soft"
                      >
                        {desc}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 flex flex-wrap gap-1.5">
                    {exp.tags.map((tag) => (
                      <span key={tag} className="tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Experience;