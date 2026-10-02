import type { Metadata } from "next";
import { AdminTrafficDashboard } from "@/components/admin-traffic-dashboard";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Traffic Admin",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default function TrafficAdminPage() {
  return <AdminTrafficDashboard />;
}
