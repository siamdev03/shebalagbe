"use client";

import { useEffect, useState } from "react";

import {
  Search,
  UserCheck,
  CalendarCheck,
} from "lucide-react";

import { supabase } from "@/lib/supabase";

/* ICON MAP */
const iconMap: any = {
  Search,
  UserCheck,
  CalendarCheck,
};

export default function HowItWorks() {

  const [steps, setSteps] =
    useState<any[]>([]);

  useEffect(() => {

    const fetchSteps =
      async () => {

        const { data, error } =
          await supabase
            .from("how_it_works")
            .select("*")
            .order(
              "step_number",
              { ascending: true }
            );

        if (!error && data) {

          setSteps(data);

        }

      };

    fetchSteps();

  }, []);

  return (

    <section
      id="how-it-works"
      className="relative py-24 overflow-hidden"
    >

      {/* BG */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950" />

      {/* GLOW */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-cyan-500/10 blur-[120px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">

        {/* TOP BADGE */}
        <div className="flex justify-center">

          <div className="px-5 py-2 rounded-full bg-blue-500/10 border border-blue-400/20 text-cyan-300 text-sm font-medium">

            সহজ বুকিং প্রক্রিয়া

          </div>

        </div>

        {/* TITLE */}
        <div className="text-center mt-8">

          <h2 className="text-white leading-tight">

            কিভাবে

            <span className="block text-cyan-400">

              কাজ করে

            </span>

          </h2>

          <p className="card-description mt-6 max-w-3xl mx-auto">

            মাত্র কয়েকটি সহজ ধাপে আপনার প্রয়োজনীয় সার্ভিস বুক করুন।

          </p>

        </div>

        {/* CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 mt-16">

          {steps.map((step) => {

            const Icon =
              iconMap[step.icon] || Search;

            return (

              <div
                key={step.id}
                className="
                  group
                  relative
                  overflow-hidden
                  bg-white/10
                  backdrop-blur-2xl
                  border
                  border-white/10
                  rounded-[28px]
                  p-8
                  hover:border-cyan-400/30
                  transition-all
                  duration-500
                  hover:-translate-y-2
                  hover:shadow-[0_20px_80px_rgba(0,255,255,0.12)]
                "
              >

                {/* STEP NUMBER */}
                <div className="absolute top-5 right-6 text-6xl font-black text-white/5">

                  {step.step_number}

                </div>

                {/* ICON */}
                <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center shadow-2xl">

                  <Icon
                    size={34}
                    className="text-white"
                  />

                </div>

                {/* TITLE */}
                <h3 className="card-title text-white mt-8 leading-snug">

                  {step.title}

                </h3>

                {/* DESCRIPTION */}
                <p className="card-description mt-5">

                  {step.description}

                </p>

              </div>

            );

          })}

        </div>

      </div>

    </section>

  );

}