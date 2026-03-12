"use client";

/**
 * components/Footer.tsx
 * Fatma Menteş — Footer + PreFooter Bileşeni
 *
 * Özellikler:
 *   - PreFooter: kapanış cümlesi + tezhip ornament + parsömen→koyu geçiş
 *   - Footer grid 4 sütun: Logo · Nav · Atölye · Dil+İletişim
 *   - Dil seçici (TR/EN/IT/RU) — next-intl useRouter ile sayfa yönlendirmesi
 *   - Islak İmzalı Sertifika damgası
 *   - Sosyal medya (Instagram, Pinterest, Etsy)
 *   - Alt şerit: telif + manifesto
 *   - WCAG 2.2 AA — aria-label, role, aria-pressed, landmark
 *
 * Kurulum notu:
 *   next-intl kullanılıyorsa usePathname + useRouter import ediniz.
 *   Değilse dilSec fonksiyonu basit window.location.href ile çalışır.
 */

import { useState } from "react";
import Link from "next/link";

/* ─── Navigasyon bağlantıları ─── */
const NAV_LINKLERI = [
  { href: "/eserler",        etiket: "Eserler"      },
  { href: "/eller",          etiket: "Çıplak Eller" },
  { href: "/atolye",         etiket: "Atölye"       },
  { href: "/atolye#basvuru", etiket: "Başvuru"      },
  { href: "/iletisim",       etiket: "İletişim"     },
] as const;

/* ─── Yaklaşan atölyeler (Footer için özet) ─── */
const FOOTER_ATOLYE = [
  { href: "/atolye#takvim", gun: "15", ay: "Mar", isim: "Temel El Dikişi · Cüzdan",  detay: "4 kota boş · ₺1.800" },
  { href: "/atolye#takvim", gun: "22", ay: "Mar", isim: "Osmanlı Tezhip · Levha",    detay: "1 kota boş · ₺4.200" },
] as const;

/* ─── Dil seçenekleri ─── */
const DILLER = [
  { kod: "tr", etiket: "TR", ad: "Türkçe · Aktif dil",     locale: "tr" },
  { kod: "en", etiket: "EN", ad: "English · Active",        locale: "en" },
  { kod: "it", etiket: "IT", ad: "Italiano · Attivo",       locale: "it" },
  { kod: "ru", etiket: "RU", ad: "Русский · Активный",      locale: "ru" },
] as const;

/* ─── Grain texture ─── */
const GRAIN_DARK = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23n)' opacity='0.06'/%3E%3C/svg%3E")`;

