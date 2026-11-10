import { products } from "@/data/products";
import { Intro } from "@/components/veloria/intro";
import { Navbar } from "@/components/veloria/navbar";
import { Hero } from "@/components/veloria/hero";
import { Marquee } from "@/components/veloria/marquee";
import { Products } from "@/components/veloria/products";
import { Story } from "@/components/veloria/story";
import { Craft } from "@/components/veloria/craft";
import { DmBand } from "@/components/veloria/dm-band";
import { Faq } from "@/components/veloria/faq";
import { Footer } from "@/components/veloria/footer";
import { BRAND_NAME, CONTACT_EMAIL, INSTAGRAM_PROFILE_URL, SITE_URL } from "@/lib/site";

/* Organization + WebSite structured data — only verified facts:
   brand name, site URL, Instagram profile and the contact email
   already shown in the footer. No invented ratings or addresses. */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: BRAND_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}/images/veloriaa-logo.png`,
      sameAs: [INSTAGRAM_PROFILE_URL],
      contactPoint: [
        {
          "@type": "ContactPoint",
          email: CONTACT_EMAIL,
          contactType: "customer service",
        },
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: BRAND_NAME,
      inLanguage: "en-IN",
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
  ],
};

export default function Home() {
  const live = products.filter((p) => p.active).sort((a, b) => a.sort - b.sort);

  return (
    <div className="min-h-screen flex flex-col bg-ivory">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Intro />
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Marquee />
        <Products products={live} />
        <Story />
        <Craft />
        <DmBand products={live} />
        <Faq />
      </main>
      <Footer />
    </div>
  );
}
