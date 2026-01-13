"use client";

import { ConnectButton } from "@/components/wallet/connect-button";
import { SiweButton } from "@/components/wallet/siwe-button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n-context";
import Link from "next/link";
import { ArrowRight, Users, Wallet, Shield } from "lucide-react";

export default function Home() {
  const { t } = useI18n();

  return (
    <div className="min-h-screen bg-background">
      {/* WCAG AAA: Skip link pour navigation clavier */}
      <a href="#main-content" className="skip-link">
        Aller au contenu principal
      </a>
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <header 
          role="banner"
          className="flex justify-between items-center mb-12 border-b border-border/30 pb-3"
        >
          <h1 className="text-xl font-light text-foreground tracking-tight">{t.home.title}</h1>
          <div className="flex items-center gap-2">
            <ConnectButton />
          </div>
        </header>

        {/* Hero Section */}
        <section id="main-content" aria-label="Contenu principal" className="text-center mb-20">
          <h2 className="text-3xl font-light mb-3 text-foreground tracking-tight max-w-2xl mx-auto">
            {t.home.subtitle}
          </h2>
          <p className="text-sm text-muted-foreground mb-8 max-w-xl mx-auto leading-relaxed">
            {t.home.description}
          </p>
          <div className="flex gap-2 justify-center">
            <SiweButton />
            <Link href="/directory">
              <Button variant="outline">
                <Users className="h-3 w-3 mr-1.5" />
                {t.home.viewDirectory}
              </Button>
            </Link>
          </div>
        </section>

        {/* Features */}
        <section aria-label="Fonctionnalités" className="grid md:grid-cols-3 gap-4 mb-16">
          <Card className="bg-card border-border/30">
            <CardHeader className="p-4">
              <Wallet className="h-5 w-5 mb-2 text-muted-foreground/60" />
              <CardTitle className="text-sm font-normal text-foreground mb-1">{t.home.walletConnection}</CardTitle>
              <CardDescription className="text-xs text-muted-foreground leading-relaxed">
                {t.home.walletDescription}
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-card border-border/30">
            <CardHeader className="p-4">
              <Shield className="h-5 w-5 mb-2 text-muted-foreground/60" />
              <CardTitle className="text-sm font-normal text-foreground mb-1">{t.home.siweAuth}</CardTitle>
              <CardDescription className="text-xs text-muted-foreground leading-relaxed">
                {t.home.siweDescription}
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-card border-border/30">
            <CardHeader className="p-4">
              <Users className="h-5 w-5 mb-2 text-muted-foreground/60" />
              <CardTitle className="text-sm font-normal text-foreground mb-1">{t.home.decentralizedProfile}</CardTitle>
              <CardDescription className="text-xs text-muted-foreground leading-relaxed">
                {t.home.profileDescription}
              </CardDescription>
            </CardHeader>
          </Card>
        </section>

        {/* CTA */}
        <section aria-label="Appel à l'action">
          <Card className="max-w-xl mx-auto bg-card border-border/30">
          <CardHeader className="p-4">
            <CardTitle className="text-sm font-normal text-foreground mb-1">{t.home.readyToStart}</CardTitle>
            <CardDescription className="text-xs text-muted-foreground">
              {t.home.createProfile}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <Link href="/dashboard">
              <Button className="w-full">
                {t.home.createMyProfile}
                <ArrowRight className="h-3 w-3 ml-1.5" />
              </Button>
            </Link>
          </CardContent>
        </Card>
        </section>
      </div>
    </div>
  );
}
