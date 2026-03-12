/**
 * app/[locale]/eserler/[slug]/page.tsx
 * Fatma Menteş — Eser Detay Sayfası
 *
 * Rota: /eserler/[slug]  (ör: /eserler/seyir-defteri-tezhipli-deri)
 *
 * Özellikler:
 *  - Masaüstü: sticky fotoğraf galerisi ↔ kaydıran içerik (editorial split)
 *  - Kimlik Kartı: köşe tezhip motifleri, belge estetiği
 *  - "Bu Eseri Emanet Al" — duygusal CTA, müsait değilse devre dışı
 *  - Islak İmzalı Sertifika kutusu
 *  - Benzer eserler (aynı kategori, maks 3)
 *  - next/image hazır (şimdilik placeholder)
 *  - SEO: generateMetadata, JSON-LD (Product schema)
 *
 * Veri kaynağı: /data/eserler.json (statik JSON, Sanity'e geçilirse
 *               sadece getEser() fonksiyonu değiştirilir)
 */

import { notFound }     from "next/navigation";
import Link             from "next/link";
import type { Metadata } from "next";
import type { Eser }    from "@/types/eser";
import { KategoriMeta } from "@/types/eser";

/* ─── Veri erişimi ─── */
import eserlerData from "@/data/eserler.json";
const eserler = eserlerData as Eser[];

function getEser(slug: string): Eser | undefined {
  return eserler.find(e => e.slug === slug);
}

function getBenzerEserler(eser: Eser, maks = 3): Eser[] {
  return eserler
    .filter(e => e.kategori === eser.kategori && e.slug !== eser.slug)
    .slice(0, maks);
}

/* ─── SEO: Metadata ─── */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const eser = getEser(slug);
  if (!eser) return { title: "Eser Bulunamadı — Fatma Menteş" };

  return {
    title:       `${eser.isim} — Fatma Menteş | Derinin Hafızası`,
    description: eser.hikaye.slice(0, 155),
    openGraph: {
      title:       eser.isim,
      description: eser.hikaye.slice(0, 155),
      images:      eser.fotograflar[0]
        ? [{ url: `/images/eserler/${eser.fotograflar[0]}`, alt: eser.isim }]
        : [],
    },
  };
}

/* ─── Statik rotalar ─── */
export function generateStaticParams() {
  return eserler.map(e => ({ slug: e.slug }));
}

/* ─── Alt bileşenler ─── */

/** Tezhip köşe motifleri — kimlik kartı için */
function KKKoseMotifleri() {
  const positions = [
    { cls: "top-0 left-0",                          transform: "" },
    { cls: "top-0 right-0",                         transform: "scaleX(-1)" },
    { cls: "bottom-0 left-0",                       transform: "scaleY(-1)" },
    { cls: "bottom-0 right-0",                      transform: "scale(-1,-1)" },
  ] as const;

  return (
    <>
      {positions.map(({ cls, transform }, i) => (
        <svg
          key={i}
          aria-hidden="true"
          className={`absolute ${cls} opacity-[0.18] pointer-events-none`}
          style={{ transform }}
          width="40" height="40" viewBox="0 0 40 40" fill="none"
        >
          <path d="M0 0 L20 0 Q8 0 0 8 Z"  stroke="#C9A84C" strokeWidth="1" fill="none"/>
          <path d="M0 0 L14 0 Q4 0 0 6 Z"  stroke="#C9A84C" strokeWidth="0.5" fill="none"/>
          <circle cx="0" cy="0" r="28" stroke="#C9A84C" strokeWidth="0.5" fill="none"/>
        </svg>
      ))}
    </>
  );
}

