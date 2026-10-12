import React from "react";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaLinkedin,
  FaTwitter,
  FaArrowRight,
} from "react-icons/fa";
import contactData from "../data/contactData.json";

const { personal, contact, references } = contactData;

const METHODS = [
  {
    icon: FaEnvelope,
    label: "Email",
    value: contact.email,
    href: `mailto:${contact.email}`,
  },
  {
    icon: FaPhone,
    label: "Telephone",
    value: contact.phones[0],
    href: `tel:${contact.phones[0].replace(/-/g, "")}`,
  },
  {
    icon: FaLinkedin,
    label: "LinkedIn",
    value: contact.linkedin.username,
    href: contact.linkedin.url,
  },
  {
    icon: FaTwitter,
    label: "X / Twitter",
    value: contact.twitter,
    href: `https://x.com/${contact.twitter.replace("@", "")}`,
  },
];

const Contact = () => {
  return (
    <section id="contact" className="py-20 sm:py-28">
      <div className="sheet">
        <div className="section-head">
          <p className="kicker">
            <span className="kicker-num">05</span> / Contact
          </p>
          <h2 className="title-section">Let's talk</h2>
          <p className="lede">
            Open to research collaborations, industry partnerships and scientific
            consulting — or simply a conversation about the chemistry.
          </p>
        </div>

        <div className="grid gap-x-16 gap-y-14 lg:grid-cols-[1fr_22rem]">
          <div>
            <div className="border-t border-rule">
              {METHODS.map((method) => {
                const { icon: ItemIcon, label, value, href } = method;
                const external = href.startsWith("http");
                return (
                  <a
                    key={label}
                    href={href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                    className="group flex items-center gap-5 border-b border-rule-soft py-5 transition-colors hover:text-accent"
                  >
                    <ItemIcon
                      aria-hidden="true"
                      className="shrink-0 text-base text-fg-faint transition-colors group-hover:text-accent"
                    />
                    <span className="w-28 shrink-0 font-sans text-[0.6875rem] uppercase tracking-[0.12em] text-fg-faint">
                      {label}
                    </span>
                    <span className="truncate font-display text-[1.0625rem] text-fg group-hover:text-accent">
                      {value}
                    </span>
                  </a>
                );
              })}
            </div>

            <h3 className="mt-16 font-display text-[1.25rem] text-fg">
              Professional references
            </h3>
            <div className="mt-6 grid gap-x-12 gap-y-8 sm:grid-cols-2">
              {references.map((ref) => (
                <div key={ref.id} className="border-t border-rule pt-5">
                  <p className="font-display text-[1.0625rem] text-fg">{ref.name}</p>
                  <p className="mt-1 font-sans text-[0.8125rem] text-fg-faint">{ref.position}</p>
                  <p className="font-sans text-[0.8125rem] text-fg-faint">{ref.institution}</p>
                  <a
                    href={`mailto:${ref.email}`}
                    className="mt-3 inline-block font-sans text-[0.8125rem] text-accent hover:underline"
                  >
                    {ref.email}
                  </a>
                </div>
              ))}
            </div>
          </div>

          <aside className="lg:border-l lg:border-rule-soft lg:pl-10">
            <p className="font-sans text-[0.6875rem] uppercase tracking-[0.12em] text-fg-faint">
              Based in
            </p>
            <p className="mt-3 flex items-center gap-2 font-display text-[1.25rem] text-fg">
              <FaMapMarkerAlt aria-hidden="true" className="text-accent" />
              {personal.location}
            </p>

            <p className="mt-10 font-sans text-[0.6875rem] uppercase tracking-[0.12em] text-fg-faint">
              Currently seeking
            </p>
            <p className="mt-3 font-display text-[1.25rem] leading-snug text-fg">
              Fully funded PhD positions
            </p>
            <p className="mt-3 font-display text-[1rem] leading-relaxed text-fg-soft">
              In medicinal, organic, materials or computational chemistry.
            </p>

            <a
              href={`mailto:${contact.email}?subject=Collaboration%20Inquiry`}
              className="btn btn-accent mt-8 w-full justify-center"
            >
              <FaEnvelope aria-hidden="true" />
              Send an email
              <FaArrowRight aria-hidden="true" />
            </a>
          </aside>
        </div>

        <footer className="mt-24 border-t border-rule pt-8">
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <p className="font-display text-[1.25rem] text-fg">{personal.name}</p>
            <p className="figure-label tabular-nums">
              © {new Date().getFullYear()} · {personal.location}
            </p>
          </div>
        </footer>
      </div>
    </section>
  );
};

export default Contact;