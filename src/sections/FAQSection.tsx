import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ChevronDown } from "lucide-react";

export default function FAQSection() {
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