/** Tezhip ornament çizgisi */
function OrnamentCizgi() {
  return (
    <svg aria-hidden="true" width="200" height="14" viewBox="0 0 200 14" fill="none">
      <line x1="0"   y1="7" x2="76"  y2="7" stroke="#C9A84C" strokeWidth="0.6" strokeOpacity="0.5"/>
      <circle cx="84"  cy="7" r="2.8" stroke="#C9A84C" strokeWidth="0.7" strokeOpacity="0.7" fill="none"/>
      <circle cx="100" cy="7" r="4.5" stroke="#C9A84C" strokeWidth="0.7" strokeOpacity="0.85" fill="none"/>
      <circle cx="100" cy="7" r="1.6" fill="#C9A84C" fillOpacity="0.65"/>
      <circle cx="116" cy="7" r="2.8" stroke="#C9A84C" strokeWidth="0.7" strokeOpacity="0.7" fill="none"/>
      <line x1="124" y1="7" x2="200" y2="7" stroke="#C9A84C" strokeWidth="0.6" strokeOpacity="0.5"/>
    </svg>
  );
}

/** Deri çanta SVG ikonu (sepet butonu için) */
function BagIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none"
         stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"
         aria-hidden="true">
      <path d="M2 4 L3.2 13 Q3.3 14.2 4.5 14.2 L13.5 14.2 Q14.7 14.2 14.8 13 L16 4 Z"/>
      <path d="M6 4 Q6 1.5 9 1.5 Q12 1.5 12 4"/>
      <line x1="3.5" y1="7" x2="14.5" y2="7" strokeOpacity="0.6"/>
    </svg>
  );
}

