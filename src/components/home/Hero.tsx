"use client";

import {
  useEffect,
  useState,
} from "react";

import { supabase } from "@/lib/supabase";

type HeroSettings = {

  badge_text: string;

  title_1: string;
  highlight_text: string;
  title_2: string;

  subtitle: string;

  search_placeholder: string;
  search_button_text: string;

  tag_1: string;
  tag_2: string;
  tag_3: string;
  tag_4: string;

  stat_1_number: string;
  stat_1_label: string;

  stat_2_number: string;
  stat_2_label: string;

  stat_3_number: string;
  stat_3_label: string;

  background_image: string;

};

type HeroProps = {

  searchTerm: string;

  setSearchTerm:
    React.Dispatch<
      React.SetStateAction<string>
    >;

};

export default function Hero({

  searchTerm,
  setSearchTerm,

}: HeroProps) {

  const [hero, setHero] =
    useState<HeroSettings | null>(null);

  useEffect(() => {

    const fetchHero =
      async () => {

        const { data, error } =
          await supabase
            .from("hero_settings")
            .select("*")
            .single();

        if (error) {

          console.log(error);

          return;
        }

        setHero(data);

      };

    fetchHero();

  }, []);

  if (!hero) return null;

  /* SEARCH BUTTON */
  function handleSearch() {

    const section =
      document.getElementById(
        "popular-services"
      );

    section?.scrollIntoView({

      behavior: "smooth",

    });

  }

  /* TAG CLICK */
  function handleTagClick(
    tag: string
  ) {

    setSearchTerm(tag);

    const section =
      document.getElementById(
        "popular-services"
      );

    section?.scrollIntoView({

      behavior: "smooth",

    });

  }

  return (

    <section className="relative min-h-screen overflow-hidden">

      {/* BACKGROUND */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            `url(${hero.background_image})`,
        }}
      />

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-slate-950/80" />

      {/* GRID */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
          backgroundSize:
            "40px 40px",
        }}
      />

      {/* CONTENT */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-36 pb-24">

        <div className="max-w-4xl">

          {/* BADGE */}
          <div className="inline-flex items-center px-5 py-2 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-300 font-semibold backdrop-blur-md">

            {hero.badge_text}

          </div>

          {/* TITLE */}
          <h1 className="text-white mt-8">

            {hero.title_1}{" "}

            <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">

              {hero.highlight_text}

            </span>

            <br />

            {hero.title_2}

          </h1>

          {/* SUBTITLE */}
          <p className="card-description mt-8 max-w-3xl">

            {hero.subtitle}

          </p>

          {/* SEARCH */}
          <div className="mt-10 flex flex-col md:flex-row gap-4">

            <input
              type="text"
              value={searchTerm}
              onChange={(e) =>
                setSearchTerm(
                  e.target.value
                )
              }
              placeholder={
                hero.search_placeholder
              }
              className="
                hero-input
                w-full
                md:flex-1
                h-16
                rounded-2xl
                bg-white/10
                border
                border-white/10
                backdrop-blur-xl
                px-6
                py-5
                text-white
                placeholder:text-slate-400
                outline-none
              "
            />

            <button
              onClick={handleSearch}
              className="h-16 px-10 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold hover:scale-105 transition-all duration-300 shadow-2xl"
            >

              {hero.search_button_text}

            </button>

          </div>

          {/* TAGS */}
          <div className="mt-8 flex flex-wrap gap-3">

            {[

              hero.tag_1,
              hero.tag_2,
              hero.tag_3,
              hero.tag_4,

            ].map((tag, index) => (

              <button
                key={index}
                onClick={() =>
                  handleTagClick(tag)
                }
                className="px-5 py-2 rounded-full bg-white/10 border border-white/10 text-white text-sm font-medium backdrop-blur-md hover:bg-blue-500/20 transition-all"
              >

                {tag}

              </button>

            ))}

          </div>

          {/* STATS */}
          <div className="mt-14 flex flex-wrap gap-12">

            <div>

              <h3 className="text-blue-400">

                {hero.stat_1_number}

              </h3>

              <p className="mt-2 card-description">

                {hero.stat_1_label}

              </p>

            </div>

            <div>

              <h3 className="text-blue-400">

                {hero.stat_2_number}

              </h3>

              <p className="mt-2 card-description">

                {hero.stat_2_label}

              </p>

            </div>

            <div>

              <h3 className="text-blue-400">

                {hero.stat_3_number}

              </h3>

              <p className="mt-2 card-description">

                {hero.stat_3_label}

              </p>

            </div>

          </div>

        </div>

      </div>

    </section>

  );

}