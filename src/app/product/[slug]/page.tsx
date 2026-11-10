import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { products } from "@/data/products";
import { BRAND_NAME, OG_IMAGE, SITE_URL } from "@/lib/site";
import { Navbar } from "@/components/veloria/navbar";
import { Footer } from "@/components/veloria/footer";
import { ProductView } from "@/components/veloria/product-view";
import { Reveal } from "@/components/veloria/reveal";
import { ProductCard } from "@/components/veloria/product-card";

export function generateStaticParams() {
  return products
    .filter((p) => p.active)
    .map((p) => ({ slug: p.slug }));
}

async function getProduct(slug: string) {
  return (
    products.find((p) => p.active && p.slug === slug) ?? null
  );
}

/* Unique metadata per piece: its own title, description, canonical URL and —
   most importantly — its own photograph in the social preview. When a
   customer shares a product link, the actual product appears in WhatsApp,
   Instagram, Facebook, X and Telegram cards. */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) {
    return { title: `Piece not found`, robots: { index: false, follow: false } };
  }

  const description = product.blurb;
  const ogImage = product.images[0] ?? OG_IMAGE;

  return {
    title: `${product.name} — Handmade in India | ${BRAND_NAME}`,
    description,
    alternates: { canonical: `/product/${product.slug}` },
    openGraph: {
      type: "website",
      url: `/product/${product.slug}`,
      siteName: BRAND_NAME,
      title: `${product.name} — VELORIAA`,
      description,
      images: [
        {
          url: ogImage,
          width: 1080,
          height: 1439,
          alt: `${product.name} — handcrafted by VELORIAA`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} — VELORIAA`,
      description,
      images: [ogImage],
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) notFound();

  const others = products
    .filter((p) => p.active && p.slug !== slug)
    .sort((a, b) => a.sort - b.sort)
    .slice(0, 3);

  /* Product + BreadcrumbList structured data. Only real facts from the
     catalog — no prices exist (DM-first boutique), so none are invented. */
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        name: product.name,
        description: product.description,
        image: product.images.map((img) => `${SITE_URL}${img}`),
        sku: product.slug,
        category: product.tag ?? undefined,
        itemCondition: "https://schema.org/NewCondition",
        brand: { "@type": "Organization", name: BRAND_NAME },
        ...(product.postLink ? { sameAs: product.postLink } : {}),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          {
            "@type": "ListItem",
            position: 2,
            name: "The Collection",
            item: `${SITE_URL}/shop`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: product.name,
            item: `${SITE_URL}/product/${product.slug}`,
          },
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen flex flex-col bg-ivory">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <Reveal y={12}>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-stone hover:text-ink transition-colors"
            >
              <ArrowLeft className="size-4" strokeWidth={1.5} />
              Back to the collection
            </Link>
          </Reveal>

          <div className="mt-8">
            <ProductView product={product} />
          </div>

          {others.length > 0 && (
            <div className="mt-24 sm:mt-32">
              <div className="flex items-end justify-between gap-6 border-b border-line pb-5">
                <h2 className="font-display text-3xl sm:text-4xl text-ink">
                  More from the <span className="italic text-clay">collection</span>
                </h2>
                <Link
                  href="/shop"
                  className="link-underline hidden sm:inline-block text-[11px] uppercase tracking-[0.18em] text-ink"
                >
                  View all
                </Link>
              </div>
              <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
                {others.map((p, i) => (
                  <ProductCard key={p.slug} product={p} index={i} />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
