/**
 * app/[locale]/eller/page.tsx
 * Fatma Menteş — "Çıplak Eller" Hakkımızda Sayfası
 *
 * Bölümler:
 *   1. Hero         → Büyük başlık, asimetrik tipografi
 *   2. Portre       → Siyah-beyaz fotoğraf + giriş metni + istatistikler
 *   3. Biyografi I  → Koyu zemin, yokluktan ustalığa
 *   4. Arakan       → Dramatik tam genişlik alıntı — sayfa zirvesi
 *   5. Biyografi II → Sıfır atık felsefesi, Nalın-ı Şerif
 *   6. İkonografi   → 4 temel ilke kartı (dark grid)
 *   7. Kapanış      → Manifesto, CTA'lar
 *
 * SEO: generateMetadata, JSON-LD (Person schema)
 * Erişilebilirlik: aria-label, semantic HTML, landmark'lar
 */

import type { Metadata } from "next";
import Link from "next/link";

/* ─── SEO ─── */
export const metadata: Metadata = {
  title: "Çıplak Eller — Fatma Menteş | Derinin Hafızası",
  description:
    "Makinelere inat, bitkisel tabaklanmış deri üzerine çift iğneyle el dikişi atan Fatma Menteş'in hikâyesi, felsefesi ve sıfır atık manifestosu.",
  openGraph: {
    title:       "Çıplak Eller — Fatma Menteş",
    description: "Deri ustası Fatma Menteş'in 12 yıllık yolculuğu; yokluktan ustalığa, atıklardan sanata.",
  },
};

/* ─── Veri: İkonografi kartları ─── */
const ILKELER = [
  {
    baslik: "Elektriksiz\nÜretim",
    aciklama: "Tezgâhta tek bir elektrikli alet bulunmaz. Her şey el gücüyle şekillenir.",
    ikon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <path d="M11 6 L11 14" stroke="#C9A84C" strokeWidth="1.2" strokeLinecap="round" strokeOpacity="0.7"/>
        <path d="M21 6 L21 14" stroke="#C9A84C" strokeWidth="1.2" strokeLinecap="round" strokeOpacity="0.7"/>
        <path d="M7 14 L25 14 L25 19 Q25 25 16 25 Q7 25 7 19 Z" stroke="#C9A84C" strokeWidth="1" fill="none" strokeOpacity="0.7"/>
        <path d="M16 25 L16 29" stroke="#C9A84C" strokeWidth="1" strokeLinecap="round" strokeOpacity="0.7"/>
        <line x1="3" y1="3" x2="29" y2="29" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    baslik: "Sıfır\nAtık",
    aciklama: "En küçük deri parçasına bile işlev bulunur. Çöp diye bir kavram yoktur.",
    ikon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <path d="M16 4 L20 12 L28 12 L22 18 L24 26 L16 20 L8 26 L10 18 L4 12 L12 12 Z"
              stroke="#C9A84C" strokeWidth="1" fill="none" strokeOpacity="0.8"/>
        <path d="M16 6 Q22 6 24 12" stroke="#C9A84C" strokeWidth="1" strokeLinecap="round" strokeOpacity="0.5"/>
        <path d="M24 20 Q20 26 16 24" stroke="#C9A84C" strokeWidth="1" strokeLinecap="round" strokeOpacity="0.5"/>
        <path d="M8 20 Q8 12 12 10" stroke="#C9A84C" strokeWidth="1" strokeLinecap="round" strokeOpacity="0.5"/>
      </svg>
    ),
  },
  {
    baslik: "Bitkisel\nTabaklanmış",
    aciklama: "Kimyasal içermeyen, meşe palamudu ve bitki özleriyle işlenmiş deri kullanılır.",
    ikon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <path d="M16 28 L16 10 Q16 4 22 6 Q28 8 26 14 Q24 20 16 22" stroke="#C9A84C" strokeWidth="1" fill="none" strokeOpacity="0.8"/>
        <path d="M16 28 L16 10 Q16 4 10 6 Q4 8 6 14 Q8 20 16 22" stroke="#C9A84C" strokeWidth="1" fill="none" strokeOpacity="0.5"/>
        <path d="M16 28 Q18 22 20 16 Q22 10 20 6" stroke="#C9A84C" strokeWidth="0.5" strokeOpacity="0.4"/>
      </svg>
    ),
  },
  {
    baslik: "Çift İğne\nEl Dikişi",
    aciklama: "Saddle stitch yöntemi. İki iğne, iki iplik — makinenin asla taklit edemeyeceği dikiş.",
    ikon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <line x1="8" y1="24" x2="24" y2="8" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.9"/>
        <ellipse cx="22" cy="9" rx="3.5" ry="2.2" transform="rotate(-45 22 9)"
                 stroke="#C9A84C" strokeWidth="0.8" fill="none" strokeOpacity="0.7"/>
        <circle cx="8"  cy="24" r="1.5" fill="#C9A84C" fillOpacity="0.7"/>
        <circle cx="11" cy="21" r="1.2" fill="#C9A84C" fillOpacity="0.5"/>
        <circle cx="14" cy="18" r="1.2" fill="#C9A84C" fillOpacity="0.5"/>
        <circle cx="17" cy="15" r="1.2" fill="#C9A84C" fillOpacity="0.5"/>
        <path d="M8 24 Q5 20 9 16 Q13 12 11 8" stroke="#C9A84C" strokeWidth="0.6" strokeDasharray="2 2" strokeOpacity="0.5" fill="none"/>
      </svg>
    ),
  },
] as const;

