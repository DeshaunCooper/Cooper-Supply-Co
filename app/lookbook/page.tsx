export default function LookbookPage() {
  return (
    <section className="bg-[#1A1A1A] px-4 pb-24 pt-32 text-white md:px-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-5xl font-black uppercase leading-none md:text-7xl">Campaign motion frames.</h1>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-96 rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,#2a2a2a,#121212)] p-5" />
          ))}
        </div>
      </div>
    </section>
  );
}
