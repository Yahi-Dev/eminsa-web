import { useState, useEffect } from "react";

interface UseCountUpProps {
  end: number;
  duration?: number;
  delay?: number;
}

export const useCountUp = ({ end, duration = 2000, delay = 0 }: UseCountUpProps) => {
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
        // Easing function: ease-out (desaceleración)
        const progress = elapsed / duration;
        const easeProgress = 1 - Math.pow(1 - progress, 3);
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
