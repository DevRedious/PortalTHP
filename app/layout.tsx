import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import LetterGlitch from "@/components/ui/letter-glitch";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Portail THP - Annuaire Web3",
  description: "Annuaire décentralisé des développeurs THP",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning className="dark">
      <body className={inter.className}>
        <LetterGlitch
          glitchColors={['#404040', '#505050', '#606060', '#707070']}
          glitchSpeed={80}
          centerVignette={false}
          outerVignette={true}
          smooth={true}
          characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$&*()-_+=/[]{};:<>.,0123456789"
        />
        <div className="relative z-10">
          <Providers>{children}</Providers>
        </div>
      </body>
    </html>
  );
}
