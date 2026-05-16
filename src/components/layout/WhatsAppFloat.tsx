"use client";

import Link from "next/link";
import { MessageCircle } from "lucide-react";

export default function WhatsAppFloat() {

  const phone =
    "8801341987864";

  const message =
    "Assalamualaikum, আমি সেবা সম্পর্কে জানতে চাই।";

  const whatsappUrl =
    `https://wa.me/${phone}?text=${encodeURIComponent(
      message
    )}`;

  return (

    <Link
      href={whatsappUrl}
      target="_blank"
      className="fixed bottom-6 right-6 z-[9999] group"
    >

      {/* GLOW EFFECT */}
      <div className="absolute inset-0 rounded-full bg-green-500 blur-2xl opacity-40 group-hover:opacity-70 transition-all duration-500 animate-pulse" />

      {/* BUTTON */}
      <div className="relative flex items-center gap-3 bg-green-500 hover:bg-green-400 text-white px-6 py-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110">

        {/* ICON */}
        <MessageCircle
          size={28}
          className="fill-white"
        />

        {/* LABEL */}
        <span className="hidden md:block font-semibold text-lg">

          WhatsApp

        </span>

      </div>

    </Link>

  );
}