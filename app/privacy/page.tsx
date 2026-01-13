"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useI18n } from "@/lib/i18n-context";

export default function PrivacyPage() {
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
          {t.legal.privacyTitle}
        </h1>

        <div className="space-y-6 text-sm text-muted-foreground leading-relaxed">
          <section>
            <h2 className="text-base font-normal text-foreground mb-3">
              {t.legal.privacySection1.title}
            </h2>
            <p>{t.legal.privacySection1.content}</p>
          </section>

          <section>
            <h2 className="text-base font-normal text-foreground mb-3">
              {t.legal.privacySection2.title}
            </h2>
            <p>{t.legal.privacySection2.content}</p>
          </section>

          <section>
            <h2 className="text-base font-normal text-foreground mb-3">
              {t.legal.privacySection3.title}
            </h2>
            <p>{t.legal.privacySection3.content}</p>
          </section>

          <section>
            <h2 className="text-base font-normal text-foreground mb-3">
              {t.legal.privacySection4.title}
            </h2>
            <p>{t.legal.privacySection4.content}</p>
          </section>

          <section>
            <h2 className="text-base font-normal text-foreground mb-3">
              {t.legal.privacySection5.title}
            </h2>
            <p>{t.legal.privacySection5.content}</p>
          </section>

          <section>
            <h2 className="text-base font-normal text-foreground mb-3">
              {t.legal.privacySection6.title}
            </h2>
            <p>{t.legal.privacySection6.content}</p>
          </section>

          <section>
            <h2 className="text-base font-normal text-foreground mb-3">
              {t.legal.privacySection7.title}
            </h2>
            <p>{t.legal.privacySection7.content}</p>
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
