"use client";

import { useEffect, useState } from "react";

import { supabase } from "@/lib/supabase";

export default function DashboardPage() {

  const [bookings, setBookings] =
    useState<any[]>([]);

  useEffect(() => {

    async function fetchBookings() {

      const {

        data: { user },

      } = await supabase.auth.getUser();

      if (!user) return;

      const { data } =
        await supabase
          .from("bookings")
          .select("*")
          .eq("user_id", user.id)
          .order(
            "created_at",
            { ascending: false }
          );

      setBookings(data || []);

    }

    fetchBookings();

  }, []);

  return (

    <div className="p-10">

      <h1 className="text-3xl font-bold mb-6">

        My Bookings

      </h1>

      <div className="space-y-4">

        {bookings.map((booking) => (

          <div
            key={booking.id}
            className="border p-5 rounded-xl"
          >

            <h2>

              {booking.service}

            </h2>

            <p>

              {booking.booking_id}

            </p>

            <p>

              {booking.phone}

            </p>

          </div>

        ))}

      </div>

    </div>

  );

}