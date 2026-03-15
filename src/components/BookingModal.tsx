import React, { useState } from "react";
import { Specialty, Modality, AppointmentRequest } from "../types";

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbymw1qFtD0wUrYvcvQqPJeKYdn_pU-PYho9c9JUZ0-ySG8gZQwTKivqIpUKutoUIJjf/exec";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  onSuccess
}) => {

  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState<Partial<AppointmentRequest>>({
    specialty: Specialty.GASTRO,
    modality: Modality.PRESENTIAL
  });

  if (!isOpen) return null;

  const handleNext = () => setStep(prev => prev + 1);
  const handlePrev = () => setStep(prev => prev - 1);

  async function handleSubmit(e: React.FormEvent) {

    e.preventDefault();

    try {

      const fechaISO = `${formData.date}T${formData.time}:00`;

      const res = await fetch(SCRIPT_URL,{
        method:"POST",
        body:JSON.stringify({
          nombre: formData.name,
          dni: formData.dni,
          obraSocial: formData.obraSocial,
          telefono: formData.phone,
          motivo: formData.reason,
          fechaISO
        })
      });

      const data = await res.json();

      if(data.ok){
        alert("Turno confirmado");
        onSuccess();
        onClose();
        setStep(1);
      }else{
        alert(data.mensaje);
      }

    } catch {

      alert("Error enviando turno");

    }

  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">

      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden">

        <div className="bg-blue-600 p-6 flex justify-between items-center text-white">
          <h2 className="text-xl font-bold">Solicitar Turno</h2>
          <button onClick={onClose}>X</button>
        </div>

        <form onSubmit={handleSubmit} className="p-8">

          {step === 1 && (

            <div className="space-y-4">

              <select
                value={formData.specialty}
                onChange={e => setFormData({...formData,specialty:e.target.value as Specialty})}
              >
                {Object.values(Specialty).map(s =>
                  <option key={s}>{s}</option>
                )}
              </select>

              <button type="button" onClick={handleNext}>
                Continuar
              </button>

            </div>

          )}

          {step === 2 && (

            <div>

              <input
                type="date"
                onChange={e => setFormData({...formData,date:e.target.value})}
              />

              <input
                type="time"
                onChange={e => setFormData({...formData,time:e.target.value})}
              />

              <button type="button" onClick={handlePrev}>Atrás</button>
              <button type="button" onClick={handleNext}>Continuar</button>

            </div>

          )}

          {step === 3 && (

            <div className="space-y-3">

              <input
                placeholder="Nombre completo"
                onChange={e => setFormData({...formData,name:e.target.value})}
              />

              <input
                placeholder="DNI"
                onChange={e => setFormData({...formData,dni:e.target.value})}
              />

              <input
                placeholder="Obra social"
                onChange={e => setFormData({...formData,obraSocial:e.target.value})}
              />

              <input
                placeholder="Teléfono"
                onChange={e => setFormData({...formData,phone:e.target.value})}
              />

              <textarea
                placeholder="Motivo de consulta"
                onChange={e => setFormData({...formData,reason:e.target.value})}
              />

              <button type="button" onClick={handlePrev}>Atrás</button>
              <button type="submit">Confirmar turno</button>

            </div>

          )}

        </form>

      </div>

    </div>
  );

};

export default BookingModal;