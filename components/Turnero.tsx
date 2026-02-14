import { useEffect, useState } from "react";

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwOxVAgpILcNVpTiKEui4GB1OthNJaaYWeMSVIwQVPlL8gLqmqmoV14GFDfacZV9DOaAA/exec";

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

  useEffect(() => {
    if (!fecha) return;

    setLoading(true);
    setHorarios([]);
    setHoraSeleccionada("");

    fetch(`${SCRIPT_URL}?action=horarios&fecha=${fecha}`)
      .then(res => res.json())
      .then(data => {
        if (!data.diaValido) {
          setMensajeDia(data.mensaje || "Día sin atención médica");
          setHorarios([]);
        } else {
          setMensajeDia("");
          setHorarios(data.horarios);
        }
      })
      .finally(() => setLoading(false));
  }, [fecha]);

  function confirmarTurno() {
    if (!fecha || !horaSeleccionada) return;

    const fechaISO = new Date(`${fecha}T${horaSeleccionada}:00`).toISOString();

    fetch(SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nombre: "Paciente prueba",
        telefono: "000000000",
        fechaISO
      })
    })
      .then(res => res.json())
      .then(data => alert(data.mensaje));
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

      <div>
        {horarios.map(h => (
          <button
            key={h.hora}
            disabled={!h.disponible}
            style={{
              margin: 4,
              background: h.disponible
                ? h.hora === horaSeleccionada ? "#4caf50" : "#e0e0e0"
                : "#bdbdbd",
              cursor: h.disponible ? "pointer" : "not-allowed"
            }}
            onClick={() => setHoraSeleccionada(h.hora)}
          >
            {h.hora}
          </button>
        ))}
      </div>

      <button
        onClick={confirmarTurno}
        disabled={!horaSeleccionada}
        style={{ marginTop: 10 }}
      >
        Confirmar turno
      </button>
    </div>
  );
}
