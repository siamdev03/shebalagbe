"use client";

import { useEffect, useState } from "react";

import { supabase } from "@/lib/supabase";

import BeforeAfterCard
from "./BeforeAfterCard";

import { BeforeAfterType }
from "@/types/before-after";

export default function BeforeAfterGallery() {

  const [items, setItems] =
    useState<BeforeAfterType[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    const fetchGallery =
      async () => {

        const { data, error } =
          await supabase
            .from("before_after_gallery")
            .select("*")
            .order(
              "created_at",
              { ascending: false }
            );

        if (!error && data) {

          setItems(data);

        }

        setLoading(false);

      };

    fetchGallery();

  }, []);

  return (

    <section className="relative py-24 overflow-hidden">

      {/* BG */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950" />

      {/* CONTENT */}
      <div className="relative z-10 max-w-7xl mx-auto px-6">

        {/* TITLE */}
        <div className="text-center mb-16">

          <h2 className="text-white">

            Before / After Gallery

          </h2>

          <p className="card-description mt-5 max-w-2xl mx-auto">

            কাজের আগের এবং পরের
            বাস্তব ফলাফল দেখুন।

          </p>

        </div>

        {/* LOADING */}
        {loading && (

          <p className="text-white text-center">

            Loading Gallery...

          </p>

        )}

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {items.map((item) => (

            <BeforeAfterCard
              key={item.id}
              item={item}
            />

          ))}

        </div>

      </div>

    </section>

  );

}