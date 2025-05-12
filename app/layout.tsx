import type { Metadata } from "next";
import { Geist, Geist_Mono, Open_Sans } from "next/font/google";
import "./globals.css";
import "./output.css";
import { ThemeProvider } from "./components/ThemeToggle/ThemeProvider";
import { CustomToaster } from "./components/CustomToaster";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MainMenu from "./components/MainMenu";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin", "hebrew"],
});

export const metadata: Metadata = {
  title: "bOObies.co.il - לוח פרסום",
  description: "פלטפורמת פרסום ובידור למבוגרים",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl" style={{ direction: "rtl" }}>
      <head></head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${openSans.variable} antialiased ornamental-bg rtl-fix bg-background text-foreground`}
        style={{ direction: "rtl" }}
      >
        <ThemeProvider>
          <CustomToaster />
          <Header />
          <MainMenu />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
