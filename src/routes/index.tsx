import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  Menu, X, ArrowRight, ChevronDown, Quote, Award, Users, Calendar, MapPin,
  Mic2, Newspaper, Image as ImageIcon, Heart, HandHeart, Mail, Phone, Play,
  Facebook, Twitter, Instagram, Youtube, Send, PlayCircle, Download,
  GraduationCap, Sparkles, Compass, Flag, Building2, Sprout, Briefcase,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import "./-i18n"; // ← initialises i18next once

import portrait from "@/assets/jagga-reddy-portrait.jpg";
import portrait2 from "@/assets/jagga-reddy-portrait-2.jpeg";

export const Route = createFileRoute("/")({ component: Index });

// ─── i18n-aware nav ──────────────────────────────────────────────────────────
function useNav() {
  const { t } = useTranslation();
  return [
    { id: "biography", label: t("nav.biography") },
    { id: "journey", label: t("nav.journey") },
    { id: "appearances", label: t("nav.appearances") },
    { id: "achievements", label: t("nav.achievements") },
    { id: "media", label: t("nav.media") },
    { id: "gallery", label: t("nav.gallery") },
    { id: "engage", label: t("nav.engage") },
  ];
}

// ─── Hooks ───────────────────────────────────────────────────────────────────
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

// ─── Language Switcher ────────────────────────────────────────────────────────
function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const langs = [
    { code: "en", label: "EN" },
    { code: "hi", label: "हिं" },
    { code: "te", label: "తె" },
  ];
  const handleClick = (code: string) => {
    i18n.changeLanguage(code);
    window.location.reload(); // Force reload to re-render all components with new language
  };
  return (
    <div className="flex items-center gap-1">
      {langs.map(({ code, label }) => (
        <button
          key={code}
          onClick={() => handleClick(code)}
          className={`px-3 py-1 rounded-full text-xs font-semibold transition-all border ${i18n.language === code
            ? "bg-[#e8721a] text-white border-[#e8721a] shadow-sm"
            : "bg-transparent text-neutral-600 border-neutral-300 hover:border-[#e8721a] hover:text-[#e8721a]"
            }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────
function Navbar() {
  const y = useScrollY();
  const solid = y > 40;
  const [open, setOpen] = useState(false);
  const NAV = useNav();

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
              <div className="text-[10px] uppercase tracking-[0.18em] text-neutral-500">
                Public Servant
              </div>
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

          {/* Language switcher — always visible */}
          {/* <LanguageSwitcher /> */}
          <div className="flex items-center gap-3">
            <LanguageSwitcher />

            {/* Mobile Menu Button */}
            <button
              onClick={() => setOpen(!open)}
              className="lg:hidden p-2 rounded-md"
              aria-label="Toggle Menu"
            >
              {open ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
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

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  const { t } = useTranslation();

  return (
    <section id="top" className="relative min-h-screen pt-28 lg:pt-24 overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,#fff4e6_0%,transparent_55%),radial-gradient(ellipse_at_bottom_left,#e6f5ec_0%,transparent_55%)]" />
      <div className="absolute top-32 -left-32 w-[420px] h-[420px] rounded-full bg-[#ff8a1f]/10 blur-3xl -z-10" />
      <div className="absolute bottom-0 right-0 w-[520px] h-[520px] rounded-full bg-[#0b8a4a]/10 blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-5 lg:px-10 grid lg:grid-cols-12 gap-10 lg:gap-12 items-center pb-20">
        <div className="lg:col-span-7 reveal">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs font-medium text-neutral-700 mb-7">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0b8a4a] animate-pulse" />
            {t("hero.badge")}
          </div>

          <h1 className="text-[42px] sm:text-6xl lg:text-7xl font-bold leading-[1.02] text-neutral-900">
            {t("hero.title1")} <span className="italic text-[#e8721a]">{t("hero.title2")}</span>
            <br />
            {t("hero.title3")}
          </h1>

          <p className="mt-7 text-[17px] lg:text-lg text-neutral-600 max-w-xl leading-relaxed">
            <strong className="text-neutral-900 font-semibold">{t("hero.desc1")}</strong>,{" "}
            {t("hero.desc2")}{" "}
            <strong className="text-neutral-900 font-semibold">{t("hero.desc3")}</strong>
            {t("hero.desc4")}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href="#journey"
              className="group inline-flex items-center gap-2 bg-[#0a0a0a] text-white font-medium px-6 py-3.5 rounded-full hover:bg-[#e8721a] transition-all duration-300 shadow-lg shadow-black/10"
            >
              {t("hero.cta1")}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#achievements"
              className="inline-flex items-center gap-2 border border-neutral-300 hover:border-[#0b8a4a] hover:text-[#0b8a4a] text-neutral-800 font-medium px-6 py-3.5 rounded-full transition-colors"
            >
              {t("hero.cta2")}
            </a>
          </div>

          <div className="mt-12 grid grid-cols-3 gap-6 max-w-md">
            {[{ n: 22, s: "+", l: t("hero.stat1") }].map((s) => (
              <div key={s.l}>
                <div className="text-3xl font-bold text-neutral-900" style={{ fontFamily: "Playfair Display, serif" }}>
                  <Counter to={s.n} />{s.s}
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
            </div>

            <div className="absolute -bottom-6 -left-6 glass rounded-2xl px-5 py-4 shadow-xl max-w-[220px]">
              <div className="flex items-center gap-2 mb-1">
                <Award className="w-4 h-4 text-[#e8721a]" />
                {/* <span className="text-[11px] uppercase tracking-wider text-neutral-600">Recognition</span> */}
              </div>
              <p className="text-sm font-medium text-neutral-900 leading-snug">
                {t("hero.recognition")}
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

// ─── SectionHeader ────────────────────────────────────────────────────────────
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

// ─── Biography ────────────────────────────────────────────────────────────────
function Biography() {
  const { t } = useTranslation();

  const blocks = [
    { icon: Sparkles, t: t("biography.block1_title"), d: t("biography.block1_desc") },
    { icon: GraduationCap, t: t("biography.block2_title"), d: t("biography.block2_desc") },
    { icon: Compass, t: t("biography.block3_title"), d: t("biography.block3_desc") },
    { icon: Flag, t: t("biography.block4_title"), d: t("biography.block4_desc") },
  ];

  return (
    <section id="biography" className="relative py-28 lg:py-36">
      <div className="max-w-7xl mx-auto px-5 lg:px-10">
        <SectionHeader
          eyebrow={t("biography.eyebrow")}
          title={
            <>
              {t("biography.title1")}{" "}
              <span className="italic text-[#0b8a4a]">{t("biography.title2")}</span>
              {t("biography.title3")}
            </>
          }
          lead={t("biography.lead")}
        />

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          <div className="lg:col-span-5 reveal">
            <div className="relative">
              <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-xl ring-1 ring-black/5">
                <img src={portrait2} alt="Connecting with villagers" className="w-full h-full object-cover" loading="lazy" />
              </div>
              <div className="absolute -bottom-6 -right-6 hidden md:block bg-white border border-neutral-200 rounded-2xl p-5 shadow-xl max-w-[240px]">
                <Quote className="w-5 h-5 text-[#e8721a]" />
                <p className="mt-2 text-sm text-neutral-800 italic leading-relaxed">
                  "{t("biography.quote")}"
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

// ─── Journey ──────────────────────────────────────────────────────────────────
function Journey() {
  const { t } = useTranslation();

  const milestones = [
    { y: t("journey.m1_year"), t: t("journey.m1_title"), d: t("journey.m1_desc"), icon: Sprout },
    { y: t("journey.m2_year"), t: t("journey.m2_title"), d: t("journey.m2_desc"), icon: Flag },
    { y: t("journey.m3_year"), t: t("journey.m3_title"), d: t("journey.m3_desc"), icon: Users },
    { y: t("journey.m4_year"), t: t("journey.m4_title"), d: t("journey.m4_desc"), icon: Building2 },
    { y: t("journey.m5_year"), t: t("journey.m5_title"), d: t("journey.m5_desc"), icon: Award },
  ];

  return (
    <section id="journey" className="relative py-28 lg:py-36 bg-[#0a0a0a] text-white overflow-hidden">
      <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(255,255,255,.6)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.6)_1px,transparent_1px)] [background-size:40px_40px]" />
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full border border-[#ff8a1f]/20 ashoka-spin" />
      <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[420px] h-[420px] rounded-full border border-[#0b8a4a]/20 ashoka-spin" style={{ animationDirection: "reverse" }} />

      <div className="relative max-w-7xl mx-auto px-5 lg:px-10">
        <div className="max-w-3xl mb-16 reveal">
          <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-[#ff8a1f] font-semibold mb-4">
            <span className="w-8 h-px bg-[#ff8a1f]" /> {t("journey.eyebrow")}
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold leading-tight">
            {t("journey.title1")} <span className="italic text-[#ff8a1f]">{t("journey.title2")}</span>,
            <br /> {t("journey.title3")}
          </h2>
        </div>

        <div className="relative">
          <div className="absolute left-5 lg:left-1/2 lg:-translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#ff8a1f] via-white/30 to-[#0b8a4a]" />
          <ul className="space-y-12">
            {milestones.map((m, i) => {
              const right = i % 2 === 1;
              return (
                <li key={m.y + m.t} className="relative reveal lg:grid lg:grid-cols-2 lg:gap-12 items-center">
                  <div className={`pl-14 lg:pl-0 ${right ? "lg:col-start-2" : ""}`}>
                    <div className="relative bg-white/[0.04] border border-white/10 rounded-2xl p-7 backdrop-blur-sm hover:bg-white/[0.07] hover:border-[#ff8a1f]/40 transition-all">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-3xl font-bold text-[#ff8a1f]" style={{ fontFamily: "Playfair Display, serif" }}>{m.y}</span>
                        <span className="text-xs uppercase tracking-wider text-white/60">{t("journey.milestone")}</span>
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

// ─── Asset imports ────────────────────────────────────────────────────────────
import hearing from "@/assets/videos/hearing.mp4";
import hearingPoster from "@/assets/hearing.jpeg";
import cycles from "@/assets/videos/cycles.mp4";
import cyclesPoster from "@/assets/cycle.jpeg";
import kjs from "@/assets/videos/kjs.mp4";
import kjsPoster from "@/assets/kjs.jpeg";
import devotion from "@/assets/videos/devotion.mp4";
import devotionPoster from "@/assets/devotion.jpg";
import dargah from "@/assets/videos/dargah.mp4";
import dargahPoster from "@/assets/dargah.jpeg";
import delimitation from "@/assets/videos/delimitation.mp4";
import delimitationPoster from "@/assets/delimitation.jpeg";

// ─── Appearances ──────────────────────────────────────────────────────────────
function Appearances() {
  const { t } = useTranslation();

  // Note: appearance item text is kept in English as they are specific news/event descriptions.
  // You can move them to the JSON files too if needed.
  const items = [
    { vid: hearing, poster: hearingPoster, cat: t("appearances.cat1"), t: t("appearances.t1"), d: t("appearances.d1") },
    { vid: cycles, poster: cyclesPoster, cat: t("appearances.cat2"), t: t("appearances.t2"), d: t("appearances.d2") },
    { vid: kjs, poster: kjsPoster, cat: t("appearances.cat3"), t: t("appearances.t3"), d: t("appearances.d3") },
    { vid: devotion, poster: devotionPoster, cat: t("appearances.cat4"), t: t("appearances.t4"), d: t("appearances.d4") },
    { vid: dargah, poster: dargahPoster, cat: t("appearances.cat5"), t: t("appearances.t5"), d: t("appearances.d5") },
    { vid: delimitation, poster: delimitationPoster, cat: t("appearances.cat6"), t: t("appearances.t6"), d: t("appearances.d6") },
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
      if (playing !== null) videoRefs.current[playing]?.pause();
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
            eyebrow={t("appearances.eyebrow")}
            title={
              <>
                {t("appearances.title1")}{" "}
                <span className="italic text-[#e8721a]">{t("appearances.title2")}</span>
                {t("appearances.title3")}
              </>
            }
            lead={t("appearances.lead")}
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {items.map((it, i) => (
              <article
                key={i}
                className="reveal group relative rounded-2xl overflow-hidden bg-white border border-neutral-200 shadow-sm hover:shadow-2xl transition-all duration-500"
              >
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
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider bg-white/90 text-neutral-900 backdrop-blur pointer-events-none">
                    {it.cat}
                  </span>
                  <button
                    onClick={() => handlePlay(i)}
                    aria-label={playing === i ? "Pause" : "Play"}
                    className="absolute inset-0 flex items-center justify-center transition-opacity duration-300 focus:outline-none"
                  >
                    <span className={`flex items-center justify-center w-14 h-14 rounded-full bg-white/90 backdrop-blur shadow-lg transition-all duration-300 ${playing === i ? "opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100" : "opacity-100 scale-100"}`}>
                      {playing === i ? (
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

                <div className="p-6">
                  <h3 className="font-semibold text-lg text-neutral-900 leading-snug">{it.t}</h3>
                  <p className="mt-2 text-sm text-neutral-600 leading-relaxed line-clamp-2">{it.d}</p>
                  <button
                    onClick={() => setModal(it)}
                    className="mt-4 flex items-center gap-1 text-sm font-medium text-[#e8721a] hover:gap-2 transition-all focus:outline-none"
                  >
                    {t("appearances.readmore")} <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label={modal.t}>
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setModal(null)} />
          <div className="relative z-10 bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden animate-fade-in">
            <div className="aspect-video bg-black">
              <video src={modal.vid} poster={modal.poster} controls autoPlay playsInline className="w-full h-full object-cover" />
            </div>
            <div className="p-6">
              <span className="px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider bg-[#e8721a]/10 text-[#e8721a]">{modal.cat}</span>
              <h2 className="mt-3 text-xl font-bold text-neutral-900 leading-snug">{modal.t}</h2>
              <p className="mt-3 text-sm text-neutral-600 leading-relaxed">{modal.d}</p>
            </div>
            <button onClick={() => setModal(null)} className="absolute top-3 right-3 flex items-center justify-center w-9 h-9 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors focus:outline-none" aria-label="Close">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}

// ─── Achievements ─────────────────────────────────────────────────────────────
function Achievements() {
  const { t } = useTranslation();

  const stats = [
    { n: 22, s: "+", l: t("achievements.stat1"), icon: Calendar },
    { n: 300, s: "+", l: t("achievements.stat2"), icon: HandHeart },
    { n: 100, s: "+", l: t("achievements.stat3"), icon: MapPin },
  ];

  const cards = [
    { icon: HandHeart, t: t("achievements.card1_title"), d: t("achievements.card1_desc") },
    { icon: Sprout, t: t("achievements.card2_title"), d: t("achievements.card2_desc") },
    { icon: GraduationCap, t: t("achievements.card3_title"), d: t("achievements.card3_desc") },
    { icon: Building2, t: t("achievements.card4_title"), d: t("achievements.card4_desc") },
    { icon: Award, t: t("achievements.card5_title"), d: t("achievements.card5_desc") },
    { icon: Heart, t: t("achievements.card6_title"), d: t("achievements.card6_desc") },
  ];

  return (
    <section id="achievements" className="py-28 lg:py-36 bg-gradient-to-b from-[#fff8ef] to-[#f1faf3]">
      <div className="max-w-7xl mx-auto px-5 lg:px-10">
        <SectionHeader
          eyebrow={t("achievements.eyebrow")}
          title={
            <>
              {t("achievements.title1")}{" "}
              <span className="italic text-[#0b8a4a]">{t("achievements.title2")}</span>
              {t("achievements.title3")}
            </>
          }
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

// ─── Media ────────────────────────────────────────────────────────────────────
function getYouTubeId(videoUrl: string): string | null {
  const match = videoUrl.match(/(?:youtube\.com\/(?:watch\?v=|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  return match ? match[1] : null;
}

function getYouTubeThumbnail(videoUrl: string): string {
  const id = getYouTubeId(videoUrl);
  return id ? `https://img.youtube.com/vi/${id}/maxresdefault.jpg` : "/fallback-thumbnail.jpg";
}

function Media() {
  const { t } = useTranslation();

  const videos = [
    { videoUrl: "https://www.youtube.com/watch?v=lnpY-7p0Neg", title: t("media.vt1") },
    { videoUrl: "https://www.youtube.com/watch?v=7VWPlbYG47E", title: t("media.vt2") },
    { videoUrl: "https://www.youtube.com/watch?v=C2Q3JkC4Rbc", title: t("media.vt3") },
  ];

  const press = [
    { src: t("media.src1"), t: t("media.t1"), link: t("media.link1") },
    { src: t("media.src2"), t: t("media.t2"), link: t("media.link2") },
    { src: t("media.src3"), t: t("media.t3"), link: t("media.link3") },
  ];

  return (
    <section id="media" className="py-28 lg:py-36">
      <div className="max-w-7xl mx-auto px-5 lg:px-10">
        <SectionHeader
          eyebrow={t("media.eyebrow")}
          title={
            <>
              {t("media.title1")}{" "}
              <span className="italic text-[#e8721a]">{t("media.title2")}</span>
              {t("media.title3")}
            </>
          }
          lead={t("media.lead")}
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
              <img src={getYouTubeThumbnail(video.videoUrl)} alt={video.title} loading="lazy" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
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
                {t("media.readarticle")} <ArrowRight className="w-4 h-4" />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Gallery image imports ────────────────────────────────────────────────────
import a from "@/assets/gallery/1.jpeg";
import b from "@/assets/gallery/2.jpeg";
import c from "@/assets/gallery/3.jpeg";
import d from "@/assets/gallery/4.jpeg";
import e from "@/assets/gallery/5.jpeg";
import f from "@/assets/gallery/6.jpeg";
import g from "@/assets/gallery/7.jpeg";
import h from "@/assets/gallery/8.jpeg";
import i from "@/assets/gallery/9.jpeg";
import j from "@/assets/gallery/10.jpeg";
import k from "@/assets/gallery/11.jpeg";

// ─── Gallery ──────────────────────────────────────────────────────────────────
function Gallery() {
  const { t } = useTranslation();

  const imgs = [
    { src: a, c: t("gallery.a") },
    { src: b, c: t("gallery.b") },
    { src: c, c: t("gallery.c") },
    { src: d, c: t("gallery.d"), span: "lg:row-span-2" },
    { src: k, c: t("gallery.k"), span: "lg:row-span-2" },
    { src: e, c: t("gallery.e") },
    { src: f, c: t("gallery.f") },
    { src: g, c: t("gallery.g") },
    { src: i, c: t("gallery.i") },
    { src: j, c: t("gallery.j") },
  ];

  const [open, setOpen] = useState<string | null>(null);

  return (
    <section id="gallery" className="py-28 lg:py-36 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-5 lg:px-10">
        <SectionHeader
          eyebrow={t("gallery.eyebrow")}
          title={
            <>
              {t("gallery.title1")}{" "}
              <span className="italic text-[#0b8a4a]">{t("gallery.title2")}</span>
              {t("gallery.title3")}
            </>
          }
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
          <button onClick={() => setOpen(null)} className="absolute top-6 right-6 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 grid place-items-center text-white" aria-label="Close">
            <X className="w-5 h-5" />
          </button>
          <img src={open} alt="Preview" className="max-h-[88vh] max-w-[92vw] rounded-2xl shadow-2xl object-contain" />
        </div>
      )}
    </section>
  );
}

// ─── Engagement ───────────────────────────────────────────────────────────────
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

function Engagement() {
  const { t } = useTranslation();

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
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      await addDoc(collection(db, "engagements"), {
        ...formData,
        createdAt: serverTimestamp(),
      });
      alert(t("engage.success"));
      setFormData({ fullName: "", phone: "", email: "", district: "", category: "General Enquiry", message: "" });
    } catch (error) {
      console.error("Error submitting form:", error);
      alert(t("engage.error"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="engage" className="py-28 lg:py-36 bg-gradient-to-b from-white to-[#fff8ef]">
      <div className="max-w-7xl mx-auto px-5 lg:px-10">
        <SectionHeader
          eyebrow={t("engage.eyebrow")}
          title={
            <>
              {t("engage.title1")}{" "}
              <span className="italic text-[#e8721a]">{t("engage.title2")}</span>
            </>
          }
          lead={t("engage.lead")}
        />

        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          <form
            onSubmit={handleSubmit}
            className="lg:col-span-3 reveal bg-white border border-neutral-200 rounded-3xl p-8 lg:p-10 shadow-sm"
          >
            <h3 className="text-2xl font-semibold text-neutral-900">{t("engage.form_title")}</h3>
            <p className="mt-2 text-sm text-neutral-600">{t("engage.form_desc")}</p>

            <div className="mt-7 grid sm:grid-cols-2 gap-4">
              {/* Full Name */}
              <label className="block">
                <span className="text-xs font-medium text-neutral-700 uppercase tracking-wider">{t("engage.fullname")}</span>
                <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required
                  placeholder={t("engage.fullname_placeholder")}
                  className="mt-2 w-full rounded-xl border border-neutral-200 bg-neutral-50/60 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#ff8a1f]/40 focus:bg-white transition"
                />
              </label>

              {/* Phone */}
              <label className="block">
                <span className="text-xs font-medium text-neutral-700 uppercase tracking-wider">{t("engage.phone")}</span>
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required
                  placeholder="+91 00000 00000"
                  className="mt-2 w-full rounded-xl border border-neutral-200 bg-neutral-50/60 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#ff8a1f]/40 focus:bg-white transition"
                />
              </label>

              {/* Email */}
              <label className="block">
                <span className="text-xs font-medium text-neutral-700 uppercase tracking-wider">{t("engage.email")}</span>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required
                  placeholder="you@example.com"
                  className="mt-2 w-full rounded-xl border border-neutral-200 bg-neutral-50/60 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#ff8a1f]/40 focus:bg-white transition"
                />
              </label>

              {/* District */}
              <label className="block">
                <span className="text-xs font-medium text-neutral-700 uppercase tracking-wider">{t("engage.district")}</span>
                <input type="text" name="district" value={formData.district} onChange={handleChange} required
                  placeholder={t("engage.district_placeholder")}
                  className="mt-2 w-full rounded-xl border border-neutral-200 bg-neutral-50/60 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#ff8a1f]/40 focus:bg-white transition"
                />
              </label>

              {/* Category */}
              <label className="block sm:col-span-2">
                <span className="text-xs font-medium text-neutral-700 uppercase tracking-wider">{t("engage.category")}</span>
                <select name="category" value={formData.category} onChange={handleChange}
                  className="mt-2 w-full rounded-xl border border-neutral-200 bg-neutral-50/60 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#ff8a1f]/40 focus:bg-white"
                >
                  <option value="General Enquiry">{t("engage.cat1")}</option>
                  <option value="Public Grievance">{t("engage.cat2")}</option>
                  <option value="Volunteer Interest">{t("engage.cat3")}</option>
                </select>
              </label>

              {/* Message */}
              <label className="block sm:col-span-2">
                <span className="text-xs font-medium text-neutral-700 uppercase tracking-wider">{t("engage.message")}</span>
                <textarea rows={5} required name="message" value={formData.message} onChange={handleChange}
                  placeholder={t("engage.message_placeholder")}
                  className="mt-2 w-full rounded-xl border border-neutral-200 bg-neutral-50/60 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#ff8a1f]/40 focus:bg-white transition"
                />
              </label>
            </div>

            <button type="submit" disabled={loading}
              className="mt-6 inline-flex items-center gap-2 bg-[#0a0a0a] text-white font-medium px-6 py-3.5 rounded-full hover:bg-[#0b8a4a] transition-colors disabled:opacity-60"
            >
              {loading ? t("engage.submitting") : t("engage.submit")}
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  const { t } = useTranslation();
  const NAV = useNav();

  return (
    <footer className="bg-[#070707] text-white pt-20 pb-8 relative overflow-hidden">
      <div className="tricolor-bar absolute top-0 inset-x-0 h-[3px]" />
      <div className="max-w-7xl mx-auto px-5 lg:px-10 grid lg:grid-cols-4 gap-12">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#ff8a1f] to-[#0b8a4a] grid place-items-center font-bold">JR</div>
            <div>
              <div className="text-lg font-semibold" style={{ fontFamily: "Playfair Display, serif" }}>{t("footer.name")}</div>
              <div className="text-xs text-white/50 uppercase tracking-[0.2em]">{t("footer.subtitle")}</div>
            </div>
          </div>
          <p className="text-white/60 max-w-md leading-relaxed">{t("footer.desc")}</p>
          <div className="mt-6 flex items-center gap-3">
            {[
              { icon: Facebook, url: "https://www.facebook.com/jagga.reddy.3152/" },
              { icon: Twitter, url: "https://x.com/ImJaggaReddy?lang=en" },
              { icon: Instagram, url: "https://www.instagram.com/imjaggareddy/" },
              { icon: Youtube, url: "https://www.youtube.com/@JaggaReddyOfficial" },
            ].map(({ icon: Ic, url }, i) => (
              <a key={i} href={url} target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-white/15 hover:border-[#ff8a1f] hover:text-[#ff8a1f] grid place-items-center transition-colors"
              >
                <Ic className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-white/80">{t("footer.explore")}</h4>
          <ul className="mt-5 space-y-3 text-white/60 text-sm">
            {NAV.map((n) => (
              <li key={n.id}>
                <a href={`#${n.id}`} className="hover:text-[#ff8a1f] transition-colors">{n.label}</a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-white/80">{t("footer.office")}</h4>
          <ul className="mt-5 space-y-3 text-white/60 text-sm">
            <li style={{ whiteSpace: "pre-line" }}>{t("footer.address")}</li>
            <li>+91 00000 00000</li>
            <li>office@jaggareddy.in</li>
          </ul>
        </div>
      </div>

      <div className="mt-16 pt-8 border-t border-white/10 max-w-7xl mx-auto px-5 lg:px-10 flex flex-wrap items-center justify-between gap-4 text-xs text-white/40">
        <span>© {new Date().getFullYear()} {t("footer.rights")}</span>
        <span>{t("footer.designed")}</span>
      </div>
    </footer>
  );
}

// ─── Index ────────────────────────────────────────────────────────────────────
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

export default Engagement;