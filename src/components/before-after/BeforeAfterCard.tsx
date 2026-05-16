"use client";

import Image from "next/image";

import { BeforeAfterType }
from "@/types/before-after";

type Props = {
  item: BeforeAfterType;
};

export default function BeforeAfterCard({
  item,
}: Props) {

  return (

    <div
      className="
        bg-white/10
        border border-white/10
        rounded-3xl
        overflow-hidden
        backdrop-blur-xl
        hover:scale-[1.02]
        transition-all
        duration-300
      "
    >

      {/* IMAGES */}
      <div className="grid grid-cols-2">

        {/* BEFORE */}
        <div className="relative h-[250px]">

          <Image
            src={item.before_image}
            alt="Before"
            fill
            className="object-cover"
          />

          <div
            className="
              absolute
              top-3
              left-3
              bg-red-500
              text-white
              text-xs
              px-3
              py-1
              rounded-full
            "
          >

            Before

          </div>

        </div>

        {/* AFTER */}
        <div className="relative h-[250px]">

          <Image
            src={item.after_image}
            alt="After"
            fill
            className="object-cover"
          />

          <div
            className="
              absolute
              top-3
              right-3
              bg-green-500
              text-white
              text-xs
              px-3
              py-1
              rounded-full
            "
          >

            After

          </div>

        </div>

      </div>

      {/* CONTENT */}
      <div className="p-6">

        <h3
          className="
            card-title
            text-white
          "
        >

          {item.title}

        </h3>

        <p
          className="
            card-description
            mt-3
          "
        >

          {item.description}

        </p>

      </div>

    </div>

  );

}