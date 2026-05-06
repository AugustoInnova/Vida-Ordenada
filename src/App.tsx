import React, { lazy, Suspense, useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { useTranslation } from "react-i18next";
import { Play } from "lucide-react";

// ─── Lazy section imports ─────────────────────────────────────────────────────
// Each section is its own chunk. Section modules are also imported via the
// raw thunks below so we can prefetch them on idle, after the Hero paints.

const importPillars     = () => import("./sections/PillarsSection");
const importSplit       = () => import("./sections/SplitSection");
const importStickyScroll= () => import("./sections/StickyScroll");
const importPricing     = () => import("./sections/PricingSection");
const importFAQ         = () => import("./sections/FAQSection");
const importCta         = () => import("./sections/CtaDownloadSection");
const importNewsletter  = () => import("./sections/NewsletterSection");
const importFooter      = () => import("./sections/FooterSection");

const PillarsSection      = lazy(importPillars);
const SplitSection        = lazy(importSplit);
const StickyScroll        = lazy(importStickyScroll);
const PricingSection      = lazy(importPricing);
const FAQSection          = lazy(importFAQ);
const CtaDownloadSection  = lazy(importCta);
const NewsletterSection   = lazy(importNewsletter);
const FooterSection       = lazy(importFooter);

// Reserve approximate space so chunks loading mid-scroll do not cause CLS.
// Heights are lower bounds — the real section will be at least this tall.
const PlaceHolder = ({ minHeight, navTheme }: { minHeight: string; navTheme?: "dark" | "light" }) => (
  <div data-nav-theme={navTheme} style={{ minHeight }} aria-hidden="true" />
);

// ─── Flag SVGs ───────────────────────────────────────────────────────────────
// Inline SVGs porque Windows 10 no soporta emojis de banderas regionales
// (los renderiza como pares de letras "AR", "GB", "BR").

function FlagAR() {
  return (
    <svg viewBox="0 0 18 12" width="22" height="15" className="rounded-[2px] block shadow-sm">
      <rect width="18" height="12" fill="#74ACDF" />
      <rect y="4" width="18" height="4" fill="#FFFFFF" />
      <circle cx="9" cy="6" r="1.1" fill="#F6B40E" stroke="#85340A" strokeWidth="0.12" />
    </svg>
  );
}

function FlagGB() {
  return (
    <svg viewBox="0 0 60 30" width="22" height="15" className="rounded-[2px] block shadow-sm overflow-hidden">
      <clipPath id="gb-clip"><rect width="60" height="30" /></clipPath>
      <g clipPath="url(#gb-clip)">
        <rect width="60" height="30" fill="#012169" />
        {/* White diagonals */}
        <path d="M0,0 L60,30 M60,0 L0,30" stroke="#FFFFFF" strokeWidth="6" />
        {/* Red diagonals */}
        <path d="M0,0 L60,30 M60,0 L0,30" stroke="#C8102E" strokeWidth="3" />
        {/* White cross */}
        <path d="M30,0 V30 M0,15 H60" stroke="#FFFFFF" strokeWidth="10" />
        {/* Red cross */}
        <path d="M30,0 V30 M0,15 H60" stroke="#C8102E" strokeWidth="5" />
      </g>
    </svg>
  );
}

function FlagBR() {
  return (
    <svg viewBox="0 0 70 49" width="22" height="15" className="rounded-[2px] block shadow-sm">
      <rect width="70" height="49" fill="#009C3B" />
      <polygon points="35,6 64,24.5 35,43 6,24.5" fill="#FEDF00" />
      <circle cx="35" cy="24.5" r="10" fill="#002776" />
    </svg>
  );
}

const LANGUAGES = [
  { code: "es", Flag: FlagAR, label: "ES" },
  { code: "en", Flag: FlagGB, label: "EN" },
  { code: "pt", Flag: FlagBR, label: "PT" },
] as const;

// ─── App ─────────────────────────────────────────────────────────────────────

export default function App() {
  const { t, i18n } = useTranslation();

  const heroRef = useRef<HTMLElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const [navDark, setNavDark] = useState(true);
  const [mobileLangOpen, setMobileLangOpen] = useState(false);
  const [heroVideoReady, setHeroVideoReady] = useState(false);
  const activeLang = LANGUAGES.find(l => i18n.resolvedLanguage === l.code || i18n.language === l.code) ?? LANGUAGES[0];
  const ActiveFlag = activeLang.Flag;
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);

  // Nav theme tracker — deferred to idle so the IntersectionObserver setup
  // does not run during the LCP critical path. Re-attaches to new
  // [data-nav-theme] nodes as lazy sections mount.
  useEffect(() => {
    let observer: IntersectionObserver | null = null;
    let mo: MutationObserver | null = null;
    let rafScheduled = 0;
    let cancelled = false;

    const init = () => {
      if (cancelled) return;
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setNavDark(entry.target.getAttribute("data-nav-theme") === "dark");
            }
          });
        },
        { rootMargin: "-44px 0px -94% 0px", threshold: 0 }
      );
      const observed = new WeakSet<Element>();
      const attach = () => {
        document.querySelectorAll("[data-nav-theme]").forEach((s) => {
          if (!observed.has(s)) {
            observer!.observe(s);
            observed.add(s);
          }
        });
      };
      // Batch attach() into a single rAF tick so a burst of mutations from a
      // lazy chunk mounting only triggers one DOM query per frame.
      const scheduleAttach = () => {
        if (rafScheduled) return;
        rafScheduled = requestAnimationFrame(() => {
          rafScheduled = 0;
          attach();
        });
      };
      attach();
      mo = new MutationObserver(scheduleAttach);
      mo.observe(document.body, { childList: true, subtree: true });
    };

    const w = window as Window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };
    const handle = w.requestIdleCallback
      ? w.requestIdleCallback(init, { timeout: 1000 })
      : (setTimeout(init, 200) as unknown as number);

    return () => {
      cancelled = true;
      if (observer) observer.disconnect();
      if (mo) mo.disconnect();
      if (rafScheduled) cancelAnimationFrame(rafScheduled);
      if (w.cancelIdleCallback) w.cancelIdleCallback(handle);
      else clearTimeout(handle as unknown as ReturnType<typeof setTimeout>);
    };
  }, []);

  // Prefetch lazy section chunks once the browser is idle, so they are ready
  // by the time the user scrolls past the Hero. Each `import()` is cached, so
  // calling it both here and via React.lazy is safe.
  useEffect(() => {
    const w = window as Window & { requestIdleCallback?: (cb: () => void) => number };
    const schedule = w.requestIdleCallback ?? ((cb: () => void) => setTimeout(cb, 200));
    const id = schedule(() => {
      importPillars();
      importSplit();
      importStickyScroll();
      importPricing();
      importFAQ();
      importCta();
      importNewsletter();
      importFooter();
    });
    return () => {
      if (typeof id === "number") {
        const cancel = (window as Window & { cancelIdleCallback?: (id: number) => void }).cancelIdleCallback;
        if (cancel) cancel(id);
        else clearTimeout(id);
      }
    };
  }, []);

  return (
    <div className="bg-black text-white font-serif">

      {/* ══════════════════════════════════════════
          HERO
      ══════════════════════════════════════════ */}
      <section data-nav-theme="dark" ref={heroRef} className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e]">

        {/* Gradient color overlay */}
        <div className="absolute inset-0 z-0 bg-gradient-to-tr from-purple-900/40 via-blue-900/20 to-pink-900/40 opacity-80 mix-blend-overlay" />

        {/* Video background — poster covers immediately, video fades in onCanPlay */}
        <motion.div style={{ y: heroY }} className="absolute inset-0 z-0 opacity-45">
          {/* Poster as background image — visible until the video is ready */}
          <div
            className="absolute inset-0 w-full h-full bg-cover bg-center"
            style={{
              backgroundImage:
                "url(https://res.cloudinary.com/dd1rxqm7v/video/upload/so_0,f_auto,q_auto,w_800/v1775884810/VIDEO_PRINCIPAL_DEL_SITIO_upskrh.jpg)",
            }}
            aria-hidden="true"
          />
          {/* Video fades in once the browser reports it can play */}
          <video
            autoPlay muted loop playsInline preload="none"
            onCanPlay={() => setHeroVideoReady(true)}
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-[800ms] ease-out"
            style={{ opacity: heroVideoReady ? 1 : 0 }}
          >
            <source src="https://res.cloudinary.com/dd1rxqm7v/video/upload/f_auto,q_auto,vc_auto/v1775884810/VIDEO_PRINCIPAL_DEL_SITIO_upskrh.mp4" type="video/mp4" />
          </video>
        </motion.div>

        {/* Grain texture */}
        <div className="absolute inset-0 z-[1] pointer-events-none opacity-[0.035]"
          style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E\")", backgroundRepeat: "repeat", backgroundSize: "128px" }} />

        {/* ── NAV — centered floating pill ── */}
        <motion.nav
          ref={navRef as React.RefObject<HTMLElement>}
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="fixed top-6 inset-x-0 mx-auto w-fit z-50 flex items-center gap-8 px-6 py-3 rounded-full backdrop-blur-2xl font-sans transition-all duration-300"
          style={{
            background: navDark ? "rgba(255,255,255,0.08)" : "rgba(237,232,224,0.95)",
            border: navDark ? "1px solid rgba(255,255,255,0.18)" : "1px solid rgba(0,0,0,0.10)",
            boxShadow: navDark ? "0 8px 32px rgba(0,0,0,0.35)" : "0 4px 24px rgba(0,0,0,0.10)",
          }}
        >
          {/* Logo icon — WhatsApp bot */}
          <a href="https://wa.me/50769999999" target="_blank" rel="noopener noreferrer"
            className="text-xl leading-none"
            style={{ filter: "sepia(1) saturate(8) hue-rotate(90deg) brightness(0.85)" }}
            title={t("nav.ariaSamu")}
            aria-label={t("nav.ariaSamu")}
          >🤖</a>

          {/* Links */}
          <div className="hidden md:flex items-center gap-7">
            {[
              [t("nav.features"), "#hogar"],
              [t("nav.pricing"), "#precios"],
              [t("nav.faq"), "#faq"],
            ].map(([label, href]) => (
              <a key={href} href={href}
                className="text-[11px] uppercase tracking-[0.22em] font-semibold transition-colors"
                style={{ color: navDark ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.6)" }}>
                {label}
              </a>
            ))}
          </div>

          {/* CTA button */}
          <motion.a
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            href="#precios"
            className="flex items-center gap-2 px-6 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-[0.18em] transition-colors"
            style={{
              background: navDark ? "#8ECB9B" : "#111111",
              color: navDark ? "#000000" : "#ffffff",
            }}
          >
            {t("nav.cta")}
            <Play className="w-2.5 h-2.5 fill-current" />
          </motion.a>
        </motion.nav>

        {/* ── LANGUAGE SELECTOR — desktop: floating vertical pill on the left ── */}
        <motion.div
          initial={{ x: -80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          className="hidden md:flex fixed top-1/2 left-6 -translate-y-1/2 z-50 flex-col items-center gap-1 p-1.5 rounded-full backdrop-blur-2xl font-sans transition-all duration-300"
          style={{
            background: navDark ? "rgba(255,255,255,0.08)" : "rgba(237,232,224,0.95)",
            border: navDark ? "1px solid rgba(255,255,255,0.18)" : "1px solid rgba(0,0,0,0.10)",
            boxShadow: navDark ? "0 8px 32px rgba(0,0,0,0.35)" : "0 4px 24px rgba(0,0,0,0.10)",
          }}
        >
          {LANGUAGES.map(({ code, Flag, label }) => {
            const active = i18n.resolvedLanguage === code || i18n.language === code;
            return (
              <button
                key={code}
                onClick={() => i18n.changeLanguage(code)}
                aria-label={label}
                title={label}
                className="flex flex-col items-center justify-center w-11 h-11 rounded-full text-[9px] font-bold uppercase tracking-wide transition-all"
                style={{
                  color: active
                    ? (navDark ? "#000000" : "#ffffff")
                    : (navDark ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.5)"),
                  background: active
                    ? (navDark ? "#8ECB9B" : "#111111")
                    : "transparent",
                }}
              >
                <Flag />
                <span className="leading-none mt-0.5">{label}</span>
              </button>
            );
          })}
        </motion.div>

        {/* ── LANGUAGE SELECTOR — mobile: collapsed mini button on bottom-left, expands on tap ── */}
        <div className="md:hidden">
          {/* Backdrop to close when tapping outside */}
          <AnimatePresence>
            {mobileLangOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => setMobileLangOpen(false)}
                className="fixed inset-0 z-40"
                style={{ background: "transparent" }}
              />
            )}
          </AnimatePresence>

          {/* Button + expanded popup, fixed bottom-left */}
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            className="fixed bottom-3 left-3 z-50 flex flex-col items-start gap-1"
          >
            {/* Expanded options (stack above the collapsed button) */}
            <AnimatePresence>
              {mobileLangOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.9 }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col items-center gap-1 p-1 rounded-full backdrop-blur-2xl"
                  style={{
                    background: navDark ? "rgba(255,255,255,0.12)" : "rgba(237,232,224,0.95)",
                    border: navDark ? "1px solid rgba(255,255,255,0.22)" : "1px solid rgba(0,0,0,0.10)",
                    boxShadow: navDark ? "0 8px 32px rgba(0,0,0,0.5)" : "0 4px 24px rgba(0,0,0,0.15)",
                  }}
                >
                  {LANGUAGES.filter(l => l.code !== activeLang.code).map(({ code, Flag, label }) => (
                    <button
                      key={code}
                      onClick={() => {
                        i18n.changeLanguage(code);
                        setMobileLangOpen(false);
                      }}
                      aria-label={label}
                      title={label}
                      className="w-7 h-7 rounded-full flex items-center justify-center transition-all active:scale-90"
                      style={{
                        color: navDark ? "rgba(255,255,255,0.8)" : "rgba(0,0,0,0.7)",
                        background: "transparent",
                      }}
                    >
                      <Flag />
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Collapsed / trigger button (always visible, shows current language) */}
            <button
              onClick={() => setMobileLangOpen(v => !v)}
              aria-label={`Idioma: ${activeLang.label}`}
              aria-expanded={mobileLangOpen}
              className="w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-2xl transition-all active:scale-90"
              style={{
                background: navDark ? "rgba(255,255,255,0.12)" : "rgba(237,232,224,0.95)",
                border: navDark ? "1px solid rgba(255,255,255,0.22)" : "1px solid rgba(0,0,0,0.10)",
                boxShadow: navDark ? "0 4px 16px rgba(0,0,0,0.5)" : "0 2px 12px rgba(0,0,0,0.15)",
              }}
            >
              <ActiveFlag />
            </button>
          </motion.div>
        </div>

        {/* ── HERO CONTENT — centrado vertical ── */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full font-sans text-[11px] font-semibold tracking-[0.2em] uppercase"
            style={{ background: "rgba(142,203,155,0.15)", border: "1px solid rgba(142,203,155,0.4)", color: "#8ECB9B" }}
          >
            {t("hero.badge")}
          </motion.div>

          {/* Título — LCP element, renderiza inmediatamente sin animación */}
          <h1 className="text-[8.25rem] md:text-[15rem] lg:text-[19.5rem] leading-[1] tracking-tighter text-white drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)] mb-6">
            {t("hero.titleLine1")}<br />
            <span style={{ color: "#8ECB9B" }}>{t("hero.titleLine2")}</span>
          </h1>

          {/* Subtítulo */}
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.55, ease: "easeOut" }}
            className="max-w-xl text-base md:text-xl font-sans font-light text-white/70 leading-relaxed mb-10"
          >
            <span className="block">{t("hero.subtitle1")}</span>
            <span className="block mt-2">{t("hero.subtitle2")}</span>
          </motion.p>

          {/* CTA principal */}
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex flex-col sm:flex-row items-center gap-4 mb-12"
          >
            <motion.a
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
              href="#precios"
              className="px-8 py-4 rounded-full font-sans font-bold text-sm tracking-wide text-black"
              style={{ backgroundColor: "#8ECB9B", boxShadow: "0 0 32px rgba(142,203,155,0.4)" }}
            >
              {t("hero.cta")}
            </motion.a>
          </motion.div>

          {/* Plataformas */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="flex flex-col items-center gap-4"
          >
            <span className="text-[11px] font-sans text-white/30 uppercase tracking-[0.2em]">{t("hero.availableOn")}</span>
            <div className="flex items-center gap-8">
              {/* App Store */}
              <a href="#newsletter" className="flex flex-col items-center gap-2 text-white/50 hover:text-white transition-colors" aria-label={t("hero.ariaAppStore")}>
                <svg className="w-9 h-9" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                <span className="text-[11px] font-sans font-medium">App Store</span>
              </a>
              <div className="w-px h-10 bg-white/15" />
              {/* Google Play */}
              <a href="#newsletter" className="flex flex-col items-center gap-2 text-white/50 hover:text-white transition-colors" aria-label={t("hero.ariaGooglePlay")}>
                <svg className="w-9 h-9" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5"/>
                  <path d="M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12"/>
                  <path d="M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81"/>
                  <path d="M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66"/>
                </svg>
                <span className="text-[11px] font-sans font-medium">Google Play</span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          PILARES — phone arc carousel (lazy)
      ══════════════════════════════════════════ */}
      <Suspense fallback={<PlaceHolder minHeight="860px" navTheme="light" />}>
        <PillarsSection />
      </Suspense>

      {/* ══════════════════════════════════════════
          SPLIT — phone mockup + content (lazy)
      ══════════════════════════════════════════ */}
      <Suspense fallback={<PlaceHolder minHeight="clamp(320px, 55vw, 640px)" navTheme="dark" />}>
        <SplitSection />
      </Suspense>

      {/* ══════════════════════════════════════════
          STICKY SCROLL (lazy)
      ══════════════════════════════════════════ */}
      <Suspense fallback={<PlaceHolder minHeight="300vh" />}>
        <div><StickyScroll /></div>
      </Suspense>

      {/* ══════════════════════════════════════════
          PRICING (lazy)
      ══════════════════════════════════════════ */}
      <Suspense fallback={<PlaceHolder minHeight="900px" navTheme="dark" />}>
        <div data-nav-theme="dark"><PricingSection /></div>
      </Suspense>

      {/* ══════════════════════════════════════════
          FAQ (lazy)
      ══════════════════════════════════════════ */}
      <Suspense fallback={<PlaceHolder minHeight="700px" navTheme="dark" />}>
        <div data-nav-theme="dark"><FAQSection /></div>
      </Suspense>

      {/* ══════════════════════════════════════════
          CTA DESCARGA — con Samu (lazy)
      ══════════════════════════════════════════ */}
      <Suspense fallback={<PlaceHolder minHeight="600px" navTheme="light" />}>
        <CtaDownloadSection />
      </Suspense>

      {/* ══════════════════════════════════════════
          NEWSLETTER (lazy)
      ══════════════════════════════════════════ */}
      <Suspense fallback={<PlaceHolder minHeight="500px" navTheme="dark" />}>
        <NewsletterSection />
      </Suspense>

      {/* ══════════════════════════════════════════
          FOOTER (lazy)
      ══════════════════════════════════════════ */}
      <Suspense fallback={<PlaceHolder minHeight="650px" navTheme="dark" />}>
        <FooterSection />
      </Suspense>

    </div>
  );
}
