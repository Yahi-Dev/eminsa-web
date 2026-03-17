"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";

// ─── Inline SVG Product Illustrations ────────────────────────────────────────

function TipoPosteSVG() {
  return (
    <svg viewBox="0 0 320 420" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <linearGradient id="pole" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#5a3e1b"/>
          <stop offset="40%" stopColor="#8B6030"/>
          <stop offset="100%" stopColor="#4a3010"/>
        </linearGradient>
        <linearGradient id="body" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#6b7a8a"/>
          <stop offset="30%" stopColor="#c8d4de"/>
          <stop offset="65%" stopColor="#d8e4ee"/>
          <stop offset="100%" stopColor="#7a8a9a"/>
        </linearGradient>
        <linearGradient id="bodyTop" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e0ecf8"/>
          <stop offset="100%" stopColor="#b0c4d8"/>
        </linearGradient>
        <linearGradient id="bushing" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f8f8f8"/>
          <stop offset="100%" stopColor="#c8c8c8"/>
        </linearGradient>
        <linearGradient id="glow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0099ce" stopOpacity="0.4"/>
          <stop offset="100%" stopColor="#0099ce" stopOpacity="0"/>
        </linearGradient>
        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="8" stdDeviation="10" floodColor="#000" floodOpacity="0.5"/>
        </filter>
      </defs>

      {/* Ground shadow */}
      <ellipse cx="160" cy="410" rx="60" ry="8" fill="#000" opacity="0.2"/>

      {/* Utility pole */}
      <rect x="152" y="140" width="16" height="265" rx="2" fill="url(#pole)"/>

      {/* Crossarm */}
      <rect x="80" y="148" width="160" height="12" rx="3" fill="#7a6030"/>
      <rect x="84" y="143" width="4" height="22" rx="1" fill="#6a5025"/>
      <rect x="232" y="143" width="4" height="22" rx="1" fill="#6a5025"/>

      {/* Mounting bracket */}
      <rect x="144" y="155" width="32" height="18" rx="2" fill="#909090"/>
      <rect x="148" y="158" width="24" height="12" rx="1" fill="#7a7a7a"/>

      {/* Transformer body — cylinder */}
      {/* Top ellipse */}
      <ellipse cx="160" cy="178" rx="52" ry="13" fill="url(#bodyTop)"/>
      {/* Body */}
      <rect x="108" y="178" width="104" height="180" fill="url(#body)" filter="url(#shadow)"/>
      {/* Bottom ellipse */}
      <ellipse cx="160" cy="358" rx="52" ry="13" fill="#8a9aaa"/>
      {/* Side shading */}
      <rect x="108" y="178" width="18" height="180" fill="#5a6a7a" opacity="0.5"/>
      <rect x="194" y="178" width="18" height="180" fill="#3a4a5a" opacity="0.3"/>

      {/* Horizontal ribs */}
      {[210, 240, 270, 300, 330].map(y => (
        <ellipse key={y} cx="160" cy={y} rx="52" ry="4" fill="#9aaabb" opacity="0.5"/>
      ))}

      {/* EMINSA nameplate */}
      <rect x="124" y="220" width="72" height="26" rx="3" fill="#00269b"/>
      <text x="160" y="232" fill="white" fontSize="7" textAnchor="middle" fontFamily="sans-serif" fontWeight="700" letterSpacing="1">EMINSA</text>
      <text x="160" y="241" fill="#88aaff" fontSize="5" textAnchor="middle" fontFamily="sans-serif">MTN · IEEE C57</text>

      {/* Tap changer box */}
      <rect x="130" y="268" width="60" height="36" rx="3" fill="#a0aab8" stroke="#8090a0" strokeWidth="1"/>
      <rect x="134" y="272" width="52" height="28" rx="2" fill="#b0bac8"/>
      <text x="160" y="284" fill="#405060" fontSize="5.5" textAnchor="middle" fontFamily="sans-serif" fontWeight="600">TAP CHANGER</text>
      {[0,1,2,3,4,5,6].map(i => (
        <circle key={i} cx={137 + i * 7} cy="293" r="2.5" fill={i === 3 ? "#0099ce" : "#708090"} stroke="#506070" strokeWidth="0.5"/>
      ))}

      {/* LV Bushings (bottom) */}
      {[130, 143, 157, 170, 182].map((x, i) => (
        <g key={i}>
          <rect x={x} y="358" width="7" height={22 + (i === 2 ? 5 : 0)} rx="1.5" fill="#b0baba"/>
          <ellipse cx={x + 3.5} cy="358" rx="5" ry="2" fill="#d0d8d8"/>
        </g>
      ))}

      {/* HV Bushings (top) — 3 tall insulators */}
      {[130, 157, 184].map((x, i) => (
        <g key={i}>
          {/* Stack of insulator discs */}
          {[0,1,2,3,4].map(j => (
            <ellipse key={j} cx={x + 5} cy={178 - 14 - j * 12} rx="8" ry="3.5" fill="url(#bushing)" stroke="#d0d0d0" strokeWidth="0.5"/>
          ))}
          <rect x={x + 2} y={118} width="6" height={60} rx="1.5" fill="#e0e0e0"/>
          {/* Metal cap */}
          <ellipse cx={x + 5} cy="115" rx="6" ry="3" fill="#c0c0c0"/>
          <circle cx={x + 5} cy="112" r="2.5" fill="#909090"/>
          {/* HV connection wire */}
          <line x1={x + 5} y1="112" x2={i === 0 ? 88 : i === 1 ? 160 : 232} y2="120" stroke="#404040" strokeWidth="1.5"/>
        </g>
      ))}

      {/* Top glow accent */}
      <rect x="108" y="178" width="104" height="30" fill="url(#glow)" opacity="0.6"/>
    </svg>
  );
}

