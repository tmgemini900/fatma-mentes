/**
 * types/eser.ts
 * Fatma Menteş — Eser veri modeli tip tanımları
 *
 * Yeni eser eklemek için: /data/eserler.json dosyasını düzenle.
 * Müsaitlik değişince: musait: false → "Emanet Buldu" etiketi otomatik çıkar.
 */

export type Kategori =
  | "gunluk-yoldas"      // Çanta, Cüzdan, Kemer
  | "duvarin-ruhu"       // Rölyefler, Deri Tablolar
  | "maneviyat"          // Tezhip ve Çini İşlemeli Deriler
  | "atiklarin-donusumu"; // Geri/İleri Dönüşüm Koleksiyonu

export type DeriTuru =
  | "Bitkisel tabaklanmış sığır vaketası"
  | "Geri dönüştürülmüş atık deri"
  | "Bitkisel tabaklanmış keçi derisi"
  | "Matador boğa derisi (sıfır atık)"
  | "Antika kemer derisi (dönüştürülmüş)";

export interface EserKimlikKarti {
  /** Kullanılan deri türü */
  deri:    DeriTuru | string;
  /** Uygulanan el sanatı teknikleri */
  sanat:   string[];
  /** Harcanan emek (saat) — gösterim metni */
  emek:    string;
}

export interface Eser {
  /** Benzersiz tanımlayıcı */
  id:         string;
  /** URL dostu isim — Türkçe karaktersiz */
  slug:       string;
  /** Eserin şiirsel adı (kod değil, isim) */
  isim:       string;
  /** Bir paragraflık kısa hikâye */
  hikaye:     string;
  /** Kategori */
  kategori:   Kategori;
  /** Kimlik Kartı verileri */
  kimlik:     EserKimlikKarti;
  /** Fiyat (TL) */
  fiyat:      number;
  /** Müsaitlik — false ise "Emanet Buldu" gösterilir */
  musait:     boolean;
  /** Boyutlar (opsiyonel) */
  boyut?:     string;
  /** Görsel dosya adları — /public/images/eserler/ altında */
  fotograflar: string[];
  /** Öne çıkarılacak mı? (Ana sayfa vitrin) */
  vitrin:     boolean;
}

/** Kategori meta verileri */
export const KategoriMeta: Record<Kategori, { etiket: string; aciklama: string; ikon: string }> = {
  "gunluk-yoldas": {
    etiket:    "Günlük Yoldaşlar",
    aciklama:  "Çanta, Cüzdan, Kemer",
    ikon:      "bag",
  },
  "duvarin-ruhu": {
    etiket:    "Duvarın Ruhu",
    aciklama:  "Rölyefler, Deri Tablolar",
    ikon:      "frame",
  },
  "maneviyat": {
    etiket:    "Maneviyat",
    aciklama:  "Tezhip ve Çini İşlemeli Deriler",
    ikon:      "star",
  },
  "atiklarin-donusumu": {
    etiket:    "Atıkların Dönüşümü",
    aciklama:  "Geri/İleri Dönüşüm Koleksiyonu",
    ikon:      "recycle",
  },
};
