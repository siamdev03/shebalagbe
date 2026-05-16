type Props = {
  search: string;

  setSearch: (
    value: string
  ) => void;
};

export default function AreaSearch({
  search,
  setSearch,
}: Props) {

  return (

    <div className="w-full relative">

      {/* SEARCH ICON */}

      <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 text-xl">

        📍

      </div>

      <input
        type="text"
        placeholder="আপনার এলাকা লিখুন... যেমন: ঢাকা / ময়মনসিংহ"
        value={search}
        onChange={(e) =>
          setSearch(
            e.target.value
          )
        }
        className="w-full h-16 rounded-3xl pl-14 pr-6 bg-[#081129]/90 backdrop-blur-xl border border-cyan-400/20 text-white text-lg shadow-2xl outline-none focus:border-cyan-400 focus:shadow-cyan-500/20 transition-all duration-300 placeholder:text-slate-400"
      />

    </div>

  );
}