/* ─── İstatistikler ─── */
const ISTATISTIKLER = [
  { rakam: "12+", aciklama: "Yıl El Ustalığı" },
  { rakam: "4",   aciklama: "Kıtadan Öğrenci" },
  { rakam: "%0",  aciklama: "Atık · Sıfır İsraf" },
  { rakam: "∅",   aciklama: "Makine · Saf El" },
];

/* ─── Ornament SVG ─── */
function Ornament({ opacity = 0.7 }: { opacity?: number }) {
  return (
    <svg aria-hidden="true" width="200" height="14" viewBox="0 0 200 14" fill="none" style={{ opacity }}>
      <line x1="0"   y1="7" x2="76"  y2="7" stroke="#C9A84C" strokeWidth="0.6" strokeOpacity="0.5"/>
      <circle cx="84"  cy="7" r="2.8" stroke="#C9A84C" strokeWidth="0.7" strokeOpacity="0.7" fill="none"/>
      <circle cx="100" cy="7" r="4.5" stroke="#C9A84C" strokeWidth="0.7" strokeOpacity="0.85" fill="none"/>
      <circle cx="100" cy="7" r="1.6" fill="#C9A84C" fillOpacity="0.65"/>
      <circle cx="116" cy="7" r="2.8" stroke="#C9A84C" strokeWidth="0.7" strokeOpacity="0.7" fill="none"/>
      <line x1="124" y1="7" x2="200" y2="7" stroke="#C9A84C" strokeWidth="0.6" strokeOpacity="0.5"/>
    </svg>
  );
}

/* ─── Stil sabitleri ─── */
const GRAIN =
  `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23n)' opacity='0.055'/%3E%3C/svg%3E")`;

const GRAIN_DARK =
  `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23n)' opacity='0.06'/%3E%3C/svg%3E")`;

