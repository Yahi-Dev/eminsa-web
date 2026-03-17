"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { useTranslations } from "next-intl";
import { stats } from "@/config/navigation";

// ─── Count-up hook that starts only when triggered ────────────────────────────

function useCountUpOnTrigger(end: number, duration = 2000, triggered = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!triggered || end === 0) return;

    let startTime: number | null = null;
    let animationId: number;

    const animate = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const elapsed = currentTime - startTime;

      if (elapsed < duration) {
        const progress = elapsed / duration;
        // ease-out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        setCount(Math.floor(eased * end));
        animationId = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [triggered, end, duration]);

  return count;
}

// ─── Individual stat item ─────────────────────────────────────────────────────

const statKeys = ["yearsExperience", "transformersInstalled", "satisfiedClients", "techSupport"] as const;

function StatItem({
  stat,
  labelKey,
  index,
  triggered,
}: {
  stat: { value: string; label: string };
  labelKey: (typeof statKeys)[number];
  index: number;
  triggered: boolean;
}) {
  const t = useTranslations("home");
  const numericValue = parseInt(stat.value.replace(/[^0-9]/g, ""));
  const suffix = stat.value.replace(/[0-9]/g, "");
  const isSpecial = stat.value === "24/7";

  const count = useCountUpOnTrigger(isSpecial ? 0 : numericValue, 2200, triggered);

  return (
    <motion.div
      className="text-center py-14 px-6 border-r border-white/10 last:border-r-0"
      initial={{ opacity: 0, y: 30 }}
      animate={triggered ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.12 }}
    >
      <div className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-3 tabular-nums">
        {isSpecial ? (
          <span>{stat.value}</span>
        ) : (
          <>
            <span>{triggered ? count : 0}</span>
            <span>{suffix}</span>
          </>
        )}
      </div>
      <div
        className="text-[11px] tracking-[0.28em] uppercase mt-2"
        style={{ color: "#6d6e6d" }}
      >
        {t(`stats.${labelKey}`)}
      </div>
    </motion.div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export default function CounterSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="border-y" style={{ borderColor: "rgba(255,255,255,0.08)", background: "#070d1a" }}>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-0">
        {stats.map((stat, i) => (
          <StatItem
            key={stat.label}
            stat={stat}
            labelKey={statKeys[i]}
            index={i}
            triggered={isInView}
          />
        ))}
      </div>
    </section>
  );
}
