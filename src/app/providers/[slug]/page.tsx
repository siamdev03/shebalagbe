import Image from "next/image";

import { supabase } from "@/lib/supabase";

import {
  Star,
  Briefcase,
  BadgeCheck,
  MessageCircle,
} from "lucide-react";

type Props = {
  params: {
    slug: string;
  };
};

export default async function ProviderPage({
  params,
}: Props) {

  const { data: provider } =
    await supabase
      .from("providers")
      .select("*")
      .eq("slug", params.slug)
      .single();

  if (!provider) {

    return (
      <div className="py-40 text-center">
        Provider Not Found
      </div>
    );
  }

  const { data: skills } =
    await supabase
      .from("provider_skills")
      .select("*")
      .eq("provider_id", provider.id);

  const { data: reviews } =
    await supabase
      .from("provider_reviews")
      .select("*")
      .eq("provider_id", provider.id);

  const { data: certificates } =
    await supabase
      .from("provider_certifications")
      .select("*")
      .eq("provider_id", provider.id);

  return (

    <main className="min-h-screen bg-slate-50">

      {/* HERO */}
      <section className="bg-white border-b">

        <div className="max-w-6xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-12 items-center">

          {/* LEFT */}
          <div>

            <div className="inline-flex px-4 py-2 rounded-full bg-green-100 text-green-700 font-semibold mb-6">

              {provider.availability}

            </div>

            <h1 className="text-5xl font-extrabold text-slate-900">

              {provider.name}

            </h1>

            <p className="mt-4 text-2xl text-blue-600 font-semibold">

              {provider.title}

            </p>

            <p className="mt-6 text-slate-600 leading-8 text-lg">

              {provider.bio}

            </p>

            {/* STATS */}
            <div className="mt-10 flex flex-wrap gap-5">

              <div className="bg-slate-100 px-5 py-4 rounded-2xl">

                <div className="flex items-center gap-2 font-bold">

                  <Briefcase size={18} />

                  {provider.completed_jobs}+

                </div>

                <p className="text-sm text-slate-500 mt-1">

                  Completed Jobs

                </p>

              </div>

              <div className="bg-slate-100 px-5 py-4 rounded-2xl">

                <div className="font-bold">

                  {provider.experience}

                </div>

                <p className="text-sm text-slate-500 mt-1">

                  Experience

                </p>

              </div>

            </div>

            {/* WHATSAPP */}
            <a
              href={`https://wa.me/${provider.whatsapp}`}
              target="_blank"
              className="inline-flex items-center gap-3 mt-10 px-8 py-4 rounded-2xl bg-green-500 text-white font-bold hover:scale-105 transition"
            >

              <MessageCircle />

              Contact on WhatsApp

            </a>

          </div>

          {/* RIGHT */}
          <div className="flex justify-center">

            <Image
              src={provider.image}
              alt={provider.name}
              width={420}
              height={420}
              className="rounded-3xl object-cover shadow-2xl h-[420px]"
            />

          </div>

        </div>

      </section>

      {/* SKILLS */}
      <section className="max-w-6xl mx-auto px-4 py-20">

        <h2 className="text-3xl font-bold mb-10">

          Skills

        </h2>

        <div className="flex flex-wrap gap-4">

          {skills?.map((skill) => (

            <div
              key={skill.id}
              className="px-5 py-3 rounded-full bg-blue-100 text-blue-700 font-semibold"
            >

              {skill.skill}

            </div>

          ))}

        </div>

      </section>

      {/* CERTIFICATIONS */}
      <section className="max-w-6xl mx-auto px-4 pb-20">

        <h2 className="text-3xl font-bold mb-10">

          Certifications

        </h2>

        <div className="grid md:grid-cols-2 gap-6">

          {certificates?.map((item) => (

            <div
              key={item.id}
              className="bg-white p-6 rounded-2xl shadow-sm border"
            >

              <div className="flex items-center gap-3">

                <BadgeCheck className="text-blue-600" />

                <div>

                  <h3 className="font-bold text-lg">

                    {item.title}

                  </h3>

                  <p className="text-slate-500">

                    {item.organization}

                  </p>

                </div>

              </div>

            </div>

          ))}

        </div>

      </section>

      {/* REVIEWS */}
      <section className="max-w-6xl mx-auto px-4 pb-24">

        <h2 className="text-3xl font-bold mb-10">

          Client Reviews

        </h2>

        <div className="grid md:grid-cols-2 gap-6">

          {reviews?.map((review) => (

            <div
              key={review.id}
              className="bg-white p-6 rounded-2xl shadow-sm border"
            >

              <div className="flex items-center gap-1 mb-4">

                {Array.from({
                  length: review.rating,
                }).map((_, i) => (

                  <Star
                    key={i}
                    size={18}
                    className="fill-yellow-400 text-yellow-400"
                  />

                ))}

              </div>

              <p className="text-slate-600 leading-7">

                {review.review}

              </p>

              <h4 className="mt-5 font-bold">

                {review.client_name}

              </h4>

            </div>

          ))}

        </div>

      </section>

    </main>

  );
}