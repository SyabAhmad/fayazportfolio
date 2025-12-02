import React, { useEffect, useRef, useState } from "react";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaLinkedin,
  FaTwitter,
  FaSkype,
  FaFlask,
  FaGraduationCap,
  FaPaperPlane,
  FaAtom,
  FaArrowRight,
} from "react-icons/fa";
import contactData from "../data/contactData.json";

const Contact = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const { personal, contact, references } = contactData;

  const contactMethods = [
    {
      icon: FaEnvelope,
      label: "Email",
      value: contact.email,
      href: `mailto:${contact.email}`,
      color: "#ec4899",
    },
    {
      icon: FaPhone,
      label: "Phone",
      value: contact.phones[0],
      href: `tel:${contact.phones[0].replace(/-/g, "")}`,
      color: "#10b981",
    },
    {
      icon: FaLinkedin,
      label: "LinkedIn",
      value: contact.linkedin.username,
      href: contact.linkedin.url,
      color: "#0077b5",
    },
    {
      icon: FaMapMarkerAlt,
      label: "Location",
      value: personal.location,
      color: "#f97316",
    },
    {
      icon: FaSkype,
      label: "Skype",
      value: contact.skype,
      color: "#00aff0",
    },
    {
      icon: FaTwitter,
      label: "Twitter",
      value: contact.twitter,
      href: `https://twitter.com/${contact.twitter.replace("@", "")}`,
      color: "#1da1f2",
    },
  ];

  return (
    <section id="contact" className="py-20 relative" ref={sectionRef}>
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#00f5ff]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#a855f7]/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#ec4899]/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-4">
            <FaAtom className="text-4xl text-[#00f5ff] animate-rotate-slow" />
            <h2 className="text-4xl sm:text-5xl font-bold gradient-text">
              Let's Connect
            </h2>
          </div>
          <p className="text-[#94a3b8] max-w-2xl mx-auto">
            Ready to collaborate on cutting-edge chemistry research? I'm always
            excited to discuss new opportunities and innovative projects.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Contact Info */}
          <div>
            <h3 className="text-2xl font-bold text-[#f8fafc] mb-6 flex items-center gap-3">
              <FaFlask className="text-[#00f5ff]" />
              Get In Touch
            </h3>
            <p className="text-[#cbd5e1] mb-8">
              Whether you're interested in research collaboration,
              pharmaceutical analysis, or just want to discuss the fascinating
              world of chemistry, I'd love to hear from you!
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {contactMethods.map((method, index) => {
                const IconComponent = method.icon;
                const content = (
                  <div
                    className={`glass rounded-xl p-4 card-hover group transition-all duration-700 ${
                      isVisible
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-10"
                    }`}
                    style={{
                      animationDelay: `${index * 100}ms`,
                      borderLeft: `3px solid ${method.color}`,
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="p-2 rounded-lg"
                        style={{ background: `${method.color}15` }}
                      >
                        <IconComponent
                          className="text-xl"
                          style={{ color: method.color }}
                        />
                      </div>
                      <div>
                        <div className="text-xs text-[#94a3b8] uppercase tracking-wide">
                          {method.label}
                        </div>
                        <div className="text-sm text-[#f8fafc] group-hover:text-[#00f5ff] transition-colors">
                          {method.value}
                        </div>
                      </div>
                    </div>
                  </div>
                );

                return method.href ? (
                  <a
                    key={method.label}
                    href={method.href}
                    target={
                      method.href.startsWith("http") ? "_blank" : undefined
                    }
                    rel={
                      method.href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                  >
                    {content}
                  </a>
                ) : (
                  <div key={method.label}>{content}</div>
                );
              })}
            </div>
          </div>

          {/* Quick Message CTA */}
          <div className="flex flex-col justify-center">
            <div className="glass rounded-3xl p-8 text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-[#00f5ff] to-[#a855f7] mb-6">
                <FaPaperPlane className="text-3xl text-[#0a0a1a]" />
              </div>
              <h3 className="text-2xl font-bold text-[#f8fafc] mb-4">
                Ready to Collaborate?
              </h3>
              <p className="text-[#cbd5e1] mb-6">
                Let's discuss how we can work together on your next chemistry
                project or research initiative.
              </p>
              <a
                href={`mailto:${contact.email}?subject=Collaboration Inquiry`}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-[#00f5ff] to-[#a855f7] text-[#0a0a1a] font-bold hover:shadow-lg hover:shadow-[#00f5ff]/30 transition-all duration-300 hover:-translate-y-1"
              >
                <FaEnvelope />
                Send Me an Email
                <FaArrowRight />
              </a>
            </div>
          </div>
        </div>

        {/* References */}
        <div>
          <h3 className="text-2xl font-bold text-center text-[#f8fafc] mb-8 flex items-center justify-center gap-3">
            <FaGraduationCap className="text-[#a855f7]" />
            Professional References
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {references.map((ref, index) => (
              <div
                key={ref.id}
                className={`glass rounded-2xl p-6 card-hover transition-all duration-700 ${
                  isVisible
                    ? "opacity-100 translate-x-0"
                    : index === 0
                    ? "opacity-0 -translate-x-10"
                    : "opacity-0 translate-x-10"
                }`}
                style={{
                  animationDelay: `${(index + 6) * 100}ms`,
                  borderTop: `4px solid ${index === 0 ? "#00f5ff" : "#a855f7"}`,
                }}
              >
                <div className="flex items-start gap-4">
                  <div
                    className="p-3 rounded-xl"
                    style={{
                      background:
                        index === 0
                          ? "rgba(0, 245, 255, 0.1)"
                          : "rgba(168, 85, 247, 0.1)",
                    }}
                  >
                    <FaGraduationCap
                      className="text-2xl"
                      style={{ color: index === 0 ? "#00f5ff" : "#a855f7" }}
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-bold text-[#f8fafc] mb-1">
                      {ref.name}
                    </h4>
                    <p className="text-sm text-[#94a3b8] mb-2">
                      {ref.position}
                    </p>
                    <p className="text-sm text-[#94a3b8] mb-2">
                      {ref.institution}
                    </p>
                    <div className="flex items-center gap-2 text-sm">
                      <FaEnvelope
                        style={{ color: index === 0 ? "#00f5ff" : "#a855f7" }}
                      />
                      <a
                        href={`mailto:${ref.email}`}
                        className="text-[#cbd5e1] hover:text-[#00f5ff] transition-colors"
                      >
                        {ref.email}
                      </a>
                    </div>
                    <div className="mt-3">
                      <span
                        className="inline-block px-3 py-1 rounded-full text-xs"
                        style={{
                          background:
                            index === 0
                              ? "rgba(0, 245, 255, 0.1)"
                              : "rgba(168, 85, 247, 0.1)",
                          color: index === 0 ? "#00f5ff" : "#a855f7",
                          border: `1px solid ${
                            index === 0
                              ? "rgba(0, 245, 255, 0.3)"
                              : "rgba(168, 85, 247, 0.3)"
                          }`,
                        }}
                      >
                        {ref.expertise}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-20 pt-8 border-t border-white/10 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <FaFlask className="text-2xl text-[#00f5ff]" />
            <span className="text-xl font-bold gradient-text">
              {personal.name}
            </span>
          </div>
          <p className="text-[#94a3b8] text-sm mb-4">{personal.title}</p>
          <div className="flex justify-center gap-4">
            <a
              href={contact.linkedin.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full glass hover:bg-[#0077b5]/20 transition-colors"
            >
              <FaLinkedin className="text-xl text-[#0077b5]" />
            </a>
            <a
              href={`mailto:${contact.email}`}
              className="p-3 rounded-full glass hover:bg-[#ec4899]/20 transition-colors"
            >
              <FaEnvelope className="text-xl text-[#ec4899]" />
            </a>
            <a
              href={`https://twitter.com/${contact.twitter.replace("@", "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full glass hover:bg-[#1da1f2]/20 transition-colors"
            >
              <FaTwitter className="text-xl text-[#1da1f2]" />
            </a>
          </div>
          <p className="text-[#64748b] text-xs mt-6">
            © {new Date().getFullYear()} {personal.name}. All rights reserved.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Contact;
