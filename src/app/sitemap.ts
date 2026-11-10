import type { MetadataRoute } from "next";
import { products } from "@/data/products";
import { SITE_URL } from "@/lib/site";

/* Full catalog sitemap — homepage, shop and every active piece.
   Regenerated at build time on Vercel, always in sync with the catalog. */
export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/shop`, changeFrequency: "weekly", priority: 0.9 },
  ];

  const productRoutes: MetadataRoute.Sitemap = products
    .filter((p) => p.active)
    .map((p) => ({
      url: `${SITE_URL}/product/${p.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }));

  return [...staticRoutes, ...productRoutes];
}
