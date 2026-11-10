import { Instagram, Mail } from "lucide-react";
import Link from "next/link";
import {
  BRAND_NAME,
  BRAND_PROSE,
  CONTACT_EMAIL,
  INSTAGRAM_HANDLE,
  INSTAGRAM_PROFILE_URL,
  INSTAGRAM_DM_URL,
  POLICY_PREPAID,
  POLICY_RETURNS,
} from "@/lib/site";

const SHOP_LINKS = [
  { label: "All pieces", href: "/shop" },
  { label: "Matching Moments", href: "/product/matching-moments" },
  { label: "Colour Therapy", href: "/product/colour-therapy" },
  { label: "A Little Luxury", href: "/product/a-little-luxury" },
  { label: "Stack It", href: "/product/stack-it" },
];

const HELP_LINKS = [
  { label: "Our story", href: "/#story" },
  { label: "How to order", href: "/#craft" },
  { label: "FAQ", href: "/#faq" },
  { label: "The collection", href: "/shop" },
];

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      className="flex size-10 items-center justify-center border border-ivory/15 text-ivory/70 transition-all duration-300 hover:border-clay-soft hover:text-clay-soft"
    >
      {children}
    </a>
  );
}

export function Footer() {
  return (
    <footer className="mt-auto bg-ink text-ivory border-t border-ivory/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 py-16 sm:py-20 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          {/* brand */}
          <div>
            <p className="font-display text-2xl tracking-[0.32em] text-ivory">
              {BRAND_NAME}
            </p>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-ivory/60">
              Hand-strung beads, pearls and charms — made to order in small
              batches, and shipped with love across India.
            </p>
            <div className="mt-7 flex gap-3">
              <SocialLink href={INSTAGRAM_PROFILE_URL} label="VELORIAA on Instagram">
                <Instagram className="size-4" strokeWidth={1.5} />
              </SocialLink>
              <SocialLink href={`mailto:${CONTACT_EMAIL}`} label={`Email ${BRAND_PROSE}`}>
                <Mail className="size-4" strokeWidth={1.5} />
              </SocialLink>
            </div>
            <a
              href={INSTAGRAM_DM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 border border-clay-soft/50 px-4 py-2.5 text-[11px] uppercase tracking-[0.16em] text-clay-soft transition-colors hover:bg-clay-soft hover:text-ink"
            >
              <Instagram className="size-4" strokeWidth={1.5} />
              DM @{INSTAGRAM_HANDLE} to order
            </a>
            <p className="mt-6 max-w-xs text-xs leading-relaxed text-ivory/40">
              {POLICY_PREPAID} {POLICY_RETURNS}
            </p>
          </div>

          {/* shop */}
          <nav aria-label="Shop links">
            <h3 className="text-[11px] uppercase tracking-widest-xl text-ivory/50">
              Shop
            </h3>
            <ul className="mt-5 space-y-3">
              {SHOP_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="link-underline text-sm text-ivory/80 hover:text-ivory transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* help */}
          <nav aria-label="Help links">
            <h3 className="text-[11px] uppercase tracking-widest-xl text-ivory/50">
              Help
            </h3>
            <ul className="mt-5 space-y-3">
              {HELP_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="link-underline text-sm text-ivory/80 hover:text-ivory transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* contact */}
          <div>
            <h3 className="text-[11px] uppercase tracking-widest-xl text-ivory/50">
              The Studio
            </h3>
            <address className="mt-5 space-y-3 text-sm not-italic text-ivory/80">
              <p>Made in India, worn everywhere.</p>
              <p>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="link-underline text-ivory/80 hover:text-ivory transition-colors"
                >
                  {CONTACT_EMAIL}
                </a>
              </p>
              <p className="text-ivory/50">
                Customer care on Instagram DM — Mon to Sat, 10am to 7pm IST
              </p>
            </address>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-ivory/10 py-7 pb-[max(1.75rem,env(safe-area-inset-bottom))]">
          <p className="text-xs text-ivory/40 tracking-wide">
            © {new Date().getFullYear()} {BRAND_PROSE} Studio, India. All rights
            reserved.
          </p>
          <p className="text-xs text-ivory/40 tracking-wide">
            Crafted with patience in India.
          </p>
        </div>
      </div>
    </footer>
  );
}
