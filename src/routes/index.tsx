import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  Menu, X, ArrowRight, ChevronDown, Quote, Award, Users, Calendar, MapPin,
  Mic2, Newspaper, Image as ImageIcon, Heart, HandHeart, Mail, Phone, Play,
  Facebook, Twitter, Instagram, Youtube, Send, PlayCircle, Download,
  GraduationCap, Sparkles, Compass, Flag, Building2, Sprout, Briefcase,
} from "lucide-react";

import portrait from "@/assets/jagga-reddy-portrait.jpg";

export const Route = createFileRoute("/")({ component: Index });

const NAV = [
  { id: "biography", label: "Biography" },
  { id: "journey", label: "Political Journey" },
  { id: "appearances", label: "Public Appearances" },
  { id: "achievements", label: "Achievements" },
  { id: "media", label: "Media Archive" },
  { id: "gallery", label: "Gallery" },
  { id: "engage", label: "Public Engagement" },
];

function useScrollY() {
  const [y, setY] = useState(0);
  useEffect(() => {
    const onScroll = () => setY(window.scrollY);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return y;
}

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("is-visible")),
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && !started.current) {
          started.current = true;
          const dur = 1600; const t0 = performance.now();
          const step = (t: number) => {
            const p = Math.min(1, (t - t0) / dur);
            setN(Math.floor(to * (1 - Math.pow(1 - p, 3))));
            if (p < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      });
    }, { threshold: 0.4 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [to]);
  return <span ref={ref}>{n.toLocaleString()}{suffix}</span>;
}

function Navbar() {
  const y = useScrollY();
  const solid = y > 40;
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="tricolor-bar fixed top-0 inset-x-0 h-[3px] z-[60]" />
      <header
        className={`fixed top-[3px] inset-x-0 z-50 transition-all duration-300 ${solid ? "glass shadow-[0_4px_24px_-12px_rgba(0,0,0,.15)]" : "bg-transparent"
          }`}
      >
        <nav className="max-w-7xl mx-auto px-5 lg:px-10 h-16 flex items-center justify-between">
          <a href="#top" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#ff8a1f] to-[#0b8a4a] grid place-items-center text-white font-bold shadow-md">
              JR
            </div>
            <div className="leading-tight">
              <div className="font-semibold text-[15px]" style={{ fontFamily: "Playfair Display, serif" }}>
                Jagga Reddy
              </div>
              <div className="text-[10px] uppercase tracking-[0.18em] text-neutral-500">Public Servant</div>
            </div>
          </a>

          <ul className="hidden lg:flex items-center gap-7">
            {NAV.map((n) => (
              <li key={n.id}>
                <a
                  href={`#${n.id}`}
                  className="relative text-sm font-medium text-neutral-700 hover:text-[#e8721a] transition-colors group"
                >
                  {n.label}
                  <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-[#ff8a1f] transition-all duration-300 group-hover:w-full" />
                </a>
              </li>
            ))}
          </ul>

          {/* <a
            href="#engage"
            className="hidden lg:inline-flex items-center gap-2 bg-[#0a0a0a] text-white text-sm font-medium px-4 py-2.5 rounded-full hover:bg-[#0b8a4a] transition-colors"
          >
            Join Movement <ArrowRight className="w-4 h-4" />
          </a>

          <button
            className="lg:hidden p-2 -mr-2"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button> */}
        </nav>

        {/* Mobile menu */}
        <div
          className={`lg:hidden overflow-hidden transition-[max-height] duration-500 ease-out glass ${open ? "max-h-[480px]" : "max-h-0"
            }`}
        >
          <ul className="px-6 py-6 space-y-1">
            {NAV.map((n) => (
              <li key={n.id}>
                <a
                  onClick={() => setOpen(false)}
                  href={`#${n.id}`}
                  className="block py-3 text-base font-medium text-neutral-800 border-b border-neutral-200/60"
                >
                  {n.label}
                </a>
              </li>
            ))}
            <li className="pt-4">
              <a
                href="#engage"
                onClick={() => setOpen(false)}
                className="block text-center bg-[#0a0a0a] text-white font-medium py-3 rounded-full"
              >
                Join Movement
              </a>
            </li>
          </ul>
        </div>
      </header>
    </>
  );
}

