"use client";

import {
  useEffect,
  useState,
} from "react";
import BackToTop from "@/components/layout/BackToTop";
import FloatingSidebar
from "@/components/layout/FloatingSidebar";

import Navbar
from "@/components/layout/Navbar";

import Footer
from "@/components/layout/Footer";

import Hero
from "@/components/home/Hero";
import AreaAvailability from"@/components/availability/AreaAvailability";
import PopularServices
from "@/components/home/PopularServices";

import TopProviders
from "@/components/home/TopProviders";

import HowItWorks
from "@/components/home/HowItWorks";

import Testimonials
from "@/components/home/Testimonials";

import EmergencySection
from "@/components/emergency/EmergencySection";

import BookingModal
from "@/components/booking/BookingModal";

import BeforeAfterGallery
from "@/components/before-after/BeforeAfterGallery";

import BookingConfirmation
from "@/components/booking/BookingConfirmation";
import HelpAssistant from
"@/components/assistant/HelpAssistant";
import WhatsAppFloat
from "@/components/layout/WhatsAppFloat";

import { supabase }
from "@/lib/supabase";
import LiveNotification from "@/components/admin/LiveNotification";
type CTASection = {

  badge: string;

  title: string;

  highlighted_title: string;

  subtitle: string;

  button_text: string;

  background_image: string;

};

export default function HomePage() {

  /* SEARCH STATE */

  const [searchTerm, setSearchTerm] =
    useState("");

  /* BOOKING MODAL */

  const [openModal, setOpenModal] =
    useState(false);

  /* CTA DATA */

  const [ctaData, setCtaData] =
    useState<CTASection | null>(
      null
    );

  /* FETCH CTA SECTION */

  useEffect(() => {

    const fetchCTA =
      async () => {

        const { data, error } =
          await supabase
            .from("cta_section")
            .select("*")
            .limit(1)
            .single();

        if (error) {

          console.log(error);

          return;
        }

        setCtaData(data);

      };

    fetchCTA();

  }, []);

  return (

    <main className="min-h-screen bg-base-100">

      <Navbar />

      {/* HERO */}
      <Hero
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      <AreaAvailability />
      {/* SERVICES */}
      <PopularServices
        searchTerm={searchTerm}
      />
      
      <TopProviders />
      
      <BeforeAfterGallery />

      <BookingConfirmation />

      <HowItWorks />

      <Testimonials />
      
      <EmergencySection />

      
      <LiveNotification />
      <HelpAssistant />
      <WhatsAppFloat />

      {/* BOOKING CTA */}
      <section className="relative py-28 overflow-hidden">

        {/* BACKGROUND IMAGE */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              `url(${ctaData?.background_image || "/cta-bg.jpg"})`,
          }}
        />

        {/* DARK OVERLAY */}
        <div className="absolute inset-0 bg-slate-950/75" />

        {/* BLUE GRADIENT */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/70 via-slate-950/60 to-cyan-950/60" />

        {/* GLOW EFFECT */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-blue-500/10 blur-3xl rounded-full" />

        {/* CONTENT */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">

          {/* BADGE */}
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-blue-500/10 border border-blue-400/20 backdrop-blur-md text-blue-300 font-semibold">

            {ctaData?.badge ||
              "দ্রুত সার্ভিস বুকিং"}

          </div>

          {/* TITLE */}
          <h2 className="mt-8 text-5xl md:text-7xl font-extrabold text-white leading-tight">

            {ctaData?.title ||
              "এখনই আপনার প্রয়োজনীয়"}

            <br />

            <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">

              {ctaData?.highlighted_title ||
                "সার্ভিস বুক করুন"}

            </span>

          </h2>

          {/* SUBTITLE */}
          <p className="mt-8 text-xl md:text-2xl text-slate-300 leading-relaxed">

            {ctaData?.subtitle ||
              "যাচাইকৃত এবং বিশ্বস্ত প্রোভাইডারদের থেকে দ্রুত সার্ভিস নিন সহজেই।"}

          </p>

          {/* BUTTON */}
          <button
            onClick={() =>
              setOpenModal(true)
            }
            className="mt-12 px-10 py-5 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-xl font-bold shadow-2xl hover:scale-105 transition-all duration-300"
          >

            {ctaData?.button_text ||
              "সার্ভিস বুক করুন"}

          </button>

        </div>

      </section>
      <HelpAssistant />
      <Footer />
      <BackToTop />
      {/* BOOKING MODAL */}
      <BookingModal
        isOpen={openModal}
        onClose={() =>
          setOpenModal(false)
        }
        service={{
          name:
            "General Service Booking",
        }}
      />

    </main>

  );

}