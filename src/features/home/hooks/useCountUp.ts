import { useState, useEffect } from "react";

interface UseCountUpProps {
  end: number;
  duration?: number;
  delay?: number;
}

export const useCountUp = ({
  end,
  duration = 5000, // Aumentado de 4000 a 5000ms
  delay = 1000 // Reducido de 2500 a 1000ms
}: UseCountUpProps) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;
    let animationId: number;

    const animate = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const elapsed = currentTime - startTime - delay;

      if (elapsed < 0) {
        animationId = requestAnimationFrame(animate);
        return;
      }

      if (elapsed < duration) {
        // Easing function: ease-out (más suave)
        const progress = elapsed / duration;

        // Cambia la función de easing para que sea más gradual
        // En lugar de 1 - Math.pow(1 - progress, 3) que es más agresivo
        // Usamos Math.sin que crece más suavemente al inicio
        const easeProgress = progress < 0.5
          ? 0.5 * Math.sin(Math.PI * (progress - 0.5)) + 0.5
          : progress;

        const currentCount = Math.floor(easeProgress * end);
        setCount(currentCount);
        animationId = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationId);
  }, [end, duration, delay]);

  return count;
};
