import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { posts } from "../data/blogPosts.json";
import contactData from "../data/contactData.json";
import { fmt } from "../utils/format";

const { personal } = contactData;

const BlogIndex = () => {
  const sorted = [...posts].sort((a, b) => new Date(b.date) - new Date(a.date));
  const [lead, ...rest] = sorted;

  return (
    <main id="top" className="pt-32 pb-20 sm:pt-40">
      <div className="sheet">
        <div className="section-head">
          <p className="kicker">Writing</p>
          <h1 className="title-section" style={{ maxWidth: "16ch" }}>
            Notes from the bench
          </h1>
          <p className="lede">
            Working notes on synthesis, analysis and computation — written for
            people who want the mechanism, not just the result.
          </p>
        </div>

        {/* Lead article */}
        <Link to={`/blog/${lead.slug}`} className="group block border-t border-rule pt-9">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <span className="font-sans text-[0.6875rem] uppercase tracking-[0.12em] text-accent">
              {lead.kicker}
            </span>
            <span className="figure-label tabular-nums">
              {fmt(lead.date)} · {lead.readingTime} min read
            </span>
          </div>
          <h2 className="mt-4 font-display text-[clamp(1.75rem,3.6vw,2.5rem)] leading-[1.1] tracking-[-0.02em] text-fg group-hover:text-accent">
            {lead.title}
          </h2>
          <p className="lede mt-4">{lead.excerpt}</p>

          <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1">
            <img src="/dp.png" alt="" width={256} height={256} className="h-7 w-7 border border-rule object-cover" />
            <span className="font-sans text-[0.8125rem] text-fg-soft">{personal.name}</span>
            <span aria-hidden="true" className="text-rule-strong">/</span>
            <span className="font-sans text-[0.8125rem] text-fg-faint">{personal.title}</span>
          </div>

          <span className="btn btn-outline mt-7">
            Read
            <FaArrowRight aria-hidden="true" />
          </span>
        </Link>

        {/* Rest */}
        <div className="mt-20 grid gap-x-12 gap-y-12 md:grid-cols-2">
          {rest.map((post) => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className="group flex flex-col border-t border-rule pt-7"
            >
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                <span className="font-sans text-[0.6875rem] uppercase tracking-[0.12em] text-accent">
                  {post.kicker}
                </span>
                <span className="figure-label tabular-nums">
                  {fmt(post.date)} · {post.readingTime} min
                </span>
              </div>
              <h2 className="mt-3.5 font-display text-[1.5rem] leading-snug text-fg group-hover:text-accent">
                {post.title}
              </h2>
              <p className="mt-3 font-display text-[1rem] leading-relaxed text-fg-soft">
                {post.excerpt}
              </p>
              <div className="mt-5 flex flex-wrap gap-1.5">
                {post.tags.slice(0, 4).map((t) => (
                  <span key={t} className="tag">
                    {t}
                  </span>
                ))}
              </div>
              <p className="figure-label mt-5 border-t border-rule-soft pt-4">
                {personal.name}
              </p>
            </Link>
          ))}
        </div>

        <div className="mt-20 border-t border-rule pt-8">
          <Link
            to="/"
            className="font-sans text-[0.8125rem] text-fg-soft transition-colors hover:text-accent"
          >
            ← Back to the portfolio
          </Link>
        </div>
      </div>
    </main>
  );
};

export default BlogIndex;