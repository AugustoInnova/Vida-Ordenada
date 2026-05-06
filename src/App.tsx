import React from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { useRef, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import {
  Play, ArrowRight, Mail,
  Layers, Key, Palette, Package, CheckCircle, Leaf,
  ChevronDown, ChevronUp
} from "lucide-react";

// ─── Helpers ─────────────────────────────────────────────────────────────────

const cldVariant = (url: string, w: number) => url.replace(/w_\d+|w_auto/, `w_${w}`);
const cldSrcSet = (url: string, widths: number[] = [400, 600, 800]) =>
  widths.map((w) => `${cldVariant(url, w)} ${w}w`).join(", ");

// ─── Data ────────────────────────────────────────────────────────────────────

const hogarCards = [
  { icon: <Layers className="w-5 h-5" />, title: "Sistema de zonas", desc: "Dividí tu hogar en zonas funcionales: entrada, cocina, trabajo, descanso. Cada zona con reglas claras de qué entra y qué sale." },
  { icon: <Package className="w-5 h-5" />, title: "El método de las cajas", desc: "Clasificá todos tus objetos en tres categorías: guardar, donar y descartar. Hacelo una vez al mes y el desorden nunca se acumula." },
  { icon: <Leaf className="w-5 h-5" />, title: "Superficies limpias", desc: "La regla de oro: las superficies deben estar 80% vacías. Guardá todo lo que no usás a diario y notá cómo cambia la energía." },
  { icon: <CheckCircle className="w-5 h-5" />, title: "Reset nocturno", desc: "10 minutos cada noche de reset del hogar: cada objeto a su lugar, superficies despejadas, listo para el día siguiente." },
  { icon: <Key className="w-5 h-5" />, title: "Lugares fijos", desc: "Las llaves, el control, el cargador — cada objeto de uso diario debe tener un lugar fijo e inamovible. Eliminá la búsqueda del día a día." },
  { icon: <Palette className="w-5 h-5" />, title: "Estética funcional", desc: "El orden también es bello. Elegí almacenamiento visible que te guste. Cuando algo es lindo, lo cuidás más y lo mantenés en su lugar." },
];

const rutinas = [
  { time: "06:30", title: "Despertar intencional", desc: "Sin celular los primeros 20 minutos. Hidratación, estiramientos, respiración." },
  { time: "07:00", title: "Bloque de movimiento", desc: "30 minutos de actividad física. No tiene que ser el gym — una caminata vale igual." },
  { time: "08:00", title: "Trabajo profundo", desc: "Las primeras 3 horas son para la tarea más importante del día. Sin reuniones, sin distracciones." },
  { time: "12:30", title: "Pausa real", desc: "Almorzá alejado de pantallas. Salí a caminar aunque sea 10 minutos." },
  { time: "21:00", title: "Cierre del día", desc: "Reset del hogar, revisá el plan de mañana, modo nocturno en todos los dispositivos." },
];

const tips = [
  { n: "01", title: "Empezá con dos hábitos", desc: "No intentes cambiar todo de golpe. Elegí dos hábitos nuevos, anclalos a algo que ya hacés y esperá tres semanas antes de agregar otro." },
  { n: "02", title: "Diseñá el ambiente", desc: "Poné la botella de agua en la mesita de noche. Dejá la ropa deportiva lista la noche anterior. El ambiente trabaja por vos." },
  { n: "03", title: "El 80% es suficiente", desc: "Un día que cumplís el 80% de tu rutina es un día exitoso. La consistencia imperfecta siempre supera la perfección intermitente." },
];

const principles = [
  { n: "01", title: "La regla del año", desc: "Si no lo usaste en los últimos 12 meses, probablemente no lo vayas a usar. Agradecé y dejalo ir." },
  { n: "02", title: "Calidad sobre cantidad", desc: "Mejor tener cinco camisas que amás que veinte que solo tolerás. Comprá menos, elegí mejor." },
  { n: "03", title: "Una entrada, una salida", desc: "Cada vez que entra un objeto nuevo al hogar, uno viejo debe salir. El equilibrio se mantiene solo." },
  { n: "04", title: "Digital también cuenta", desc: "Carpetas, archivos, apps, suscripciones — el desorden digital genera tanto ruido mental como el físico." },
  { n: "05", title: "El valor no está en las cosas", desc: "Las experiencias, las relaciones y el tiempo libre son los bienes más escasos y valiosos. Protegelos." },
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] } }),
};

// ─── Pricing Section ─────────────────────────────────────────────────────────

