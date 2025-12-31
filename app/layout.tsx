import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/app/(public)/components/ThemeProvider";
import StoreProvider from './StoreProvider';
import LayoutWrapper from "./LayoutWrapper";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TalkWithSmile – Funny Memes, Inspiring Quotes & Unique Gift Ideas",
  description: "Discover TalkWithSmile – your go-to source for hilarious memes, uplifting quotes, unique gift ideas, and easy how-to guides",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={`${montserrat.className} antialiased max-w-[1680px] mx-auto`}
      >
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <StoreProvider>
          <LayoutWrapper>{children}</LayoutWrapper>
          </StoreProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
