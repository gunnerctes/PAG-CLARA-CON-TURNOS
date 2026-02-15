"use client";

import { useState } from "react";
import Turnero from "./components/Turnero";
import BookingModal from "./components/BookingModal";
import ChatAssistant from "./components/ChatAssistant";

const App: React.FC = () => {
  const [mostrarTurnero, setMostrarTurnero] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const handleBookingSuccess = () => {
    setShowSuccessToast(true);
    setTimeout(() => setShowSuccessToast(false), 5000);
    setMostrarTurnero(false);
  };

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* NAV */}
      <nav className="fixed top-0 w-full z-40 bg-white shadow py-4 px-6 flex justify-between items-center">
        <span className="font-bold">Dra. Balbuena María Clara</span>

        <button
          onClick={() => setMostrarTurnero(true)}
          className="bg-blue-600 text-white px-6 py-2 rounded-full"
        >
          Sacar Turno
        </button>
      </nav>

      {/* CONTENIDO */}
      <main className="pt-32 px-6">
        <button
          onClick={() => setMostrarTurnero(true)}
          className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold"
        >
          Solicitar Turno Ahora
        </button>
      </main>

      {/* CHAT */}
      <div className="relative z-30">
        <ChatAssistant />
      </div>

      {/* MODAL TURNERO */}
      {mostrarTurnero && (
        <Turnero
          onSuccess={handleBookingSuccess}
          onClose={() => setMostrarTurnero(false)}
        />
      )}

      {/* TOAST */}
      {showSuccessToast && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded-full z-[9999]">
          Turno solicitado con éxito
        </div>
      )}

      <BookingModal
        isOpen={false}
        onClose={() => {}}
        onSuccess={handleBookingSuccess}
      />
    </div>
  );
};

export default App;
