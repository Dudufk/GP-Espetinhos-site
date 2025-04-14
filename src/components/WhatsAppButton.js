import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';

const WhatsAppButton = () => {
  return (
    <div className="fixed bottom-4 right-4 flex items-center z-50">
      <a
        href="https://wa.me/5511968299673" // <- Troque para seu número
        target="_blank"
        rel="noopener noreferrer"
        className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-lg transition-all"
      >
        <FaWhatsapp size={30} />
      </a>
    </div>
  );
};

export default WhatsAppButton;
