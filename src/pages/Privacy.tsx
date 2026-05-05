import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import privacyHtml from "@/politica_termly.html?raw";

const LANGUAGES = [
  { code: "es", label: "ES" },
  { code: "en", label: "EN" },
  { code: "pt", label: "PT" },
] as const;

export default function Privacy() {
  const { t, i18n } = useTranslation();
  const empresaLinks = t("footer.empresa.links", { returnObjects: true }) as string[];
  const soporteLinks = t("footer.soporte.links", { returnObjects: true }) as string[];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <header className="bg-black text-white">
        <div className="max-w-5xl mx-auto px-6 md:px-12 py-5 flex items-center justify-between">
          <Link
            to="/"
            className="font-serif text-xl font-semibold transition-opacity hover:opacity-80"
            style={{ color: "#8ECB9B" }}
          >
            Vida Ordenada
          </Link>
          <div className="flex items-center gap-4 md:gap-6">
            <Link
              to="/"
              className="hidden sm:inline-flex items-center gap-2 font-sans text-sm text-white/70 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              {t("privacy.back")}
            </Link>
            <div className="flex items-center font-sans text-xs">
              {LANGUAGES.map(({ code, label }, idx) => {
                const active = i18n.resolvedLanguage === code || i18n.language === code;
                return (
                  <span key={code} className="flex items-center">
                    {idx > 0 && <span className="text-white/20 mx-1">/</span>}
                    <button
                      type="button"
                      onClick={() => i18n.changeLanguage(code)}
                      aria-label={label}
                      className="px-1.5 py-1 transition-colors tracking-wider"
                      style={{
                        color: active ? "#8ECB9B" : "rgba(255,255,255,0.5)",
                        fontWeight: active ? 600 : 400,
                      }}
                    >
                      {label}
                    </button>
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </header>

      {/* Title band */}
      <section className="bg-black text-white px-6 pt-2 pb-14 md:pb-20">
        <div className="max-w-3xl mx-auto text-center">
          <p
            className="text-[10px] font-sans font-semibold tracking-[0.25em] uppercase mb-4"
            style={{ color: "#8ECB9B" }}
          >
            {t("privacy.kicker")}
          </p>
          <h1
            className="!font-serif !text-3xl md:!text-5xl font-semibold text-white !leading-tight"
            style={{ letterSpacing: "-0.01em" }}
          >
            {t("privacy.title")}
          </h1>
        </div>
      </section>

      {/* Mobile back link */}
      <div className="sm:hidden bg-black border-t border-white/10 px-6 py-3">
        <Link
          to="/"
          className="inline-flex items-center gap-2 font-sans text-sm text-white/70"
        >
          <ArrowLeft className="w-4 h-4" />
          {t("privacy.back")}
        </Link>
      </div>

      {/* Policy content */}
      <main className="flex-1 bg-white">
        <div
          className="max-w-3xl mx-auto px-6 md:px-10 py-12 md:py-16 font-sans text-[15px] leading-relaxed text-charcoal break-words"
          dangerouslySetInnerHTML={{ __html: privacyHtml }}
        />
      </main>

      {/* Footer */}
      <footer className="bg-black text-white">
        <div className="max-w-5xl mx-auto px-6 md:px-16 py-12 grid grid-cols-2 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <span className="font-serif text-lg font-semibold" style={{ color: "#8ECB9B" }}>
              Vida Ordenada
            </span>
            <p className="mt-3 text-white/50 text-sm font-sans leading-relaxed">
              {t("footer.tagline")}
            </p>
          </div>

          {/* Empresa */}
          <div>
            <h4 className="font-sans font-semibold text-white text-sm tracking-widest uppercase mb-5">
              {t("footer.empresa.title")}
            </h4>
            <ul className="space-y-3">
              {empresaLinks.map((label) => (
                <li key={label}>
                  <a
                    href="/#newsletter"
                    className="font-sans text-sm text-white/50 hover:text-white transition-colors"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Soporte */}
          <div>
            <h4 className="font-sans font-semibold text-white text-sm tracking-widest uppercase mb-5">
              {t("footer.soporte.title")}
            </h4>
            <ul className="space-y-3">
              {soporteLinks.map((label) => (
                <li key={label}>
                  <a
                    href="mailto:hola@vidaordenada.com"
                    className="font-sans text-sm text-white/50 hover:text-white transition-colors"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="font-sans font-semibold text-white text-sm tracking-widest uppercase mb-5">
              {t("footer.contacto.title")}
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:hola@vidaordenada.com"
                  className="font-sans text-sm text-white/50 hover:text-white transition-colors"
                >
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
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-sans text-sm text-white/50 hover:text-white transition-colors"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 px-6 md:px-16 py-5 max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-sans text-xs text-white/30">{t("footer.copyright")}</p>
          <div className="flex items-center gap-4 flex-wrap justify-center">
            <Link
              to="/privacy"
              className="font-sans text-xs text-white/30 hover:text-white/60 transition-colors"
            >
              {t("footer.privacy")}
            </Link>
            <a
              href="mailto:hola@vidaordenada.com?subject=Términos de uso"
              className="font-sans text-xs text-white/30 hover:text-white/60 transition-colors"
            >
              {t("footer.terms")}
            </a>
            <a
              href="mailto:hola@vidaordenada.com?subject=Legal"
              className="font-sans text-xs text-white/30 hover:text-white/60 transition-colors"
            >
              {t("footer.legal")}
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
