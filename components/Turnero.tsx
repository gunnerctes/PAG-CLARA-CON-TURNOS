import { useState } from "react";

type TurnoData = {
  nombre: string;
  email: string;
  telefono: string;
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
    telefono: "",
    fecha: "",
    hora: "",
  });

  const [mensaje, setMensaje] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMensaje(null);

    // Simulación segura (NO backend)
    setTimeout(() => {
      setLoading(false);
      setMensaje("✅ Turno solicitado correctamente");
      setForm({
        nombre: "",
        email: "",
        telefono: "",
        fecha: "",
        hora: "",
      });
    }, 800);
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Solicitar turno</h2>

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          name="nombre"
          placeholder="Nombre completo"
          value={form.nombre}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <input
          name="telefono"
          placeholder="Teléfono"
          value={form.telefono}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <input
          name="fecha"
          type="date"
          value={form.fecha}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <select
          name="hora"
          value={form.hora}
          onChange={handleChange}
          required
          style={styles.input}
        >
          <option value="">Seleccionar horario</option>
          {HORARIOS.map((h) => (
            <option key={h} value={h}>
              {h}
            </option>
          ))}
        </select>

        <button type="submit" disabled={loading} style={styles.button}>
          {loading ? "Enviando..." : "Solicitar turno"}
        </button>

        {mensaje && <p style={styles.msg}>{mensaje}</p>}
      </form>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    maxWidth: 420,
    margin: "40px auto",
    padding: 20,
    borderRadius: 12,
    background: "#ffffff",
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
  },
  title: {
    textAlign: "center",
    marginBottom: 20,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  input: {
    padding: 10,
    borderRadius: 6,
    border: "1px solid #ccc",
    fontSize: 14,
  },
  button: {
    padding: 12,
    borderRadius: 8,
    border: "none",
    background: "#2563eb",
    color: "#fff",
    fontSize: 16,
    cursor: "pointer",
  },
  msg: {
    marginTop: 10,
    textAlign: "center",
    color: "green",
  },
};
