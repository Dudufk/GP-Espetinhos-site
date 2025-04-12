import { useCart } from "@/context/CartContext";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { FaTrash, FaMinus, FaTimes } from "react-icons/fa";

export default function CartModal({ isOpen, onClose }) {
  const { cartItems, removeItemFromCart, decreaseItemQuantity, clearCart } = useCart();

  const modalRef = useRef();

  const total = cartItems.reduce((acc, item) => {
    const precoNumerico = parseFloat(
      item.preco.replace("R$", "").replace(",", ".")
    );
    return acc + precoNumerico * item.quantity;
  }, 0);

  // Fecha ao clicar fora do modal
  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-end z-50">
      <div
        ref={modalRef}
        className="bg-white w-full sm:w-96 h-full p-6 shadow-lg overflow-y-auto"
      >
        <button
          onClick={onClose}
          className="absolute top-7 right-8 text-2xl md:hidden"
        >
          <FaTimes />
        </button>
        <h2 className="text-2xl font-bold mb-4">Seu Carrinho</h2>
        {cartItems.length === 0 ? (
          <p className="text-gray-500">Seu carrinho está vazio.</p>
        ) : (
          <ul className="space-y-4">
            {cartItems.map((item, index) => (
              <li key={index} className="flex items-center gap-4 border-b pb-2">
                <Image
                  src={item.imagem}
                  alt={item.nome}
                  width={60}
                  height={60}
                  className="rounded"
                />
                <div className="flex-1">
                  <h3 className="font-semibold">{item.nome}</h3>
                  <p className="text-sm text-gray-600">Qtd: {item.quantity}</p>
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
              </li>
            ))}
          </ul>
        )}

        {cartItems.length > 0 && (
          <div className="mt-4 flex justify-between">
            <button
              onClick={clearCart}
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
      </div>
    </div>
  );
}
