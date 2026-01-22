import { useState } from "react";

export default function Turnero() {
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [fecha, setFecha] = useState("");
  const [mensaje, setMensaje] = useState("");

  const enviarTurno = async () => {
    if (!nombre || !telefono || !fecha) {
      setMensaje("Completá todos los campos");
      return;
    }

    try {
      const res = await fetch("PEGAR_URL_GOOGLE_SCRIPT_AQUI", {
        method: "POST",
        body: JSON.stringify({ nombre, telefono, fecha }),
        headers: { "Content-Type": "application/json" }
      });

      const data = await res.json();
      setMensaje(data.mensaje);
    } catch {
      setMensaje("Error al solicitar turno");
    }
  };

  return (
    <section>
      <h2>Solicitar turno</h2>

      <input
        type="text"
        placeholder="Nombre y apellido"
        value={nombre}
        onChange={e => setNombre(e.target.value)}
      />

      <input
        type="tel"
        placeholder="Teléfono"
        value={telefono}
        onChange={e => setTelefono(e.target.value)}
      />

      <input
        type="datetime-local"
        value={fecha}
        onChange={e => setFecha(e.target.value)}
      />

      <button onClick={enviarTurno}>
        Reservar turno
      </button>

      {mensaje && <p>{mensaje}</p>}
    </section>
  );
}
