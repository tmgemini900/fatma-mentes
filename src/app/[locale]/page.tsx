import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import HeroSection from "@/components/HeroSection";
import SplashScreen from "@/components/SplashScreen";
import type { Eser } from "@/types/eser";
import eserlerData from "@/data/eserler.json";

const vitrinEserler = (eserlerData as Eser[]).filter(e => e.vitrin).slice(0, 5);

function OrnamentCizgi() {
  return (
    <svg width="200" height="14" viewBox="0 0 200 14" fill="none" aria-hidden="true">
      <line x1="0" y1="7" x2="76" y2="7" stroke="#C9A84C" strokeWidth="0.6" strokeOpacity="0.5" />
      <circle cx="100" cy="7" r="4.5" stroke="#C9A84C" strokeWidth="0.7" strokeOpacity="0.85" fill="none" />
      <circle cx="100" cy="7" r="1.6" fill="#C9A84C" fillOpacity="0.65" />
      <line x1="124" y1="7" x2="200" y2="7" stroke="#C9A84C" strokeWidth="0.6" strokeOpacity="0.5" />
    </svg>
  );
}

export default function AnaSayfa() {
  const t = useTranslations("anasayfa");

  return (
    <>
      <SplashScreen />
      <HeroSection />

      {/* ══ VİTRİN ESERLER ══ */}
      <section style={{ backgroundColor: "#F5ECD7", padding: "6rem clamp(1rem, 4vw, 2rem)" }} aria-labelledby="vitrin-baslik">
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.6rem", letterSpacing: "0.28em", textTransform: "uppercase", color: "rgba(92,58,30,0.45)", marginBottom: "0.75rem" }}>
              {t("seckilar")}
            </p>
            <h2 id="vitrin-baslik" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 300, letterSpacing: "0.05em", color: "#5C3A1E", marginBottom: "1rem" }}>
              {t("oneCikan")}
            </h2>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <OrnamentCizgi />
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(240px, 100%), 1fr))", gap: "1.5rem", marginBottom: "3rem" }}>
            {vitrinEserler.map((eser) => (
              <Link key={eser.slug} href={`/eserler/${eser.slug}`} style={{ textDecoration: "none", color: "inherit" }}>
                <article style={{ border: "1px solid rgba(201,168,76,0.18)", backgroundColor: "rgba(255,255,255,0.55)", overflow: "hidden", cursor: "pointer" }}>
                  <div style={{ width: "100%", aspectRatio: "4/3", backgroundColor: "rgba(92,58,30,0.07)", display: "flex", alignItems: "center", justifyContent: "center" }} aria-hidden="true">
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                      <rect x="3" y="6" width="34" height="28" rx="1.5" stroke="#C9A84C" strokeWidth="0.7" strokeOpacity="0.35" fill="none" />
                      <circle cx="13" cy="16" r="3.5" stroke="#C9A84C" strokeWidth="0.7" strokeOpacity="0.35" fill="none" />
                      <path d="M3 28 L12 19 L19 26 L26 19 L37 30" stroke="#C9A84C" strokeWidth="0.7" strokeOpacity="0.35" fill="none" />
                    </svg>
                  </div>
                  <div style={{ padding: "1.25rem" }}>
                    <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem", fontWeight: 300, letterSpacing: "0.03em", color: "#5C3A1E", marginBottom: "0.4rem", lineHeight: 1.3 }}>
                      {eser.isim}
                    </h3>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.7rem", color: "rgba(92,58,30,0.5)", lineHeight: 1.55, marginBottom: "1rem" }}>
                      {eser.hikaye.slice(0, 80)}…
                    </p>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem", color: "#C9A84C", fontWeight: 300 }}>
                        {eser.fiyat.toLocaleString("tr-TR")} ₺
                      </span>
                      <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.55rem", letterSpacing: "0.14em", textTransform: "uppercase", color: eser.musait ? "rgba(92,58,30,0.4)" : "rgba(180,60,60,0.6)" }}>
                        {eser.musait ? t("musait") : t("emanette")}
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>

          <div style={{ textAlign: "center" }}>
            <Link href="/eserler" style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem", fontFamily: "'DM Sans', sans-serif", fontSize: "0.65rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "#5C3A1E", textDecoration: "none", borderBottom: "1px solid rgba(92,58,30,0.3)", paddingBottom: "3px" }}>
              {t("tumEserler")}
              <svg width="14" height="8" viewBox="0 0 14 8" fill="none" aria-hidden="true"><path d="M1 4h12M9 1l4 3-4 3" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ══ ATÖLYE TANITIM ══ */}
      <section style={{ backgroundColor: "#1A0F0A", padding: "6rem clamp(1rem, 4vw, 2rem)", textAlign: "center" }}>
        <div style={{ maxWidth: "700px", margin: "0 auto" }}>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.2rem, 3vw, 1.9rem)", fontWeight: 300, fontStyle: "italic", color: "rgba(245,236,215,0.55)", lineHeight: 1.65, letterSpacing: "0.04em", marginBottom: "2.5rem" }}>
            &quot;{t("atolyeDavet")}&quot;
          </p>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "2.5rem" }}>
            <svg width="200" height="14" viewBox="0 0 200 14" fill="none" aria-hidden="true">
              <line x1="0" y1="7" x2="76" y2="7" stroke="rgba(201,168,76,0.3)" strokeWidth="0.6" />
              <circle cx="100" cy="7" r="4.5" stroke="#C9A84C" strokeWidth="0.7" strokeOpacity="0.6" fill="none" />
              <circle cx="100" cy="7" r="1.6" fill="#C9A84C" fillOpacity="0.4" />
              <line x1="124" y1="7" x2="200" y2="7" stroke="rgba(201,168,76,0.3)" strokeWidth="0.6" />
            </svg>
          </div>
          <Link href="/atolye" style={{ display: "inline-block", padding: "0.9rem 2.5rem", border: "1px solid rgba(201,168,76,0.4)", fontFamily: "'DM Sans', sans-serif", fontSize: "0.65rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "#C9A84C", textDecoration: "none" }}>
            {t("atolyeProgram")}
          </Link>
        </div>
      </section>
    </>
  );
}
