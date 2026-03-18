import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import Providers from "./providers";
import "../globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CursorVoice - Dictate text, it appears at your cursor",
  icons: {
    icon: "/favicon.png",
    apple: "/apple-touch-icon.png",
  },
  description:
    "Open-source desktop voice dictation app. Speak naturally, text appears wherever your cursor is. 100% offline, powered by Whisper AI. Free for Windows and macOS.",
  keywords: [
    "voice dictation",
    "speech to text",
    "whisper",
    "desktop app",
    "open source",
    "offline",
    "transcription",
  ],
  openGraph: {
    title: "CursorVoice - Voice Dictation for Your Desktop",
    description:
      "Speak naturally, text appears at your cursor. 100% offline, open-source.",
    type: "website",
    url: "https://cursorvoice.prapp.dev",
  },
  twitter: {
    card: "summary_large_image",
    title: "CursorVoice - Voice Dictation for Your Desktop",
    description:
      "Speak naturally, text appears at your cursor. 100% offline, open-source.",
  },
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} className="dark">
      <body className={`${inter.className} antialiased bg-zinc-950 text-white`}>
        <NextIntlClientProvider messages={messages}>
          <Providers>{children}</Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
