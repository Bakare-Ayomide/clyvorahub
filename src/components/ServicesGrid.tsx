import { BookOpen, Newspaper, Film, Cpu, Scale, Sparkles } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const services = [
  { icon: BookOpen, title: "Publishing", desc: "Books, blogs, textbooks, and academic content" },
  { icon: Newspaper, title: "Media & News", desc: "Real-time news distribution and media management" },
  { icon: Film, title: "Entertainment", desc: "Video, audio, and interactive media content" },
  { icon: Cpu, title: "Technology & Apps", desc: "App publishing, SaaS tools, and digital products" },
  { icon: Scale, title: "Licensing & Distribution", desc: "Manage rights, licenses, and global distribution" },
  { icon: Sparkles, title: "AI Creator Tools", desc: "AI-powered content generation and optimization" },
];

export function ServicesGrid() {
  const ref = useScrollReveal();

  return (
    <section id="services" className="section-container">
      <div ref={ref} className="animate-on-scroll">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black mb-4">
            Our <span className="gradient-text">Services</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            A comprehensive suite of tools and services for every content creator
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="glass-card p-8 space-y-4 hover:border-primary/30 hover:-translate-y-1 transition-all duration-300 group">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Icon className="size-6 text-primary" />
              </div>
              <h3 className="text-lg font-bold">{title}</h3>
              <p className="text-sm text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
