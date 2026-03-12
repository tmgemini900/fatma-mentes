"use client";

/**
 * app/[locale]/atolye/BasvuruFormu.tsx
 *
 * Client bileşen — React Hook Form + Zod doğrulama
 * Server action entegrasyonu hazır (TODO yorumu ile işaretli)
 *
 * Kurulum: npm i react-hook-form zod @hookform/resolvers
 */

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

/* ─── Zod Şeması ─── */
const BasvuruSemasi = z.object({
  isim:    z.string().min(2, "En az 2 karakter girin"),
  soyisim: z.string().min(2, "En az 2 karakter girin"),
  eposta:  z.string().email("Geçerli bir e-posta girin"),
  telefon: z.string().optional(),
  dil:     z.enum(["tr", "en", "it", "ru"] as const, {
    error: "Lütfen dil seçin",
  }),
  atolye: z.string().min(1, "Lütfen bir atölye seçin"),
  deneyim: z.enum(["baslangic", "bazi", "orta", "ileri"] as const, {
    error: "Deneyim seviyenizi seçin",
  }),
  mesaj: z.string().max(1000).optional(),
});

type BasvuruVerisi = z.infer<typeof BasvuruSemasi>;

/* ─── Prop tipleri ─── */
interface Atolye {
  readonly slug:    string;
  readonly baslik:  string;
  readonly altBaslik: string;
  readonly gun:     string;
  readonly ay:      string;
  readonly fiyat:   string;
  readonly musait:  boolean;
}

interface Props {
  atolyeler: readonly Atolye[];
}

/* ─── Deneyim seçenekleri ─── */
const DENEYIM_SECENEKLERI = [
  { value: "baslangic", etiket: "Hiç bilmiyorum — ilk kez denerim" },
  { value: "bazi",      etiket: "Birkaç kez denedim, temel bilgim var" },
  { value: "orta",      etiket: "Düzenli çalışıyorum, orta seviyedeyim" },
  { value: "ileri",     etiket: "İleri seviye, teknik bilgim güçlü" },
] as const;

/* ─── Güvence noktaları ─── */
const GUVENLER = [
  "Kredi kartı bilgisi istemeyiz",
  "48 saatte yanıt garantisi",
  "Ücretsiz iptal — 7 gün öncesine kadar",
];

