'use client';

import { useEffect, useRef, useState } from 'react';

interface Props {
  target: number;
  label: string;
  suffix?: string;
  variant?: 'light' | 'dark'; // light = white text (for green bg), dark = green text (for white bg)
}

export default function AnimatedCounter({ target, label, suffix = '', variant = 'dark' }: Props) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const increment = Math.ceil(target / 60);
          const timer = setInterval(() => {
            setCount((prev) => {
              if (prev + increment >= target) {
                clearInterval(timer);
                return target;
              }
              return prev + increment;
            });
          }, 30);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  const isLight = variant === 'light';

  return (
    <div ref={ref} className="text-center">
      <p className={`text-5xl font-bold tracking-tight ${isLight ? 'text-white' : 'text-eco-primary'}`}>
        {count.toLocaleString()}{suffix}
      </p>
      <p className={`mt-2 text-sm font-medium uppercase tracking-wider ${isLight ? 'text-green-200' : 'text-gray-500'}`}>
        {label}
      </p>
    </div>
  );
}
