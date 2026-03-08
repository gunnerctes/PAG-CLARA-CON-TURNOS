import { useState } from "react";
import Turnero from "./components/Turnero";

export default function App() {
  const [mostrarTurnero, setMostrarTurnero] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">

      {/* NAVBAR */}
      <nav className="fixed top-0 w-full bg-white shadow p-4 z-10 flex justify-between items-center">
        <span className="font-bold text-lg">
          Dra. Balbuena María Clara
        </span>

        <button
          onClick={() => setMostrarTurnero(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Sacar Turno
        </button>
      </nav>

      {/* HERO */}
      <section className="pt-28 text-center px-6">

        <h1 className="text-4xl font-bold mb-4 text-gray-800">
          Consultorio Médico
        </h1>

        <p className="text-lg text-gray-600 max-w-xl mx-auto mb-8">
          Atención médica profesional con sistema online para solicitar
          turnos de manera rápida y segura.
        </p>

        <button
          onClick={() => setMostrarTurnero(true)}
          className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-700"
        >
          Solicitar Turno Ahora
        </button>

      </section>

      {/* SERVICIOS */}
      <section className="mt-20 grid md:grid-cols-3 gap-6 px-10 max-w-6xl mx-auto">

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="font-bold text-lg mb-2">Atención personalizada</h3>
          <p className="text-gray-600">
            Cada paciente recibe atención médica dedicada y profesional.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="font-bold text-lg mb-2">Turnos online</h3>
          <p className="text-gray-600">
            Sistema automático conectado con agenda médica.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="font-bold text-lg mb-2">Agenda organizada</h3>
          <p className="text-gray-600">
            Los turnos se registran automáticamente en el sistema.
          </p>
        </div>

      </section>

      {/* FOOTER */}
      <footer className="mt-24 text-center text-gray-500 pb-10">
        © {new Date().getFullYear()} Consultorio Dra. Balbuena
      </footer>

      {mostrarTurnero && (
        <Turnero
          onClose={() => setMostrarTurnero(false)}
          onSuccess={() => setMostrarTurnero(false)}
        />
      )}

    </div>
  );
}