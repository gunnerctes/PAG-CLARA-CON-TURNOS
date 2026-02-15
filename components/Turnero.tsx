import { useState } from "react";
import { crearTurno } from "../services/turnosApi";

export default function Turnero() {
  const [nombre, setNombre] = useState("");
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [estado, setEstado] = useState("idle"); // idle | loading | ok | error
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEstado("loading");
    setMensaje("");

    try {
      await crearTurno({ nombre, fecha, hora });
      setEstado("ok");
      setMensaje("✅ Turno solicitado correctamente");
      setNombre("");
      setFecha("");
      setHora("");
    } catch (err) {
      setEstado("error");
      setMensaje(err.message || "❌ Error al solicitar turno");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "0 auto" }}>
      <h2>Solicitar turno</h2>

      <form onSubmit={handleSubmit}>
        <label>
          Nombre
          <input
            type="text"
            value={nombre}
            required
            onChange={(e) => setNombre(e.target.value)}
          />
        </label>

        <label>
          Fecha
          <input
            type="date"
            value={fecha}
            required
            onChange={(e) => setFecha(e.target.value)}
          />
        </label>

        <label>
          Hora
          <input
            type="time"
            value={hora}
            required
            onChange={(e) => setHora(e.target.value)}
          />
        </label>

        <button type="submit" disabled={estado === "loading"}>
          {estado === "loading" ? "Enviando..." : "Confirmar turno"}
        </button>
      </form>

      {mensaje && <p>{mensaje}</p>}
    </div>
  );
}
