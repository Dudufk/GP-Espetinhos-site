// src/components/Cart.js
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';

export default function Cart() {
  const { cartItems, clearCart } = useContext(CartContext);

  // Função para formatar os itens do carrinho para o WhatsApp
  const generateWhatsAppMessage = () => {
    let message = "Olá, gostaria de pedir os seguintes itens:\n\n";
    cartItems.forEach((item, index) => {
      message += `${item.nome} - ${item.preco}\n`;
    });
    message += `\nTotal: R$ ${cartItems.reduce((total, item) => total + parseFloat(item.preco.replace('R$', '').replace(',', '.')), 0).toFixed(2)}`;
    return encodeURIComponent(message); // Codificando a mensagem para URL
  };

  // Número do WhatsApp (substitua pelo número real)
  const whatsAppNumber = '5511968299673';

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Carrinho de Compras</h2>
      <div className="space-y-4">
        {cartItems.length === 0 ? (
          <p className="text-center">Seu carrinho está vazio.</p>
        ) : (
          cartItems.map((item, index) => (
            <div key={index} className="flex justify-between items-center">
              <span>{item.nome}</span>
              <span>{item.preco}</span>
            </div>
          ))
        )}
      </div>
      <div className="mt-6 flex justify-between items-center">
        <button
          onClick={clearCart}
          className="px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600"
        >
          Limpar Carrinho
        </button>
        <a
          href={`https://wa.me/${whatsAppNumber}?text=${generateWhatsAppMessage()}`}
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-2 bg-green-600 text-white rounded-full hover:bg-green-700"
        >
          Finalizar Pedido
        </a>
      </div>
    </div>
  );
}
