import { useState } from "react";

type TurnoData = {
  nombre: string;
  email: string;
  fecha: string;
  hora: string;
};

const HORARIOS = [
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "15:00",
  "16:00",
  "17:00",
];

export default function Turnero() {
  const [form, setForm] = useState<TurnoData>({
    nombre: "",
    email: "",
    fecha: "",
    hora: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [ok, setOk] = useState<string | null>(null);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(null);
    setOk(null);
  }

  function validarDia(fecha: string) {
    const date = new Date(fecha);
    const dia = date.getDay(); // 0 domingo - 6 sábado

    const diasAtencion = [1, 2, 3, 4, 5]; // lunes a viernes

    return diasAtencion.includes(dia);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!form.nombre || !form.email || !form.fecha || !form.hora) {
      setError("Completá todos los campos");
      return;
    }

    if (!validarDia(form.fecha)) {
      setError("Día sin atención");
      return;
    }

    // SIMULACIÓN OK (no backend todavía)
    setOk("Turno solicitado correctamente");
    setForm({
      nombre: "",
      email: "",
      fecha: "",
      hora: "",
    });
  }

  return (
    <div style={{ maxWidth: 400, margin: "0 auto" }}>
      <h2>Solicitar turno</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={form.nombre}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />

        <input
          type="date"
          name="fecha"
          value={form.fecha}
          onChange={handleChange}
        />

        <select
          name="hora"
          value={form.hora}
          onChange={handleChange}
        >
          <option value="">Seleccionar horario</option>
          {HORARIOS.map((h) => (
            <option key={h} value={h}>
              {h}
            </option>
          ))}
        </select>

        <button type="submit">Solicitar turno</button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {ok && <p style={{ color: "green" }}>{ok}</p>}
    </div>
  );
}
