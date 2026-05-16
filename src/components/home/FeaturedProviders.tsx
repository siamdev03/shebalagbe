"use client";

import Link from "next/link";
import Image from "next/image";

import {
  useEffect,
  useState,
} from "react";

import {
  Briefcase,
  ArrowRight,
} from "lucide-react";

import { supabase } from "@/lib/supabase";

type ProviderType = {
  id: string;
  name: string;
  slug: string;
  title: string;
  image: string;
  experience: string;
  completed_jobs: number;
  availability: string;
};

export default function FeaturedProviders() {

  const [providers, setProviders] =
    useState<ProviderType[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    fetchProviders();

  }, []);

  async function fetchProviders() {

    const { data, error } =
      await supabase
        .from("providers")
        .select("*")
        .limit(6);

    if (!error && data) {

      setProviders(data);
    }

    setLoading(false);
  }

  if (loading) {

    return (

      <section className="py-24 bg-slate-50">

        <div className="max-w-7xl mx-auto px-4 text-center">

          <h2 className="text-3xl font-bold">

            Loading Providers...

          </h2>

        </div>

      </section>

    );
  }

  return (

    <section className="py-24 bg-slate-50">

      <div className="max-w-7xl mx-auto px-4">

        {/* HEADING */}
        <div className="text-center mb-16">

          <span className="inline-flex items-center px-5 py-2 rounded-full bg-blue-100 text-blue-700 font-semibold text-sm">

            Verified Professionals

          </span>

          <h2 className="mt-6 text-4xl md:text-5xl font-extrabold text-slate-900">

            Top Service Providers 👨‍🔧

          </h2>

          <p className="mt-5 max-w-2xl mx-auto text-slate-600 text-lg leading-8">

            Experienced and trusted service
            providers ready to help you anytime.

          </p>

        </div>

        {/* GRID */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">

          {providers.map((provider) => (

            <div
              key={provider.id}
              className="group bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-2xl transition-all duration-300"
            >

              {/* IMAGE */}
              <div className="relative overflow-hidden">

                <Image
                  src={provider.image}
                  alt={provider.name}
                  width={500}
                  height={400}
                  className="w-full h-[280px] object-cover group-hover:scale-105 transition duration-500"
                />

                {/* AVAILABILITY */}
                <div className="absolute top-4 left-4 px-4 py-2 rounded-full bg-green-500 text-white text-sm font-semibold shadow-lg">

                  {provider.availability}

                </div>

              </div>

              {/* CONTENT */}
              <div className="p-6">

                <h3 className="text-2xl font-bold text-slate-900">

                  {provider.name}

                </h3>

                <p className="mt-2 text-blue-600 font-semibold">

                  {provider.title}

                </p>

                {/* STATS */}
                <div className="mt-6 flex items-center justify-between">

                  <div>

                    <p className="font-bold text-slate-900">

                      {provider.experience}

                    </p>

                    <span className="text-sm text-slate-500">

                      Experience

                    </span>

                  </div>

                  <div className="text-right">

                    <div className="flex items-center justify-end gap-2 font-bold text-slate-900">

                      <Briefcase size={18} />

                      {provider.completed_jobs}+

                    </div>

                    <span className="text-sm text-slate-500">

                      Jobs Done

                    </span>

                  </div>

                </div>

                {/* BUTTON */}
                <Link
                  href={`/providers/${provider.slug}`}
                  className="mt-8 inline-flex items-center gap-2 text-blue-600 font-bold hover:gap-4 transition-all"
                >

                  View Profile

                  <ArrowRight size={18} />

                </Link>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>

  );
}