import { useEffect, useState } from "react";

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
  const [hora, setHora] = useState("");
  const [horariosDisponibles, setHorariosDisponibles] = useState<string[]>([]);
  const [mensaje, setMensaje] = useState("");
  const [tipoMensaje, setTipoMensaje] = useState<TipoMensaje>("");

  // =====================
  // REGLAS DE ATENCIÓN
  // =====================
  const esDiaHabil = (date: Date) => {
    const d = date.getDay();
    return d === 1 || d === 2 || d === 4; // Lunes, Martes, Jueves
  };

  const generarHorarios = () => {
    const horarios: string[] = [];
    let minutos = 18 * 60;      // 18:00
    const fin = 20 * 60 + 10;   // 20:10

    while (minutos <= fin) {
      const h = String(Math.floor(minutos / 60)).padStart(2, "0");
      const m = String(minutos % 60).padStart(2, "0");
      horarios.push(`${h}:${m}`);
      minutos += 20;
    }

    return horarios;
  };

  // =====================
  // CUANDO CAMBIA FECHA
  // =====================
  useEffect(() => {
    setHora("");
    setMensaje("");
    setTipoMensaje("");

    if (!fecha) {
      setHorariosDisponibles([]);
      return;
    }

    const date = new Date(fecha);

    if (!esDiaHabil(date)) {
      setMensaje("Día de atención inválido");
      setTipoMensaje("error");
      setHorariosDisponibles([]);
      return;
    }

    setHorariosDisponibles(generarHorarios());
  }, [fecha]);

  // =====================
  // ENVÍO
  // =====================
  const enviarTurno = async () => {
    if (!nombre || !telefono || !fecha || !hora) {
      setMensaje("Completá todos los campos obligatorios");
      setTipoMensaje("warning");
      return;
    }

    const fechaFinal = `${fecha}T${hora}`;

    try {
      const res = await fetch(
        "https://script.google.com/macros/s/AKfycbyC1Kg195JUcnpyhUZiGUunyzLwm-KSdZVZM08rY4bnK8jcX2IEH1w7-8oXF0ZM-DdB9g/exec",
        {
          method: "POST",
          body: new URLSearchParams({
            nombre,
            telefono,
            email,
            fecha: fechaFinal
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

        <button onClick={onClose} className="absolute top-2 right-2 text-xl">
          ✕
        </button>

        <h2 className="text-xl font-bold mb-2 text-center">
          Solicitar turno
        </h2>

        <p className="text-sm text-gray-600 text-center mb-4">
          📅 Atención: <b>Lunes, Martes y Jueves</b><br />
          🕒 Horario: <b>18:00 a 20:10</b> — turnos cada <b>20 minutos</b>
        </p>

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
          type="date"
          value={fecha}
          onChange={e => setFecha(e.target.value)}
          className="border p-2 w-full mb-2"
        />

        {horariosDisponibles.length > 0 && (
          <select
            value={hora}
            onChange={e => setHora(e.target.value)}
            className="border p-2 w-full mb-4"
          >
            <option value="">Seleccioná un horario</option>
            {horariosDisponibles.map(h => (
              <option key={h} value={h}>{h}</option>
            ))}
          </select>
        )}

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
