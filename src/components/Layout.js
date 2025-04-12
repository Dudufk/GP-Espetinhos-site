import Header from './Header';
import Footer from './Footer';
import Cart from './Cart';
import { useCart } from '@/context/CartContext';

export default function Layout({ children }) {
  const { isCartOpen } = useCart(); // Obtendo o estado do carrinho

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-6">
        {children}
      </main>
      {isCartOpen && ( // Renderiza o carrinho apenas se isCartOpen for true
        <div className="fixed top-20 right-4 w-96 z-50 bg-white shadow-lg rounded-xl border p-4">
          <Cart />
        </div>
      )}
      <Footer />
    </div>
  );
}
