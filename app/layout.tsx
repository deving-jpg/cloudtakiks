import type { Metadata } from "next";
import { Raleway, Tajawal } from "next/font/google";
import "./globals.css";
import { ThemeProvider, themeScript } from "@/components/ThemeProvider";
import { LanguageProvider } from "@/components/LanguageProvider";
import { getLang } from "@/lib/lang";
import Preloader from "@/components/Preloader";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CursorGlow from "@/components/CursorGlow";
import ScrollProgress from "@/components/ScrollProgress";

const raleway = Raleway({
  subsets: ["latin"],
  weight: ["300", "400", "600", "800"],
  variable: "--font-raleway",
  display: "swap",
});

const tajawal = Tajawal({
  subsets: ["arabic"],
  weight: ["400", "500", "700", "800"],
  variable: "--font-arabic",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Cloud Taktiks — Cloud-based ERP Excellence",
  description:
    "Cloud Taktiks delivers secure, scalable SAP Business One cloud hosting, cybersecurity and Microsoft 365 solutions. Trusted by 750+ clients across 40+ countries since 2016.",
  keywords: [
    "SAP Business One Cloud Hosting",
    "Cloud ERP",
    "CrowdStrike",
    "Cyber Security",
    "Microsoft 365",
    "Cloud Taktiks",
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const lang = getLang();
  const dir = lang === "ar" ? "rtl" : "ltr";
  return (
    <html lang={lang} dir={dir} className={`${raleway.variable} ${tajawal.variable} dark`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="bg-bg font-sans text-content">
        <ThemeProvider>
          <LanguageProvider initial={lang}>
            <Preloader />
            <SmoothScroll>
              <ScrollProgress />
              <CursorGlow />
              <Navbar />
              <main>{children}</main>
              <Footer />
            </SmoothScroll>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
