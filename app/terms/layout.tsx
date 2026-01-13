import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Conditions d'utilisation - Portail THP",
  description: "Conditions d'utilisation du Portail THP",
};

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