/* ─── Bileşen ─── */
export default function BasvuruFormu({ atolyeler }: Props) {
  const [gonderildi, setGonderildi] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<BasvuruVerisi>({
    resolver: zodResolver(BasvuruSemasi),
    mode: "onBlur",
  });

  const secilenDeneyim = watch("deneyim");

  async function onSubmit(veri: BasvuruVerisi) {
    try {
      /* TODO: Server action çağrısı
         const sonuc = await atolyeBasvuru(veri);
         if (!sonuc.basari) throw new Error("Gönderim hatası");
      */

      // Şimdilik simüle et
      await new Promise(r => setTimeout(r, 1400));
      setGonderildi(true);
    } catch {
      // Hata yönetimi — toast veya alert
      alert("Bir hata oluştu. Lütfen tekrar deneyin.");
    }
  }

  const GRAIN_DARK = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23n)' opacity='0.06'/%3E%3C/svg%3E")`;

  const inputStyle = (hasError: boolean) => ({
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "0.88rem",
    fontWeight: 300 as const,
    color: "#F5ECD7",
    background: "rgba(245,236,215,0.05)",
    border: `1px solid ${hasError ? "rgba(200,80,60,0.5)" : "rgba(201,168,76,0.15)"}`,
    borderRadius: "2px",
    padding: "0.85rem 1rem",
    width: "100%",
    outline: "none",
    WebkitAppearance: "none" as const,
    transition: "border-color 0.3s, background 0.3s, box-shadow 0.3s",
  });

  const labelStyle = {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "0.62rem",
    fontWeight: 500 as const,
    letterSpacing: "0.18em",
    textTransform: "uppercase" as const,
    color: "rgba(201,168,76,0.65)",
    display: "block",
    marginBottom: "0.5rem",
  };

  const hataStyle = {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "0.65rem",
    color: "rgba(210,100,80,0.9)",
    letterSpacing: "0.06em",
    marginTop: "0.25rem",
    minHeight: "1rem",
    display: "block",
  };

  return (
    <section
      aria-label="Atölye Başvuru Formu"
      id="basvuru"
      className="relative overflow-hidden py-20 md:py-28 px-6 md:px-10"
      style={{ backgroundColor: "#1A0F0A", backgroundImage: GRAIN_DARK }}
    >
      <style>{`
        .fm-input:focus { border-color: rgba(201,168,76,0.5) !important; background: rgba(245,236,215,0.07) !important; box-shadow: 0 0 0 3px rgba(201,168,76,0.08) !important; }
        .fm-input::placeholder { color: rgba(245,236,215,0.2); }
        .fm-radio:hover { border-color: rgba(201,168,76,0.3); background: rgba(201,168,76,0.04); }
        .fm-gonder:hover:not(:disabled) { background: #1A0F0A !important; border-color: #C9A84C !important; color: #C9A84C !important; transform: translateY(-1px); }
        .fm-gonder:focus-visible { outline: none; box-shadow: 0 0 0 3px rgba(201,168,76,0.5); }
      `}</style>

      {/* Dekoratif arka plan */}
      <svg className="absolute -right-16 -bottom-16 opacity-[0.03] pointer-events-none"
           width="400" height="400" viewBox="0 0 400 400" fill="none" aria-hidden="true">
        <circle cx="400" cy="400" r="350" stroke="#C9A84C" strokeWidth="0.5"/>
        <circle cx="400" cy="400" r="250" stroke="#C9A84C" strokeWidth="0.4"/>
        <circle cx="400" cy="400" r="150" stroke="#C9A84C" strokeWidth="0.5"/>
      </svg>

      <div className="relative z-10 max-w-[1280px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.6fr] gap-16 lg:gap-24 items-start">

          {/* Sol — Açıklama */}
          <div>
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.62rem", letterSpacing: "0.26em", textTransform: "uppercase", color: "rgba(201,168,76,0.5)", marginBottom: "0.75rem" }}>
              Başvuru Formu
            </p>
            <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(1.8rem,4vw,2.8rem)", fontWeight: 300, color: "#F5ECD7", lineHeight: 1.15 }}>
              Ellerinizi<br/>
              <em style={{ fontStyle: "italic", color: "#C9A84C" }}>atölyeye bekliyoruz</em>
            </h2>
            <p style={{ marginTop: "1.5rem", fontFamily: "'DM Sans',sans-serif", fontSize: "0.88rem", fontWeight: 300, lineHeight: 1.8, color: "rgba(245,236,215,0.45)" }}>
              Formu doldurduktan sonra{" "}
              <strong style={{ fontWeight: 400, color: "rgba(245,236,215,0.75)" }}>48 saat içinde</strong>{" "}
              Fatma Hanım sizi arar ya da yazar. Başvuru tamamlanmadan ücret alınmaz.
            </p>
            <div className="mt-8 flex flex-col gap-3">
              {GUVENLER.map(g => (
                <p key={g} className="flex items-center gap-2"
                   style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.72rem", fontWeight: 300, color: "rgba(245,236,215,0.35)" }}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <circle cx="7" cy="7" r="6" stroke="#C9A84C" strokeWidth="0.8" strokeOpacity="0.5"/>
                    <path d="M4.5 7 L6 8.5 L9.5 5" stroke="#C9A84C" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.8"/>
                  </svg>
                  {g}
                </p>
              ))}
            </div>
          </div>

          {/* Sağ — Form */}
          <div>
            {gonderildi ? (
              <div className="p-8 rounded-sm text-center"
                   style={{ border: "1px solid rgba(201,168,76,0.3)", background: "rgba(201,168,76,0.06)" }}
                   role="status" aria-live="polite">
                <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.4rem", fontWeight: 300, fontStyle: "italic", color: "#F5ECD7", marginBottom: "0.5rem" }}>
                  Başvurunuz alındı ✦
                </p>
                <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.78rem", fontWeight: 300, color: "rgba(245,236,215,0.45)" }}>
                  Fatma Hanım 48 saat içinde sizinle iletişime geçecek. O zamana kadar ellerinizi meşgul tutun.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5" noValidate aria-label="Atölye başvuru formu">

                {/* Ad + Soyad */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="isim" style={labelStyle}>Ad <span style={{ opacity: 0.4 }}>*</span></label>
                    <input id="isim" type="text" autoComplete="given-name" placeholder="Fatma"
                           className="fm-input" style={inputStyle(!!errors.isim)}
                           aria-invalid={!!errors.isim} aria-describedby="isim-hata"
                           {...register("isim")}/>
                    {errors.isim && <span id="isim-hata" style={hataStyle} role="alert">{errors.isim.message}</span>}
                  </div>
                  <div>
                    <label htmlFor="soyisim" style={labelStyle}>Soyad <span style={{ opacity: 0.4 }}>*</span></label>
                    <input id="soyisim" type="text" autoComplete="family-name" placeholder="Menteş"
                           className="fm-input" style={inputStyle(!!errors.soyisim)}
                           aria-invalid={!!errors.soyisim} aria-describedby="soyisim-hata"
                           {...register("soyisim")}/>
                    {errors.soyisim && <span id="soyisim-hata" style={hataStyle} role="alert">{errors.soyisim.message}</span>}
                  </div>
                </div>

                {/* E-posta */}
                <div>
                  <label htmlFor="eposta" style={labelStyle}>E-posta <span style={{ opacity: 0.4 }}>*</span></label>
                  <input id="eposta" type="email" autoComplete="email" placeholder="ornek@mail.com"
                         className="fm-input" style={inputStyle(!!errors.eposta)}
                         aria-invalid={!!errors.eposta} aria-describedby="eposta-hata"
                         {...register("eposta")}/>
                  {errors.eposta && <span id="eposta-hata" style={hataStyle} role="alert">{errors.eposta.message}</span>}
                </div>

                {/* Telefon + Dil */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="telefon" style={labelStyle}>Telefon <span style={{ opacity: 0.3 }}>(opsiyonel)</span></label>
                    <input id="telefon" type="tel" autoComplete="tel" placeholder="+90 5XX XXX XX XX"
                           className="fm-input" style={inputStyle(false)}
                           {...register("telefon")}/>
                  </div>
                  <div>
                    <label htmlFor="dil" style={labelStyle}>Tercih Dili <span style={{ opacity: 0.4 }}>*</span></label>
                    <select id="dil" className="fm-input" style={{ ...inputStyle(!!errors.dil), cursor: "pointer", color: "rgba(245,236,215,0.7)" }}
                            aria-invalid={!!errors.dil} aria-describedby="dil-hata"
                            {...register("dil")}>
                      <option value="" disabled>Seçin…</option>
                      <option value="tr">Türkçe</option>
                      <option value="en">English</option>
                      <option value="it">Italiano</option>
                      <option value="ru">Русский</option>
                    </select>
                    {errors.dil && <span id="dil-hata" style={hataStyle} role="alert">{errors.dil.message}</span>}
                  </div>
                </div>

                {/* Atölye seçimi */}
                <div>
                  <label htmlFor="atolye" style={labelStyle}>İlgilendiğiniz Atölye <span style={{ opacity: 0.4 }}>*</span></label>
                  <select id="atolye" className="fm-input" style={{ ...inputStyle(!!errors.atolye), cursor: "pointer", color: "rgba(245,236,215,0.7)" }}
                          aria-invalid={!!errors.atolye} aria-describedby="atolye-hata"
                          {...register("atolye")}>
                    <option value="" disabled>Atölye seçin…</option>
                    {atolyeler.map(a => (
                      <option key={a.slug} value={a.slug} disabled={!a.musait}
                              style={{ background: "#1A0F0A", color: "#F5ECD7" }}>
                        {a.gun} {a.ay} — {a.baslik} {a.altBaslik} ({a.fiyat}){!a.musait ? " · Dolu" : ""}
                      </option>
                    ))}
                  </select>
                  {errors.atolye && <span id="atolye-hata" style={hataStyle} role="alert">{errors.atolye.message}</span>}
                </div>

                {/* Deneyim (radio) */}
                <fieldset style={{ border: "none", padding: 0 }}>
                  <legend style={{ ...labelStyle, display: "block", marginBottom: "0.6rem" }}>
                    Deri Deneyiminiz <span style={{ opacity: 0.4 }}>*</span>
                  </legend>
                  <div className="flex flex-col gap-2" role="radiogroup">
                    {DENEYIM_SECENEKLERI.map(({ value, etiket }) => (
                      <label
                        key={value}
                        className="fm-radio flex items-center gap-3 px-4 py-[0.7rem] rounded-sm cursor-pointer transition-all duration-300"
                        style={{
                          border: `1px solid ${secilenDeneyim === value ? "rgba(201,168,76,0.5)" : "rgba(201,168,76,0.12)"}`,
                          background: secilenDeneyim === value ? "rgba(201,168,76,0.07)" : "transparent",
                        }}
                      >
                        <input type="radio" value={value} className="sr-only"
                               {...register("deneyim")}
                               onChange={() => setValue("deneyim", value, { shouldValidate: true })}/>
                        <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
                             style={{ border: `1px solid ${secilenDeneyim === value ? "#C9A84C" : "rgba(201,168,76,0.35)"}` }}
                             aria-hidden="true">
                          {secilenDeneyim === value && (
                            <div className="w-[7px] h-[7px] rounded-full" style={{ background: "#C9A84C" }}/>
                          )}
                        </div>
                        <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.8rem", fontWeight: 300, color: secilenDeneyim === value ? "rgba(245,236,215,0.9)" : "rgba(245,236,215,0.6)" }}>
                          {etiket}
                        </span>
                      </label>
                    ))}
                  </div>
                  {errors.deneyim && <span style={hataStyle} role="alert">{errors.deneyim.message}</span>}
                </fieldset>

                {/* Mesaj */}
                <div>
                  <label htmlFor="mesaj" style={labelStyle}>
                    Bize Bir Şey Söyleyin{" "}
                    <span style={{ opacity: 0.3, textTransform: "none" as const, letterSpacing: 0 }}>(opsiyonel)</span>
                  </label>
                  <textarea id="mesaj" rows={4}
                            placeholder="Neden bu atölyeyi seçtiniz? Özel isteğiniz var mı? Fatma Hanım her mesajı okur."
                            className="fm-input" style={{ ...inputStyle(false), resize: "vertical", lineHeight: 1.65 }}
                            {...register("mesaj")}/>
                </div>

                {/* Gönder */}
                <button type="submit" disabled={isSubmitting}
                        className="fm-gonder flex items-center justify-center gap-3 w-full rounded-sm transition-all duration-350"
                        style={{
                          fontFamily: "'Cormorant Garamond',serif",
                          fontSize: "1.15rem", fontWeight: 400, fontStyle: "italic",
                          letterSpacing: "0.06em",
                          padding: "1.1rem 2rem",
                          color: "#F5ECD7",
                          background: "#5C3A1E",
                          border: "1px solid transparent",
                          cursor: isSubmitting ? "not-allowed" : "pointer",
                          opacity: isSubmitting ? 0.7 : 1,
                        }}>
                  <svg aria-hidden="true" width="18" height="18" viewBox="0 0 18 18" fill="none"
                       stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 9 L16 9 M10 3 L16 9 L10 15"/>
                  </svg>
                  {isSubmitting ? "Gönderiliyor…" : "Başvurumu Gönder"}
                </button>

              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
