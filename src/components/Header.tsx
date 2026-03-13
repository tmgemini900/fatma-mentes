"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link, useRouter, usePathname } from "@/i18n/navigation";

/* ─── Tipler ─── */
interface NavItem {
  href: string;
  labelKey: string;
  num: string;
}

/* ─── Sabitler ─── */
const NAV_ITEMS: NavItem[] = [
  { href: "/eserler",  labelKey: "eserler",  num: "01" },
  { href: "/eller",    labelKey: "eller",    num: "02" },
  { href: "/atolye",   labelKey: "atolye",   num: "03" },
  { href: "/iletisim", labelKey: "iletisim", num: "04" },
];

const LOCALES = [
  { code: "tr" as const, label: "TR", lang: "tr", ariaLabel: "Türkçe" },
  { code: "en" as const, label: "EN", lang: "en", ariaLabel: "English" },
  { code: "it" as const, label: "IT", lang: "it", ariaLabel: "Italiano" },
  { code: "ru" as const, label: "RU", lang: "ru", ariaLabel: "Русский" },
];

/* ─── Zanaat Çantası SVG ─── */
function BagIcon() {
  return (
    <svg
      width="22" height="22"
      viewBox="0 0 22 22"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.1"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3 8 L3.8 18 Q3.9 19.2 5 19.2 L17 19.2 Q18.1 19.2 18.2 18 L19 8 Z"/>
      <path d="M7.5 8 Q7.5 4.5 11 4.5 Q14.5 4.5 14.5 8"/>
      <path d="M3.2 10 L18.8 10"/>
      <rect x="9.5" y="9.2" width="3" height="1.6" rx="0.4"/>
    </svg>
  );
}

/* ─── Tezhip köşe süsü (menü için) ─── */
function MenuCornerDeco() {
  return (
    <svg
      className="absolute bottom-0 right-0 opacity-[0.06] pointer-events-none"
      width="280" height="280"
      viewBox="0 0 280 280"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="280" cy="280" r="240" stroke="#C9A84C" strokeWidth="0.5"/>
      <circle cx="280" cy="280" r="180" stroke="#C9A84C" strokeWidth="0.4"/>
      <circle cx="280" cy="280" r="120" stroke="#C9A84C" strokeWidth="0.5"/>
      <line x1="280" y1="280" x2="0"   y2="100" stroke="#C9A84C" strokeWidth="0.3" strokeOpacity="0.5"/>
      <line x1="280" y1="280" x2="100" y2="0"   stroke="#C9A84C" strokeWidth="0.3" strokeOpacity="0.5"/>
    </svg>
  );
}

