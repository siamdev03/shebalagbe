"use client";

import {
  useState,
} from "react";

import toast from "react-hot-toast";

import { supabase } from "@/lib/supabase";

export default function EmergencyForm() {

  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] =
    useState({

      full_name: "",
      phone: "",
      service: "",
      address: "",
      message: "",

    });

  /* EMERGENCY BOOKING SUBMIT */

  async function handleEmergencyBooking(
    e: React.FormEvent
  ) {

    e.preventDefault();

    setLoading(true);

    const { error } =
      await supabase
        .from("bookings")
        .insert([{

          booking_id:
            `EM-${Date.now()}`,

          customer_name:
            formData.full_name,

          phone:
            formData.phone,

          service:
            formData.service,

          address:
            formData.address,

          problem:
            formData.message,

          status:
            "pending",

          price: 0,

          booking_type:
            "emergency",

        }]);

    if (error) {

      console.log(error);

      toast.error(
        "কিছু সমস্যা হয়েছে!"
      );

      setLoading(false);

      return;
    }

    /* SUCCESS TOAST */

    toast.success(
      "জরুরি বুকিং সফলভাবে সাবমিট হয়েছে 🚨"
    );

    /* OWNER WHATSAPP NUMBER */

    const ownerNumber =
      "8801341987864";

    /* WHATSAPP MESSAGE */

    const whatsappMessage =
      `🚨 নতুন জরুরি বুকিং এসেছে!

👤 নাম: ${formData.full_name}

📞 মোবাইল: ${formData.phone}

🛠 সার্ভিস: ${formData.service}

📍 ঠিকানা: ${formData.address}

📝 সমস্যা:
${formData.message}`;

    /* OPEN WHATSAPP */

    window.open(

      `https://wa.me/${ownerNumber}?text=${encodeURIComponent(
        whatsappMessage
      )}`,

      "_blank"

    );

    /* RESET FORM */

    setFormData({

      full_name: "",
      phone: "",
      service: "",
      address: "",
      message: "",

    });

    setLoading(false);
  }

  return (

    <form
      onSubmit={
        handleEmergencyBooking
      }
      className="bg-white p-8 rounded-3xl shadow-2xl border border-red-100 space-y-5"
    >

      {/* TITLE */}

      <div>

        <h3 className="text-3xl font-bold text-slate-900">

          জরুরি সার্ভিস বুকিং 🚨

        </h3>

        <p className="mt-2 text-slate-500 leading-7">

          ৩০ মিনিটের মধ্যে আমাদের টিম আপনার সাথে যোগাযোগ করবে।

        </p>

      </div>

      {/* NAME */}

      <input
        type="text"
        placeholder="আপনার নাম"
        required
        value={formData.full_name}
        onChange={(e) =>
          setFormData({
            ...formData,
            full_name: e.target.value,
          })
        }
        className="w-full border border-slate-200 rounded-2xl p-4 outline-none focus:border-red-500 transition"
      />

      {/* PHONE */}

      <input
        type="text"
        placeholder="মোবাইল নাম্বার"
        required
        value={formData.phone}
        onChange={(e) =>
          setFormData({
            ...formData,
            phone: e.target.value,
          })
        }
        className="w-full border border-slate-200 rounded-2xl p-4 outline-none focus:border-red-500 transition"
      />

      {/* SERVICE */}

      <input
        type="text"
        placeholder="কোন সার্ভিস প্রয়োজন?"
        required
        value={formData.service}
        onChange={(e) =>
          setFormData({
            ...formData,
            service: e.target.value,
          })
        }
        className="w-full border border-slate-200 rounded-2xl p-4 outline-none focus:border-red-500 transition"
      />

      {/* ADDRESS */}

      <input
        type="text"
        placeholder="আপনার ঠিকানা"
        required
        value={formData.address}
        onChange={(e) =>
          setFormData({
            ...formData,
            address: e.target.value,
          })
        }
        className="w-full border border-slate-200 rounded-2xl p-4 outline-none focus:border-red-500 transition"
      />

      {/* MESSAGE */}

      <textarea
        placeholder="সমস্যার বিস্তারিত লিখুন"
        value={formData.message}
        onChange={(e) =>
          setFormData({
            ...formData,
            message: e.target.value,
          })
        }
        className="w-full border border-slate-200 rounded-2xl p-4 h-[130px] outline-none focus:border-red-500 transition"
      />

      {/* BUTTON */}

      <button
        type="submit"
        disabled={loading}
        className="w-full py-4 rounded-2xl bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold text-lg shadow-lg hover:scale-[1.02] transition-all duration-300 disabled:opacity-70"
      >

        {loading
          ? "সাবমিট হচ্ছে..."
          : "জরুরি সার্ভিস বুক করুন"}

      </button>

    </form>

  );
}