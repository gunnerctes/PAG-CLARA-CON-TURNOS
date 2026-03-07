
import React, { useState } from 'react';
import { Specialty, Modality, AppointmentRequest } from '../types';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<Partial<AppointmentRequest>>({
    specialty: Specialty.GASTRO,
    modality: Modality.PRESENTIAL
  });

  if (!isOpen) return null;

  const handleNext = () => setStep(prev => prev + 1);
  const handlePrev = () => setStep(prev => prev - 1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      onSuccess();
      onClose();
      setStep(1);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
        <div className="bg-blue-600 p-6 flex justify-between items-center text-white">
          <h2 className="text-xl font-bold">Solicitar Turno</h2>
          <button onClick={onClose} className="hover:rotate-90 transition-transform">
            <i className="fas fa-times text-2xl"></i>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8">
          {step === 1 && (
            <div className="space-y-4">
              <label className="block">
                <span className="text-slate-700 font-medium">Especialidad de la consulta</span>
                <select 
                  className="mt-1 block w-full rounded-lg border-slate-200 bg-slate-50 p-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  value={formData.specialty}
                  onChange={e => setFormData({...formData, specialty: e.target.value as Specialty})}
                >
                  {Object.values(Specialty).map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </label>
              <label className="block">
                <span className="text-slate-700 font-medium">Modalidad</span>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <button
                    type="button"
                    onClick={() => setFormData({...formData, modality: Modality.PRESENTIAL})}
                    className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${formData.modality === Modality.PRESENTIAL ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-slate-100 hover:border-slate-300 text-slate-500'}`}
                  >
                    <i className="fas fa-hospital text-xl"></i>
                    <span className="text-sm font-semibold">Presencial</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({...formData, modality: Modality.VIRTUAL})}
                    className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${formData.modality === Modality.VIRTUAL ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-slate-100 hover:border-slate-300 text-slate-500'}`}
                  >
                    <i className="fas fa-video text-xl"></i>
                    <span className="text-sm font-semibold">Virtual</span>
                  </button>
                </div>
              </label>
              <button 
                type="button"
                onClick={handleNext}
                className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors mt-6 shadow-lg shadow-blue-200"
              >
                Continuar
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <label className="block">
                  <span className="text-slate-700 font-medium">Fecha</span>
                  <input 
                    type="date" 
                    className="mt-1 block w-full rounded-lg border-slate-200 bg-slate-50 p-3 outline-none"
                    onChange={e => setFormData({...formData, date: e.target.value})}
                  />
                </label>
                <label className="block">
                  <span className="text-slate-700 font-medium">Horario</span>
                  <input 
                    type="time" 
                    className="mt-1 block w-full rounded-lg border-slate-200 bg-slate-50 p-3 outline-none"
                    onChange={e => setFormData({...formData, time: e.target.value})}
                  />
                </label>
              </div>
              <div className="flex gap-4 mt-6">
                <button 
                  type="button"
                  onClick={handlePrev}
                  className="flex-1 bg-slate-100 text-slate-600 py-3 rounded-xl font-bold hover:bg-slate-200 transition-colors"
                >
                  Atrás
                </button>
                <button 
                  type="button"
                  onClick={handleNext}
                  className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors"
                >
                  Continuar
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <input 
                placeholder="Nombre Completo"
                className="w-full rounded-lg border-slate-200 bg-slate-50 p-3 outline-none"
                onChange={e => setFormData({...formData, name: e.target.value})}
              />
              <input 
                type="email"
                placeholder="Correo Electrónico"
                className="w-full rounded-lg border-slate-200 bg-slate-50 p-3 outline-none"
                onChange={e => setFormData({...formData, email: e.target.value})}
              />
              <input 
                placeholder="Teléfono de contacto"
                className="w-full rounded-lg border-slate-200 bg-slate-50 p-3 outline-none"
                onChange={e => setFormData({...formData, phone: e.target.value})}
              />
              <textarea 
                placeholder="Motivo de la consulta (opcional)"
                className="w-full rounded-lg border-slate-200 bg-slate-50 p-3 outline-none h-24"
                onChange={e => setFormData({...formData, reason: e.target.value})}
              />
              <div className="flex gap-4 mt-6">
                <button 
                  type="button"
                  onClick={handlePrev}
                  className="flex-1 bg-slate-100 text-slate-600 py-3 rounded-xl font-bold hover:bg-slate-200 transition-colors"
                >
                  Atrás
                </button>
                <button 
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors"
                >
                  Confirmar Turno
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default BookingModal;
