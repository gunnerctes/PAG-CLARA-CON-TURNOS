"use client";

import { useEffect, useState } from "react";

const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbwOxVAgpILcNVpTiKEui4GB1OthNJaaYWeMSVIwQVPlL8gLqmqmoV14GFDfacZV9DOaAA/exec";

type Horario = {
  hora: string;
  disponible: boolean;
};

export default function Turnero() {
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
      .then(data => alert(data.mensaje))
      .catch(() => alert("Error de servidor"))
      .finally(() => setEnviando(false));
  }

  return (
    <div style={{ maxWidth: 400 }}>
      <h2>Turnos médicos</h2>

      <input
        type="date"
        value={fecha}
        onChange={e => setFecha(e.target.value)}
      />

      {mensajeDia && <p style={{ color: "red" }}>{mensajeDia}</p>}

      {loading && <p>Cargando horarios…</p>}

      {!mensajeDia && (
        <div style={{ marginTop: 10 }}>
          {horarios.map(h => (
            <button
              key={h.hora}
              disabled={!h.disponible}
              onClick={() => setHoraSeleccionada(h.hora)}
              style={{
                margin: 4,
                background: !h.disponible
                  ? "#bdbdbd"
                  : h.hora === horaSeleccionada
                  ? "#4caf50"
                  : "#e0e0e0",
                cursor: h.disponible ? "pointer" : "not-allowed"
              }}
            >
              {h.hora}
            </button>
          ))}
        </div>
      )}

      <button
        onClick={confirmarTurno}
        disabled={!horaSeleccionada || enviando}
        style={{ marginTop: 10 }}
      >
        {enviando ? "Confirmando…" : "Confirmar turno"}
      </button>
    </div>
  );
}