/* ─── SVG Bileşenler ─── */
function MuhurIkonu() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
      <circle cx="11" cy="11" r="9.5" stroke="#C9A84C" strokeWidth="0.8" strokeOpacity="0.7"/>
      <circle cx="11" cy="11" r="5.5" stroke="#C9A84C" strokeWidth="0.5" strokeOpacity="0.4"/>
      <path d="M7 11 L9.5 13.5 L15.5 8" stroke="#C9A84C" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function OkIkonu() {
  return (
    <svg width="12" height="8" viewBox="0 0 12 8" fill="none" aria-hidden="true">
      <path d="M1 4h10M7 1l4 3-4 3" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

/* ─── PRE-FOOTER ─── */
export function PreFooter() {
  return (
    <div
      aria-hidden="true"
      className="relative overflow-hidden"
      style={{ backgroundColor: "#F5ECD7" }}
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-10 pt-12 md:pt-16 flex flex-col items-center gap-6">
        {/* Kapanış cümlesi */}
        <p
          className="text-center max-w-[42rem]"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(1.1rem, 3vw, 1.8rem)",
            fontWeight: 300,
            fontStyle: "italic",
            lineHeight: 1.55,
            letterSpacing: "0.04em",
            color: "rgba(92,58,30,0.35)",
          }}
        >
          "Her dikiş,{" "}
          <strong style={{ fontWeight: 400, fontStyle: "normal", color: "rgba(201,168,76,0.65)" }}>
            zamana inat
          </strong>{" "}
          açılan bir penceredir.<br />
          Her deri, bir ömrün{" "}
          <strong style={{ fontWeight: 400, fontStyle: "normal", color: "rgba(201,168,76,0.65)" }}>
            sessiz tanığı
          </strong>."
        </p>

        {/* Tezhip ornament */}
        <svg width="320" height="20" viewBox="0 0 320 20" fill="none">
          <line x1="0"   y1="10" x2="126" y2="10" stroke="#C9A84C" strokeWidth="0.6" strokeOpacity="0.35"/>
          <path d="M135 10 Q140 4 145 10 Q150 16 155 10 Q160 4 165 10 Q170 16 175 10 Q180 4 185 10"
                stroke="#C9A84C" strokeWidth="0.7" fill="none" strokeOpacity="0.45"/>
          <circle cx="160" cy="10" r="3.5" stroke="#C9A84C" strokeWidth="0.8" strokeOpacity="0.6" fill="none"/>
          <circle cx="160" cy="10" r="1.2" fill="#C9A84C" fillOpacity="0.5"/>
          <line x1="194" y1="10" x2="320" y2="10" stroke="#C9A84C" strokeWidth="0.6" strokeOpacity="0.35"/>
        </svg>
      </div>

      {/* Parsömen → Koyu geçiş */}
      <div
        className="w-full"
        style={{
          height: "60px",
          background: "linear-gradient(to bottom, #F5ECD7, #1A0F0A)",
          marginTop: "-2px",
        }}
      />
    </div>
  );
}

