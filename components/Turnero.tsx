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
  const [horarios, setHorarios] = useState<string[]>([]);
  const [mensaje, setMensaje] = useState("");
  const [tipoMensaje, setTipoMensaje] = useState<TipoMensaje>("");

  const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbx2ojeuC5bQ8rfLB2tw7cJTO7ECbwG0WBNRrDqaa6e592EV-7Sn-ZhPY9bhfvXxEl-LfA/exec";

  // =====================
  // CUANDO CAMBIA LA FECHA
  // =====================
  useEffect(() => {
    setHora("");
    setMensaje("");
    setTipoMensaje("");
    setHorarios([]);

    if (!fecha) return;

    fetch(`${SCRIPT_URL}?action=horarios&fecha=${fecha}`)
      .then(res => res.json())
      .then(data => {
        if (data.length === 0) {
          setMensaje("Día de atención inválido o sin horarios disponibles");
          setTipoMensaje("error");
        } else {
          setHorarios(data);
        }
      })
      .catch(() => {
        setMensaje("Error al obtener horarios");
        setTipoMensaje("error");
      });

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
      const res = await fetch(SCRIPT_URL, {
        method: "POST",
        body: new URLSearchParams({
          nombre,
          telefono,
          email,
          fecha: fechaFinal
        })
      });

      const data = await res.json();
      setMensaje(data.mensaje);

      if (data.mensaje === "Turno confirmado") {
        setTipoMensaje("ok");
        onSuccess();
        setTimeout(onClose, 1500);
      } else {
        setTipoMensaje("error");
      }

    } catch {
      setMensaje("Error al solicitar turno");
      setTipoMensaje("error");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-full max-w-md relative">

        <button onClick={onClose} className="absolute top-2 right-2 text-xl">✕</button>

        <h2 className="text-xl font-bold text-center mb-2">Solicitar turno</h2>

        <p className="text-sm text-center text-gray-600 mb-4">
          Atención: <b>Lunes, Martes y Jueves</b><br />
          Horarios: <b>18:00 a 20:10</b> — turnos cada <b>20 min</b>
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

        {horarios.length > 0 && (
          <select
            value={hora}
            onChange={e => setHora(e.target.value)}
            className="border p-2 w-full mb-4"
          >
            <option value="">Seleccioná un horario</option>
            {horarios.map(h => (
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
          <p className={`mt-4 p-3 rounded text-center font-semibold
            ${tipoMensaje === "ok" ? "bg-green-100 text-green-700" :
              tipoMensaje === "error" ? "bg-red-100 text-red-700" :
              "bg-yellow-100 text-yellow-700"}`}>
            {mensaje}
          </p>
        )}

      </div>
    </div>
  );
}
