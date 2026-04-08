import { PenTool, Code, GraduationCap, Building2, Video } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const cases = [
  { icon: PenTool, title: "Authors", desc: "Write, publish, and distribute books globally" },
  { icon: Code, title: "Developers", desc: "Build and ship apps and digital products" },
  { icon: GraduationCap, title: "Educators", desc: "Create courses and educational content" },
  { icon: Building2, title: "Media Companies", desc: "Manage and distribute news and media" },
  { icon: Video, title: "Content Creators", desc: "Produce and monetize multimedia content" },
];

export function UseCases() {
  const ref = useScrollReveal();

  return (
    <section className="section-container">
      <div ref={ref} className="animate-on-scroll">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black mb-4">
            Built for <span className="gradient-text">Everyone</span>
          </h2>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          {cases.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="glass-card p-6 w-52 text-center space-y-3 hover:border-primary/30 hover:-translate-y-1 transition-all duration-300">
              <Icon className="size-8 text-primary mx-auto" />
              <h4 className="font-bold">{title}</h4>
              <p className="text-xs text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