function PadMountedSVG() {
  return (
    <svg viewBox="0 0 380 340" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <linearGradient id="cabinet" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#1a4a2a"/>
          <stop offset="15%" stopColor="#2a6a3e"/>
          <stop offset="50%" stopColor="#3a8050"/>
          <stop offset="85%" stopColor="#2a6a3e"/>
          <stop offset="100%" stopColor="#1a4a2a"/>
        </linearGradient>
        <linearGradient id="cabinetTop" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4a9060"/>
          <stop offset="100%" stopColor="#2a6a3e"/>
        </linearGradient>
        <linearGradient id="pad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#b0b8c0"/>
          <stop offset="100%" stopColor="#808890"/>
        </linearGradient>
        <linearGradient id="greenGlow" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#009e49" stopOpacity="0.5"/>
          <stop offset="100%" stopColor="#009e49" stopOpacity="0"/>
        </linearGradient>
        <filter id="s2" x="-10%" y="-10%" width="120%" height="130%">
          <feDropShadow dx="0" dy="10" stdDeviation="14" floodColor="#000" floodOpacity="0.5"/>
        </filter>
      </defs>

      {/* Ground shadow */}
      <ellipse cx="190" cy="330" rx="120" ry="10" fill="#000" opacity="0.25"/>

      {/* Concrete pad */}
      <rect x="60" y="280" width="260" height="36" rx="4" fill="url(#pad)"/>
      <rect x="64" y="283" width="252" height="6" rx="2" fill="#c8d0d8" opacity="0.5"/>
      {[80,110,140,170,200,230,260,290].map(x => (
        <line key={x} x1={x} y1="283" x2={x} y2="316" stroke="#909898" strokeWidth="0.5" opacity="0.4"/>
      ))}

      {/* Main cabinet body */}
      <rect x="70" y="60" width="240" height="224" rx="5" fill="url(#cabinet)" filter="url(#s2)"/>

      {/* Cabinet top panel */}
      <rect x="70" y="60" width="240" height="22" rx="5" fill="url(#cabinetTop)"/>
      <rect x="75" y="60" width="230" height="8" rx="3" fill="#50a070" opacity="0.6"/>

      {/* HV conduit entry (top) */}
      <rect x="120" y="45" width="30" height="20" rx="3" fill="#1a5030"/>
      <rect x="230" y="45" width="30" height="20" rx="3" fill="#1a5030"/>
      <ellipse cx="135" cy="45" rx="12" ry="4" fill="#102818"/>
      <ellipse cx="245" cy="45" rx="12" ry="4" fill="#102818"/>

      {/* Center divider between two doors */}
      <rect x="187" y="82" width="6" height="170" rx="1" fill="#1a4a2a"/>

      {/* Left door */}
      <rect x="80" y="82" width="104" height="170" rx="3" fill="#2e7040" stroke="#1a4a2a" strokeWidth="1.5"/>
      {/* Left door vents */}
      {[100,115,130,145,160,175,190,205,220].map(y => (
        <rect key={y} x="90" y={y} width="84" height="4" rx="1" fill="#1a5030" opacity="0.7"/>
      ))}
      {/* Left handle */}
      <rect x="178" y="155" width="6" height="30" rx="2" fill="#c0c8c0"/>
      <rect x="176" y="157" width="10" height="4" rx="1" fill="#a0a8a0"/>
      <rect x="176" y="179" width="10" height="4" rx="1" fill="#a0a8a0"/>

      {/* Right door */}
      <rect x="196" y="82" width="104" height="170" rx="3" fill="#2e7040" stroke="#1a4a2a" strokeWidth="1.5"/>
      {/* Right door vents */}
      {[100,115,130,145,160,175,190,205,220].map(y => (
        <rect key={y} x="206" y={y} width="84" height="4" rx="1" fill="#1a5030" opacity="0.7"/>
      ))}
      {/* Right handle */}
      <rect x="196" y="155" width="6" height="30" rx="2" fill="#c0c8c0"/>
      <rect x="194" y="157" width="10" height="4" rx="1" fill="#a0a8a0"/>
      <rect x="194" y="179" width="10" height="4" rx="1" fill="#a0a8a0"/>

      {/* Warning label — left door */}
      <rect x="96" y="88" width="40" height="40" rx="2" fill="#f5c518"/>
      <polygon points="116,95 130,122 102,122" fill="#1a1a1a"/>
      <rect x="114" y="103" width="4" height="12" rx="1" fill="#f5c518"/>
      <circle cx="116" cy="119" r="2.5" fill="#f5c518"/>

      {/* EMINSA nameplate */}
      <rect x="96" y="134" width="84" height="22" rx="2" fill="#00269b"/>
      <text x="138" y="144" fill="white" fontSize="7" textAnchor="middle" fontFamily="sans-serif" fontWeight="700" letterSpacing="1">EMINSA</text>
      <text x="138" y="151" fill="#88aaff" fontSize="5" textAnchor="middle" fontFamily="sans-serif">PAD MOUNTED · MTN</text>

      {/* Rating plate right door */}
      <rect x="210" y="88" width="80" height="50" rx="2" fill="#e8eef4" stroke="#c0c8d0" strokeWidth="0.5"/>
      <text x="250" y="102" fill="#203040" fontSize="6" textAnchor="middle" fontFamily="monospace" fontWeight="600">RATING PLATE</text>
      {[["kVA","750"],["HV","13.2 kV"],["LV","0.48 kV"],["Hz","60"]].map(([l,v], i) => (
        <g key={l}>
          <text x="216" y={113 + i*10} fill="#506070" fontSize="5.5" fontFamily="monospace">{l}</text>
          <text x="290" y={113 + i*10} fill="#203040" fontSize="5.5" fontFamily="monospace" textAnchor="end">{v}</text>
          <line x1="214" y1={115 + i*10} x2="286" y2={115 + i*10} stroke="#d0d8e0" strokeWidth="0.5"/>
        </g>
      ))}

      {/* Ground lug */}
      <rect x="170" y="262" width="40" height="20" rx="2" fill="#8a9290"/>
      <text x="190" y="274" fill="white" fontSize="6" textAnchor="middle" fontFamily="sans-serif">GND</text>

      {/* Top glow */}
      <rect x="70" y="60" width="240" height="60" fill="url(#greenGlow)" opacity="0.4" rx="5"/>
    </svg>
  );
}