function PricingSection() {
  const { t } = useTranslation();
  const [yearly, setYearly] = useState(false);
  const proPrice = yearly ? 3 : 5;
  const proPeriod = yearly ? t("pricing.pro.periodYearly") : t("pricing.pro.periodMonthly");

  const freeFeatures = t("pricing.free.features", { returnObjects: true }) as string[];
  const proFeatures = t("pricing.pro.features", { returnObjects: true }) as string[];
  const proHighlightIndex = t("pricing.pro.proHighlightIndex") as unknown as number;

  return (
    <section id="precios" className="relative w-full py-28 px-6 overflow-hidden">
      {/* Desktop video (≥ md) */}
      <video autoPlay muted loop playsInline preload="none" className="hidden md:block absolute inset-0 w-full h-full object-cover">
        <source src="https://res.cloudinary.com/dd1rxqm7v/video/upload/v1775885790/seccion_de_compra_lalkxn.mp4" type="video/mp4" />
      </video>
      {/* Mobile video (< md) — portrait crop via Cloudinary for sharper rendering on tall mobile viewport */}
      <video autoPlay muted loop playsInline preload="metadata" className="block md:hidden absolute inset-0 w-full h-full object-cover object-center">
        <source src="https://res.cloudinary.com/dd1rxqm7v/video/upload/q_auto:best,f_auto,c_fill,g_center,ar_9:16,w_720/v1774768412/Character_swimming_looped_202603290413_rtuw11.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <motion.p initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-[10px] font-sans font-semibold tracking-[0.25em] uppercase mb-4"
            style={{ color: "#8ECB9B" }}>
            {t("pricing.badge")}
          </motion.p>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: 0.05, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="text-white mb-4" style={{ fontSize: "2.2rem" }}>
            {t("pricing.title")}
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: 0.1 }}
            className="text-white/80 font-sans font-normal text-base max-w-md mx-auto mb-8">
            {t("pricing.subtitle")}
          </motion.p>

          {/* Toggle */}
          <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: 0.15 }}
            className="inline-flex items-center gap-1 p-1 rounded-full font-sans"
            style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)" }}>
            {/* Monthly */}
            <button
              onClick={() => setYearly(false)}
              className="relative px-5 py-2 rounded-full text-sm font-semibold tracking-wide transition-colors"
              style={{ color: !yearly ? "#111" : "rgba(255,255,255,0.5)" }}
            >
              {!yearly && (
                <motion.span layoutId="pill"
                  className="absolute inset-0 rounded-full"
                  style={{ backgroundColor: "#8ECB9B" }} />
              )}
              <span className="relative">{t("pricing.monthly")}</span>
            </button>
            {/* Yearly */}
            <button
              onClick={() => setYearly(true)}
              className="relative px-5 py-2 rounded-full text-sm font-semibold tracking-wide transition-colors"
              style={{ color: yearly ? "#111" : "rgba(255,255,255,0.5)" }}
            >
              {yearly && (
                <motion.span layoutId="pill"
                  className="absolute inset-0 rounded-full"
                  style={{ backgroundColor: "#8ECB9B" }} />
              )}
              <span className="relative">{t("pricing.yearly")}</span>
            </button>
          </motion.div>

          {/* Badge debajo del toggle */}
          <div className="mt-2 h-6 flex items-center justify-center">
            {yearly ? (
              <motion.span
                initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }}
                className="text-[11px] font-sans font-bold tracking-wide px-4 py-1.5 rounded-full whitespace-nowrap"
                style={{ backgroundColor: "#8ECB9B", color: "#000" }}>
                {t("pricing.savingsBadge")}
              </motion.span>
            ) : (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="text-sm font-sans font-semibold" style={{ color: "#8ECB9B" }}>
                {t("pricing.savingsHint")}
              </motion.p>
            )}
          </div>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">

          {/* FREE */}
          <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-3xl p-8 flex flex-col"
            style={{ background: "rgba(255,255,255,0.08)", backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)", border: "1px solid rgba(255,255,255,0.15)" }}>
            <p className="text-[10px] font-sans font-semibold tracking-[0.2em] uppercase text-white/40 mb-5">{t("pricing.free.name")}</p>
            <div className="mb-6">
              <span className="text-white" style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "2.7rem" }}>$0</span>
              <span className="text-white/40 font-sans text-sm ml-2">{t("pricing.free.period")}</span>
            </div>
            <ul className="space-y-3 mb-8 flex-1">
              {freeFeatures.map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <span className="mt-0.5 w-4 h-4 rounded-full flex-shrink-0 flex items-center justify-center text-[9px] font-bold text-black" style={{ backgroundColor: "#8ECB9B" }}>✓</span>
                  <span className="text-white/60 font-sans text-sm leading-snug">{f}</span>
                </li>
              ))}
            </ul>
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
              className="w-full py-3.5 rounded-xl font-sans text-[11px] font-bold tracking-[0.15em] uppercase transition-colors"
              style={{ background: "rgba(255,255,255,0.12)", color: "#fff", border: "1px solid rgba(255,255,255,0.2)" }}>
              {t("pricing.free.cta")}
            </motion.button>
          </motion.div>

          {/* PRO */}
          <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-3xl p-8 flex flex-col relative"
            style={{ background: "rgba(255,255,255,0.14)", backdropFilter: "blur(32px)", WebkitBackdropFilter: "blur(32px)", border: "1px solid rgba(142,203,155,0.5)", boxShadow: "0 0 40px rgba(142,203,155,0.15)" }}>
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
              <span className="px-4 py-1.5 rounded-full text-[9px] font-sans font-bold tracking-[0.2em] uppercase text-black" style={{ backgroundColor: "#8ECB9B" }}>{t("pricing.pro.popular")}</span>
            </div>
            <p className="text-[10px] font-sans font-semibold tracking-[0.2em] uppercase mb-5" style={{ color: "#8ECB9B" }}>{t("pricing.pro.name")}</p>

            {/* Animated price */}
            <div className="mb-6 flex items-baseline gap-2 flex-wrap">
              <span className="text-white/30 line-through" style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "1rem" }}>$12</span>
              <AnimatePresence mode="wait">
                <motion.span
                  key={proPrice}
                  initial={{ opacity: 0, y: -12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 12 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="text-white"
                  style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "2.7rem" }}
                >
                  ${proPrice}
                </motion.span>
              </AnimatePresence>
              <AnimatePresence mode="wait">
                <motion.span
                  key={proPeriod}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="text-white/40 font-sans text-sm"
                >
                  {proPeriod}
                </motion.span>
              </AnimatePresence>
            </div>

            <ul className="space-y-3 mb-8 flex-1">
              {proFeatures.map((text, idx) => {
                const highlight = idx === proHighlightIndex;
                return (
                  <li key={text} className="flex items-start gap-3">
                    <span className="mt-0.5 w-4 h-4 rounded-full flex-shrink-0 flex items-center justify-center text-[9px] font-bold text-black" style={{ backgroundColor: "#8ECB9B" }}>✓</span>
                    <span className="font-sans text-sm leading-snug" style={{ color: highlight ? "#8ECB9B" : "rgba(255,255,255,0.8)" }}>{text}</span>
                  </li>
                );
              })}
            </ul>
            <motion.button whileHover={{ scale: 1.02, backgroundColor: "#6db87d" }} whileTap={{ scale: 0.97 }}
              className="w-full py-3.5 rounded-xl font-sans text-[11px] font-bold tracking-[0.15em] uppercase text-black transition-colors"
              style={{ backgroundColor: "#8ECB9B" }}>
              {t("pricing.pro.cta")}
            </motion.button>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.35 }}
          className="text-center font-sans mt-8 flex flex-col items-center gap-1.5">
          <p className="text-sm font-semibold"
            style={{
              color: "#8ECB9B",
              textShadow: "0 0 8px rgba(142,203,155,0.4), 0 0 20px rgba(142,203,155,0.2)",
            }}>
            {t("pricing.pro.trial")}
          </p>
          <p className="text-sm font-semibold"
            style={{
              color: "#8ECB9B",
              textShadow: "0 0 8px rgba(142,203,155,0.4), 0 0 20px rgba(142,203,155,0.2)",
            }}>
            {t("pricing.pro.disclaimer")}
          </p>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Sticky Scroll Section ───────────────────────────────────────────────────

