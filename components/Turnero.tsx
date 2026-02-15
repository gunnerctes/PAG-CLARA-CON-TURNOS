"use client";

import { useEffect, useState } from "react";

const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbwOxVAgpILcNVpTiKEui4GB1OthNJaaYWeMSVIwQVPlL8gLqmqmoV14GFDfacZV9DOaAA/exec";

type Horario = {
  hora: string;
  disponible: boolean;
};

type TurneroProps = {
  onClose: () => void;
  onSuccess: () => void;
};

export default function Turnero({ onClose, onSuccess }: TurneroProps) {
  const [fecha, setFecha] = useState("");
  const [horarios, setHorarios] = useState<Horario[]>([]);
  const [mensajeDia, setMensajeDia] = useState("");
  const [horaSeleccionada, setHoraSeleccionada] = useState("");
  const [loading, setLoading] = useState(false);
  const [enviando, setEnviando] = useState(false);

  useEffect(() => {
    if (!fecha) return;

    setLoading(true);
    setMensajeDia("");
    setHorarios([]);
    setHoraSeleccionada("");

    fetch(`${SCRIPT_URL}?action=horarios&fecha=${fecha}`)
      .then(res => res.json())
      .then(data => {
        if (!data.diaValido) {
          setMensajeDia(data.mensaje || "Día sin atención médica");
        } else {
          setHorarios(data.horarios || []);
        }
      })
      .catch(() => setMensajeDia("Error al consultar horarios"))
      .finally(() => setLoading(false));
  }, [fecha]);

  function confirmarTurno() {
    if (!fecha || !horaSeleccionada || mensajeDia) return;

    setEnviando(true);

    fetch(SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nombre: "Paciente prueba",
        telefono: "000000000",
        fechaISO: `${fecha}T${horaSeleccionada}:00`
      })
    })
      .then(res => res.json())
      .then(data => {
        if (!data.ok) {
          alert(data.mensaje);
          return;
        }
        onSuccess();
        onClose();
      })
      .catch(() => alert("Error de servidor"))
      .finally(() => setEnviando(false));
  }

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl p-6 w-full max-w-md relative">
        <button onClick={onClose} className="absolute top-3 right-3">✕</button>

        <h2 className="text-xl font-bold mb-4">Turnos médicos</h2>

        <input
          type="date"
          value={fecha}
          onChange={e => setFecha(e.target.value)}
          className="w-full border p-2 rounded mb-3"
        />

        {mensajeDia && <p className="text-red-600">{mensajeDia}</p>}
        {loading && <p>Cargando horarios…</p>}

        <div className="flex flex-wrap gap-2 mt-3">
          {horarios.map(h => (
            <button
              key={h.hora}
              disabled={!h.disponible}
              onClick={() => setHoraSeleccionada(h.hora)}
              className={`px-3 py-2 rounded ${
                !h.disponible
                  ? "bg-gray-300"
                  : h.hora === horaSeleccionada
                  ? "bg-green-600 text-white"
                  : "bg-gray-200"
              }`}
            >
              {h.hora}
            </button>
          ))}
        </div>

        <button
          onClick={confirmarTurno}
          disabled={!horaSeleccionada || enviando}
          className="mt-4 w-full bg-blue-600 text-white py-3 rounded"
        >
          {enviando ? "Confirmando…" : "Confirmar turno"}
        </button>
      </div>
    </div>
  );
}
