/**
 * app/[locale]/eserler/page.tsx
 * Fatma Menteş — Eserler Listesi Sayfası
 */

import Link from "next/link";
import type { Metadata } from "next";
import type { Eser } from "@/types/eser";
import eserlerData from "@/data/eserler.json";

const eserler = eserlerData as Eser[];

export const metadata: Metadata = {
  title: "Eserler — Fatma Menteş | Derinin Hafızası",
  description:
    "El yapımı, sıfır atık deri eserler. Her biri ıslak imzalı sertifika ile teslim edilir.",
};

export default function EserlerPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "#F5ECD7",
        paddingTop: "6rem",
        paddingBottom: "4rem",
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 2rem" }}>
        {/* Başlık */}
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <h1
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: 300,
              letterSpacing: "0.06em",
              color: "#5C3A1E",
              marginBottom: "0.75rem",
            }}
          >
            Eserler
          </h1>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.85rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "rgba(92,58,30,0.45)",
            }}
          >
            El yapımı · Sıfır atık · Islak imzalı sertifika
          </p>
          <svg
            style={{ margin: "1.5rem auto 0", display: "block" }}
            width="200"
            height="14"
            viewBox="0 0 200 14"
            fill="none"
            aria-hidden="true"
          >
            <line x1="0" y1="7" x2="76" y2="7" stroke="#C9A84C" strokeWidth="0.6" strokeOpacity="0.5" />
            <circle cx="100" cy="7" r="4.5" stroke="#C9A84C" strokeWidth="0.7" strokeOpacity="0.85" fill="none" />
            <circle cx="100" cy="7" r="1.6" fill="#C9A84C" fillOpacity="0.65" />
            <line x1="124" y1="7" x2="200" y2="7" stroke="#C9A84C" strokeWidth="0.6" strokeOpacity="0.5" />
          </svg>
        </div>

        {/* Eser kartları */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "2rem",
          }}
        >
          {eserler.map((eser) => (
            <Link
              key={eser.slug}
              href={`/eserler/${eser.slug}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <article
                style={{
                  border: "1px solid rgba(201,168,76,0.2)",
                  borderRadius: "2px",
                  overflow: "hidden",
                  backgroundColor: "rgba(255,255,255,0.5)",
                  cursor: "pointer",
                }}
              >
                {/* Fotoğraf placeholder */}
                <div
                  style={{
                    width: "100%",
                    aspectRatio: "4/3",
                    backgroundColor: "rgba(92,58,30,0.08)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  aria-hidden="true"
                >
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                    <rect x="4" y="8" width="40" height="32" rx="2" stroke="#C9A84C" strokeWidth="0.8" strokeOpacity="0.4" fill="none" />
                    <circle cx="16" cy="19" r="4" stroke="#C9A84C" strokeWidth="0.8" strokeOpacity="0.4" fill="none" />
                    <path d="M4 32 L14 22 L22 30 L30 22 L44 36" stroke="#C9A84C" strokeWidth="0.8" strokeOpacity="0.4" fill="none" />
                  </svg>
                </div>

                {/* İçerik */}
                <div style={{ padding: "1.25rem" }}>
                  <h2
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "1.2rem",
                      fontWeight: 300,
                      letterSpacing: "0.04em",
                      color: "#5C3A1E",
                      marginBottom: "0.5rem",
                    }}
                  >
                    {eser.isim}
                  </h2>
                  <p
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.75rem",
                      color: "rgba(92,58,30,0.55)",
                      lineHeight: 1.6,
                      marginBottom: "1rem",
                    }}
                  >
                    {eser.hikaye.slice(0, 100)}…
                  </p>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span
                      style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: "1.1rem",
                        fontWeight: 400,
                        color: "#C9A84C",
                      }}
                    >
                      {eser.fiyat.toLocaleString("tr-TR")} ₺
                    </span>
                    <span
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "0.6rem",
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                        color: eser.musait ? "rgba(92,58,30,0.45)" : "rgba(201,100,100,0.7)",
                        border: `1px solid ${eser.musait ? "rgba(92,58,30,0.2)" : "rgba(201,100,100,0.3)"}`,
                        padding: "0.25rem 0.6rem",
                      }}
                    >
                      {eser.musait ? "Müsait" : "Emanette"}
                    </span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