function Hero() {
  return (
    <section id="top" className="relative min-h-screen pt-28 lg:pt-24 overflow-hidden">
      {/* decorative backdrops */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,#fff4e6_0%,transparent_55%),radial-gradient(ellipse_at_bottom_left,#e6f5ec_0%,transparent_55%)]" />
      <div className="absolute top-32 -left-32 w-[420px] h-[420px] rounded-full bg-[#ff8a1f]/10 blur-3xl -z-10" />
      <div className="absolute bottom-0 right-0 w-[520px] h-[520px] rounded-full bg-[#0b8a4a]/10 blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-5 lg:px-10 grid lg:grid-cols-12 gap-10 lg:gap-12 items-center pb-20">
        <div className="lg:col-span-7 reveal">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs font-medium text-neutral-700 mb-7">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0b8a4a] animate-pulse" />
            Serving the people since 2004
          </div>

          <h1 className="text-[42px] sm:text-6xl lg:text-7xl font-bold leading-[1.02] text-neutral-900">
            Dedicated to <span className="italic text-[#e8721a]">Public Service</span>
            <br />
            and People's Progress.
          </h1>

          <p className="mt-7 text-[17px] lg:text-lg text-neutral-600 max-w-xl leading-relaxed">
            <strong className="text-neutral-900 font-semibold">Turupu Jaya Prakash Reddy</strong>, popularly known as <strong className="text-neutral-900 font-semibold"> Jagga Reddy</strong>, is an Indian politician who is the Working President of Telangana Pradesh Congress Committee since 28 June 2021. He was a member of the Telangana Legislative Assembly for Sangareddy constituency from 2018 to 2023.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href="#journey"
              className="group inline-flex items-center gap-2 bg-[#0a0a0a] text-white font-medium px-6 py-3.5 rounded-full hover:bg-[#e8721a] transition-all duration-300 shadow-lg shadow-black/10"
            >
              Explore Journey
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#achievements"
              className="inline-flex items-center gap-2 border border-neutral-300 hover:border-[#0b8a4a] hover:text-[#0b8a4a] text-neutral-800 font-medium px-6 py-3.5 rounded-full transition-colors"
            >
              View Public Initiatives
            </a>
          </div>

          <div className="mt-12 grid grid-cols-3 gap-6 max-w-md">
            {[
              { n: 22, s: "+", l: "Years in Service" },
              // { n: 320, s: "+", l: "Initiatives Led" },
              // { n: 1.2, s: "M+", l: "Lives Touched", float: true },
            ].map((s) => (
              <div key={s.l}>
                <div className="text-3xl font-bold text-neutral-900" style={{ fontFamily: "Playfair Display, serif" }}>
                  {s.float ? <>1.2<span>M+</span></> : <><Counter to={s.n} />{s.s}</>}
                </div>
                <div className="text-xs uppercase tracking-wider text-neutral-500 mt-1">{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5 reveal">
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-br from-[#ff8a1f]/30 via-white to-[#0b8a4a]/30 rounded-[2rem] blur-2xl" />
            <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden ring-1 ring-black/5 shadow-2xl">
              <img
                src={portrait}
                alt="Portrait of Jaya Prakash Reddy (Jagga Reddy)"
                className="w-full h-full object-cover"
                width={1024}
                height={1280}
              />
              {/* <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 text-white">
                <div className="text-xs uppercase tracking-[0.2em] opacity-80">Hon'ble Leader</div>
                <div className="text-2xl font-semibold" style={{ fontFamily: "Playfair Display, serif" }}>
                  Sri Jaya Prakash Reddy
                </div>
              </div> */}
            </div>

            <div className="absolute -bottom-6 -left-6 glass rounded-2xl px-5 py-4 shadow-xl max-w-[220px]">
              <div className="flex items-center gap-2 mb-1">
                <Award className="w-4 h-4 text-[#e8721a]" />
                <span className="text-[11px] uppercase tracking-wider text-neutral-600">Recognition</span>
              </div>
              <p className="text-sm font-medium text-neutral-900 leading-snug">
                జనం మెచ్చిన నాయకుడు
              </p>
            </div>
          </div>
        </div>
      </div>

      <a href="#biography" className="absolute bottom-6 left-1/2 -translate-x-1/2 text-neutral-500 hover:text-neutral-900 transition-colors flex flex-col items-center gap-1">
        <span className="text-[11px] uppercase tracking-[0.25em]">Scroll</span>
        <ChevronDown className="w-4 h-4 animate-bounce" />
      </a>
    </section>
  );
}

function SectionHeader({
  eyebrow, title, lead,
}: { eyebrow: string; title: React.ReactNode; lead?: string }) {
  return (
    <div className="max-w-3xl mb-14 reveal">
      <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-[#e8721a] font-semibold mb-4">
        <span className="w-8 h-px bg-[#e8721a]" /> {eyebrow}
      </div>
      <h2 className="text-4xl lg:text-5xl font-bold text-neutral-900 leading-tight">{title}</h2>
      {lead && <p className="mt-5 text-neutral-600 text-lg leading-relaxed">{lead}</p>}
    </div>
  );
}

function Biography() {
  const blocks = [
    { icon: Sparkles, t: "Initial days of Life", d: "Born on 7 July 1966 in Indrakaran, Medak district, India, he has dedicated decades of his life to public service and leadership, earning recognition for his commitment to the people and the region" },
    { icon: GraduationCap, t: "Education", d: "Completed his secondary education in 1982." },
    { icon: Compass, t: "Political Vision", d: "Believes in an inclusive India where opportunity is universal — strengthening farmers, supporting small businesses, and elevating women and youth into leadership." },
    { icon: Flag, t: "Leadership Philosophy", d: "Leads by listening. Decisions are made closest to the people they affect, rooted in transparency, accountability and tireless on-the-ground presence." },
  ];
  return (
    <section id="biography" className="relative py-28 lg:py-36">
      <div className="max-w-7xl mx-auto px-5 lg:px-10">
        <SectionHeader
          eyebrow="Biography"
          title={<>A life shaped by <span className="italic text-[#0b8a4a]">service</span>, conviction and the people.</>}
          lead="From councilor to legislative chambers, his journey is a testament to the belief that politics is, above all, a vocation of service."
        />

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          <div className="lg:col-span-5 reveal">
            <div className="relative">
              <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-xl ring-1 ring-black/5">
                <img src={g} alt="Connecting with villagers" className="w-full h-full object-cover" loading="lazy" />
              </div>
              <div className="absolute -bottom-6 -right-6 hidden md:block bg-white border border-neutral-200 rounded-2xl p-5 shadow-xl max-w-[240px]">
                <Quote className="w-5 h-5 text-[#e8721a]" />
                <p className="mt-2 text-sm text-neutral-800 italic leading-relaxed">
                  "The strength of a leader is measured by the dignity restored in the lives of the people."
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-5">
            {blocks.map((b) => (
              <div key={b.t} className="reveal group relative bg-white border border-neutral-200/80 rounded-2xl p-7 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
                <div className="flex items-start gap-5">
                  <div className="shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-[#fff1e0] to-[#e6f5ec] grid place-items-center">
                    <b.icon className="w-5 h-5 text-[#e8721a]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-neutral-900">{b.t}</h3>
                    <p className="mt-2 text-neutral-600 leading-relaxed">{b.d}</p>
                  </div>
                </div>
                <div className="absolute left-0 top-7 bottom-7 w-[3px] rounded-r bg-gradient-to-b from-[#ff8a1f] to-[#0b8a4a] opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Journey() {
  const milestones = [
    { y: "0000", t: "Entry into Public Life", d: "He started career as a councilor and then became municipal chairman", icon: Sprout },
    { y: "2004", t: "MLA Position", d: "He was elected as the MLA from the Sangareddy constituency , reflecting the trust and support of the people through his political leadership.", icon: Flag },
    { y: "2009", t: "Re-elected as MLA", d: "He was re-elected as the MLA from the Sangareddy constituency, reaffirming his strong public support and influential presence in regional politics.", icon: Users },
    { y: "2014", t: "Loss of Regime", d: "In 2014, he contested from the Medak constituency , but was unsuccessful in securing victory as MLA.", icon: Building2 },
    { y: "2018", t: "Regain of Regime", d: "He was elected as the MLA from the Sangareddy constituency representing the Indian National Congress (INC), reaffirming his strong public support and influential presence in regional politics.", icon: Award },
    //{ y: "2024", t: "A New Chapter", d: "Launched the People's Progress Movement, focused on jobs, healthcare and clean governance.", icon: Briefcase },
  ];
  return (
    <section id="journey" className="relative py-28 lg:py-36 bg-[#0a0a0a] text-white overflow-hidden">
      <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(255,255,255,.6)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.6)_1px,transparent_1px)] [background-size:40px_40px]" />
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full border border-[#ff8a1f]/20 ashoka-spin" />
      <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[420px] h-[420px] rounded-full border border-[#0b8a4a]/20 ashoka-spin" style={{ animationDirection: "reverse" }} />

      <div className="relative max-w-7xl mx-auto px-5 lg:px-10">
        <div className="max-w-3xl mb-16 reveal">
          <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-[#ff8a1f] font-semibold mb-4">
            <span className="w-8 h-px bg-[#ff8a1f]" /> Political Journey
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold leading-tight">
            Two decades of <span className="italic text-[#ff8a1f]">conviction</span>,
            <br /> chapter by chapter.
          </h2>
        </div>

        <div className="relative">
          <div className="absolute left-5 lg:left-1/2 lg:-translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#ff8a1f] via-white/30 to-[#0b8a4a]" />
          <ul className="space-y-12">
            {milestones.map((m, i) => {
              const right = i % 2 === 1;
              return (
                <li key={m.y} className="relative reveal lg:grid lg:grid-cols-2 lg:gap-12 items-center">
                  <div className={`pl-14 lg:pl-0 ${right ? "lg:col-start-2" : ""}`}>
                    <div className={`relative bg-white/[0.04] border border-white/10 rounded-2xl p-7 backdrop-blur-sm hover:bg-white/[0.07] hover:border-[#ff8a1f]/40 transition-all`}>
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-3xl font-bold text-[#ff8a1f]" style={{ fontFamily: "Playfair Display, serif" }}>{m.y}</span>
                        <span className="text-xs uppercase tracking-wider text-white/60">Milestone</span>
                      </div>
                      <h3 className="text-xl font-semibold mb-2">{m.t}</h3>
                      <p className="text-white/70 leading-relaxed">{m.d}</p>
                    </div>
                  </div>
                  <span className="absolute left-5 lg:left-1/2 -translate-x-1/2 top-7 lg:top-1/2 lg:-translate-y-1/2 w-10 h-10 rounded-full bg-gradient-to-br from-[#ff8a1f] to-[#0b8a4a] grid place-items-center ring-4 ring-[#0a0a0a]">
                    <m.icon className="w-4 h-4 text-white" />
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}


import hearing from "@/assets/videos/hearing.mp4";
import hearingPoster from "@/assets/hearing.jpeg";

import cycles from "@/assets/videos/cycles.mp4";
import cyclesPoster from "@/assets/cycle.jpeg";

import kjs from "@/assets/videos/kjs.mp4";
import kjsPoster from "@/assets/kjs.jpeg";

import devotion from "@/assets/videos/devotion.mp4";
import devotionPoster from "@/assets/devotion.jpeg";

import dargah from "@/assets/videos/dargah.mp4";
import dargahPoster from "@/assets/dargah.jpeg";


import delimitation from "@/assets/videos/delimitation.mp4";
import delimitationPoster from "@/assets/delimitation.jpeg";

function Appearances() {
  const items = [
    { vid: hearing, poster: hearingPoster, cat: "Hearing", t: "Children requesting for Cycles.", d: "Jagga Reddy warmly interacted with children who visited his residence seeking bicycles, listening attentively to their requests and encouraging them with compassion and support." },
    { vid: cycles, poster: cyclesPoster, cat: "Cycles", t: "Cycles distribution to children.", d: "Jagga Reddy continues to lead a bicycle distribution initiative in Sangareddy, bringing joy and support to young children across the constituency. In the latest phase of the program, he distributed bicycles to 70 more children, with special focus on those below eight years of age. With this, the total number of bicycles distributed has reached 400. " },
    { vid: kjs, poster: kjsPoster, cat: "KJS", t: "KJS India Private Limited Unit 2 at Thogarpally.", d: "The 651 crore project is expected to generate direct employment for 1,551 people and indirect opportunities for nearly 5,000 more, while strengthening Telangana's food processing and FM ecosystem." },
    { vid: devotion, poster: devotionPoster, cat: "Devotion", t: "Devotion to the God.", d: "Jagga Reddy participated in the bhajan programme at the temple and joined devotees in devotional singing." },
    { vid: dargah, poster: dargahPoster, cat: "Dargah", t: "Participated in Dargah Ursu Celebrations.", d: "Jagga Reddy visited the dargah and offered prayers, showing his respect for the spiritual site and connecting with the local community." },
    { vid: delimitation, poster: delimitationPoster, cat: "Delimitation Bill", t: "Opposed Delimitation bill publicly", d: "Jagga Reddy participated in the delimitation ceremony, engaging with local leaders and residents to discuss the implications of the new boundaries." }
  ];

  const [modal, setModal] = useState<null | typeof items[0]>(null);
  const [playing, setPlaying] = useState<number | null>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const handlePlay = (i: number) => {
    const vid = videoRefs.current[i];
    if (!vid) return;
    if (playing === i) {
      vid.pause();
      setPlaying(null);
    } else {
      // pause previously playing
      if (playing !== null) {
        videoRefs.current[playing]?.pause();
      }
      vid.play();
      setPlaying(i);
    }
  };

  const handleVideoEnd = (i: number) => {
    if (playing === i) setPlaying(null);
  };

  return (
    <>
      <section id="appearances" className="py-28 lg:py-36">
        <div className="max-w-7xl mx-auto px-5 lg:px-10">
          <SectionHeader
            eyebrow="Public Appearances"
            title={<>On the ground, <span className="italic text-[#e8721a]">with the people</span> — every single day.</>}
            lead="A glimpse into rallies, speeches, interviews and welfare programmes that anchor a life of constant public engagement."
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {items.map((it, i) => (
              <article
                key={i}
                className="reveal group relative rounded-2xl overflow-hidden bg-white border border-neutral-200 shadow-sm hover:shadow-2xl transition-all duration-500"
              >
                {/* ── Video thumbnail area ── */}
                <div className="relative aspect-[4/3] overflow-hidden bg-black">
                  <video
                    ref={el => { videoRefs.current[i] = el; }}
                    src={it.vid}
                    poster={it.poster}
                    playsInline
                    preload="none"
                    onEnded={() => handleVideoEnd(i)}
                    className="w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
                  />

                  {/* Category badge */}
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider bg-white/90 text-neutral-900 backdrop-blur pointer-events-none">
                    {it.cat}
                  </span>

                  {/* Play / Pause overlay */}
                  <button
                    onClick={() => handlePlay(i)}
                    aria-label={playing === i ? "Pause" : "Play"}
                    className="
                      absolute inset-0 flex items-center justify-center
                      transition-opacity duration-300
                      focus:outline-none
                    "
                  >
                    <span
                      className={`
                        flex items-center justify-center
                        w-14 h-14 rounded-full
                        bg-white/90 backdrop-blur shadow-lg
                        transition-all duration-300
                        ${playing === i
                          ? "opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100"
                          : "opacity-100 scale-100"}
                      `}
                    >
                      {playing === i ? (
                        /* Pause icon — two bars */
                        <span className="flex gap-[5px]">
                          <span className="w-[4px] h-5 rounded-sm bg-neutral-900 block" />
                          <span className="w-[4px] h-5 rounded-sm bg-neutral-900 block" />
                        </span>
                      ) : (
                        <Play className="w-6 h-6 text-neutral-900 translate-x-0.5" fill="currentColor" />
                      )}
                    </span>
                  </button>
                </div>

                {/* ── Card body ── */}
                <div className="p-6">
                  <h3 className="font-semibold text-lg text-neutral-900 leading-snug">{it.t}</h3>
                  <p className="mt-2 text-sm text-neutral-600 leading-relaxed line-clamp-2">{it.d}</p>
                  <button
                    onClick={() => setModal(it)}
                    className="mt-4 flex items-center gap-1 text-sm font-medium text-[#e8721a] hover:gap-2 transition-all focus:outline-none"
                  >
                    Read more <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Modal ── */}
      {modal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label={modal.t}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setModal(null)}
          />

          {/* Panel */}
          <div className="relative z-10 bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden animate-fade-in">
            {/* Video preview inside modal */}
            <div className="aspect-video bg-black">
              <video
                src={modal.vid}
                poster={modal.poster}
                controls
                autoPlay
                playsInline
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-6">
              <span className="px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider bg-[#e8721a]/10 text-[#e8721a]">
                {modal.cat}
              </span>
              <h2 className="mt-3 text-xl font-bold text-neutral-900 leading-snug">{modal.t}</h2>
              <p className="mt-3 text-sm text-neutral-600 leading-relaxed">{modal.d}</p>
            </div>

            {/* Close button */}
            <button
              onClick={() => setModal(null)}
              className="absolute top-3 right-3 flex items-center justify-center w-9 h-9 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors focus:outline-none"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}

function Achievements() {
  const stats = [
    { n: 22, s: "+", l: "Years of Service", icon: Calendar },
    { n: 300, s: "+", l: "Welfare Initiatives", icon: HandHeart },
    { n: 100, s: "+", l: "Villages Reached", icon: MapPin },
  ];
  const cards = [
    { icon: HandHeart, t: "Assured 300 Crores", d: "Jagga Reddy assures ₹300 crore for Sangareddy Municipality, seeks votes in 38 municipal wards" },
    { icon: Sprout, t: "Rural Empowerment Programme", d: "Built micro-irrigation networks across 120 villages, lifting farm incomes ." },
    { icon: GraduationCap, t: "Scholarships for Bright Minds", d: "Funded higher education for students from underprivileged backgrounds." },
    { icon: Building2, t: "Public Infrastructure", d: "Championed the development of roads, health centres and public schools in underserved blocks." },
    { icon: Award, t: "Honours", d: "Recipient of multiple state and national recognitions for community service and clean politics." },
    { icon: Heart, t: "Healthcare for All", d: "Organised several free medical camps, screening vast number of citizens." },
  ];
  return (
    <section id="achievements" className="py-28 lg:py-36 bg-gradient-to-b from-[#fff8ef] to-[#f1faf3]">
      <div className="max-w-7xl mx-auto px-5 lg:px-10">
        <SectionHeader
          eyebrow="Achievements"
          title={<>Measured in <span className="italic text-[#0b8a4a]">lives changed</span>, not headlines.</>}
        />

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-16">
          {stats.map((s) => (
            <div key={s.l} className="reveal bg-white rounded-2xl p-6 lg:p-7 border border-neutral-200/80 shadow-sm">
              <s.icon className="w-6 h-6 text-[#e8721a]" />
              <div className="mt-4 text-4xl lg:text-5xl font-bold text-neutral-900" style={{ fontFamily: "Playfair Display, serif" }}>
                <Counter to={s.n} suffix={s.s} />
              </div>
              <div className="mt-1 text-xs uppercase tracking-wider text-neutral-500">{s.l}</div>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((c) => (
            <div key={c.t} className="reveal group bg-white border border-neutral-200 rounded-2xl p-7 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#ff8a1f] to-[#e8721a] grid place-items-center shadow-md">
                <c.icon className="w-5 h-5 text-white" />
              </div>
              <h3 className="mt-5 text-xl font-semibold text-neutral-900">{c.t}</h3>
              <p className="mt-2 text-neutral-600 leading-relaxed">{c.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const videos = [
  { videoUrl: "https://www.youtube.com/watch?v=lnpY-7p0Neg", title: "Congress Jagga Reddy Press Meet" },
  { videoUrl: "https://www.youtube.com/watch?v=7VWPlbYG47E", title: "Congress Senior Leader Jagga Reddy speaks On Cockroach Janata Party Digital Political Wars" },
  { videoUrl: "https://www.youtube.com/watch?v=C2Q3JkC4Rbc", title: "Jagga Reddy Aggressive Comments In Press Meet" },
];

function getYouTubeId(videoUrl: string): string | null {
  const match = videoUrl.match(
    /(?:youtube\.com\/(?:watch\?v=|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  );
  return match ? match[1] : null;
}

function getYouTubeThumbnail(videoUrl: string): string {
  const id = getYouTubeId(videoUrl);
  return id ? `https://img.youtube.com/vi/${id}/maxresdefault.jpg` : "/fallback-thumbnail.jpg";
}

function Media() {
  const press = [
    { src: "Times Of India", t: "Jagga Reddy urges CJP to support INC.", link: "https://timesofindia.indiatimes.com/city/hyderabad/jagga-reddy-urges-cjp-to-support-cong/articleshow/131281054.cms" },
    { src: "The Hindu", t: "'Back Rahul Gandhi's call for Samvidhan Bachao', says Jagga Reddy.", link: "https://www.thehindu.com/news/national/telangana/back-rahul-gandhis-call-for-samvidhan-bachao-says-jagga-reddy/article71014241.ece" },
    { src: "The Hindu", t: "Jagga Reddy defends his actions, alleges police misconduct", link: "https://www.thehindu.com/news/national/telangana/jagga-reddy-defends-his-actions-alleges-police-misconduct/article70624868.ece" },
  ];

  return (
    <section id="media" className="py-28 lg:py-36">
      <div className="max-w-7xl mx-auto px-5 lg:px-10">
        <SectionHeader
          eyebrow="Media Archive"
          title={<>Speeches, interviews and <span className="italic text-[#e8721a]">press coverage</span>.</>}
          lead="A curated archive of public statements, on-record interviews and media appearances."
        />

        <div className="grid lg:grid-cols-3 gap-6 mb-12">
          {videos.map((video, i) => (
            <a
              key={i}
              href={video.videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="reveal group relative aspect-video rounded-2xl overflow-hidden bg-black ring-1 ring-black/5 shadow-md hover:shadow-2xl transition-shadow"
            >
              <img
                src={getYouTubeThumbnail(video.videoUrl)}
                alt={video.title}
                loading="lazy"
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <PlayCircle className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 text-white drop-shadow-2xl group-hover:scale-110 transition-transform" />
              <div className="absolute bottom-4 left-5 right-5 text-white">
                <div className="text-[10px] uppercase tracking-[0.2em] opacity-80">YouTube</div>
                <div className="text-base font-semibold mt-1 line-clamp-2">{video.title}</div>
              </div>
            </a>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {press.map((p, i) => (
            <article key={i} className="reveal bg-white border border-neutral-200 rounded-2xl p-7 hover:border-[#0b8a4a] transition-colors">
              <Newspaper className="w-5 h-5 text-[#0b8a4a]" />
              <div className="mt-4 text-[11px] uppercase tracking-wider text-neutral-500">{p.src}</div>
              <h3 className="mt-1 text-lg font-semibold text-neutral-900 leading-snug">"{p.t}"</h3>
              <a href={p.link} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-[#e8721a] hover:gap-3 transition-all">
                Read article <ArrowRight className="w-4 h-4" />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

import a from "@/assets/gallery/1.jpg";
import b from "@/assets/gallery/2.jpg";
import c from "@/assets/gallery/3.jpg";
import d from "@/assets/gallery/4.jpg";
import e from "@/assets/gallery/5.jpg";
import f from "@/assets/gallery/6.jpg";
import g from "@/assets/gallery/7.jpg";
import h from "@/assets/gallery/8.jpg";
import i from "@/assets/gallery/9.jpg";
import j from "@/assets/gallery/10.jpg";
import k from "@/assets/gallery/11.jpg";

function Gallery() {
  const imgs = [
    { src: a, c: "Pampering child" },
    { src: b, c: "KJS project inaugural" },
    { src: c, c: "Shining like sun in hot summer" },
    { src: d, c: "Observing the community", span: "lg:row-span-2" },
    { src: k, c: "Glimpse of Holi celebrations", span: "lg:row-span-2" },
    { src: e, c: "Met Honuorable Irrigation and CAD minister Uttam Kumar Reddy gaaru" },
    { src: f, c: "Addressing students at Govt. High School" },
    { src: g, c: "Observing the community" },
    { src: i, c: "Attended celebration at Dargah" },
    { src: j, c: "Offering the marriage rituals of Sitaram" },
    //{ src: k, c: "Glimpse of Holi celebrations" },
  ];
  const [open, setOpen] = useState<string | null>(null);
  return (
    <section id="gallery" className="py-28 lg:py-36 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-5 lg:px-10">
        <SectionHeader
          eyebrow="Gallery"
          title={<>Moments from the <span className="italic text-[#0b8a4a]">people's movement</span>.</>}
        />
        <div className="grid grid-cols-2 lg:grid-cols-4 auto-rows-[180px] lg:auto-rows-[220px] gap-3 lg:gap-4">
          {imgs.map((g, i) => (
            <button
              key={i}
              onClick={() => setOpen(g.src)}
              className={`reveal group relative overflow-hidden rounded-2xl ring-1 ring-black/5 ${g.span ?? ""}`}
            >
              <img src={g.src} alt={g.c} loading="lazy" className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1200ms]" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-3 left-4 right-4 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
                <div className="text-white text-sm font-medium">{g.c}</div>
              </div>
              <div className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 grid place-items-center opacity-0 group-hover:opacity-100 transition-opacity">
                <ImageIcon className="w-4 h-4 text-neutral-900" />
              </div>
            </button>
          ))}
        </div>
      </div>

      {open && (
        <div
          className="fixed inset-0 z-[80] bg-black/85 backdrop-blur-sm grid place-items-center p-6 animate-in fade-in"
          onClick={() => setOpen(null)}
        >
          <button
            onClick={() => setOpen(null)}
            className="absolute top-6 right-6 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 grid place-items-center text-white"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
          <img src={open} alt="Preview" className="max-h-[88vh] max-w-[92vw] rounded-2xl shadow-2xl object-contain" />
        </div>
      )}
    </section>
  );
}

// function Engagement() {
//   return (
//     <section id="engage" className="py-28 lg:py-36 bg-gradient-to-b from-white to-[#fff8ef]">
//       <div className="max-w-7xl mx-auto px-5 lg:px-10">
//         <SectionHeader
//           eyebrow="Public Engagement"
//           title={<>Your voice matters. <span className="italic text-[#e8721a]">Let's build together.</span></>}
//           lead="Reach out, share a grievance, volunteer for the movement, or stay informed through our newsletter."
//         />

//         <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
//           {/* Contact form */}
//           <form 
//             onSubmit={(e) => { e.preventDefault(); alert("Thank you — your message has been received."); }}
//             className="lg:col-span-2 reveal bg-white border border-neutral-200 rounded-3xl p-8 lg:p-10 shadow-sm"
//           >
//             <h3 className="text-2xl font-semibold text-neutral-900">Contact & Grievance Form</h3>
//             <p className="mt-2 text-sm text-neutral-600">Share your concerns, suggestions or feedback. Every message is read.</p>
//             <div className="mt-7 grid sm:grid-cols-2 gap-4">
//               {[
//                 { l: "Full Name", t: "text", p: "Your name" },
//                 { l: "Phone", t: "tel", p: "+91 00000 00000" },
//                 { l: "Email", t: "email", p: "you@example.com" },
//                 { l: "District / Town", t: "text", p: "Your location" },
//               ].map((f) => (
//                 <label key={f.l} className="block">
//                   <span className="text-xs font-medium text-neutral-700 uppercase tracking-wider">{f.l}</span>
//                   <input
//                     type={f.t}
//                     required
//                     placeholder={f.p}
//                     className="mt-2 w-full rounded-xl border border-neutral-200 bg-neutral-50/60 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#ff8a1f]/40 focus:bg-white transition"
//                   />
//                 </label>
//               ))}
//               <label className="block sm:col-span-2">
//                 <span className="text-xs font-medium text-neutral-700 uppercase tracking-wider">Category</span>
//                 <select className="mt-2 w-full rounded-xl border border-neutral-200 bg-neutral-50/60 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#ff8a1f]/40 focus:bg-white">
//                   <option>General Enquiry</option>
//                   <option>Public Grievance</option>
//                   <option>Volunteer Interest</option>
//                   <option>Media Request</option>
//                 </select>
//               </label>
//               <label className="block sm:col-span-2">
//                 <span className="text-xs font-medium text-neutral-700 uppercase tracking-wider">Your Message</span>
//                 <textarea
//                   rows={5}
//                   required
//                   placeholder="Tell us how we can help…"
//                   className="mt-2 w-full rounded-xl border border-neutral-200 bg-neutral-50/60 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#ff8a1f]/40 focus:bg-white transition"
//                 />
//               </label>
//             </div>
//             <button
//               type="submit"
//               className="mt-6 inline-flex items-center gap-2 bg-[#0a0a0a] text-white font-medium px-6 py-3.5 rounded-full hover:bg-[#0b8a4a] transition-colors"
//             >
//               Submit Message <Send className="w-4 h-4" />
//             </button>
//           </form>

//           <div className="space-y-6">
//             {/* Volunteer */}
//             <div className="reveal relative overflow-hidden rounded-3xl p-8 bg-gradient-to-br from-[#ff8a1f] to-[#e8721a] text-white shadow-lg">
//               <HandHeart className="w-8 h-8" />
//               <h3 className="mt-4 text-2xl font-semibold">Become a Volunteer</h3>
//               <p className="mt-2 text-white/90 text-sm leading-relaxed">
//                 Join thousands of citizens working shoulder to shoulder for a better tomorrow.
//               </p>
//               <a href="#" className="mt-5 inline-flex items-center gap-2 bg-white text-[#e8721a] font-medium px-5 py-2.5 rounded-full text-sm hover:bg-neutral-900 hover:text-white transition-colors">
//                 Sign up to volunteer <ArrowRight className="w-4 h-4" />
//               </a>
//             </div>

//             {/* Newsletter
//             <form onSubmit={(e) => { e.preventDefault(); alert("Subscribed!"); }} className="reveal rounded-3xl p-8 bg-white border border-neutral-200">
//               <h3 className="text-xl font-semibold text-neutral-900">Stay Informed</h3>
//               <p className="mt-1 text-sm text-neutral-600">Monthly newsletter on initiatives, events and policy updates.</p>
//               <div className="mt-4 flex gap-2">
//                 <input type="email" required placeholder="you@example.com" className="flex-1 rounded-full border border-neutral-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0b8a4a]/40" />
//                 <button className="bg-[#0b8a4a] text-white font-medium px-5 py-3 rounded-full hover:bg-[#066b39] transition-colors">Subscribe</button>
//               </div>
//             </form> */}

//             {/* Office */}
//             <div className="reveal rounded-3xl p-8 bg-neutral-900 text-white">
//               <h3 className="text-xl font-semibold">Office Contact</h3>
//               <ul className="mt-4 space-y-3 text-sm text-white/80">
//                 <li className="flex items-start gap-3"><MapPin className="w-4 h-4 mt-0.5 text-[#ff8a1f]" /> Office of Sri Jaya Prakash Reddy,<br /> Main Road, [District], Telangana 500000</li>
//                 <li className="flex items-center gap-3"><Phone className="w-4 h-4 text-[#ff8a1f]" /> +91 00000 00000</li>
//                 <li className="flex items-center gap-3"><Mail className="w-4 h-4 text-[#ff8a1f]" /> office@jaggareddy.in</li>
//               </ul>
//               <div className="mt-5 flex items-center gap-3">
//                 {[Facebook, Twitter, Instagram, Youtube].map((Ic, i) => (
//                   <a key={i} href="#" className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#ff8a1f] grid place-items-center transition-colors">
//                     <Ic className="w-4 h-4" />
//                   </a>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }


import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

function Engagement() {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    district: "",
    category: "General Enquiry",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      await addDoc(collection(db, "engagements"), {
        ...formData,
        createdAt: serverTimestamp(),
      });

      alert("Thank you — your message has been received.");

      setFormData({
        fullName: "",
        phone: "",
        email: "",
        district: "",
        category: "General Enquiry",
        message: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="engage"
      className="py-28 lg:py-36 bg-gradient-to-b from-white to-[#fff8ef]"
    >
      <div className="max-w-7xl mx-auto px-5 lg:px-10">
        <SectionHeader
          eyebrow="Public Engagement"
          title={
            <>
              Your voice matters.{" "}
              <span className="italic text-[#e8721a]">
                Let's build together.
              </span>
            </>
          }
          lead="Reach out, share a grievance, volunteer for the movement, or stay informed through our newsletter."
        />

        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Contact Form */}
          <form
            onSubmit={handleSubmit}
            className="lg:col-span-3 reveal bg-white border border-neutral-200 rounded-3xl p-8 lg:p-10 shadow-sm"
          >
            <h3 className="text-2xl font-semibold text-neutral-900">
              Contact & Grievance Form
            </h3>

            <p className="mt-2 text-sm text-neutral-600">
              Share your concerns, suggestions or feedback. Every message is
              read.
            </p>

            <div className="mt-7 grid sm:grid-cols-2 gap-4">
              {/* Full Name */}
              <label className="block">
                <span className="text-xs font-medium text-neutral-700 uppercase tracking-wider">
                  Full Name
                </span>

                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  placeholder="Your name"
                  className="mt-2 w-full rounded-xl border border-neutral-200 bg-neutral-50/60 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#ff8a1f]/40 focus:bg-white transition"
                />
              </label>

              {/* Phone */}
              <label className="block">
                <span className="text-xs font-medium text-neutral-700 uppercase tracking-wider">
                  Phone
                </span>

                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="+91 00000 00000"
                  className="mt-2 w-full rounded-xl border border-neutral-200 bg-neutral-50/60 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#ff8a1f]/40 focus:bg-white transition"
                />
              </label>

              {/* Email */}
              <label className="block">
                <span className="text-xs font-medium text-neutral-700 uppercase tracking-wider">
                  Email
                </span>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="you@example.com"
                  className="mt-2 w-full rounded-xl border border-neutral-200 bg-neutral-50/60 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#ff8a1f]/40 focus:bg-white transition"
                />
              </label>

              {/* District */}
              <label className="block">
                <span className="text-xs font-medium text-neutral-700 uppercase tracking-wider">
                  District / Town
                </span>

                <input
                  type="text"
                  name="district"
                  value={formData.district}
                  onChange={handleChange}
                  required
                  placeholder="Your location"
                  className="mt-2 w-full rounded-xl border border-neutral-200 bg-neutral-50/60 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#ff8a1f]/40 focus:bg-white transition"
                />
              </label>

              {/* Category */}
              <label className="block sm:col-span-2">
                <span className="text-xs font-medium text-neutral-700 uppercase tracking-wider">
                  Category
                </span>

                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-xl border border-neutral-200 bg-neutral-50/60 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#ff8a1f]/40 focus:bg-white"
                >
                  <option>General Enquiry</option>
                  <option>Public Grievance</option>
                  <option>Volunteer Interest</option>
                </select>
              </label>

              {/* Message */}
              <label className="block sm:col-span-2">
                <span className="text-xs font-medium text-neutral-700 uppercase tracking-wider">
                  Your Message
                </span>

                <textarea
                  rows={5}
                  required
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us how we can help…"
                  className="mt-2 w-full rounded-xl border border-neutral-200 bg-neutral-50/60 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#ff8a1f]/40 focus:bg-white transition"
                />
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="mt-6 inline-flex items-center gap-2 bg-[#0a0a0a] text-white font-medium px-6 py-3.5 rounded-full hover:bg-[#0b8a4a] transition-colors disabled:opacity-60"
            >
              {loading ? "Submitting..." : "Submit Message"}

              <Send className="w-4 h-4" />
            </button>
          </form>

          {/*<div className="space-y-6"> 
            Volunteer Card
            <div className="reveal relative overflow-hidden rounded-3xl p-8 bg-gradient-to-br from-[#ff8a1f] to-[#e8721a] text-white shadow-lg">
              <HandHeart className="w-8 h-8" />

              <h3 className="mt-4 text-2xl font-semibold">
                Become a Volunteer
              </h3>

              <p className="mt-2 text-white/90 text-sm leading-relaxed">
                Join thousands of citizens working shoulder to shoulder for a
                better tomorrow.
              </p>

              <a
                href="#"
                className="mt-5 inline-flex items-center gap-2 bg-white text-[#e8721a] font-medium px-5 py-2.5 rounded-full text-sm hover:bg-neutral-900 hover:text-white transition-colors"
              >
                Sign up to volunteer

                <ArrowRight className="w-4 h-4" />
              </a>
            </div> 

            Office Contact
            <div className="reveal rounded-3xl p-8 bg-neutral-900 text-white">
              <h3 className="text-xl font-semibold">Office Contact</h3>

              <ul className="mt-4 space-y-3 text-sm text-white/80">
                <li className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 mt-0.5 text-[#ff8a1f]" />
                  Office of Sri Jaya Prakash Reddy,
                  <br />
                  Main Road, Sangareddy, Telangana
                </li>

                <li className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-[#ff8a1f]" />
                  +91 00000 00000
                </li>

                <li className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-[#ff8a1f]" />
                  office@jaggareddy.in
                </li>
              </ul>

              <div className="mt-5 flex items-center gap-3">
                {[Facebook, Twitter, Instagram, Youtube].map((Ic, i) => (
                  <a
                    key={i}
                    href="#"
                    className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#ff8a1f] grid place-items-center transition-colors"
                  >
                    <Ic className="w-4 h-4" />
                  </a>
                ))}
              </div> 
            </div>
          </div>*/}
        </div>
      </div>
    </section>
  );
}

export default Engagement;

function Footer() {
  return (
    <footer className="bg-[#070707] text-white pt-20 pb-8 relative overflow-hidden">
      <div className="tricolor-bar absolute top-0 inset-x-0 h-[3px]" />
      <div className="max-w-7xl mx-auto px-5 lg:px-10 grid lg:grid-cols-4 gap-12">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#ff8a1f] to-[#0b8a4a] grid place-items-center font-bold">JR</div>
            <div>
              <div className="text-lg font-semibold" style={{ fontFamily: "Playfair Display, serif" }}>Turupu Jaya Prakash Reddy</div>
              <div className="text-xs text-white/50 uppercase tracking-[0.2em]">Jagga Reddy · Public Servant</div>
            </div>
          </div>
          <p className="text-white/60 max-w-md leading-relaxed">
            Working every day for an inclusive, prosperous and self-reliant India — built on the strength,
            wisdom and dignity of its people.
          </p>
          <div className="mt-6 flex items-center gap-3">
            {[
              { icon: Facebook, url: "https://www.facebook.com/jagga.reddy.3152/" },
              { icon: Twitter, url: "https://x.com/ImJaggaReddy?lang=en" },
              { icon: Instagram, url: "https://www.instagram.com/imjaggareddy/" },
              { icon: Youtube, url: "https://www.youtube.com/@JaggaReddyOfficial" },
            ].map(({ icon: Ic, url }, i) => (
              <a
                key={i}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-white/15 hover:border-[#ff8a1f] hover:text-[#ff8a1f] grid place-items-center transition-colors"
              >
                <Ic className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-white/80">Explore</h4>
          <ul className="mt-5 space-y-3 text-white/60 text-sm">
            {NAV.map((n) => (
              <li key={n.id}><a href={`#${n.id}`} className="hover:text-[#ff8a1f] transition-colors">{n.label}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-white/80">Office</h4>
          <ul className="mt-5 space-y-3 text-white/60 text-sm">
            <li>Main Road, [District]<br />Telangana 500000, India</li>
            <li>+91 00000 00000</li>
            <li>office@jaggareddy.in</li>
          </ul>
        </div>
      </div>
      <div className="mt-16 pt-8 border-t border-white/10 max-w-7xl mx-auto px-5 lg:px-10 flex flex-wrap items-center justify-between gap-4 text-xs text-white/40">
        <span>© {new Date().getFullYear()} Sri Jaya Prakash Reddy. All rights reserved.</span>
        <span>Desinged by TechMecha Torque</span>
      </div>
    </footer>
  );
}

function Index() {
  useReveal();
  return (
    <main className="bg-[#fdfcf9] text-neutral-900">
      <Navbar />
      <Hero />
      <Biography />
      <Journey />
      <Appearances />
      <Achievements />
      <Media />
      <Gallery />
      <Engagement />
      <Footer />
    </main>
  );
}
