"use client";

import Link from "next/link";

import {
  useEffect,
  useState,
} from "react";

import {

  Wrench,
  AirVent,
  Sparkles,
  Pipette,
  Paintbrush,
  Car,
  Laptop,
  MonitorCog,
  Cpu,
  Smartphone,
  Camera,
  Wifi,
  Refrigerator,
  Tv,
  Zap,
  Truck,
  Sofa,
  Hammer,

} from "lucide-react";

import { supabase } from "@/lib/supabase";

const iconMap: any = {

  Wrench,
  AirVent,
  Sparkles,
  Pipette,
  Paintbrush,
  Car,
  Laptop,
  MonitorCog,
  Cpu,
  Smartphone,
  Camera,
  Wifi,
  Refrigerator,
  Tv,
  Zap,
  Truck,
  Sofa,
  Hammer,

};

type Props = {

  searchTerm?: string;

};

export default function PopularServices({

  searchTerm = "",

}: Props) {

  const [services, setServices] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    const fetchServices =
      async () => {

        const { data, error } =
          await supabase
            .from("services")
            .select("*");

        if (!error && data) {

          setServices(data);

        }

        setLoading(false);

      };

    fetchServices();

  }, []);

  /* FILTER SERVICES */

  const filteredServices =
    services.filter((service) => {

      const search =
        (searchTerm || "")
          .toLowerCase();

      return (

        service.name
          ?.toLowerCase()
          .includes(search)

        ||

        service.description
          ?.toLowerCase()
          .includes(search)

        ||

        service.slug
          ?.toLowerCase()
          .includes(search)

      );

    });

  return (

    <section
      id="popular-services"
      className="relative py-24 overflow-hidden"
    >

      {/* BACKGROUND IMAGE */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('/services-bg.jpg')",
        }}
      />

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-slate-950/80" />

      {/* BLUE GRADIENT */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-950/60 via-slate-900/40 to-cyan-900/50" />

      {/* LIGHT EFFECT */}
      <div className="absolute top-0 left-0 w-full h-40 bg-blue-500/10 blur-3xl" />

      {/* CONTENT */}
      <div className="relative z-10 max-w-7xl mx-auto px-6">

        {/* SECTION TITLE */}
        <div className="mb-14">

          <h2 className="text-white">

            জনপ্রিয় সার্ভিসসমূহ

          </h2>

          <p className="card-description mt-6 max-w-4xl">

            আপনার প্রয়োজনীয় দৈনন্দিন সার্ভিসগুলো সহজেই খুঁজুন
            এবং বিশ্বস্ত প্রোভাইডারের সাথে যোগাযোগ করুন।

          </p>

        </div>

        {/* SEARCH RESULT TITLE */}
        {searchTerm && (

          <div className="mb-10">

            <h3 className="text-2xl text-blue-300 font-bold">

              "{searchTerm}" এর জন্য সার্ভিস

            </h3>

          </div>

        )}

        {/* LOADING */}
        {loading && (

          <p className="card-description">

            Loading Services...

          </p>

        )}

        {/* NO RESULT */}
        {!loading &&
          filteredServices.length === 0 &&
          searchTerm && (

          <div className="text-red-400 text-xl font-semibold">

            কোনো সার্ভিস পাওয়া যায়নি।

          </div>

        )}

        {/* SERVICES GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

          {(searchTerm
            ? filteredServices
            : services
          ).map((service) => {

            const Icon =
              iconMap[
                service.icon
              ] || Wrench;

            return (

              <div
                id={service.slug}
                key={service.id}
                className="
                  group
                  bg-white/10
                  backdrop-blur-xl
                  rounded-3xl
                  p-7
                  border
                  border-white/10
                  hover:border-blue-400/40
                  hover:shadow-2xl
                  hover:-translate-y-2
                  transition-all
                  duration-300
                  cursor-pointer
                "
              >

                {/* ICON */}
                <div className="w-16 h-16 rounded-2xl bg-blue-500/20 flex items-center justify-center mb-5 group-hover:bg-blue-500 transition-all duration-300">

                  <Icon
                    size={30}
                    className="text-blue-300 group-hover:text-white transition-all duration-300"
                  />

                </div>

                {/* NAME */}
                <h3 className="card-title text-white">

                  {service.name}

                </h3>

                {/* DESCRIPTION */}
                <p className="card-description mt-3">

                  {service.description}

                </p>

                {/* BUTTON */}
                <Link
                  href={`/services/${service.slug}`}
                >

                  <button
                    className="
                      mt-5
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

                    বিস্তারিত দেখুন

                  </button>

                </Link>

              </div>

            );

          })}

        </div>

      </div>

    </section>

  );

}