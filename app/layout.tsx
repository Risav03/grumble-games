import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Providers from "@/providers/provider";
import { Lilita_One } from "next/font/google";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
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
