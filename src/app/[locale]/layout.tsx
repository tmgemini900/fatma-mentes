import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import Header from "@/components/Header";
import FooterBolumu from "@/components/Footer";

const cormorant = Cormorant_Garamond({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500"],
  variable: "--font-dm-sans",
  display: "swap",
});

const LOCALE_LISTESI = ["tr", "en", "it", "ru"] as const;
type Locale = (typeof LOCALE_LISTESI)[number];

export const metadata: Metadata = {
  title: "Fatma Menteş Art",
  description: "El yapımı deri eserler",
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  if (!(LOCALE_LISTESI as readonly string[]).includes(locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} className={`${cormorant.variable} ${dmSans.variable}`}>
      <body style={{
        fontFamily: "var(--font-dm-sans), sans-serif",
        backgroundColor: "#F5ECD7",
        color: "#5C3A1E",
        overflowX: "hidden",
      }}>
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main id="main-content">{children}</main>
          <FooterBolumu />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