/* ─── Ana Bileşen ─── */
export default function CiplaakEllerPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=DM+Sans:wght@300;400;500&display=swap');

        /* JSON-LD schema */
        /* Reveal animasyonları JS ile tetiklenir — Next.js'te client component gerekir.
           Bunun yerine Tailwind'in animate-none + scroll-mt ile yönetebilirsiniz
           veya aşağıdaki CSS ile IntersectionObserver kullanabilirsiniz. */
        .fm-reveal {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }
        .fm-reveal.fm-in { opacity: 1; transform: translateY(0); }
        .fm-reveal-left {
          opacity: 0;
          transform: translateX(-24px);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }
        .fm-reveal-left.fm-in { opacity: 1; transform: translateX(0); }
        .fm-d1 { transition-delay: 0.05s; }
        .fm-d2 { transition-delay: 0.18s; }
        .fm-d3 { transition-delay: 0.30s; }
        .fm-d4 { transition-delay: 0.42s; }

        .ilke-kart:hover { background: rgba(201,168,76,0.06) !important; }
        .ilke-kart:hover .ilke-cember { border-color: rgba(201,168,76,0.6) !important; }
        .cta-hover:hover {
          background: rgba(201,168,76,0.18) !important;
          border-color: #C9A84C !important;
          color: #C9A84C !important;
        }
      `}</style>

      {/* ── JSON-LD ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Fatma Menteş",
            "jobTitle": "Deri Sanatçısı",
            "description": "Bitkisel tabaklanmış vaketa üzerine çift iğneyle el dikişi uygulayan, sıfır atık felsefesiyle eserler yaratan deri ustası.",
            "brand": { "@type": "Brand", "name": "Çıplak Eller Atölyesi" },
          }),
        }}
      />

      {/* ══════════════════ 1. HERO ══════════════════ */}
      <section
        aria-label="Çıplak Eller — Sayfa Başlığı"
        className="relative overflow-hidden pt-36 md:pt-44 pb-20 md:pb-28 px-6 md:px-10"
        style={{ backgroundColor: "#F5ECD7", backgroundImage: GRAIN }}
      >
        {/* Dekoratif arka plan harfi */}
        <div
          aria-hidden="true"
          className="absolute top-0 right-0 leading-none pointer-events-none select-none"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(18rem, 40vw, 32rem)",
            fontWeight: 300,
            fontStyle: "italic",
            color: "rgba(139,69,19,0.045)",
            lineHeight: 0.9,
          }}
        >
          Ç
        </div>

        <div className="relative z-10 max-w-[1280px] mx-auto">
          <p
            className="fm-reveal fm-d1 mb-6 tracking-[0.24em] uppercase text-[0.65rem]"
            style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(201,168,76,0.8)" }}
          >
            Fatma Menteş · Derinin Hafızası
          </p>

          <h1
            className="fm-reveal fm-d2"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(3.5rem, 10vw, 8rem)",
              fontWeight: 300,
              lineHeight: 0.95,
              color: "#1A0F0A",
              letterSpacing: "-0.02em",
            }}
          >
            Çıplak
            <em className="block" style={{ fontStyle: "italic", color: "#8B4513" }}>Eller</em>
          </h1>

          <blockquote
            className="fm-reveal fm-d3 mt-10 max-w-[42rem] pl-6"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(1.1rem, 2.5vw, 1.4rem)",
              fontWeight: 300,
              fontStyle: "italic",
              lineHeight: 1.7,
              color: "rgba(92,58,30,0.65)",
              borderLeft: "2px solid rgba(201,168,76,0.5)",
            }}
          >
            "Makine bilmez nasır tutmayı. Bilmez yorgunluğu, bilmez sabrı.
            El ise — her dikişte büyür."
          </blockquote>

          <div className="fm-reveal fm-d3 mt-12">
            <Ornament />
          </div>
        </div>
      </section>

      {/* ══════════════════ 2. PORTRE + GİRİŞ ══════════════════ */}
      <section
        aria-label="Fatma Menteş Portresi ve Giriş"
        className="px-6 md:px-10 pb-20 md:pb-28"
        style={{ backgroundColor: "#F5ECD7", backgroundImage: GRAIN }}
      >
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-[420px_1fr] gap-12 lg:gap-20 items-start">

          {/* Portre */}
          <div className="fm-reveal-left fm-d1">
            <div
              className="relative overflow-hidden rounded-sm border"
              style={{ aspectRatio: "3/4", background: "rgba(26,15,10,0.08)", borderColor: "rgba(92,58,30,0.12)" }}
              role="img"
              aria-label="Fatma Menteş portre fotoğrafı"
            >
              {/* Köşe süsler */}
              {[{ cls: "top-3 left-3", rot: "" }, { cls: "bottom-3 right-3", rot: "rotate(180deg)" }].map(({ cls, rot }, i) => (
                <svg key={i} aria-hidden="true" className={`absolute ${cls} pointer-events-none`}
                     style={{ transform: rot }} width="42" height="42" viewBox="0 0 42 42" fill="none">
                  <path d="M0 0 L24 0 Q10 0 0 10 Z" stroke="#C9A84C" strokeWidth="0.8" fill="none" opacity="0.4"/>
                  <circle cx="0" cy="0" r="32" stroke="#C9A84C" strokeWidth="0.4" fill="none" opacity="0.25"/>
                </svg>
              ))}

              {/*
                FOTOĞRAF YERİ:
                import Image from "next/image";
                <Image
                  src="/images/fatma-mentes-portre.jpg"
                  alt="Fatma Menteş — Çıplak Eller Atölyesi"
                  fill
                  sizes="(max-width: 1024px) 100vw, 420px"
                  className="object-cover grayscale"
                  priority
                />
              */}
              <div className="w-full h-full flex flex-col items-center justify-center gap-4" aria-hidden="true">
                {/* El silueti placeholder */}
                <svg width="90" height="110" viewBox="0 0 90 110" fill="none" style={{ opacity: 0.1 }}>
                  <path d="M20 110 Q18 90 22 70 Q26 52 34 42 Q38 35 44 32 Q50 29 56 31 Q65 34 68 44 Q72 56 68 70 Q64 82 58 92 Q52 102 44 108 Q36 114 28 114 Q22 114 20 110Z"
                        stroke="#5C3A1E" strokeWidth="1.5" fill="none"/>
                  <path d="M34 42 Q32 28 34 16 Q36 6 42 4 Q48 2 50 10 Q52 20 50 34" stroke="#5C3A1E" strokeWidth="1.2" fill="none"/>
                  <path d="M46 40 Q44 24 46 12 Q48 2 54 0 Q60 -2 62 8 Q64 20 60 36" stroke="#5C3A1E" strokeWidth="1.2" fill="none"/>
                  <path d="M56 44 Q56 28 60 16 Q64 6 68 6 Q74 6 74 16 Q74 28 70 42" stroke="#5C3A1E" strokeWidth="1.2" fill="none"/>
                  <path d="M22 68 Q10 60 8 48 Q6 36 14 30 Q22 24 30 34" stroke="#5C3A1E" strokeWidth="1.2" fill="none"/>
                  <path d="M68 44 L76 36 L84 28" stroke="#8B4513" strokeWidth="1" strokeLinecap="round"/>
                  <line x1="84" y1="26" x2="72" y2="48" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.8rem", fontStyle: "italic", color: "rgba(92,58,30,0.25)" }}>
                  Fotoğraf eklenecek
                </p>
              </div>
            </div>

            {/* Altın şerit + imza */}
            <div className="mt-4 h-[2px] opacity-40" style={{ background: "linear-gradient(to right, transparent, #C9A84C, transparent)" }} aria-hidden="true"/>
            <p className="mt-3 text-center" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.78rem", fontStyle: "italic", letterSpacing: "0.1em", color: "rgba(92,58,30,0.4)" }}>
              Fatma Menteş · Çıplak Eller Atölyesi · İstanbul
            </p>
          </div>

          {/* Metin */}
          <div className="flex flex-col gap-7 pt-2 lg:pt-6">
            <p className="fm-reveal fm-d1 text-[0.65rem] tracking-[0.3em] uppercase" style={{ fontFamily: "'Cormorant Garamond', serif", color: "rgba(201,168,76,0.6)" }}>01 · Başlangıç</p>

            <h2 className="fm-reveal fm-d2" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.6rem, 4vw, 2.4rem)", fontWeight: 300, lineHeight: 1.2, color: "#1A0F0A" }}>
              Derilerin arasında büyüyen{" "}
              <em style={{ fontStyle: "italic", color: "#8B4513" }}>bir çocuk</em>
            </h2>

            {[
              <>Fatma Menteş, ellerinin hiçbir zaman boş kalmadığı bir ailede dünyaya geldi. Babası kunduracı, amcası saraç — <strong>deri kokusu, onun için evin kokusu oldu.</strong> İğnenin sesini öğrenmeden konuşmayı öğrendi.</>,
              <>Formal bir sanat eğitimi almadı. Onun atölyesi, <strong>hayatın kendisiydi.</strong> Osmanlı tezhip kitapları, Selçuklu kemer tokaları, İznik çini parçaları — bunları müzede değil, babasının tezgâhının üzerinde gördü.</>,
            ].map((paragraf, i) => (
              <p key={i} className={`fm-reveal fm-d${i + 3}`} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(0.88rem, 1.8vw, 1rem)", fontWeight: 300, lineHeight: 1.85, color: "rgba(92,58,30,0.72)" }}>
                {paragraf}
              </p>
            ))}

            {/* İstatistikler */}
            <div
              className="fm-reveal fm-d4 flex flex-wrap gap-6 py-6"
              style={{ borderTop: "1px solid rgba(201,168,76,0.15)", borderBottom: "1px solid rgba(201,168,76,0.15)" }}
              aria-label="Özet bilgiler"
            >
              {ISTATISTIKLER.map(({ rakam, aciklama }) => (
                <div key={aciklama}>
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2.2rem", fontWeight: 300, color: "#8B4513", lineHeight: 1 }}>{rakam}</p>
                  <p className="mt-1 text-[0.6rem] tracking-[0.16em] uppercase" style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(92,58,30,0.45)" }}>{aciklama}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════ 3. BİYOGRAFİ I — Koyu ══════════════════ */}
      <section
        aria-label="Biyografi — Yokluktan Ustalığa"
        className="relative overflow-hidden py-20 md:py-28 px-6 md:px-10"
        style={{ backgroundColor: "#1A0F0A", backgroundImage: GRAIN_DARK }}
      >
        {/* Dekoratif daire */}
        <svg aria-hidden="true" className="absolute -right-20 -top-20 opacity-[0.04] pointer-events-none"
             width="400" height="400" viewBox="0 0 400 400" fill="none">
          <circle cx="400" cy="0" r="350" stroke="#C9A84C" strokeWidth="0.5"/>
          <circle cx="400" cy="0" r="250" stroke="#C9A84C" strokeWidth="0.4"/>
          <circle cx="400" cy="0" r="150" stroke="#C9A84C" strokeWidth="0.5"/>
        </svg>

        <div className="relative z-10 max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          <div>
            <p className="fm-reveal fm-d1 text-[0.65rem] tracking-[0.3em] uppercase mb-6" style={{ fontFamily: "'Cormorant Garamond', serif", color: "rgba(201,168,76,0.4)" }}>02 · Yokluktan Ustalığa</p>
            <h2 className="fm-reveal fm-d2" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.8rem, 4.5vw, 2.8rem)", fontWeight: 300, lineHeight: 1.15, color: "#F5ECD7" }}>
              İmkânsızlık,{" "}
              <em style={{ fontStyle: "italic", color: "#C9A84C" }}>en iyi hoca oldu</em>
            </h2>
          </div>

          <div className="flex flex-col gap-6">
            {[
              <>Fatma Hanım, ustalarından öğrendiği tekniklerle yetinmedi. <strong style={{ fontWeight: 400, color: "rgba(245,236,215,0.85)" }}>Olmayan malzeme, olmayan alet</strong> — bunlar onu durdurmadı; aksine almaşık yollar bulmaya zorladı.</>,
              <>İtalya'dan gelen öğrencisi bir gün sordu: "Neden elektrik aleti kullanmıyorsunuz?" Fatma Hanım güldü. <strong style={{ fontWeight: 400, color: "rgba(245,236,215,0.85)" }}>"Makine, derinin ne hissettiğini bilmez"</strong>, dedi. "Ama elim bilir. Her milimetresini."</>,
              <>Rusya'dan, İspanya'dan, Japonya'dan geldi öğrencileri. Hiçbirinin Türkçesi yoktu, Fatma Hanım'ın da onların dili. <strong style={{ fontWeight: 400, color: "rgba(245,236,215,0.85)" }}>Ama el hareketleri evrenseldi.</strong> İğnenin gidişi, derinin direnişi — bunlar tercüman istemedi hiç.</>,
            ].map((paragraf, i) => (
              <p key={i} className={`fm-reveal fm-d${i + 2}`} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(0.88rem, 1.8vw, 1rem)", fontWeight: 300, lineHeight: 1.85, color: "rgba(245,236,215,0.6)" }}>
                {paragraf}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════ 4. ARAKAN ALINTISI ══════════════════ */}
      <section
        aria-label="Arakan Kampı Anekdotu — Sayfanın Duygusal Zirvesi"
        className="relative overflow-hidden py-24 md:py-32 px-6 md:px-10"
        style={{ backgroundColor: "#1A0F0A", backgroundImage: GRAIN_DARK, borderTop: "1px solid rgba(201,168,76,0.12)", borderBottom: "1px solid rgba(201,168,76,0.12)" }}
      >
        {/* Büyük tırnak */}
        <div
          aria-hidden="true"
          className="absolute top-4 left-4 md:left-10 pointer-events-none select-none"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(12rem, 30vw, 22rem)",
            fontWeight: 300,
            color: "rgba(201,168,76,0.07)",
            lineHeight: 0.8,
            fontStyle: "italic",
          }}
        >
          "
        </div>

        <div className="relative z-10 max-w-[900px] mx-auto text-center">
          {/* Etiket */}
          <div
            className="flex items-center justify-center gap-4 mb-10"
            style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.6rem", letterSpacing: "0.28em", textTransform: "uppercase", color: "rgba(201,168,76,0.5)" }}
          >
            <span className="block w-12 h-px" style={{ background: "rgba(201,168,76,0.3)" }} aria-hidden="true"/>
            Fatma Menteş · Anekdot
            <span className="block w-12 h-px" style={{ background: "rgba(201,168,76,0.3)" }} aria-hidden="true"/>
          </div>

          <blockquote
            className="fm-reveal fm-d1"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(1.35rem, 3.5vw, 2.2rem)",
              fontWeight: 300,
              fontStyle: "italic",
              lineHeight: 1.65,
              color: "#F5ECD7",
            }}
          >
            Arakan kampına gidecek bir hoca, "Hiçbir malzeme yok, nasıl öğretirim?"
            diye geldi kapıma. Masaya oturttum onu. Elime bir taş, bir parça deri aldım.{" "}
            <strong style={{ fontWeight: 400, color: "#C9A84C", fontStyle: "normal" }}>
              Taşla şekil verdim, tırnak ucu ile çizdim, dişi ile delik açtım.
            </strong>{" "}
            "Bak," dedim, "yokluk, derinin en saf hâlidir.
            Makinen olmayınca,{" "}
            <strong style={{ fontWeight: 400, color: "#C9A84C", fontStyle: "normal" }}>
              ellerin ne yapabileceğini keşfedersin.
            </strong>"
            O gün ağladı hoca. Ben de ağladım. Ama ikimiz de öğrendik.
          </blockquote>

          <p
            className="fm-reveal fm-d2 mt-8 tracking-[0.18em] uppercase text-[0.68rem]"
            style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(201,168,76,0.45)" }}
          >
            — Fatma Menteş, Çıplak Eller Atölyesi, İstanbul
          </p>
        </div>
      </section>

      {/* ══════════════════ 5. BİYOGRAFİ II — Parsömen ══════════════════ */}
      <section
        aria-label="Biyografi — Sıfır Atık Felsefesi"
        className="py-20 md:py-28 px-6 md:px-10"
        style={{ backgroundColor: "#F5ECD7", backgroundImage: GRAIN }}
      >
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
          <div>
            <p className="fm-reveal fm-d1 text-[0.65rem] tracking-[0.3em] uppercase mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", color: "rgba(201,168,76,0.6)" }}>03 · Sıfır Atık Felsefesi</p>
            <h2 className="fm-reveal fm-d2 mb-6" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.6rem, 4vw, 2.4rem)", fontWeight: 300, lineHeight: 1.2, color: "#1A0F0A" }}>
              Çöpe giden{" "}
              <em style={{ fontStyle: "italic", color: "#8B4513" }}>hiçbir deri yoktur</em>
            </h2>
            <p className="fm-reveal fm-d3" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(0.88rem, 1.8vw, 1rem)", fontWeight: 300, lineHeight: 1.85, color: "rgba(92,58,30,0.72)" }}>
              Matador arenasında can veren bir boğanın derisindeki ok izleri, başka bir atölyede "hata" sayılırdı. Fatma Hanım o izleri gördüğünde{" "}
              <strong style={{ fontWeight: 500, color: "#5C3A1E" }}>bir sehpa gördü.</strong> Yıllarca kullanılmış kemer parçalarında bir omuz çantası gördü. Bu sadece çevreci bir tercih değil —{" "}
              <strong style={{ fontWeight: 500, color: "#5C3A1E" }}>bir bakış açısı meselesi.</strong>
            </p>
          </div>

          <div className="flex flex-col gap-6">
            {/* Vurgu blok */}
            <div
              className="fm-reveal fm-d2 relative p-6 rounded-sm"
              style={{ background: "rgba(201,168,76,0.06)", border: "1px solid rgba(201,168,76,0.2)" }}
            >
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1rem, 2.2vw, 1.2rem)", fontWeight: 300, fontStyle: "italic", lineHeight: 1.7, color: "#5C3A1E" }}>
                "Topkapı Sarayı'ndaki Nalın-ı Şerif'i ilk gördüğümde ellerim titredi.
                Asırlar önce bir usta, o deriyle konuşmuş. Ben de aynı dille konuşmak istiyorum —
                makinelerin bilmediği dilde."
              </p>
            </div>

            <p className="fm-reveal fm-d3" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(0.88rem, 1.8vw, 1rem)", fontWeight: 300, lineHeight: 1.85, color: "rgba(92,58,30,0.72)" }}>
              Atölye dersleri de aynı felsefe üzerine kurulu. Öğrencilerin söyledikleri:{" "}
              <strong style={{ fontWeight: 500, color: "#5C3A1E" }}>"Ellerim çalışırken aklım durur. Ve ruhum dinlenir."</strong>
            </p>
          </div>
        </div>
      </section>

      {/* ══════════════════ 6. İKONOGRAFİ ══════════════════ */}
      <section
        aria-label="Atölyenin Dört Temel İlkesi"
        className="relative overflow-hidden py-20 md:py-28 px-6 md:px-10"
        style={{ backgroundColor: "#1A0F0A", backgroundImage: GRAIN_DARK }}
      >
        <svg aria-hidden="true" className="absolute -bottom-12 -left-12 opacity-[0.03] pointer-events-none"
             width="360" height="360" viewBox="0 0 360 360" fill="none">
          <circle cx="0" cy="360" r="300" stroke="#C9A84C" strokeWidth="0.5"/>
          <circle cx="0" cy="360" r="200" stroke="#C9A84C" strokeWidth="0.4"/>
        </svg>

        <div className="relative z-10 max-w-[1280px] mx-auto">
          <div className="text-center mb-16">
            <p className="mb-3 text-[0.62rem] tracking-[0.26em] uppercase" style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(201,168,76,0.5)" }}>Çıplak Eller Atölyesi</p>
            <h2 className="fm-reveal fm-d1" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 300, color: "#F5ECD7" }}>
              Dört <em style={{ fontStyle: "italic", color: "#C9A84C" }}>temel ilke</em>
            </h2>
          </div>

          <div
            className="grid grid-cols-2 md:grid-cols-4"
            style={{ border: "1px solid rgba(201,168,76,0.1)", borderRadius: "2px", overflow: "hidden", gap: "1px", background: "rgba(201,168,76,0.1)" }}
            role="list"
          >
            {ILKELER.map(({ baslik, aciklama, ikon }, i) => (
              <div
                key={baslik}
                className={`ilke-kart fm-reveal fm-d${i + 1} flex flex-col items-center text-center gap-5 p-8 md:p-10 transition-colors duration-350`}
                style={{ background: "rgba(26,15,10,0.6)" }}
                role="listitem"
              >
                <div
                  className="ilke-cember w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0 transition-colors duration-350"
                  style={{ border: "1px solid rgba(201,168,76,0.3)", background: "rgba(201,168,76,0.06)" }}
                >
                  {ikon}
                </div>
                <p
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "1.1rem", fontWeight: 400,
                    color: "#F5ECD7", lineHeight: 1.2,
                    whiteSpace: "pre-line",
                  }}
                >
                  {baslik}
                </p>
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.72rem", fontWeight: 300,
                    lineHeight: 1.65, color: "rgba(245,236,215,0.45)",
                  }}
                >
                  {aciklama}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════ 7. MANİFESTO KAPANIŞ ══════════════════ */}
      <section
        aria-label="Kapanış — Eserlere Davet"
        className="px-6 md:px-10 pb-28 md:pb-36"
        style={{ backgroundColor: "#1A0F0A", backgroundImage: GRAIN_DARK }}
      >
        <div
          className="max-w-[760px] mx-auto text-center pt-12"
          style={{ borderTop: "1px solid rgba(201,168,76,0.12)" }}
        >
          <p
            className="fm-reveal fm-d1 mb-10"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(1.5rem, 4vw, 2.4rem)",
              fontWeight: 300,
              fontStyle: "italic",
              lineHeight: 1.55,
              color: "rgba(245,236,215,0.75)",
            }}
          >
            "Her eser bir{" "}
            <strong style={{ fontStyle: "normal", fontWeight: 400, color: "#C9A84C" }}>emanet</strong>.
            Her dikiş bir{" "}
            <strong style={{ fontStyle: "normal", fontWeight: 400, color: "#C9A84C" }}>vasiyet</strong>.
            Her el izi, gelecek nesillere bırakılmış{" "}
            <strong style={{ fontStyle: "normal", fontWeight: 400, color: "#C9A84C" }}>sessiz bir mektuptur</strong>."
          </p>

          <div className="fm-reveal fm-d2 flex justify-center mb-10">
            <Ornament opacity={0.4} />
          </div>

          <div className="fm-reveal fm-d3 flex flex-wrap justify-center gap-4">
            <Link
              href="/eserler"
              className="cta-hover inline-flex items-center gap-3 px-8 py-4 rounded-sm transition-all duration-350"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.72rem", fontWeight: 500,
                letterSpacing: "0.2em", textTransform: "uppercase",
                textDecoration: "none", color: "#F5ECD7",
                border: "1px solid rgba(201,168,76,0.5)",
                background: "rgba(201,168,76,0.08)",
              }}
            >
              <svg aria-hidden="true" width="16" height="10" viewBox="0 0 16 10" fill="none">
                <path d="M1 5h14M10 1l5 4-5 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Eserleri Keşfet
            </Link>
            <Link
              href="/atolye"
              className="cta-hover inline-flex items-center gap-3 px-8 py-4 rounded-sm transition-all duration-350"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.72rem", fontWeight: 500,
                letterSpacing: "0.2em", textTransform: "uppercase",
                textDecoration: "none", color: "#F5ECD7",
                border: "1px solid rgba(201,168,76,0.25)",
                background: "transparent",
              }}
            >
              Atölye Dersleri
            </Link>
          </div>
        </div>
      </section>

      {/* Client-side reveal script */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            (function() {
              var obs = new IntersectionObserver(function(entries) {
                entries.forEach(function(e) {
                  if (e.isIntersecting) { e.target.classList.add('fm-in'); obs.unobserve(e.target); }
                });
              }, { threshold: 0.12 });
              document.querySelectorAll('.fm-reveal, .fm-reveal-left').forEach(function(el) { obs.observe(el); });
              window.addEventListener('load', function() {
                document.querySelectorAll('.fm-reveal, .fm-reveal-left').forEach(function(el) {
                  if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add('fm-in');
                });
              });
            })();
          `,
        }}
      />
    </>
  );
}
