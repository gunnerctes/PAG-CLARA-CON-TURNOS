"use client";

import { useEffect, useState } from "react";

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwVlxDvg0kkRQ_ovzPSK2pIpajiLnOArCCwGwMCyTPbP8-B8is_cFZISYgsXowhuzQtXg/exec"; // 👈 ACÁ VA TU URL

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
        setHorarios([]);
        return;
      }

      setHorarios(data.horarios);

    })
    .catch(()=>{
      setMensajeDia("Error consultando horarios");
      setHorarios([]);
    })
    .finally(()=>setLoading(false));

  },[fecha]);

  async function confirmarTurno(){

    if(!horaSeleccionada){
      alert("Seleccione un horario");
      return;
    }

    if(!nombre || !telefono){
      alert("Complete nombre y teléfono");
      return;
    }

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
        alert("Turno confirmado");
        onSuccess();
      }else{
        alert(data.mensaje);
      }

    }catch{
      alert("Error de conexión");
    }

    setEnviando(false);

  }

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
  horaSeleccionada === h.hora
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
Confirmar turno
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