import React, { useEffect, useRef, useState } from "react";
import { FaGraduationCap, FaMedal } from "react-icons/fa";
import educationData from "../data/educationData.json";

const Education = () => {
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
    <section id="education" ref={sectionRef} className="py-20 sm:py-28">
      <div className="sheet">
        <div className="section-head">
          <p className="kicker">
            <span className="kicker-num">03</span> / Education
          </p>
          <h2 className="title-section">Academic journey</h2>
          <p className="lede">
            A path through chemistry from foundational coursework to postgraduate
            research in nanomaterials and organic synthesis.
          </p>
        </div>

        <div className="grid gap-x-12 gap-y-10 md:grid-cols-2">
          {educationData.education.map((edu, i) => (
            <article
              key={edu.id}
              className={`reveal border-t border-rule pt-7 ${visible ? "is-visible" : ""}`}
              style={{ transitionDelay: `${i * 0.06}s` }}
            >
              <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                <p className="font-sans text-[0.6875rem] uppercase tracking-[0.12em] text-accent">
                  {edu.period}
                </p>
                <p className="figure-label tabular-nums">{edu.gpa}</p>
              </div>

              <h3 className="mt-4 font-display text-[1.375rem] leading-snug text-fg">
                {edu.degree}
              </h3>
              <p className="mt-1.5 font-sans text-[0.8125rem] text-fg-faint">
                {edu.institution}
              </p>
              {edu.school && (
                <p className="font-sans text-[0.8125rem] text-fg-faint">{edu.school}</p>
              )}

              <div className="mt-6 border-l-2 border-accent-line pl-4">
                <p className="font-sans text-[0.6875rem] uppercase tracking-[0.12em] text-fg-faint">
                  Thesis
                </p>
                <p className="mt-2 font-display text-[1.0625rem] italic leading-relaxed text-fg-soft">
                  {edu.thesis}
                </p>
              </div>

              <ul className="mt-6 space-y-2">
                {edu.highlights.map((h) => (
                  <li key={h} className="bullet font-display text-[1.0625rem] leading-relaxed text-fg-soft">
                    {h}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="mt-20">
          <h3 className="flex items-center gap-3 font-display text-[1.375rem] text-fg">
            <FaGraduationCap aria-hidden="true" className="text-base text-accent" />
            Certifications &amp; achievements
          </h3>

          <div className="mt-8 grid gap-x-12 gap-y-8 md:grid-cols-3">
            {educationData.certifications.map((cert, i) => (
              <article
                key={cert.id}
                className={`reveal border-t border-rule pt-6 ${visible ? "is-visible" : ""}`}
                style={{ transitionDelay: `${i * 0.06}s` }}
              >
                <div className="flex items-baseline justify-between gap-4">
                  <h4 className="font-display text-[1.125rem] text-fg">{cert.title}</h4>
                  <FaMedal aria-hidden="true" className="shrink-0 text-sm text-accent" />
                </div>
                <p className="mt-1.5 font-sans text-[0.8125rem] text-fg-faint">
                  {cert.issuer}
                </p>
                <p className="mt-4 font-display text-[1rem] leading-relaxed text-fg-soft">
                  {cert.description}
                </p>
                <p className="figure-label mt-5 tabular-nums">{cert.year}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;