"use client";

import {
  Home,
  BriefcaseBusiness,
  Layers3,
  Users,
  Star,
} from "lucide-react";

const items = [
  {
    id: "home",
    label: "হোম",
    icon: Home,
  },

  {
    id: "services",
    label: "সার্ভিস",
    icon: BriefcaseBusiness,
  },

  {
    id: "how-it-works",
    label: "কিভাবে কাজ করে",
    icon: Layers3,
  },

  {
    id: "top-providers",
    label: "প্রোভাইডার",
    icon: Users,
  },

  {
    id: "testimonials",
    label: "রিভিউ",
    icon: Star,
  },
];

export default function FloatingSidebar() {

  const scrollToSection = (
    id: string
  ) => {

    const section =
      document.getElementById(id);

    if (section) {

      section.scrollIntoView({
        behavior: "smooth",
      });

    }
  };

  return (

    <div className="hidden lg:flex fixed right-6 top-1/2 -translate-y-1/2 z-[999] flex-col gap-5 animate-in fade-in slide-in-from-right-10 duration-700">

      {items.map((item, index) => {

        const Icon = item.icon;

        return (

          <button
            key={index}
            onClick={() =>
              scrollToSection(
                item.id
              )
            }
            className="group relative overflow-hidden flex items-center gap-4 px-5 py-4 rounded-2xl bg-white/10 backdrop-blur-2xl border border-white/10 text-white shadow-[0_8px_40px_rgba(0,0,0,0.35)] transition-all duration-500 ease-out hover:scale-110 hover:border-cyan-400/50 hover:bg-cyan-400/10 hover:shadow-cyan-500/20"
          >

            {/* GLOW EFFECT */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-700 bg-gradient-to-r from-cyan-400/10 via-blue-500/10 to-transparent blur-2xl" />

            {/* ICON */}
            <Icon
              size={24}
              className="relative z-10 text-cyan-300 transition-all duration-500 group-hover:rotate-6 group-hover:scale-125"
            />

            {/* LABEL */}
            <span className="relative z-10 max-w-0 overflow-hidden group-hover:max-w-[200px] transition-all duration-500 ease-out whitespace-nowrap text-lg font-medium opacity-0 group-hover:opacity-100">

              {item.label}

            </span>

          </button>

        );
      })}

    </div>

  );
}