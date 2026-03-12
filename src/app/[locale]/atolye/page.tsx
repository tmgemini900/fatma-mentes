/**
 * app/[locale]/atolye/page.tsx
 * Fatma Menteş — Atölye Sayfası
 */

import type { Metadata } from "next";
import BasvuruFormu from "@/components/BasvuruFormu";
import SSSAccordion from "@/components/SSSAccordion";
import type { SSSSorusu } from "@/components/SSSAccordion";

export const metadata: Metadata = {
  title: "Atölye — Fatma Menteş | Derinin Hafızası",
  description:
    "Eller çalışır, ruh şifa bulur. El dikişi deri atölyesi derslerine katılın. Başlangıç ve ileri seviye programlar.",
};

/* ─── Atölye Verileri ─── */
const ATOLYELER = [
  {
    slug: "temel-el-dikisi",
    baslik: "Temel El Dikişi · Cüzdan",
    altBaslik: "Saddle stitch, sızdırmazlık, baskı teknikleri",
    gun: "15",
    ay: "Mar",
    fiyat: "₺1.800",
    musait: true,
    sure: "6 saat",
    seviye: "Başlangıç",
    kontenjan: 4,
  },
  {
    slug: "osmanli-tezhip",
    baslik: "Osmanlı Tezhip · Levha",
    altBaslik: "Altın varak, geleneksel motifler, deri zemin",
    gun: "22",
    ay: "Mar",
    fiyat: "₺4.200",
    musait: true,
    sure: "2 gün · 12 saat",
    seviye: "Orta–İleri",
    kontenjan: 1,
  },
  {
    slug: "canta-tasarim",
    baslik: "Çanta Tasarım · Omuz Çantası",
    altBaslik: "Kalıp çıkarma, kenar finişleme, kemer montajı",
    gun: "05",
    ay: "Nis",
    fiyat: "₺3.200",
    musait: true,
    sure: "8 saat",
    seviye: "Temel",
    kontenjan: 3,
  },
] as const;

/* ─── SSS Verileri ─── */
const SSS_SORULARI: SSSSorusu[] = [
  {
    id: "malzeme",
    soru: "Malzemeler dahil mi?",
    cevap:
      "Evet. Tüm programlarda bitkisel tabaklanmış deri, iplik, iğne, kesici aletler ve bitirme ürünleri sağlanır. Sadece kendinizi getirin.",
    cevapBold: ["bitkisel tabaklanmış deri"],
  },
  {
    id: "deneyim",
    soru: "Hiç deneyimim olmadan katılabilir miyim?",
    cevap:
      "Kesinlikle. Temel El Dikişi programı tamamen sıfırdan başlayanlar için tasarlandı. Osmanlı Tezhip gibi ileri programlar için temel deri işleme bilgisi yeterli.",
    cevapBold: ["Temel El Dikişi"],
  },
  {
    id: "iptal",
    soru: "İptal politikası nasıl?",
    cevap:
      "Atölye tarihinden 7 gün öncesine kadar ücretsiz iptal yapabilirsiniz. 7 günden az kaldığında %50 iade geçerlidir. Tarihten 24 saat öncesinde iade yapılmaz.",
    cevapBold: ["7 gün öncesine kadar ücretsiz iptal"],
  },
  {
    id: "katilimci",
    soru: "Grup büyüklüğü ne kadar?",
    cevap:
      "Her atölyede maksimum 4 kişi bulunur. Bu sayede Fatma Hanım her katılımcıyla birebir ilgilenebilir ve kaliteli rehberlik sağlayabilir.",
    cevapBold: ["maksimum 4 kişi"],
  },
  {
    id: "adres",
    soru: "Atölye nerede?",
    cevap:
      "Atölye Beyoğlu, İstanbul'da yer almaktadır. Kayıt sonrasında kesin adres ve yönlendirme bilgisi e-posta ile iletilir.",
    cevapBold: ["Beyoğlu, İstanbul"],
  },
];

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

