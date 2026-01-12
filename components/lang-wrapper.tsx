"use client";

import { useEffect } from "react";
import { useI18n } from "@/lib/i18n-context";

export function LangWrapper({ children }: { children: React.ReactNode }) {
  const { locale } = useI18n();

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = locale;
    }
  }, [locale]);

  return <>{children}</>;
}
