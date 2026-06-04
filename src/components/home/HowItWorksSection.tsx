"use client";

import { useState } from "react";

type WorkflowAudience = "students" | "partners";

type WorkflowStep = {
  title: string;
  description: string;
};

const workflows: Record<WorkflowAudience, WorkflowStep[]> = {
  students: [
    {
      title: "Submit Your Work",
      description:
        "Upload your completed project, research, prototype, business idea, or creative work with key details and visuals.",
    },
    {
      title: "Get Reviewed",
      description:
        "The platform checks basic details, visibility settings, and safety before publishing your project.",
    },
    {
      title: "Receive Requests",
      description:
        "Industry partners can request contact or private access without seeing your personal details publicly.",
    },
    {
      title: "Unlock Opportunities",
      description:
        "Connect for collaboration, hiring, funding, licensing, acquisition, or research partnerships.",
    },
  ],
  partners: [
    {
      title: "Explore Projects",
      description:
        "Browse student innovations across technology, business, health, agriculture, engineering, design, research, and more.",
    },
    {
      title: "Request Access",
      description:
        "Send a request to contact the creators or view private project details when needed.",
    },
    {
      title: "Connect Safely",
      description:
        "Communicate through the platform while project files and personal contact details stay protected.",
    },
    {
      title: "Create Real Value",
      description:
        "Hire talent, collaborate with teams, invest in ideas, license solutions, or acquire promising projects.",
    },
  ],
};

const tabs: Array<{ id: WorkflowAudience; label: string }> = [
  { id: "students", label: "For Students" },
  { id: "partners", label: "For Industry & Partners" },
];

const audienceMeta: Record<WorkflowAudience, { label: string; outcome: string; color: string }> = {
  students: {
    label: "Creator path",
    outcome: "Protected visibility for serious opportunities",
    color: "from-cyan-500 to-emerald-400",
  },
  partners: {
    label: "Partner path",
    outcome: "A safer way to discover university innovation",
    color: "from-indigo-500 to-blue-400",
  },
};

function SectionHeader() {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <p className="text-xs font-extrabold uppercase tracking-[0.24em] text-blue-600">Simple, safe, guided</p>
      <h2 id="how-it-works-title" className="mt-4 text-[clamp(2.125rem,8vw,2.75rem)] font-extrabold leading-tight text-slate-950 md:text-5xl">
        How It Works
      </h2>
      <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-600 md:text-lg">
        A simple, trusted process for turning university work into real-world opportunities.
      </p>
    </div>
  );
}

function WorkflowTabs({
  activeTab,
  onChange,
}: {
  activeTab: WorkflowAudience;
  onChange: (tab: WorkflowAudience) => void;
}) {
  return (
    <div className="mx-auto mt-8 grid w-full max-w-xl grid-cols-2 rounded-full border border-slate-200 bg-white p-1.5 shadow-xl shadow-slate-900/[0.06]">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            type="button"
            className={`min-h-12 rounded-full px-3 text-sm font-extrabold transition focus:outline-none focus:ring-4 focus:ring-blue-100 sm:text-base ${
              isActive
                ? "bg-slate-950 text-white shadow-lg shadow-slate-900/15"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"
            }`}
            aria-pressed={isActive}
            onClick={() => onChange(tab.id)}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}

function WorkflowStepCard({ step, index }: { step: WorkflowStep; index: number }) {
  const stepNumber = String(index + 1).padStart(2, "0");

  return (
    <article className="group relative rounded-[1.75rem] border border-slate-200 bg-white/90 p-5 shadow-xl shadow-slate-900/[0.06] backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-2xl hover:shadow-slate-900/[0.1] sm:p-6">
      <div className="flex gap-4">
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-slate-950 text-sm font-black text-white shadow-lg shadow-slate-900/15">
          {stepNumber}
        </span>
        <div>
          <h3 className="text-xl font-extrabold leading-tight text-slate-950">{step.title}</h3>
          <p className="mt-2 text-sm leading-6 text-slate-600">{step.description}</p>
        </div>
      </div>
    </article>
  );
}

function ProcessRibbon({ activeTab }: { activeTab: WorkflowAudience }) {
  const meta = audienceMeta[activeTab];

  return (
    <aside className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-950 p-6 text-white shadow-2xl shadow-slate-900/15 lg:p-8">
      <div className={`absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gradient-to-br ${meta.color} opacity-35 blur-3xl`} />
      <div className="relative">
        <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-white/55">{meta.label}</p>
        <h3 className="mt-4 !text-white text-3xl font-extrabold leading-tight">{meta.outcome}</h3>
        <div className="mt-8 grid grid-cols-4 gap-2">
          {["01", "02", "03", "04"].map((number) => (
            <div key={number} className="rounded-2xl border border-white/12 bg-white/8 p-3 text-center">
              <span className="text-sm font-black text-white">{number}</span>
            </div>
          ))}
        </div>
        <div className="mt-8 h-2 rounded-full bg-white/10">
          <div className={`h-2 w-full rounded-full bg-gradient-to-r ${meta.color}`} />
        </div>
      </div>
    </aside>
  );
}

function WorkflowLayout({ activeTab }: { activeTab: WorkflowAudience }) {
  const steps = workflows[activeTab];

  return (
    <div className="mt-10 grid gap-5 lg:mt-14 lg:grid-cols-[0.42fr_0.58fr] lg:items-stretch lg:gap-8">
      <ProcessRibbon activeTab={activeTab} />
      <div className="relative">
        <div className="absolute bottom-8 left-6 top-8 hidden w-px bg-gradient-to-b from-transparent via-slate-300 to-transparent sm:block lg:left-1/2 lg:-translate-x-1/2" />
        <div className="grid gap-4 sm:grid-cols-2">
          {steps.map((step, index) => (
            <WorkflowStepCard key={step.title} step={step} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

export function HowItWorksSection() {
  const [activeTab, setActiveTab] = useState<WorkflowAudience>("students");

  return (
    <section
      className="relative overflow-hidden bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_52%,#eef6ff_100%)] py-16 sm:py-20 lg:py-24 xl:py-28"
      aria-labelledby="how-it-works-title"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(37,99,235,0.08),transparent_28%),radial-gradient(circle_at_82%_76%,rgba(16,185,129,0.1),transparent_30%)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

      <div className="relative mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8">
        <SectionHeader />
        <WorkflowTabs activeTab={activeTab} onChange={setActiveTab} />
        <WorkflowLayout activeTab={activeTab} />
      </div>
    </section>
  );
}
