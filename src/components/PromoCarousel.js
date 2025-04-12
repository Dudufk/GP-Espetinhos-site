import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Image from "next/image";

export default function PromoCarousel() {
  return (
    <div className="max-w-4xl mx-auto mt-20 my-6 rounded-lg overflow-hidden shadow-md">
      <Carousel autoPlay infiniteLoop showThumbs={false} showStatus={false}>
        <div>
        <Image src="/assets/promocoes/promo1.png" alt="Promoção 1" width={1200} height={600} className="rounded-xl" />
        </div>
        <div>
        <Image src="/assets/promocoes/promo2.png" alt="Promoção 2" width={1200} height={600} className="rounded-xl" />
        </div>
        <div>
        <Image src="/assets/promocoes/promo3.jpg" alt="Promoção 3" width={1200} height={600} className="rounded-xl" />
        </div>
      </Carousel>
    </div>
  );
}