// Structural/styling data only. Translatable text (labels, titles, descriptions,
// phoneContent labels/statuses, phoneTitle/Subtitle) lives in translation files
// under `sticky.slides` and is merged in inside StickyScroll.
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

// QR-like SVG placeholder con patrón fijo
function QRPlaceholder({ fg }: { fg: string }) {
  // Patrón de datos fijo (5x5 grilla interna, 1=lleno)
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
      {/* Esquina superior izquierda */}
      <rect x="4" y="4" width="22" height="22" rx="3" stroke={fg} strokeWidth="2.5" fill="none"/>
      <rect x="9" y="9" width="12" height="12" rx="2" fill={fg}/>
      {/* Esquina superior derecha */}
      <rect x="54" y="4" width="22" height="22" rx="3" stroke={fg} strokeWidth="2.5" fill="none"/>
      <rect x="59" y="9" width="12" height="12" rx="2" fill={fg}/>
      {/* Esquina inferior izquierda */}
      <rect x="4" y="54" width="22" height="22" rx="3" stroke={fg} strokeWidth="2.5" fill="none"/>
      <rect x="9" y="59" width="12" height="12" rx="2" fill={fg}/>
      {/* Datos fijos */}
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
          {/* Si hay video real, mostrarlo directamente (sin marco) */}
          {slide.video ? (
            <video
              src={slide.video}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }}
            />
          ) : slide.image ? (
            <img
              src={slide.image}
              srcSet={cldSrcSet(slide.image)}
              sizes="(max-width: 768px) 400px, (max-width: 1024px) 600px, 800px"
              alt={slide.label}
              loading="lazy"
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
              {slide.phoneContent.map((item, i) => (
                <div key={item.label}>
                  {/* Mensaje usuario */}
                  <div className="flex justify-end mb-1">
                    <div className="px-3 py-1.5 rounded-2xl rounded-br-none max-w-[85%] bg-white/10">
                      <p className="text-[9px] text-white/80 font-sans">{item.label}</p>
                    </div>
                  </div>
                  {/* Respuesta bot */}
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

function StickyScroll() {
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

// ─── FAQ Section ─────────────────────────────────────────────────────────────

// Los blobs del FAQ usan CSS keyframes para viajar horizontalmente

function FAQSection() {
  const { t } = useTranslation();
  const faqItems = t("faq.items", { returnObjects: true }) as { q: string; a: string }[];
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 px-6" style={{ background: "#000000", position: "relative", overflow: "hidden" }}>
      {/* Blobs verdes — viajan de izquierda a derecha/derecha a izquierda con CSS keyframes */}
      <style>{`
        @keyframes faq-blob-ltr {
          0%   { transform: translateX(-700px); }
          100% { transform: translateX(calc(100vw + 200px)); }
        }
        @keyframes faq-blob-rtl {
          0%   { transform: translateX(calc(100vw + 200px)); }
          100% { transform: translateX(-700px); }
        }
        @keyframes faq-blob-mid {
          0%   { transform: translateX(-400px); }
          100% { transform: translateX(calc(100vw + 400px)); }
        }
        .faq-blob-1 { animation: faq-blob-ltr  8s ease-in-out infinite alternate; }
        .faq-blob-2 { animation: faq-blob-rtl 12s ease-in-out infinite alternate; }
        .faq-blob-3 { animation: faq-blob-mid 15s ease-in-out infinite alternate; }
      `}</style>

      {/* Blob 1 — viaja izq→der, 8s, arriba */}
      <div className="faq-blob-1" style={{
        position: "absolute", top: "12%", left: 0,
        width: 640, height: 640,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(142,203,155,0.55) 0%, rgba(142,203,155,0.30) 45%, transparent 75%)",
        filter: "blur(120px)",
        pointerEvents: "none",
        willChange: "transform",
      }} />
      {/* Blob 2 — viaja der→izq, 12s, medio */}
      <div className="faq-blob-2" style={{
        position: "absolute", top: "40%", left: 0,
        width: 760, height: 760,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(142,203,155,0.45) 0%, rgba(142,203,155,0.22) 50%, transparent 78%)",
        filter: "blur(130px)",
        pointerEvents: "none",
        willChange: "transform",
      }} />
      {/* Blob 3 — viaja izq→der offset, 15s, abajo */}
      <div className="faq-blob-3" style={{
        position: "absolute", top: "65%", left: 0,
        width: 580, height: 580,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(142,203,155,0.50) 0%, rgba(142,203,155,0.25) 48%, transparent 76%)",
        filter: "blur(120px)",
        pointerEvents: "none",
        willChange: "transform",
      }} />

      <div className="max-w-2xl mx-auto" style={{ position: "relative", zIndex: 1 }}>

        {/* Badge */}
        <div className="flex justify-center mb-6">
          <span
            className="inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-sans font-medium"
            style={{ color: "#000000", border: "1.5px solid #8ECB9B", background: "#8ECB9B" }}
          >
            <span style={{ fontWeight: 700, fontSize: "1.1em" }}>+</span> {t("faq.badge")}
          </span>
        </div>

        {/* Title */}
        <h2 className="text-center text-white mb-12" style={{ fontFamily: "inherit" }}>
          <span style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "1.16em", lineHeight: 1.6 }}>
            {t("faq.titleWord1")}{" "}
          </span>
          <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "1.6em", fontStyle: "italic", fontWeight: 400 }}>
            {t("faq.titleWord2")}
          </span>
        </h2>

        {/* Accordion */}
        <div className="divide-y divide-white/10">
          {faqItems.map((item, i) => (
            <div key={i}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between py-5 text-left gap-4 group"
              >
                <span className="font-sans text-sm md:text-base font-medium text-white group-hover:text-white/60 transition-colors">
                  {item.q}
                </span>
                <motion.span
                  className="shrink-0 flex items-center justify-center"
                  animate={{ rotate: open === i ? 180 : 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  style={{ color: "#8ECB9B", fontSize: "1.5rem", lineHeight: 1 }}
                >
                  <ChevronDown size={22} strokeWidth={2.2} />
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    key="answer"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    style={{ overflow: "hidden" }}
                  >
                    <p className="font-sans text-sm text-white/50 pb-5 leading-relaxed pr-12">
                      {item.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

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

// ─── App ─────────────────────────────────────────────────────────────────────

const LANGUAGES = [
  { code: "es", Flag: FlagAR, label: "ES" },
  { code: "en", Flag: FlagGB, label: "EN" },
  { code: "pt", Flag: FlagBR, label: "PT" },
] as const;

export default function App() {
  const { t, i18n } = useTranslation();
  const controlCards = t("control.cards", { returnObjects: true }) as { title: string; desc: string }[];
  const empresaLinks = t("footer.empresa.links", { returnObjects: true }) as string[];
  const soporteLinks = t("footer.soporte.links", { returnObjects: true }) as string[];

  const heroRef = useRef<HTMLElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const [navDark, setNavDark] = useState(true);
  const [mobileLangOpen, setMobileLangOpen] = useState(false);
  const activeLang = LANGUAGES.find(l => i18n.resolvedLanguage === l.code || i18n.language === l.code) ?? LANGUAGES[0];
  const ActiveFlag = activeLang.Flag;
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);

  useEffect(() => {
    const sections = document.querySelectorAll("[data-nav-theme]");
    if (!sections.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setNavDark(entry.target.getAttribute("data-nav-theme") === "dark");
          }
        });
      },
      { rootMargin: "-44px 0px -94% 0px", threshold: 0 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState("");

  function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    setSubscribed(true);
    setEmail("");
  }

  return (
    <div className="bg-black text-white font-serif">

      {/* ══════════════════════════════════════════
          HERO
      ══════════════════════════════════════════ */}
      <section data-nav-theme="dark" ref={heroRef} className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e]">

        {/* Gradient color overlay */}
        <div className="absolute inset-0 z-0 bg-gradient-to-tr from-purple-900/40 via-blue-900/20 to-pink-900/40 opacity-80 mix-blend-overlay" />

        {/* Video background */}
        <motion.div style={{ y: heroY }} className="absolute inset-0 z-0 opacity-45">
          <video autoPlay muted loop playsInline preload="metadata" className="w-full h-full object-cover">
            <source src="https://res.cloudinary.com/dd1rxqm7v/video/upload/v1775884810/VIDEO_PRINCIPAL_DEL_SITIO_upskrh.mp4" type="video/mp4" />
          </video>
        </motion.div>

        {/* Grain texture */}
        <div className="absolute inset-0 z-[1] pointer-events-none opacity-[0.035]"
          style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E\")", backgroundRepeat: "repeat", backgroundSize: "128px" }} />

        {/* ── NAV — centered floating pill ── */}
        <motion.nav
          ref={navRef as React.RefObject<HTMLElement>}
          initial={{ y: -80, x: "-50%", opacity: 0 }}
          animate={{ y: 0, x: "-50%", opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="fixed top-6 left-1/2 z-50 flex items-center gap-8 px-6 py-3 rounded-full backdrop-blur-2xl font-sans transition-all duration-300"
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

          {/* Título */}
          <motion.h1
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="text-[8.25rem] md:text-[15rem] lg:text-[19.5rem] leading-[1] tracking-tighter text-white drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)] mb-6"
          >
            {t("hero.titleLine1")}<br />
            <span style={{ color: "#8ECB9B" }}>{t("hero.titleLine2")}</span>
          </motion.h1>

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
          PILARES — phone arc carousel
      ══════════════════════════════════════════ */}
      <section id="funciones" data-nav-theme="light" className="relative w-full overflow-hidden select-none"
        style={{ background: "#EDE8E0" }}>
        {/* ── ARC CAROUSEL — ring rotates, 16 slots (8 imgs × 2), text fija en centro ── */}
        {/* Anillo: centro en (50%, 860px), radio 560px, gira 360° cada 120s        */}
        <style>{`
          @keyframes arc-spin {
            from { transform: rotate(0deg); }
            to   { transform: rotate(360deg); }
          }
          .arc-ring { animation: arc-spin 120s linear infinite; will-change: transform; }
        `}</style>

        <div style={{ position: "relative", height: "860px", overflow: "hidden" }}>

          {/* Anillo giratorio — punto de origen en el centro del círculo imaginario */}
          <div className="arc-ring" style={{
            position: "absolute",
            left: "50%",
            top: 960,
            width: 0,
            height: 0,
            transformOrigin: "0 0",
          }}>
            {Array.from({ length: 16 }).map((_, i) => {
              const angle = i * 22.5; // 0°, 22.5°, 45°, … 337.5°
              const srcs = [
                "https://res.cloudinary.com/dd1rxqm7v/image/upload/f_auto,q_auto,w_400/v1774853456/22_e9oykj.png",
                "https://res.cloudinary.com/dd1rxqm7v/image/upload/f_auto,q_auto,w_400/v1774853451/18_h6x3qc.png",
                "https://res.cloudinary.com/dd1rxqm7v/image/upload/f_auto,q_auto,w_400/v1774853451/19_ywr53m.png",
                "https://res.cloudinary.com/dd1rxqm7v/image/upload/f_auto,q_auto,w_400/v1774853451/21_n5grax.png",
                "https://res.cloudinary.com/dd1rxqm7v/image/upload/f_auto,q_auto,w_400/v1774853450/16_tf4mt6.png",
                "https://res.cloudinary.com/dd1rxqm7v/image/upload/f_auto,q_auto,w_400/v1774853450/14_zkjbyz.png",
                "https://res.cloudinary.com/dd1rxqm7v/image/upload/f_auto,q_auto,w_400/v1774853450/12_b48me7.png",
                "https://res.cloudinary.com/dd1rxqm7v/image/upload/f_auto,q_auto,w_400/v1774853446/4_nfdwki.png",
              ];
              return (
                /* Slot: posiciona el celular en el arco, su rotación también inclina el celular */
                <div key={i} style={{
                  position: "absolute",
                  left: 0, top: 0,
                  width: 0, height: 0,
                  transform: `rotate(${angle}deg) translateY(-650px)`,
                }}>
                  {/* Celular centrado en el slot */}
                  <div style={{
                    width: 210, height: 444,
                    marginLeft: -105, marginTop: -222,
                    borderRadius: 34,
                    background: "#000",
                    border: "7px solid #1c1c1e",
                    overflow: "hidden",
                    position: "relative",
                    boxShadow: "0 28px 64px rgba(0,0,0,0.5), 0 0 0 2px rgba(142,203,155,0.3)",
                  }}>
                    <div style={{
                      position: "absolute", top: 7, left: "50%",
                      transform: "translateX(-50%)",
                      width: 50, height: 10,
                      background: "#111", borderRadius: 5, zIndex: 10,
                    }} />
                    <img
                      src={srcs[i % 8]}
                      srcSet={cldSrcSet(srcs[i % 8], [400, 600, 800])}
                      sizes="210px"
                      alt={`Screen ${(i % 8) + 1}`}
                      loading="lazy"
                      style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Texto fijo — centro inferior del arco */}
          <div style={{
            position: "absolute",
            top: 560,
            left: "50%",
            transform: "translateX(-50%)",
            textAlign: "center",
            zIndex: 10,
            width: 340,
          }}>
            <div className="mb-4 flex justify-center">
              <span className="px-4 py-1.5 rounded-full border text-[10px] font-semibold tracking-[0.3em] uppercase font-sans"
                style={{ color: "#000", borderColor: "#8ECB9B", backgroundColor: "#8ECB9B" }}>
                {t("features.badge")}
              </span>
            </div>
            <h2
              className="text-black mb-3 tracking-tight"
              style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "clamp(0.62rem, 1.5vw, 0.9rem)", lineHeight: 1.9 }}
            >
              {t("features.title")}
            </h2>
            <p className="text-black/50 text-sm font-light font-sans leading-relaxed mb-5">
              {t("features.subtitle")}
            </p>
            <button
              className="px-7 py-3 rounded-full font-sans font-bold text-sm text-black tracking-wide hover:opacity-90 transition-opacity"
              style={{ backgroundColor: "#8ECB9B" }}
            >
              {t("features.cta")}
            </button>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SPLIT — phone mockup + content
      ══════════════════════════════════════════ */}
      <section data-nav-theme="dark" className="relative overflow-hidden" style={{ backgroundColor: "#000000" }}>
        <div className="grid md:grid-cols-2 min-h-[280px] items-stretch">

          {/* LEFT — phone mockup */}
          <div className="relative flex items-center justify-center overflow-hidden py-10 md:py-16 px-4 md:px-8"
            style={{ backgroundColor: "#000000", minHeight: "clamp(320px, 55vw, 640px)" }}>
            {/* Green decorative blobs */}
            <div className="absolute top-[10%] left-[5%] w-64 h-64 rounded-full blur-[90px] opacity-50 pointer-events-none"
              style={{ backgroundColor: "#8ECB9B" }} />
            <div className="absolute bottom-[15%] right-[10%] w-48 h-48 rounded-full blur-[70px] opacity-35 pointer-events-none"
              style={{ backgroundColor: "#8ECB9B" }} />

            {/* Video */}
            <video
              autoPlay muted loop playsInline preload="metadata"
              className="relative z-20 object-contain w-full h-auto"
              style={{
                maxWidth: "min(92%, 600px)",
                borderRadius: "24px",
                boxShadow: "0 30px 80px rgba(0,0,0,0.4), 0 0 60px rgba(142,203,155,0.15)",
              }}
            >
              <source src="https://res.cloudinary.com/dd1rxqm7v/video/upload/v1775883988/hf_20260411_045213_b78e7a30-694c-440f-9ad3-b8bb9dee3212_q3m4lz.mp4" type="video/mp4" />
            </video>

          </div>

          {/* RIGHT — content */}
          <div className="flex flex-col justify-center px-6 sm:px-10 md:px-12 lg:px-16 py-14 md:py-20">
            <motion.h2
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="font-serif text-3xl sm:text-4xl md:text-4xl lg:text-5xl leading-tight mb-5 md:mb-6 float-center text-white"
            >
              <span style={{ color: "#8ECB9B" }}>{t("control.titleHighlight")}</span> {t("control.titleRest")}<br />{t("control.titleLine2")}
            </motion.h2>

            <motion.a
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
              href="#funciones"
              className="inline-flex items-center gap-2 text-sm md:text-base font-semibold text-white font-sans mb-4 md:mb-5 group w-fit border-b-2 border-white/30 pb-0.5 hover:border-[#8ECB9B] hover:text-[#8ECB9B] transition-colors"
            >
              {t("control.learnMore")}
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </motion.a>

            <motion.p
              initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.15 }}
              className="text-white/70 text-sm font-sans leading-relaxed mb-8 md:mb-10 max-w-sm font-light"
            >
              {t("control.desc")}
            </motion.p>

            <div className="h-px bg-white/10 mb-6 md:mb-8" />

            {/* Four cards — responsive: 1 col mobile → 2 cols sm → 1 col md (section splits) → 2 cols lg */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-3 md:gap-4">
              {[
                { icon: "💸", ...controlCards[0] },
                { icon: "📊", ...controlCards[1] },
                { icon: "🤖", ...controlCards[2] },
                { icon: "🎯", ...controlCards[3] },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 + i * 0.08 }}
                  className="flex gap-3 items-start p-3.5 md:p-4 rounded-2xl"
                  style={{
                    border: "2px solid #8ECB9B",
                    boxShadow: "0 0 16px 2px rgba(142,203,155,0.18), 0 0 40px 4px rgba(142,203,155,0.08)"
                  }}
                >
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0 bg-gray-900">
                    {item.icon}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[13px] font-semibold font-sans mb-1 leading-snug" style={{ color: "#8ECB9B" }}>{item.title}</p>
                    <p className="text-[12px] text-white font-sans leading-relaxed font-light">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          STICKY SCROLL
      ══════════════════════════════════════════ */}
      <div><StickyScroll /></div>

      {/* ══════════════════════════════════════════
          PRICING
      ══════════════════════════════════════════ */}
      <div data-nav-theme="dark"><PricingSection /></div>

      {/* ══════════════════════════════════════════
          FAQ
      ══════════════════════════════════════════ */}
      <div data-nav-theme="dark"><FAQSection /></div>

      {/* ══════════════════════════════════════════
          CTA DESCARGA — con Samu
      ══════════════════════════════════════════ */}
      <section data-nav-theme="light" className="relative overflow-hidden"
        style={{ background: "#EDE8E0", paddingTop: "120px", paddingBottom: 0, minHeight: "600px" }}>

        {/* Texto central + botones — z-index alto para que nunca queden tapados */}
        <div className="relative max-w-2xl mx-auto text-center px-6" style={{ zIndex: 10 }}>
          <h2 className="font-serif font-bold text-black leading-tight mb-5"
            style={{ fontSize: "clamp(2.4rem, 5vw, 3.8rem)" }}>
            {t("ctaSection.titlePre")}<span style={{ color: "#8ECB9B" }}>{t("ctaSection.titleHighlight")}</span><br />{t("ctaSection.titlePost")}
          </h2>
          <p className="font-sans text-lg text-black/55 font-light mb-10 leading-relaxed">
            {t("ctaSection.downloadText")} <span style={{ color: "#8ECB9B" }}>{t("ctaSection.freeHighlight")}</span>.<br />
            {t("ctaSection.availableText")} <span style={{ color: "#8ECB9B" }}>App Store</span> {t("ctaSection.andText")} <span style={{ color: "#8ECB9B" }}>Google Play</span>.
          </p>

          {/* Botones de descarga */}
          <div className="flex items-center justify-center gap-4 flex-wrap">
            {/* App Store */}
            <a href="#newsletter" className="flex items-center gap-3 px-6 py-3.5 rounded-xl bg-black text-white hover:bg-neutral-800 transition-colors" aria-label={t("ctaSection.ariaAppStore")}>
              <svg viewBox="0 0 384 512" width="20" height="24" fill="white">
                <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/>
              </svg>
              <div className="text-left">
                <div className="text-[10px] font-sans tracking-wider text-white/60 leading-none mb-0.5">{t("ctaSection.downloadLabel")}</div>
                <div className="text-[19px] font-sans font-semibold leading-none">App Store</div>
              </div>
            </a>
            {/* Google Play */}
            <a href="#newsletter" className="flex items-center gap-3 px-6 py-3.5 rounded-xl bg-black text-white hover:bg-neutral-800 transition-colors" aria-label={t("ctaSection.ariaGooglePlay")}>
              <img
                src="https://res.cloudinary.com/dd1rxqm7v/image/upload/f_auto,q_auto,w_400/v1774869659/images_-_Editado_s2vkha.png"
                alt="Google Play"
                loading="lazy"
                width={30}
                height={30}
                style={{ width: 30, height: 30, objectFit: "contain" }}
              />
              <div className="text-left">
                <div className="text-[10px] font-sans tracking-wider text-white/60 leading-none mb-0.5">{t("ctaSection.availableLabel")}</div>
                <div className="text-[19px] font-sans font-semibold leading-none">Google Play</div>
              </div>
            </a>
          </div>
        </div>

        {/* Imagen de Samu — decoración inferior, asomándose desde abajo */}
        <div style={{ position: "relative", zIndex: 1, marginTop: "48px", display: "flex", justifyContent: "center" }}>
          <div style={{ position: "relative", width: "100%", maxWidth: "900px" }}>
            <img
              src="https://res.cloudinary.com/dd1rxqm7v/image/upload/f_auto,q_auto,w_400/v1774970827/hace_la_imagen_202603311226_lhcr4o.jpg"
              srcSet={cldSrcSet("https://res.cloudinary.com/dd1rxqm7v/image/upload/f_auto,q_auto,w_400/v1774970827/hace_la_imagen_202603311226_lhcr4o.jpg")}
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 600px, 900px"
              alt="Samu"
              loading="lazy"
              style={{ width: "100%", display: "block", objectFit: "cover" }}
            />
            {/* Gradientes que funden los bordes con el fondo de la sección */}
            <div style={{
              position: "absolute",
              inset: 0,
              background: `
                linear-gradient(to bottom, #EDE8E0 0%, transparent 18%, transparent 65%, #EDE8E0 100%),
                linear-gradient(to right,  #EDE8E0 0%, transparent 12%, transparent 88%, #EDE8E0 100%)
              `,
              pointerEvents: "none",
            }} />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          NEWSLETTER
      ══════════════════════════════════════════ */}
      <section data-nav-theme="dark" id="newsletter" className="bg-black py-28 px-6 text-center">
        <div className="max-w-sm mx-auto">

          {/* Samu + sobre */}
          <div className="flex justify-center mb-0">
            <img
              src="https://res.cloudinary.com/dd1rxqm7v/image/upload/f_auto,q_auto,w_400/v1774971662/unifica_estas_2_202603311230_twocyc.jpg"
              srcSet={cldSrcSet("https://res.cloudinary.com/dd1rxqm7v/image/upload/f_auto,q_auto,w_400/v1774971662/unifica_estas_2_202603311230_twocyc.jpg", [400, 600])}
              sizes="200px"
              alt="Samu con sobre de email"
              loading="lazy"
              style={{ height: 140, width: "auto", objectFit: "contain", display: "block", mixBlendMode: "screen" }}
            />
          </div>

          {/* Text */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-white mb-4"
          >
            {t("newsletter.title")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: 0.15 }}
            className="text-white/45 font-sans font-light text-sm leading-relaxed mb-8"
          >
            {t("newsletter.subtitle1")}<br />{t("newsletter.subtitle2")}
          </motion.p>

          {/* Form */}
          <motion.form
            initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: 0.2 }}
            onSubmit={handleSubscribe}
            className="flex flex-col gap-3"
          >
            <input
              type="email" required value={email} onChange={e => setEmail(e.target.value)}
              placeholder={t("newsletter.emailPlaceholder")}
              className="w-full px-5 py-3.5 rounded-full font-sans text-sm text-white placeholder-white/25
                         focus:outline-none transition-colors"
              style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)" }}
            />
            <motion.button
              whileHover={{ scale: 1.02, backgroundColor: "#222" }} whileTap={{ scale: 0.97 }}
              type="submit" disabled={subscribed}
              className="w-full py-3.5 rounded-full font-sans text-[11px] font-bold tracking-[0.15em] uppercase transition-colors"
              style={{ backgroundColor: "#8ECB9B", color: "#000" }}
            >
              {subscribed ? t("newsletter.subscribed") : t("newsletter.cta")}
            </motion.button>
          </motion.form>

        </div>
      </section>

      {/* ══════════════════════════════════════════
          FOOTER
      ══════════════════════════════════════════ */}
      <footer data-nav-theme="dark" className="bg-black text-white relative overflow-hidden">

        {/* Samu — personaje flotante, solo en desktop */}
        <motion.img
          src="https://res.cloudinary.com/dd1rxqm7v/image/upload/f_auto,q_auto,w_400/v1774834572/Dise%C3%B1o_sin_t%C3%ADtulo_12_jddcai.png"
          srcSet={cldSrcSet("https://res.cloudinary.com/dd1rxqm7v/image/upload/f_auto,q_auto,w_400/v1774834572/Dise%C3%B1o_sin_t%C3%ADtulo_12_jddcai.png", [400, 600])}
          sizes="200px"
          alt="Samu"
          animate={{ y: [0, -12, 0] }}
          transition={{ repeat: Infinity, duration: 3.2, ease: "easeInOut" }}
          className="hidden md:block"
          style={{
            position: "absolute",
            top: "15%",
            left: "80px",
            transform: "translateY(-15%)",
            height: "190px",
            width: "auto",
            objectFit: "contain",
            pointerEvents: "none",
            zIndex: 10,
          }}
        />

        {/* Main footer columns */}
        <div className="px-6 md:px-16 py-14 max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10">

          {/* Col 1 — Brand */}
          <div className="col-span-2 md:col-span-1">
            <span className="font-serif text-lg font-semibold" style={{ color: "#8ECB9B" }}>Vida Ordenada</span>
            <p className="mt-3 text-white/50 text-sm font-sans leading-relaxed">
              {t("footer.tagline")}
            </p>
            {/* Social icons */}
            <div className="flex gap-4 mt-5">
              {/* Instagram */}
              <a href="https://instagram.com/vidaordenada" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="transition-colors" style={{ color: "rgba(255,255,255,0.4)" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#8ECB9B")}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.4)")}>
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              {/* LinkedIn */}
              <a href="https://linkedin.com/company/vidaordenada" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="transition-colors" style={{ color: "rgba(255,255,255,0.4)" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#8ECB9B")}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.4)")}>
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              {/* TikTok */}
              <a href="https://tiktok.com/@vidaordenada" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="transition-colors" style={{ color: "rgba(255,255,255,0.4)" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#8ECB9B")}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.4)")}>
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.79 1.52V6.73a4.85 4.85 0 01-1.02-.04z"/>
                </svg>
              </a>
              {/* YouTube */}
              <a href="https://youtube.com/@vidaordenada" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="transition-colors" style={{ color: "rgba(255,255,255,0.4)" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#8ECB9B")}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.4)")}>
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Col 2 — Empresa */}
          <div>
            <h4 className="font-sans font-semibold text-white text-sm tracking-widest uppercase mb-5">{t("footer.empresa.title")}</h4>
            <ul className="space-y-3">
              {[
                { label: empresaLinks[0], href: "#newsletter" },
                { label: empresaLinks[1], href: "#newsletter" },
                { label: empresaLinks[2], href: "#newsletter" },
                { label: empresaLinks[3], href: "#newsletter" },
              ].map(({ label, href }) => (
                <li key={label}>
                  <a href={href} className="font-sans text-sm text-white/50 hover:text-white transition-colors">{label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Soporte */}
          <div>
            <h4 className="font-sans font-semibold text-white text-sm tracking-widest uppercase mb-5">{t("footer.soporte.title")}</h4>
            <ul className="space-y-3">
              {[
                { label: soporteLinks[0], href: "mailto:hola@vidaordenada.com" },
                { label: soporteLinks[1], href: "mailto:hola@vidaordenada.com" },
                { label: soporteLinks[2], href: "mailto:hola@vidaordenada.com?subject=Feedback" },
                { label: soporteLinks[3], href: "#faq" },
              ].map(({ label, href }) => (
                <li key={label}>
                  <a href={href} className="font-sans text-sm text-white/50 hover:text-white transition-colors">{label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Contacto */}
          <div className="col-span-1">
            <h4 className="font-sans font-semibold text-white text-sm tracking-widest uppercase mb-5">{t("footer.contacto.title")}</h4>
            <ul className="space-y-3">
              <li>
                <a href="mailto:hola@vidaordenada.com" className="font-sans text-sm text-white/50 hover:text-white transition-colors">
                  hola@vidaordenada.com
                </a>
              </li>
              {[
                { label: "Instagram", href: "https://instagram.com/vidaordenada" },
                { label: "LinkedIn", href: "https://linkedin.com/company/vidaordenada" },
                { label: "TikTok", href: "https://tiktok.com/@vidaordenada" },
                { label: "YouTube", href: "https://youtube.com/@vidaordenada" },
              ].map(({ label, href }) => (
                <li key={label}>
                  <a href={href} target="_blank" rel="noopener noreferrer" className="font-sans text-sm text-white/50 hover:text-white transition-colors">{label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Samu — solo mobile, columna derecha de la fila de Contacto */}
          <div className="sm:hidden flex items-end justify-center col-span-1">
            <motion.img
              src="https://res.cloudinary.com/dd1rxqm7v/image/upload/f_auto,q_auto,w_400/v1774834572/Dise%C3%B1o_sin_t%C3%ADtulo_12_jddcai.png"
              srcSet={cldSrcSet("https://res.cloudinary.com/dd1rxqm7v/image/upload/f_auto,q_auto,w_400/v1774834572/Dise%C3%B1o_sin_t%C3%ADtulo_12_jddcai.png", [400, 600])}
              sizes="160px"
              alt="Samu"
              animate={{ y: [0, -16, 0] }}
              transition={{ repeat: Infinity, duration: 3.2, ease: "easeInOut" }}
              style={{ height: "140px", width: "auto", objectFit: "contain" }}
            />
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 px-6 md:px-16 py-5 max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-sans text-xs text-white/30">
            {t("footer.copyright")}
          </p>
          <div className="flex items-center gap-5 flex-wrap justify-center">
            {/* Payment icons */}
            <div className="flex items-center gap-2">

              {/* Visa */}
              <div className="flex items-center justify-center rounded-md px-2.5 py-1.5" style={{ backgroundColor: "#fff", minWidth: 52, height: 32 }}>
                <svg viewBox="0 0 80 26" height="14" fill="none">
                  <path d="M30.5 1.8L19.8 24.2h-6.9L7.6 7c-.3-1-.6-1.4-1.6-1.9C4.3 4.3 2.1 3.5 0 3l.2-1.2h11c1.4 0 2.7 1 3 2.5l2.8 14.6L23.6 1.8h6.9zM56 16.7c0-6.7-9.3-7.1-9.2-10.1 0-.9.9-1.9 2.8-2.1 1-.1 3.6-.2 6.6 1.2l1.2-5.4A18 18 0 0051.3 0c-6.5 0-11 3.4-11.1 8.4-.1 3.6 3.2 5.7 5.7 6.9 2.5 1.2 3.3 2 3.3 3.1 0 1.7-2 2.4-3.8 2.5-3.2.1-5-.9-6.5-1.6l-1.1 5.3c1.5.7 4.2 1.3 7 1.3 6.6 0 11-3.3 11-8.2zm16.4 7.5H79L73.6 1.8h-5.9c-1.3 0-2.4.8-2.9 1.9L55.6 24.2h6.6l1.3-3.6h8.1l.8 3.6zm-7-8.6l3.3-9.2 1.9 9.2h-5.2zM38.7 1.8L33.2 24.2h-6.3L32.4 1.8h6.3z" fill="#1A1F71"/>
                </svg>
              </div>

              {/* Mastercard */}
              <div className="flex items-center justify-center rounded-md px-2 py-1.5" style={{ backgroundColor: "#fff", minWidth: 52, height: 32 }}>
                <svg viewBox="0 0 38 24" width="38" height="24" fill="none">
                  <circle cx="14" cy="12" r="10" fill="#EB001B"/>
                  <circle cx="24" cy="12" r="10" fill="#F79E1B"/>
                  <path d="M19 4.8a10 10 0 010 14.4A10 10 0 0119 4.8z" fill="#FF5F00"/>
                </svg>
              </div>

              {/* Google Pay */}
              <div className="flex items-center justify-center rounded-md px-2.5 py-1.5" style={{ backgroundColor: "#fff", minWidth: 64, height: 32 }}>
                <svg viewBox="0 0 80 32" height="18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* G */}
                  <text fontFamily="'Product Sans', Arial, sans-serif" fontWeight="500" fontSize="18">
                    <tspan x="0"  y="22" fill="#4285F4">G</tspan>
                    <tspan fill="#EA4335">o</tspan>
                    <tspan fill="#4285F4">o</tspan>
                    <tspan fill="#34A853">g</tspan>
                    <tspan fill="#EA4335">l</tspan>
                    <tspan fill="#FBBC05">e</tspan>
                  </text>
                  <text x="56" y="22" fontFamily="'Product Sans', Arial, sans-serif" fontWeight="500" fontSize="18" fill="#5f6368"> Pay</text>
                </svg>
              </div>

              {/* Apple Pay */}
              <div className="flex items-center justify-center rounded-md px-2.5 py-1.5" style={{ backgroundColor: "#fff", minWidth: 52, height: 32 }}>
                <svg viewBox="0 0 50 20" height="16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8.5 3.5c.7-.9 1.2-2.1 1-3.3-1 .1-2.3.7-3 1.6-.7.8-1.2 2-1 3.1 1.1.1 2.3-.5 3-1.4z" fill="#000"/>
                  <path d="M9.5 5.2c-1.7-.1-3.1 1-3.9 1s-2-.9-3.3-.9C.7 5.4-.5 6.4-.5 8.5c0 3.1 2.7 7.5 4.1 7.5.6 0 1.3-.5 2.1-.5s1.4.5 2.2.5c1.4 0 3.9-4.3 3.9-7.5 0-2.2-1.5-3.3-2.3-3.3z" fill="#000"/>
                  <text x="18" y="15" fontFamily="'-apple-system', 'Helvetica Neue', sans-serif" fontWeight="600" fontSize="13" fill="#000">Pay</text>
                </svg>
              </div>

            </div>
            {/* Legal links */}
            <div className="flex items-center gap-4">
              <Link to="/privacy" className="font-sans text-xs text-white/30 hover:text-white/60 transition-colors">
                {t("footer.privacy")}
              </Link>
              {[
                { label: t("footer.terms"), href: "mailto:hola@vidaordenada.com?subject=Términos de uso" },
                { label: t("footer.legal"), href: "mailto:hola@vidaordenada.com?subject=Legal" },
              ].map(({ label, href }) => (
                <a key={label} href={href} className="font-sans text-xs text-white/30 hover:text-white/60 transition-colors">
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>

      </footer>

    </div>
  );
}