function SubestacionSVG() {
  return (
    <svg viewBox="0 0 420 380" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <linearGradient id="tank" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#4a5560"/>
          <stop offset="20%" stopColor="#8a9aaa"/>
          <stop offset="55%" stopColor="#a0b0c0"/>
          <stop offset="80%" stopColor="#8a9aaa"/>
          <stop offset="100%" stopColor="#4a5560"/>
        </linearGradient>
        <linearGradient id="tankTop" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#b8c8d8"/>
          <stop offset="100%" stopColor="#8898a8"/>
        </linearGradient>
        <linearGradient id="tankSide" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#3a4550"/>
          <stop offset="100%" stopColor="#5a6570"/>
        </linearGradient>
        <linearGradient id="hvBush" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f5f5f5"/>
          <stop offset="100%" stopColor="#c8c8c8"/>
        </linearGradient>
        <linearGradient id="blueGlow" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#00269b" stopOpacity="0.5"/>
          <stop offset="100%" stopColor="#00269b" stopOpacity="0"/>
        </linearGradient>
        <filter id="s3" x="-5%" y="-5%" width="115%" height="125%">
          <feDropShadow dx="4" dy="12" stdDeviation="16" floodColor="#000" floodOpacity="0.6"/>
        </filter>
      </defs>

      {/* Ground */}
      <ellipse cx="210" cy="372" rx="150" ry="10" fill="#000" opacity="0.2"/>

      {/* 3D side face */}
      <polygon points="330,90 370,110 370,300 330,280" fill="url(#tankSide)"/>
      <polygon points="330,90 370,110 210,110 170,90" fill="url(#tankTop)" opacity="0.9"/>

      {/* Main tank body (front face) */}
      <rect x="80" y="90" width="250" height="190" rx="4" fill="url(#tank)" filter="url(#s3)"/>

      {/* Horizontal stiffener rings */}
      {[120,150,185,220,255].map(y => (
        <rect key={y} x="80" y={y} width="250" height="6" rx="0" fill="#6a7a8a" opacity="0.6"/>
      ))}

      {/* Radiator banks — left side */}
      <g>
        {[0,1,2,3,4,5,6,7].map(i => (
          <g key={i}>
            <rect x={18 + i*7} y="110" width="4" height="140" rx="1" fill="#6a7a8a" stroke="#5a6a7a" strokeWidth="0.5"/>
            <rect x={16 + i*7} y="108" width="8" height="4" rx="1" fill="#8a9aaa"/>
            <rect x={16 + i*7} y="248" width="8" height="4" rx="1" fill="#8a9aaa"/>
          </g>
        ))}
        <rect x="14" y="106" width="62" height="6" rx="2" fill="#7a8a9a"/>
        <rect x="14" y="250" width="62" height="6" rx="2" fill="#7a8a9a"/>
      </g>

      {/* Radiator banks — right side */}
      <g>
        {[0,1,2,3,4,5,6,7].map(i => (
          <g key={i}>
            <rect x={334 + i*7} y="110" width="4" height="140" rx="1" fill="#6a7a8a" stroke="#5a6a7a" strokeWidth="0.5"/>
            <rect x={332 + i*7} y="108" width="8" height="4" rx="1" fill="#8a9aaa"/>
            <rect x={332 + i*7} y="248" width="8" height="4" rx="1" fill="#8a9aaa"/>
          </g>
        ))}
        <rect x="330" y="106" width="62" height="6" rx="2" fill="#7a8a9a"/>
        <rect x="330" y="250" width="62" height="6" rx="2" fill="#7a8a9a"/>
      </g>

      {/* EMINSA nameplate */}
      <rect x="148" y="145" width="114" height="32" rx="3" fill="#00269b"/>
      <text x="205" y="159" fill="white" fontSize="9" textAnchor="middle" fontFamily="sans-serif" fontWeight="700" letterSpacing="1.5">EMINSA</text>
      <text x="205" y="170" fill="#88aaff" fontSize="5.5" textAnchor="middle" fontFamily="sans-serif">DIVISIÓN MTN · ANSI/IEEE</text>

      {/* Rating data panel */}
      <rect x="100" y="190" width="110" height="70" rx="2" fill="#3a4a5a" stroke="#5a6a7a" strokeWidth="0.5"/>
      {[["MVA","10"],["HV kV","115"],["LV kV","13.2"],["Hz","60"],["IMP %","7.5"]].map(([l,v],i) => (
        <g key={l}>
          <text x="108" y={202 + i*12} fill="#8aaccc" fontSize="5.5" fontFamily="monospace">{l}</text>
          <text x="202" y={202 + i*12} fill="#d0e4f8" fontSize="5.5" fontFamily="monospace" textAnchor="end" fontWeight="600">{v}</text>
          <line x1="106" y1={204 + i*12} x2="206" y2={204 + i*12} stroke="#4a5a6a" strokeWidth="0.4"/>
        </g>
      ))}

      {/* Conservator (oil expansion tank on top) */}
      <rect x="180" y="66" width="80" height="28" rx="8" fill="#6a7a8a" stroke="#8a9aaa" strokeWidth="1"/>
      <ellipse cx="220" cy="66" rx="40" ry="6" fill="#8a9aaa"/>
      <rect x="215" y="55" width="10" height="16" rx="2" fill="#7a8a9a"/>

      {/* PRV (pressure relief valve) */}
      <rect x="290" y="82" width="12" height="20" rx="2" fill="#9a6030"/>
      <ellipse cx="296" cy="82" rx="7" ry="3" fill="#b07040"/>
      <line x1="296" y1="72" x2="296" y2="82" stroke="#8a5020" strokeWidth="2"/>

      {/* HV Bushings — 3 tall porcelain insulators */}
      {[130, 200, 270].map((x, i) => (
        <g key={i}>
          {/* Base flange */}
          <rect x={x - 10} y="88" width="20" height="8" rx="2" fill="#909090"/>
          {/* Insulator rod */}
          <rect x={x - 4} y="18" width="8" height="70" rx="2" fill="#e8e8e8"/>
          {/* Insulator skirt discs */}
          {[20,30,40,50,60,70,80].map(y => (
            <ellipse key={y} cx={x} cy={y} rx={10 - (y < 50 ? 0 : 1)} ry="3.5" fill="url(#hvBush)" stroke="#d0d0d0" strokeWidth="0.5"/>
          ))}
          {/* Metal cap */}
          <ellipse cx={x} cy="17" rx="6" ry="3" fill="#c0c0c0"/>
          <circle cx={x} cy="14" r="3" fill="#909090"/>
          {/* Conductor */}
          <line x1={x} y1="11" x2={x} y2="4" stroke="#606060" strokeWidth="2"/>
          <circle cx={x} cy="3" r="4" fill="#808080" stroke="#606060" strokeWidth="1"/>
        </g>
      ))}

      {/* LV Bushings — side */}
      {[100,116,132,148].map((y,i) => (
        <g key={i}>
          <rect x="316" y={y} width="22" height="8" rx="2" fill="#8a8a8a"/>
          {[0,1,2].map(j => (
            <ellipse key={j} cx={330 + j*4} cy={y+4} rx="5" ry="2" fill="#d0d0d0" stroke="#b0b0b0" strokeWidth="0.5"/>
          ))}
        </g>
      ))}

      {/* Top glow accent */}
      <rect x="80" y="90" width="250" height="50" fill="url(#blueGlow)" opacity="0.5" rx="4"/>

      {/* Ground connection */}
      <line x1="80" y1="270" x2="60" y2="290" stroke="#6a8a6a" strokeWidth="3"/>
      <line x1="60" y1="290" x2="45" y2="290" stroke="#6a8a6a" strokeWidth="3"/>
      <text x="40" y="295" fill="#6a8a6a" fontSize="7" fontFamily="sans-serif" textAnchor="end">GND</text>
    </svg>
  );
}

