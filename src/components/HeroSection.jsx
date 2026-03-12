"use client";

/**
 * HeroSection — Fatma Menteş | Derinin Hafızası
 *
 * Splash screen'den (full-screen video) hemen sonra gelen ilk içerik bölümü.
 * Tasarım felsefesi: Editorial-luxe × Ottoman zanaat hafızası.
 *
 * Bağımlılıklar: Yalnızca Tailwind CSS (harici kütüphane yok)
 * Fontlar: Cormorant Garamond (serif, başlık) + DM Sans (sans-serif, metin)
 * Erişilebilirlik: WCAG 2.2 AA — renk kontrastı, ARIA etiketleri, odak yönetimi
 */

import { useEffect, useRef, useState } from "react";

/* ─── Tasarım token'ları ─────────────────────────────────────────────────── */
const tokens = {
  vaketa:   "#5C3A1E",   // Ana koyu ton
  kahve:    "#8B4513",   // Vurgu
  altin:    "#C9A84C",   // Yaldız detay
  cini:     "#2E6B8A",   // İkincil vurgu
  parsomen: "#F5ECD7",   // Arka plan
  koyu:     "#1A0F0A",   // Karanlık zemin
};

/* ─── SVG Süsleme Bileşeni (tezhip-ilhamlı ince çizgi) ──────────────────── */
function OrnamentalDivider({ className = "" }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      width="280"
      height="16"
      viewBox="0 0 280 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line x1="0" y1="8" x2="108" y2="8" stroke={tokens.altin} strokeWidth="0.75" strokeOpacity="0.6" />
      <circle cx="120" cy="8" r="3.5" stroke={tokens.altin} strokeWidth="0.75" strokeOpacity="0.8" />
      <circle cx="140" cy="8" r="5.5" stroke={tokens.altin} strokeWidth="0.75" strokeOpacity="0.9" />
      <circle cx="140" cy="8" r="2"   fill={tokens.altin} fillOpacity="0.7" />
      <circle cx="160" cy="8" r="3.5" stroke={tokens.altin} strokeWidth="0.75" strokeOpacity="0.8" />
      <line x1="172" y1="8" x2="280" y2="8" stroke={tokens.altin} strokeWidth="0.75" strokeOpacity="0.6" />
    </svg>
  );
}

