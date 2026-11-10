import type { Metadata } from "next";
import { products } from "@/data/products";
import { Navbar } from "@/components/veloria/navbar";
import { Footer } from "@/components/veloria/footer";
import { ShopClient } from "@/components/veloria/shop-client";
import { BRAND_NAME, BRAND_PROSE, OG_IMAGE, OG_IMAGE_ALT } from "@/lib/site";

const title = "The Collection — Handmade Bracelets & Pearl Pieces";
const description = `Browse the full ${BRAND_PROSE} collection — beaded bracelets, pearl pieces and matching sets, hand-strung to order in India. Order on Instagram DM.`;

export const metadata: Metadata = {
  title: `${title} | ${BRAND_NAME}`,
  description,
  alternates: { canonical: "/shop" },
  openGraph: {
    title: `${title} — ${BRAND_NAME}`,
    description,
    url: "/shop",
    type: "website",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: OG_IMAGE_ALT }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} — ${BRAND_NAME}`,
    description,
    images: [OG_IMAGE],
  },
};

export default function ShopPage() {
  const live = products
    .filter((p) => p.active)
    .sort((a, b) => a.sort - b.sort);

  return (
    <div className="min-h-screen flex flex-col bg-ivory">
      <Navbar />
      <main className="flex-1">
        <ShopClient products={live} />
      </main>
      <Footer />
    </div>
  );
}
