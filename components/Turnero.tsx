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

  const enviarTurno = async () => {
  try {
    const res = await fetch(
      "PEGÁ_ACÁ_LA_URL_NUEVA_DEL_DEPLOY",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre,
          telefono,
          fecha,
        }),
      }
    );

    if (!res.ok) throw new Error("HTTP error");

    const data = await res.json();
    setMensaje(data.mensaje || "OK");
    onSuccess();
    setTimeout(onClose, 1500);

  } catch (err) {
    console.error(err);
    setMensaje("Error al solicitar turno");
  }
};

      setMensaje("Turno solicitado con éxito");
      onSuccess();
      setTimeout(onClose, 1500);

    } catch {
      setMensaje("Error al solicitar turno");
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/50 flex items-center justify-center">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md relative shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-black text-xl"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold mb-4 text-center">
          Solicitar turno
        </h2>

        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Nombre y apellido"
            value={nombre}
            onChange={e => setNombre(e.target.value)}
            className="border rounded-lg px-3 py-2"
          />

          <input
            type="tel"
            placeholder="Teléfono"
            value={telefono}
            onChange={e => setTelefono(e.target.value)}
            className="border rounded-lg px-3 py-2"
          />

          <input
            type="datetime-local"
            value={fecha}
            onChange={e => setFecha(e.target.value)}
            className="border rounded-lg px-3 py-2"
          />

          <button
            onClick={enviarTurno}
            className="bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition"
          >
            Reservar turno
          </button>

          {mensaje && (
            <p className="text-center text-sm text-slate-600 mt-2">
              {mensaje}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
