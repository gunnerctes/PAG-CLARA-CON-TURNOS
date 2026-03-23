"use client";

import { useEffect, useState } from "react";

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbybqlqepXUe8ACUQwfb8s9sfrOsYfjLMQ0NRAWUvwaGrVEdjEuYjEYdo9eaiX6VETQXoQ/exec";

type Horario = {
  hora: string;
  disponible: boolean;
};

export default function Turnero({ onClose = () => {}, onSuccess = () => {} }) {

  const [fecha,setFecha] = useState("");
  const [horarios,setHorarios] = useState<Horario[]>([]);
  const [horaSeleccionada,setHoraSeleccionada] = useState("");

  const [nombre,setNombre] = useState("");
  const [dni,setDni] = useState("");
  const [obraSocial,setObraSocial] = useState("");
  const [telefono,setTelefono] = useState("");
  const [motivo,setMotivo] = useState("");

  const [mensajeDia,setMensajeDia] = useState("");
  const [loading,setLoading] = useState(false);
  const [enviando,setEnviando] = useState(false);

  // =========================
  // CARGA HORARIOS
  // =========================
  useEffect(()=>{

    if(!fecha) return;

    setLoading(true);
    setHorarios([]);
    setHoraSeleccionada("");
    setMensajeDia("");

    fetch(`${SCRIPT_URL}?action=horarios&fecha=${fecha}`)
    .then(res=>res.json())
    .then(data=>{

      if(!data.diaValido){
        setMensajeDia(data.mensaje || "Este día no hay atención");
        return;
      }

      setHorarios(data.horarios);

    })
    .catch(()=>{
      setMensajeDia("Error consultando horarios");
    })
    .finally(()=>setLoading(false));

  },[fecha]);

  // =========================
  // VALIDACIONES
  // =========================
  function validar(){

    if(!nombre.trim() || nombre.trim().split(" ").length < 2){
      alert("Ingrese nombre y apellido");
      return false;
    }

    if(!dni || dni.length < 7){
      alert("DNI inválido");
      return false;
    }

    if(!telefono || telefono.length < 8){
      alert("Teléfono inválido");
      return false;
    }

    if(!horaSeleccionada){
      alert("Seleccione un horario");
      return false;
    }

    return true;
  }

  // =========================
  // CONFIRMAR TURNO
  // =========================
  async function confirmarTurno(){

    if(!validar()) return;

    setEnviando(true);

    try{

      const res = await fetch(SCRIPT_URL,{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          nombre,
          dni,
          obraSocial,
          telefono,
          motivo,
          fechaISO:`${fecha}T${horaSeleccionada}:00`
        })
      });

      const data = await res.json();

      if(data.ok){

        alert("✅ Turno confirmado correctamente");

        onSuccess();

      }else{

        alert(data.mensaje);

      }

    }catch{

      alert("Error de conexión");

    }

    setEnviando(false);

  }

  // =========================
  // UI
  // =========================
  return(

<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

<div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-lg">

<h2 className="text-xl font-bold mb-4">Solicitar turno</h2>

<input
type="date"
value={fecha}
onChange={e=>setFecha(e.target.value)}
className="border p-2 w-full mb-3"
/>

{mensajeDia && <p className="text-red-500 mb-3">{mensajeDia}</p>}
{loading && <p className="mb-3">Cargando horarios...</p>}

<div className="flex flex-wrap gap-2 mb-4">

{horarios.map(h=>(

<button
key={h.hora}
disabled={!h.disponible}
onClick={()=>setHoraSeleccionada(h.hora)}
className={`px-3 py-2 rounded border ${
  !h.disponible
    ? "bg-gray-300 cursor-not-allowed"
    : horaSeleccionada === h.hora
    ? "bg-blue-600 text-white"
    : "bg-white"
}`}
>
{h.hora}
</button>

))}

</div>

<input
placeholder="Nombre y apellido"
value={nombre}
onChange={e=>setNombre(e.target.value)}
className="border p-2 w-full mb-2"
/>

<input
placeholder="DNI"
value={dni}
onChange={e=>setDni(e.target.value)}
className="border p-2 w-full mb-2"
/>

<input
placeholder="Obra social"
value={obraSocial}
onChange={e=>setObraSocial(e.target.value)}
className="border p-2 w-full mb-2"
/>

<input
placeholder="Teléfono"
value={telefono}
onChange={e=>setTelefono(e.target.value)}
className="border p-2 w-full mb-2"
/>

<textarea
placeholder="Motivo de consulta"
value={motivo}
onChange={e=>setMotivo(e.target.value)}
className="border p-2 w-full mb-4"
/>

<div className="flex gap-2">

<button
onClick={confirmarTurno}
disabled={enviando}
className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
>
{enviando ? "Guardando..." : "Confirmar turno"}
</button>

<button
onClick={onClose}
className="bg-gray-300 px-4 py-2 rounded"
>
Cancelar
</button>

</div>

</div>

</div>

  );

}