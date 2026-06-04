export default function ProjectDetailLoading() {
  return (
    <main className="min-h-screen bg-slate-50">
      <section className="pt-28">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 pb-14 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="py-6">
            <div className="h-4 w-48 animate-pulse rounded-full bg-blue-100" />
            <div className="mt-6 h-16 w-full animate-pulse rounded-3xl bg-slate-200" />
            <div className="mt-4 h-16 w-4/5 animate-pulse rounded-3xl bg-slate-100" />
            <div className="mt-6 h-5 w-3/4 animate-pulse rounded-full bg-slate-100" />
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              <div className="h-12 animate-pulse rounded-2xl bg-slate-950" />
              <div className="h-12 animate-pulse rounded-2xl bg-white" />
              <div className="h-12 animate-pulse rounded-2xl bg-white" />
            </div>
          </div>
          <div className="aspect-[4/3] animate-pulse rounded-[2rem] bg-gradient-to-br from-blue-100 via-slate-100 to-emerald-100" />
        </div>
      </section>
    </main>
  );
}
