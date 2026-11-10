/* ---------------------------------------------------------------------------
   VELORIAA — brand constants & the DM-first order flow.

   ⚑ ONE-LINE BRAND CONTROL
   Change INSTAGRAM_HANDLE below and every "DM to order" link, message and
   profile link across the site updates automatically.
--------------------------------------------------------------------------- */

export const BRAND_NAME = "VELORIAA";
export const BRAND_PROSE = "Veloriaa"; // used inside sentences

/* Your Instagram handle WITHOUT the @.
   All DM deep links (https://ig.me/m/<handle>) are built from this. */
export const INSTAGRAM_HANDLE = "the_veloriaa";

export const INSTAGRAM_DM_URL = `https://ig.me/m/${INSTAGRAM_HANDLE}`;
export const INSTAGRAM_PROFILE_URL = `https://instagram.com/${INSTAGRAM_HANDLE}`;

/* ---------------------------------------------------------------------------
   DOMAINS — canonical domain for all meta tags, OG, sitemap and JSON-LD.

   ⚑ SEO RULE: ONE canonical domain. Every meta tag — canonical, og:url,
     og:image, robots.txt, sitemap.xml and all JSON-LD — always points at
     SITE_URL below.

       1. theveloriaa.vercel.app  ← PRIMARY / canonical (SITE_URL)

   ▸ On Vercel: add your custom domain in Project → Settings → Domains
     and mark it as PRIMARY if you later add a custom domain.
     See DEPLOYMENT-DOMAINS.md for the full steps.
--------------------------------------------------------------------------- */
export const PRIMARY_DOMAIN = "theveloriaa.vercel.app";
export const ALTERNATE_DOMAINS = [] as const;

export const SITE_URL = `https://${PRIMARY_DOMAIN}`;

/* Contact email shown in the footer. */
export const CONTACT_EMAIL = "hello@veloriaa.studio";

/* Social sharing image (1200×630) used for OG / Twitter cards sitewide. */
export const OG_IMAGE = "/images/og-image.jpg";
export const OG_IMAGE_ALT =
  "VELORIAA — handcrafted accessories: beaded bracelets, pearl pieces and charms";

/* ---------------------------------------------------------------------------
   Policy copy — surfaced on product pages, FAQ and footer.
--------------------------------------------------------------------------- */

export const POLICY_PREPAID =
  "Prepaid orders only — UPI. No cash on delivery.";
export const POLICY_RETURNS =
  "No returns for change of mind — damaged or defective pieces are replaced free within 48 hours of delivery.";

/* ---------------------------------------------------------------------------
   Catalog (static, DB-free).
--------------------------------------------------------------------------- */

export type Product = {
  slug: string;
  name: string;
  tag: string | null;
  blurb: string;
  description: string;
  images: string[];
  postLink: string | null;
  sort: number;
  active: boolean;
};

/* ---------------------------------------------------------------------------
   DM message builders — the "proper DM in chat" flow:
   the customer's message is copied to the clipboard, then Instagram's DM
   (ig.me) opens in a new tab so they can simply paste and send.
--------------------------------------------------------------------------- */

export function dmMessageForPiece(name: string, postLink?: string | null): string {
  const link = postLink ? `\n${postLink}` : "";
  return `Hi ${BRAND_PROSE}! I'd love to order the "${name}" — is it available?${link}`;
}

export function dmMessageGeneral(): string {
  return `Hi ${BRAND_PROSE}! I'd like to place an order — could you help me?`;
}
