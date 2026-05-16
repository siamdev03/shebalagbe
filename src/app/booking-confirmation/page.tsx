"use client";

import Link from "next/link";

export default function BookingConfirmationPage() {

  return (

    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-blue-950 to-cyan-950 px-6">

      <div className="w-full max-w-2xl bg-white/10 border border-white/10 backdrop-blur-2xl rounded-[32px] p-10 text-center shadow-2xl">

        {/* ICON */}

        <div className="text-7xl mb-6">

          ✅

        </div>

        {/* TITLE */}

        <h1 className="text-5xl font-extrabold text-white leading-tight">

          বুকিং সফল হয়েছে 🎉

        </h1>

        {/* DESCRIPTION */}

        <p className="text-slate-300 text-lg mt-5 leading-relaxed">

          আপনার বুকিং সফলভাবে গ্রহণ করা হয়েছে।

          খুব দ্রুত আমাদের টিম আপনার সাথে যোগাযোগ করবে।

        </p>

        {/* INFO BOX */}

        <div className="mt-8 bg-white/5 border border-white/10 rounded-2xl p-6 text-left">

          <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">

            <span className="text-slate-400">

              স্ট্যাটাস

            </span>

            <span className="text-yellow-400 font-bold">

              Pending

            </span>

          </div>

          <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">

            <span className="text-slate-400">

              সার্ভিস

            </span>

            <span className="text-white font-semibold">

              Home Service

            </span>

          </div>

          <div className="flex items-center justify-between">

            <span className="text-slate-400">

              সাপোর্ট

            </span>

            <span className="text-cyan-400 font-semibold">

              ২৪/৭ Available

            </span>

          </div>

        </div>

        {/* BUTTONS */}

        <div className="mt-10 flex flex-col md:flex-row gap-4">

          {/* HOME */}

          <Link
            href="/"
            className="flex-1 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold text-lg hover:scale-[1.02] transition-all duration-300"
          >

            হোমে ফিরে যান

          </Link>

          {/* DASHBOARD */}

          <Link
            href="/admin"
            className="flex-1 py-4 rounded-2xl bg-white/10 border border-white/10 text-white font-bold text-lg hover:bg-white/20 transition-all duration-300"
          >

            Admin Dashboard

          </Link>

        </div>

      </div>

    </main>

  );

}