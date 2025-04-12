import Link from "next/link";
import { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import CartModal from "./CartModal";
import { useCart } from "@/context/CartContext";

export default function Header() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cartItems } = useCart();

  // Soma total de itens no carrinho
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <header className="bg-white shadow p-4 relative z-40">
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
