import React from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { FaMapMarkerAlt, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { posts } from "../data/blogPosts.json";
import contactData from "../data/contactData.json";
import { fmt } from "../utils/format";

const { personal, contact } = contactData;

const Block = ({ block }) => {
  switch (block.type) {
    case "h2":
      return <h2>{block.text}</h2>;
    case "p":
      return <p>{block.text}</p>;
    case "ul":
      return (
        <ul>
          {block.items.map((i) => (
            <li key={i}>{i}</li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol>
          {block.items.map((i) => (
            <li key={i}>{i}</li>
          ))}
        </ol>
      );
    case "quote":
      return (
        <blockquote>
          {block.text}
          {block.cite && <cite>{block.cite}</cite>}
        </blockquote>
      );
    default:
      return null;
  }
};

const BlogPost = () => {
  const { slug } = useParams();
  const post = posts.find((p) => p.slug === slug);
  if (!post) return <Navigate to="/blog" replace />;

  const more = [...posts]
    .filter((p) => p.slug !== slug)
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 2);

  return (
    <main id="top" className="pt-32 pb-20 sm:pt-40">
      <article className="sheet-prose">
        <header>
          <p className="kicker">{post.kicker}</p>
          <h1 className="mt-5 font-display text-[clamp(2rem,5vw,3rem)] font-normal leading-[1.06] tracking-[-0.02em] text-fg">
            {post.title}
          </h1>

          {/* Byline */}
          <div className="mt-7 border-y border-rule py-4">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
              <img
                src="/dp.png"
                alt=""
                width={256}
                height={256}
                className="h-12 w-12 shrink-0 border border-rule object-cover"
              />
              <div className="min-w-0">
                <p className="font-sans text-[0.875rem] font-medium text-fg">
                  {personal.name}
                </p>
                <p className="font-sans text-[0.75rem] leading-relaxed text-fg-faint">
                  {personal.title} · {personal.location}
                </p>
              </div>
            </div>
            <p className="figure-label mt-3.5 tabular-nums">
              {fmt(post.date)} · {post.readingTime} min read
            </p>
          </div>
        </header>

        <div className="prose mt-10">
          {post.body.map((block, i) => (
            <Block key={i} block={block} />
          ))}
        </div>

        <div className="mt-14 flex flex-wrap gap-1.5 border-t border-rule pt-7">
          {post.tags.map((t) => (
            <span key={t} className="tag">
              {t}
            </span>
          ))}
        </div>

        {/* Author box */}
        <aside className="mt-14 border-t-2 border-accent pt-7">
          <p className="kicker">Written by</p>
          <div className="mt-5 flex gap-5">
            <img
              src="/dp.png"
              alt={`${personal.name}, ${personal.title}`}
              width={256}
              height={256}
              loading="lazy"
              className="h-20 w-20 shrink-0 border border-rule object-cover"
            />
            <div className="min-w-0">
              <p className="font-display text-[1.25rem] leading-snug text-fg">
                {personal.name}
              </p>
              <p className="mt-1 font-sans text-[0.8125rem] text-fg-faint">
                {personal.title}
              </p>
              <p className="mt-3 font-display text-[1rem] leading-relaxed text-fg-soft">
                {personal.bio}
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 font-sans text-[0.8125rem]">
                <span className="inline-flex items-center gap-1.5 text-fg-faint">
                  <FaMapMarkerAlt aria-hidden="true" className="text-accent" />
                  {personal.location}
                </span>
                <a
                  href={`mailto:${contact.email}`}
                  className="inline-flex items-center gap-1.5 text-accent hover:underline"
                >
                  <FaEnvelope aria-hidden="true" />
                  {contact.email}
                </a>
                <a
                  href={contact.linkedin.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-accent hover:underline"
                >
                  <FaLinkedin aria-hidden="true" />
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </aside>
      </article>

      <div className="sheet mt-24">
        <div className="border-t border-rule pt-9">
          <p className="kicker">Keep reading</p>
          <div className="mt-7 grid gap-x-12 gap-y-9 md:grid-cols-2">
            {more.map((p) => (
              <Link key={p.slug} to={`/blog/${p.slug}`} className="group block">
                <p className="figure-label tabular-nums">
                  {fmt(p.date)} · {p.readingTime} min
                </p>
                <h2 className="mt-2.5 font-display text-[1.375rem] leading-snug text-fg group-hover:text-accent">
                  {p.title}
                </h2>
              </Link>
            ))}
          </div>
          <Link
            to="/blog"
            className="mt-10 inline-block font-sans text-[0.8125rem] text-fg-soft transition-colors hover:text-accent"
          >
            ← All articles
          </Link>
        </div>
      </div>
    </main>
  );
};

export default BlogPost;