import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import {
  BRAND_NAME,
  BRAND_PROSE,
  INSTAGRAM_HANDLE,
  OG_IMAGE,
  OG_IMAGE_ALT,
  SITE_URL,
} from "@/lib/site";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

/* Brand voice used consistently across SEO, OG and Twitter previews. */
const DEFAULT_TITLE = `${BRAND_NAME} | Elegance in Every Detail`;
const DEFAULT_DESCRIPTION =
  "Discover VELORIAA — thoughtfully designed accessories, elegant keychains and timeless details. Explore our collection.";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#FAF7F1",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: DEFAULT_TITLE,
  description: DEFAULT_DESCRIPTION,
  keywords: [
    BRAND_PROSE,
    "VELORIAA",
    "handmade bracelets",
    "beaded bracelets",
    "pearl jewellery",
    "keychains",
    "bag charms",
    "matching couple bracelets",
    "custom bracelet India",
    "handmade jewellery India",
    "Instagram boutique",
  ],
  authors: [{ name: BRAND_PROSE, url: INSTAGRAM_HANDLE ? `https://instagram.com/${INSTAGRAM_HANDLE}` : SITE_URL }],
  creator: BRAND_PROSE,
  /* The homepage itself; individual pages override with their own canonical. */
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "shopping",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "/",
    siteName: BRAND_NAME,
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: OG_IMAGE_ALT,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [OG_IMAGE],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${cormorant.variable} ${inter.variable} font-sans antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
