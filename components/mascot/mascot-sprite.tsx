import Image from "next/image";

export function MascotSprite() {
  return (
    <div className="relative h-[140px] w-[120px]">
      <Image
        src="/images/mascot/mascot-idle.png"
        alt="Cooper Supply mascot"
        fill
        sizes="120px"
        className="object-contain"
        priority
      />
    </div>
  );
}
