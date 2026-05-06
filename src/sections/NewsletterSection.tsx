import type { FormEvent } from "react";
import { motion } from "motion/react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { cldSrcSet } from "../lib/cloudinary";

export default function NewsletterSection() {
  const { t } = useTranslation();
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState("");

  function handleSubscribe(e: FormEvent) {
    e.preventDefault();
    setSubscribed(true);
    setEmail("");
  }

  return (
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
            width={1080}
            height={1080}
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
  );
}
