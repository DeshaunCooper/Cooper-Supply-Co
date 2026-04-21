export function MascotInline({ className = "" }: { className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <div className="relative h-28 w-24 animate-[bob_2.6s_ease-in-out_infinite]">
        <div className="absolute left-4 top-0 h-8 w-16 rounded-full border-4 border-black bg-[#A67C52]" />
        <div className="absolute left-6 top-2 h-2 w-12 rounded-full bg-black/80" />
        <div className="absolute left-1 top-6 h-16 w-20 rounded-[40px] border-4 border-black bg-[#F5F0E6]" />
        <div className="absolute left-6 top-12 h-2 w-2 rounded-full bg-black" />
        <div className="absolute right-6 top-12 h-2 w-2 rounded-full bg-black" />
        <div className="absolute left-8 top-[3.7rem] h-3 w-8 rounded-b-full border-b-4 border-black" />
        <div className="absolute left-2 top-16 h-8 w-4 origin-top rotate-[30deg] rounded-full border-4 border-black bg-[#F5F0E6]" />
        <div className="absolute right-2 top-16 h-8 w-4 origin-top -rotate-[30deg] rounded-full border-4 border-black bg-[#F5F0E6]" />
        <div className="absolute left-7 top-20 h-8 w-4 rounded-full border-4 border-black bg-[#F5F0E6]" />
        <div className="absolute right-7 top-20 h-8 w-4 rounded-full border-4 border-black bg-[#F5F0E6]" />
      </div>
      <style>{`@keyframes bob { 0%,100% { transform: translateY(0px)} 50% { transform: translateY(-6px)} }`}</style>
    </div>
  );
}