/* ─── ANA SAYFA BİLEŞENİ ─── */
export default async function EserDetayPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug } = await params;
  const eser = getEser(slug);
  if (!eser) notFound();

  const benzerler = getBenzerEserler(eser);
  const kategoriMeta = KategoriMeta[eser.kategori];
  const fiyatStr = eser.fiyat.toLocaleString("tr-TR") + " ₺";

  return (
    <>
      {/* ── JSON-LD Product Schema ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type":    "Product",
            "name":     eser.isim,
            "description": eser.hikaye,
            "brand": { "@type": "Brand", "name": "Fatma Menteş" },
            "offers": {
              "@type":         "Offer",
              "price":         eser.fiyat,
              "priceCurrency": "TRY",
              "availability":  eser.musait
                ? "https://schema.org/InStock"
                : "https://schema.org/SoldOut",
            },
          }),
        }}
      />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=DM+Sans:wght@300;400;500&display=swap');

        .emanet-btn-hover:hover:not(:disabled) {
          background: #1A0F0A !important;
          border-color: #C9A84C !important;
          color: #C9A84C !important;
          box-shadow: 0 4px 24px rgba(26,15,10,0.18), 0 0 0 1px rgba(201,168,76,0.3);
          transform: translateY(-1px);
        }
        .emanet-btn-hover:active { transform: translateY(0); }
        .emanet-btn-hover:focus-visible {
          outline: none;
          box-shadow: 0 0 0 3px rgba(201,168,76,0.5);
        }

        .thumb-btn.active-thumb { border-color: #C9A84C; }
        .thumb-btn:hover        { border-color: rgba(201,168,76,0.5); }

        .benzer-link:hover {
          border-color: rgba(201,168,76,0.4);
          transform: translateY(-2px);
        }
        .nav-link-hover:hover { color: #C9A84C; }
        .sert-imza-link:hover { text-decoration-color: rgba(139,69,19,0.5); color: #8B4513; }
      `}</style>

      {/* ── BREADCRUMB ── */}
      <nav
        aria-label="Sayfa konumu"
        className="max-w-[1280px] mx-auto px-6 md:px-10 pt-20 md:pt-24
                   flex flex-wrap items-center gap-2"
        style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.65rem", letterSpacing: "0.14em" }}
      >
        {[
          { href: "/",              label: "Ana Sayfa" },
          { href: "/eserler",       label: "Eserler"   },
          { href: `/eserler?kategori=${eser.kategori}`, label: kategoriMeta.etiket },
        ].map(({ href, label }) => (
          <span key={href} className="flex items-center gap-2">
            <Link
              href={href}
              className="nav-link-hover uppercase transition-colors duration-200"
              style={{ color: "rgba(92,58,30,0.55)", textDecoration: "none" }}
            >
              {label}
            </Link>
            <span aria-hidden="true" style={{ color: "rgba(201,168,76,0.4)" }}>·</span>
          </span>
        ))}
        <span
          aria-current="page"
          className="uppercase"
          style={{ color: "#5C3A1E" }}
        >
          {eser.isim}
        </span>
      </nav>

      {/* ── DETAY LAYOUT ── */}
      <div className="max-w-[1280px] mx-auto px-6 md:px-10 py-8
                      grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

        {/* ══ SOL: GALERİ (sticky) ══ */}
        <div className="flex flex-col gap-4 lg:sticky lg:top-20">

          {/* Ana görsel */}
          <div
            className="relative overflow-hidden rounded-sm border"
            style={{
              aspectRatio: "4/5",
              background: "rgba(92,58,30,0.07)",
              borderColor: "rgba(92,58,30,0.1)",
            }}
            role="img"
            aria-label={`${eser.isim} — ana görsel`}
          >
            {/* Köşe tezhip (üst-sol, alt-sağ) */}
            {["tl", "br"].map((pos) => (
              <svg
                key={pos}
                aria-hidden="true"
                className={`absolute pointer-events-none opacity-[0.35] ${
                  pos === "tl" ? "top-3 left-3" : "bottom-3 right-3"
                }`}
                style={pos === "br" ? { transform: "rotate(180deg)" } : {}}
                width="48" height="48" viewBox="0 0 48 48" fill="none"
              >
                <path d="M0 0 L28 0 Q12 0 0 12 Z" stroke="#C9A84C" strokeWidth="0.8" fill="none" opacity="0.5"/>
                <circle cx="0" cy="0" r="36" stroke="#C9A84C" strokeWidth="0.5" fill="none" opacity="0.35"/>
              </svg>
            ))}

            {/*
              GÖRSEL YERİ:
              Gerçek fotoğraf eklendiğinde aşağıdaki placeholder'ı kaldırıp
              <Image> bileşenini açın:

              import Image from "next/image";
              <Image
                src={`/images/eserler/${eser.fotograflar[0]}`}
                alt={eser.isim}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            */}
            <div className="w-full h-full flex flex-col items-center justify-center gap-4">
              <svg width="80" height="80" viewBox="0 0 24 24" fill="none"
                   stroke="#8B4513" strokeWidth="0.7" style={{ opacity: 0.1 }}
                   aria-hidden="true">
                <path d="M12 2 L13.8 8.2 L20.4 8.2 L15 12.1 L16.8 18.3 L12 14.4 L7.2 18.3 L9 12.1 L3.6 8.2 L10.2 8.2 Z"/>
                <circle cx="12" cy="12" r="10" strokeOpacity="0.3"/>
              </svg>
              <p style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "0.85rem", fontStyle: "italic",
                color: "rgba(92,58,30,0.25)", letterSpacing: "0.06em",
              }}>
                Fotoğraf eklenecek
              </p>
            </div>

            {/* Sayac */}
            <span
              className="absolute bottom-3 right-3 text-[10px] tracking-widest uppercase px-2 py-1 rounded-sm"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                color: "rgba(92,58,30,0.4)",
                background: "rgba(245,236,215,0.85)",
                backdropFilter: "blur(4px)",
              }}
              aria-label={`${eser.fotograflar.length} fotoğraftan 1.si`}
            >
              1 / {eser.fotograflar.length}
            </span>
          </div>

          {/* Thumbnail şeridi */}
          {eser.fotograflar.length > 1 && (
            <div
              className="flex gap-2 overflow-x-auto pb-1"
              style={{ scrollbarWidth: "none" }}
              role="list"
              aria-label="Diğer fotoğraflar"
            >
              {eser.fotograflar.map((foto, i) => (
                <button
                  key={foto}
                  className={`thumb-btn flex-shrink-0 flex items-center justify-center
                              border rounded-sm transition-colors duration-300
                              ${i === 0 ? "active-thumb" : ""}`}
                  style={{
                    width: 72, aspectRatio: "1",
                    background: "rgba(92,58,30,0.06)",
                    borderColor: i === 0 ? "#C9A84C" : "rgba(92,58,30,0.12)",
                  }}
                  aria-label={`${i + 1}. fotoğraf`}
                  aria-pressed={i === 0}
                  role="listitem"
                >
                  <span
                    aria-hidden="true"
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "0.7rem", color: "rgba(92,58,30,0.25)",
                    }}
                  >
                    {i + 1}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ══ SAĞ: İÇERİK ══ */}
        <div className="flex flex-col gap-8">

          {/* Üst etiketler */}
          <div className="flex items-center flex-wrap gap-3">
            <span
              className="text-[0.62rem] font-medium tracking-[0.18em] uppercase px-3 py-1 rounded-sm"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                color: "#C9A84C",
                border: "1px solid rgba(201,168,76,0.35)",
                background: "rgba(201,168,76,0.07)",
              }}
            >
              {kategoriMeta.etiket}
            </span>
            <span
              className="text-[0.6rem] tracking-[0.12em] uppercase px-2 py-1 rounded-sm"
              role="status"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                ...(eser.musait
                  ? { color: "rgba(46,107,138,0.9)", background: "rgba(46,107,138,0.08)", border: "1px solid rgba(46,107,138,0.25)" }
                  : { color: "rgba(92,58,30,0.5)",   background: "rgba(92,58,30,0.06)",   border: "1px solid rgba(92,58,30,0.15)" }
                ),
              }}
            >
              {eser.musait ? "Müsait" : "Emanet Buldu"}
            </span>
          </div>

          {/* Eser adı */}
          <div>
            <h1
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(2rem, 5vw, 3.2rem)",
                fontWeight: 300, lineHeight: 1.1,
                color: "#1A0F0A", letterSpacing: "-0.01em",
              }}
            >
              {eser.isim}
            </h1>
            <div className="mt-4 mb-0">
              <OrnamentCizgi />
            </div>
          </div>

          {/* Hikâye */}
          <blockquote
            cite="Fatma Menteş"
            className="pl-5"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(1.05rem, 2vw, 1.2rem)",
              fontWeight: 300, fontStyle: "italic",
              lineHeight: 1.75, color: "rgba(92,58,30,0.75)",
              borderLeft: "2px solid rgba(201,168,76,0.4)",
            }}
          >
            {eser.hikaye}
          </blockquote>

          {/* ─── KİMLİK KARTI ─── */}
          <div
            className="relative overflow-hidden rounded-sm p-7"
            style={{
              border: "1px solid rgba(201,168,76,0.3)",
              background: "rgba(201,168,76,0.04)",
            }}
            aria-label="Eser Kimlik Kartı"
          >
            <KKKoseMotifleri />

            {/* Başlık */}
            <div className="flex items-center gap-3 mb-5 relative z-10">
              <span
                className="text-[0.62rem] font-medium tracking-[0.22em] uppercase"
                style={{ fontFamily: "'DM Sans', sans-serif", color: "#C9A84C" }}
              >
                Kimlik Kartı
              </span>
              <div
                className="flex-1 h-px"
                style={{ background: "linear-gradient(to right, rgba(201,168,76,0.4), transparent)" }}
                aria-hidden="true"
              />
              <svg aria-hidden="true" width="14" height="14" viewBox="0 0 14 14" fill="none">
                <circle cx="7" cy="7" r="6" stroke="#C9A84C" strokeWidth="0.8" strokeOpacity="0.6"/>
                <circle cx="7" cy="7" r="2.5" fill="#C9A84C" fillOpacity="0.5"/>
              </svg>
            </div>

            {/* Satırlar */}
            <dl className="flex flex-col gap-4 relative z-10">

              {/* Deri */}
              <div className="grid gap-3" style={{ gridTemplateColumns: "7rem 1fr" }}>
                <dt
                  className="text-[0.6rem] font-medium tracking-[0.18em] uppercase pt-[2px]"
                  style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(201,168,76,0.7)" }}
                >
                  Kullanılan Deri
                </dt>
                <dd
                  className="text-[0.82rem] font-light leading-relaxed"
                  style={{ fontFamily: "'DM Sans', sans-serif", color: "#5C3A1E" }}
                >
                  <strong className="font-medium" style={{ color: "#1A0F0A" }}>
                    {eser.kimlik.deri}
                  </strong>
                  <br/>
                  <span style={{ color: "rgba(92,58,30,0.55)", fontSize: "0.75rem" }}>
                    Kimyasal işlem yok · Doğal soluma
                  </span>
                </dd>
              </div>

              {/* Sanat */}
              <div className="grid gap-3" style={{ gridTemplateColumns: "7rem 1fr" }}>
                <dt
                  className="text-[0.6rem] font-medium tracking-[0.18em] uppercase pt-[2px]"
                  style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(201,168,76,0.7)" }}
                >
                  Uygulanan Sanat
                </dt>
                <dd>
                  <div className="flex flex-wrap gap-1.5">
                    {eser.kimlik.sanat.map(teknik => (
                      <span
                        key={teknik}
                        className="text-[0.65rem] font-light px-2 py-1 rounded-sm"
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          color: "#5C3A1E",
                          border: "1px solid rgba(92,58,30,0.2)",
                          background: "rgba(92,58,30,0.04)",
                          letterSpacing: "0.04em",
                        }}
                      >
                        {teknik}
                      </span>
                    ))}
                  </div>
                </dd>
              </div>

              {/* Boyut */}
              {eser.boyut && (
                <div className="grid gap-3" style={{ gridTemplateColumns: "7rem 1fr" }}>
                  <dt
                    className="text-[0.6rem] font-medium tracking-[0.18em] uppercase pt-[2px]"
                    style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(201,168,76,0.7)" }}
                  >
                    Boyut
                  </dt>
                  <dd
                    className="text-[0.82rem] font-light"
                    style={{ fontFamily: "'DM Sans', sans-serif", color: "#5C3A1E" }}
                  >
                    {eser.boyut}
                  </dd>
                </div>
              )}
            </dl>

            {/* Emek vurgu */}
            <div
              className="flex items-start gap-3 mt-5 pt-5 relative z-10"
              style={{ borderTop: "1px solid rgba(201,168,76,0.15)" }}
            >
              <svg aria-hidden="true" className="flex-shrink-0 mt-[2px]"
                   width="20" height="20" viewBox="0 0 20 20" fill="none">
                <circle cx="10" cy="10" r="9" stroke="#C9A84C" strokeWidth="0.8" strokeOpacity="0.5"/>
                <path d="M10 5 L10 10.5 L13.5 13" stroke="#C9A84C" strokeWidth="1" strokeLinecap="round" strokeOpacity="0.8"/>
              </svg>
              <p
                className="leading-relaxed"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "0.95rem", fontStyle: "italic",
                  color: "rgba(92,58,30,0.65)",
                }}
              >
                {eser.kimlik.emek}
              </p>
            </div>

            {/* Elektrik yok */}
            <div
              className="flex items-center gap-2 mt-4 relative z-10 text-[0.6rem] tracking-[0.12em] uppercase"
              style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(92,58,30,0.4)" }}
              aria-label="Elektriksiz üretim — saf el gücü"
            >
              <svg aria-hidden="true" width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M5 3 L5 7" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
                <path d="M9 3 L9 7" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
                <path d="M3.5 7 L10.5 7 L10.5 9 Q10.5 11 7 11 Q3.5 11 3.5 9 Z" stroke="currentColor" strokeWidth="0.8" fill="none"/>
                <path d="M7 11 L7 13" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round"/>
                <line x1="1" y1="1" x2="13" y2="13" stroke="#C9A84C" strokeWidth="1" strokeLinecap="round" opacity="0.7"/>
              </svg>
              Elektriksiz Üretim · Saf El Gücü
            </div>
          </div>

          {/* ─── FİYAT + CTA ─── */}
          <div className="flex flex-col gap-5">
            <div>
              <div className="flex items-baseline gap-2">
                <span
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "clamp(2.2rem, 5vw, 3rem)",
                    fontWeight: 300, color: "#1A0F0A", lineHeight: 1,
                  }}
                  aria-label={`${fiyatStr} fiyatı`}
                >
                  {fiyatStr}
                </span>
              </div>
              <p
                className="mt-1 text-[0.78rem] font-light"
                style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(92,58,30,0.45)", letterSpacing: "0.06em" }}
              >
                Kargo dahil · Islak imzalı sertifika ile birlikte gönderilir
              </p>
            </div>

            {/* CTA */}
            <button
              className="emanet-btn-hover w-full flex items-center justify-center gap-3
                         rounded-sm transition-all duration-350"
              disabled={!eser.musait}
              aria-label={
                eser.musait
                  ? `"${eser.isim}" eserini emanet al`
                  : "Bu eser artık başkasının emanetinde"
              }
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "1.15rem", fontWeight: 400, fontStyle: "italic",
                letterSpacing: "0.06em", padding: "1.1rem 2rem",
                color: eser.musait ? "#F5ECD7" : "rgba(92,58,30,0.35)",
                background: eser.musait ? "#5C3A1E" : "rgba(92,58,30,0.1)",
                border: "1px solid transparent",
                cursor: eser.musait ? "pointer" : "not-allowed",
              }}
            >
              <BagIcon />
              {eser.musait ? "Bu Eseri Emanet Al" : "Emanet Buldu"}
            </button>

            {eser.musait && (
              <p
                className="text-center text-[0.68rem] font-light leading-relaxed"
                style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(92,58,30,0.45)" }}
              >
                Sipariş öncesinde Fatma Usta ile iletişim kurulur.{" "}
                <a
                  href="mailto:info@fatmamentesart.com"
                  className="sert-imza-link underline transition-colors duration-200"
                  style={{ color: "#8B4513", textUnderlineOffset: "3px", textDecorationColor: "rgba(139,69,19,0.3)" }}
                >
                  info@fatmamentesart.com
                </a>
              </p>
            )}
          </div>

          {/* ─── SERTİFİKA KUTUSU ─── */}
          <div
            className="relative overflow-hidden rounded-sm p-6"
            style={{
              border: "1px solid rgba(201,168,76,0.25)",
              background: "linear-gradient(135deg, rgba(201,168,76,0.06) 0%, transparent 50%)",
            }}
            aria-label="Gerçeklik Sertifikası Bilgisi"
          >
            {/* Watermark */}
            <svg
              className="absolute top-1/2 right-[-1rem] -translate-y-1/2 pointer-events-none"
              style={{ opacity: 0.04 }}
              width="120" height="120" viewBox="0 0 120 120" fill="none"
              aria-hidden="true"
            >
              <circle cx="60" cy="60" r="55" stroke="#C9A84C" strokeWidth="1"/>
              <circle cx="60" cy="60" r="45" stroke="#C9A84C" strokeWidth="0.5"/>
              <path d="M60 20 L65 38 L84 38 L70 49 L75 67 L60 56 L45 67 L50 49 L36 38 L55 38 Z"
                    stroke="#C9A84C" strokeWidth="0.5" fill="none"/>
            </svg>

            <div className="relative z-10 flex gap-4 items-start">
              {/* Mühür */}
              <div
                className="flex-shrink-0 w-14 h-14 rounded-full flex items-center justify-center"
                style={{ border: "1px solid rgba(201,168,76,0.4)", background: "rgba(201,168,76,0.06)" }}
                aria-hidden="true"
              >
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <circle cx="14" cy="14" r="12" stroke="#C9A84C" strokeWidth="1" strokeOpacity="0.8"/>
                  <circle cx="14" cy="14" r="7"  stroke="#C9A84C" strokeWidth="0.6" strokeOpacity="0.5"/>
                  <path d="M9.5 14 L12.5 17 L18.5 11" stroke="#C9A84C" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>

              {/* Metin */}
              <div>
                <p
                  className="font-semibold mb-1"
                  style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem", letterSpacing: "0.04em", color: "#1A0F0A" }}
                >
                  Islak İmzalı Gerçeklik Sertifikası
                </p>
                <p
                  className="text-[0.75rem] font-light leading-relaxed"
                  style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(92,58,30,0.6)" }}
                >
                  Bu eserle birlikte, Fatma Menteş'in ıslak imzasını taşıyan{" "}
                  <strong className="font-medium" style={{ color: "#5C3A1E" }}>
                    dijital ve fiziksel Sıfır Atık · El İşçiliği Gerçeklik Sertifikası
                  </strong>{" "}
                  gönderilir. Sertifika; deri türünü, sanat tekniklerini ve emek saatini belgeler.
                </p>
                <p
                  className="mt-3 text-[0.8rem] italic"
                  style={{ fontFamily: "'Cormorant Garamond', serif", color: "rgba(201,168,76,0.75)", letterSpacing: "0.05em" }}
                >
                  — Fatma Menteş, Çıplak Eller Atölyesi
                </p>
              </div>
            </div>
          </div>

        </div>{/* /icerik-blok */}
      </div>{/* /detay-layout */}

      {/* ═══════════ BENZER ESERLER ═══════════ */}
      {benzerler.length > 0 && (
        <section
          className="max-w-[1280px] mx-auto px-6 md:px-10 pb-20"
          aria-label="Benzer Eserler"
        >
          <div className="flex items-baseline gap-4 mb-8">
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(1.4rem, 3vw, 2rem)",
                fontWeight: 300, color: "#1A0F0A",
              }}
            >
              {kategoriMeta.etiket} Koleksiyonundan
            </h2>
            <div
              className="flex-1 h-px"
              style={{ background: "linear-gradient(to right, rgba(201,168,76,0.3), transparent)" }}
              aria-hidden="true"
            />
            <Link
              href={`/eserler?kategori=${eser.kategori}`}
              className="nav-link-hover text-[0.62rem] tracking-[0.16em] uppercase whitespace-nowrap transition-colors duration-200"
              style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(92,58,30,0.45)", textDecoration: "none" }}
            >
              Tümünü Gör →
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {benzerler.map(b => (
              <Link
                key={b.slug}
                href={`/eserler/${b.slug}`}
                className="benzer-link block rounded-sm overflow-hidden transition-all duration-350"
                style={{
                  border: "1px solid rgba(92,58,30,0.1)",
                  background: "rgba(245,236,215,0.5)",
                  textDecoration: "none",
                }}
                aria-label={b.isim}
              >
                <div
                  className="flex items-center justify-center"
                  style={{ aspectRatio: "1", background: "rgba(92,58,30,0.06)" }}
                  aria-hidden="true"
                >
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none"
                       stroke="#8B4513" strokeWidth="0.7" style={{ opacity: 0.1 }}>
                    <path d="M12 2 L13.8 8.2 L20.4 8.2 L15 12.1 L16.8 18.3 L12 14.4 L7.2 18.3 L9 12.1 L3.6 8.2 L10.2 8.2 Z"/>
                  </svg>
                </div>
                <div className="p-3">
                  <p
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "0.98rem", fontWeight: 300,
                      color: "#1A0F0A", lineHeight: 1.25, marginBottom: "0.25rem",
                    }}
                  >
                    {b.isim}
                  </p>
                  <p
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.7rem", fontWeight: 300,
                      color: "rgba(92,58,30,0.5)",
                    }}
                  >
                    {b.fiyat.toLocaleString("tr-TR")} ₺
                    {" · "}
                    {b.musait ? "Müsait" : "Emanet Buldu"}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
