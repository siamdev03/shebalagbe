"use client";

import { useEffect } from "react";

import { supabase } from "@/lib/supabase";

import toast from "react-hot-toast";

export default function LiveNotification() {

  useEffect(() => {

    const channel =
      supabase
        .channel("bookings-live")

        .on(

          "postgres_changes",

          {

            event: "INSERT",

            schema: "public",

            table: "bookings",

          },

          (payload) => {

            toast.success(

              `নতুন বুকিং এসেছে 🔥`

            );

          }

        )

        .subscribe();

    return () => {

      supabase.removeChannel(
        channel
      );

    };

  }, []);

  return null;

}