import Link from "next/link";
import { useState, useEffect } from "react";
import { FaShoppingCart } from "react-icons/fa";
import CartModal from "./CartModal";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import { motion, useAnimation } from "framer-motion";

export default function Header() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cartItems, itemAdicionado } = useCart();
  const [lastScrollY, setLastScrollY] = useState(0);
  const [visible, setVisible] = useState(true);

  const controls = useAnimation();

  // Soma total de itens no carrinho
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Efeito para esconder o cabeçalho ao rolar para baixo e mostrar ao rolar para cima
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 50) {
        setVisible(false);
      } else if (window.scrollY < lastScrollY) {
        setVisible(true);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Efeito para forçar mostrar quando item adicionado
  useEffect(() => {
    if (itemAdicionado) {
      setVisible(true);
    }
  }, [itemAdicionado]);

  // Efeito para novo item no carrinho
  useEffect(() => {
    if (totalItems > 0) {
      controls.start({
        scale: [1, 1.3, 1],
        transition: { duration: 0.2, ease: "easeOut" },
      });
    }
  }, [totalItems, controls]);

  return (
    <>
      {/* Usando motion.header para animação */}
      <motion.header
        initial={{ y: 0 }}
        animate={{ y: visible ? 0 : -100 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        className="fixed top-0 left-0 right-0 z-50 bg-gray-100 p-4 shadow transition-transform duration-300 ease-in-out"
      >
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/">
            <Image
              src="/assets/logo-redondo.png"
              alt="Logo GP Espetinhos"
              width={50}
              height={50}
              className="cursor-pointer"
            />
          </Link>
          <nav className="space-x-6 flex items-center">
            <Link href="/">Início</Link>
            <Link href="/contato">Contato</Link>

            {/* Botão do carrinho com badge */}
            <motion.button
              animate={controls}
              onClick={() => setIsCartOpen(true)}
              className="relative text-gray-700 hover:text-red-600"
              title="Abrir Carrinho"
            >
              <FaShoppingCart size={22} className="" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {totalItems}
                </span>
              )}
            </motion.button>
          </nav>
        </div>
      </motion.header>

      {/* Carrinho */}
      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}
