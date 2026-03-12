"use client";

/**
 * SplashScreen — Fatma Menteş | Derinin Hafızası
 *
 * Açılış animasyon ekranı. Video geldiğinde SVG bloğu tek satırla
 * <video autoPlay muted loop playsInline> ile değiştirilir.
 *
 * Animasyon sırası:
 *   0.4s  → Grain doku
 *   0.8s  → SVG el illüstrasyonu (stroke-dashoffset çizim efekti)
 *   3.0s  → Yatay altın çizgi
 *   3.3s  → Logo
 *   4.1s  → Tezhip süsü
 *   4.6s  → Ana alıntı (ghostFade)
 *   6.0s  → Scroll ipucu
 *   9.0s  → Otomatik geçiş (erişilebilirlik)
 *
 * Geçiş tetikleyiciler: scroll · swipe · Space · Enter · ArrowDown
 * Kapatıldığında: translateY(-100vh) + opacity 0 (0.95s ease)
 *
 * Bağımlılıklar: Yalnızca React hooks — harici kütüphane yok
 */

import { useEffect, useRef, useCallback, useState } from "react";

/* ─── Animasyon süre sabitleri (ms) ─── */
const AUTO_DISMISS_MS = 9000;

/* ─── Tezhip Ornament SVG ─── */
function Ornament() {
  return (
    <svg
      aria-hidden="true"
      width="200"
      height="14"
      viewBox="0 0 200 14"
      fill="none"
    >
      <line x1="0"   y1="7" x2="76"  y2="7" stroke="#C9A84C" strokeWidth="0.6" strokeOpacity="0.5"/>
      <circle cx="84"  cy="7" r="2.8" stroke="#C9A84C" strokeWidth="0.7" strokeOpacity="0.7" fill="none"/>
      <circle cx="100" cy="7" r="4.5" stroke="#C9A84C" strokeWidth="0.7" strokeOpacity="0.85" fill="none"/>
      <circle cx="100" cy="7" r="1.6" fill="#C9A84C" fillOpacity="0.65"/>
      <circle cx="116" cy="7" r="2.8" stroke="#C9A84C" strokeWidth="0.7" strokeOpacity="0.7" fill="none"/>
      <line x1="124" y1="7" x2="200" y2="7" stroke="#C9A84C" strokeWidth="0.6" strokeOpacity="0.5"/>
    </svg>
  );
}

