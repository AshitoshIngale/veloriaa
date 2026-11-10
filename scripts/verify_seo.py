#!/usr/bin/env python3
"""VELORIAA SEO launch verification.

Runs the 10-point checklist from the SEO master prompt against a running
server (production build served on :3100 by default).

Usage: python3 scripts/verify_seo.py [base_url]
Exit code 0 = all checks passed, 1 = at least one failure.
"""
import json
import re
import sys
import urllib.request
import urllib.error

BASE = sys.argv[1] if len(sys.argv) > 1 else "http://localhost:3100"
SITE = "https://www.veloriaa.studio"
RESULTS = []


def get(path, method="GET"):
    req = urllib.request.Request(BASE + path, method=method)
    try:
        with urllib.request.urlopen(req, timeout=30) as r:
            body = b"" if method == "HEAD" else r.read()
            return r.status, dict(r.headers), body
    except urllib.error.HTTPError as e:
        body = b"" if method == "HEAD" else e.read()
        return e.code, dict(e.headers), body


def hget(headers, key):
    """Case-insensitive header lookup (Node serves lowercase keys)."""
    for k, v in headers.items():
        if k.lower() == key.lower():
            return v
    return ""


def check(name, ok, detail=""):
    RESULTS.append(ok)
    print(("PASS  " if ok else "FAIL  ") + name + (("  — " + detail) if detail else ""))


def parse_tags(html):
    """Extract all <meta>/<link> tags as attribute dicts."""
    metas, links = [], []
    for tag in re.findall(r"<meta[^>]*>", html):
        metas.append(dict(re.findall(r'([\w:-]+)="([^"]*)"', tag)))
    for tag in re.findall(r"<link[^>]*>", html):
        links.append(dict(re.findall(r'([\w:-]+)="([^"]*)"', tag)))
    return metas, links


def meta_of(metas, **kw):
    for m in metas:
        if all(m.get(k) == v for k, v in kw.items()):
            return m
    return None


def json_lds(html):
    out = []
    for m in re.finditer(
        r'<script type="application/ld\+json"[^>]*>(.*?)</script>', html, re.S
    ):
        try:
            out.append(json.loads(m.group(1)))
        except json.JSONDecodeError:
            pass
    return out


def graph_types(data):
    if isinstance(data, dict):
        if "@graph" in data:
            return [n.get("@type") for n in data["@graph"]]
        return [data.get("@type")]
    return []


# ── 1. Homepage initial HTML ────────────────────────────────────────────────
s, h, body = get("/")
html = body.decode("utf-8", "replace")
check("1. homepage HTTP 200", s == 200, str(s))
metas, links = parse_tags(html)

title = re.search(r"<title>(.*?)</title>", html)
check("1a. title tag exact", bool(title) and title.group(1) == "VELORIAA | Elegance in Every Detail",
      title.group(1) if title else "missing")
desc = meta_of(metas, name="description")
check("1b. meta description exact", bool(desc) and desc["content"] ==
      "Discover VELORIAA — thoughtfully designed accessories, elegant keychains and timeless details. Explore our collection.",
      (desc or {}).get("content", "missing")[:60] + "…")

og = {
    "og:type": "website",
    "og:site_name": "VELORIAA",
    "og:title": "VELORIAA | Elegance in Every Detail",
    "og:url": SITE + "/",
    "og:image": SITE + "/images/og-image.jpg",
    "og:image:width": "1200",
    "og:image:height": "630",
    "og:locale": "en_IN",
}
for prop, want in og.items():
    got = (meta_of(metas, property=prop) or {}).get("content")
    ok = got == want or (prop == "og:url" and got == SITE)  # Next strips trailing slash
    check(f"1c. {prop}", ok, f"{got!r}" if not ok else "")
alt = (meta_of(metas, property="og:image:alt") or {}).get("content", "")
check("1d. og:image:alt present", len(alt) > 10, alt[:50])

tw = {
    "twitter:card": "summary_large_image",
    "twitter:title": "VELORIAA | Elegance in Every Detail",
    "twitter:image": SITE + "/images/og-image.jpg",
}
for name, want in tw.items():
    got = (meta_of(metas, name=name) or {}).get("content")
    check(f"1e. {name}", got == want, f"{got!r}" if got != want else "")

canon = [l for l in links if l.get("rel") == "canonical"]
check("1f. canonical absolute .studio", bool(canon) and canon[0].get("href") in (SITE, SITE + "/"),
      (canon[0].get("href") if canon else "missing"))
theme = meta_of(metas, name="theme-color")
check("1g. theme-color #FAF7F1", bool(theme) and theme["content"] == "#FAF7F1")
check("1h. viewport meta", bool(meta_of(metas, name="viewport")))
check("1i. lang=en on <html>", '<html lang="en"' in html)
check("1j. author/creator meta", bool(meta_of(metas, name="author")))

# JSON-LD Organization + WebSite
types = []
for data in json_lds(html):
    types += graph_types(data)
check("1k. JSON-LD Organization+WebSite", "Organization" in types and "WebSite" in types, str(types))

# icon links present in head (Next file-convention icons, cache-busted)
icon_rels = [l for l in links if l.get("rel") in ("icon", "apple-touch-icon", "shortcut icon")]
check("1l. favicon/apple icon link tags", len(icon_rels) >= 2,
      str([l.get("rel") for l in icon_rels]))

