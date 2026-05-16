import Link from "next/link";

import ProvidersSection from "@/components/home/TopProviders";

export default function ProvidersPage() {

  return (

    <main className="min-h-screen bg-slate-950">

      {/* BACK BUTTON */}
      <div className="max-w-7xl mx-auto px-6 pt-10">

        <Link
          href="/"
          className="
            inline-flex
            items-center
            gap-2
            px-6
            py-3
            rounded-2xl
            bg-white/10
            border
            border-white/10
            text-white
            font-bold
            hover:bg-white/20
            transition-all
            duration-300
          "
        >

          ← হোমে ফিরে যান

        </Link>

      </div>

      <ProvidersSection />

    </main>

  );

}