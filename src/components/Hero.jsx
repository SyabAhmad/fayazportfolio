import React from "react";
import { Link } from "react-router-dom";
import { FaMapMarkerAlt, FaArrowRight } from "react-icons/fa";
import heroData from "../data/heroData.json";
import contactData from "../data/contactData.json";
import { posts } from "../data/blogPosts.json";

const { hero } = heroData;
const { personal, specializations } = contactData;

const NAME_PARTS = personal.name.split(" ");
const NAME_SPLIT = Math.ceil(NAME_PARTS.length / 2);
const LATEST_POST = posts.reduce((a, b) => (new Date(a.date) > new Date(b.date) ? a : b));

const Hero = () => {
  return (
    <section id="top" className="pt-32 pb-16 sm:pt-40">
      <div className="sheet">
        <p className="kicker">{personal.title}</p>

        <h1 className="title-display mt-7">
          {NAME_PARTS.slice(0, NAME_SPLIT).join(" ")}
          <br />
          <em className="font-normal">
            {NAME_PARTS.slice(NAME_SPLIT).join(" ")}
          </em>
        </h1>

        <p className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-1 font-sans text-sm text-fg-faint">
          <span className="inline-flex items-center gap-1.5">
            <FaMapMarkerAlt aria-hidden="true" className="text-accent" />
            {personal.location}
          </span>
          <span aria-hidden="true" className="text-rule-strong">/</span>
          <span>Organic synthesis · Nanomaterials · Materials</span>
        </p>

        <div className="mt-12 grid gap-14 lg:grid-cols-[1fr_20rem] lg:gap-20">
          <div>
            <p className="lede">{hero.description[0]}</p>

            <div className="mt-9 flex flex-wrap gap-3">
              <a href="#publications" className="btn btn-accent">
                View publications
                <FaArrowRight aria-hidden="true" />
              </a>
              <a href="#contact" className="btn btn-outline">
                Get in touch
              </a>
            </div>

            <Link
              to={`/blog/${LATEST_POST.slug}`}
              className="group mt-10 flex max-w-md items-start gap-4 border-l-2 border-accent pl-4"
            >
              <div>
                <p className="font-sans text-[0.6875rem] uppercase tracking-[0.14em] text-fg-faint">
                  Latest writing
                </p>
                <p className="mt-1.5 font-display text-[1.0625rem] leading-snug text-fg group-hover:text-accent">
                  {LATEST_POST.title}
                </p>
                <p className="mt-1 font-sans text-xs text-fg-faint">
                  {LATEST_POST.readingTime} min read
                </p>
              </div>
            </Link>
          </div>

          <div className="lg:pt-2">
            <figure className="border border-rule-soft">
              <img
                src="/PP.jpg"
                alt={`${personal.name}, chemistry researcher at work in the laboratory`}
                width={691}
                height={943}
                fetchPriority="high"
                className="aspect-[4/5] w-full object-cover object-[center_18%]"
              />
              <figcaption className="border-t border-rule-soft px-4 py-3 font-sans text-[0.6875rem] leading-relaxed text-fg-faint">
                Doctoral researcher, Anhui Normal University
              </figcaption>
            </figure>
          </div>
        </div>
      </div>

      {/* Big figures */}
      <div className="sheet mt-20">
        <dl className="grid grid-cols-2 border-t border-rule md:grid-cols-4">
          {hero.stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`py-8 md:py-10 ${i > 0 ? "md:border-l md:border-rule md:pl-8" : ""} ${
                i === 1 ? "border-l border-rule pl-5" : ""
              }`}
            >
              <dd className="figure">{stat.value}</dd>
              <dt className="figure-label mt-3">{stat.label}</dt>
            </div>
          ))}
        </dl>
      </div>

      {/* Focus areas */}
      <div className="sheet mt-14">
        <ul className="grid border-t border-rule sm:grid-cols-2 lg:grid-cols-4">
          {hero.highlights.map((area, i) => (
            <li
              key={area.text}
              className={`border-b border-rule-soft py-7 sm:px-0 ${i % 2 === 1 ? "sm:border-l sm:border-rule-soft sm:pl-7" : ""} ${
                i > 1 ? "lg:border-l lg:border-rule-soft lg:pl-7" : ""
              }`}
            >
              <h2 className="font-display text-[1.0625rem] text-fg">{area.text}</h2>
              <p className="mt-2 font-sans text-[0.8125rem] leading-relaxed text-fg-faint">
                {area.description}
              </p>
            </li>
          ))}
        </ul>
      </div>

      {/* Specialisations rail */}
      <div className="marquee-mask mt-20 overflow-hidden border-y border-rule py-4">
        <div className="marquee-track">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex shrink-0" aria-hidden={dup === 1 ? "true" : undefined}>
              {specializations.map((item) => (
                <span
                  key={item}
                  className="flex items-center gap-6 pr-6 font-sans text-[0.6875rem] uppercase tracking-[0.14em] text-fg-faint"
                >
                  {item}
                  <span aria-hidden="true" className="h-1 w-1 bg-accent" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;