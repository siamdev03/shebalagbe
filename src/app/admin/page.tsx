"use client";

import DashboardStats from "@/components/admin/DashboardStats";
import BookingTable from "@/components/admin/BookingTable";
import AdminGuard
from "@/components/admin/AdminGuard";
export default function AdminPage() {

  return (
    <AdminGuard>
    <main className="min-h-screen bg-slate-950 p-6">

      <DashboardStats />
      <BookingTable />
    </main>
    </AdminGuard>
  );

}