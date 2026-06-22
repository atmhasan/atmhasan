import { Award, BookOpen, Box, CalendarDays, Users } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { StatisticItem } from "../types/portfolio";

const icons = {
  calendar: CalendarDays,
  box: Box,
  users: Users,
  book: BookOpen,
  badge: Award
};

const counterMetricIds = new Set(["experience", "projects", "certifications"]);

export const MetricCard = ({ item }: { item: StatisticItem }) => {
  const Icon = icons[item.icon];
  const cardRef = useRef<HTMLElement>(null);
  const valueParts = item.value.match(/^(\d+)(.*)$/);
  const targetValue = valueParts ? Number(valueParts[1]) : null;
  const suffix = valueParts?.[2] ?? "";
  const shouldCount = counterMetricIds.has(item.id) && targetValue !== null && targetValue > 1;
  const [count, setCount] = useState(shouldCount ? 1 : targetValue ?? 0);

  useEffect(() => {
    if (!shouldCount || targetValue === null) return;

    const card = cardRef.current;
    if (!card) return;

    let animationFrame = 0;

    const showTotal = () => {
      animationFrame = window.requestAnimationFrame(() => setCount(targetValue));
    };

    const startCounter = () => {
      const duration = 2400;
      const startTime = performance.now();

      const updateCounter = (currentTime: number) => {
        const progress = Math.min((currentTime - startTime) / duration, 1);
        const easedProgress = 1 - Math.pow(1 - progress, 3);
        setCount(Math.max(1, Math.round(1 + (targetValue - 1) * easedProgress)));

        if (progress < 1) animationFrame = window.requestAnimationFrame(updateCounter);
      };

      animationFrame = window.requestAnimationFrame(updateCounter);
    };

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion || !("IntersectionObserver" in window)) {
      showTotal();
      return () => window.cancelAnimationFrame(animationFrame);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer?.disconnect();
        startCounter();
      },
      { threshold: 0.35 }
    );
    observer.observe(card);

    return () => {
      observer?.disconnect();
      window.cancelAnimationFrame(animationFrame);
    };
  }, [shouldCount, targetValue]);

  const displayValue = shouldCount ? `${count}${suffix}` : item.value;

  return (
    <article className="metric-card" ref={cardRef}>
      <Icon className="metric-icon" size={30} strokeWidth={1.8} aria-hidden="true" />
      <div>
        <strong>{displayValue}</strong>
        <span>{item.label}</span>
      </div>
    </article>
  );
};