"use client";

import { useEffect, useState } from "react";

import { useParams } from "next/navigation";

import Link from "next/link";

import Image from "next/image";

import Navbar from "@/components/layout/Navbar";

import BookingModal from "@/components/booking/BookingModal";

import {
  Star,
  MapPin,
  BadgeCheck,
  Phone,
} from "lucide-react";

import { supabase } from "@/lib/supabase";

type Service = {
  id: string;
  name: string;
  slug: string;
  description: string;
  image?: string;
};

type Provider = {
  id: string;
  name: string;
  service: string;
  city: string;
  rating: number;
  jobs_completed: number;
  image: string;
  whatsapp: string;
  verified: boolean;
};

type PackageType = {
  name: string;
  price: number;
  priceLabel: string;
  features: string[];
};

export default function ServiceDetailsPage() {

  const params = useParams();

  const slug = params.slug as string;

  const [service, setService] =
    useState<Service | null>(null);

  const [providers, setProviders] =
    useState<Provider[]>([]);

  const [loading, setLoading] =
    useState(true);

  /* BOOKING MODAL STATE */
  const [openBooking, setOpenBooking] =
    useState(false);

  /* SELECTED PACKAGE */
  const [
    selectedPackage,
    setSelectedPackage,
  ] = useState<PackageType | null>(
    null
  );

  /* PACKAGES */

  const packages: PackageType[] = [

    {
      name: "Basic",
      price: 5000,
      priceLabel: "৳৫০০০",
      features: [
        "Verified Service",
        "দ্রুত সাপোর্ট",
        "Professional Provider",
        "Quality Assurance",
      ],
    },

    {
      name: "Standard",
      price: 10000,
      priceLabel: "৳১০,০০০",
      features: [
        "Verified Service",
        "দ্রুত সাপোর্ট",
        "Professional Provider",
        "Quality Assurance",
      ],
    },

    {
      name: "Premium",
      price: 25000,
      priceLabel: "৳২৫,০০০",
      features: [
        "Verified Service",
        "দ্রুত সাপোর্ট",
        "Professional Provider",
        "Quality Assurance",
      ],
    },

  ];

  /* OPEN BOOKING MODAL */

  function openBookingModal(
    pkg: PackageType
  ) {

    setSelectedPackage(pkg);

    setOpenBooking(true);

  }

  useEffect(() => {

    const fetchData = async () => {

      /* SERVICE FETCH */

      const { data: serviceData } =
        await supabase
          .from("services")
          .select("*")
          .eq("slug", slug)
          .single();

      if (serviceData) {

        setService(serviceData);

        /* PROVIDERS FETCH */

        const { data: providerData } =
          await supabase
            .from("service_providers")
            .select("*")
            .ilike(
              "service",
              `%${serviceData.name}%`
            );

        setProviders(providerData || []);

      }

      setLoading(false);

    };

    if (slug) {

      fetchData();

    }

  }, [slug]);

  /* LOADING */

  if (loading) {

    return (

      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center text-3xl font-bold">

        Loading...

      </div>

    );

  }

  /* NOT FOUND */

  if (!service) {

    return (

      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center text-3xl font-bold">

        Service Not Found

      </div>

    );

  }

  return (

    <main className="bg-slate-950 text-white">

      {/* NAVBAR */}

      <Navbar />

      {/* HERO SECTION */}

      <section className="relative py-32 overflow-hidden">

        {/* BG IMAGE */}

        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              `url(${service.image})`,
          }}
        />

        {/* OVERLAY */}

        <div className="absolute inset-0 bg-slate-950/80" />

        {/* GRADIENT */}

        <div className="absolute inset-0 bg-gradient-to-r from-blue-950/70 via-slate-950/60 to-cyan-950/60" />

        {/* CONTENT */}

        <div className="relative z-10 max-w-7xl mx-auto px-6">

          {/* BACK BUTTON */}

          <Link
            href="/"
            className="inline-flex items-center gap-3 text-blue-300 hover:text-white transition-all duration-300 text-lg font-medium"
          >

            ← হোমে ফিরে যান

          </Link>

          {/* TITLE */}

          <h1 className="mt-6 text-5xl md:text-7xl font-extrabold leading-tight">

            {service.name}

          </h1>

          {/* DESCRIPTION */}

          <p className="mt-8 text-xl text-slate-300 leading-relaxed max-w-4xl">

            {service.description}

          </p>

        </div>

      </section>

      {/* PRICING SECTION */}

      <section className="py-24">

        <div className="max-w-7xl mx-auto px-6">

          {/* HEADER */}

          <div className="text-center mb-16">

            <h2 className="text-5xl font-extrabold">

              সার্ভিস প্যাকেজ

            </h2>

            <p className="mt-5 text-slate-400 text-xl">

              আপনার প্রয়োজন অনুযায়ী প্যাকেজ নির্বাচন করুন

            </p>

          </div>

          {/* PACKAGES */}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            {packages.map((pkg, index) => (

              <div
                key={index}
                className="bg-white/5 border border-white/10 rounded-3xl p-10 backdrop-blur-xl hover:border-blue-400/40 transition-all"
              >

                <h3 className="text-3xl font-bold">

                  {pkg.name}

                </h3>

                <h4 className="mt-6 text-5xl font-extrabold text-blue-400">

                  {pkg.priceLabel}

                </h4>

                <ul className="mt-8 space-y-4 text-slate-300">

                  {pkg.features.map(
                    (
                      feature,
                      i
                    ) => (

                      <li key={i}>

                        ✔ {feature}

                      </li>

                    )
                  )}

                </ul>

                {/* BOOK BUTTON */}

                <button
                  onClick={() =>
                    openBookingModal(pkg)
                  }
                  className="mt-10 w-full py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 font-bold text-lg hover:scale-105 transition-all duration-300"
                >

                  এখনই বুক করুন

                </button>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* PROVIDERS SECTION */}

      <section className="py-24 bg-white/5">

        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center mb-20">

            <h2 className="text-5xl font-extrabold">

              সেরা প্রোভাইডারগণ

            </h2>

          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

            {providers.map((provider) => (

              <div
                key={provider.id}
                className="bg-slate-900 rounded-3xl overflow-hidden border border-white/10 hover:border-blue-400/40 transition-all hover:-translate-y-2"
              >

                <div className="relative h-[260px]">

                  <Image
                    src={provider.image}
                    alt={provider.name}
                    fill
                    className="object-cover"
                  />

                  {provider.verified && (

                    <div className="absolute top-4 right-4 bg-white rounded-full p-2">

                      <BadgeCheck
                        className="text-blue-600"
                        size={22}
                      />

                    </div>

                  )}

                </div>

                <div className="p-6">

                  <h3 className="text-2xl font-bold">

                    {provider.name}

                  </h3>

                  <p className="mt-2 text-blue-400">

                    {provider.service}

                  </p>

                  <div className="mt-4 flex items-center gap-2">

                    <Star
                      size={18}
                      className="text-yellow-400 fill-yellow-400"
                    />

                    <span>

                      {provider.rating}

                    </span>

                  </div>

                  <div className="mt-3 flex items-center gap-2 text-slate-400">

                    <MapPin size={18} />

                    {provider.city}

                  </div>

                  <a
                    href={`https://wa.me/${provider.whatsapp}`}
                    target="_blank"
                    className="mt-6 flex items-center justify-center gap-2 w-full py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 font-semibold"
                  >

                    <Phone size={18} />

                    যোগাযোগ করুন

                  </a>

                </div>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* BOOKING MODAL */}

      <BookingModal
        {...({
          isOpen: openBooking,
          onClose: () => setOpenBooking(false),
          service: service,
          selectedPackage: selectedPackage
        } as any)}
      />

    </main>

  );

}