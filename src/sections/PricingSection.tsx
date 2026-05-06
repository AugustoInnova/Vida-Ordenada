import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function PricingSection() {
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
      <video
        autoPlay muted loop playsInline preload="none"
        poster="https://res.cloudinary.com/dd1rxqm7v/video/upload/f_auto,q_auto,w_1200/v1775885790/seccion_de_compra_lalkxn.jpg"
        className="hidden md:block absolute inset-0 w-full h-full object-cover"
      >
        <source src="https://res.cloudinary.com/dd1rxqm7v/video/upload/f_auto,q_auto,vc_auto/v1775885790/seccion_de_compra_lalkxn.mp4" type="video/mp4" />
      </video>
      {/* Mobile video (< md) — portrait crop via Cloudinary for sharper rendering on tall mobile viewport */}
      <video
        autoPlay muted loop playsInline preload="none"
        poster="https://res.cloudinary.com/dd1rxqm7v/video/upload/f_auto,q_auto,c_fill,g_center,ar_9:16,w_720/v1774768412/Character_swimming_looped_202603290413_rtuw11.jpg"
        className="block md:hidden absolute inset-0 w-full h-full object-cover object-center"
      >
        <source src="https://res.cloudinary.com/dd1rxqm7v/video/upload/q_auto:best,f_auto,vc_auto,c_fill,g_center,ar_9:16,w_720/v1774768412/Character_swimming_looped_202603290413_rtuw11.mp4" type="video/mp4" />
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
