import { useState } from "react";
import Turnero from "./components/Turnero";

export default function App() {

const [mostrarTurnero, setMostrarTurnero] = useState(false);

return (

<div className="min-h-screen bg-gray-50">

{/* NAVBAR */}

<nav className="fixed top-0 w-full bg-white shadow p-4 z-10 flex justify-between items-center">

<span className="font-bold text-lg">
Dra. Balbuena María Clara
</span>

<div className="flex gap-3">

<button
onClick={() => setMostrarTurnero(true)}
className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
>
Sacar Turno
</button>

<a
href="https://meet.google.com/"
target="_blank"
className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
>
Consulta Virtual
</a>

</div>

</nav>

{/* HERO */}

<section className="pt-28 text-center px-6">

<h1 className="text-4xl font-bold mb-4 text-gray-800">
Consultorio Médico
</h1>

<p className="text-lg text-gray-600 max-w-xl mx-auto mb-8">
Atención médica profesional con sistema de turnos online para una
gestión rápida y segura de consultas.
</p>

<button
onClick={() => setMostrarTurnero(true)}
className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-700"
>
Solicitar Turno Ahora
</button>

</section>

{/* SERVICIOS */}

<section className="mt-20 grid md:grid-cols-3 gap-6 px-10 max-w-6xl mx-auto">

<div className="bg-white p-6 rounded-xl shadow">
<h3 className="font-bold text-lg mb-2">
Atención personalizada
</h3>
<p className="text-gray-600">
Cada paciente recibe una atención médica profesional adaptada a
sus necesidades.
</p>
</div>

<div className="bg-white p-6 rounded-xl shadow">
<h3 className="font-bold text-lg mb-2">
Turnos Online
</h3>
<p className="text-gray-600">
Sistema automático que evita superposición de turnos y organiza
la agenda médica.
</p>
</div>

<div className="bg-white p-6 rounded-xl shadow">
<h3 className="font-bold text-lg mb-2">
Consulta Virtual
</h3>
<p className="text-gray-600">
Posibilidad de realizar consultas médicas virtuales mediante
videollamada.
</p>
</div>

</section>

{/* CONSULTA VIRTUAL */}

<section className="mt-24 text-center">

<h2 className="text-3xl font-bold mb-6">
Consulta Médica Virtual
</h2>

<p className="text-gray-600 mb-6 max-w-xl mx-auto">
Si preferís una consulta online, podés coordinar una videollamada
segura con la doctora.
</p>

<a
href="https://meet.google.com/"
target="_blank"
className="bg-purple-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-purple-700"
>
Agendar Consulta Virtual
</a>

</section>

{/* UBICACION */}

<section className="mt-24 px-6">

<h2 className="text-3xl font-bold text-center mb-8">
Ubicación del Consultorio
</h2>

<div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden md:grid md:grid-cols-2">

{/* DATOS */}

<div className="p-8 flex flex-col justify-center">

<h3 className="text-2xl font-bold mb-6">
Consultorio
</h3>

<p className="text-gray-700 mb-3">
📍 <strong>Dirección:</strong><br/>
Lavalle 640<br/>
Corrientes Capital
</p>

<p className="text-gray-700 mb-3">
📞 <strong>Teléfono:</strong><br/>
+54 9 3794 777580
</p>

<p className="text-gray-700 mb-6">
Atención con turnos programados.
</p>

<a
href="https://www.google.com/maps/place/Lavalle+640,+Corrientes/"
target="_blank"
rel="noopener noreferrer"
className="bg-blue-600 text-white text-center py-3 rounded-xl font-bold hover:bg-blue-700 transition"
>
Cómo llegar
</a>

</div>

{/* MAPA */}

<div>

<iframe
src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3539.7723044539384!2d-58.846637725533135!3d-27.47634721698767!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94456c96383b9aa3%3A0xf38555004a629df5!2sLavalle%20640%2C%20W3410BCM%20Corrientes!5e0!3m2!1ses-419!2sar!4v1785265683328!5m2!1ses-419!2sar"
className="w-full h-full min-h-[420px]"
style={{ border: 0 }}
allowFullScreen
loading="lazy"
referrerPolicy="strict-origin-when-cross-origin"
/>

</div>

</div>

</section>

{/* FOOTER */}

<footer className="mt-24 text-center text-gray-500 pb-10">

<p>
© {new Date().getFullYear()} Desarrollado por Innova Soluciones
</p>

</footer>

{/* WHATSAPP */}

<a
href="https://wa.me/5493794777580"
target="_blank"
className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600"
>
WhatsApp
</a>

{/* TURNERO */}

{mostrarTurnero && (

<Turnero
onClose={() => setMostrarTurnero(false)}
onSuccess={() => setMostrarTurnero(false)}
/>

)}

</div>

);

}