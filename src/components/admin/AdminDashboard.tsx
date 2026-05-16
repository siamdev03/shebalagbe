"use client";

import { useMemo, useState } from "react";

import BookingTable from "./BookingTable";
import BookingSearchFilter from "./BookingSearchFilter";

import { bookings } from "@/data/bookingDummy";

export default function AdminDashboard() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredBookings = useMemo(() => {
    return bookings.filter((booking) => {
      const search = searchTerm.toLowerCase();

      return (
        booking.customerName?.toLowerCase().includes(search) ||
        booking.email?.toLowerCase().includes(search) ||
        booking.phone?.toLowerCase().includes(search) ||
        booking.service?.toLowerCase().includes(search)
      );
    });
  }, [searchTerm]);

  return (
    <div className="w-full">
      <BookingSearchFilter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <BookingTable bookings={filteredBookings} />
    </div>
  );
}