import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="border-t border-border bg-secondary/20">
      <div className="section-container !py-12">
        <div className="grid md:grid-cols-4 gap-10">
          <div className="space-y-4">
            <span className="text-xl font-black gradient-text">CLYVORA</span>
            <p className="text-sm text-muted-foreground">
              Publishing Knowledge. Powering Media. Inspiring Innovation.
            </p>
          </div>

          {[
            { title: "Company", links: ["About", "Careers", "Press", "Contact"] },
            { title: "Products", links: ["Desktop App", "API", "Licensing", "Analytics"] },
            { title: "Resources", links: ["Blog", "Documentation", "Community", "Support"] },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="font-semibold mb-4 text-sm">{col.title}</h4>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} CLYVORA. All rights reserved.
          </p>
          <div className="flex gap-6">
            {["Twitter", "GitHub", "LinkedIn", "YouTube"].map((social) => (
              <a key={social} href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
