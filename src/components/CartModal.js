import { useCart } from "@/context/CartContext";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { FaTrash, FaMinus, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

export default function CartModal({ isOpen, onClose }) {
  const { cartItems, removeItemFromCart, decreaseItemQuantity, clearCart } =
    useCart();

  const [showOverlay, setShowOverlay] = useState(false);
  const [isClearing, setIsClearing] = useState(false);
  const [visibleItems, setVisibleItems] = useState([]);
  const modalRef = useRef();

  useEffect(() => {
    if (!isClearing) {
      setVisibleItems(cartItems);
    }
  }, [cartItems, isClearing]);

  const total = cartItems.reduce((acc, item) => {
    const precoNumerico = parseFloat(
      item.preco.replace("R$", "").replace(",", ".")
    );
    return acc + precoNumerico * item.quantity;
  }, 0);

  // Ativa/desativa o fundo conforme o estado do modal
  useEffect(() => {
    if (isOpen) {
      setShowOverlay(true);
    }
  }, [isOpen]);

  // Fecha ao clicar fora do modal
  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
        setShowOverlay(false); // tira o fundo imediatamente
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  return (
    <>
      {/* Fundo escuro animado */}
      <AnimatePresence>
        {showOverlay && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black z-40"
          />
        )}
      </AnimatePresence>

      {/* Modal animado */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={modalRef}
            key="modal"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4, ease: [0.25, 0.8, 0.25, 1] }}
            className="fixed right-0 top-0 bottom-0 bg-white w-full sm:w-96 h-full p-6 shadow-lg overflow-y-auto z-50"
          >
            <button
              onClick={() => {
                onClose();
                setShowOverlay(false);
              }}
              className="absolute top-7 right-8 text-2xl md:hidden"
            >
              <FaTimes />
            </button>
            <h2 className="text-2xl font-bold mb-4">Seu Carrinho</h2>
            {cartItems.length === 0 ? (
              <p className="text-gray-500">Seu carrinho está vazio.</p>
            ) : (
              <ul className="space-y-4">
                <AnimatePresence>
                  {visibleItems.map((item) => (
                    <motion.li
                      key={item.id}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50, backgroundColor: "#fff0f0" }}
                      transition={{ duration: 0.3 }}
                      className="flex items-center gap-4 border-b pb-2"
                    >
                      <Image
                        src={item.imagem}
                        alt={item.nome}
                        width={60}
                        height={60}
                        className="rounded"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold">{item.nome}</h3>
                        <p className="text-sm text-gray-500">
                          Qtd: {item.quantity}
                        </p>
                        <p className="text-red-500">{item.preco}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        {item.quantity > 1 ? (
                          <button
                            onClick={() => decreaseItemQuantity(item)}
                            className="bg-gray-300 p-2 rounded"
                          >
                            <FaMinus />
                          </button>
                        ) : (
                          <button
                            onClick={() => removeItemFromCart(item)}
                            className="bg-red-500 text-white p-2 rounded"
                          >
                            <FaTrash />
                          </button>
                        )}
                      </div>
                    </motion.li>
                  ))}
                </AnimatePresence>
              </ul>
            )}

            {cartItems.length > 0 && (
              <div className="mt-4 flex justify-between">
                <button
                  onClick={() => {
                    setIsClearing(true);
                    setVisibleItems([]); // <- Força os itens a sumirem visualmente
                    setTimeout(() => {
                      clearCart(); // <- Limpa o carrinho real
                      setIsClearing(false);
                    }, 300); // Tempo igual à animação de saída
                  }}
                  className="w-full py-2 bg-gray-500 text-white font-semibold rounded-md"
                >
                  Limpar Carrinho
                </button>
              </div>
            )}

            {cartItems.length > 0 && (
              <div className="border-t mt-6 pt-4">
                <div className="flex justify-between items-center text-lg font-bold mb-2">
                  <span>Total:</span>
                  <span className="text-red-600">
                    R$ {total.toFixed(2).replace(".", ",")}
                  </span>
                </div>

                <button
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-xl transition duration-300"
                  onClick={() => {
                    const mensagem = cartItems
                      .map((item) => {
                        return `• ${item.nome} (x${item.quantity}) - ${item.preco}`;
                      })
                      .join("\n");

                    const totalFormatado = `R$ ${total
                      .toFixed(2)
                      .replace(".", ",")}`;
                    const texto = `Olá, gostaria de fazer um pedido:\n\n${mensagem}\n\nTotal: ${totalFormatado}`;

                    const numeroWhatsApp = "5511968299673";
                    const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(
                      texto
                    )}`;

                    window.open(url, "_blank");
                  }}
                >
                  Finalizar Pedido
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
