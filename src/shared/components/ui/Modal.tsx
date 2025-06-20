import React from 'react';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode; // Tempat untuk konten
};

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  // Jika tidak terbuka, jangan render apa-apa
  if (!isOpen) return null;

  return (
    // Latar belakang overlay
    <div
      onClick={onClose} // Menutup modal saat latar belakang diklik
      className="fixed inset-0 z-[999] flex items-center justify-center bg-black/20 backdrop-blur-md bg-opacity-50 transition-all duration-300 ease-in-out"
    >
      {/* Kontainer atau 'kartu' modal */}
      <div
        onClick={(e) => e.stopPropagation()} // Mencegah modal tertutup saat konten di dalamnya diklik
        className="bg-[#1C204B] border-2 border-purple-500/50 rounded-2xl shadow-lg p-8 m-4 max-w-md w-full"
      >
        {children} {/* Di sinilah konten unik Anda akan ditampilkan */}
      </div>
    </div>
  );
};

export default Modal;