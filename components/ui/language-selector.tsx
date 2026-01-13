"use client";

import { useI18n } from "@/lib/i18n-context";
import { Locale, locales, localeNames } from "@/lib/i18n";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Languages } from "lucide-react";

export function LanguageSelector() {
  const { locale, setLocale } = useI18n();

  return (
    <Select value={locale} onValueChange={(value) => setLocale(value as Locale)}>
      <SelectTrigger className="w-[120px] h-7">
        <div className="flex items-center gap-1.5">
          <Languages className="h-3 w-3 text-muted-foreground" />
          <SelectValue />
        </div>
      </SelectTrigger>
      <SelectContent>
        {locales.map((loc) => (
          <SelectItem key={loc} value={loc}>
            {localeNames[loc]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
