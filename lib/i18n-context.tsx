"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Locale, defaultLocale, translations, locales } from './i18n';

type Translation = typeof translations.fr;

interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Translation;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);

  useEffect(() => {
    // Charger la langue depuis localStorage
    const savedLocale = localStorage.getItem('locale') as Locale;
    if (savedLocale && locales.includes(savedLocale)) {
      setLocaleState(savedLocale);
    }
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem('locale', newLocale);
    // Mettre à jour l'attribut lang du HTML
    if (typeof document !== 'undefined') {
      document.documentElement.lang = newLocale;
    }
  };

  const t = translations[locale] as Translation;

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}
