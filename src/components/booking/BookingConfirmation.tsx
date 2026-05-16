import BookingForm from "./BookingForm";

export default function BookingConfirmation() {

  return (

    <section className="relative py-28 overflow-hidden">

      {/* BACKGROUND IMAGE */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('/booking-bg.jpg')",
        }}
      />

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-slate-950/80" />

      {/* BLUE GRADIENT */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-950/80 via-slate-950/70 to-cyan-950/70" />

      {/* CONTENT */}
      <div className="relative z-10 max-w-7xl mx-auto px-4">

        <BookingForm />

      </div>

    </section>

  );
}