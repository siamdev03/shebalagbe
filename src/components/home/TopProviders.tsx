"use client";

import { useEffect, useState } from "react";

import Image from "next/image";

import BookingModal from "@/components/booking/BookingModal";

import {
  BadgeCheck,
  MapPin,
  Star,
  ShieldCheck,
  Zap,
  Award,
} from "lucide-react";

import { supabase } from "@/lib/supabase";

type Provider = {
  id: string;
  name: string;
  service: string;
  city: string;
  rating: number;
  jobs_completed: number;
  image: string;
  whatsapp: string;

  /* NEW */
  is_verified: boolean;
  top_rated: boolean;
  fast_response: boolean;
  experience_years: number;

  is_active: boolean;
};

export default function TopProviders() {

  const [data, setData] =
    useState<any>(null);

  const [providers, setProviders] =
    useState<Provider[]>([]);

  /* BOOKING MODAL */
  const [openBooking, setOpenBooking] =
    useState(false);

  const [selectedService, setSelectedService] =
    useState<any>(null);

  /* FETCH SECTION */
  useEffect(() => {

    const fetchSection = async () => {

      const { data, error } =
        await supabase
          .from("homepage_sections")
          .select("*")
          .eq(
            "section_key",
            "top_providers"
          )
          .maybeSingle();

      if (error) {

        console.log(error);
        return;

      }

      setData(data);

    };

    fetchSection();

  }, []);

  /* FETCH PROVIDERS */
  useEffect(() => {

    const fetchProviders =
      async () => {

        const { data, error } =
          await supabase
            .from(
              "service_providers"
            )
            .select("*")
            .eq("is_active", true);

        if (error) {

          console.log(error);
          return;

        }

        setProviders(data || []);

      };

    fetchProviders();

  }, []);

  return (

    <>

      <section
        id="providers"
        className="relative py-24 overflow-hidden"
      >

        {/* BACKGROUND */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('/providers-bg.jpg')",
          }}
        />

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-slate-950/80" />

        {/* GRADIENT */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/70 via-slate-950/60 to-cyan-950/60" />

        {/* GLOW */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-500/10 blur-3xl rounded-full" />

        {/* CONTENT */}
        <div className="relative z-10 max-w-7xl mx-auto px-6">

          {/* BADGE */}
          <div className="flex justify-center">

            <div className="px-5 py-2 rounded-full bg-blue-500/10 border border-blue-400/20 backdrop-blur-md text-blue-300 font-semibold">

              {data?.title ||
                "সেরা প্রোভাইডারদের খুঁজুন"}

            </div>

          </div>

          {/* TITLE */}
          <h2 className="text-white text-center mt-8">

            বিশ্বস্ত সার্ভিস <br />

            <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">

              প্রোভাইডার

            </span>

          </h2>

          {/* SUBTITLE */}
          <p className="card-description text-center mt-6 max-w-3xl mx-auto">

            {data?.subtitle ||
              "যাচাইকৃত এবং অভিজ্ঞ সার্ভিস প্রোভাইডারদের সাথে সহজেই যোগাযোগ করুন।"}

          </p>

          {/* GRID */}
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7">

            {providers.map(
              (provider) => (

                <div
                  key={provider.id}
                  className="
                    bg-white/10
                    backdrop-blur-xl
                    rounded-3xl
                    overflow-hidden
                    border
                    border-white/10
                    hover:border-blue-400/30
                    shadow-xl
                    hover:shadow-blue-500/20
                    transition-all
                    duration-500
                    hover:-translate-y-3
                    group
                  "
                >

                  {/* IMAGE */}
                  <div className="relative h-[240px] overflow-hidden">

                    <Image
                      src={provider.image}
                      alt={provider.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-all duration-700"
                    />

                    {/* DARK OVERLAY */}
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-all duration-500" />

                    {/* VERIFIED ICON */}
                    {provider.is_verified && (

                      <div className="absolute top-4 right-4 bg-white/90 shadow-xl rounded-full p-2">

                        <BadgeCheck
                          size={20}
                          className="text-blue-600"
                        />

                      </div>

                    )}

                  </div>

                  {/* CONTENT */}
                  <div className="p-6">

                    {/* NAME */}
                    <h3 className="card-title text-white">

                      {provider.name}

                    </h3>

                    {/* SERVICE */}
                    <p className="card-description mt-2 text-blue-300">

                      {provider.service}

                    </p>

                    {/* BADGES */}
                    <div className="mt-4 flex flex-wrap gap-2">

                      {/* VERIFIED */}
                      {provider.is_verified && (

                        <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-green-500/10 border border-green-400/20 text-green-300 text-xs font-semibold">

                          <ShieldCheck size={14} />

                          Verified

                        </div>

                      )}

                      {/* TOP RATED */}
                      {provider.top_rated && (

                        <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-400/20 text-yellow-300 text-xs font-semibold">

                          <Award size={14} />

                          Top Rated

                        </div>

                      )}

                      {/* FAST RESPONSE */}
                      {provider.fast_response && (

                        <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-cyan-300 text-xs font-semibold">

                          <Zap size={14} />

                          Fast Response

                        </div>

                      )}

                    </div>

                    {/* EXPERIENCE */}
                    <div className="mt-4 text-sm text-slate-300">

                      {provider.experience_years}+ বছরের অভিজ্ঞতা

                    </div>

                    {/* RATING */}
                    <div className="mt-4 flex items-center gap-2 text-slate-300">

                      <Star
                        size={16}
                        className="text-yellow-400 fill-yellow-400"
                      />

                      <span className="font-semibold">

                        {provider.rating}

                      </span>

                      <span className="text-sm">

                        ({provider.jobs_completed}+ কাজ সম্পন্ন)

                      </span>

                    </div>

                    {/* LOCATION */}
                    <div className="mt-3 flex items-center gap-2 text-slate-400 text-sm">

                      <MapPin size={16} />

                      <span>

                        {provider.city}

                      </span>

                    </div>

                    {/* BUTTON */}
                    <button
                      onClick={() => {

                        setSelectedService({
                          name:
                            provider.service,
                        });

                        setOpenBooking(true);

                      }}
                      className="
                        mt-6
                        inline-flex
                        items-center
                        justify-center
                        w-full
                        px-5
                        py-3
                        rounded-2xl
                        bg-gradient-to-r
                        from-blue-600
                        to-cyan-500
                        text-white
                        font-semibold
                        hover:scale-105
                        transition-all
                        duration-300
                        shadow-xl
                      "
                    >

                      এখনই বুক করুন

                    </button>

                  </div>

                </div>

              )
            )}

          </div>

        </div>

      </section>

      {/* BOOKING MODAL */}
      <BookingModal
        isOpen={openBooking}
        onClose={() =>
          setOpenBooking(false)
        }
        service={selectedService}
      />

    </>

  );

}