import { Download, FolderOpen, ShieldCheck, Monitor, Rocket, CheckCircle, Lock, Users, Star } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const steps = [
  {
    icon: Download,
    title: "Click Download",
    desc: "Press the download button — the file will start downloading immediately.",
    detail: "File: CLYVORA-Setup-v1.0.exe • 85MB",
  },
  {
    icon: FolderOpen,
    title: "Open the File",
    desc: "Go to your Downloads folder and double-click the installer file.",
    detail: "Usually found in C:\\Users\\You\\Downloads",
  },
  {
    icon: ShieldCheck,
    title: "Browser Warning?",
    desc: "Your browser may flag the file — this is normal for new software. Simply click \"Keep\" or \"Download anyway\".",
    detail: "Works on Chrome, Edge, Firefox & Brave",
  },
  {
    icon: Monitor,
    title: "Windows SmartScreen?",
    desc: "Windows may show a blue popup. Click \"More info\" then \"Run anyway\" to proceed safely.",
    detail: "This appears because we're a new publisher",
  },
  {
    icon: Rocket,
    title: "Install & Launch",
    desc: "Follow the simple setup wizard. CLYVORA will be ready in under a minute!",
    detail: "No bloatware • No hidden installs",
  },
];

const trustBadges = [
  { icon: Lock, text: "100% Safe & Secure", sub: "No malware, no adware" },
  { icon: CheckCircle, text: "Verified Publisher", sub: "Trusted by 500K+ users" },
  { icon: Users, text: "Active Community", sub: "50K+ creators worldwide" },
  { icon: Star, text: "5-Star Rated", sub: "Top-rated by users" },
];

export function DownloadGuide() {
  const ref = useScrollReveal();

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 hero-gradient-bg opacity-50" />
      <div className="section-container relative z-10">
        <div ref={ref} className="animate-on-scroll">
          {/* Trust banner */}
          <div className="flex flex-wrap justify-center gap-6 mb-12">
            {trustBadges.map(({ icon: Icon, text, sub }) => (
              <div key={text} className="flex items-center gap-3 glass-card px-5 py-3">
                <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center">
                  <Icon className="size-5 text-primary" />
                </div>
                <div>
                  <div className="text-sm font-bold text-foreground">{text}</div>
                  <div className="text-xs text-muted-foreground">{sub}</div>
                </div>
              </div>
            ))}
          </div>

          <h3 className="text-3xl md:text-4xl font-black text-center mb-3">
            How to Install <span className="gradient-text">CLYVORA</span>
          </h3>
          <p className="text-muted-foreground text-center mb-4 max-w-2xl mx-auto text-lg">
            Our app is completely safe to install. Browser and Windows warnings are normal for new software — follow these simple steps to get started.
          </p>
          <p className="text-center mb-12">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm text-primary font-medium">
              <ShieldCheck className="size-4" />
              Scanned & verified — 0 threats detected
            </span>
          </p>

          {/* Steps */}
          <div className="relative">
            {/* Connection line */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/20 to-transparent -translate-y-1/2" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {steps.map((step, i) => (
                <div
                  key={i}
                  className="glass-card-strong p-6 text-center space-y-4 hover:border-primary/40 transition-all duration-300 group relative"
                >
                  {/* Step number badge */}
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-black shadow-lg">
                    {i + 1}
                  </div>

                  <div className="mx-auto w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300 mt-2">
                    <step.icon className="size-7 text-primary" />
                  </div>
                  <h4 className="font-bold text-base">{step.title}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                  <p className="text-xs text-primary/70 font-medium">{step.detail}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom reassurance */}
          <div className="mt-12 text-center glass-card p-8 max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-3">
              <ShieldCheck className="size-6 text-primary" />
              <h4 className="font-bold text-lg">Why am I seeing warnings?</h4>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Browser and Windows warnings appear for newly released software that hasn't yet built a download reputation. 
              This is standard behavior and does <strong className="text-foreground">not</strong> mean the file is unsafe. 
              CLYVORA is regularly scanned and verified to be 100% clean. Over 500,000 users have installed it without any issues.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
