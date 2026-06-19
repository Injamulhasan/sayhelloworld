import { SiGithub, SiX } from "react-icons/si";
import { Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border/40 py-8 md:py-12">
      <div className="container mx-auto px-4 md:px-8 max-w-screen-2xl flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground text-center md:text-left">
          &copy; {new Date().getFullYear()} Alex Engineer. All rights reserved.
        </p>
        <div className="flex items-center gap-4 text-muted-foreground">
          <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors" data-testid="footer-social-github">
            <SiGithub className="h-4 w-4" />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors" data-testid="footer-social-linkedin">
            <Linkedin className="h-4 w-4" />
          </a>
          <a href="https://x.com" target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors" data-testid="footer-social-twitter">
            <SiX className="h-4 w-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
