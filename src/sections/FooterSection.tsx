import { motion } from "motion/react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { cldSrcSet } from "../lib/cloudinary";

const SAMU_FOOTER_URL = "https://res.cloudinary.com/dd1rxqm7v/image/upload/f_auto,q_auto,w_400/v1774834572/Dise%C3%B1o_sin_t%C3%ADtulo_12_jddcai.png";

export default function FooterSection() {
  const { t } = useTranslation();
  const empresaLinks = t("footer.empresa.links", { returnObjects: true }) as string[];
  const soporteLinks = t("footer.soporte.links", { returnObjects: true }) as string[];

  return (
    <footer data-nav-theme="dark" className="bg-black text-white relative overflow-hidden">

      {/* Samu — personaje flotante, solo en desktop */}
      <motion.img
        src={SAMU_FOOTER_URL}
        srcSet={cldSrcSet(SAMU_FOOTER_URL, [400, 600])}
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
            src={SAMU_FOOTER_URL}
            srcSet={cldSrcSet(SAMU_FOOTER_URL, [400, 600])}
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
  );
}
