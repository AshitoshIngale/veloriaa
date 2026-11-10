import { getAdminSession } from "@/lib/admin-auth";
import { AdminSignIn } from "@/components/admin/sign-in-form";
import { AdminShell } from "./admin-shell";

export const dynamic = "force-dynamic";

export const metadata = {
  title: { absolute: "Studio Admin — VELORIAA" },
  robots: { index: false, follow: false },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAdminSession();

  /* The /admin route itself is the sign-in gate — no customer-facing
     sign-in exists anywhere on the site. */
  if (!session) {
    return <AdminSignIn />;
  }

  return <AdminShell username={session.username}>{children}</AdminShell>;
}
