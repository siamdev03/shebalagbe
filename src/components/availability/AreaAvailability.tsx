"use client";

import { useEffect, useState } from "react";

import { supabase } from "@/lib/supabase";

import AreaSearch from "./AreaSearch";

import AvailabilityCard from "./AvailabilityCard";

export default function AreaAvailability() {

  const [areas, setAreas] =
    useState<any[]>([]);

  const [search, setSearch] =
    useState("");

  /* SECTION DATA */

  const [sectionData, setSectionData] =
    useState<any>(null);

  /* FETCH AREAS */

  async function fetchAreas() {

    const { data, error } =
      await supabase
        .from("service_areas")
        .select("*");

    if (error) {

      console.log(error);

      return;
    }

    /* SAFE ARRAY */

    setAreas(
      Array.isArray(data)
        ? data
        : []
    );
  }

  /* FETCH SECTION DATA */

  async function fetchSectionData() {

    const { data, error } =
      await supabase
        .from("availability_section")
        .select("*")
        .single();

    if (error) {

      console.log(error);

      return;
    }

    setSectionData(data);
  }

  useEffect(() => {

    fetchAreas();

    fetchSectionData();

  }, []);

  /* SAFE FILTER */

  const filteredAreas =
    areas.filter((area) => {

      if (
        !area ||
        !area.area_name
      ) {
        return false;
      }

      return area.area_name
        .toLowerCase()
        .includes(
          search.toLowerCase()
        );

    });

  return (

    <section className="relative py-28 overflow-hidden">

      {/* BACKGROUND IMAGE */}

      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            `url(${sectionData?.background_image || ""})`,
        }}
      />

      {/* DARK OVERLAY */}

      <div className="absolute inset-0 bg-[#020817]/85 backdrop-blur-sm" />

      {/* CONTENT */}

      <div className="relative z-10 max-w-6xl mx-auto px-4">

        {/* TITLE */}

        <div className="text-center mb-16">

          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-cyan-300 font-semibold mb-6">

            {sectionData?.badge ||
              "📍 সার্ভিস এরিয়া চেক"}

          </div>

          <h2 className="text-4xl md:text-6xl font-black text-white leading-tight">

            {sectionData?.title ||
              "আপনার এলাকায়"}

            <span className="text-cyan-400">
              {" "}
              {sectionData?.highlighted_title ||
                "সার্ভিস Available"}{" "}
            </span>

            কিনা দেখুন

          </h2>

          <p className="text-slate-300 mt-6 text-lg max-w-2xl mx-auto leading-8">

            {sectionData?.subtitle ||
              "আপনার লোকেশনে আমাদের টিম সার্ভিস প্রদান করছে কিনা সহজেই যাচাই করুন"}

          </p>

        </div>

        {/* SEARCH */}

        <AreaSearch
          search={search}
          setSearch={setSearch}
        />

        {/* RESULTS */}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-14">

          {filteredAreas.length >
          0 ? (

            filteredAreas.map(
              (area) => (

                <AvailabilityCard
                  key={area.id}
                  area={area}
                />

              )
            )

          ) : (

            <div className="col-span-full text-center text-slate-300 text-xl">

              এই এলাকায় এখনো সার্ভিস চালু হয়নি!

            </div>

          )}

        </div>

      </div>

    </section>

  );
}