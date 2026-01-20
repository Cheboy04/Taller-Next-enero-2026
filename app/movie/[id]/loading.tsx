export default function Loading() {
  return (
    <main className="bg-linear-to-b from-slate-900 to-slate-600">
      <div className="container mx-auto px-4 py-6 md:px-6 md:py-8">
        <div className="mb-6 block h-10 w-full animate-pulse rounded-full bg-linear-to-br from-slate-200 via-slate-100 to-slate-300" />
        <p className="h-6 w-3/4 animate-pulse rounded-full bg-linear-to-br from-slate-200 via-slate-100 to-slate-300 md:w-1/2" />
      </div>
    </main>
  );
}
