"use client";

import { useState } from "react";

type FAQ = {
  question: string;
  answer: string;
};

const faqs: FAQ[] = [
  {
    question: "Who can upload projects?",
    answer:
      "University students or student teams can upload completed projects, research, prototypes, business ideas, and creative work.",
  },
  {
    question: "Is this only for IT projects?",
    answer:
      "No. The platform supports many fields including technology, engineering, business, health, agriculture, tourism, education, science, creative design, and social impact.",
  },
  {
    question: "Will my phone number or email be public?",
    answer:
      "No. Personal contact details are not shown publicly. Interested partners must send a contact request through the platform.",
  },
  {
    question: "Can I hide my report, source code, or dataset?",
    answer:
      "Yes. Public pages show only project summaries and visuals. Private files can stay locked and shared only after approved access.",
  },
  {
    question: "Can group projects be uploaded?",
    answer:
      "Yes, but all group members should agree before the project is published or shared for commercial opportunities.",
  },
  {
    question: "How can industry partners contact students?",
    answer:
      "They can create an account, find a project, and send a contact or private access request through the platform.",
  },
  {
    question: "Can a company buy, license, invest in, or collaborate on a project?",
    answer:
      "Yes. The platform can support collaboration, hiring, investment, licensing, acquisition, and research partnerships depending on the project owner’s preference.",
  },
  {
    question: "Are projects reviewed before publishing?",
    answer:
      "Yes. Projects can be reviewed by the platform before publishing to reduce fake, copied, unsafe, or incomplete listings.",
  },
];

function FAQIntro() {
  return (
    <div className="lg:sticky lg:top-28">
      <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-blue-600">Questions before you start</p>
      <h2 id="faq-title" className="mt-4 text-[clamp(2.125rem,8vw,2.75rem)] font-extrabold leading-tight text-slate-950 md:text-5xl">
        Frequently Asked Questions
      </h2>
      <p className="mt-5 max-w-xl text-base leading-7 text-slate-600 md:text-lg">
        Clear answers for students, creators, companies, investors, and partners before they get started.
      </p>
      <div className="mt-7 rounded-3xl border border-slate-200 bg-white p-5 shadow-xl shadow-slate-900/[0.05]">
        <p className="text-sm font-extrabold text-slate-950">Still have questions?</p>
        <a
          href="/contact"
          className="mt-2 inline-flex rounded-xl text-sm font-extrabold text-blue-700 transition hover:text-blue-900 focus:outline-none focus:ring-4 focus:ring-blue-100"
        >
          Contact us
          <span className="ml-2" aria-hidden="true">
            &rarr;
          </span>
        </a>
      </div>
    </div>
  );
}

function FAQItem({
  item,
  index,
  isOpen,
  onToggle,
}: {
  item: FAQ;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const answerId = `faq-answer-${index}`;

  return (
    <div
      className={`rounded-2xl border bg-white transition duration-300 ${
        isOpen ? "border-blue-200 shadow-xl shadow-slate-900/[0.07]" : "border-slate-200 shadow-sm shadow-slate-900/[0.03]"
      }`}
    >
      <button
        type="button"
        className="flex min-h-[56px] w-full items-center justify-between gap-4 px-5 py-4 text-left focus:outline-none focus:ring-4 focus:ring-blue-100 sm:px-6"
        aria-expanded={isOpen}
        aria-controls={answerId}
        onClick={onToggle}
      >
        <span className="text-[0.98rem] font-extrabold leading-6 text-slate-950">{item.question}</span>
        <span
          className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border border-slate-200 bg-slate-50 text-lg font-bold text-slate-700 transition ${
            isOpen ? "rotate-45 border-blue-200 bg-blue-50 text-blue-700" : ""
          }`}
          aria-hidden="true"
        >
          +
        </span>
      </button>
      <div
        id={answerId}
        className={`grid transition-all duration-300 ease-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
      >
        <div className="overflow-hidden">
          <p className="px-5 pb-5 text-sm leading-6 text-slate-600 sm:px-6 sm:pb-6">{item.answer}</p>
        </div>
      </div>
    </div>
  );
}

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section
      className="relative overflow-hidden bg-slate-50 py-16 sm:py-20 lg:py-24 xl:py-28"
      aria-labelledby="faq-title"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(37,99,235,0.06),transparent_30%),radial-gradient(circle_at_80%_70%,rgba(16,185,129,0.06),transparent_28%)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

      <div className="relative mx-auto grid w-full max-w-7xl gap-10 px-5 sm:px-6 lg:grid-cols-[0.38fr_0.62fr] lg:gap-12 lg:px-8">
        <FAQIntro />

        <div className="grid gap-3">
          {faqs.map((item, index) => (
            <FAQItem
              key={item.question}
              item={item}
              index={index}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex((current) => (current === index ? -1 : index))}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
