import { ArrowLeft, Navigation2, CalendarX, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { ParkingMap, SPOTS } from './ParkingMap';
import type { ReservationData } from '../App';

interface FindCarScreenProps {
  onBack: () => void;
  reservations: ReservationData[];
}

export function FindCarScreen({ onBack, reservations }: FindCarScreenProps) {
  const today = new Date().toISOString().split('T')[0];
  const upcoming = reservations
    .filter(r => r.date >= today)
    .sort((a, b) => a.date.localeCompare(b.date));

  const [selectedIndex, setSelectedIndex] = useState(0);
  const active = upcoming[selectedIndex] ?? null;
  const spot = active ? SPOTS.find(s => s.id === active.spotId) ?? null : null;
  const allReservedIds = reservations.map(r => r.spotId);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-[#005B96] text-white px-6 pt-6 pb-8">
        <div className="flex items-center mb-4">
          <button onClick={onBack} className="mr-4">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-2xl font-bold">Encontrar tu auto</h1>
        </div>

        {/* Reservation selector when there are multiple */}
        {upcoming.length > 1 && (
          <div className="relative mt-2">
            <select
              value={selectedIndex}
              onChange={e => setSelectedIndex(Number(e.target.value))}
              className="w-full appearance-none bg-white/15 text-white border border-white/30 rounded-xl px-4 py-2.5 pr-10 text-sm font-medium focus:outline-none"
            >
              {upcoming.map((r, i) => (
                <option key={r.date} value={i} className="text-gray-800 bg-white">
                  {r.date === today ? 'Hoy' : r.date} — {r.sectorLabel} · {r.spotId}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/70 pointer-events-none" />
          </div>
        )}
      </div>

      <div className="px-4 py-5">
        {active && spot ? (
          <>
            <div className="bg-[#111827] rounded-2xl overflow-hidden shadow-xl mb-5">
              <div className="flex items-center justify-between px-4 pt-3 pb-1">
                <p className="text-white/70 text-xs font-semibold tracking-wide">RUTA HASTA TU AUTO</p>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full" />
                  <span className="text-blue-300 text-xs">Entrada → {active.spotId}</span>
                </div>
              </div>
              <ParkingMap
                reservedSpotIds={allReservedIds}
                routeTargetId={active.spotId}
                showRoute={true}
                className="px-2 pb-3"
              />
              <div className="flex items-center gap-4 px-4 pb-3">
                <div className="flex items-center gap-1.5">
                  <div className="w-8 border-t-2 border-dashed border-blue-400 opacity-80" />
                  <span className="text-xs text-white/50">Ruta sugerida</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-[#005B96]" />
                  <span className="text-xs text-white/50">Entrada</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <span className="text-xs text-white/50">Tu espacio</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-5 mb-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center">
                  <Navigation2 className="w-5 h-5 text-yellow-600" />
                </div>
                <div>
                  <p className="font-bold text-gray-800">Tu auto está reservado aquí</p>
                  <p className="text-sm text-gray-500">{active.sectorLabel}</p>
                </div>
              </div>

              <div className="space-y-3 border-t border-gray-100 pt-4">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Espacio</span>
                  <span className="text-sm font-bold text-gray-800">{active.spotId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Sector</span>
                  <span className="text-sm font-semibold text-gray-800">
                    {spot.sector === 'A' ? 'A — Cerca salida' : spot.sector === 'B' ? 'B — Techado' : 'C — Estadio'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Fecha reserva</span>
                  <span className="text-sm font-semibold text-gray-800">{active.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Hora de llegada</span>
                  <span className="text-sm font-semibold text-gray-800">{active.time}</span>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <p className="text-sm text-blue-800">
                💡 <span className="font-semibold">Consejo:</span> Sigue la línea azul desde la entrada del estacionamiento hasta tu espacio reservado.
              </p>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-5">
              <CalendarX className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-700 mb-2">Sin reserva activa</h3>
            <p className="text-gray-500 text-sm max-w-xs mb-6 leading-relaxed">
              No tienes espacios reservados. Reserva uno para ver la ruta hacia tu auto.
            </p>
            <button
              onClick={onBack}
              className="bg-[#005B96] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#004A7C] transition-colors shadow-md"
            >
              Reservar un espacio
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
