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

  const SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbyrKOF0AWwpJAAnAIUMJ_XmcTCL8KuCyl83hOmMVA5qPzQ4_hCrwwaAZOjeZl5nMnklEw/exec";

  const esDiaHabil = (fechaISO: string) => {
    const [y, m, d] = fechaISO.split("-").map(Number);
    const date = new Date(y, m - 1, d);
    return [1, 2, 4].includes(date.getDay());
  };

  const generarHorariosBase = () => {
    const horarios: string[] = [];
    let min = 18 * 60;
    const fin = 20 * 60 + 10;

    while (min <= fin) {
      horarios.push(
        `${String(Math.floor(min / 60)).padStart(2, "0")}:${String(min % 60).padStart(2, "0")}`
      );
      min += 20;
    }
    return horarios;
  };

  useEffect(() => {
    setHora("");
    setMensaje("");
    setTipoMensaje("");

    if (!fecha) {
      setHorariosDisponibles([]);
      return;
    }

    if (!esDiaHabil(fecha)) {
      setMensaje("Día de atención inválido");
      setTipoMensaje("error");
      setHorariosDisponibles([]);
      return;
    }

    const cargarHorarios = async () => {
      const res = await fetch(
        `${SCRIPT_URL}?modo=horarios&fecha=${fecha}`
      );
      const data = await res.json();

      const ocupados: string[] = data.ocupados || [];
      const base = generarHorariosBase();
      const libres = base.filter(h => !ocupados.includes(h));

      setHorariosDisponibles(libres);
    };

    cargarHorarios();
  }, [fecha]);

  const enviarTurno = async () => {
    if (!nombre || !telefono || !fecha || !hora) {
      setMensaje("Completá todos los campos obligatorios");
      setTipoMensaje("warning");
      return;
    }

    try {
      const res = await fetch(SCRIPT_URL, {
        method: "POST",
        body: new URLSearchParams({
          nombre,
          telefono,
          email,
          fecha: `${fecha}T${hora}`
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

        <p className="text-sm text-gray-600 text-center mb-4">
          Atención: <b>Lunes, Martes y Jueves</b><br />
          Turnos cada <b>20 minutos</b> de <b>18:00 a 20:10</b>
        </p>

        <input className="border p-2 w-full mb-2" placeholder="Nombre" value={nombre} onChange={e => setNombre(e.target.value)} />
        <input className="border p-2 w-full mb-2" placeholder="Teléfono" value={telefono} onChange={e => setTelefono(e.target.value)} />
        <input className="border p-2 w-full mb-2" placeholder="Email (opcional)" value={email} onChange={e => setEmail(e.target.value)} />
        <input type="date" className="border p-2 w-full mb-2" value={fecha} onChange={e => setFecha(e.target.value)} />

        {horariosDisponibles.length > 0 && (
          <select className="border p-2 w-full mb-3" value={hora} onChange={e => setHora(e.target.value)}>
            <option value="">Seleccioná horario</option>
            {horariosDisponibles.map(h => <option key={h}>{h}</option>)}
          </select>
        )}

        <button onClick={enviarTurno} className="bg-blue-600 text-white w-full py-2 rounded">
          Reservar turno
        </button>

        {mensaje && (
          <p className={`mt-4 p-3 text-center font-semibold rounded
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
