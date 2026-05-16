"use client";

import { useEffect, useState } from "react";

import Image from "next/image";

import {
  Quote,
  Star,
} from "lucide-react";

import { supabase } from "@/lib/supabase";

type Testimonial = {
  id: number;
  name: string;
  location: string;
  review: string;
  image: string;
  rating: number;
};

export default function Testimonials() {

  const [
    testimonials,
    setTestimonials,
  ] = useState<Testimonial[]>([]);

  /* FETCH TESTIMONIALS */
  useEffect(() => {

    const fetchTestimonials =
      async () => {

        const { data, error } =
          await supabase
            .from("testimonials")
            .select("*")
            .order("id", {
              ascending: true,
            });

        if (error) {

          console.log(error);
          return;

        }

        setTestimonials(data || []);

      };

    fetchTestimonials();

  }, []);

  return (

    <section
      id="reviews"
      className="relative py-24 overflow-hidden"
    >

      {/* BACKGROUND IMAGE */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('/testimonial-bg.jpg')",
        }}
      />

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-slate-950/85" />

      {/* GRADIENT */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-950/70 via-slate-950/60 to-cyan-950/60" />

      {/* GLOW EFFECT */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-500/10 blur-3xl rounded-full" />

      {/* CONTENT */}
      <div className="relative z-10 max-w-7xl mx-auto px-6">

        {/* HEADER */}
        <div className="text-center mb-16">

          {/* BADGE */}
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-blue-500/10 border border-blue-400/20 backdrop-blur-md text-blue-300 text-sm font-semibold mb-5">

            ❤️ গ্রাহকদের মতামত

          </div>

          {/* TITLE */}
          <h2 className="text-white leading-tight">

            আমাদের সম্পর্কে <br />

            <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">

              তারা যা বলছেন

            </span>

          </h2>

          {/* SUBTITLE */}
          <p className="card-description mt-6 max-w-3xl mx-auto">

            হাজারো সন্তুষ্ট গ্রাহকের বিশ্বস্ত
            সার্ভিস অভিজ্ঞতা দেখুন।

          </p>

        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7">

          {testimonials.map(
            (testimonial) => (

              <div
                key={testimonial.id}
                className="
                  relative
                  bg-white/10
                  backdrop-blur-xl
                  border
                  border-white/10
                  rounded-3xl
                  p-8
                  hover:border-blue-400/30
                  transition-all
                  duration-500
                  hover:-translate-y-2
                  shadow-2xl
                  overflow-hidden
                  group
                "
              >

                {/* QUOTE ICON */}
                <div className="absolute top-5 right-5 text-blue-400/10">

                  <Quote size={60} />

                </div>

                {/* USER */}
                <div className="flex items-center gap-4">

                  <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-blue-400/30">

                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />

                  </div>

                  <div>

                    <h3 className="card-title text-white">

                      {testimonial.name}

                    </h3>

                    <p className="card-description mt-1">

                      {testimonial.location}

                    </p>

                    {/* STARS */}
                    <div className="flex items-center gap-1 mt-2">

                      {Array.from({
                        length:
                          testimonial.rating,
                      }).map(
                        (_, index) => (

                          <Star
                            key={index}
                            size={16}
                            className="text-yellow-400 fill-yellow-400"
                          />

                        )
                      )}

                    </div>

                  </div>

                </div>

                {/* REVIEW */}
                <p className="card-description mt-6">

                  “{testimonial.review}”

                </p>

                {/* GLOW */}
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-blue-500/10 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500" />

              </div>

            )
          )}

        </div>

      </div>

    </section>

  );

}