import ProductCard from './ProductCard'; // Importando o ProductCard

const produtos = [
  { nome: 'Espetinho de Carne', preco: 'R$ 6,00', imagem: '/assets/produtos/espetinho-carne.jpg' },
  { nome: 'Espetinho de Frango', preco: 'R$ 5,00', imagem: '/assets/produtos/espetinho-frango.jpg' },
  { nome: 'Espetinho de Queijo Coalho', preco: 'R$ 7,00', imagem: '/assets/produtos/espetinho-queijo.jpg' },
];

export default function ProductList() {
  return (
    <section className="max-w-5xl mx-auto px-4 py-8">
      <h2 className="text-4xl text-center font-bold mb-4">Nossos produtos</h2>
      <h4 className="text-xl text-center mb-4">Espetos de grande qualidade para seu churrasco saboroso entre familia e amigos</h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {produtos.map((item, index) => (
          <ProductCard key={index} product={item} /> // Renderizando ProductCard para cada produto
        ))}
      </div>
    </section>
  );
}
