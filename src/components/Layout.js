import Header from "./Header";
import Footer from "./Footer";
import Cart from "./Cart";
import { useCart } from "@/context/CartContext";
import { useEffect, useState } from "react";

export default function Layout({ children }) {
  const { isCartOpen } = useCart();
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null;

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <main className="flex-grow">{children}</main>
        {isCartOpen && (          
            <Cart />
        )}
      <Footer />
    </div>
  );
}
