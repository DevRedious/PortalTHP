import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import LetterGlitch from "@/components/ui/letter-glitch";
import { AnalyticsScript } from "@/components/analytics/analytics-script";
import { ServiceWorkerScript } from "@/components/service-worker/service-worker-script";
import { Footer } from "@/components/layout/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Portail THP - Annuaire Web3",
  description: "Annuaire décentralisé des développeurs THP",
  openGraph: {
    title: "Portail THP - Annuaire Web3",
    description: "Créez votre profil décentralisé et rejoignez la communauté des développeurs THP",
    type: "website",
    locale: "fr_FR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Portail THP - Annuaire Web3",
    description: "Annuaire décentralisé des développeurs THP",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning className="dark">
      <head>
        <AnalyticsScript />
        <ServiceWorkerScript />
      </head>
      <body className={inter.className}>
        <LetterGlitch
          glitchColors={['#404040', '#505050', '#606060', '#707070']}
          glitchSpeed={80}
          centerVignette={false}
          outerVignette={false}
          smooth={true}
          characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$&*()-_+=/[]{};:<>.,0123456789"
        />
        <main role="main" className="relative z-10 flex flex-col min-h-screen">
          <Providers>
            <div className="flex-1">
              {children}
            </div>
            <Footer />
          </Providers>
        </main>
      </body>
    </html>
  );
}
