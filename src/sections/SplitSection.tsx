import { motion } from "motion/react";
import { useTranslation } from "react-i18next";
import { ArrowRight } from "lucide-react";

export default function SplitSection() {
  const { t } = useTranslation();
  const controlCards = t("control.cards", { returnObjects: true }) as { title: string; desc: string }[];

  return (
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
  );
}
