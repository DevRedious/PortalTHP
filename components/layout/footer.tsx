"use client";

import Link from "next/link";
import { Github, ChevronDown, Languages } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useI18n } from "@/lib/i18n-context";
import { Locale, locales, localeNames } from "@/lib/i18n";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { t, locale, setLocale } = useI18n();

  const homeLabels: Record<string, string> = {
    fr: 'Accueil',
    en: 'Home',
    es: 'Inicio',
    de: 'Startseite',
    it: 'Home',
    pt: 'Início',
  };

  return (
    <footer 
      role="contentinfo"
      className="border-t border-border/30 bg-background mt-auto"
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
          {/* Navigation horizontale */}
          <nav aria-label={t.footer.navigation} className="flex flex-wrap items-center gap-x-4 gap-y-1 justify-center sm:justify-start">
            <Link 
              href="/" 
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              {homeLabels[locale] || 'Home'}
            </Link>
            <Link 
              href="/directory" 
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              {t.directory.title}
            </Link>
            <Link 
              href="/dashboard" 
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              {t.dashboard.title}
            </Link>
            <span className="text-xs text-muted-foreground/40" aria-hidden="true">•</span>
            <a
              href="https://github.com/DevRedious/PortalTHP"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
            >
              <Github className="h-3 w-3" aria-hidden="true" />
              GitHub
            </a>
            <span className="text-xs text-muted-foreground/40" aria-hidden="true">•</span>
            <DropdownMenu>
              <DropdownMenuTrigger className="text-xs text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm px-1">
                Legal
                <ChevronDown className="h-3 w-3" aria-hidden="true" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="min-w-[160px]">
                <DropdownMenuItem asChild>
                  <Link href="/terms" className="cursor-pointer">
                    {t.legal.terms}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/privacy" className="cursor-pointer">
                    {t.legal.privacy}
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <span className="text-xs text-muted-foreground/40" aria-hidden="true">•</span>
            <DropdownMenu>
              <DropdownMenuTrigger className="text-xs text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm px-1">
                <Languages className="h-3 w-3" aria-hidden="true" />
                {localeNames[locale]}
                <ChevronDown className="h-3 w-3" aria-hidden="true" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="min-w-[140px]">
                {locales.map((loc) => (
                  <DropdownMenuItem
                    key={loc}
                    onClick={() => setLocale(loc)}
                    className={locale === loc ? "bg-secondary/50" : ""}
                  >
                    <span className="flex items-center gap-2">
                      {localeNames[loc]}
                      {locale === loc && (
                        <span className="ml-auto text-xs">✓</span>
                      )}
                    </span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>

          {/* Copyright */}
          <p className="text-xs text-muted-foreground">
            © {currentYear} Portail THP
          </p>
        </div>
      </div>
    </footer>
  );
}
