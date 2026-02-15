"use client";

import { useState } from "react";
import Turnero from "./components/Turnero";

export default function App() {
  const [mostrarTurnero, setMostrarTurnero] = useState(false);

  return (
    <div className="min-h-screen">
      <nav className="fixed top-0 w-full bg-white shadow p-4 z-10 flex justify-between">
        <span className="font-bold">Dra. Balbuena María Clara</span>
        <button
          onClick={() => setMostrarTurnero(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Sacar Turno
        </button>
      </nav>

      <main className="pt-24 flex justify-center">
        <button
          onClick={() => setMostrarTurnero(true)}
          className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold"
        >
          Solicitar Turno Ahora
        </button>
      </main>

      {mostrarTurnero && (
        <Turnero
          onClose={() => setMostrarTurnero(false)}
          onSuccess={() => setMostrarTurnero(false)}
        />
      )}
    </div>
  );
}
