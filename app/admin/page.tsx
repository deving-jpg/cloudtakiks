import type { Metadata } from "next";
import { isAuthed } from "@/lib/auth";
import AdminForm from "@/components/AdminForm";
import AdminLogin from "@/components/AdminLogin";

export const metadata: Metadata = {
  title: "Admin — Cloud Taktiks",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default function AdminPage() {
  if (!isAuthed()) return <AdminLogin />;
  return <AdminForm />;
}
