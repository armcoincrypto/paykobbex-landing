import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Merchant login",
  description: "Redirect to the Kobbopay merchant portal.",
  robots: { index: false, follow: true },
  alternates: { canonical: "https://pay.kobbex.com/login" },
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
