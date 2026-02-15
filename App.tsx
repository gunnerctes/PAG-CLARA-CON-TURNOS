"use client";

import { useState } from "react";
import Turnero from "./components/Turnero";
import ChatAssistant from "./components/ChatAssistant";

const App: React.FC = () => {
  const [mostrarTurnero, setMostrarTurnero] = useState(false);

  return (
    <div className="min-h-screen bg-white text-black">
      {/* NAV SIMPLE Y SEGURA */}
      <nav className="w-full bg-blue-600 text-white py-4 px-6 flex justify-between items-center">
        <span className="font-bold">Dra. Balbuena María Clara</span>

        <button
          onClick={() => setMostrarTurnero(true)}
          className="bg-white text-blue-600 px-4 py-2 rounded"
        >
          Sacar Turno
        </button>
      </nav>

      {/* CONTENIDO */}
      <main className="p-6">
        <button
          onClick={() => setMostrarTurnero(true)}
          className="bg-blue-600 text-white px-6 py-3 rounded font-bold"
        >
          Solicitar Turno Ahora
        </button>
      </main>

      <ChatAssistant />

      {mostrarTurnero && (
        <Turnero
          onClose={() => setMostrarTurnero(false)}
          onSuccess={() => alert("Turno confirmado")}
        />
      )}
    </div>
  );
};

export default App;