export default function AtolyePage() {
  return (
    <main style={{ backgroundColor: "#F5ECD7", minHeight: "100vh" }}>

      {/* ══ HERO ══ */}
      <section
        style={{
          backgroundColor: "#1A0F0A",
          paddingTop: "8rem",
          paddingBottom: "5rem",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Dekoratif arka plan */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "radial-gradient(ellipse at 50% 40%, rgba(201,168,76,0.05) 0%, transparent 60%)",
        }} aria-hidden="true" />

        <div style={{ position: "relative", zIndex: 1, maxWidth: "700px", margin: "0 auto", padding: "0 2rem" }}>
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.65rem",
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: "rgba(201,168,76,0.6)",
            marginBottom: "1.5rem",
          }}>
            03 · Atölye
          </p>
          <h1 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 300,
            lineHeight: 1.1,
            letterSpacing: "0.04em",
            color: "#F5ECD7",
            marginBottom: "1.5rem",
          }}>
            <span style={{ display: "block", fontSize: "clamp(2.2rem, 5vw, 3.8rem)" }}>Eller Çalışır,</span>
            <span style={{
              display: "block",
              fontSize: "clamp(2.2rem, 5vw, 3.8rem)",
              fontStyle: "italic",
              color: "#C9A84C",
            }}>Ruh Şifa Bulur</span>
          </h1>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "2rem" }}>
            <svg width="200" height="14" viewBox="0 0 200 14" fill="none" aria-hidden="true">
              <line x1="0" y1="7" x2="76" y2="7" stroke="rgba(201,168,76,0.4)" strokeWidth="0.6" />
              <circle cx="100" cy="7" r="4.5" stroke="#C9A84C" strokeWidth="0.7" strokeOpacity="0.7" fill="none" />
              <circle cx="100" cy="7" r="1.6" fill="#C9A84C" fillOpacity="0.5" />
              <line x1="124" y1="7" x2="200" y2="7" stroke="rgba(201,168,76,0.4)" strokeWidth="0.6" />
            </svg>
          </div>
          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "1.1rem",
            fontWeight: 300,
            fontStyle: "italic",
            color: "rgba(245,236,215,0.55)",
            lineHeight: 1.7,
          }}>
            Makinelerin giremediği yere ellerin girdiği, zamanın yavaşladığı küçük atölyede — size yer var.
          </p>
        </div>
      </section>

      {/* ══ TAKVİM ══ */}
      <section id="takvim" style={{ padding: "5rem 2rem" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.6rem",
              letterSpacing: "0.24em",
              textTransform: "uppercase",
              color: "rgba(92,58,30,0.45)",
              marginBottom: "0.75rem",
            }}>
              Yaklaşan Programlar
            </p>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
              fontWeight: 300,
              color: "#5C3A1E",
              marginBottom: "1rem",
            }}>
              Atölye Takvimi
            </h2>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <OrnamentCizgi />
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.5rem" }}>
            {ATOLYELER.map((a) => (
              <article
                key={a.slug}
                style={{
                  border: "1px solid rgba(201,168,76,0.2)",
                  backgroundColor: "rgba(255,255,255,0.55)",
                  padding: "2rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                }}
              >
                {/* Tarih */}
                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                  <div style={{
                    width: "52px",
                    height: "52px",
                    border: "1px solid rgba(201,168,76,0.35)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}>
                    <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.4rem", fontWeight: 300, color: "#C9A84C", lineHeight: 1 }}>{a.gun}</span>
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.5rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(201,168,76,0.6)" }}>{a.ay}</span>
                  </div>
                  <div>
                    <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.15rem", fontWeight: 300, color: "#5C3A1E", lineHeight: 1.2 }}>{a.baslik}</p>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.65rem", color: "rgba(92,58,30,0.5)", marginTop: "3px" }}>{a.altBaslik}</p>
                  </div>
                </div>

                {/* Detaylar */}
                <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                  {[
                    { ikon: "⏱", metin: a.sure },
                    { ikon: "◈", metin: a.seviye },
                    { ikon: "◻", metin: `${a.kontenjan} kota boş` },
                  ].map(({ ikon, metin }) => (
                    <span key={metin} style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.62rem",
                      letterSpacing: "0.08em",
                      color: "rgba(92,58,30,0.55)",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                    }}>
                      <span style={{ color: "#C9A84C", opacity: 0.7 }}>{ikon}</span>
                      {metin}
                    </span>
                  ))}
                </div>

                {/* Fiyat + Durum */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "auto", paddingTop: "1rem", borderTop: "1px solid rgba(201,168,76,0.12)" }}>
                  <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.25rem", fontWeight: 300, color: "#C9A84C" }}>
                    {a.fiyat}
                  </span>
                  <span style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.58rem",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: a.musait ? "rgba(92,58,30,0.5)" : "rgba(180,60,60,0.7)",
                    border: `1px solid ${a.musait ? "rgba(92,58,30,0.2)" : "rgba(180,60,60,0.3)"}`,
                    padding: "0.25rem 0.6rem",
                  }}>
                    {a.musait ? "Malzeme dahil" : "Kontenjan Doldu"}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ══ BAŞVURU FORMU ══ */}
      <section id="basvuru" style={{ backgroundColor: "rgba(26,15,10,0.04)", padding: "5rem 2rem" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
              fontWeight: 300,
              color: "#5C3A1E",
              marginBottom: "0.75rem",
            }}>
              Ellerinizi Atölyeye Bekliyoruz
            </h2>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <OrnamentCizgi />
            </div>
          </div>
          <BasvuruFormu atolyeler={ATOLYELER} />
        </div>
      </section>

      {/* ══ SSS ══ */}
      <section style={{ padding: "5rem 2rem" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <SSSAccordion
            sorular={SSS_SORULARI}
            baslik="Sıkça Sorulan Sorular"
            altBaslik="Aklınızdaki soruların cevabı burada"
          />
        </div>
      </section>

    </main>
  );
}
