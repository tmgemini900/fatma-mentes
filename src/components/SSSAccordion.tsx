"use client";

/**
 * components/SSSAccordion.tsx
 * Fatma Menteş — Sıkça Sorulan Sorular Accordion
 *
 * Özellikler:
 *   - Radix bağımlılığı yok — saf React state
 *   - Tek seferde tek panel açık (exclusive mode)
 *   - WCAG 2.2 AA: aria-expanded, aria-controls, id/aria-labelledby, role="region"
 *   - Klavye: Enter/Space açma, ESC kapama
 *   - CSS max-height ile smooth animasyon (JS yükseklik ölçümü ile)
 *   - Tasarım: Cormorant Garamond + DM Sans, parsömen zemin
 *
 * Kullanım:
 *   import SSSAccordion from "@/components/SSSAccordion";
 *
 *   const SORULAR = [
 *     { id: "s1", soru: "...", cevap: "...", cevapBold: ["...", "..."] }
 *   ];
 *   <SSSAccordion sorular={SORULAR} />
 */

import { useState, useRef, useEffect, KeyboardEvent } from "react";

/* ─── Tipler ─── */
export interface SSSSorusu {
  id:        string;
  soru:      string;
  cevap:     string;       // Düz metin gövdesi
  cevapBold?: string[];    // Bu stringler <strong> ile sarılır
}

interface Props {
  sorular:   readonly SSSSorusu[];
  baslik?:   string;       // Varsayılan: "Sıkça Sorulan Sorular"
  altBaslik?: string;
}

