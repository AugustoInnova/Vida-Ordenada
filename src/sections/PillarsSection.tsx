import { useTranslation } from "react-i18next";
import { cldSrcSet } from "../lib/cloudinary";

const arcSrcs = [
  "https://res.cloudinary.com/dd1rxqm7v/image/upload/f_auto,q_auto,w_400/v1774853456/22_e9oykj.png",
  "https://res.cloudinary.com/dd1rxqm7v/image/upload/f_auto,q_auto,w_400/v1774853451/18_h6x3qc.png",
  "https://res.cloudinary.com/dd1rxqm7v/image/upload/f_auto,q_auto,w_400/v1774853451/19_ywr53m.png",
  "https://res.cloudinary.com/dd1rxqm7v/image/upload/f_auto,q_auto,w_400/v1774853451/21_n5grax.png",
  "https://res.cloudinary.com/dd1rxqm7v/image/upload/f_auto,q_auto,w_400/v1774853450/16_tf4mt6.png",
  "https://res.cloudinary.com/dd1rxqm7v/image/upload/f_auto,q_auto,w_400/v1774853450/14_zkjbyz.png",
  "https://res.cloudinary.com/dd1rxqm7v/image/upload/f_auto,q_auto,w_400/v1774853450/12_b48me7.png",
  "https://res.cloudinary.com/dd1rxqm7v/image/upload/f_auto,q_auto,w_400/v1774853446/4_nfdwki.png",
];

export default function PillarsSection() {
  const { t } = useTranslation();

  return (
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
            const angle = i * 22.5;
            const src = arcSrcs[i % 8];
            return (
              <div key={i} style={{
                position: "absolute",
                left: 0, top: 0,
                width: 0, height: 0,
                transform: `rotate(${angle}deg) translateY(-650px)`,
              }}>
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
                    src={src}
                    srcSet={cldSrcSet(src, [400, 600, 800])}
                    sizes="210px"
                    alt={`Screen ${(i % 8) + 1}`}
                    loading="lazy"
                    width={1080}
                    height={2400}
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
  );
}
