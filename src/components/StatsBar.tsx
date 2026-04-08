import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { useEffect, useState, useRef } from "react";

function AnimatedNumber({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 2000;
          const step = target / (duration / 16);
          let current = 0;
          const timer = setInterval(() => {
            current += step;
            if (current >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, 16);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

export function StatsBar() {
  const ref = useScrollReveal();

  return (
    <section className="border-y border-border bg-secondary/30">
      <div ref={ref} className="animate-on-scroll section-container !py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: 500000, suffix: "+", label: "Downloads" },
            { value: 120, suffix: "+", label: "Countries" },
            { value: 50000, suffix: "+", label: "Creators" },
            { value: 1000000, suffix: "+", label: "Content Items" },
          ].map(({ value, suffix, label }) => (
            <div key={label}>
              <div className="text-3xl md:text-4xl font-black gradient-text">
                <AnimatedNumber target={value} suffix={suffix} />
              </div>
              <div className="text-sm text-muted-foreground mt-1">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
