import {
  ShieldAlert,
  Clock3,
  Zap,
} from "lucide-react";

import EmergencyForm from "./EmergencyForm";

export default function EmergencySection() {

  return (

    <section className="relative py-24 overflow-hidden bg-gradient-to-br from-red-50 via-orange-50 to-white">

      {/* GLOW */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-red-500/10 blur-3xl rounded-full" />

      <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-16 items-center relative z-10">

        {/* LEFT */}
        <div>

          <div className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-red-100 text-red-600 font-bold">

            <Zap size={18} />

            জরুরি সার্ভিস

          </div>

          <h2 className="mt-8 text-5xl md:text-6xl font-extrabold leading-tight text-slate-900">

            জরুরি সাহায্য
            <span className="text-red-500">

              {" "}প্রয়োজন?

            </span>

          </h2>

          <p className="mt-6 text-xl text-slate-600 leading-9">

            এখনই জরুরি সার্ভিস বুক করুন এবং
            মাত্র ৩০ মিনিটের মধ্যে
            verified professional এর response পান।

          </p>

          {/* FEATURES */}
          <div className="mt-10 space-y-5">

            <div className="flex items-center gap-4">

              <div className="w-14 h-14 rounded-2xl bg-red-100 flex items-center justify-center text-red-500">

                <Clock3 />

              </div>

              <div>

                <h4 className="font-bold text-lg">

                  দ্রুত রেসপন্স

                </h4>

                <p className="text-slate-500">

                  ৩০ মিনিটের মধ্যে যোগাযোগ।

                </p>

              </div>

            </div>

            <div className="flex items-center gap-4">

              <div className="w-14 h-14 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-500">

                <ShieldAlert />

              </div>

              <div>

                <h4 className="font-bold text-lg">

                  বিশ্বস্ত এক্সপার্ট

                </h4>

                <p className="text-slate-500">

                  যাচাইকৃত সার্ভিস প্রোভাইডার।

                </p>

              </div>

            </div>

          </div>

        </div>

        {/* RIGHT */}
        <EmergencyForm />

      </div>

    </section>

  );
}