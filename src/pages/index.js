import ProductList from "@/components/ProductList";
import WhatsAppButton from "@/components/WhatsAppButton";
import Banner from "@/components/Banner";

export default function Home() {
  return (
    <>
      <Banner />
      <div className="container mx-auto px-4 py-6">
        <ProductList />
      </div>
      <WhatsAppButton />
    </>
  );
}
