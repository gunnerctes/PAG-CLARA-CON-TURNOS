import { useState } from "react";

type TurneroProps = {
  onSuccess: () => void;
  onClose: () => void;
};

export default function Turnero({ onSuccess, onClose }: TurneroProps) {
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [fecha, setFecha] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [loading, setLoading] = useState(false);

  const enviarTurno = async () => {
    if (!nombre || !telefono || !fecha) {
      setMensaje("Completá todos los campos");
      return;
    }

    setLoading(true);
    setMensaje("");

    try {
      const res = await fetch(
        "https://script.google.com/macros/s/AKfycbxoRsXOB2c8fevVAuc7EgWcqObaw3-nAhH6ICt90VEl40w7t8_UyISV9jQuf1vGH7ck/exec",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            nombre,
            telefono,
            fecha
          })
        }
      );

      const data = await res.json();

      setMensaje(data.mensaje);

      if (data.mensaje === "Turno confirmado") {
        onSuccess();
        setTimeout(onClose, 1500);
      }

    } catch (error) {
      console.error(error);
      setMensaje("Error al solicitar turno");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-full max-w-md relative">
        <button onClick={onClose} className="absolute top-2 right-2">✕</button>

        <h2 className="text-xl font-bold mb-4 text-center">
          Solicitar turno
        </h2>

        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={e => setNombre(e.target.value)}
          className="border p-2 w-full mb-2"
        />

        <input
          type="tel"
          placeholder="Teléfono"
          value={telefono}
          onChange={e => setTelefono(e.target.value)}
          className="border p-2 w-full mb-2"
        />

        <input
          type="datetime-local"
          value={fecha}
          onChange={e => setFecha(e.target.value)}
          className="border p-2 w-full mb-4"
        />

        <button
          onClick={enviarTurno}
          disabled={loading}
          className="bg-blue-600 text-white w-full py-2 rounded disabled:opacity-50"
        >
          {loading ? "Reservando..." : "Reservar turno"}
        </button>

        {mensaje && (
          <p className="text-center text-sm mt-3">{mensaje}</p>
        )}
      </div>
    </div>
  );
}
