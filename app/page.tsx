"use client";

import Image from "next/image";

import { useEffect, useState } from "react";

type CaseFile = {

  id: number;

  number: string;

  title: string;

  label: string;

  status: string;

  problem: string;

  solution: string;

  role: string;

  stack: string[];

};

export default function Home() {
  const [introStarted, setIntroStarted] = useState(false);
  const [introFinished, setIntroFinished] = useState(false);

  // Kick off the intro animation once, right after the component mounts on the client.
  useEffect(() => {
    setIntroStarted(true);
  }, []);

  useEffect(() => {
    if (!introStarted) return;

    const timer = window.setTimeout(() => {
      setIntroFinished(true);
    }, 5200);

    return () => window.clearTimeout(timer);
  }, [introStarted]);

  // Lock scrolling only while the intro overlay is visible, and always restore it afterward.
  useEffect(() => {
    if (!introStarted || introFinished) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [introStarted, introFinished]);

  const introDateLabel =
    typeof window !== "undefined"
      ? new Date().toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
      : "";
  const [activeCase, setActiveCase] = useState<number | null>(null);

  useEffect(() => {
    if (activeCase === null) return;

    const previousOverflow = document.body.style.overflow;
    const previousPaddingRight = document.body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.style.paddingRight = previousPaddingRight;
    };
  }, [activeCase]);

  const caseFiles: CaseFile[] = [

    {

      id: 1,

      number: "CASE FILE 01",

      title: "AI Interview Platform",

      label: "STARTUP DOSSIER",

      status: "STARTUP BUILD",

      problem:

        "Technical interview preparation is often generic. Candidates need role-specific questions and a more intelligent way to practice and evaluate their performance.",

      solution:

        "An AI-powered interview platform designed to generate role-specific technical interviews using Large Language Models, structured workflows, backend APIs, and automated evaluation.",

      role:

        "Worked on the product and engineering workflow inside a startup environment, contributing to the AI-powered interview experience and technical implementation.",

      stack: [

        "Next.js",

        "Node.js",

        "Express.js",

        "LLMs",

        "JavaScript",

      ],

    },

    {

      id: 2,

      number: "CASE FILE 02",

      title: "NGO Resource Allocation System",

      label: "FIELD REPORT",

      status: "ACTIVE PROTOTYPE",

      problem:

        "During emergencies, NGOs and volunteers can face fragmented communication, delayed coordination, and inefficient allocation of available resources.",

      solution:

        "A disaster-response platform connecting NGOs, volunteers, and beneficiaries through location-aware allocation, SOS workflows, operational dashboards, and real-time coordination.",

      role:

        "Designed and developed the product architecture and workflows for intelligent resource coordination, including real-time allocation and location-aware operations.",

      stack: [

        "Next.js",

        "Node.js",

        "PostgreSQL",

        "Maps",

        "Socket.io",

      ],

    },

    {

      id: 3,

      number: "CASE FILE 03",

      title: "HealAI",

      label: "INVESTIGATION DOSSIER",

      status: "PROJECT ARCHIVE",

      problem:

        "Insurance claims can be document-heavy, slow, repetitive, and difficult for users navigating verification and claim submission.",

      solution:

        "An AI-assisted insurance claim platform combining OCR-based document processing, intelligent claim assistance, and conversational guidance to reduce friction.",

      role:

        "Built the concept and technical workflow around simplifying insurance claim processing through AI-assisted document handling and user guidance.",

      stack: [

        "Python",

        "Machine Learning",

        "OCR",

        "NLP",

        "Generative AI",

      ],

    },

  ];

  const activeCaseData =

    caseFiles.find((caseFile) => caseFile.id === activeCase) ?? null;

  return (

    <>

      {/* =========================================================*
          *NEWSPAPER DELIVERY INTRO ANIMATION (runs once on load)*
      *========================================================= */}

      {/* =========================================================
    NEWSPAPER INTRO ANIMATION
========================================================= */}

      {introStarted && !introFinished && (
        <div className="intro-overlay" aria-hidden="true">
          <div className="intro-newspaper-wrap">
            <div className="intro-newspaper-arrival">
              <div className="intro-newspaper-body">
                <div className="intro-newspaper-fold" />

                <div className="intro-newspaper-content">
                  <p className="intro-np-kicker">Special Edition</p>

                  <h2 className="intro-np-title">
                    The Archisman
                    <br />
                    Daily
                  </h2>

                  <div className="intro-np-meta">
                    <span>Kolkata, India</span>
                    <span>{introDateLabel}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <main className="px-4 py-2 md:px-8 md:py-4">

        {/* =========================================================*

            *FRONT PAGE / HERO*

        *========================================================= */}

        <section className="mx-auto flex h-screen w-full max-w-[1500px] flex-col overflow-hidden border-t-2 border-[var(--ink)]">

          {/* Masthead */}

          <header className="grid shrink-0 grid-cols-3 items-center border-b border-[var(--ink)] py-3 md:py-4">

            <p className="text-xs font-semibold uppercase tracking-wider md:text-sm">

              Est. 2005

            </p>

            <div className="text-center">

              <h1 className="text-2xl font-bold uppercase tracking-[0.12em] md:text-4xl">

                The Archisman Daily

              </h1>

              <p className="mt-1 text-[10px] uppercase tracking-[0.25em] md:text-xs">

                Special Edition

              </p>

            </div>

            <p className="text-right text-xs font-semibold uppercase tracking-wider md:text-sm">

              Kolkata, India

            </p>

          </header>

          {/* Navigation */}

          <nav className="flex shrink-0 items-center justify-between gap-3 overflow-x-auto border-b border-[var(--ink)] py-3 text-[10px] font-bold uppercase tracking-widest md:justify-center md:gap-10 md:text-xs">

            <a href="#home">Home</a>

            <span>✦</span>

            <a href="#story">Story</a>

            <span>✦</span>

            <a href="#achievements">Achievements</a>

            <span>✦</span>

            <a href="#skills">Skills</a>

            <span>✦</span>

            <a href="#projects">Projects</a>

            <span>✦</span>

            <a href="#contact">Contact</a>

          </nav>

          {/* Hero */}

          <section

            id="home"

            className="grid min-h-0 flex-1 grid-cols-1 overflow-hidden lg:grid-cols-[0.9fr_1.1fr]"

          >

            {/* Left */}

            <div className="min-h-0 border-b border-[var(--ink)] px-6 py-4 lg:border-b-0 lg:border-r lg:px-10">

              <div className="flex h-full min-h-0 flex-col items-center">

                <h2 className="editorial shrink-0 text-5xl font-black uppercase leading-none tracking-[-0.08em] md:text-7xl">

                  Wanted

                </h2>

                <p className="mt-1 shrink-0 text-sm font-bold uppercase tracking-[0.3em] md:text-base">

                  Dead or Alive

                </p>

                <div className="flex min-h-0 flex-1 items-center justify-center py-3">

                  <Image

                    src="/wanted-poster.png"

                    alt="Wanted poster of Archisman Kundu"

                    width={1024}

                    height={1536}

                    priority

                    className="block h-auto max-h-full w-auto max-w-full border-2 border-[var(--ink)] object-contain"

                  />

                </div>

                <div className="shrink-0 w-full max-w-[430px] border-y-2 border-[var(--ink)] py-1 text-center">

                  <p className="text-[10px] font-bold uppercase tracking-[0.3em] md:text-xs">

                    Reward

                  </p>

                  <p className="editorial mt-1 text-3xl font-black md:text-5xl">

                    ∞ EXPERIENCE

                  </p>

                </div>

                <p className="mt-2 shrink-0 text-center text-[9px] font-bold uppercase tracking-[0.2em] md:text-xs">

                  Adventurer • Developer • Dreamer

                </p>

              </div>

            </div>

            {/* Right */}

            <div className="flex min-h-0 flex-col justify-center px-6 py-4 md:px-10 lg:px-14">

              <p className="text-xs font-bold uppercase tracking-[0.3em] md:text-sm">

                ✦ Introducing ✦

              </p>

              <h2 className="editorial mt-3 text-5xl font-black uppercase leading-[0.82] tracking-[-0.07em] md:text-7xl xl:text-[6.5rem]">

                Archisman

                <br />

                Kundu

              </h2>

              <div className="mt-4 border-y border-[var(--ink)] py-2">

                <p className="text-xs font-bold uppercase tracking-[0.15em] md:text-base">

                  Developer. Problem Solver. Creator.

                </p>

              </div>

              <p className="newspaper-serif mt-4 max-w-xl text-base leading-relaxed md:text-xl">

                I build digital experiences, solve complex problems, and turn

                ambitious ideas into reality. Currently exploring the

                intersection of technology, creativity, AI, and engineering.

              </p>

              <div className="mt-5 flex flex-wrap gap-4">

                <a

                  href="#projects"

                  className="border border-[var(--ink)] bg-transparent px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] text-[var(--ink)] transition-all duration-300 hover:border-[var(--red)] hover:text-[var(--red)]"

                >

                  View My Work

                </a>

                <a

                  href="#story"

                  className="border border-[var(--ink)] bg-transparent px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] text-[var(--ink)] transition-all duration-300 hover:border-[var(--red)] hover:text-[var(--red)]"

                >

                  Read My Story

                </a>

              </div>

              <blockquote className="mt-5 max-w-lg border-l-2 border-[var(--ink)] pl-5 text-base italic md:text-xl">

                “I don&apos;t chase dreams. I build them.”

              </blockquote>

            </div>

          </section>

        </section>

        {/* =========================================================*

            *STORY*

        *========================================================= */}

        <section

          id="story"

          className="mx-auto w-full max-w-[1500px] border-t-2 border-[var(--ink)] pt-12 md:pt-20"

        >

          <div className="border-y border-[var(--ink)] py-6 text-center">

            <p className="text-[10px] font-bold uppercase tracking-[0.35em] md:text-xs">

              Vol. I • The Origin Story

            </p>

            <h2 className="editorial mt-3 text-5xl font-black uppercase tracking-[-0.05em] md:text-7xl lg:text-8xl">

              The Story So Far

            </h2>

            <p className="mt-3 text-xs font-bold uppercase tracking-[0.25em] text-[var(--ink-muted)] md:text-sm">

              Curiosity. Chaos. Code. Creation.

            </p>

          </div>

          <div className="grid border-b border-[var(--ink)] lg:grid-cols-[0.8fr_1.2fr]">

            <div className="border-b border-[var(--ink)] p-8 lg:border-b-0 lg:border-r lg:p-12">

              <p className="text-xs font-bold uppercase tracking-[0.3em]">

                ✦ Chapter One

              </p>

              <h3 className="editorial mt-6 text-4xl font-black leading-[0.9] md:text-6xl">

                Built From

                <br />

                Curiosity.

              </h3>

              <div className="mt-8 border-l-2 border-[var(--red)] pl-5">

                <p className="text-lg italic leading-relaxed md:text-xl">

                  I was never interested in simply consuming technology. I

                  wanted to understand how things worked — and eventually,

                  build things of my own.

                </p>

              </div>

              <div className="mt-10 border-t border-[var(--ink)] pt-6">

                <p className="text-[10px] font-bold uppercase tracking-[0.25em]">

                  Current Mission

                </p>

                <p className="editorial mt-2 text-3xl font-bold">

                  Learn. Build. Fail.

                  <br />

                  Repeat.

                </p>

              </div>

            </div>

            <div className="p-8 md:p-12 lg:p-16">

              <p className="newspaper-serif max-w-3xl text-lg leading-relaxed md:text-2xl">

                My journey into technology began much earlier than writing my

                first lines of code. Back in school, I used to sit in front of

                computers and wonder what was happening behind the screen—how

                something so ordinary could process information, respond to

                commands, and make complex things happen. What began as simple

                curiosity slowly evolved into something more serious:

                programming, problem solving, engineering ideas, and building

                projects that could exist beyond a classroom assignment. Now,

                instead of just wondering how technology works, I am learning

                to build with it.

              </p>

              <div className="mt-8 grid gap-8 border-y border-[var(--ink)] py-8 md:grid-cols-2">

                <div>

                  <p className="text-[10px] font-bold uppercase tracking-[0.25em]">

                    The Mindset

                  </p>

                  <p className="mt-3 leading-relaxed text-[var(--ink-muted)]">

                    I believe progress comes from doing difficult things

                    repeatedly. Not waiting until I feel ready, but building

                    the competence to handle what I once could not.

                  </p>

                </div>

                <div>

                  <p className="text-[10px] font-bold uppercase tracking-[0.25em]">

                    The Direction

                  </p>

                  <p className="mt-3 leading-relaxed text-[var(--ink-muted)]">

                    Today, I am focused on software engineering, artificial

                    intelligence, problem solving, and creating technology that

                    turns ambitious ideas into real systems.

                  </p>

                </div>

              </div>

              <div className="mt-10">

                <p className="editorial text-3xl font-black md:text-5xl">

                  The goal was never to fit in.

                </p>

                <p className="editorial mt-2 text-3xl font-black text-[var(--red)] md:text-5xl">

                  It was to become undeniable.

                </p>

              </div>

              <div className="mt-10 flex flex-wrap items-center gap-4">

                {["Developer", "Builder", "Explorer", "Problem Solver"].map(

                  (item) => (

                    <span

                      key={item}

                      className="border border-[var(--ink)] px-4 py-2 text-xs font-bold uppercase tracking-[0.2em]"

                    >

                      {item}

                    </span>

                  )

                )}

              </div>

            </div>

          </div>

          <div className="flex flex-col items-center justify-between gap-4 border-b-2 border-[var(--ink)] py-6 text-center md:flex-row">

            <p className="text-xs font-bold uppercase tracking-[0.25em]">

              The story is still being written.

            </p>

            <p className="editorial text-2xl font-black">

              — Archisman Kundu

            </p>

          </div>

        </section>

        {/* =========================================================*

            *ACHIEVEMENTS*

        *========================================================= */}

        <section

          id="achievements"

          className="mx-auto w-full max-w-[1500px] border-t-2 border-[var(--ink)] pt-12 md:pt-20"

        >

          <div className="border-y border-[var(--ink)] px-6 py-8 text-center md:py-12">

            <p className="text-[10px] font-bold uppercase tracking-[0.35em] md:text-xs">

              Vol. II • The Record

            </p>

            <h2 className="editorial mt-3 text-5xl font-black uppercase tracking-[-0.05em] md:text-7xl lg:text-8xl">

              Things I&apos;ve Done

            </h2>

            <p className="mt-4 text-xs font-bold uppercase tracking-[0.25em] text-[var(--ink-muted)] md:text-sm">

              Not trophies. Evidence.

            </p>

          </div>

          <div className="grid border-b border-[var(--ink)] lg:grid-cols-[0.75fr_1.25fr]">

            <div className="flex flex-col justify-between border-b border-[var(--ink)] p-8 lg:min-h-[760px] lg:border-b-0 lg:border-r lg:p-12">

              <div>

                <p className="text-xs font-bold uppercase tracking-[0.3em]">

                  ✦ The Philosophy

                </p>

                <h3 className="editorial mt-6 text-4xl font-black leading-[0.9] md:text-6xl">

                  Don&apos;t wait

                  <br />

                  for permission.

                </h3>

                <div className="mt-8 border-l-2 border-[var(--red)] pl-5">

                  <p className="text-lg italic leading-relaxed md:text-xl">

                    Most of the things worth doing began before I felt ready.

                    The point was never to know everything first.

                  </p>

                </div>

              </div>

              <div className="mt-12 border-t border-[var(--ink)] pt-6">

                <p className="text-[10px] font-bold uppercase tracking-[0.25em]">

                  Current Score

                </p>

                <div className="mt-5 grid grid-cols-2 gap-6">

                  {[

                    ["01+", "Hackathons"],

                    ["04+", "Major Projects"],

                    ["02+", "Communities"],

                    ["∞", "Lessons"],

                  ].map(([number, label]) => (

                    <div key={label}>

                      <p className="editorial text-4xl font-black md:text-5xl">

                        {number}

                      </p>

                      <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--ink-muted)]">

                        {label}

                      </p>

                    </div>

                  ))}

                </div>

              </div>

            </div>

            <div className="p-8 md:p-12 lg:p-16">

              <p className="text-xs font-bold uppercase tracking-[0.3em]">

                Selected Milestones

              </p>

              <div className="mt-8">

                {[

                  {

                    number: "01",

                    category: "Community",

                    title: "Building Beyond The Classroom",

                    text: "Became actively involved in developer communities, learning that growth happens faster when you build, collaborate, and put yourself in rooms with people who are trying to create something meaningful.",

                    tags: ["GDG", "IEEE", "Collaboration"],

                  },

                  {

                    number: "02",

                    category: "Competition",

                    title: "Hackathons & High-Pressure Builds",

                    text: "Entered hackathons to test more than technical ability: rapid problem solving, teamwork, product thinking, and the ability to turn an incomplete idea into something real before time runs out.",

                    tags: ["Build Fast", "Problem Solving", "Teamwork"],

                  },

                  {

                    number: "03",

                    category: "Industry",

                    title: "From Learning To Shipping",

                    text: "Took the step from academic learning into real development work, contributing to product ideas and understanding what happens when software has to move beyond theory.",

                    tags: ["Development", "AI", "Product"],

                  },

                  {

                    number: "04",

                    category: "Ongoing",

                    title: "The Best Work Is Still Ahead",

                    text: "These are not the finish line. They are proof that the direction is working. The next chapter is about building stronger systems, solving harder problems, and creating work that earns attention.",

                    tags: [],

                  },

                ].map((achievement, index) => (

                  <article

                    key={achievement.number}

                    className={`grid border-t border-[var(--ink)] py-7 md:grid-cols-[120px_1fr] md:gap-8 ${index === 3 ? "border-b" : ""

                      }`}

                  >

                    <div>

                      <p className="editorial text-3xl font-black">

                        {achievement.number}

                      </p>

                      <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--red)]">

                        {achievement.category}

                      </p>

                    </div>

                    <div>

                      <h3 className="editorial text-3xl font-black md:text-4xl">

                        {achievement.title}

                      </h3>

                      <p className="mt-3 max-w-2xl leading-relaxed text-[var(--ink-muted)]">

                        {achievement.text}

                      </p>

                      {achievement.tags.length > 0 && (

                        <div className="mt-4 flex flex-wrap gap-2">

                          {achievement.tags.map((tag) => (

                            <span

                              key={tag}

                              className="border border-[var(--ink)] px-3 py-1 text-[9px] font-bold uppercase tracking-[0.18em]"

                            >

                              {tag}

                            </span>

                          ))}

                        </div>

                      )}

                    </div>

                  </article>

                ))}

              </div>

              <div className="mt-12">

                <p className="editorial text-4xl font-black leading-[0.95] md:text-6xl">

                  Still early.

                </p>

                <p className="editorial mt-2 text-4xl font-black leading-[0.95] text-[var(--red)] md:text-6xl">

                  Still dangerous.

                </p>

              </div>

            </div>

          </div>

          <div className="flex flex-col items-center justify-between gap-4 border-b-2 border-[var(--ink)] py-6 text-center md:flex-row">

            <p className="text-xs font-bold uppercase tracking-[0.25em]">

              Progress leaves a record.

            </p>

            <p className="editorial text-2xl font-black">

              — The Work Continues

            </p>

          </div>

        </section>

        {/* =========================================================*

            *SKILLS / ARSENAL*

        *========================================================= */}

        <section

          id="skills"

          className="mx-auto w-full max-w-[1500px] border-t-2 border-[var(--ink)]"

        >

          <div className="border-b border-[var(--ink)] px-6 py-8 text-center md:px-10 md:py-10">

            <p className="text-[10px] font-bold uppercase tracking-[0.45em] md:text-xs">

              Vol. III • The Working Arsenal

            </p>

            <h2 className="editorial mt-3 text-5xl font-black uppercase leading-none tracking-[-0.06em] md:text-7xl lg:text-8xl">

              The Arsenal

            </h2>

            <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.3em] md:text-xs">

              Tools don&apos;t make the builder. Mastery does.

            </p>

          </div>

          <div className="grid lg:grid-cols-[0.38fr_0.62fr]">

            <div className="flex min-h-[700px] flex-col border-b border-[var(--ink)] px-8 py-10 lg:min-h-[900px] lg:border-b-0 lg:border-r lg:px-12 lg:py-14">

              <div>

                <p className="text-[10px] font-bold uppercase tracking-[0.35em] md:text-xs">

                  ✦ The Philosophy

                </p>

                <h3 className="editorial mt-5 text-4xl font-black leading-[0.95] md:text-6xl">

                  Learn the tool.

                  <br />

                  Understand the system.

                  <br />

                  <span className="text-[var(--red)]">

                    Build the thing.

                  </span>

                </h3>

                <blockquote className="mt-8 border-l-2 border-[var(--red)] pl-5 text-lg italic leading-relaxed md:text-xl">

                  I don&apos;t chase technologies for the sake of adding them to

                  a résumé. I learn what helps me turn ideas into working

                  systems.

                </blockquote>

              </div>

              <div className="mt-12 border-t border-[var(--ink)] pt-7">

                <p className="newspaper-mono text-[10px] font-bold uppercase tracking-[0.3em]">

                  Current Focus

                </p>

                <p className="editorial mt-3 text-3xl font-black leading-tight md:text-4xl">

                  Engineering systems that move beyond the screen.

                </p>

                <p className="newspaper-serif mt-4 text-base leading-relaxed md:text-lg">

                  Building stronger foundations in backend systems, artificial

                  intelligence, cloud infrastructure, and the engineering

                  decisions that turn a prototype into something real.

                </p>

              </div>

              <div className="mt-auto border-t border-[var(--ink)] pt-7">

                <p className="newspaper-mono text-[10px] font-bold uppercase tracking-[0.3em]">

                  Operating Principle

                </p>

                <p className="editorial mt-3 text-3xl font-black leading-tight md:text-4xl">

                  Depth over noise.

                  <br />

                  <span className="text-[var(--red)]">

                    Execution over theory.

                  </span>

                </p>

              </div>

            </div>

            <div className="px-6 py-10 md:px-10 lg:px-14 lg:py-14">

              <p className="text-[10px] font-bold uppercase tracking-[0.4em] md:text-xs">

                The Working Stack

              </p>

              {[

                {

                  number: "01",

                  label: "Languages",

                  title: "The Foundation",

                  text: "The languages I use to think through problems, design logic, and turn ideas into functioning software.",

                  skills: ["JavaScript", "TypeScript", "Python", "Java", "C"],

                },

                {

                  number: "02",

                  label: "Frontend",

                  title: "Building What People See",

                  text: "Interfaces built around clarity, interaction, performance, and the experience of using the product—not just making it look good.",

                  skills: [

                    "React",

                    "Next.js",

                    "Tailwind CSS",

                    "HTML",

                    "CSS",

                    "Zustand",

                    "TanStack Query",

                  ],

                },

                {

                  number: "03",

                  label: "Backend",

                  title: "Behind The Interface",

                  text: "APIs, databases, real-time communication, and the systems that make an application continue working after the interface ends.",

                  skills: [

                    "Node.js",

                    "Express.js",

                    "PostgreSQL",

                    "Supabase",

                    "REST APIs",

                    "Socket.io",

                  ],

                },

                {

                  number: "04",

                  label: "Intelligence",

                  title: "AI & Intelligent Systems",

                  text: "Exploring how intelligence can move from a feature into a useful decision-making layer inside real products.",

                  skills: [

                    "Machine Learning",

                    "LLM APIs",

                    "Gemini API",

                    "AI Integration",

                    "Computer Vision",

                  ],

                },

                {

                  number: "05",

                  label: "Workshop",

                  title: "The Tools Around The Work",

                  text: "The infrastructure, collaboration tools, and deployment systems that take a project from local code to something people can use.",

                  skills: [

                    "Git",

                    "GitHub",

                    "Docker",

                    "Vercel",

                    "Google Cloud",

                    "Cloud Run",

                    "Postman",

                    "Figma",

                  ],

                },

              ].map((group, index) => (

                <div

                  key={group.number}

                  className={`border-t border-[var(--ink)] py-7 ${index === 4 ? "border-b" : ""

                    }`}

                >

                  <div className="grid gap-5 md:grid-cols-[140px_1fr]">

                    <div>

                      <p className="text-3xl font-black">{group.number}</p>

                      <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.25em] text-[var(--red)]">

                        {group.label}

                      </p>

                    </div>

                    <div>

                      <h3 className="editorial text-3xl font-black md:text-4xl">

                        {group.title}

                      </h3>

                      <p className="newspaper-serif mt-3 max-w-2xl text-base leading-relaxed md:text-lg">

                        {group.text}

                      </p>

                      <div className="mt-5 flex flex-wrap gap-2">

                        {group.skills.map((skill) => (

                          <span

                            key={skill}

                            className="border border-[var(--ink)] px-4 py-2 text-[9px] font-bold uppercase tracking-[0.2em]"

                          >

                            {skill}

                          </span>

                        ))}

                      </div>

                    </div>

                  </div>

                </div>

              ))}

              <div className="pt-10">

                <h3 className="editorial text-4xl font-black leading-[0.95] md:text-6xl">

                  The stack will change.

                  <br />

                  <span className="text-[var(--red)]">

                    The builder remains.

                  </span>

                </h3>

              </div>

            </div>

          </div>

          <div className="flex items-center justify-between border-t border-[var(--ink)] px-6 py-6 md:px-10">

            <p className="text-[9px] font-bold uppercase tracking-[0.3em]">

              Always Learning. Always Building.

            </p>

            <p className="editorial text-xl font-black md:text-2xl">

              — The Arsenal

            </p>

          </div>

        </section>

        {/* =========================================================*

            *PROJECTS*

        *========================================================= */}

        <section

          id="projects"

          className="mx-auto mt-16 w-full max-w-[1500px] border-t-2 border-[var(--ink)] md:mt-24"

        >

          <div className="border-b border-[var(--ink)] py-10 text-center md:py-14">

            <p className="text-[10px] font-bold uppercase tracking-[0.35em] md:text-xs">

              Vol. IV • The Work

            </p>

            <h2 className="editorial mt-3 text-5xl font-black uppercase tracking-[-0.06em] md:text-7xl lg:text-8xl">

              Built, Not Just Imagined

            </h2>

            <p className="mt-3 text-xs font-bold uppercase tracking-[0.25em] text-[var(--ink-muted)] md:text-sm">

              Problems. Systems. Execution.

            </p>

          </div>

          <div className="grid border-b border-[var(--ink)] lg:grid-cols-[0.75fr_1.25fr]">

            <div className="flex flex-col border-b border-[var(--ink)] p-8 lg:min-h-[900px] lg:border-b-0 lg:border-r lg:p-12">

              <div>

                <p className="text-xs font-bold uppercase tracking-[0.3em]">

                  ✦ The Philosophy

                </p>

                <h3 className="editorial mt-6 text-5xl font-black leading-[0.88] tracking-[-0.04em] md:text-6xl">

                  Ideas Mean

                  <br />

                  Nothing

                  <br />

                  Unbuilt.

                </h3>

                <div className="mt-8 border-l-2 border-[var(--red)] pl-5">

                  <p className="text-lg italic leading-relaxed md:text-xl">

                    I&apos;m interested in more than writing code. I like taking

                    an incomplete idea, breaking the problem apart, and turning

                    it into something people can actually use.

                  </p>

                </div>

              </div>

              <div className="mt-auto border-t border-[var(--ink)] pt-8">

                <p className="newspaper-mono text-[10px] font-bold uppercase tracking-[0.3em]">

                  Current Record

                </p>

                <div className="mt-5 grid grid-cols-2 gap-8">

                  <div>

                    <p className="editorial text-5xl font-black">03</p>

                    <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.2em]">

                      Featured Builds

                    </p>

                  </div>

                  <div>

                    <p className="editorial text-5xl font-black">10+</p>

                    <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.2em]">

                      Hackathons

                    </p>

                  </div>

                </div>

              </div>

            </div>

            <div className="p-8 md:p-12 lg:p-16">

              <p className="newspaper-mono text-[10px] font-bold uppercase tracking-[0.35em]">

                Selected Case Files

              </p>

              {[

                {

                  id: 1,

                  number: "01",

                  category: "AI / Product",

                  href: null,

                  startup: true,

                  title: (

                    <>

                      AI Interview

                      <br />

                      Platform

                    </>

                  ),

                  description:

                    "An AI-powered interview platform designed to generate role-specific technical interviews using Large Language Models. The system combines backend APIs, prompt engineering workflows, and automated candidate evaluation.",

                  stack: [

                    "Next.js",

                    "Node.js",

                    "Express.js",

                    "LLMs",

                    "JavaScript",

                  ],

                },

                {

                  id: 2,

                  number: "02",

                  category: "Social Impact",

                  href: "https://github.com/archisman-05/ResQnet",

                  startup: false,

                  title: (

                    <>

                      NGO Resource

                      <br />

                      Allocation System

                    </>

                  ),

                  description:

                    "A disaster-response platform built to connect NGOs, volunteers, and beneficiaries. The system focuses on efficient resource distribution through real-time volunteer allocation, SOS alerts, location tracking, and role-based operational dashboards.",

                  stack: [

                    "Next.js",

                    "Node.js",

                    "PostgreSQL",

                    "Maps",

                    "Real-Time Systems",

                  ],

                },

                {

                  id: 3,

                  number: "03",

                  category: "AI / Insurance",

                  href: "https://github.com/archisman-05/AI_Insurance_Advisor",

                  startup: false,

                  title: <>HealAI</>,

                  description:

                    "An AI-assisted insurance claim platform built to simplify claim processing. It combines OCR-based document verification, intelligent claim processing, and an NLP-powered chatbot to reduce friction during claim submission.",

                  stack: [

                    "Python",

                    "Machine Learning",

                    "OCR",

                    "NLP",

                    "Generative AI",

                  ],

                },

              ].map((project) => (

                <article

                  key={project.id}

                  className="group border-t border-[var(--ink)] py-8 first:mt-8"

                >

                  <div className="grid gap-6 md:grid-cols-[110px_1fr]">

                    <div>

                      <p className="editorial text-4xl font-black">

                        {project.number}

                      </p>

                      <div className="mt-2 flex flex-wrap items-center gap-2">

                        {project.startup && (

                          <span className="border border-[var(--red)] bg-[var(--red)] px-2 py-[3px] text-[8px] font-bold uppercase tracking-[0.22em] text-[var(--paper)]">

                            Startup

                          </span>

                        )}

                        <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-[var(--red)]">

                          {project.category}

                        </span>

                      </div>

                    </div>

                    <div>

                      <h3 className="editorial text-4xl font-black leading-[0.95] md:text-5xl">

                        {project.title}

                      </h3>

                      <p className="newspaper-serif mt-5 max-w-3xl text-base leading-relaxed text-[var(--ink-muted)] md:text-lg">

                        {project.description}

                      </p>

                      <div className="mt-6 flex flex-wrap gap-2">

                        {project.stack.map((tech) => (

                          <span

                            key={tech}

                            className="border border-[var(--ink)] px-3 py-1 text-[9px] font-bold uppercase tracking-[0.18em]"

                          >

                            {tech}

                          </span>

                        ))}

                      </div>

                      <div className="mt-7 flex flex-wrap items-center gap-3">

                        {project.href ? (
                          <a
                            href={project.href}
                            target="_blank"
                            rel="noreferrer"
                            className="border border-[var(--ink)] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] transition hover:border-[var(--red)] hover:text-[var(--red)]"
                          >
                            View Project ↗
                          </a>
                        ) : (
                          <button
                            type="button"
                            disabled
                            aria-label="Project link cannot be disclosed"
                            className="cursor-not-allowed border border-[var(--ink)] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] opacity-60"
                          >
                            Link Confidential
                          </button>
                        )}

                        <button

                          type="button"

                          onClick={() => setActiveCase(project.id)}

                          className="group/case flex items-center gap-2 border-b border-[var(--ink)] px-2 py-2 text-[10px] font-bold uppercase tracking-[0.2em] transition duration-300 hover:border-[var(--red)] hover:text-[var(--red)]"

                        >

                          <span className="inline-block text-sm transition duration-300 group-hover/case:-translate-y-1 group-hover/case:rotate-12">

                            📎

                          </span>

                          <span>Case File</span>

                          <span className="transition duration-300 group-hover/case:translate-x-1">

                            ↗

                          </span>

                        </button>

                      </div>

                    </div>

                  </div>

                </article>

              ))}

              <div className="border-t border-[var(--ink)] pt-10">

                <p className="editorial text-4xl font-black leading-[0.95] md:text-6xl">

                  More ideas are already

                  <br />

                  <span className="text-[var(--red)]">

                    under construction.

                  </span>

                </p>

                <p className="mt-5 max-w-2xl leading-relaxed text-[var(--ink-muted)]">

                  Every project teaches something the previous one could not.

                  The objective isn&apos;t to build a collection. It&apos;s to

                  keep increasing the difficulty of the problems worth solving.

                </p>

              </div>

            </div>

          </div>

          <div className="flex flex-col justify-between gap-4 border-b border-[var(--ink)] py-5 text-[10px] font-bold uppercase tracking-[0.3em] md:flex-row">

            <p>The Work Speaks.</p>

            <p>— Archisman Kundu</p>

          </div>

        </section>

        {/* =========================================================*

            *CONTACT*

        *========================================================= */}

        <section

          id="contact"

          className="mx-auto mt-16 w-full max-w-[1500px] border-t-2 border-[var(--ink)] md:mt-24"

        >

          <div className="border-b border-[var(--ink)] py-10 text-center md:py-14">

            <p className="text-[10px] font-bold uppercase tracking-[0.4em] md:text-xs">

              Vol. V • The Next Chapter

            </p>

            <h2 className="editorial mt-3 text-5xl font-black uppercase leading-none tracking-[-0.06em] md:text-7xl lg:text-8xl">

              Let&apos;s Build

              <br />

              Something Real

            </h2>

            <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.28em] text-[var(--ink-muted)] md:text-xs">

              The story doesn&apos;t end here.

            </p>

          </div>

          <div className="grid border-b border-[var(--ink)] lg:grid-cols-[0.9fr_1.1fr]">

            <div className="flex min-h-[650px] flex-col border-b border-[var(--ink)] p-8 md:p-12 lg:min-h-[760px] lg:border-b-0 lg:border-r lg:p-16">

              <div>

                <p className="text-[10px] font-bold uppercase tracking-[0.35em] md:text-xs">

                  ✦ Open For The Next Challenge

                </p>

                <h3 className="editorial mt-6 text-5xl font-black leading-[0.88] tracking-[-0.05em] md:text-7xl">

                  Got Something

                  <br />

                  Worth

                  <br />

                  <span className="text-[var(--red)]">Building?</span>

                </h3>

                <div className="mt-10 border-l-2 border-[var(--red)] pl-5">

                  <p className="newspaper-serif text-lg leading-relaxed md:text-xl">

                    Whether it&apos;s an internship, a collaboration, an

                    ambitious idea, or a difficult problem that needs

                    solving—I&apos;m always interested in work that demands

                    curiosity and execution.

                  </p>

                </div>

              </div>

              <div className="mt-auto border-y-2 border-[var(--ink)] py-7">

                <p className="text-center text-[10px] font-bold uppercase tracking-[0.35em]">

                  Current Status

                </p>

                <p className="editorial mt-3 text-center text-4xl font-black uppercase leading-none text-[var(--red)] md:text-6xl">

                  Open For

                  <br />

                  Opportunities

                </p>

                <p className="mt-4 text-center text-[9px] font-bold uppercase tracking-[0.22em] text-[var(--ink-muted)]">

                  Internships • Collaborations • Interesting Problems

                </p>

              </div>

            </div>

            <div className="flex min-h-[650px] flex-col p-8 md:p-12 lg:min-h-[760px] lg:p-16">

              <div>

                <p className="text-[10px] font-bold uppercase tracking-[0.35em] md:text-xs">

                  The Directory

                </p>

                <p className="editorial mt-5 text-4xl font-black leading-[0.95] md:text-6xl">

                  Find Me

                  <br />

                  Beyond This Page.

                </p>

                <div className="mt-10 border-t border-[var(--ink)]">

                  <a

                    href="mailto:archismankundu101@gmail.com"

                    className="group flex items-center justify-between border-b border-[var(--ink)] py-6 transition duration-300 hover:border-[var(--red)] hover:px-4 hover:text-[var(--red)]"

                  >

                    <div>

                      <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-[var(--red)]">

                        01 / Email

                      </p>

                      <p className="editorial mt-2 text-2xl font-black md:text-4xl">

                        Say Hello

                      </p>

                    </div>

                    <span className="text-2xl transition duration-300 group-hover:translate-x-2">

                      ↗

                    </span>

                  </a>

                  <a

                    href="https://www.linkedin.com/in/archisman-kundu-84975131b/"

                    target="_blank"

                    rel="noreferrer"

                    className="group flex items-center justify-between border-b border-[var(--ink)] py-6 transition duration-300 hover:border-[var(--red)] hover:px-4 hover:text-[var(--red)]"

                  >

                    <div>

                      <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-[var(--red)]">

                        02 / LinkedIn

                      </p>

                      <p className="editorial mt-2 text-2xl font-black md:text-4xl">

                        Professional Record

                      </p>

                    </div>

                    <span className="text-2xl transition duration-300 group-hover:translate-x-2">

                      ↗

                    </span>

                  </a>

                  <a

                    href="https://github.com/archisman-05"

                    target="_blank"

                    rel="noreferrer"

                    className="group flex items-center justify-between border-b border-[var(--ink)] py-6 transition duration-300 hover:border-[var(--red)] hover:px-4 hover:text-[var(--red)]"

                  >

                    <div>

                      <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-[var(--red)]">

                        03 / GitHub

                      </p>

                      <p className="editorial mt-2 text-2xl font-black md:text-4xl">

                        The Source Code

                      </p>

                    </div>

                    <span className="text-2xl transition duration-300 group-hover:translate-x-2">

                      ↗

                    </span>

                  </a>

                  <div className="flex items-center justify-between border-b border-[var(--ink)] py-6">

                    <div>

                      <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-[var(--red)]">

                        04 / Location

                      </p>

                      <p className="editorial mt-2 text-2xl font-black md:text-4xl">

                        Kolkata, India

                      </p>

                    </div>

                    <span className="text-2xl">✦</span>

                  </div>

                </div>

              </div>

              <a

                href="mailto:archismankundu101@gmail.com"

                className="group mt-auto flex items-center justify-between border-2 border-[var(--ink)] px-6 py-7 transition duration-300 hover:border-[var(--red)] hover:text-[var(--red)] md:px-8"

              >

                <div>

                  <p className="text-[9px] font-bold uppercase tracking-[0.3em]">

                    Ready When You Are

                  </p>

                  <p className="editorial mt-2 text-3xl font-black md:text-5xl">

                    Let&apos;s Talk

                  </p>

                </div>

                <span className="text-4xl transition duration-300 group-hover:translate-x-2 md:text-5xl">

                  ↗

                </span>

              </a>

            </div>

          </div>

          <div className="border-b border-[var(--ink)] px-6 py-12 text-center md:px-10 md:py-16">

            <p className="editorial text-4xl font-black leading-[0.95] tracking-[-0.04em] md:text-6xl lg:text-7xl">

              This isn&apos;t the final edition.

              <br />

              <span className="text-[var(--red)]">

                It&apos;s just the beginning.

              </span>

            </p>

          </div>

          <footer className="flex flex-col items-center justify-between gap-5 px-6 py-6 text-center md:flex-row md:px-10 md:text-left">

            <p className="newspaper-mono text-[9px] font-bold uppercase tracking-[0.28em]">

              © {new Date().getFullYear()} Archisman Kundu

            </p>

            <p className="editorial text-xl font-black md:text-2xl">

              The Archisman Daily

            </p>

            <p className="newspaper-mono text-[9px] font-bold uppercase tracking-[0.28em]">

              Est. 2005 • No Final Edition Yet.

            </p>

          </footer>

        </section>

      </main>

      {/* =========================================================*

          *CASE FILE FOLDER MODAL*

      *========================================================= */}

      {activeCaseData && (

        <div

          className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/45 px-4 py-8 backdrop-blur-[2px]"

          onClick={() => setActiveCase(null)}

        >

          <div

            className="relative w-full max-w-5xl animate-[folderAppear_0.5s_ease-out]"

            onClick={(event) => event.stopPropagation()}

          >

            {/* Close */}

            <button

              type="button"

              onClick={() => setActiveCase(null)}

              className="absolute right-0 top-0 z-30 -translate-y-12 text-[10px] font-bold uppercase tracking-[0.25em] text-[var(--paper)] transition hover:text-white"

            >

              Close File ×

            </button>

            {/* Folder tab */}

            <div className="relative z-10 ml-5 w-fit rounded-t-md border-2 border-b-0 border-[var(--ink)] bg-[var(--paper-dark)] px-7 py-3">

              <p className="text-[9px] font-black uppercase tracking-[0.3em]">

                {activeCaseData.number}

              </p>

            </div>

            {/* Folder */}

            <div className="relative border-2 border-[var(--ink)] bg-[var(--paper-dark)] p-3 shadow-[12px_14px_0_rgba(23,19,15,0.4)] md:p-5">

              {/* Folder flap */}

              <div className="pointer-events-none absolute left-0 top-0 z-20 h-20 w-full origin-top border-b-2 border-[var(--ink)] bg-[var(--paper)] shadow-md animate-[folderOpen_0.7s_ease-out]">

                <div className="absolute right-6 top-4 text-2xl animate-[paperclip_1.5s_ease-in-out_infinite]">

                  📎

                </div>

              </div>

              {/* Paper dossier */}

              <div className="relative mt-14 min-h-[620px] border border-[var(--ink)] bg-[var(--paper-light)] p-6 pt-10 shadow-[5px_6px_0_rgba(23,19,15,0.2)] animate-[paperSlide_0.65s_ease-out] md:min-h-[680px] md:p-10 md:pt-14">

                {/* Header */}

                <div className="flex flex-col justify-between gap-6 border-b-2 border-[var(--ink)] pb-6 md:flex-row md:items-start">

                  <div>

                    <p className="text-[9px] font-bold uppercase tracking-[0.35em] text-[var(--red)]">

                      {activeCaseData.label}

                    </p>

                    <h2 className="editorial mt-3 text-4xl font-black leading-[0.9] md:text-6xl">

                      {activeCaseData.title}

                    </h2>

                  </div>

                  <div className="w-fit border-2 border-[var(--red)] px-4 py-2 text-center">

                    <p className="text-[8px] font-bold uppercase tracking-[0.25em]">

                      Status

                    </p>

                    <p className="mt-1 text-[9px] font-black uppercase tracking-[0.15em] text-[var(--red)]">

                      {activeCaseData.status}

                    </p>

                  </div>

                </div>

                {/* Archive strip */}

                <div className="mt-5 flex flex-col justify-between gap-2 border-b border-[var(--ink)] pb-4 text-[9px] font-bold uppercase tracking-[0.22em] md:flex-row">

                  <span>{activeCaseData.number}</span>

                  <span>Archived By The Archisman Daily</span>

                </div>

                {/* Content */}

                <div className="mt-8 grid gap-8 md:grid-cols-2">

                  <div className="border-t border-[var(--ink)] pt-4">

                    <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-[var(--red)]">

                      01 / The Problem

                    </p>

                    <p className="newspaper-serif mt-4 text-base leading-relaxed md:text-lg">

                      {activeCaseData.problem}

                    </p>

                  </div>

                  <div className="border-t border-[var(--ink)] pt-4">

                    <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-[var(--red)]">

                      02 / The Solution

                    </p>

                    <p className="newspaper-serif mt-4 text-base leading-relaxed md:text-lg">

                      {activeCaseData.solution}

                    </p>

                  </div>

                  <div className="border-t border-[var(--ink)] pt-4">

                    <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-[var(--red)]">

                      03 / My Role

                    </p>

                    <p className="newspaper-serif mt-4 text-base leading-relaxed md:text-lg">

                      {activeCaseData.role}

                    </p>

                  </div>

                  <div className="border-t border-[var(--ink)] pt-4">

                    <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-[var(--red)]">

                      04 / Evidence Locker

                    </p>

                    <div className="mt-4 flex flex-wrap gap-2">

                      {activeCaseData.stack.map((tech) => (

                        <span

                          key={tech}

                          className="border border-[var(--ink)] px-3 py-2 text-[9px] font-bold uppercase tracking-[0.15em]"

                        >

                          {tech}

                        </span>

                      ))}

                    </div>

                  </div>

                </div>

                {/* Footer */}

                <div className="mt-10 flex flex-col justify-between gap-5 border-t-2 border-[var(--ink)] pt-6 md:flex-row md:items-center">

                  <p className="editorial text-2xl font-black">

                    End Of Case File.

                  </p>

                  <button

                    type="button"

                    onClick={() => setActiveCase(null)}

                    className="border border-[var(--ink)] px-5 py-3 text-[9px] font-bold uppercase tracking-[0.25em] transition hover:border-[var(--red)] hover:text-[var(--red)]"

                  >

                    Close & Return ×

                  </button>

                </div>

              </div>

            </div>

          </div>

        </div>

      )}

    </>

  );

}