import Image from 'next/image';

export default function Banner() {
  return (
    <div className="w-full mt-10 shadow-xl relative h-[400px] sm:h-[400px] md:h-[300px] lg:h-[400px] xl:h-[500px] 2xl:h-[600px]">
      <Image
        src="/assets/imagem-banner.jpg"
        alt="Banner"
        fill
        objectFit="cover"
        priority
      />
    </div>
  );
}
