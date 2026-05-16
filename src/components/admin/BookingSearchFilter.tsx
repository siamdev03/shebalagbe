"use client";

type Props = {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
};

export default function BookingSearchFilter({
  searchTerm,
  setSearchTerm,
}: Props) {
  return (
    <div className="w-full mb-6">
      <input
        type="text"
        placeholder="Search by customer, service, email or phone..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black"
      />
    </div>
  );
}