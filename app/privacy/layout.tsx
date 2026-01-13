import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Confidentialité - Portail THP",
  description: "Politique de confidentialité du Portail THP",
};

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