const PRODUCT_SVGS = [TipoPosteSVG, PadMountedSVG, SubestacionSVG];

// ─── Accent colors per product ────────────────────────────────────────────────
const ACCENTS = ["#0099ce", "#009e49", "#00269b"];
const ACCENT_DARKS = ["#006a90", "#006a30", "#001880"];

// ─── Component ───────────────────────────────────────────────────────────────

export default function MTNHeroSection() {
  const t = useTranslations("home");
  const [active, setActive] = useState(0);
  const [dir, setDir] = useState(1);
  const [autoPlay, setAutoPlay] = useState(true);
  const [bar, setBar] = useState(0);
  const barRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const DURATION = 6000;

  const slides = [
    {
      id: "tipo-poste",
      eyebrow: "Distribución aérea · Norma IEEE C57",
      name: t("mtn.slides.tipoPoste.name"),
      subtitle: t("mtn.slides.tipoPoste.subtitle"),
      specs: [
        { label: "Potencia", value: "15–500", unit: "KVA" },
        { label: "Voltaje", value: "34.5", unit: "KV" },
        { label: "Fases", value: "1–3", unit: "Ф" },
      ],
      tags: ["IEEE C57", "DOE 2016", "ANSI"],
      quoteHref: "/mtn/cotizaciones",
      productHref: "/mtn/productos/tipo-poste",
    },
    {
      id: "pad-mounted",
      eyebrow: "Distribución subterránea · Gabinete hermético",
      name: t("mtn.slides.padMounted.name"),
      subtitle: t("mtn.slides.padMounted.subtitle"),
      specs: [
        { label: "Potencia", value: "30–3k", unit: "KVA" },
        { label: "Voltaje", value: "34.5", unit: "KV" },
        { label: "Fases", value: "1–3", unit: "Ф" },
      ],
      tags: ["IEEE C57", "NEMA", "Hermético"],
      quoteHref: "/mtn/cotizaciones",
      productHref: "/mtn/productos/pad-mounted",
    },
    {
      id: "subestacion",
      eyebrow: "Alta potencia industrial · ANSI / IEEE",
      name: t("mtn.slides.subestacion.name"),
      subtitle: t("mtn.slides.subestacion.subtitle"),
      specs: [
        { label: "Potencia", value: "≤10k", unit: "KVA" },
        { label: "Voltaje", value: "138", unit: "KV" },
        { label: "Norma", value: "ANSI", unit: "/IEEE" },
      ],
      tags: ["DOE 2016", "ANSI/IEEE", "Alta eficiencia"],
      quoteHref: "/mtn/cotizaciones",
      productHref: "/mtn/productos",
    },
  ];

  const startBar = useCallback(() => {
    setBar(0);
    if (barRef.current) clearInterval(barRef.current);
    barRef.current = setInterval(() => setBar(p => Math.min(p + 100 / (DURATION / 40), 100)), 40);
  }, []);

  const go = useCallback((index: number, d: number) => {
    setDir(d);
    setActive(index);
    startBar();
  }, [startBar]);

  const next = useCallback(() => go((active + 1) % slides.length, 1), [active, go, slides.length]);
  const prev = useCallback(() => go((active - 1 + slides.length) % slides.length, -1), [active, go, slides.length]);

  useEffect(() => { startBar(); return () => { if (barRef.current) clearInterval(barRef.current); }; }, [startBar]);
  useEffect(() => {
    if (!autoPlay) return;
    const t = setInterval(next, DURATION);
    return () => clearInterval(t);
  }, [autoPlay, next]);

  const slide = slides[active];
  const accent = ACCENTS[active];
  const accentDark = ACCENT_DARKS[active];
  const ProductSVG = PRODUCT_SVGS[active];

  return (
    <section className="bg-white py-20 lg:py-28 relative overflow-hidden">


      <div className="container-eminsa relative">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <div className="flex items-center gap-3 mb-3">
            <motion.span
              className="h-px w-8 inline-block"
              style={{ backgroundColor: accent }}
              animate={{ width: [24, 40, 24] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <span className="text-xs font-bold uppercase tracking-[0.3em]" style={{ color: accent }}>
              División MTN · Manufactura Nacional
            </span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#00269b] leading-none">
              {t("mtn.title")}{" "}
              <span style={{ color: accent }} className="transition-colors duration-700">{t("mtn.titleAccent")}</span>
            </h2>
            <p className="text-[#6d6e6d] text-base max-w-sm leading-relaxed">
              {t("mtn.description")}
            </p>
          </div>
        </motion.div>

        {/* ── Product Tabs ── */}
        <div className="flex gap-0 mb-0 border-b border-gray-200">
          {slides.map((s, i) => (
            <button
              key={s.id}
              onClick={() => { go(i, i > active ? 1 : -1); setAutoPlay(false); }}
              className="relative px-5 py-3 text-sm font-semibold transition-colors duration-200"
              style={{ color: active === i ? ACCENTS[i] : "#9a9a9a" }}
            >
              {s.id === "tipo-poste" ? "Tipo Poste" : s.id === "pad-mounted" ? "Pad Mounted" : "Subestación"}
              {active === i && (
                <motion.div
                  layoutId="tab-indicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5"
                  style={{ backgroundColor: ACCENTS[i] }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </button>
          ))}
          {/* Auto-play progress on tab bar */}
          {autoPlay && (
            <div className="absolute bottom-0 left-0 h-px bg-gray-300 w-full -z-10" />
          )}
        </div>

        {/* ── Main showcase ── */}
        <div
          className="relative overflow-hidden rounded-b-2xl"
          style={{ background: "#00091F", minHeight: 480 }}
        >
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={active}
              custom={dir}
              variants={{
                enter: (d: number) => ({ opacity: 0, x: d * 60 }),
                center: { opacity: 1, x: 0 },
                exit: (d: number) => ({ opacity: 0, x: d * -60 }),
              }}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
              className="grid grid-cols-1 md:grid-cols-[1fr_1.2fr] min-h-120"
            >
              {/* LEFT — Content */}
              <div className="flex flex-col justify-center px-10 md:px-14 py-14 gap-6">

                {/* Eyebrow */}
                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="text-[11px] font-bold uppercase tracking-[0.2em]"
                  style={{ color: accent }}
                >
                  {slide.eyebrow}
                </motion.p>

                {/* Product name */}
                <motion.h3
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.06 }}
                  className="text-3xl md:text-4xl lg:text-[2.75rem] font-black text-white leading-tight"
                >
                  {slide.name}
                </motion.h3>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.12 }}
                  className="text-white/50 text-sm leading-relaxed max-w-xs"
                >
                  {slide.subtitle}
                </motion.p>

                {/* Specs */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.18 }}
                  className="flex gap-5"
                >
                  {slide.specs.map((s, i) => (
                    <motion.div
                      key={s.label}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + i * 0.07 }}
                      className="flex flex-col gap-0.5"
                    >
                      <span className="text-2xl font-black text-white leading-none tabular-nums">
                        {s.value}
                        <span className="text-sm font-semibold ml-0.5" style={{ color: accent }}>{s.unit}</span>
                      </span>
                      <span className="text-white/35 text-[10px] uppercase tracking-widest">{s.label}</span>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Divider */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="origin-left h-px bg-white/10 w-full"
                />

                {/* Tags */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.32 }}
                  className="flex flex-wrap gap-2"
                >
                  {slide.tags.map((tag, i) => (
                    <motion.span
                      key={tag}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.34 + i * 0.05 }}
                      className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border"
                      style={{ borderColor: `${accent}40`, color: accent, backgroundColor: `${accent}12` }}
                    >
                      {tag}
                    </motion.span>
                  ))}
                </motion.div>

                {/* CTAs */}
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.38 }}
                  className="flex flex-wrap gap-3"
                >
                  <Link
                    href={slide.quoteHref}
                    className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white transition-all duration-300 hover:scale-[1.03] hover:brightness-110"
                    style={{ backgroundColor: accent }}
                  >
                    Cotizar Ahora
                    <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                  <Link
                    href={slide.productHref}
                    className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white/70 hover:text-white border border-white/15 hover:border-white/30 transition-all duration-300"
                  >
                    Ver Especificaciones
                    <ArrowUpRight size={14} className="opacity-60 group-hover:opacity-100 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </motion.div>
              </div>

              {/* RIGHT — SVG Illustration */}
              <div className="relative hidden md:flex items-center justify-center overflow-hidden">

                {/* Radial gradient bg */}
                <motion.div
                  className="absolute inset-0"
                  animate={{
                    background: [
                      `radial-gradient(ellipse at 55% 55%, ${accent}28 0%, #00091F 65%)`,
                      `radial-gradient(ellipse at 45% 45%, ${accent}38 0%, #00091F 60%)`,
                      `radial-gradient(ellipse at 55% 55%, ${accent}28 0%, #00091F 65%)`,
                    ],
                  }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                />

                {/* Subtle grid */}
                <div
                  className="absolute inset-0 opacity-[0.03]"
                  style={{
                    backgroundImage: `linear-gradient(white 1px,transparent 1px),linear-gradient(to right,white 1px,transparent 1px)`,
                    backgroundSize: "32px 32px",
                  }}
                />

                {/* Pulse rings */}
                {[220, 300, 380].map((size, i) => (
                  <motion.div
                    key={size}
                    className="absolute rounded-full border"
                    style={{ width: size, height: size, borderColor: `${accent}${i === 0 ? "50" : i === 1 ? "30" : "18"}` }}
                    animate={{ scale: [1, 1.08, 1], opacity: [0.5, 0.15, 0.5] }}
                    transition={{ duration: 3 + i, repeat: Infinity, delay: i * 0.6, ease: "easeInOut" }}
                  />
                ))}

                {/* Glow blob */}
                <motion.div
                  className="absolute rounded-full blur-3xl"
                  style={{ width: 260, height: 260, backgroundColor: `${accent}45` }}
                  animate={{ scale: [1, 1.18, 1], opacity: [0.5, 0.85, 0.5] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />

                {/* SVG Product illustration */}
                <motion.div
                  className="relative z-10 w-full max-w-95 h-95 px-6"
                  initial={{ opacity: 0, scale: 0.88, y: 24 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                >
                  <motion.div
                    animate={{ y: [-6, 6, -6] }}
                    transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                    className="w-full h-full"
                  >
                    <ProductSVG />
                  </motion.div>
                </motion.div>

                {/* Slide counter */}
                <div className="absolute top-5 right-6 z-20 font-mono text-white/20 text-xs">
                  {String(active + 1).padStart(2, "0")}&nbsp;/&nbsp;{String(slides.length).padStart(2, "0")}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Nav arrows */}
          {[{ fn: prev, side: "left-4", label: "Anterior", icon: "‹" }, { fn: next, side: "right-4", label: "Siguiente", icon: "›" }].map(({ fn, side, label, icon }) => (
            <button
              key={label}
              onClick={() => { fn(); setAutoPlay(false); }}
              aria-label={label}
              className={`absolute ${side} top-1/2 -translate-y-1/2 z-30 w-9 h-9 rounded-full bg-white/8 hover:bg-white/16 border border-white/10 hover:border-white/25 flex items-center justify-center text-white/70 hover:text-white text-xl font-light transition-all duration-200 hover:scale-110`}
            >
              {icon}
            </button>
          ))}

          {/* Auto-play progress bar (bottom edge of showcase) */}
          {autoPlay && (
            <div className="absolute bottom-0 left-0 h-0.5 transition-none" style={{ width: `${bar}%`, backgroundColor: accent }} />
          )}
        </div>
      </div>
    </section>
  );
}