/* ─── Tek Accordion Öğesi ─── */
function AccordionItem({
  soru,
  index,
  acik,
  onToggle,
}: {
  soru: SSSSorusu;
  index: number;
  acik: boolean;
  onToggle: () => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const [yukseklik, setYukseklik] = useState<number>(0);

  /* Gerçek yüksekliği ölç — max-height animasyonu için */
  useEffect(() => {
    if (!panelRef.current) return;
    const observer = new ResizeObserver(() => {
      if (panelRef.current) {
        setYukseklik(panelRef.current.scrollHeight);
      }
    });
    observer.observe(panelRef.current);
    setYukseklik(panelRef.current.scrollHeight);
    return () => observer.disconnect();
  }, []);

  /* Klavye kontrolü */
  function klavyeIsle(e: KeyboardEvent<HTMLButtonElement>) {
    if (e.key === "Escape" && acik) {
      onToggle();
      (e.currentTarget as HTMLButtonElement).focus();
    }
  }

  /* Kalın metin render */
  function cevapRender(metin: string, boldler: string[] = []) {
    if (!boldler.length) return metin;
    const parca = boldler.reduce<(string | JSX.Element)[]>(
      (acc, bold, i) => {
        const yeni: (string | JSX.Element)[] = [];
        acc.forEach(parcaItem => {
          if (typeof parcaItem !== "string") { yeni.push(parcaItem); return; }
          const bolunmus = parcaItem.split(bold);
          bolunmus.forEach((s, j) => {
            yeni.push(s);
            if (j < bolunmus.length - 1) {
              yeni.push(
                <strong key={`${i}-${j}`} style={{ fontWeight: 500, color: "#5C3A1E" }}>
                  {bold}
                </strong>
              );
            }
          });
        });
        return yeni;
      },
      [metin]
    );
    return parca;
  }

  const btnId   = `sss-btn-${soru.id}`;
  const panelId = `sss-panel-${soru.id}`;

  return (
    <div
      style={{ borderBottom: "1px solid rgba(92,58,30,0.12)" }}
      className={`accordion-item${acik ? " accordion-item--acik" : ""}`}
    >
      {/* Soru butonu */}
      <button
        id={btnId}
        aria-expanded={acik}
        aria-controls={panelId}
        onClick={onToggle}
        onKeyDown={klavyeIsle}
        className="sss-btn"
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1rem",
          padding: "1.25rem 0",
          background: "none",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
        }}
      >
        <span
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(1rem, 2.2vw, 1.15rem)",
            fontWeight: 400,
            color: acik ? "#8B4513" : "#1A0F0A",
            lineHeight: 1.35,
            transition: "color 0.3s",
          }}
        >
          {soru.soru}
        </span>

        {/* + / × ikonu */}
        <span
          aria-hidden="true"
          style={{
            flexShrink: 0,
            width: "24px",
            height: "24px",
            borderRadius: "50%",
            border: `1px solid ${acik ? "rgba(201,168,76,0.6)" : "rgba(92,58,30,0.2)"}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transform: acik ? "rotate(45deg)" : "rotate(0deg)",
            transition: "transform 0.35s cubic-bezier(0.4,0,0.2,1), border-color 0.3s",
          }}
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path
              d="M5 2 L5 8 M2 5 L8 5"
              stroke={acik ? "#C9A84C" : "currentColor"}
              strokeWidth="1.2"
              strokeLinecap="round"
              style={{ transition: "stroke 0.3s" }}
            />
          </svg>
        </span>
      </button>

      {/* Cevap paneli */}
      <div
        id={panelId}
        role="region"
        aria-labelledby={btnId}
        ref={panelRef}
        style={{
          overflow: "hidden",
          maxHeight: acik ? `${yukseklik}px` : "0px",
          transition: "max-height 0.4s cubic-bezier(0.4,0,0.2,1)",
        }}
      >
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.88rem",
            fontWeight: 300,
            lineHeight: 1.85,
            color: "rgba(92,58,30,0.65)",
            paddingBottom: "1.5rem",
            paddingRight: "2.5rem",
          }}
        >
          {cevapRender(soru.cevap, soru.cevapBold)}
        </p>
      </div>
    </div>
  );
}

/* ─── Ana Bileşen ─── */
export default function SSSAccordion({
  sorular,
  baslik = "Sıkça Sorulan Sorular",
  altBaslik,
}: Props) {
  const [acikId, setAcikId] = useState<string | null>(null);

  function toggle(id: string) {
    setAcikId(prev => (prev === id ? null : id));
  }

  return (
    <section
      aria-label="Sıkça Sorulan Sorular"
      style={{
        backgroundColor: "#F5ECD7",
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23n)' opacity='0.055'/%3E%3C/svg%3E")`,
        padding: "5rem 1.5rem 7rem",
      }}
    >
      <style>{`
        .sss-btn:focus-visible {
          outline: 2px solid #C9A84C;
          outline-offset: 2px;
          border-radius: 2px;
        }
        @media (min-width: 768px) {
          section[aria-label="Sıkça Sorulan Sorular"] {
            padding: 7rem 2.5rem 9rem;
          }
        }
      `}</style>

      <div style={{ maxWidth: "760px", margin: "0 auto" }}>

        {/* Başlık */}
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
              fontWeight: 300,
              color: "#1A0F0A",
              lineHeight: 1.2,
            }}
          >
            {baslik.split(" ").map((kelime, i, arr) =>
              i === arr.length - 1 ? (
                <em key={i} style={{ fontStyle: "italic", color: "#8B4513" }}>
                  {" "}{kelime}
                </em>
              ) : (
                <span key={i}>{kelime} </span>
              )
            )}
          </h2>
          {altBaslik && (
            <p
              style={{
                marginTop: "0.75rem",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.85rem",
                fontWeight: 300,
                color: "rgba(92,58,30,0.5)",
                letterSpacing: "0.04em",
              }}
            >
              {altBaslik}
            </p>
          )}
        </div>

        {/* Accordion listesi */}
        <div role="list">
          {sorular.map((soru, index) => (
            <div key={soru.id} role="listitem">
              <AccordionItem
                soru={soru}
                index={index}
                acik={acikId === soru.id}
                onToggle={() => toggle(soru.id)}
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

/* ─── Tip dışa aktarımı ─── */
export type { Props as SSSAccordionProps };
