"use client";

import { useState } from "react";
import Turnero from "./components/Turnero";
import ChatAssistant from "./components/ChatAssistant";

const App: React.FC = () => {
  const [mostrarTurnero, setMostrarTurnero] = useState(false);

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* NAV */}
      <nav className="fixed top-0 w-full z-40 glass-morphism py-4 px-6 flex justify-between items-center">
        <span className="font-bold">Dra. Balbuena María Clara</span>

        <button
          className="bg-blue-600 text-white px-6 py-2 rounded-full"
          onClick={() => setMostrarTurnero(true)}
        >
          Sacar Turno
        </button>
      </nav>

      {/* CONTENIDO */}
      <main className="pt-32 px-6">
        <h1 className="text-3xl font-bold mb-6">
          Atención médica personalizada
        </h1>

        <button
          className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold"
          onClick={() => setMostrarTurnero(true)}
        >
          Solicitar Turno Ahora
        </button>
      </main>

      <ChatAssistant />

      {mostrarTurnero && (
        <Turnero
          onClose={() => setMostrarTurnero(false)}
          onSuccess={() => setMostrarTurnero(false)}
        />
      )}
    </div>
  );
};

export default App;
