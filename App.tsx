
import React, { useState } from 'react';
import BookingModal from './components/BookingModal';
import ChatAssistant from './components/ChatAssistant';

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const specialties = [
    {
      title: "Gastroenterología",
      icon: "fa-stomach",
      desc: "Diagnóstico y tratamiento de enfermedades del aparato digestivo."
    },
    {
      title: "Endoscopia Digestiva",
      icon: "fa-microscope",
      desc: "Procedimientos avanzados para diagnóstico precoz y terapéutica."
    },
    {
      title: "Clínica Médica",
      icon: "fa-user-md",
      desc: "Atención integral del adulto con enfoque preventivo y clínico."
    }
  ];

  const handleBookingSuccess = () => {
    setShowSuccessToast(true);
    setTimeout(() => setShowSuccessToast(false), 5000);
  };

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-40 glass-morphism py-4 px-6 md:px-12 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">
            M
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold text-slate-800 leading-tight">Dra. Especialista</span>
            <span className="text-xs text-blue-600 font-semibold tracking-wider uppercase">Gastro & Endoscopia</span>
          </div>
        </div>
        <div className="hidden md:flex gap-8 text-sm font-medium text-slate-600">
          <a href="#" className="hover:text-blue-600 transition-colors">Especialidades</a>
          <a href="#" className="hover:text-blue-600 transition-colors">Sobre Mí</a>
          <a href="#" className="hover:text-blue-600 transition-colors">Contacto</a>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-blue-700 transition-all shadow-md shadow-blue-200"
        >
          Sacar Turno
        </button>
      </nav>

      {/* Hero Section */}
      <header className="pt-32 pb-20 px-6 md:px-12 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1 space-y-6">
          <div className="inline-block bg-blue-50 text-blue-600 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
            Atención Médica de Excelencia
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 leading-tight">
            Cuidamos tu salud <br/> <span className="text-blue-600">integral y digestiva.</span>
          </h1>
          <p className="text-lg text-slate-600 max-w-xl leading-relaxed">
            Especialista en Gastroenterología y Endoscopia Digestiva, con residencia en Clínica Médica. Brindamos una visión holística y humana para cada paciente.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-600 text-white px-8 py-4 rounded-2xl text-lg font-bold hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 flex items-center justify-center gap-2"
            >
              Solicitar Turno Ahora
              <i className="fas fa-calendar-check"></i>
            </button>
            <div className="flex items-center gap-4 px-6 text-slate-500">
              <div className="flex -space-x-3">
                {[1, 2, 3].map(i => (
                  <img key={i} src={`https://picsum.photos/40/40?random=${i}`} className="w-10 h-10 rounded-full border-2 border-white shadow-sm" alt="paciente" />
                ))}
              </div>
              <span className="text-sm font-medium">+500 pacientes mensuales</span>
            </div>
          </div>
        </div>
        <div className="flex-1 relative">
          <div className="absolute -inset-4 bg-blue-100 rounded-3xl -rotate-3 scale-95 blur-sm opacity-50"></div>
          <img 
            src="https://picsum.photos/600/500?medical" 
            className="rounded-3xl shadow-2xl relative z-10 w-full object-cover aspect-[4/3]"
            alt="Doctor Office"
          />
        </div>
      </header>

      {/* Specialties Cards */}
      <section className="bg-white py-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Especialidades & Servicios</h2>
            <div className="h-1.5 w-24 bg-blue-600 mx-auto rounded-full"></div>
            <p className="text-slate-500 max-w-2xl mx-auto">
              Combinamos experiencia clínica con tecnología de vanguardia para ofrecerte el mejor diagnóstico y tratamiento.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {specialties.map((item, idx) => (
              <div key={idx} className="bg-slate-50 p-8 rounded-3xl border border-slate-100 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-50 transition-all group">
                <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center text-blue-600 text-2xl mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <i className={`fas ${item.icon}`}></i>
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">{item.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                <div className="mt-6 flex items-center text-blue-600 font-bold text-sm cursor-pointer hover:gap-2 transition-all">
                  Saber más <i className="fas fa-arrow-right ml-2"></i>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Virtual Consultation Banner */}
      <section className="bg-blue-600 py-16 px-6 md:px-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full blur-3xl opacity-20 -mr-20 -mt-20"></div>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
          <div className="text-white space-y-4">
            <h2 className="text-3xl font-bold">¿Prefieres una consulta virtual?</h2>
            <p className="text-blue-100 max-w-lg">
              Ofrecemos atención a distancia vía Zoom o Google Meet para tu comodidad. Ideal para consultas clínicas o seguimiento de resultados.
            </p>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-white text-blue-600 px-10 py-4 rounded-2xl text-lg font-bold hover:bg-slate-100 transition-all shadow-xl"
          >
            Reservar Teleconsulta
          </button>
        </div>
      </section>

      {/* WhatsApp FAB */}
      <a 
        href="https://wa.me/123456789" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-[#25D366] text-white w-14 h-14 rounded-full shadow-xl flex items-center justify-center hover:scale-110 transition-transform duration-300 z-50"
      >
        <i className="fab fa-whatsapp text-3xl"></i>
      </a>

      <ChatAssistant />

      <BookingModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSuccess={handleBookingSuccess}
      />

      {/* Toast Notification */}
      {showSuccessToast && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 z-[60] animate-in slide-in-from-top-10 duration-500">
          <i className="fas fa-check-circle text-xl"></i>
          <span className="font-bold">¡Turno solicitado con éxito! Te contactaremos pronto.</span>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 px-6 md:px-12 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
              M
            </div>
            <span className="text-white font-bold">Portal Médico Especializado</span>
          </div>
          <div className="flex gap-6 text-sm">
            <a href="#" className="hover:text-white">Aviso Legal</a>
            <a href="#" className="hover:text-white">Privacidad</a>
            <a href="#" className="hover:text-white">Prepagas</a>
          </div>
          <p className="text-xs">© 2024 Desarrollado con excelencia médica.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
