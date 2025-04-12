import Link from "next/link";
import { useState, useEffect } from "react";
import { FaShoppingCart } from "react-icons/fa";
import CartModal from "./CartModal";
import { useCart } from "@/context/CartContext";

export default function Header() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cartItems } = useCart();
  const [lastScrollY, setLastScrollY] = useState(0);
  const [visible, setVisible] = useState(true);

  // Soma total de itens no carrinho
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Efeito para esconder o cabeçalho ao rolar para baixo e mostrar ao rolar para cima
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 50) {
        // Rolando para baixo, esconder o header
        setVisible(false);
      } else if (window.scrollY < lastScrollY) {
        // Rolando para cima, mostrar o header
        setVisible(true);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 bg-white shadow p-4 transition-transform duration-300 ease-in-out ${
          !visible ? "transform -translate-y-full" : "transform translate-y-0"
        }`}
      >
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="text-xl font-bold text-red-600">
            GP Espetinhos
          </Link>
          <nav className="space-x-4 flex items-center">
            <Link href="/">Início</Link>
            <Link href="/cardapio">Cardápio</Link>
            <Link href="/contato">Contato</Link>

            {/* Botão do carrinho com badge */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative text-gray-700 hover:text-red-600"
              title="Abrir Carrinho"
            >
              <FaShoppingCart size={22} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {totalItems}
                </span>
              )}
            </button>
          </nav>
        </div>
      </header>

      {/* Carrinho */}
      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}
