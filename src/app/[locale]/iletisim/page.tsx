"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

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

export default function IletisimPage() {
  const t = useTranslations("iletisimSayfa");
  const [form, setForm] = useState({ isim: "", eposta: "", mesaj: "" });
  const [gonderildi, setGonderildi] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setGonderildi(true);
  }

  const ILETISIM_BILGILERI = [
    {
      ikon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <rect x="2" y="4" width="16" height="12" rx="1.5" stroke="#C9A84C" strokeWidth="1" />
          <path d="M2 5.5 L10 11 L18 5.5" stroke="#C9A84C" strokeWidth="1" strokeLinecap="round" />
        </svg>
      ),
      baslik: t("epostaLabel"),
      deger: "info@fatmamentesart.com",
      href: "mailto:info@fatmamentesart.com",
    },
    {
      ikon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path d="M10 2 Q15 2 15 7.5 Q15 13 10 18 Q5 13 5 7.5 Q5 2 10 2 Z" stroke="#C9A84C" strokeWidth="1" fill="none" />
          <circle cx="10" cy="7.5" r="2.5" stroke="#C9A84C" strokeWidth="0.9" fill="none" />
        </svg>
      ),
      baslik: t("atolyeLabel"),
      deger: "Beyoğlu, İstanbul",
      href: undefined,
    },
    {
      ikon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <rect x="2" y="2" width="16" height="16" rx="4" stroke="#C9A84C" strokeWidth="1" fill="none" />
          <circle cx="10" cy="10" r="3.5" stroke="#C9A84C" strokeWidth="0.9" fill="none" />
          <circle cx="14.5" cy="5.5" r="1" fill="#C9A84C" fillOpacity="0.8" />
        </svg>
      ),
      baslik: "Instagram",
      deger: "@fatmamentesart",
      href: "https://instagram.com/fatmamentesart",
    },
  ];

  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "#F5ECD7",
        paddingTop: "7rem",
        paddingBottom: "5rem",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 clamp(1rem, 4vw, 2rem)" }}>

        {/* ── Başlık ── */}
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.65rem",
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: "#C9A84C",
            marginBottom: "1rem",
          }}>
            {t("etiket")}
          </p>
          <h1 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(2.2rem, 5vw, 3.8rem)",
            fontWeight: 300,
            letterSpacing: "0.04em",
            color: "#5C3A1E",
            lineHeight: 1.1,
            marginBottom: "1.5rem",
          }}>
            {t("baslik")}
          </h1>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <OrnamentCizgi />
          </div>
          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "1.1rem",
            fontWeight: 300,
            fontStyle: "italic",
            color: "rgba(92,58,30,0.55)",
            marginTop: "1.5rem",
            maxWidth: "480px",
            margin: "1.5rem auto 0",
            lineHeight: 1.7,
          }}>
            {t("aciklama")}
          </p>
        </div>

        {/* ── İki Sütun: Bilgiler + Form ── */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1.6fr",
          gap: "clamp(2rem, 4vw, 4rem)",
          alignItems: "start",
        }}
          className="iletisim-grid"
        >
          {/* ─── Sol: İletişim Bilgileri ─── */}
          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            {ILETISIM_BILGILERI.map(({ ikon, baslik, deger, href }) => (
              <div key={baslik} style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                <div style={{
                  width: "44px",
                  height: "44px",
                  border: "1px solid rgba(201,168,76,0.3)",
                  borderRadius: "2px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  backgroundColor: "rgba(201,168,76,0.04)",
                }}>
                  {ikon}
                </div>
                <div>
                  <p style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.6rem",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "rgba(92,58,30,0.4)",
                    marginBottom: "0.3rem",
                  }}>
                    {baslik}
                  </p>
                  {href ? (
                    <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer"
                      style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: "1.05rem",
                        fontWeight: 300,
                        color: "#5C3A1E",
                        textDecoration: "none",
                        letterSpacing: "0.02em",
                      }}>
                      {deger}
                    </a>
                  ) : (
                    <p style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "1.05rem",
                      fontWeight: 300,
                      color: "#5C3A1E",
                      letterSpacing: "0.02em",
                    }}>
                      {deger}
                    </p>
                  )}
                </div>
              </div>
            ))}

            {/* Atölye linki */}
            <div style={{
              marginTop: "1rem",
              padding: "clamp(1rem, 3vw, 1.5rem)",
              border: "1px solid rgba(201,168,76,0.2)",
              backgroundColor: "rgba(201,168,76,0.04)",
            }}>
              <p style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "1rem",
                fontWeight: 300,
                fontStyle: "italic",
                color: "rgba(92,58,30,0.65)",
                lineHeight: 1.6,
                marginBottom: "1rem",
              }}>
                {t("atolyeLinki")}
              </p>
              <Link href="/atolye" style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.65rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#C9A84C",
                textDecoration: "none",
                borderBottom: "1px solid rgba(201,168,76,0.4)",
                paddingBottom: "2px",
              }}>
                {t("atolyeProgram")}
              </Link>
            </div>
          </div>

          {/* ─── Sağ: İletişim Formu ─── */}
          <div style={{
            backgroundColor: "rgba(255,255,255,0.6)",
            border: "1px solid rgba(201,168,76,0.15)",
            padding: "clamp(1.5rem, 4vw, 2.5rem)",
          }}>
            {gonderildi ? (
              <div style={{ textAlign: "center", padding: "3rem 0" }}>
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" style={{ margin: "0 auto 1.5rem" }} aria-hidden="true">
                  <circle cx="24" cy="24" r="22" stroke="#C9A84C" strokeWidth="1" />
                  <path d="M14 24 L21 31 L34 18" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <h2 style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "1.6rem",
                  fontWeight: 300,
                  color: "#5C3A1E",
                  marginBottom: "0.75rem",
                }}>
                  {t("basariBaslik")}
                </h2>
                <p style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.8rem",
                  color: "rgba(92,58,30,0.55)",
                  lineHeight: 1.7,
                }}>
                  {t("basariAlt")}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                <h2 style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "1.4rem",
                  fontWeight: 300,
                  color: "#5C3A1E",
                  letterSpacing: "0.04em",
                  marginBottom: "0.5rem",
                }}>
                  {t("formBaslik")}
                </h2>

                {/* İsim */}
                <div>
                  <label style={{
                    display: "block",
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.6rem",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "rgba(92,58,30,0.5)",
                    marginBottom: "0.5rem",
                  }}>
                    {t("adiniz")}
                  </label>
                  <input
                    type="text"
                    required
                    value={form.isim}
                    onChange={e => setForm(f => ({ ...f, isim: e.target.value }))}
                    style={{
                      width: "100%",
                      padding: "0.75rem 1rem",
                      border: "1px solid rgba(92,58,30,0.2)",
                      backgroundColor: "rgba(245,236,215,0.5)",
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.9rem",
                      color: "#5C3A1E",
                      outline: "none",
                      boxSizing: "border-box",
                    }}
                  />
                </div>

                {/* E-posta */}
                <div>
                  <label style={{
                    display: "block",
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.6rem",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "rgba(92,58,30,0.5)",
                    marginBottom: "0.5rem",
                  }}>
                    {t("epostaInput")}
                  </label>
                  <input
                    type="email"
                    required
                    value={form.eposta}
                    onChange={e => setForm(f => ({ ...f, eposta: e.target.value }))}
                    style={{
                      width: "100%",
                      padding: "0.75rem 1rem",
                      border: "1px solid rgba(92,58,30,0.2)",
                      backgroundColor: "rgba(245,236,215,0.5)",
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.9rem",
                      color: "#5C3A1E",
                      outline: "none",
                      boxSizing: "border-box",
                    }}
                  />
                </div>

                {/* Mesaj */}
                <div>
                  <label style={{
                    display: "block",
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.6rem",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "rgba(92,58,30,0.5)",
                    marginBottom: "0.5rem",
                  }}>
                    {t("mesajiniz")}
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={form.mesaj}
                    onChange={e => setForm(f => ({ ...f, mesaj: e.target.value }))}
                    style={{
                      width: "100%",
                      padding: "0.75rem 1rem",
                      border: "1px solid rgba(92,58,30,0.2)",
                      backgroundColor: "rgba(245,236,215,0.5)",
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.9rem",
                      color: "#5C3A1E",
                      outline: "none",
                      resize: "vertical",
                      boxSizing: "border-box",
                    }}
                  />
                </div>

                <button
                  type="submit"
                  style={{
                    padding: "1rem 2rem",
                    backgroundColor: "#5C3A1E",
                    color: "#F5ECD7",
                    border: "none",
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.65rem",
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    cursor: "pointer",
                    transition: "background-color 0.3s",
                  }}
                >
                  {t("gonder")}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .iletisim-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
        }
      `}</style>
    </main>
  );
}
