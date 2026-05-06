import { motion, AnimatePresence } from "motion/react";
import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ChevronDown } from "lucide-react";
import { cldSrcSet } from "../lib/cloudinary";

type StickySlideMeta = {
  bg: string;
  navTheme: string;
  textColor: string;
  subColor: string;
  phoneAccent: string;
  phoneBg: string;
  phoneContent: { icon: string; done: boolean }[];
  image?: string;
  video?: string;
  noFrame?: boolean;
};

const stickySlidesMeta: StickySlideMeta[] = [
  {
    bg: "#EDE8E0",
    navTheme: "light",
    textColor: "#2c2c2c",
    subColor: "rgba(0,0,0,0.65)",
    phoneAccent: "#5c7260",
    phoneBg: "#EDE8E0",
    phoneContent: [
      { icon: "🍔", done: true },
      { icon: "🚌", done: true },
      { icon: "💊", done: true },
      { icon: "🎬", done: false },
    ],
    image: "https://res.cloudinary.com/dd1rxqm7v/image/upload/f_auto,q_auto,w_400/v1774853456/22_e9oykj.png",
  },
  {
    bg: "#8ECB9B",
    navTheme: "dark",
    textColor: "#1a1a1a",
    subColor: "rgba(0,0,0,0.5)",
    phoneAccent: "#1a1a1a",
    phoneBg: "#f5f5f5",
    phoneContent: [
      { icon: "🍔", done: true },
      { icon: "🏠", done: true },
      { icon: "🚗", done: true },
      { icon: "🎬", done: false },
    ],
    image: "https://res.cloudinary.com/dd1rxqm7v/image/upload/f_auto,q_auto,w_400/v1774853450/14_zkjbyz.png",
  },
  {
    bg: "#111111",
    navTheme: "dark",
    textColor: "#ffffff",
    subColor: "rgba(255,255,255,0.5)",
    phoneAccent: "#8ECB9B",
    phoneBg: "#1a1a1a",
    phoneContent: [
      { icon: "💬", done: true },
      { icon: "💬", done: true },
      { icon: "💬", done: true },
      { icon: "💬", done: false },
    ],
  },
];

type PhoneContentItem = { icon: string; label: string; status: string; done: boolean };
type StickySlide = Omit<StickySlideMeta, "phoneContent"> & {
  label: string;
  desc: string;
  phoneTitle: string;
  phoneSubtitle: string;
  phoneContent: PhoneContentItem[];
};

type StickySlideTranslation = {
  label: string;
  titleH1?: string;
  titleH2?: string;
  titleMid?: string;
  titlePre?: string;
  desc: string;
  phoneTitle: string;
  phoneSubtitle: string;
  phoneContent: { label: string; status: string }[];
};

function buildStickySlides(slidesText: StickySlideTranslation[]): StickySlide[] {
  return stickySlidesMeta.map((meta, i) => ({
    ...meta,
    label: slidesText[i].label,
    desc: slidesText[i].desc,
    phoneTitle: slidesText[i].phoneTitle,
    phoneSubtitle: slidesText[i].phoneSubtitle,
    phoneContent: meta.phoneContent.map((pc, j) => ({
      icon: pc.icon,
      done: pc.done,
      label: slidesText[i].phoneContent[j].label,
      status: slidesText[i].phoneContent[j].status,
    })),
  }));
}

function QRPlaceholder({ fg }: { fg: string }) {
  const data = [
    [1,0,1,1,0,1,0,1],
    [0,1,1,0,1,0,1,0],
    [1,1,0,1,0,1,0,1],
    [0,0,1,0,1,1,1,0],
    [1,0,0,1,0,0,1,1],
    [0,1,1,0,1,0,0,1],
    [1,0,1,1,0,1,1,0],
    [0,1,0,0,1,0,1,1],
  ];
  const cell = 5;
  const offset = 30;
  return (
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
      <rect x="4" y="4" width="22" height="22" rx="3" stroke={fg} strokeWidth="2.5" fill="none"/>
      <rect x="9" y="9" width="12" height="12" rx="2" fill={fg}/>
      <rect x="54" y="4" width="22" height="22" rx="3" stroke={fg} strokeWidth="2.5" fill="none"/>
      <rect x="59" y="9" width="12" height="12" rx="2" fill={fg}/>
      <rect x="4" y="54" width="22" height="22" rx="3" stroke={fg} strokeWidth="2.5" fill="none"/>
      <rect x="9" y="59" width="12" height="12" rx="2" fill={fg}/>
      {data.map((row, ri) =>
        row.map((val, ci) =>
          val ? <rect key={`${ri}-${ci}`} x={offset + ci * cell} y={offset + ri * cell} width="4" height="4" rx="0.8" fill={fg}/> : null
        )
      )}
    </svg>
  );
}

