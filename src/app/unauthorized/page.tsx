export default function UnauthorizedPage() {

  return (

    <main className="min-h-screen flex items-center justify-center bg-slate-950 text-white px-6">

      <div className="text-center">

        <h1 className="text-6xl font-extrabold text-red-500">

          Access Denied ❌

        </h1>

        <p className="mt-6 text-slate-300 text-xl">

          আপনি Admin নন

        </p>

      </div>

    </main>

  );

}