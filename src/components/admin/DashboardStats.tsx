"use client";

import { useEffect, useState } from "react";

import { supabase } from "@/lib/supabase";

export default function DashboardStats() {

  const [totalBookings, setTotalBookings] =
    useState(0);

  const [pendingBookings, setPendingBookings] =
    useState(0);

  const [revenue, setRevenue] =
    useState(0);

  const [growth, setGrowth] =
    useState(0);

  async function fetchStats() {

    /* TOTAL BOOKINGS */

    const { count: total } =
      await supabase
        .from("bookings")
        .select("*", {

          count: "exact",

          head: true,

        });

    setTotalBookings(
      total || 0
    );

    /* PENDING BOOKINGS */

    const { count: pending } =
      await supabase
        .from("bookings")
        .select("*", {

          count: "exact",

          head: true,

        })
        .eq(
          "status",
          "pending"
        );

    setPendingBookings(
      pending || 0
    );

    /* REVENUE */

    const {
      data: revenueData,
    } = await supabase
      .from("bookings")
      .select("price");

    const totalRevenue =
      revenueData?.reduce(

        (acc, item) =>

          acc +
          Number(
            item.price
          ),

        0

      ) || 0;

    setRevenue(
      totalRevenue
    );

    /* MONTHLY GROWTH */

    const currentMonth =
      new Date().getMonth() + 1;

    const {
      data: growthData,
    } = await supabase
      .from("bookings")
      .select("created_at");

    const monthlyBookings =
      growthData?.filter(
        (item) => {

          const month =
            new Date(
              item.created_at
            ).getMonth() + 1;

          return (
            month ===
            currentMonth
          );

        }
      ).length || 0;

    setGrowth(
      monthlyBookings
    );

  }

  /* UPDATED useEffect */

  useEffect(() => {

    fetchStats();

    const handleBookingUpdate =
      async () => {

        await fetchStats();

      };

    window.addEventListener(
      "bookingUpdated",
      handleBookingUpdate
    );

    return () => {

      window.removeEventListener(
        "bookingUpdated",
        handleBookingUpdate
      );

    };

  }, []);

  return (

    <section className="w-full">

      {/* TITLE */}

      <div className="mb-12 text-center">

        <h1 className="text-5xl md:text-7xl font-extrabold text-white">

          Admin Dashboard

        </h1>

        <p className="text-slate-400 mt-4 text-lg">

          সকল বুকিং ও রিপোর্ট দেখুন

        </p>

      </div>

      {/* GRID */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        {/* TOTAL BOOKINGS */}

        <div className="bg-white/10 border border-white/10 rounded-3xl p-8 text-center shadow-xl hover:scale-[1.02] transition-all duration-300">

          <h3 className="text-slate-300 text-xl font-semibold">

            মোট বুকিং

          </h3>

          <p className="text-5xl font-extrabold text-white mt-4">

            {totalBookings}

          </p>

        </div>

        {/* PENDING BOOKINGS */}

        <div className="bg-white/10 border border-white/10 rounded-3xl p-8 text-center shadow-xl hover:scale-[1.02] transition-all duration-300">

          <h3 className="text-slate-300 text-xl font-semibold">

            Pending বুকিং

          </h3>

          <p className="text-5xl font-extrabold text-yellow-400 mt-4">

            {pendingBookings}

          </p>

        </div>

        {/* REVENUE */}

        <div className="bg-white/10 border border-white/10 rounded-3xl p-8 text-center shadow-xl hover:scale-[1.02] transition-all duration-300">

          <h3 className="text-slate-300 text-xl font-semibold">

            Revenue

          </h3>

          <p className="text-5xl font-extrabold text-green-400 mt-4">

            ৳ {revenue}

          </p>

        </div>

        {/* MONTHLY GROWTH */}

        <div className="bg-white/10 border border-white/10 rounded-3xl p-8 text-center shadow-xl hover:scale-[1.02] transition-all duration-300">

          <h3 className="text-slate-300 text-xl font-semibold">

            মাসিক Growth

          </h3>

          <p className="text-5xl font-extrabold text-cyan-400 mt-4">

            +{growth}

          </p>

        </div>

      </div>

    </section>

  );

}