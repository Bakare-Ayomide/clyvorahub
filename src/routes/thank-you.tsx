import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle, Download, FolderOpen, ShieldCheck, Monitor, Rocket, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/thank-you")({
  component: ThankYouPage,
});

const steps = [
  { icon: Download, text: 'Click "Download"' },
  { icon: FolderOpen, text: "Open the downloaded file" },
  { icon: ShieldCheck, text: 'Browser warning? Click "Keep"' },
  { icon: Monitor, text: 'Windows warning? Click "Run anyway"' },
  { icon: Rocket, text: "Install and launch CLYVORA" },
];

function ThankYouPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center hero-gradient-bg">
      <div className="max-w-xl mx-auto px-6 text-center space-y-10 animate-fade-up">
        <div className="mx-auto w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center">
          <CheckCircle className="size-10 text-primary" />
        </div>

        <div className="space-y-3">
          <h1 className="text-4xl md:text-5xl font-black">
            Your download has <span className="gradient-text">started</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Thank you for choosing CLYVORA
          </p>
        </div>

        <div className="glass-card p-8 text-left space-y-4">
          <h3 className="font-bold text-center mb-4">Quick Install Guide</h3>
          {steps.map(({ icon: Icon, text }, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <Icon className="size-4 text-primary" />
              </div>
              <span className="text-sm text-muted-foreground">
                <span className="text-foreground font-medium">Step {i + 1}:</span> {text}
              </span>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          <Button variant="glow" size="xl" asChild>
            <Link to="/donate">
              <Heart className="size-5" />
              Support the Project
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link to="/">Back to Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
