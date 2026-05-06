import { useTranslation } from "react-i18next";
import { cldSrcSet } from "../lib/cloudinary";

export default function CtaDownloadSection() {
  const { t } = useTranslation();

  return (
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
            sizes="(max-width: 768px) 400px, (max-width: 1024px) 600px, 800px"
            alt="Samu"
            loading="lazy"
            width={1200}
            height={800}
            style={{ width: "100%", height: "auto", display: "block", objectFit: "cover" }}
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
  );
}
