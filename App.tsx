"use client";

import { useState } from "react";
import Turnero from "./components/Turnero";
import ChatAssistant from "./components/ChatAssistant";

const App: React.FC = () => {
  const [mostrarTurnero, setMostrarTurnero] = useState(false);

  return (
    <div className="min-h-screen flex flex-col relative">
      <nav className="fixed top-0 w-full z-40 py-4 px-6 flex justify-between items-center">
        <span className="font-bold">Dra. Balbuena María Clara</span>

        <button
          className="bg-blue-600 text-white px-6 py-2 rounded-full"
          onClick={() => setMostrarTurnero(true)}
        >
          Sacar Turno
        </button>
      </nav>

      <main className="pt-32 px-6">
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
          onSuccess={() => alert("Turno confirmado")}
        />
      )}
    </div>
  );
};

export default App;
