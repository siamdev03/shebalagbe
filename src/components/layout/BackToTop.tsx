"use client";

import { useEffect, useState } from "react";

import { ChevronUp } from "lucide-react";

export default function BackToTop() {

  const [showButton, setShowButton] =
    useState(false);

  useEffect(() => {

    const handleScroll = () => {

      if (window.scrollY > 300) {

        setShowButton(true);

      } else {

        setShowButton(false);

      }

    };

    window.addEventListener(
      "scroll",
      handleScroll
    );

    return () =>
      window.removeEventListener(
        "scroll",
        handleScroll
      );

  }, []);

  const scrollToTop = () => {

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

  };

  return (

    <button
      onClick={scrollToTop}
      className={`
        fixed
        bottom-24 right-6
        z-[999]
        w-14
        h-14
        rounded-full
        bg-gradient-to-r
        from-blue-600
        to-cyan-500
        text-white
        shadow-2xl
        flex
        items-center
        justify-center
        transition-all
        duration-300
        hover:scale-110
        ${
          showButton
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10 pointer-events-none"
        }
      `}
    >

      <ChevronUp size={28} />

    </button>

  );

}