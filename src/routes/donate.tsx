import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart, CreditCard, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export const Route = createFileRoute("/donate")({
  component: DonatePage,
});

function DonatePage() {
  const [custom, setCustom] = useState("");
  const amounts = [5, 10, 25, 50];

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center hero-gradient-bg">
      <div className="max-w-lg mx-auto px-6 text-center space-y-10 animate-fade-up">
        <div className="mx-auto w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center">
          <Heart className="size-10 text-accent" />
        </div>

        <div className="space-y-3">
          <h1 className="text-4xl md:text-5xl font-black">
            Support <span className="gradient-text">CLYVORA</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-md mx-auto">
            Help us continue building powerful free tools for creators worldwide.
          </p>
        </div>

        <div className="glass-card p-8 space-y-6">
          <div className="grid grid-cols-2 gap-3">
            {amounts.map((amt) => (
              <button
                key={amt}
                className="glass-card p-4 text-center hover:border-primary/40 transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
              >
                <DollarSign className="size-5 text-primary mx-auto mb-1" />
                <span className="text-2xl font-bold">${amt}</span>
              </button>
            ))}
          </div>

          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
            <input
              type="number"
              placeholder="Custom amount"
              value={custom}
              onChange={(e) => setCustom(e.target.value)}
              className="w-full h-12 pl-10 pr-4 rounded-xl bg-input border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="space-y-3">
            <Button variant="glow" size="xl" className="w-full">
              <CreditCard className="size-5" />
              Donate with Stripe
            </Button>
            <Button variant="outline" size="lg" className="w-full">
              Donate with PayPal
            </Button>
          </div>

          <p className="text-xs text-muted-foreground">
            Secure payments processed through Stripe & PayPal. Your support keeps CLYVORA free.
          </p>
        </div>

        <Button variant="ghost" size="default" asChild>
          <Link to="/">← Back to Home</Link>
        </Button>
      </div>
    </div>
  );
}
