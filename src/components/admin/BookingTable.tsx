
"use client";

import { useEffect, useMemo, useState } from "react";

import { supabase } from "@/lib/supabase";

import toast from "react-hot-toast";

import { Trash2, Search } from "lucide-react";

interface Booking {
  id: string;
  booking_id: string;
  customer_name: string;
  phone: string | number;
  service: string;
  address: string;
  status: string;
  price: number;
}

export default function BookingTable() {
  const [bookings, setBookings] =
    useState<Booking[]>([]);

  const [loading, setLoading] =
    useState(true);

  /* SEARCH STATE */

  const [searchTerm, setSearchTerm] =
    useState("");

  /* FETCH BOOKINGS */

  async function fetchBookings() {
    const { data, error } =
      await supabase
        .from("bookings")
        .select("*")
        .order("id", {
          ascending: false,
        });

    if (error) {
      console.log(error);

      toast.error(
        "Bookings load failed ❌"
      );

      return;
    }

    setBookings(data || []);

    setLoading(false);
  }

  /* FILTERED BOOKINGS */

  const filteredBookings =
    useMemo(() => {
      return bookings.filter(
        (booking) => {

          const search =
            searchTerm
              .trim()
              .toLowerCase();

          const bookingId =
            booking.booking_id
              ?.toLowerCase() || "";

          const customerName =
            booking.customer_name
              ?.toLowerCase() || "";

          const phone =
            String(
              booking.phone || ""
            ).trim();

          const service =
            booking.service
              ?.toLowerCase() || "";

          const status =
            booking.status
              ?.toLowerCase() || "";

          return (
            bookingId.includes(
              search
            ) ||

            customerName.includes(
              search
            ) ||

            phone.includes(
              search
            ) ||

            service.includes(
              search
            ) ||

            status.includes(
              search
            )
          );
        }
      );
    }, [bookings, searchTerm]);

  /* APPROVE BOOKING */

  async function handleApprove(
    id: string
  ) {
    const { data, error } =
      await supabase
        .from("bookings")
        .update({
          status:
            "approved",
        })
        .eq("id", id)
        .select();

    console.log(
      "UPDATED DATA:",
      data
    );

    console.log(
      "UPDATE ERROR:",
      error
    );

    if (error) {
      toast.error(
        "Approve failed ❌"
      );

      return;
    }

    toast.success(
      "Approved Successfully ✅"
    );

    /* REFRESH BOOKINGS */

    fetchBookings();

    /* REFRESH DASHBOARD STATS */

    window.dispatchEvent(
      new CustomEvent(
        "bookingUpdated"
      )
    );
  }

  /* DELETE BOOKING */

  async function handleDelete(
    id: string
  ) {
    toast((t) => (
      <div className="flex flex-col gap-4">
        <p className="font-semibold text-black">
          এই বুকিং delete করতে চান?
        </p>

        <div className="flex gap-2">

          {/* CANCEL */}

          <button
            onClick={() =>
              toast.dismiss(t.id)
            }
            className="px-4 py-2 rounded-lg bg-gray-300 text-black font-semibold"
          >
            Cancel
          </button>

          {/* DELETE */}

          <button
            onClick={async () => {

              toast.dismiss(t.id);

              const { error } =
                await supabase
                  .from("bookings")
                  .delete()
                  .eq("id", id);

              console.log(
                "DELETE ERROR:",
                error
              );

              if (error) {

                toast.error(
                  "Delete failed ❌"
                );

                return;
              }

              /* REMOVE FROM UI INSTANTLY */

              setBookings((prev) =>
                prev.filter(
                  (booking) =>
                    booking.id !== id
                )
              );

              toast.success(
                "Booking Deleted 🗑️"
              );

              /* REFRESH DASHBOARD STATS */

              window.dispatchEvent(
                new CustomEvent(
                  "bookingUpdated"
                )
              );

            }}
            className="px-4 py-2 rounded-lg bg-red-500 text-white font-semibold"
          >
            Delete
          </button>

        </div>
      </div>
    ));
  }

  useEffect(() => {
    fetchBookings();
  }, []);

  if (loading) {
    return (
      <p className="text-white">
        Loading...
      </p>
    );
  }

  return (
    <div className="mt-10 bg-white/10 border border-white/10 rounded-3xl p-6 overflow-x-auto">

      {/* HEADER */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">

        <h2 className="text-3xl font-bold text-white">
          সকল বুকিং 📦
        </h2>

        {/* SEARCH BOX */}

        <div className="relative w-full md:w-[350px]">

          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search booking..."
            value={searchTerm}
            onChange={(e) =>
              setSearchTerm(
                e.target.value
              )
            }
            className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white/10 border border-cyan-400 text-white placeholder:text-slate-400 outline-none focus:border-cyan-400"
          />

        </div>
      </div>

      <table className="w-full text-left text-white">

        <thead>

          <tr className="border-b border-white/10 text-slate-300">

            <th className="p-4">
              বুকিং আইডি
            </th>

            <th className="p-4">
              নাম
            </th>

            <th className="p-4">
              ফোন
            </th>

            <th className="p-4">
              সার্ভিস
            </th>

            <th className="p-4">
              মূল্য
            </th>

            <th className="p-4">
              স্ট্যাটাস
            </th>

            <th className="p-4">
              Action
            </th>

          </tr>

        </thead>

        <tbody>

          {filteredBookings.length >
          0 ? (

            filteredBookings.map(
              (booking) => (

                <tr
                  key={booking.id}
                  className="border-b border-white/5"
                >

                  {/* BOOKING ID */}

                  <td className="p-4">
                    {
                      booking.booking_id
                    }
                  </td>

                  {/* CUSTOMER */}

                  <td className="p-4">
                    {
                      booking.customer_name
                    }
                  </td>

                  {/* PHONE */}

                  <td className="p-4">
                    {booking.phone}
                  </td>

                  {/* SERVICE */}

                  <td className="p-4">
                    {
                      booking.service
                    }
                  </td>

                  {/* PRICE */}

                  <td className="p-4 text-green-400 font-bold">
                    ৳ {booking.price}
                  </td>

                  {/* STATUS */}

                  <td className="p-4">

                    {booking.status ===
                    "pending" ? (

                      <span className="text-yellow-400 font-bold">
                        Pending
                      </span>

                    ) : (

                      <span className="text-green-400 font-bold">
                        Approved ✅
                      </span>

                    )}

                  </td>

                  {/* ACTION */}

                  <td className="p-4">

                    <div className="flex items-center gap-3">

                      {booking.status ===
                      "pending" ? (

                        <button
                          onClick={() =>
                            handleApprove(
                              booking.id
                            )
                          }
                          className="px-5 py-2 rounded-xl bg-green-500 hover:bg-green-600 transition-all font-bold"
                        >
                          Approve
                        </button>

                      ) : (

                        <span className="text-cyan-400 font-bold">
                          Done
                        </span>

                      )}

                      {/* DELETE BUTTON */}

                      <button
                        onClick={() =>
                          handleDelete(
                            booking.id
                          )
                        }
                        className="p-2 rounded-xl bg-red-500 hover:bg-red-600 transition-all"
                      >

                        <Trash2
                          size={18}
                        />

                      </button>

                    </div>

                  </td>

                </tr>
              )
            )

          ) : (

            <tr>

              <td
                colSpan={7}
                className="text-center py-10 text-slate-400"
              >
                No Booking Found!
              </td>

            </tr>

          )}

        </tbody>

      </table>
    </div>
  );
}

