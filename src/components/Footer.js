import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white border-t mt-10 text-sm text-gray-700">
      <div className="container mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Contato */}
        <div>
          <h3 className="font-bold mb-2">Contato</h3>
          <p>📞 (11) 99999-9999</p>
          <p>📍 Rua dos Espetinhos, 123 - São Paulo/SP</p>
          <p>📧 contato@gpespetinhos.com.br</p>
        </div>

        {/* Horário */}
        <div>
          <h3 className="font-bold mb-2">Horário de Funcionamento</h3>
          <p>Seg a Sex: 18h às 23h</p>
          <p>Sáb e Dom: 17h às 00h</p>
        </div>

        {/* Links */}
        <div>
          <h3 className="font-bold mb-2">Navegação</h3>
          <ul className="space-y-1">
            <li><Link href="/" className="hover:underline">Início</Link></li>
            <li><Link href="/cardapio" className="hover:underline">Cardápio</Link></li>
            <li><Link href="/contato" className="hover:underline">Contato</Link></li>
          </ul>
        </div>

      </div>

      <div className="text-center border-t mt-6 py-4 text-gray-500">
        <p>© {new Date().getFullYear()} GP Espetinhos. Todos os direitos reservados.</p>
        <p className="text-xs">
          Desenvolvido por{' '}
          <a
            href="https://www.instagram.com/dudu_fk/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold hover:underline"

          >
            Eduardo Klier
          </a>
        </p>
      </div>
    </footer>
  );
}
