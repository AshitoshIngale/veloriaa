import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

/* Every public page is indexable; the studio admin area never is. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
