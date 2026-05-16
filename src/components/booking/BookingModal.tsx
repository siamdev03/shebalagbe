"use client";

import { useState } from "react";

import { X } from "lucide-react";

import { toast } from "sonner";

import { supabase } from "@/lib/supabase";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  service: any;

  selectedPackage?: {
    name: string;
    price: number;
    priceLabel: string;
  };
};

export default function BookingModal({
  isOpen,
  onClose,
  service,
  selectedPackage,
}: Props) {

  const [loading, setLoading] =
    useState(false);

  /* CUSTOM PRICE */

  const [customPrice, setCustomPrice] =
    useState("");

  const [formData, setFormData] =
    useState({
      customer_name: "",
      phone: "",
      address: "",
      service_type: "",
      message: "",
    });

  if (!isOpen) return null;

  const handleBooking = async () => {

    if (
      !formData.customer_name ||
      !formData.phone ||
      !formData.address
    ) {

      toast.error(
        "সব তথ্য পূরণ করুন"
      );

      return;

    }

    /* PRICE VALIDATION */

    if (!customPrice) {

      toast.error(
        "মূল্য লিখুন"
      );

      return;

    }

    try {

      setLoading(true);

      /* BOOKING OBJECT */

      const bookingData = {

        booking_id:
          `BK-${Date.now()}`,

        customer_name:
          formData.customer_name,

        email:
          "customer@gmail.com",

        phone:
          formData.phone,

        address:
          formData.address,

        service:
          selectedPackage?.name ||
          service?.name,

        /* CUSTOM NEGOTIABLE PRICE */

        price:
          Number(customPrice) || 0,

        status:
          "pending",

        provider_name:
          "Assigned Soon",

        provider_phone:
          "01700000000",

        message:
          formData.message,

      };

      console.log(
        "FINAL BOOKING:",
        bookingData
      );

      /* INSERT INTO DB */

      const { error } =
        await supabase
          .from("bookings")
          .insert([
            bookingData,
          ]);

      if (error) {

        console.log(
          "SUPABASE ERROR:",
          error
        );

        toast.error(
          "Booking Failed ❌"
        );

        return;

      }

      /* SUCCESS */

      toast.success(
        "বুকিং সফল হয়েছে ✅"
      );

      /* WHATSAPP */

      const ownerNumber =
        "8801341987864";

      const whatsappMessage =
`নতুন Booking এসেছে 🚀

Service:
${selectedPackage?.name || service?.name}

Price:
৳${customPrice}

Customer:
${formData.customer_name}

Phone:
${formData.phone}

Address:
${formData.address}

Message:
${formData.message}`;

      const whatsappUrl =
`https://wa.me/${ownerNumber}?text=${encodeURIComponent(
  whatsappMessage
)}`;

      window.open(
        whatsappUrl,
        "_blank"
      );

      /* RESET */

      setFormData({
        customer_name: "",
        phone: "",
        address: "",
        service_type: "",
        message: "",
      });

      setCustomPrice("");

      onClose();

    } catch (err) {

      console.log(err);

      toast.error(
        "Something went wrong ❌"
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="fixed inset-0 z-[9999] bg-black/70 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">

      <div className="relative w-full max-w-2xl rounded-[32px] overflow-y-auto max-h-[90vh] bg-gradient-to-br from-[#071133] via-[#071133] to-[#08142f] border border-white/10 shadow-2xl scrollbar-thin scrollbar-thumb-cyan-500 scrollbar-track-transparent">

        {/* CLOSE BUTTON */}

        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 transition-all flex items-center justify-center z-50"
        >

          <X
            size={22}
            className="text-white"
          />

        </button>

        {/* CONTENT */}

        <div className="p-6 md:p-10">

          {/* TITLE */}

          <h2 className="text-white text-4xl font-bold">

            সার্ভিস বুকিং

          </h2>

          <p className="card-description mt-4">

            {selectedPackage?.name ||
              service?.name} বুক করতে নিচের তথ্য দিন

          </p>

          {/* CUSTOM PRICE */}

          <div className="mt-6">

            <label className="block text-cyan-300 font-semibold mb-3">

              আপনার বাজেট / মূল্য 💰

            </label>

            <input
              type="number"
              placeholder="যেমন: 500 / 1200 / 3000"
              value={customPrice}
              onChange={(e) =>
                setCustomPrice(
                  e.target.value
                )
              }
              className="w-full rounded-2xl border border-cyan-500/30 bg-[#091242] text-white px-5 py-4 outline-none focus:border-cyan-400"
            />

            <p className="text-sm text-slate-400 mt-2">

              আপনি আপনার সুবিধামত বাজেট দিতে পারবেন

            </p>

          </div>

          {/* FORM */}

          <div className="mt-8 space-y-5">

            {/* NAME */}

            <input
              type="text"
              placeholder="আপনার নাম"
              value={
                formData.customer_name
              }
              onChange={(e) =>
                setFormData({
                  ...formData,
                  customer_name:
                    e.target.value,
                })
              }
              className="hero-input w-full h-14 rounded-2xl px-5 bg-slate-200 text-slate-900 placeholder:text-slate-500 border-2 border-transparent focus:border-cyan-400 focus:bg-white transition-all duration-300 outline-none"
            />

            {/* PHONE */}

            <input
              type="text"
              placeholder="মোবাইল নাম্বার"
              value={formData.phone}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  phone:
                    e.target.value,
                })
              }
              className="hero-input w-full h-14 rounded-2xl px-5 bg-slate-200 text-slate-900 placeholder:text-slate-500 border-2 border-transparent focus:border-cyan-400 focus:bg-white transition-all duration-300 outline-none"
            />

            {/* ADDRESS */}

            <input
              type="text"
              placeholder="ঠিকানা"
              value={
                formData.address
              }
              onChange={(e) =>
                setFormData({
                  ...formData,
                  address:
                    e.target.value,
                })
              }
              className="hero-input w-full h-14 rounded-2xl px-5 bg-slate-200 text-slate-900 placeholder:text-slate-500 border-2 border-transparent focus:border-cyan-400 focus:bg-white transition-all duration-300 outline-none"
            />

            {/* MESSAGE */}

            <textarea
              placeholder="অতিরিক্ত তথ্য লিখুন..."
              value={
                formData.message
              }
              onChange={(e) =>
                setFormData({
                  ...formData,
                  message:
                    e.target.value,
                })
              }
              rows={4}
              className="hero-input w-full rounded-2xl p-5 bg-slate-900/60 border-2 border-white/10 text-white placeholder:text-slate-500 focus:border-cyan-400 transition-all duration-300 outline-none"
            />

            {/* BUTTON */}

            <button
              onClick={
                handleBooking
              }
              disabled={loading}
              className="w-full h-14 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold hover:scale-[1.02] transition-all duration-300 shadow-2xl disabled:opacity-60"
            >

              {loading
                ? "Booking হচ্ছে..."
                : "এখনই বুক করুন"}

            </button>

          </div>

        </div>

      </div>

    </div>

  );

}