/* ─── El İllüstrasyonu SVG ─── */
function HandsIllustration() {
  return (
    <svg
      viewBox="0 0 340 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="hands-svg"
      aria-label="Deri üzerine el dikişi yapan eller illüstrasyonu"
      role="img"
    >
      {/* Deri parçası */}
      <path className="draw-path"
        d="M60 115 Q80 105 120 108 Q170 112 200 110 Q240 107 280 115 Q290 118 285 130 Q280 142 260 145 Q220 150 180 148 Q140 146 110 148 Q80 150 65 142 Q55 135 60 115Z"
        stroke="#C9A84C" strokeWidth="1.2" strokeOpacity="0.85"
      />
      <path className="draw-path-detail"
        d="M80 120 Q120 116 160 118 Q200 120 240 117"
        stroke="#C9A84C" strokeWidth="0.5" strokeOpacity="0.4"
      />
      <path className="draw-path-detail"
        d="M85 128 Q130 124 170 126 Q210 128 250 125"
        stroke="#C9A84C" strokeWidth="0.5" strokeOpacity="0.4"
      />
      <path className="draw-path-detail"
        d="M80 136 Q120 133 160 134 Q200 136 240 133"
        stroke="#C9A84C" strokeWidth="0.5" strokeOpacity="0.3"
      />

      {/* Dikiş izleri */}
      {[100,116,132,148,164,180,196,212,228].map((x, i) => (
        <line key={i} x1={x} y1="118" x2={x+8} y2="118"
          stroke="#C9A84C" strokeWidth="1.2" strokeOpacity="0.9" strokeLinecap="round"
          className="draw-path-detail"
        />
      ))}
      <circle cx="240" cy="118" r="1.5" fill="#C9A84C" fillOpacity="0.95" className="draw-path-detail"/>

      {/* Sol el */}
      <path className="draw-path"
        d="M10 170 Q8 155 12 140 Q16 128 22 120 Q26 113 32 110
           Q38 107 44 109 Q52 112 55 120 Q58 128 55 138
           Q53 148 50 155 Q46 163 42 168 Q36 174 28 175 Q18 176 10 170Z"
        stroke="#C9A84C" strokeWidth="1" strokeOpacity="0.8"
      />
      <path className="draw-path-fast" d="M22 110 Q20 98 22 86 Q24 76 30 74 Q36 72 38 80 Q40 90 38 102" stroke="#C9A84C" strokeWidth="0.9" strokeOpacity="0.75"/>
      <path className="draw-path-fast" d="M35 108 Q34 94 36 82 Q38 70 44 68 Q50 66 52 76 Q54 88 51 102" stroke="#C9A84C" strokeWidth="0.9" strokeOpacity="0.75"/>
      <path className="draw-path-fast" d="M46 110 Q46 96 49 84 Q52 72 57 71 Q63 70 64 80 Q65 92 62 106" stroke="#C9A84C" strokeWidth="0.9" strokeOpacity="0.75"/>
      <path className="draw-path-fast" d="M12 138 Q4 132 2 122 Q0 112 6 108 Q12 104 18 110" stroke="#C9A84C" strokeWidth="0.9" strokeOpacity="0.75"/>
      <path className="draw-path-detail" d="M18 145 Q28 143 40 146" stroke="#C9A84C" strokeWidth="0.4" strokeOpacity="0.4"/>
      <path className="draw-path-detail" d="M16 152 Q26 150 38 153" stroke="#C9A84C" strokeWidth="0.4" strokeOpacity="0.35"/>
      <path className="draw-path-fast" d="M55 120 L62 112 L68 106" stroke="#C9A84C" strokeWidth="0.8" strokeOpacity="0.7" strokeLinecap="round"/>

      {/* Sol iğne */}
      <line className="draw-path-detail" x1="64" y1="104" x2="96" y2="119" stroke="#C9A84C" strokeWidth="1.4" strokeOpacity="0.95" strokeLinecap="round"/>
      <ellipse className="draw-path-detail" cx="66" cy="103" rx="3.5" ry="2.2" transform="rotate(-28 66 103)" stroke="#C9A84C" strokeWidth="0.8" strokeOpacity="0.9" fill="none"/>
      <path className="draw-path-detail" d="M66 101 Q74 95 82 99 Q88 103 92 110 Q95 116 96 119" stroke="#C9A84C" strokeWidth="0.6" strokeOpacity="0.6" strokeDasharray="3 2"/>

      {/* Sağ el */}
      <path className="draw-path"
        d="M330 170 Q332 155 328 140 Q324 128 318 120 Q314 113 308 110
           Q302 107 296 109 Q288 112 285 120 Q282 128 285 138
           Q287 148 290 155 Q294 163 298 168 Q304 174 312 175 Q322 176 330 170Z"
        stroke="#C9A84C" strokeWidth="1" strokeOpacity="0.8"
      />
      <path className="draw-path-fast" d="M318 110 Q320 98 318 86 Q316 76 310 74 Q304 72 302 80 Q300 90 302 102" stroke="#C9A84C" strokeWidth="0.9" strokeOpacity="0.75"/>
      <path className="draw-path-fast" d="M305 108 Q306 94 304 82 Q302 70 296 68 Q290 66 288 76 Q286 88 289 102" stroke="#C9A84C" strokeWidth="0.9" strokeOpacity="0.75"/>
      <path className="draw-path-fast" d="M294 110 Q294 96 291 84 Q288 72 283 71 Q277 70 276 80 Q275 92 278 106" stroke="#C9A84C" strokeWidth="0.9" strokeOpacity="0.75"/>
      <path className="draw-path-fast" d="M328 138 Q336 132 338 122 Q340 112 334 108 Q328 104 322 110" stroke="#C9A84C" strokeWidth="0.9" strokeOpacity="0.75"/>
      <path className="draw-path-detail" d="M322 145 Q312 143 300 146" stroke="#C9A84C" strokeWidth="0.4" strokeOpacity="0.4"/>
      <path className="draw-path-detail" d="M324 152 Q314 150 302 153" stroke="#C9A84C" strokeWidth="0.4" strokeOpacity="0.35"/>
      <path className="draw-path-fast" d="M285 120 L278 112 L272 106" stroke="#C9A84C" strokeWidth="0.8" strokeOpacity="0.7" strokeLinecap="round"/>

      {/* Sağ iğne */}
      <line className="draw-path-detail" x1="276" y1="104" x2="244" y2="119" stroke="#C9A84C" strokeWidth="1.4" strokeOpacity="0.95" strokeLinecap="round"/>
      <ellipse className="draw-path-detail" cx="274" cy="103" rx="3.5" ry="2.2" transform="rotate(28 274 103)" stroke="#C9A84C" strokeWidth="0.8" strokeOpacity="0.9" fill="none"/>
      <path className="draw-path-detail" d="M274 101 Q266 95 258 99 Q252 103 248 110 Q245 116 244 119" stroke="#C9A84C" strokeWidth="0.6" strokeOpacity="0.6" strokeDasharray="3 2"/>

      {/* Alt gölge */}
      <ellipse cx="170" cy="200" rx="120" ry="8" fill="url(#shadowGrad)" opacity="0.25"/>
      <defs>
        <radialGradient id="shadowGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#C9A84C" stopOpacity="0.6"/>
          <stop offset="100%" stopColor="#C9A84C" stopOpacity="0"/>
        </radialGradient>
      </defs>
    </svg>
  );
}