# ── 2. OG image reachable ───────────────────────────────────────────────────
s, h, body = get("/images/og-image.jpg")
check("2. /images/og-image.jpg 200 + jpeg", s == 200 and hget(h, "content-type").startswith("image/jpeg")
      and len(body) > 50000, f"{s}, {len(body)//1024}KB, {hget(h, 'content-type')}")

# ── 3. robots.txt ───────────────────────────────────────────────────────────
s, h, body = get("/robots.txt")
robots = body.decode()
check("3. robots.txt 200 + sitemap + admin disallow",
      s == 200 and f"Sitemap: {SITE}/sitemap.xml" in robots and "Disallow: /admin" in robots,
      robots.replace("\n", " ")[:90])

# ── 4. sitemap.xml ──────────────────────────────────────────────────────────
s, h, body = get("/sitemap.xml")
sm = body.decode()
n_products = sm.count("/product/")
check("4. sitemap 200, .studio, /shop, ≥20 product URLs",
      s == 200 and SITE in sm and f"{SITE}/shop</loc>" in sm and n_products >= 20,
      f"{s}, product URLs: {n_products}")

# ── 5. favicon suite (GET: next start omits Content-Type on HEAD) ─────────
for path in ["/favicon.ico", "/icon.png", "/apple-icon.png"]:
    s, h, body = get(path)
    ok = s == 200 and hget(h, "content-type").startswith("image/") and len(body) > 500
    check(f"5. {path} 200 + image", ok, f"{s}, {hget(h, 'content-type')}, {len(body)//1024}KB")

# ── 6. Product page unique metadata + JSON-LD ──────────────────────────────
s, h, body = get("/product/colour-therapy")
phtml = body.decode("utf-8", "replace")
check("6. product page 200", s == 200)
pmetas, plinks = parse_tags(phtml)
ptitle = re.search(r"<title>(.*?)</title>", phtml)
check("6a. product title unique", bool(ptitle) and "Colour Therapy" in ptitle.group(1)
      and ptitle.group(1) != "VELORIAA | Elegance in Every Detail",
      ptitle.group(1) if ptitle else "missing")
pcanon = [l for l in plinks if l.get("rel") == "canonical"]
check("6b. product canonical", bool(pcanon) and pcanon[0].get("href") == SITE + "/product/colour-therapy",
      pcanon[0].get("href") if pcanon else "missing")
pog = (meta_of(pmetas, property="og:image") or {}).get("content", "")
check("6c. product OG = own photo (absolute)", pog.startswith(SITE + "/images/ig/post-"), pog[:80])
check("6d. product og:image:height 1439", (meta_of(pmetas, property="og:image:height") or {}).get("content") == "1439")
ptypes = []
for data in json_lds(phtml):
    ptypes += graph_types(data)
check("6e. Product + BreadcrumbList JSON-LD", "Product" in ptypes and "BreadcrumbList" in ptypes, str(ptypes))
no_price = all("offers" not in json.dumps(d) for d in json_lds(phtml))
check("6f. no invented price/offers in JSON-LD", no_price)

# product OG image actually resolvable
og_path = pog.replace(SITE, "") if pog.startswith(SITE) else pog
if og_path:
    s, h, body = get(og_path, method="HEAD")
    check("6g. product OG image fetchable", s == 200 and hget(h, "content-type").startswith("image/"), f"{s}")

# ── 7. Shop page ────────────────────────────────────────────────────────────
s, h, body = get("/shop")
shtml = body.decode("utf-8", "replace")
smetas, slinks = parse_tags(shtml)
stitle = re.search(r"<title>(.*?)</title>", shtml)
check("7. shop 200 + unique title + canonical",
      s == 200 and bool(stitle) and "Collection" in stitle.group(1)
      and any(l.get("rel") == "canonical" and l.get("href", "").endswith("/shop") for l in slinks),
      stitle.group(1) if stitle else "missing")

# ── 8. Admin noindex ────────────────────────────────────────────────────────
s, h, body = get("/admin")
ahtml = body.decode("utf-8", "replace")
ametas, _ = parse_tags(ahtml)
rob = meta_of(ametas, name="robots")
rob_content = (rob or {}).get("content", "").replace(" ", "")
check("8. /admin served + noindex", s == 200 and "noindex" in rob_content and "nofollow" in rob_content,
      f"{s}, robots={rob_content or 'missing'}")

# ── 9. All OG/canonical URLs absolute https .studio ─────────────────────────
urls = []
for m in metas + pmetas:
    if m.get("property", "").startswith("og:") and m.get("property") in ("og:url", "og:image"):
        urls.append(m.get("content", ""))
    if m.get("name") == "twitter:image":
        urls.append(m.get("content", ""))
urls += [l.get("href", "") for l in links + plinks if l.get("rel") == "canonical"]
bad = [u for u in urls if u and not u.startswith(SITE + "/") and u != SITE]
check("9. every shared/canonical URL absolute on .studio", not bad, str(bad[:3]))

# ── 10. Homepage title ≠ shop title ≠ product title ─────────────────────────
check("10. unique titles across pages",
      title and stitle and ptitle and len({title.group(1), stitle.group(1), ptitle.group(1)}) == 3)

print("\n" + "=" * 60)
passed = sum(RESULTS)
print(f"{passed}/{len(RESULTS)} checks passed")
sys.exit(0 if passed == len(RESULTS) else 1)
