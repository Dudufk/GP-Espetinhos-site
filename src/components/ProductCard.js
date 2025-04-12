// src/components/ProductCard.js
import { useContext } from 'react';
import { CartContext } from '../context/CartContext'; // Importando o contexto do carrinho
import Image from 'next/image';

export default function ProductCard({ product }) {
  const { addItemToCart } = useContext(CartContext); // Função para adicionar item ao carrinho

  const handleAddToCart = () => {
    addItemToCart(product); // Adiciona o produto ao carrinho
  };

  return (
    <div className="bg-white rounded-xl shadow p-4 text-center">
      <Image
        src={product.imagem}
        alt={product.nome}
        className="w-full h-48 object-cover rounded"
        width={600}
        height={600}
      />
      <h3 className="text-lg font-semibold mt-2">{product.nome}</h3>
      <p className="text-red-500 font-bold">{product.preco}</p>
      <button
        onClick={handleAddToCart}
        className="mt-4 px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
      >
        Adicionar ao Carrinho
      </button>
    </div>
  );
}
