"use client";

import { useState } from "react";

import { supabase } from "@/lib/supabase";

import toast from "react-hot-toast";

import AuthModal from "@/components/auth/AuthModal";

export default function BookingForm() {

  const [loading, setLoading] =
    useState(false);

  const [openAuth, setOpenAuth] =
    useState(false);

  const [formData, setFormData] =
    useState({

      customer_name: "",
      phone: "",
      service: "",
      address: "",

    });

  /* SERVICES */

  const services = [

  {
    name: "Laptop Repair",
    price: 1500,
  },

  {
    name: "Computer Service",
    price: 1200,
  },

  {
    name: "IT Support",
    price: 2000,
  },

  {
    name: "Ambulance Service",
    price: 2500,
  },

  {
    name: "House Shifting",
    price: 3000,
  },

  {
    name: "Interior Design",
    price: 5000,
  },

  {
    name: "Electric Service",
    price: 1000,
  },

  {
    name: "CCTV Setup",
    price: 4500,
  },

  {
    name: "Mobile Repair",
    price: 800,
  },

  {
    name: "Router Setup",
    price: 700,
  },

];
  /* LOGIN CHECK */

  async function handleBookingClick() {

    const {

      data: { user },

    } = await supabase.auth.getUser();

    if (!user) {

      setOpenAuth(true);

      toast.error(
        "বুকিং করতে আগে লগইন করুন 🔐"
      );

      return;

    }

    if (

      !formData.customer_name ||
      !formData.phone ||
      !formData.service ||
      !formData.address

    ) {

      toast.error(
        "সব তথ্য পূরণ করুন ❌"
      );

      return;

    }

    handleSubmit();

  }

  /* FINAL SUBMIT */

  async function handleSubmit() {

    setLoading(true);

    const {

      data: { user },

    } = await supabase.auth.getUser();

    if (!user) {

      toast.error(
        "লগইন করা হয়নি 🔐"
      );

      setLoading(false);

      return;

    }

    /* SELECTED SERVICE */

    const selectedService =
      services.find(
        (item) =>
          item.name ===
          formData.service
      );

    /* BOOKING ID */

    const bookingId =
      `BK-${Date.now()}`;

    /* FINAL BOOKING */

    const bookingData = {

      user_id: user.id,

      booking_id: bookingId,

      customer_name:
        formData.customer_name,

      email:
        user.email,

      phone:
        formData.phone,

      service:
        formData.service,

      address:
        formData.address,

      provider_name:
        "Assigned Soon",

      provider_phone:
        "01700000000",

      status:
        "pending",

      /* DYNAMIC PRICE */

      price:
        selectedService?.price || 0,

    };

    console.log(
      "FINAL BOOKING:",
      bookingData
    );

    /* INSERT DATABASE */

    const { data, error } =
      await supabase
        .from("bookings")
        .insert([bookingData])
        .select();

    console.log(
      "BOOKING DATA:",
      data
    );

    console.log(
      "BOOKING ERROR:",
      error
    );

    if (error) {

      console.log(error);

      toast.error(
        "বুকিং করা যায়নি ❌"
      );

      setLoading(false);

      return;

    }

    toast.success(
      "বুকিং সফল হয়েছে ✅"
    );

    /* RESET FORM */

    setFormData({

      customer_name: "",
      phone: "",
      service: "",
      address: "",

    });

    /* WHATSAPP MESSAGE */

    const whatsappMessage =
      `নতুন বুকিং ✅

বুকিং আইডি: ${bookingId}

নাম: ${formData.customer_name}

ফোন: ${formData.phone}

সার্ভিস: ${formData.service}

মূল্য: ৳${selectedService?.price || 0}

ঠিকানা: ${formData.address}`;

    /* OPEN WHATSAPP */

    window.open(

      `https://wa.me/8801341987864?text=${encodeURIComponent(
        whatsappMessage
      )}`,

      "_blank"

    );

    setLoading(false);

  }

  return (

    <>

      <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-8 space-y-5">

        <h2 className="text-3xl font-bold text-white">

          সার্ভিস বুকিং করুন 📦

        </h2>

        <p className="text-slate-300">

          সহজেই আপনার প্রয়োজনীয় সার্ভিস বুক করুন।

        </p>

        {/* NAME */}

        <input
          type="text"
          placeholder="আপনার নাম"
          value={formData.customer_name}
          onChange={(e) =>
            setFormData({

              ...formData,

              customer_name:
                e.target.value,

            })
          }
          className="w-full p-4 rounded-2xl bg-white/10 border border-white/10 text-white placeholder:text-slate-300 outline-none focus:border-cyan-400"
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
          className="w-full p-4 rounded-2xl bg-white/10 border border-white/10 text-white placeholder:text-slate-300 outline-none focus:border-cyan-400"
        />

        {/* SERVICE DROPDOWN */}

        <select
          value={formData.service}
          onChange={(e) =>
            setFormData({

              ...formData,

              service:
                e.target.value,

            })
          }
          className="w-full p-4 rounded-2xl bg-white/10 border border-white/10 text-white outline-none focus:border-cyan-400"
        >

          <option
            value=""
            className="bg-slate-900"
          >

            ✔ সার্ভিস নির্বাচন করুন

          </option>

          {services.map((item) => (

            <option
              key={item.name}
              value={item.name}
              className="bg-slate-900"
            >

              {item.name} — ৳{item.price}

            </option>

          ))}

        </select>

        {/* ADDRESS */}

        <textarea
          placeholder="আপনার ঠিকানা"
          value={formData.address}
          onChange={(e) =>
            setFormData({

              ...formData,

              address:
                e.target.value,

            })
          }
          className="w-full h-[120px] p-4 rounded-2xl bg-white/10 border border-white/10 text-white placeholder:text-slate-300 outline-none focus:border-cyan-400"
        />

        {/* BUTTON */}

        <button
          type="button"
          onClick={handleBookingClick}
          disabled={loading}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold text-lg hover:scale-[1.02] transition-all duration-300 disabled:opacity-50"
        >

          {loading
            ? "বুকিং হচ্ছে..."
            : "বুকিং করুন"}

        </button>

      </div>

      <AuthModal
        open={openAuth}
        onClose={() =>
          setOpenAuth(false)
        }
      />

    </>

  );

}