/* ─── Ana Bileşen ─── */
export default function Header({
  cartCount = 0,
}: {
  cartCount?: number;
}) {
  const t = useTranslations("nav");
  const tSite = useTranslations("site");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const menuRef = useRef<HTMLElement>(null);
  const menuBtnRef = useRef<HTMLButtonElement>(null);
  const prevFocusRef = useRef<HTMLElement | null>(null);

  /* ── Scroll gözlemcisi ── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── Menü aç/kapat ── */
  const openMenu = useCallback(() => {
    prevFocusRef.current = document.activeElement as HTMLElement;
    setMenuOpen(true);
    document.body.style.overflow = "hidden";
  }, []);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    document.body.style.overflow = "";
    setTimeout(() => prevFocusRef.current?.focus(), 50);
  }, []);

  /* Menü açılınca ilk linke odak */
  useEffect(() => {
    if (!menuOpen) return;
    const firstLink = menuRef.current?.querySelector<HTMLElement>("a[href]");
    setTimeout(() => firstLink?.focus(), 120);
  }, [menuOpen]);

  /* Escape tuşu */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && menuOpen) closeMenu();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen, closeMenu]);

  /* Focus trap */
  const onMenuKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key !== "Tab" || !menuRef.current) return;
    const focusable = menuRef.current.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault(); last?.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault(); first?.focus();
    }
  }, []);

  /* Dil değişimi — gerçek navigasyon */
  const handleLangChange = (code: "tr" | "en" | "it" | "ru") => {
    router.replace(pathname, { locale: code });
  };

  /* Stil sabitleri */
  const S = {
    headerBase: `
      fixed top-0 left-0 right-0 z-[90]
      flex items-center justify-between
      h-16 md:h-[72px] px-5 md:px-10
      transition-all duration-[450ms] ease-out
    `,
    headerScrolled: `
      bg-[rgba(245,236,215,0.88)]
      border-b border-[rgba(201,168,76,0.18)]
      backdrop-blur-[12px]
      shadow-[0_1px_24px_rgba(26,15,10,0.08)]
    `,
    navLink: `
      relative text-[0.68rem] tracking-[0.2em] uppercase
      pb-[3px] transition-colors duration-300
      after:content-[''] after:absolute after:bottom-0 after:left-0
      after:h-px after:w-0 after:bg-[#C9A84C]
      after:transition-[width] after:duration-300
      hover:after:w-full focus-visible:after:w-full
      focus-visible:outline-none
    `,
    iconBtn: `
      relative flex items-center justify-center
      w-10 h-10 rounded-sm transition-all duration-300
      focus-visible:outline-none
    `,
  } as const;

  const isScrolledText = scrolled ? "text-[#5C3A1E] hover:text-[#8B4513]" : "text-[rgba(245,236,215,0.82)] hover:text-[#C9A84C]";
  const isScrolledIcon = scrolled ? "text-[#5C3A1E] hover:text-[#8B4513] hover:bg-[rgba(92,58,30,0.08)]" : "text-[rgba(245,236,215,0.85)] hover:text-[#C9A84C] hover:bg-[rgba(201,168,76,0.1)]";
  const isScrolledLang = scrolled ? "text-[rgba(92,58,30,0.45)]" : "text-[rgba(245,236,215,0.55)]";
  const isScrolledLangAct = scrolled ? "text-[#8B4513]" : "text-[#C9A84C]";

  /* Nav label'ları İngilizce karşılıkları (mobil menü için) */
  const labelEnMap: Record<string, string> = {
    eserler: "Works",
    eller: "About",
    atolye: "Workshop",
    iletisim: "Contact",
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300&family=DM+Sans:wght@300;400;500&display=swap');
        .ham-open .ham-1 { transform: translateY(6px) rotate(45deg);  width: 20px; }
        .ham-open .ham-2 { opacity: 0; transform: scaleX(0); }
        .ham-open .ham-3 { transform: translateY(-6px) rotate(-45deg); width: 20px; }
        .menu-closed { clip-path: inset(0 0 100% 0); }
        .menu-opened { clip-path: inset(0 0 0% 0); }
        .menu-link-item {
          opacity: 0;
          transform: translateY(16px);
          transition: opacity 0.5s ease, transform 0.5s ease, color 0.3s, padding-left 0.35s cubic-bezier(0.4,0,0.2,1);
        }
        .menu-opened .menu-link-item { opacity: 1; transform: translateY(0); }
        .menu-opened .menu-link-item:nth-child(1) { transition-delay: 0.18s, 0.18s, 0s, 0s; }
        .menu-opened .menu-link-item:nth-child(2) { transition-delay: 0.26s, 0.26s, 0s, 0s; }
        .menu-opened .menu-link-item:nth-child(3) { transition-delay: 0.34s, 0.34s, 0s, 0s; }
        .menu-opened .menu-link-item:nth-child(4) { transition-delay: 0.42s, 0.42s, 0s, 0s; }
        .menu-link-item:hover, .menu-link-item:focus-visible { padding-left: 0.5rem; color: #C9A84C; outline: none; }
        .menu-footer-inner {
          opacity: 0; transform: translateY(12px);
          transition: opacity 0.5s 0.52s ease, transform 0.5s 0.52s ease;
        }
        .menu-opened .menu-footer-inner { opacity: 1; transform: translateY(0); }
        .menu-grain::before {
          content: '';
          position: absolute; inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23g)' opacity='0.06'/%3E%3C/svg%3E");
          pointer-events: none; z-index: 0;
        }
        .menu-grain::after {
          content: '';
          position: absolute; inset: 0;
          background: radial-gradient(ellipse at 80% 20%, rgba(201,168,76,0.06) 0%, transparent 60%);
          pointer-events: none; z-index: 0;
        }
      `}</style>

      {/* ════════════════ HEADER ════════════════ */}
      <header
        className={`
          ${S.headerBase}
          ${scrolled ? S.headerScrolled : "bg-transparent border-b border-transparent"}
        `}
        role="banner"
      >
        {/* ── Logo ── */}
        <Link
          href="/"
          className="flex flex-col gap-[2px] no-underline flex-shrink-0"
          aria-label={`${tSite("isim")} — Ana Sayfa`}
        >
          <span
            className="uppercase leading-none transition-colors duration-350"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(1.15rem, 2.8vw, 1.45rem)",
              fontWeight: 300,
              letterSpacing: "0.14em",
              color: scrolled ? "#5C3A1E" : "#F5ECD7",
            }}
          >
            {tSite("isim")}
          </span>
          <span
            aria-hidden="true"
            className="uppercase"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "0.6rem",
              fontStyle: "italic",
              letterSpacing: "0.22em",
              color: "#C9A84C",
              opacity: scrolled ? 1 : 0.8,
              transition: "opacity 0.35s",
            }}
          >
            {tSite("slogan")}
          </span>
        </Link>

        {/* ── Masaüstü nav ── */}
        <nav className="hidden md:flex items-center gap-10" aria-label="Ana Navigasyon">
          {NAV_ITEMS.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className={`${S.navLink} ${isScrolledText}`}
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              {t(item.labelKey)}
            </Link>
          ))}
        </nav>

        {/* ── Sağ grup ── */}
        <div className="flex items-center gap-2">

          {/* Dil seçici (masaüstü) */}
          <div
            className="hidden md:flex items-center gap-[2px]"
            role="group"
            aria-label="Dil Seçimi"
          >
            {LOCALES.map((loc, i) => (
              <span key={loc.code} className="flex items-center">
                {i > 0 && (
                  <span
                    aria-hidden="true"
                    className="text-[0.5rem] px-[2px]"
                    style={{ color: "rgba(201,168,76,0.25)" }}
                  >·</span>
                )}
                <button
                  lang={loc.lang}
                  aria-pressed={locale === loc.code}
                  aria-label={loc.ariaLabel}
                  onClick={() => handleLangChange(loc.code)}
                  className={`
                    text-[0.6rem] font-medium tracking-[0.12em] uppercase
                    bg-transparent border-none cursor-pointer px-1 py-1 rounded-sm
                    transition-colors duration-250
                    ${locale === loc.code ? isScrolledLangAct : isScrolledLang}
                    hover:text-[#C9A84C]
                  `}
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {loc.label}
                </button>
              </span>
            ))}
          </div>

          {/* Zanaat Çantası */}
          <button
            className={`${S.iconBtn} ${isScrolledIcon}`}
            aria-label={`Zanaat Çantası${cartCount > 0 ? ` — ${cartCount} eser` : ""}`}
          >
            <BagIcon />
            {cartCount > 0 && (
              <span
                aria-hidden="true"
                className="absolute top-[6px] right-[6px] w-[14px] h-[14px] rounded-full
                           flex items-center justify-center
                           text-[10px] font-bold leading-none"
                style={{ background: "#C9A84C", color: "#1A0F0A" }}
              >
                {cartCount > 9 ? "9+" : cartCount}
              </span>
            )}
          </button>

          {/* Hamburger (yalnızca mobil) */}
          <button
            ref={menuBtnRef}
            className={`${S.iconBtn} ${isScrolledIcon} md:hidden`}
            id="menu-btn"
            aria-label={menuOpen ? "Menüyü Kapat" : "Menüyü Aç"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => menuOpen ? closeMenu() : openMenu()}
          >
            <span
              aria-hidden="true"
              className={`flex flex-col justify-center gap-[5px] w-[22px] h-[16px] ${menuOpen ? "ham-open" : ""}`}
            >
              <span className="ham-1 block h-px bg-current origin-center" style={{ width: "22px", transition: "transform 0.4s cubic-bezier(0.4,0,0.2,1), width 0.4s ease" }} />
              <span className="ham-2 block h-px bg-current origin-center" style={{ width: "14px", transition: "transform 0.4s cubic-bezier(0.4,0,0.2,1), opacity 0.4s ease" }} />
              <span className="ham-3 block h-px bg-current origin-center" style={{ width: "18px", transition: "transform 0.4s cubic-bezier(0.4,0,0.2,1), width 0.4s ease" }} />
            </span>
          </button>
        </div>
      </header>

      {/* ════════════════ MOBİL OVERLAY MENÜ ════════════════ */}
      <nav
        ref={menuRef}
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Mobil Navigasyon"
        aria-hidden={!menuOpen}
        onKeyDown={onMenuKeyDown}
        className={`
          menu-grain
          fixed inset-0 z-[80] flex flex-col overflow-hidden
          transition-[clip-path] duration-[650ms] ease-[cubic-bezier(0.76,0,0.24,1)]
          ${menuOpen ? "menu-opened" : "menu-closed"}
        `}
        style={{ backgroundColor: "#1A0F0A" }}
      >
        <div className="relative z-10 flex flex-col flex-1 pt-[88px] pb-10 px-8">

          {/* ── Menü linkleri ── */}
          <ul className="flex flex-col flex-1" role="list">
            {NAV_ITEMS.map(item => (
              <li key={item.href} className="menu-link-item border-b border-[rgba(201,168,76,0.1)]">
                <Link
                  href={item.href}
                  className="flex items-baseline gap-4 py-[1.1rem] no-underline w-full"
                  style={{ color: "rgba(245,236,215,0.75)" }}
                  onClick={closeMenu}
                >
                  <span
                    aria-hidden="true"
                    className="text-[0.7rem] tracking-[0.1em] w-5 flex-shrink-0"
                    style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, color: "rgba(201,168,76,0.4)" }}
                  >
                    {item.num}
                  </span>
                  <span
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "clamp(2rem, 8vw, 2.8rem)",
                      fontWeight: 300,
                      letterSpacing: "0.04em",
                    }}
                  >
                    {t(item.labelKey)}
                  </span>
                  <span
                    aria-hidden="true"
                    className="ml-auto text-[0.62rem] tracking-[0.18em] uppercase"
                    style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, color: "rgba(201,168,76,0.35)" }}
                  >
                    {labelEnMap[item.labelKey]}
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          {/* ── Menü alt alan ── */}
          <div className="menu-footer-inner pt-8 flex flex-col gap-6">

            {/* Dil seçici */}
            <div className="flex gap-2" role="group" aria-label="Dil Seçimi">
              {LOCALES.map(loc => (
                <button
                  key={loc.code}
                  lang={loc.lang}
                  aria-pressed={locale === loc.code}
                  onClick={() => { handleLangChange(loc.code); closeMenu(); }}
                  className={`
                    text-[0.65rem] tracking-[0.14em] uppercase
                    bg-transparent cursor-pointer
                    px-3 py-[6px] rounded-sm
                    border transition-all duration-250
                    ${locale === loc.code
                      ? "text-[#C9A84C] border-[rgba(201,168,76,0.35)]"
                      : "text-[rgba(245,236,215,0.4)] border-transparent hover:text-[#C9A84C] hover:border-[rgba(201,168,76,0.35)]"
                    }
                  `}
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {loc.label}
                </button>
              ))}
            </div>

            {/* İletişim kısa */}
            <p
              className="text-[0.65rem] tracking-[0.12em]"
              style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, color: "rgba(245,236,215,0.25)" }}
            >
              <a
                href="mailto:info@fatmamentesart.com"
                className="transition-colors duration-250 hover:text-[#C9A84C]"
                style={{ color: "rgba(245,236,215,0.4)" }}
              >
                info@fatmamentesart.com
              </a>
              {" · "}
              <a
                href="https://instagram.com/fatmamentes"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors duration-250 hover:text-[#C9A84C]"
                style={{ color: "rgba(245,236,215,0.4)" }}
              >
                Instagram
              </a>
            </p>
          </div>
        </div>

        <MenuCornerDeco />
      </nav>
    </>
  );
}
