# VELORIAA — Three-Domain Setup (SEO Guide)

The site is reachable on three domains:

| # | Domain | Role |
|---|--------|------|
| 1 | `https://www.veloriaa.studio` | **PRIMARY — canonical** (all SEO meta tags point here) |
| 2 | `https://veloriaa.vercel.app` | Alternate (Vercel's own subdomain) |
| 3 | `https://www.veloriaa.me` | Alternate |

## What is already implemented in the code

Every page — home, shop, all 22 product pages — always emits the same absolute
URLs, no matter which domain serves the request:

- `<link rel="canonical" href="https://www.veloriaa.studio/...">` — tells Google
  "index the .studio address" for all three domains, so the domains can never
  compete with each other in search results.
- `og:url` and every `og:image` / `twitter:image` are absolute
  `https://www.veloriaa.studio/...` URLs — WhatsApp, Facebook and Instagram
  previews work identically on all three domains.
- `sitemap.xml` lists only `https://www.veloriaa.studio` URLs.
- `robots.txt` points to the .studio sitemap and blocks `/admin`.

The single source of truth is `src/lib/site.ts` (`PRIMARY_DOMAIN`,
`ALTERNATE_DOMAINS`, `SITE_URL`). Changing the primary domain later is a
one-line change; every tag on every page updates automatically.

**Why all three domains share one canonical:** three identical websites with
three separate sets of meta tags would split search ranking across three
addresses (duplicate content). One canonical domain concentrates all signals —
this is Google's recommended pattern. The alternates are still fully usable by
visitors; search engines simply consolidate them into the .studio results.

## Step 1 — Vercel: attach the domains (5 minutes)

1. Vercel Dashboard → your project → **Settings → Domains**.
2. Add each domain one by one:
   - `veloriaa.studio` (apex — keep it; Vercel redirects it to www)
   - `www.veloriaa.studio`
   - `veloriaa.vercel.app` — already attached automatically; **note: vercel.app
     subdomains do not use "www."**, so `www.veloriaa.vercel.app` is not an
     address Vercel can serve — use `veloriaa.vercel.app`.
   - `veloriaa.me` and `www.veloriaa.me` (needs the domain added to your
     Vercel account first — Vercel shows the exact DNS records: an A record
     `76.76.21.21` for the apex and `cname.vercel-dns.com` for www).
3. For every domain **except** `www.veloriaa.studio`, choose
   **"Redirect to www.veloriaa.studio"** (301) when Vercel asks.
   Result: `veloriaa.vercel.app` and `veloriaa.me` visitors land on the
   primary domain; the canonical tag is the safety net even without this.

## Step 2 — Google Search Console (10 minutes)

1. Verify **all** properties: `veloriaa.studio` (Domain property, DNS TXT
   record), plus URL properties for `veloriaa.me` and `veloriaa.vercel.app`.
2. Submit the sitemap **once**, on the primary:
   `https://www.veloriaa.studio/sitemap.xml`.
3. No "change of address" is needed — the site is new.

## Step 3 — Social preview check

After deploying, paste a product link from each domain into the
Facebook Sharing Debugger (developers.facebook.com/tools/debug/) and press
**Scrape again** — the preview must show the .studio URL, the ivory banner
og-image and the correct title.

## Changing the primary domain later

Edit **one line** in `src/lib/site.ts`:

```ts
export const PRIMARY_DOMAIN = "www.veloriaa.studio";
```

Every canonical, OG, Twitter, JSON-LD, robots and sitemap URL across all pages
follows automatically. Then re-deploy.
