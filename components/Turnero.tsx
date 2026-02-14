import { useState } from "react";

type TurneroProps = {
  onSuccess: () => void;
  onClose: () => void;
};

type TipoMensaje = "ok" | "error" | "warning" | "";

export default function Turnero({ onSuccess, onClose }: TurneroProps) {
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [fecha, setFecha] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [tipoMensaje, setTipoMensaje] = useState<TipoMensaje>("");

  // =========================
  // VALIDACIONES DE ATENCIÓN
  // =========================
  const esDiaHabil = (date: Date) => {
    const dia = date.getDay(); // 0=Domingo
    return dia === 1 || dia === 2 || dia === 4; // Lunes, Martes, Jueves
  };

  const esHorarioHabil = (date: Date) => {
    const minutos = date.getHours() * 60 + date.getMinutes();
    const inicio = 18 * 60;      // 18:00
    const fin = 20 * 60 + 10;    // último turno 20:10

    if (minutos < inicio || minutos > fin) return false;
    if (minutos % 20 !== 0) return false;

    return true;
  };

  const enviarTurno = async () => {
    if (!nombre || !telefono || !fecha) {
      setMensaje("Completá todos los campos obligatorios");
      setTipoMensaje("warning");
      return;
    }

    const fechaObj = new Date(fecha);

    if (!esDiaHabil(fechaObj)) {
      setMensaje("Día de atención inválido");
      setTipoMensaje("error");
      return;
    }

    if (!esHorarioHabil(fechaObj)) {
      setMensaje("Horario fuera del rango de atención");
      setTipoMensaje("warning");
      return;
    }

    try {
      const res = await fetch(
        "https://script.google.com/macros/s/AKfycbyC1Kg195JUcnpyhUZiGUunyzLwm-KSdZVZM08rY4bnK8jcX2IEH1w7-8oXF0ZM-DdB9g/exec",
        {
          method: "POST",
          body: new URLSearchParams({
            nombre,
            telefono,
            email,
            fecha
          })
        }
      );

      const data = await res.json();
      setMensaje(data.mensaje);

      if (data.mensaje === "Turno confirmado") {
        setTipoMensaje("ok");
        onSuccess();
        setTimeout(onClose, 1500);
      } else if (data.mensaje === "Horario no disponible") {
        setTipoMensaje("error");
      } else {
        setTipoMensaje("warning");
      }

    } catch (err) {
      console.error(err);
      setMensaje("Error al solicitar turno");
      setTipoMensaje("error");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-full max-w-md relative">

        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-xl"
        >
          ✕
        </button>

        <h2 className="text-xl font-bold mb-4 text-center">
          Solicitar turno
        </h2>

        <input
          type="text"
          placeholder="Nombre y apellido"
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
          type="email"
          placeholder="Email (opcional)"
          value={email}
          onChange={e => setEmail(e.target.value)}
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
          className="bg-blue-600 text-white w-full py-2 rounded"
        >
          Reservar turno
        </button>

        {mensaje && (
          <p
            className={`text-center text-base font-semibold mt-4 p-3 rounded
              ${
                tipoMensaje === "ok"
                  ? "bg-green-100 text-green-700"
                  : tipoMensaje === "error"
                  ? "bg-red-100 text-red-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
          >
            {mensaje}
          </p>
        )}

      </div>
    </div>
  );
}
