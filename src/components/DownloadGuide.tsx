import { Download, FolderOpen, ShieldCheck, Monitor, Rocket } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const steps = [
  { icon: Download, title: "Click Download", desc: "Press the download button above" },
  { icon: FolderOpen, title: "Open the file", desc: "Find and run the downloaded installer" },
  { icon: ShieldCheck, title: "Browser warning?", desc: 'Click "Keep" or "Download anyway"' },
  { icon: Monitor, title: "Windows warning?", desc: 'Click "More info" → "Run anyway"' },
  { icon: Rocket, title: "Install & Launch", desc: "Follow setup and start creating" },
];

export function DownloadGuide() {
  const ref = useScrollReveal();

  return (
    <section className="section-container">
      <div ref={ref} className="animate-on-scroll">
        <h3 className="text-2xl font-bold text-center mb-3">Installation Guide</h3>
        <p className="text-muted-foreground text-center mb-10 max-w-xl mx-auto">
          Our app is safe to install. Here's how to get started in 5 easy steps.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {steps.map((step, i) => (
            <div key={i} className="glass-card p-6 text-center space-y-3 hover:border-primary/30 transition-all duration-300 group">
              <div className="mx-auto w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <step.icon className="size-6 text-primary" />
              </div>
              <div className="text-xs font-bold text-primary">Step {i + 1}</div>
              <h4 className="font-semibold text-sm">{step.title}</h4>
              <p className="text-xs text-muted-foreground">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
