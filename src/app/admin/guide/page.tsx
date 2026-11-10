import {
  ArrowUpRight,
  Database,
  KeyRound,
  Rocket,
  SlidersHorizontal,
} from "lucide-react";
import { Eyebrow } from "@/components/veloria/reveal";

function Code({ children }: { children: string }) {
  return (
    <pre className="mt-3 overflow-x-auto bg-ink text-ivory/90 p-4 text-xs leading-relaxed">
      <code>{children}</code>
    </pre>
  );
}

function Section({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-line pt-8">
      <h2 className="flex items-center gap-3 font-display text-2xl text-ink">
        <Icon className="size-5 text-clay" strokeWidth={1.25} />
        {title}
      </h2>
      <div className="mt-4 space-y-3 text-sm leading-relaxed text-stone">
        {children}
      </div>
    </section>
  );
}

export default function AdminGuide() {
  return (
    <div className="max-w-3xl">
      <Eyebrow>Guide</Eyebrow>
      <h1 className="mt-3 font-display text-4xl font-medium text-ink">
        Running your <span className="italic text-clay">studio site</span>
      </h1>
      <p className="mt-4 text-sm leading-relaxed text-stone">
        Everything about this site is intentionally simple: a static catalog,
        Instagram DMs for orders, and a sign-in that needs no database. Here is
        how to own it.
      </p>

      <div className="mt-10 space-y-10">
        <Section icon={KeyRound} title="1 · Studio sign-in">
          <p>
            The admin panel lives only at <span className="font-mono text-[11px]">/admin</span> —
            there is no sign-in link anywhere on the storefront, so customers
            never see it. Credentials come from environment variables, so there
            is no user table to maintain:
          </p>
          <Code>{`ADMIN_USERNAME=admin
ADMIN_PASSWORD=choose-a-strong-password
ADMIN_SESSION_SECRET=any-long-random-string`}</Code>
          <p>
            Set them in Vercel → your project → Settings → Environment
            Variables, then redeploy. Locally, the defaults are{" "}
            <span className="font-mono text-[11px]">admin</span> /{" "}
            <span className="font-mono text-[11px]">veloriaa@2026</span> — change
            them before going live.
          </p>
        </Section>

        <Section icon={SlidersHorizontal} title="2 · Edit the collection">
          <p>
            All pieces live in one clearly-commented file:{" "}
            <span className="font-mono text-[11px]">src/data/products.ts</span>.
            Copy any block to add a piece, set{" "}
            <span className="font-mono text-[11px]">active: false</span> to hide
            one, or change <span className="font-mono text-[11px]">sort</span> to
            reorder. Drop new photos into{" "}
            <span className="font-mono text-[11px]">public/images/ig/</span>.
          </p>
          <Code>{`{
  slug: "sunset-stacker",
  name: "Sunset Stacker",
  tag: "Bracelets",
  blurb: "Amber and coral beads for golden hours.",
  description: "A warm gradient of glass beads, strung to order…",
  images: ["/images/ig/sunset-stacker-1.jpg"],
  postLink: "https://www.instagram.com/p/XXXXXXXX/",
  sort: 23,
  active: true,
}`}</Code>
          <p>
            Commit and push — Vercel rebuilds the site automatically. No
            database to update, ever.
          </p>
        </Section>

        <Section icon={Database} title="3 · Brand details & DM links">
          <p>
            The Instagram handle, contact email, domain and policy wording are
            single constants in{" "}
            <span className="font-mono text-[11px]">src/lib/site.ts</span>.
            Change <span className="font-mono text-[11px]">INSTAGRAM_HANDLE</span>{" "}
            once and every DM button, deep link and message across the site
            follows.
          </p>
        </Section>

        <Section icon={Rocket} title="4 · Deploy to Vercel">
          <p>
            Push this folder to a Git repository, then in Vercel choose{" "}
            <em>Add New… → Project</em> and import it. Next.js is detected
            automatically — no build settings to change. Add the three{" "}
            <span className="font-mono text-[11px]">ADMIN_*</span> variables
            from step 1, deploy, and your domain{" "}
            <span className="font-mono text-[11px]">www.veloriaa.studio</span>{" "}
            points at the finished store.
          </p>
          <p>
            The storefront is fully static, so it loads fast worldwide; the only
            dynamic corner is the admin panel itself.
          </p>
        </Section>

        <a
          href="/admin"
          className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-ink link-underline"
        >
          Back to overview
          <ArrowUpRight className="size-4" strokeWidth={1.5} />
        </a>
      </div>
    </div>
  );
}
