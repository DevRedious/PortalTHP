"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useI18n } from "@/lib/i18n-context";

export default function TermsPage() {
  const { t, locale } = useI18n();

  const formatDate = (date: Date) => {
    const localeMap: Record<string, string> = {
      fr: "fr-FR",
      en: "en-US",
      es: "es-ES",
      de: "de-DE",
      it: "it-IT",
      pt: "pt-PT",
    };
    return date.toLocaleDateString(localeMap[locale] || "fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <Link
          href="/"
          className="text-xs text-muted-foreground hover:text-foreground inline-flex items-center mb-6"
        >
          <ArrowLeft className="h-3 w-3 mr-1.5" />
          {t.legal.backToHome}
        </Link>

        <h1 className="text-2xl font-light text-foreground mb-6 tracking-tight">
          {t.legal.termsTitle}
        </h1>

        <div className="space-y-6 text-sm text-muted-foreground leading-relaxed">
          <section>
            <h2 className="text-base font-normal text-foreground mb-3">
              {t.legal.termsSection1.title}
            </h2>
            <p>{t.legal.termsSection1.content}</p>
          </section>

          <section>
            <h2 className="text-base font-normal text-foreground mb-3">
              {t.legal.termsSection2.title}
            </h2>
            <p>{t.legal.termsSection2.content}</p>
          </section>

          <section>
            <h2 className="text-base font-normal text-foreground mb-3">
              {t.legal.termsSection3.title}
            </h2>
            <p>{t.legal.termsSection3.content}</p>
          </section>

          <section>
            <h2 className="text-base font-normal text-foreground mb-3">
              {t.legal.termsSection4.title}
            </h2>
            <p>{t.legal.termsSection4.content}</p>
          </section>

          <section>
            <h2 className="text-base font-normal text-foreground mb-3">
              {t.legal.termsSection5.title}
            </h2>
            <p>{t.legal.termsSection5.content}</p>
          </section>

          <section>
            <h2 className="text-base font-normal text-foreground mb-3">
              {t.legal.termsSection6.title}
            </h2>
            <p>{t.legal.termsSection6.content}</p>
          </section>

          <section>
            <p className="text-xs text-muted-foreground/60 mt-8">
              {t.legal.lastUpdate}: {formatDate(new Date())}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