function PhoneScreen({ slide, visible }: { slide: StickySlide; visible: boolean }) {
  return (
    <AnimatePresence mode="wait">
      {visible && (
        <motion.div
          key={slide.label}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 flex flex-col"
          style={{ backgroundColor: slide.video ? "transparent" : slide.image ? "#000" : slide.phoneBg }}
        >
          {slide.video ? (
            <video
              src={slide.video}
              autoPlay
              muted
              loop
              playsInline
              preload="none"
              style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }}
            />
          ) : slide.image ? (
            <img
              src={slide.image}
              srcSet={cldSrcSet(slide.image)}
              sizes="(max-width: 768px) 220px, (max-width: 1024px) 290px, 322px"
              alt={slide.label}
              loading="lazy"
              width={1080}
              height={2400}
              style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }}
            />
          ) : <>
          {/* Status bar */}
          <div className="flex justify-between items-center px-5 pt-10 pb-2">
            <span className="text-[10px] font-bold" style={{ color: slide.phoneBg === "#1a1a1a" ? "#fff" : "#222" }}>9:41</span>
            <div className="flex gap-1 items-center">
              <span className="text-[9px]" style={{ color: slide.phoneBg === "#1a1a1a" ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.4)" }}>▲▲▲ ☁ ▮</span>
            </div>
          </div>

          {/* App header */}
          <div className="px-5 pb-3 border-b" style={{ borderColor: slide.phoneBg === "#1a1a1a" ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.07)" }}>
            <div className="flex items-center justify-between mb-0.5">
              <span className="text-[9px] font-sans font-medium" style={{ color: slide.phoneAccent }}>
                VIDA ORDENADA
              </span>
              <div className="w-6 h-6 rounded-full flex items-center justify-center text-[10px]"
                style={{ backgroundColor: slide.phoneAccent + "30" }}>
                💰
              </div>
            </div>
            <p className="font-serif text-lg leading-tight" style={{ color: slide.phoneBg === "#1a1a1a" ? "#fff" : "#1a1a1a" }}>
              {slide.phoneTitle}
            </p>
            <p className="text-[10px] font-sans" style={{ color: slide.phoneBg === "#1a1a1a" ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.4)" }}>
              {slide.phoneSubtitle}
            </p>
          </div>

          {/* Items — chat style para slide de WhatsApp, lista para los otros */}
          {slide.phoneBg === "#1a1a1a" ? (
            <div className="flex-1 px-3 pt-3 space-y-2 overflow-hidden">
              {slide.phoneContent.map((item) => (
                <div key={item.label}>
                  <div className="flex justify-end mb-1">
                    <div className="px-3 py-1.5 rounded-2xl rounded-br-none max-w-[85%] bg-white/10">
                      <p className="text-[9px] text-white/80 font-sans">{item.label}</p>
                    </div>
                  </div>
                  <div className="flex gap-1.5 items-end">
                    <div className="w-4 h-4 rounded-full flex-shrink-0 flex items-center justify-center text-[8px]"
                      style={{ backgroundColor: item.done ? "#8ECB9B20" : "rgba(255,255,255,0.05)" }}>🤖</div>
                    <div className="px-3 py-1.5 rounded-2xl rounded-bl-none max-w-[85%]"
                      style={{ backgroundColor: item.done ? "rgba(142,203,155,0.12)" : "rgba(255,255,255,0.04)" }}>
                      <p className="text-[9px] font-sans" style={{ color: item.done ? "#8ECB9B" : "rgba(255,255,255,0.25)" }}>
                        {item.status}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex-1 px-4 pt-3 space-y-2 overflow-hidden">
              {slide.phoneContent.map((item) => (
                <div key={item.label} className="flex items-center gap-3 p-2.5 rounded-xl"
                  style={{ backgroundColor: slide.phoneBg === "#1a1a1a" ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)" }}>
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center text-base flex-shrink-0"
                    style={{ backgroundColor: item.done ? slide.phoneAccent + "25" : "transparent",
                             border: item.done ? "none" : "1.5px solid rgba(0,0,0,0.1)" }}>
                    {item.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] font-sans font-medium truncate" style={{ color: item.done ? "#1a1a1a" : "rgba(0,0,0,0.3)" }}>
                      {item.label}
                    </p>
                    <p className="text-[9px] font-sans font-semibold" style={{ color: item.done ? "#2c7a4b" : "rgba(0,0,0,0.2)" }}>
                      {item.status}
                    </p>
                  </div>
                  <div className="w-4 h-4 rounded-full flex-shrink-0 flex items-center justify-center text-[8px] font-bold"
                    style={{ backgroundColor: item.done ? slide.phoneAccent : "transparent",
                             border: item.done ? "none" : "1.5px solid rgba(0,0,0,0.12)",
                             color: "#fff" }}>
                    {item.done ? "✓" : ""}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Bottom bar */}
          <div className="px-4 pb-4 pt-2">
            <div className="w-16 h-1 rounded-full mx-auto"
              style={{ backgroundColor: slide.phoneBg === "#1a1a1a" ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.15)" }} />
          </div>
          </>}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function StickyScroll() {
  const { t } = useTranslation();
  const slidesText = t("sticky.slides", { returnObjects: true }) as StickySlideTranslation[];
  const inputMethodsLabels = (t("sticky.inputMethods", { returnObjects: true }) as { label: string }[]).map(i => i.label);
  const stickySlides = buildStickySlides(slidesText);

  const [active, setActive] = useState(0);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers = stickySlidesMeta.map((_, i) => {
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(i); },
        { threshold: 0.5 }
      );
      if (sectionRefs.current[i]) obs.observe(sectionRefs.current[i]!);
      return obs;
    });
    return () => observers.forEach(o => o.disconnect());
  }, []);

  const slide = stickySlides[active];

  return (
    <div className="sticky-scroll-outer relative flex" style={{ height: `${stickySlides.length * 100}vh` }}>

      {/* LEFT — sticky phone (tablet/desktop only) */}
      <div className="hidden md:flex sticky top-0 w-1/2 h-screen items-center justify-center overflow-hidden transition-colors duration-700"
        style={{ backgroundColor: slide.bg }}>

        {/* Subtle glow behind phone */}
        <div className="absolute w-64 h-64 rounded-full blur-[80px] opacity-20 pointer-events-none transition-all duration-700"
          style={{ backgroundColor: slide.phoneAccent }} />

        {/* Phone frame — se desarma cuando el slide activo tiene noFrame (para ver contenido "al aire") */}
        <motion.div
          animate={{ y: [0, -14, 0] }}
          transition={{ repeat: Infinity, duration: 3.2, ease: "easeInOut" }}
          className={
            slide.noFrame
              ? "relative w-[320px] md:w-[340px] lg:w-[380px] aspect-[9/19] overflow-hidden"
              : "relative w-[276px] md:w-[290px] lg:w-[322px] aspect-[9/19] rounded-[44px] overflow-hidden border-[8px] border-[#1c1c1e]"
          }
          style={
            slide.noFrame
              ? {}
              : { boxShadow: "0 40px 80px rgba(0,0,0,0.4), 0 0 0 4.3px rgba(142,203,155,0.55), 0 0 66px 13px rgba(142,203,155,0.25), 0 0 148px 25px rgba(142,203,155,0.10)" }
          }
        >
          {stickySlides.map((s, i) => (
            <PhoneScreen key={s.label} slide={s} visible={i === active} />
          ))}
        </motion.div>

        {/* Scroll indicator on first slide */}
        {active === 0 && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute bottom-8 flex flex-col items-center gap-1"
          >
            <span className="text-sm font-sans tracking-[0.2em] uppercase font-medium" style={{ color: slide.subColor }}>Scroll</span>
            <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.4 }}
              style={{ color: slide.subColor }}><ChevronDown size={28} strokeWidth={2.5} /></motion.div>
          </motion.div>
        )}
      </div>

      {/* RIGHT — scrollable blocks */}
      <div className="w-full md:w-1/2">
        {stickySlides.map((s, i) => (
          <div
            key={s.label}
            ref={el => { sectionRefs.current[i] = el; }}
            data-nav-theme={s.navTheme}
            className="min-h-screen flex flex-col justify-center px-6 md:px-14 py-16 md:py-0 transition-colors duration-700"
            style={{ backgroundColor: s.bg }}
          >
            {/* Mobile phone mockup — solo visible en mobile. Sin marco cuando el slide tiene noFrame. */}
            <div className="flex md:hidden justify-center mb-10">
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 3.2, ease: "easeInOut" }}
                className={
                  s.noFrame
                    ? "relative w-[260px] aspect-[9/19] overflow-hidden"
                    : "relative w-[220px] aspect-[9/19] rounded-[40px] overflow-hidden border-[7px] border-[#1c1c1e]"
                }
                style={
                  s.noFrame
                    ? {}
                    : { boxShadow: "0 30px 60px rgba(0,0,0,0.4), 0 0 0 3px rgba(142,203,155,0.55), 0 0 50px 10px rgba(142,203,155,0.20)" }
                }
              >
                <PhoneScreen slide={s} visible={true} />
              </motion.div>
            </div>

            {/* Text content */}
            <div>
              {/* Label */}
              <motion.p
                initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.5 }}
                className="text-[13px] md:text-[20px] font-sans font-semibold tracking-[0.25em] uppercase mb-5"
                style={{ color: s.textColor, opacity: 0.4 }}
              >
                {s.label}
              </motion.p>

              {/* Title */}
              <motion.h2
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.65, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
                className="feature-section-title leading-[1.1] tracking-tight mb-6"
                style={{ color: s.textColor, whiteSpace: "pre-line" }}
              >
                {i === 0 ? (
                  <><span style={{ color: "#8ECB9B" }}>{slidesText[0].titleH1}</span>{slidesText[0].titleMid}<span style={{ color: "#8ECB9B" }}>{slidesText[0].titleH2}</span></>
                ) : i === 1 ? (
                  <><span style={{ color: "#EDE8E0" }}>{slidesText[1].titleH1}</span>{slidesText[1].titleMid}<span style={{ color: "#EDE8E0" }}>{slidesText[1].titleH2}</span></>
                ) : i === 2 ? (
                  <>{slidesText[2].titlePre}<span style={{ color: "#8ECB9B" }}>{slidesText[2].titleH1}</span>{slidesText[2].titleMid}<span style={{ color: "#8ECB9B" }}>{slidesText[2].titleH2}</span></>
                ) : null}
              </motion.h2>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
                className="font-sans font-light text-base md:text-2xl leading-relaxed mb-6 max-w-lg"
                style={{ color: s.subColor, whiteSpace: i === 2 ? "pre-line" : undefined }}
              >
                {i === 2
                  ? s.desc.split(/(Samu|SAMU)/g).map((part, idx) =>
                      part === "Samu" || part === "SAMU"
                        ? <span key={idx} style={{ color: "#8ECB9B" }}>{part}</span>
                        : part
                    )
                  : s.desc}
              </motion.p>

              {/* Input methods — solo slide 2 */}
              {i === 2 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.12 }}
                  className="flex flex-wrap gap-2 mb-8 md:mb-12"
                >
                  {[
                    { icon: "💬", label: inputMethodsLabels[0] },
                    { icon: "🎤", label: inputMethodsLabels[1] },
                    { icon: "📸", label: inputMethodsLabels[2] },
                  ].map(({ icon, label }) => (
                    <div key={label}
                      className="feature-badge flex items-center gap-2 px-3 py-1.5 rounded-full"
                      style={{ backgroundColor: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)" }}
                    >
                      <span className="text-sm">{icon}</span>
                      <span className="font-sans text-[11px] md:text-[12px] font-medium tracking-wide"
                        style={{ color: "rgba(255,255,255,0.65)" }}>
                        {label}
                      </span>
                    </div>
                  ))}
                </motion.div>
              )}

              {/* QR + label */}
              <motion.div
                initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.15 }}
                className="flex items-end gap-4"
              >
                <div className="p-2 rounded-xl" style={{ backgroundColor: s.textColor + "12" }}>
                  <QRPlaceholder fg={s.textColor} />
                </div>
                <div>
                  <p className="font-sans text-[13px] md:text-[17px] font-semibold mb-0.5" style={{ color: s.textColor }}>
                    {t("sticky.downloadApp")}
                  </p>
                  <p className="font-sans text-[11px] md:text-[15px]" style={{ color: s.subColor }}>
                    vidaordenada.app
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
