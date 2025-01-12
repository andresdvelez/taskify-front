import type { Metadata } from "next";
import { routing } from "@/modules/translations/i18n/routing";
import { notFound } from "next/navigation";
import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { geistMono, geistSans } from "@/modules/common/config/fonts-config";
import "../../styles/globals.css";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Taskify",
  description: "Taskify",
};

type Params = Promise<{ locale: string }>;

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Params;
}>) {
  const locale = (await params).locale;

  if (!routing.locales.includes(locale as "en" | "es")) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50`}
      >
        <NextIntlClientProvider messages={messages}>
          <Toaster richColors />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
