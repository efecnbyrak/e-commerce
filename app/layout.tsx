import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "E-Shop | Premium Alışveriş Deneyimi",
    template: "%s | E-Shop"
  },
  description: "Modern ve premium e-ticaret platformu. En kaliteli ürünler, en uygun fiyatlarla.",
  keywords: ["e-ticaret", "alışveriş", "ayakkabı", "giyim", "elektronik", "premium"],
  authors: [{ name: "E-Shop Team" }],
  robots: "index, follow",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

import { Toaster } from "react-hot-toast";
import { SessionRefreshHandler } from "@/components/auth/SessionRefreshHandler";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var supportDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches === true;
                  var theme = supportDarkMode ? 'dark' : 'light';
                  document.documentElement.classList.remove('light', 'dark');
                  document.documentElement.classList.add(theme);
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionRefreshHandler />
        {children}
        <Toaster position="top-center" />
        <Analytics />
      </body>
    </html>
  );
}
