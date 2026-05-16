type Props = {
  area: {
    id: number;
    area_name: string;
    is_available: boolean;
  };
};

export default function AvailabilityCard({
  area,
}: Props) {

  if (!area) return null;

  return (

    <div className="group relative overflow-hidden bg-[#081129]/90 backdrop-blur-xl border border-white/10 rounded-[32px] p-8 shadow-2xl hover:border-cyan-400/40 transition-all duration-500 hover:-translate-y-2">

      {/* GLOW EFFECT */}

      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 bg-gradient-to-br from-cyan-500/10 via-transparent to-blue-500/10" />

      {/* CONTENT */}

      <div className="relative z-10">

        {/* AREA NAME */}

        <div className="flex items-center gap-3 mb-8">

          <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-400/20 flex items-center justify-center text-2xl">

            📍

          </div>

          <div>

            <p className="text-slate-400 text-sm">

              সার্ভিস এলাকা

            </p>

            <h3 className="text-3xl font-black text-white">

              {area.area_name}

            </h3>

          </div>

        </div>

        {/* STATUS */}

        {area.is_available ? (

          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 font-bold text-lg shadow-lg">

            <span className="text-2xl">
              ✅
            </span>

            সার্ভিস চালু আছে

          </div>

        ) : (

          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 font-bold text-lg shadow-lg">

            <span className="text-2xl">
              ❌
            </span>

            এখনো চালু হয়নি

          </div>

        )}

      </div>

    </div>

  );
}