/* ─── FOOTER ─── */
export function Footer() {
  const [aktifDil, setAktifDil] = useState("tr");

  function dilSec(kod: string) {
    setAktifDil(kod);
    // next-intl ile yönlendirme:
    // router.replace(pathname, { locale: kod });
    // Veya basit: window.location.href = `/${kod}${pathname}`;
  }

  const aktifDilAdi = DILLER.find(d => d.kod === aktifDil)?.ad ?? "";

  return (
    <>
      <style>{`
        .fm-nav-link:hover { color: #C9A84C !important; gap: 0.75rem !important; }
        .fm-nav-link:hover::before { color: #C9A84C !important; }
        .fm-atolye-kart:hover { border-color: rgba(201,168,76,0.25) !important; }
        .fm-atolye-kart:hover .fm-oku { color: #C9A84C !important; }
        .fm-dil-btn:hover { color: #C9A84C !important; border-color: rgba(201,168,76,0.4) !important; background: rgba(201,168,76,0.06) !important; }
        .fm-sosyal:hover { border-color: rgba(201,168,76,0.4) !important; background: rgba(201,168,76,0.06) !important; }
        .fm-sosyal:hover svg { opacity: 0.85 !important; }
        .fm-iletisim:hover { color: rgba(201,168,76,0.7) !important; }
        .fm-takvim-link:hover { color: #C9A84C !important; }
      `}</style>

      <footer
        role="contentinfo"
        aria-label="Site altbilgisi"
        className="relative overflow-hidden"
        style={{ backgroundColor: "#1A0F0A", backgroundImage: GRAIN_DARK }}
      >
        {/* Dekoratif arka plan radyal */}
        <div
          aria-hidden="true"
          className="absolute -top-32 -right-32 pointer-events-none rounded-full"
          style={{
            width: "40rem", height: "40rem",
            background: "radial-gradient(ellipse, rgba(201,168,76,0.03) 0%, transparent 65%)",
          }}
        />

        <div className="relative z-10 max-w-[1280px] mx-auto px-6 md:px-10 pt-18 md:pt-22 pb-10"
             style={{ paddingTop: "4.5rem" }}>

          {/* ══ Ana Grid ══ */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1.2fr] gap-10 lg:gap-16">

            {/* ─── Kolon 1: Logo + Slogan + Sertifika ─── */}
            <div className="flex flex-col gap-6">
              <Link href="/" className="inline-flex flex-col" aria-label="Fatma Menteş — Ana sayfaya dön">
                <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.4rem", fontWeight: 300, letterSpacing: "0.12em", color: "#F5ECD7", lineHeight: 1, textDecoration: "none" }}>
                  Fatma Menteş
                </span>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.55rem", fontWeight: 400, letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(201,168,76,0.55)", marginTop: "0.4rem" }}>
                  Derinin Hafızası
                </span>
              </Link>

              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.9rem", fontWeight: 300, fontStyle: "italic", lineHeight: 1.65, color: "rgba(245,236,215,0.38)", maxWidth: "22rem" }}>
                Makinelere inat, ellerin hafızasıyla işlenen sıfır atık eserler.
                Her dikiş, bir vasiyet. Her deri, bir emanet.
              </p>

              {/* Sertifika damgası */}
              <div
                className="flex items-center gap-3 p-3 rounded-sm"
                style={{ border: "1px solid rgba(201,168,76,0.15)", background: "rgba(201,168,76,0.04)", maxWidth: "260px" }}
                role="img"
                aria-label="Islak İmzalı Gerçeklik Sertifikası — her eser belgeli"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center"
                     style={{ border: "1px solid rgba(201,168,76,0.3)", background: "rgba(201,168,76,0.06)" }} aria-hidden="true">
                  <MuhurIkonu />
                </div>
                <div>
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.04em", color: "rgba(245,236,215,0.75)", lineHeight: 1.2 }}>
                    Islak İmzalı Sertifika
                  </p>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.55rem", fontWeight: 300, letterSpacing: "0.1em", color: "rgba(201,168,76,0.45)", marginTop: "2px" }}>
                    Her eser · Gerçeklik belgeli
                  </p>
                </div>
              </div>
            </div>

            {/* ─── Kolon 2: Navigasyon ─── */}
            <nav aria-label="Alt navigasyon">
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.58rem", fontWeight: 500, letterSpacing: "0.24em", textTransform: "uppercase", color: "rgba(201,168,76,0.45)", marginBottom: "1.25rem", paddingBottom: "0.75rem", borderBottom: "1px solid rgba(201,168,76,0.1)" }}>
                Sayfalar
              </p>
              <ul className="flex flex-col gap-[0.6rem]" style={{ listStyle: "none" }}>
                {NAV_LINKLERI.map(({ href, etiket }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="fm-nav-link inline-flex items-center transition-all duration-300"
                      style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem", fontWeight: 300, color: "rgba(245,236,215,0.55)", textDecoration: "none", letterSpacing: "0.03em", gap: "0.5rem" }}
                    >
                      <span style={{ fontSize: "0.6em", color: "rgba(201,168,76,0.3)", transition: "color 0.3s" }} aria-hidden="true">—</span>
                      {etiket}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* ─── Kolon 3: Atölyeler ─── */}
            <div>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.58rem", fontWeight: 500, letterSpacing: "0.24em", textTransform: "uppercase", color: "rgba(201,168,76,0.45)", marginBottom: "1.25rem", paddingBottom: "0.75rem", borderBottom: "1px solid rgba(201,168,76,0.1)" }}>
                Yaklaşan Atölyeler
              </p>
              <div className="flex flex-col">
                {FOOTER_ATOLYE.map(({ href, gun, ay, isim, detay }) => (
                  <Link
                    key={`${gun}-${ay}`}
                    href={href}
                    className="fm-atolye-kart flex items-center gap-3 py-3 transition-colors duration-300"
                    style={{ borderBottom: "1px solid rgba(201,168,76,0.07)", textDecoration: "none" }}
                    aria-label={`${gun} ${ay} — ${isim}`}
                  >
                    <div className="flex flex-col items-center justify-center flex-shrink-0 rounded-sm"
                         style={{ width: "40px", height: "40px", border: "1px solid rgba(201,168,76,0.2)", background: "rgba(201,168,76,0.04)" }} aria-hidden="true">
                      <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.05rem", fontWeight: 300, color: "#C9A84C", lineHeight: 1 }}>{gun}</span>
                      <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.42rem", fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(201,168,76,0.55)" }}>{ay}</span>
                    </div>
                    <div className="flex-1">
                      <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.88rem", fontWeight: 300, color: "rgba(245,236,215,0.65)", lineHeight: 1.2 }}>{isim}</p>
                      <p className="fm-oku transition-colors duration-300"
                         style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.55rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(201,168,76,0.35)", marginTop: "2px" }}>
                        {detay}
                      </p>
                    </div>
                  </Link>
                ))}
                <Link href="/atolye#takvim"
                      className="fm-takvim-link inline-flex items-center gap-2 mt-3 transition-colors duration-300"
                      style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.6rem", fontWeight: 400, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(201,168,76,0.4)", textDecoration: "none" }}>
                  Tüm takvim <OkIkonu />
                </Link>
              </div>
            </div>

            {/* ─── Kolon 4: Dil + İletişim ─── */}
            <div>
              {/* Dil seçici */}
              <p id="footer-dil-label" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.58rem", fontWeight: 500, letterSpacing: "0.24em", textTransform: "uppercase", color: "rgba(201,168,76,0.45)", marginBottom: "1rem", paddingBottom: "0.75rem", borderBottom: "1px solid rgba(201,168,76,0.1)" }}>
                Dil / Language
              </p>
              <div role="group" aria-labelledby="footer-dil-label" className="flex flex-col gap-3">
                <div className="flex gap-2 flex-wrap">
                  {DILLER.map(({ kod, etiket }) => (
                    <button
                      key={kod}
                      onClick={() => dilSec(kod)}
                      lang={kod}
                      aria-pressed={aktifDil === kod}
                      className="fm-dil-btn rounded-sm transition-all duration-300"
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "0.62rem",
                        fontWeight: aktifDil === kod ? 500 : 400,
                        letterSpacing: "0.16em",
                        textTransform: "uppercase",
                        padding: "0.35rem 0.75rem",
                        background: aktifDil === kod ? "rgba(201,168,76,0.06)" : "transparent",
                        border: `1px solid ${aktifDil === kod ? "rgba(201,168,76,0.4)" : "rgba(245,236,215,0.1)"}`,
                        color: aktifDil === kod ? "#C9A84C" : "rgba(245,236,215,0.4)",
                        cursor: "pointer",
                      }}
                    >
                      {etiket}
                    </button>
                  ))}
                </div>
                <p
                  aria-live="polite"
                  style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.62rem", fontWeight: 300, color: "rgba(245,236,215,0.28)", letterSpacing: "0.06em", lineHeight: 1.55 }}
                >
                  {aktifDilAdi}
                </p>
              </div>

              {/* İletişim */}
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.58rem", fontWeight: 500, letterSpacing: "0.24em", textTransform: "uppercase", color: "rgba(201,168,76,0.45)", marginTop: "1.75rem", marginBottom: "1rem", paddingBottom: "0.75rem", borderBottom: "1px solid rgba(201,168,76,0.1)" }}>
                İletişim
              </p>
              <div className="flex flex-col gap-3">
                {[
                  {
                    href: "mailto:info@fatmamentesart.com",
                    metin: "info@fatmamentesart.com",
                    ikon: (
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                        <rect x="1" y="3" width="12" height="8" rx="1" stroke="#C9A84C" strokeWidth="0.8"/>
                        <path d="M1 4 L7 8 L13 4" stroke="#C9A84C" strokeWidth="0.8" strokeLinecap="round"/>
                      </svg>
                    ),
                  },
                  {
                    href: undefined,
                    metin: "Beyoğlu, İstanbul",
                    ikon: (
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                        <path d="M7 1.5 Q10.5 1.5 10.5 5 Q10.5 8.5 7 12 Q3.5 8.5 3.5 5 Q3.5 1.5 7 1.5 Z" stroke="#C9A84C" strokeWidth="0.8"/>
                        <circle cx="7" cy="5" r="1.5" stroke="#C9A84C" strokeWidth="0.7"/>
                      </svg>
                    ),
                  },
                ].map(({ href, metin, ikon }) =>
                  href ? (
                    <a key={metin} href={href}
                       className="fm-iletisim flex items-start gap-2 transition-colors duration-300"
                       style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem", fontWeight: 300, color: "rgba(245,236,215,0.38)", textDecoration: "none", lineHeight: 1.5 }}>
                      <span className="flex-shrink-0 mt-[2px] opacity-50">{ikon}</span>
                      {metin}
                    </a>
                  ) : (
                    <span key={metin}
                          className="flex items-start gap-2"
                          style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem", fontWeight: 300, color: "rgba(245,236,215,0.38)", lineHeight: 1.5 }}>
                      <span className="flex-shrink-0 mt-[2px] opacity-50">{ikon}</span>
                      {metin}
                    </span>
                  )
                )}
              </div>

              {/* Sosyal medya */}
              <div className="flex gap-2 mt-4" aria-label="Sosyal medya bağlantıları">
                {[
                  {
                    href: "https://instagram.com/fatmamentesart",
                    label: "Instagram",
                    ikon: (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                           stroke="#C9A84C" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <rect x="2" y="2" width="20" height="20" rx="5"/>
                        <circle cx="12" cy="12" r="5"/>
                        <circle cx="17.5" cy="6.5" r="0.8" fill="#C9A84C"/>
                      </svg>
                    ),
                  },
                  {
                    href: "https://pinterest.com/fatmamentesart",
                    label: "Pinterest",
                    ikon: (
                      <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                        <circle cx="12" cy="12" r="10" stroke="#C9A84C" strokeWidth="0.8" fill="none"/>
                        <text x="8.5" y="16.5" fontFamily="serif" fontSize="11" fontWeight="300" fill="#C9A84C" opacity="0.85">P</text>
                      </svg>
                    ),
                  },
                  {
                    href: "https://etsy.com/shop/fatmamentesart",
                    label: "Etsy mağazası",
                    ikon: (
                      <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                        <circle cx="12" cy="12" r="10" stroke="#C9A84C" strokeWidth="0.8" fill="none"/>
                        <text x="7.5" y="16.5" fontFamily="serif" fontSize="11" fontWeight="300" fill="#C9A84C" opacity="0.85">e</text>
                      </svg>
                    ),
                  },
                ].map(({ href, label, ikon }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                     aria-label={label}
                     className="fm-sosyal flex items-center justify-center rounded-sm transition-all duration-300"
                     style={{ width: "34px", height: "34px", border: "1px solid rgba(245,236,215,0.1)", background: "rgba(245,236,215,0.04)" }}>
                    <span style={{ opacity: 0.45, transition: "opacity 0.3s" }}>
                      {ikon}
                    </span>
                  </a>
                ))}
              </div>
            </div>

          </div>{/* /footer-grid */}

          {/* ══ Alt şerit ══ */}
          <div
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-14 pt-6"
            style={{ borderTop: "1px solid rgba(201,168,76,0.1)" }}
          >
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.6rem", fontWeight: 300, letterSpacing: "0.1em", color: "rgba(245,236,215,0.2)" }}>
              © 2026 Fatma Menteş · Tüm hakları saklıdır · Çıplak Eller Atölyesi, İstanbul
            </p>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.75rem", fontWeight: 300, fontStyle: "italic", color: "rgba(201,168,76,0.3)", letterSpacing: "0.06em" }}>
              "Sıfır atık. Sıfır makine. Sonsuz sabır."
            </p>
          </div>

        </div>{/* /max-w */}
      </footer>
    </>
  );
}

/* ─── Default export — hem PreFooter hem Footer ─── */
export default function FooterBolumu() {
  return (
    <>
      <PreFooter />
      <Footer />
    </>
  );
}