/* ─── Ana Bileşen ─── */
export default function SplashScreen() {
  const [dismissed, setDismissed] = useState(false);
  const dismissedRef = useRef(false);

  const dismiss = useCallback(() => {
    if (dismissedRef.current) return;
    dismissedRef.current = true;
    setDismissed(true);
  }, []);

  useEffect(() => {
    /* Otomatik geçiş */
    const timer = setTimeout(dismiss, AUTO_DISMISS_MS);

    /* Event dinleyiciler */
    const onWheel    = () => dismiss();
    const onTouch    = () => dismiss();
    const onKey      = (e: KeyboardEvent) => {
      if (["ArrowDown", " ", "Enter"].includes(e.key)) dismiss();
    };

    window.addEventListener("wheel",      onWheel,  { passive: true });
    window.addEventListener("touchstart", onTouch,  { passive: true });
    window.addEventListener("keydown",    onKey);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("wheel",      onWheel);
      window.removeEventListener("touchstart", onTouch);
      window.removeEventListener("keydown",    onKey);
    };
  }, [dismiss]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=DM+Sans:wght@300;400&display=swap');

        /* ── Parçacık doku ── */
        .splash-grain::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23g)' opacity='0.065'/%3E%3C/svg%3E");
          pointer-events: none;
          animation: splashGrainIn 0.8s 0.4s both ease-out;
        }

        /* ── Vignette ── */
        .splash-grain::after {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.72) 100%);
          pointer-events: none;
          z-index: 0;
        }

        /* ── SVG el çizim animasyonları ── */
        .hands-svg {
          width: min(340px, 82vw);
          height: auto;
          animation: splashHandsIn 0.6s 0.8s both ease-out;
        }
        .draw-path {
          stroke-dasharray: 1200;
          stroke-dashoffset: 1200;
          animation: splashDraw 2.4s 1.0s both cubic-bezier(0.4,0,0.2,1);
          fill: none;
        }
        .draw-path-fast {
          stroke-dasharray: 600;
          stroke-dashoffset: 600;
          animation: splashDrawFast 1.6s 1.6s both cubic-bezier(0.4,0,0.2,1);
          fill: none;
        }
        .draw-path-detail {
          stroke-dasharray: 300;
          stroke-dashoffset: 300;
          animation: splashDrawDetail 1.2s 2.2s both ease-out;
          fill: none;
        }

        /* ── Yatay çizgi ── */
        .splash-rule {
          height: 1px;
          width: 0;
          background: linear-gradient(to right, transparent, #C9A84C, transparent);
          margin: 2rem 0 1.8rem;
          animation: splashRuleExpand 0.9s 3.0s both cubic-bezier(0.4,0,0.2,1);
        }

        /* ── Scroll çizgisi ── */
        .scroll-line {
          width: 1px;
          height: 40px;
          background: linear-gradient(to bottom, #C9A84C, transparent);
          animation: splashScrollPulse 1.8s 6.5s infinite ease-in-out;
          transform-origin: top;
        }

        /* ── Köşe süsleri ── */
        .splash-corner {
          position: absolute;
          pointer-events: none;
          opacity: 0;
          animation: splashCornerIn 1.2s 3.0s both ease-out;
        }

        /* ── Keyframes ── */
        @keyframes splashGrainIn   { from { opacity:0 } to { opacity:1 } }
        @keyframes splashHandsIn   { from { opacity:0; transform:scale(0.96) } to { opacity:1; transform:scale(1) } }
        @keyframes splashDraw      { to { stroke-dashoffset: 0 } }
        @keyframes splashDrawFast  { to { stroke-dashoffset: 0 } }
        @keyframes splashDrawDetail{ to { stroke-dashoffset: 0 } }
        @keyframes splashRuleExpand{
          from { width:0; opacity:0 }
          to   { width: min(220px, 55vw); opacity:1 }
        }
        @keyframes splashTextFade  {
          from { opacity:0; transform:translateY(8px) }
          to   { opacity:1; transform:translateY(0)   }
        }
        @keyframes splashGhostFade {
          from { opacity:0; letter-spacing:0.14em }
          to   { opacity:1; letter-spacing:0.06em  }
        }
        @keyframes splashScrollPulse {
          0%   { transform:scaleY(0); opacity:0; transform-origin:top    }
          50%  { transform:scaleY(1); opacity:1                          }
          100% { transform:scaleY(0); opacity:0; transform-origin:bottom }
        }
        @keyframes splashCornerIn  { to { opacity:0.12 } }
      `}</style>

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Fatma Menteş — Açılış Ekranı"
        onClick={dismiss}
        style={{
          position: "fixed",
          inset: 0,
          backgroundColor: "#1A0F0A",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 100,
          overflow: "hidden",
          transition: "transform 0.95s cubic-bezier(0.76,0,0.24,1), opacity 0.95s ease",
          transform: dismissed ? "translateY(-100%)" : "translateY(0)",
          opacity:   dismissed ? 0 : 1,
          pointerEvents: dismissed ? "none" : "auto",
          cursor: "default",
        }}
        className="splash-grain"
      >
        {/* ── Köşe tezhip süsleri ── */}
        {[
          { style: { top: 0,    left:  0             } },
          { style: { top: 0,    right: 0, transform: "scaleX(-1)" } },
          { style: { bottom: 0, left:  0, transform: "scaleY(-1)" } },
          { style: { bottom: 0, right: 0, transform: "scale(-1,-1)" } },
        ].map((corner, i) => (
          <svg
            key={i}
            className="splash-corner"
            style={{ ...corner.style }}
            width="120" height="120" viewBox="0 0 120 120" fill="none"
            aria-hidden="true"
          >
            <path d="M0 0 L60 0 Q30 0 0 30 Z" stroke="#C9A84C" strokeWidth="0.5" fill="none"/>
            <path d="M0 0 L45 0 Q15 0 0 22 Z" stroke="#C9A84C" strokeWidth="0.3" fill="none"/>
            <circle cx="0" cy="0" r="80" stroke="#C9A84C" strokeWidth="0.4" fill="none"/>
            <circle cx="0" cy="0" r="55" stroke="#C9A84C" strokeWidth="0.3" fill="none"/>
            <line x1="0" y1="0" x2="90" y2="30" stroke="#C9A84C" strokeWidth="0.3" strokeOpacity="0.5"/>
            <line x1="0" y1="0" x2="30" y2="90" stroke="#C9A84C" strokeWidth="0.3" strokeOpacity="0.5"/>
          </svg>
        ))}

        {/* ── Merkez içerik ── */}
        <div
          style={{
            position: "relative",
            zIndex: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            padding: "2rem",
          }}
        >
          {/*
            ── GÖRSEL BLOK ──
            Video geldiğinde bu SVG bloğu aşağıdaki video tag ile değiştirilir:
            <video
              autoPlay muted loop playsInline
              className="hands-svg"
              aria-label="Deri üzerine el dikişi videosu"
              style={{ objectFit: "cover", borderRadius: "2px" }}
            >
              <source src="/video/splash.webm" type="video/webm" />
              <source src="/video/splash.mp4"  type="video/mp4"  />
            </video>
          */}
          <HandsIllustration />

          {/* Yatay çizgi */}
          <div className="splash-rule" aria-hidden="true" />

          {/* Logo */}
          <h1
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(1.9rem, 6vw, 3.2rem)",
              fontWeight: 300,
              letterSpacing: "0.18em",
              color: "#F5ECD7",
              textTransform: "uppercase",
              lineHeight: 1,
              animation: "splashTextFade 1.1s 3.3s both ease-out",
            }}
          >
            Fatma Menteş
          </h1>

          <p
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(0.72rem, 2vw, 0.88rem)",
              fontWeight: 300,
              fontStyle: "italic",
              letterSpacing: "0.28em",
              color: "#C9A84C",
              textTransform: "uppercase",
              marginTop: "0.5rem",
              animation: "splashTextFade 1.1s 3.7s both ease-out",
            }}
          >
            Derinin Hafızası
          </p>

          {/* Tezhip */}
          <div style={{ marginTop: "1.6rem", animation: "splashTextFade 0.9s 4.1s both ease-out" }}>
            <Ornament />
          </div>

          {/* Ana alıntı */}
          <p
            lang="tr"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(1.0rem, 3vw, 1.28rem)",
              fontWeight: 300,
              fontStyle: "italic",
              color: "rgba(245,236,215,0.65)",
              letterSpacing: "0.06em",
              marginTop: "1.2rem",
              lineHeight: 1.6,
              maxWidth: "360px",
              animation: "splashGhostFade 1.4s 4.6s both ease-out",
            }}
          >
            "Deri nefes alan bir canlıdır. Dinle…"
          </p>
        </div>

        {/* ── Scroll ipucu ── */}
        <div
          aria-label="Aşağı kaydırın"
          style={{
            position: "absolute",
            bottom: "2.5rem",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.5rem",
            animation: "splashTextFade 1s 6.0s both ease-out",
            zIndex: 10,
          }}
        >
          <span
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.6rem",
              letterSpacing: "0.24em",
              textTransform: "uppercase",
              color: "rgba(201,168,76,0.55)",
            }}
          >
            Keşfet
          </span>
          <div className="scroll-line" aria-hidden="true" />
        </div>
      </div>
    </>
  );
}
