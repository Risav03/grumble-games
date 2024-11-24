import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Providers from "@/providers/provider";
import { Lilita_One } from "next/font/google";

export const metadata: Metadata = {
  title: "Grumble Games",
  description: "A collection of community engaging fun games.",
};

const zen = Lilita_One({ subsets: ["latin"], weight: ['400'] });


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${zen.className}`}
        >
        <Providers>
        {children}
        </Providers>
      </body>
    </html>
  );
}
