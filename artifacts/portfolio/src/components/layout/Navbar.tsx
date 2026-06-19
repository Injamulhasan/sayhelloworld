import { Link, useLocation } from "wouter";
import { useTheme } from "next-themes";
import { Moon, Sun, Linkedin } from "lucide-react";
import { SiGithub, SiGooglescholar, SiX } from "react-icons/si";

export function Navbar() {
  const [location] = useLocation();
  const { theme, setTheme } = useTheme();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/projects", label: "Projects" },
    { href: "/blog", label: "Blog" },
    { href: "/docs", label: "Docs" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center px-4 md:px-8 mx-auto justify-between">
        {/* Left: Logo/Initials */}
        <div className="flex items-center gap-2">
          <Link href="/" className="font-mono font-bold tracking-tight text-lg" data-testid="nav-logo">
            A.E.
          </Link>
        </div>

        {/* Center: Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`transition-colors hover:text-foreground/80 ${
                location === link.href ? "text-foreground" : "text-foreground/60"
              }`}
              data-testid={`nav-link-${link.label.toLowerCase()}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right: Socials & Theme Toggle */}
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-3 text-muted-foreground">
            <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors" data-testid="nav-social-github">
              <SiGithub className="h-4 w-4" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors" data-testid="nav-social-linkedin">
              <Linkedin className="h-4 w-4" />
            </a>
            <a href="https://scholar.google.com" target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors" data-testid="nav-social-scholar">
              <SiGooglescholar className="h-4 w-4" />
            </a>
            <a href="https://x.com" target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors" data-testid="nav-social-twitter">
              <SiX className="h-4 w-4" />
            </a>
          </div>
          
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="inline-flex items-center justify-center rounded-md w-9 h-9 text-muted-foreground hover:bg-accent/10 hover:text-foreground transition-colors"
            data-testid="btn-theme-toggle"
          >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </button>
        </div>
      </div>
    </header>
  );
}
