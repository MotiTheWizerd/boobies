import type { Metadata } from "next";
import { Geist, Geist_Mono, Open_Sans } from "next/font/google";
import "./globals.css";
import "./output.css";
import { ThemeProvider } from "./components/ThemeToggle/ThemeProvider";

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
  title: "פאבליש בורד - לוח פרסום",
  description: "פלטפורמת פרסום ובידור למבוגרים",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl" style={{ direction: "rtl" }}>
      <head>
        <style
          dangerouslySetInnerHTML={{
            __html: `
          body, html, div, section, article, nav, header, footer {
            direction: rtl !important;
          }
          .rtl-fix {
            direction: rtl !important;
            text-align: right !important;
          }
          [dir="rtl"] header .container {
            flex-direction: row-reverse !important;
          }
          /* Specific fix for the main menu */
          [dir="rtl"] .header-gradient ul {
            flex-direction: row-reverse !important;
          }
          [dir="rtl"] .header-gradient li {
            float: right;
          }
          /* Stronger overrides for menus */
          .header-gradient ul,
          .secondary-menu ul {
            display: flex !important;
            flex-direction: row-reverse !important;
          }
          nav ul {
            flex-direction: row-reverse !important;  
          }
          /* Ultra-specific fix for the bottom menu */
          .secondary-menu ul,
          ul.rtl-nav {
            display: flex !important;
            flex-direction: row-reverse !important;
            justify-content: center !important;
          }
          .secondary-menu li {
            float: right !important;
          }
        `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${openSans.variable} antialiased ornamental-bg rtl-fix bg-background text-foreground`}
        style={{ direction: "rtl" }}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
