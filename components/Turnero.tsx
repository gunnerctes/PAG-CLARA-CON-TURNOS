"use client";

import { useEffect, useState } from "react";

const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbwOxVAgpILcNVpTiKEui4GB1OthNJaaYWeMSVIwQVPlL8gLqmqmoV14GFDfacZV9DOaAA/exec";

type Horario = {
  hora: string;
  disponible: boolean;
};

type TurneroProps = {
  onSuccess: () => void;
  onClose: () => void;
};

export default function Turnero({ onSuccess, onClose }: TurneroProps) {
  const [fecha, setFecha] = useState("");
  const [horarios, setHorarios] = useState<Horario[]>([]);
  const [mensajeDia, setMensajeDia] = useState("");
  const [horaSeleccionada, setHoraSeleccionada] = useState("");
  const [loading, setLoading] = useState(false);
  const [enviando, setEnviando] = useState(false);

  useEffect(() => {
    if (!fecha) return;

    setLoading(true);
    setHorarios([]);
    setHoraSeleccionada("");
    setMensajeDia("");

    fetch(`${SCRIPT_URL}?action=horarios&fecha=${fecha}`)
      .then(res => res.json())
      .then(data => {
        if (!data.diaValido) {
          setMensajeDia(data.mensaje || "Día sin atención médica");
          setHorarios([]);
        } else {
          setHorarios(data.horarios || []);
        }
      })
      .catch(() => {
        setMensajeDia("Error al consultar horarios");
      })
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
        fecha: `${fecha}T${horaSeleccionada}:00`
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.ok) {
          onSuccess();
          onClose();
        } else {
          alert(data.mensaje);
        }
      })
      .catch(() => alert("Error de servidor"))
      .finally(() => setEnviando(false));
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Turnos médicos</h2>

        <input
          type="date"
          value={fecha}
          onChange={e => setFecha(e.target.value)}
          className="border p-2 w-full mb-3"
        />

        {mensajeDia && <p className="text-red-600 mb-2">{mensajeDia}</p>}
        {loading && <p>Cargando horarios…</p>}

        {!mensajeDia && (
          <div className="flex flex-wrap gap-2 my-3">
            {horarios.map(h => (
              <button
                key={h.hora}
                disabled={!h.disponible}
                onClick={() => setHoraSeleccionada(h.hora)}
                className={`px-3 py-2 rounded text-sm ${
                  !h.disponible
                    ? "bg-gray-300 cursor-not-allowed"
                    : h.hora === horaSeleccionada
                    ? "bg-green-500 text-white"
                    : "bg-gray-200"
                }`}
              >
                {h.hora}
              </button>
            ))}
          </div>
        )}

        <div className="flex justify-between mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-300"
          >
            Cancelar
          </button>

          <button
            onClick={confirmarTurno}
            disabled={!horaSeleccionada || enviando}
            className="px-4 py-2 rounded bg-blue-600 text-white disabled:opacity-50"
          >
            {enviando ? "Confirmando…" : "Confirmar turno"}
          </button>
        </div>
      </div>
    </div>
  );
}
