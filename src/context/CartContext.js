import { createContext, useState, useContext } from 'react';

// Criando o contexto do carrinho
export const CartContext = createContext();

// Criando o provider do carrinho
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCart = () => {
    setIsCartOpen((prevState) => !prevState); // Alterna o estado do carrinho
  };

  //Adiciona item ao carrinho, se o item já existe, aumenta a quantidade
  const addItemToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(item => item.nome === product.nome);
      if (existingItem) {
        return prevItems.map(item =>
          item.nome === product.nome ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  // Diminui a quantidade de um item
  const decreaseItemQuantity = (product) => {
    setCartItems((prevItems) => {
      const updatedItems = prevItems.map((item) =>
        item.nome === product.nome
          ? {
              ...item,
              quantity: item.quantity > 1 ? item.quantity - 1 : item.quantity,
            }
          : item
      );
      return updatedItems.filter((item) => item.quantity > 0);
    });
  };

  // Remover item do carrinho
  const removeItemFromCart = (item) => {
    setCartItems((prevItems) => prevItems.filter((i) => i !== item));
  };

  // Limpa o carrinho
  const clearCart = () => {
    setCartItems([]);
  };

  // Retorna o provider com os valores do carrinho e as funções para manipulação do carrinho
  return (
    <CartContext.Provider
      value={{
        cartItems,
        isCartOpen,
        toggleCart,
        addItemToCart,
        removeItemFromCart,
        clearCart,
        decreaseItemQuantity
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Hook para facilitar o uso do contexto
export const useCart = () => useContext(CartContext);