/* ─── Ana Bileşen ────────────────────────────────────────────────────────── */
export default function HeroSection() {
  const heroRef  = useRef(null);
  const [visible, setVisible] = useState(false);

  /* Splash ekrandan scroll edilince reveal animasyonu tetiklenir */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (heroRef.current) observer.observe(heroRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* ── Google Fonts yüklemesi (Next.js'te next/font ile değiştirilmeli) ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');

        /* Parşömen doku — SVG noise filtresi ile saf CSS */
        .parsomen-bg {
          background-color: ${tokens.parsomen};
          background-image:
            url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23n)' opacity='0.055'/%3E%3C/svg%3E");
          background-repeat: repeat;
        }

        /* Kenar vinyeting — derin alan hissi */
        .vignette::after {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at center, transparent 55%, rgba(26,15,10,0.28) 100%);
          pointer-events: none;
          z-index: 1;
        }

        /* Reveal animasyonları */
        .hero-reveal { opacity: 0; transform: translateY(28px); transition: opacity 0.9s ease, transform 0.9s ease; }
        .hero-reveal.in { opacity: 1; transform: translateY(0); }
        .delay-1 { transition-delay: 0.1s; }
        .delay-2 { transition-delay: 0.25s; }
        .delay-3 { transition-delay: 0.42s; }
        .delay-4 { transition-delay: 0.58s; }
        .delay-5 { transition-delay: 0.72s; }

        /* Altın yaldız buton hover */
        .btn-primary {
          background-color: ${tokens.vaketa};
          color: ${tokens.parsomen};
          border: 1px solid transparent;
          transition: background-color 0.3s ease, border-color 0.3s ease, color 0.3s ease, box-shadow 0.3s ease;
        }
        .btn-primary:hover, .btn-primary:focus-visible {
          background-color: ${tokens.koyu};
          border-color: ${tokens.altin};
          color: ${tokens.altin};
          box-shadow: 0 0 0 2px ${tokens.altin}55;
          outline: none;
        }

        .btn-secondary {
          background-color: transparent;
          color: ${tokens.vaketa};
          border: 1px solid ${tokens.kahve}88;
          transition: background-color 0.3s ease, border-color 0.3s ease, color 0.3s ease, box-shadow 0.3s ease;
        }
        .btn-secondary:hover, .btn-secondary:focus-visible {
          background-color: ${tokens.vaketa}14;
          border-color: ${tokens.altin};
          color: ${tokens.kahve};
          box-shadow: 0 0 0 2px ${tokens.altin}44;
          outline: none;
        }

        /* Dikey dekoratif çizgi (masaüstü) */
        .vert-rule {
          width: 1px;
          background: linear-gradient(to bottom, transparent, ${tokens.altin}80, transparent);
        }

        /* Küçük stat etiketleri */
        .stat-label { font-family: 'DM Sans', sans-serif; letter-spacing: 0.12em; }
        .stat-value { font-family: 'Cormorant Garamond', serif; }
      `}</style>

      {/* ── HERO WRAPPER ── */}
      <section
        ref={heroRef}
        aria-label="Fatma Menteş — Zanaat Tanıtımı"
        className="parsomen-bg vignette relative overflow-hidden min-h-screen flex flex-col"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        {/* ── Arka plan dekoratif tezhip köşe süsü (sağ üst) ── */}
        <svg
          aria-hidden="true"
          className="absolute top-0 right-0 opacity-[0.07] pointer-events-none select-none"
          width="340"
          height="340"
          viewBox="0 0 340 340"
        >
          <circle cx="340" cy="0" r="260" stroke={tokens.altin} strokeWidth="0.6" fill="none" />
          <circle cx="340" cy="0" r="200" stroke={tokens.altin} strokeWidth="0.4" fill="none" />
          <circle cx="340" cy="0" r="140" stroke={tokens.altin} strokeWidth="0.6" fill="none" />
          <circle cx="340" cy="0" r="80"  stroke={tokens.altin} strokeWidth="0.4" fill="none" />
          <line x1="340" y1="0" x2="0" y2="340" stroke={tokens.altin} strokeWidth="0.4" strokeOpacity="0.5" />
        </svg>

        {/* ── Arka plan dekoratif sol alt köşe ── */}
        <svg
          aria-hidden="true"
          className="absolute bottom-0 left-0 opacity-[0.05] pointer-events-none select-none"
          width="240"
          height="240"
          viewBox="0 0 240 240"
        >
          <circle cx="0" cy="240" r="200" stroke={tokens.kahve} strokeWidth="0.6" fill="none" />
          <circle cx="0" cy="240" r="140" stroke={tokens.kahve} strokeWidth="0.4" fill="none" />
          <circle cx="0" cy="240" r="80"  stroke={tokens.kahve} strokeWidth="0.6" fill="none" />
        </svg>

        {/* ── İÇERİK ALANI ── */}
        <div
          className="relative z-10 flex flex-col lg:flex-row items-center lg:items-stretch
                     max-w-7xl mx-auto w-full px-6 sm:px-10 lg:px-16
                     pt-24 pb-16 lg:pt-32 lg:pb-24 gap-12 lg:gap-0 flex-1"
        >

          {/* ── SOL SÜTUN — Metin ── */}
          <div className="flex flex-col justify-center flex-1 lg:pr-16">

            {/* Üst etiket */}
            <div
              className={`hero-reveal delay-1 ${visible ? "in" : ""} flex items-center gap-3 mb-8`}
              aria-label="Tanımlama etiketi"
            >
              <span
                className="stat-label text-[10px] sm:text-[11px] font-medium tracking-[0.2em] uppercase px-3 py-1.5 rounded-sm"
                style={{ color: tokens.altin, border: `1px solid ${tokens.altin}55`, backgroundColor: `${tokens.altin}0D` }}
              >
                El İşçiliği · Sıfır Atık · İstanbul
              </span>
            </div>

            {/* Ana başlık */}
            <h1
              className={`hero-reveal delay-2 ${visible ? "in" : ""}`}
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(2.4rem, 6vw, 5rem)",
                fontWeight: 300,
                lineHeight: 1.12,
                letterSpacing: "-0.01em",
                color: tokens.koyu,
              }}
            >
              Ellerin Hafızasıyla{" "}
              <span style={{ fontStyle: "italic", color: tokens.kahve }}>İşlenen</span>
              <br />
              Sıfır Atık Eserler
            </h1>

            {/* Tezhip çizgisi */}
            <div className={`hero-reveal delay-3 ${visible ? "in" : ""} mt-5 mb-6`}>
              <OrnamentalDivider />
            </div>

            {/* Value proposition */}
            <p
              className={`hero-reveal delay-3 ${visible ? "in" : ""} max-w-md leading-relaxed`}
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "clamp(0.95rem, 2vw, 1.1rem)",
                fontWeight: 300,
                color: `${tokens.vaketa}CC`,
                lineHeight: 1.72,
              }}
            >
              Makinelere inat, bitkisel tabaklanmış vaketa üzerine çift iğneyle{" "}
              <strong style={{ fontWeight: 500, color: tokens.vaketa }}>el dikişi</strong> atılan her eser,
              bir hikâyenin cilt kapağıdır. Çöpe giden hiçbir deri yoktur —
              yalnızca henüz sanatla buluşmamış olanlar.
            </p>

            {/* Alıntı */}
            <blockquote
              className={`hero-reveal delay-4 ${visible ? "in" : ""} mt-6 pl-4 italic`}
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(1rem, 2.2vw, 1.2rem)",
                fontWeight: 400,
                color: `${tokens.altin}`,
                borderLeft: `2px solid ${tokens.altin}`,
              }}
            >
              "Deri nefes alan bir canlıdır. Dinle…"
              <footer
                className="not-italic mt-1 block"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.78rem",
                  letterSpacing: "0.1em",
                  color: `${tokens.kahve}99`,
                }}
              >
                — Fatma Menteş
              </footer>
            </blockquote>

            {/* CTA Butonları */}
            <div
              className={`hero-reveal delay-5 ${visible ? "in" : ""} flex flex-wrap gap-4 mt-10`}
              role="group"
              aria-label="Ana eylem butonları"
            >
              <a
                href="/eserler"
                className="btn-primary inline-flex items-center gap-2.5 px-8 py-3.5 text-sm tracking-widest uppercase font-medium rounded-sm"
              >
                <span>Eserleri Keşfet</span>
                {/* Ok ikon */}
                <svg aria-hidden="true" width="16" height="10" viewBox="0 0 16 10" fill="none">
                  <path d="M1 5h14M10 1l5 4-5 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>

              <a
                href="/eller"
                className="btn-secondary inline-flex items-center gap-2.5 px-8 py-3.5 text-sm tracking-widest uppercase font-medium rounded-sm"
              >
                <span>Çıplak Elleri Tanı</span>
              </a>
            </div>
          </div>

          {/* ── DİKEY ÇIZGI (yalnızca masaüstü) ── */}
          <div
            aria-hidden="true"
            className="hidden lg:block vert-rule self-stretch mx-2 opacity-40"
          />

          {/* ── SAĞ SÜTUN — İstatistikler + Rozet ── */}
          <div
            className={`hero-reveal delay-3 ${visible ? "in" : ""}
                        flex flex-row lg:flex-col justify-center items-center
                        lg:items-start gap-8 lg:gap-12 lg:pl-16 lg:justify-center`}
          >

            {/* Stat 1 */}
            <div className="text-center lg:text-left">
              <p
                className="stat-value"
                style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "3rem", fontWeight: 300, color: tokens.kahve, lineHeight: 1 }}
                aria-label="12 yıl el ustalığı"
              >
                12+
              </p>
              <p
                className="stat-label mt-1"
                style={{ fontSize: "0.68rem", letterSpacing: "0.18em", color: `${tokens.vaketa}88`, textTransform: "uppercase" }}
              >
                Yıl El Ustalığı
              </p>
            </div>

            {/* Stat 2 */}
            <div className="text-center lg:text-left">
              <p
                className="stat-value"
                style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "3rem", fontWeight: 300, color: tokens.kahve, lineHeight: 1 }}
                aria-label="Sıfır atık"
              >
                %0
              </p>
              <p
                className="stat-label mt-1"
                style={{ fontSize: "0.68rem", letterSpacing: "0.18em", color: `${tokens.vaketa}88`, textTransform: "uppercase" }}
              >
                Atık · Sıfır İsraf
              </p>
            </div>

            {/* Stat 3 */}
            <div className="text-center lg:text-left">
              <p
                className="stat-value"
                style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "3rem", fontWeight: 300, color: tokens.kahve, lineHeight: 1 }}
                aria-label="Makine kullanılmaz"
              >
                ∅
              </p>
              <p
                className="stat-label mt-1"
                style={{ fontSize: "0.68rem", letterSpacing: "0.18em", color: `${tokens.vaketa}88`, textTransform: "uppercase" }}
              >
                Makine · Saf El İşçiliği
              </p>
            </div>

            {/* Sertifika rozeti */}
            <div
              className="flex flex-col items-center gap-2 p-5 rounded-sm"
              style={{
                border: `1px solid ${tokens.altin}44`,
                background: `${tokens.altin}08`,
                maxWidth: "160px",
              }}
              aria-label="Islak imzalı gerçeklik sertifikası"
            >
              {/* Mühür ikon */}
              <svg aria-hidden="true" width="28" height="28" viewBox="0 0 28 28" fill="none">
                <circle cx="14" cy="14" r="12" stroke={tokens.altin} strokeWidth="1" strokeOpacity="0.7"/>
                <circle cx="14" cy="14" r="8"  stroke={tokens.altin} strokeWidth="0.6" strokeOpacity="0.5"/>
                <path d="M9 14l3.5 3.5L19 10" stroke={tokens.altin} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <p
                className="stat-label text-center"
                style={{ fontSize: "0.62rem", letterSpacing: "0.15em", color: `${tokens.altin}CC`, textTransform: "uppercase", lineHeight: 1.6 }}
              >
                Islak İmzalı<br />Gerçeklik<br />Sertifikası
              </p>
            </div>
          </div>
        </div>

        {/* ── ALT SCROLL İPUCU ── */}
        <div
          aria-hidden="true"
          className="relative z-10 flex flex-col items-center pb-8 gap-2 opacity-50"
        >
          <span
            className="stat-label"
            style={{ fontSize: "0.62rem", letterSpacing: "0.22em", color: tokens.vaketa, textTransform: "uppercase" }}
          >
            Keşfet
          </span>
          {/* Animasyonlu ok */}
          <svg width="20" height="28" viewBox="0 0 20 28" fill="none" style={{ animation: "bounce 2s infinite" }}>
            <path d="M10 2v20M3 16l7 8 7-8" stroke={tokens.altin} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <style>{`
            @keyframes bounce {
              0%, 100% { transform: translateY(0); }
              50% { transform: translateY(6px); }
            }
          `}</style>
        </div>
      </section>
    </>
  );
}
