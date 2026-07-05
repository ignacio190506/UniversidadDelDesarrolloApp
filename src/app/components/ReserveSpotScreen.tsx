import { ArrowLeft, Calendar, Clock, MapPin, Check, AlertTriangle } from 'lucide-react';
import { useState } from 'react';
import { SECTOR_SPOT_MAP } from './ParkingMap';
import type { ReservationData } from '../App';

interface ReserveSpotScreenProps {
  onBack: () => void;
  reservations: ReservationData[];
  onReserve: (data: ReservationData) => void;
}

const SECTORS = [
  'Sector A - Cerca salida principal',
  'Sector B - Techado',
  'Sector C - Estadio',
];

type Step = 'form' | 'conflict' | 'confirmed';

export function ReserveSpotScreen({ onBack, reservations, onReserve }: ReserveSpotScreenProps) {
  const today = new Date().toISOString().split('T')[0];
  const [selectedDate, setSelectedDate] = useState(today);
  const [selectedTime, setSelectedTime] = useState('08:00');
  const [selectedSector, setSelectedSector] = useState('');
  const [step, setStep] = useState<Step>('form');
  const [conflictingReservation, setConflictingReservation] = useState<ReservationData | null>(null);

  const pendingData: ReservationData | null = selectedSector
    ? { spotId: SECTOR_SPOT_MAP[selectedSector], sectorLabel: selectedSector, date: selectedDate, time: selectedTime }
    : null;

  const handleConfirmClick = () => {
    if (!pendingData) return;
    const conflict = reservations.find(r => r.date === selectedDate);
    if (conflict) {
      setConflictingReservation(conflict);
      setStep('conflict');
    } else {
      setStep('confirmed');
    }
  };

  const handleReplaceConfirm = () => {
    setConflictingReservation(null);
    setStep('confirmed');
  };

  const handleKeepExisting = () => {
    setConflictingReservation(null);
    setStep('form');
  };

  if (step === 'confirmed' && pendingData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-12 h-12 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">¡Reserva Confirmada!</h2>
          <p className="text-gray-500 text-sm mb-6">Tu espacio ha sido reservado exitosamente</p>

          <div className="bg-gray-50 rounded-2xl p-5 mb-6 text-left space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Sector</span>
              <span className="text-sm font-semibold text-gray-800">{pendingData.sectorLabel}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Espacio</span>
              <span className="text-sm font-bold text-[#005B96]">{pendingData.spotId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Fecha</span>
              <span className="text-sm font-semibold text-gray-800">{pendingData.date}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Hora de llegada</span>
              <span className="text-sm font-semibold text-gray-800">{pendingData.time}</span>
            </div>
          </div>

          <button
            onClick={() => onReserve(pendingData)}
            className="w-full bg-[#005B96] text-white rounded-xl py-4 font-semibold hover:bg-[#004A7C] transition-colors"
          >
            Volver al estacionamiento
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-[#005B96] text-white px-6 pt-6 pb-8">
        <div className="flex items-center mb-4">
          <button onClick={onBack} className="mr-4">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-2xl font-bold">Reservar Espacio</h1>
        </div>
      </div>

      <div className="px-6 py-6">
        {/* Conflict dialog overlay */}
        {step === 'conflict' && conflictingReservation && pendingData && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center p-4">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center shrink-0">
                  <AlertTriangle className="w-5 h-5 text-amber-500" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">Reserva existente</h3>
                  <p className="text-xs text-gray-500 mt-0.5">Ya tienes una reserva para esta fecha</p>
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-5">
                <p className="text-xs text-amber-800 font-semibold mb-1">Reserva actual el {conflictingReservation.date}</p>
                <p className="text-sm text-amber-900 font-bold">{conflictingReservation.sectorLabel}</p>
                <p className="text-xs text-amber-700 mt-0.5">Espacio {conflictingReservation.spotId} · {conflictingReservation.time}</p>
              </div>

              <p className="text-sm text-gray-600 mb-5">
                ¿Deseas <span className="font-semibold text-[#005B96]">reemplazar</span> la reserva actual por el <span className="font-semibold">{pendingData.sectorLabel}</span>, espacio {pendingData.spotId} a las {pendingData.time}?
              </p>

              <div className="space-y-3">
                <button
                  onClick={handleReplaceConfirm}
                  className="w-full bg-[#005B96] text-white rounded-xl py-3.5 font-semibold hover:bg-[#004A7C] transition-colors"
                >
                  Sí, reemplazar reserva
                </button>
                <button
                  onClick={handleKeepExisting}
                  className="w-full bg-gray-100 text-gray-700 rounded-xl py-3.5 font-semibold hover:bg-gray-200 transition-colors"
                >
                  Mantener reserva anterior
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-4 mb-5">
          <p className="text-sm text-blue-800">
            ✨ <span className="font-semibold">Beneficio exclusivo:</span> Reserva espacios cerca de la salida con hasta 24 horas de anticipación. Puedes tener una reserva por día.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6 mb-4">
          <div className="mb-6">
            <label className="flex items-center text-gray-700 font-semibold mb-3">
              <Calendar className="w-4 h-4 mr-2 text-[#005B96]" />
              Fecha
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              min={today}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#005B96] focus:outline-none"
            />
            {reservations.some(r => r.date === selectedDate) && (
              <p className="text-xs text-amber-600 mt-1.5 flex items-center gap-1">
                <AlertTriangle className="w-3 h-3" />
                Ya tienes una reserva para esta fecha. Se te pedirá confirmación.
              </p>
            )}
          </div>

          <div className="mb-6">
            <label className="flex items-center text-gray-700 font-semibold mb-3">
              <Clock className="w-4 h-4 mr-2 text-[#005B96]" />
              Hora de llegada estimada
            </label>
            <select
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#005B96] focus:outline-none appearance-none bg-white"
            >
              {['07:00','07:30','08:00','08:30','09:00','09:30','10:00','10:30','11:00','11:30','12:00'].map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="flex items-center text-gray-700 font-semibold mb-3">
              <MapPin className="w-4 h-4 mr-2 text-[#005B96]" />
              Sector preferido
            </label>
            <div className="space-y-3">
              {SECTORS.map((sector) => {
                const spotId = SECTOR_SPOT_MAP[sector];
                return (
                  <button
                    key={sector}
                    onClick={() => setSelectedSector(sector)}
                    className={`w-full px-4 py-4 rounded-xl border-2 text-left transition-all ${
                      selectedSector === sector
                        ? 'border-[#005B96] bg-blue-50 text-[#005B96]'
                        : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-medium text-sm block">{sector}</span>
                        <span className="text-xs opacity-60 mt-0.5 block">Espacio asignado: {spotId}</span>
                      </div>
                      {selectedSector === sector && (
                        <div className="w-6 h-6 bg-[#005B96] rounded-full flex items-center justify-center shrink-0">
                          <Check className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-5 mb-5">
          <h3 className="font-semibold text-gray-800 mb-3 text-sm">Condiciones</h3>
          <div className="space-y-1.5 text-xs text-gray-500">
            <p>• Tolerancia de 15 minutos pasada la hora de llegada</p>
            <p>• Cancelación sin cargo hasta 1 hora antes</p>
            <p>• Solo una reserva por día</p>
          </div>
        </div>

        <button
          onClick={handleConfirmClick}
          disabled={!selectedDate || !selectedTime || !selectedSector}
          className="w-full bg-[#005B96] text-white rounded-xl py-4 font-semibold hover:bg-[#004A7C] transition-colors shadow-lg disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Confirmar reserva
        </button>
      </div>
    </div>
  );
}
