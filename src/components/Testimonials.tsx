import { Star } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const testimonials = [
  { name: "Sarah Chen", role: "Author & Publisher", text: "CLYVORA transformed how I publish and distribute my books. The AI tools are incredibly powerful." },
  { name: "Marcus Williams", role: "App Developer", text: "The best all-in-one platform for content distribution. Seamless API integration and great analytics." },
  { name: "Priya Sharma", role: "Educator", text: "Creating and licensing educational content has never been easier. CLYVORA is a game-changer." },
];

export function Testimonials() {
  const ref = useScrollReveal();

  return (
    <section className="section-container">
      <div ref={ref} className="animate-on-scroll">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black mb-4">
            Loved by <span className="gradient-text">Creators</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t.name} className="glass-card p-8 space-y-4 hover:border-primary/30 transition-all duration-300">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="size-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">"{t.text}"</p>
              <div>
                <p className="font-semibold text-sm">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
