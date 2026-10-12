import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FaExternalLinkAlt, FaArrowRight, FaFeatherAlt } from "react-icons/fa";
import publicationsData from "../data/publicationsData.json";
import { posts } from "../data/blogPosts.json";
import { fmt } from "../utils/format";

const Publications = () => {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold: 0.06 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const sorted = [...publicationsData.publications].sort((a, b) => b.year - a.year);
  const latestPosts = [...posts].sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <section id="publications" ref={sectionRef} className="py-20 sm:py-28">
      <div className="sheet">
        <div className="section-head">
          <p className="kicker">
            <span className="kicker-num">04</span> / Publications &amp; Writing
          </p>
          <h2 className="title-section">Research output</h2>
          <p className="lede">
            Peer-reviewed papers, conference participation, and longer-form notes
            on the chemistry behind them.
          </p>
        </div>

        {/* ---- Papers ---- */}
        <h3 className="font-sans text-[0.6875rem] uppercase tracking-[0.14em] text-fg-faint">
          Papers &amp; proceedings
        </h3>

        <div className="mt-7 border-t border-rule">
          {sorted.map((pub, i) => (
            <article
              key={pub.id}
              className={`reveal border-b border-rule-soft py-9 ${
                visible ? "is-visible" : ""
              }`}
              style={{ transitionDelay: `${Math.min(i, 4) * 0.05}s` }}
            >
              <div className="flex flex-wrap items-start justify-between gap-x-8 gap-y-3">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                    <span className="font-sans text-[0.6875rem] uppercase tracking-[0.12em] text-accent">
                      {pub.status}
                    </span>
                    <span className="figure-label tabular-nums">{pub.year}</span>
                  </div>
                  <h4 className="mt-3 font-display text-[1.25rem] leading-snug text-fg">
                    {pub.title}
                  </h4>
                </div>

                {pub.doi && (
                  <a
                    href={`https://doi.org/${pub.doi}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn shrink-0"
                  >
                    <FaExternalLinkAlt aria-hidden="true" />
                    Paper
                  </a>
                )}
              </div>

              {pub.journal && (
                <p className="mt-3 font-display text-[1rem] italic text-fg-soft">{pub.journal}</p>
              )}
              {pub.authors && (
                <p className="mt-1.5 font-sans text-[0.8125rem] leading-relaxed text-fg-faint">
                  {pub.authors}
                </p>
              )}
              {pub.abstract && (
                <p className="mt-4 max-w-[68ch] font-display text-[1.0625rem] leading-relaxed text-fg-soft">
                  {pub.abstract}
                </p>
              )}
            </article>
          ))}
        </div>

        {/* ---- Conferences ---- */}
        <h3 className="mt-20 font-sans text-[0.6875rem] uppercase tracking-[0.14em] text-fg-faint">
          Conferences
        </h3>

        <div className="mt-7 grid gap-x-12 gap-y-7 md:grid-cols-3">
          {publicationsData.conferences.map((conf) => (
            <article key={conf.id} className="border-t border-rule pt-6">
              <p className="figure-label">{conf.type}</p>
              <h4 className="mt-3 font-display text-[1.0625rem] leading-snug text-fg">
                {conf.title}
              </h4>
              <p className="mt-2 font-sans text-[0.8125rem] leading-relaxed text-fg-faint">
                {conf.organization}
              </p>
              <p className="figure-label mt-4 tabular-nums">{conf.year}</p>
            </article>
          ))}
        </div>

        {/* ---- Writing ---- */}
        <div className="mt-24 flex flex-wrap items-end justify-between gap-6 border-t border-rule pt-9">
          <div>
            <h3 className="font-sans text-[0.6875rem] uppercase tracking-[0.14em] text-fg-faint">
              Writing
            </h3>
            <p className="mt-4 max-w-[52ch] font-display text-[1.375rem] leading-snug text-fg">
              Notes on synthesis, analysis and computation — written for people who
              want the mechanism, not just the result.
            </p>
          </div>
          <Link to="/blog" className="btn btn-outline">
            All articles
            <FaArrowRight aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-10 grid gap-x-12 gap-y-7 md:grid-cols-3">
          {latestPosts.slice(0, 3).map((post) => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className="group flex flex-col border-t border-rule pt-6"
            >
              <div className="flex items-center gap-2">
                <FaFeatherAlt aria-hidden="true" className="text-xs text-accent" />
                <p className="figure-label">{post.kicker}</p>
              </div>
              <h4 className="mt-3 font-display text-[1.125rem] leading-snug text-fg group-hover:text-accent">
                {post.title}
              </h4>
              <p className="mt-2 line-clamp-3 font-display text-[0.9375rem] leading-relaxed text-fg-faint">
                {post.excerpt}
              </p>
              <p className="figure-label mt-4 tabular-nums">
                {fmt(post.date)} · {post.readingTime} min
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Publications;