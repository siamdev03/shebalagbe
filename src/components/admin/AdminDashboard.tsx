type Booking = {
  id: number;
  customerName: string;
  email: string;
  phone: string;
  service: string;
  status: string;
  date: string;
};

type BookingTableProps = {
  bookings: Booking[];
};

export default function BookingTable({
  bookings,
}: BookingTableProps) {
  return (
    <div className="overflow-x-auto rounded-xl border">
      <table className="w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left">
              Customer
            </th>
            <th className="p-3 text-left">
              Email
            </th>
            <th className="p-3 text-left">
              Phone
            </th>
            <th className="p-3 text-left">
              Service
            </th>
            <th className="p-3 text-left">
              Status
            </th>
            <th className="p-3 text-left">
              Date
            </th>
          </tr>
        </thead>

        <tbody>
          {bookings.map((booking) => (
            <tr
              key={booking.id}
              className="border-t"
            >
              <td className="p-3">
                {booking.customerName}
              </td>

              <td className="p-3">
                {booking.email}
              </td>

              <td className="p-3">
                {booking.phone}
              </td>

              <td className="p-3">
                {booking.service}
              </td>

              <td className="p-3">
                {booking.status}
              </td>

              <td className="p-3">
                {booking.date}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}