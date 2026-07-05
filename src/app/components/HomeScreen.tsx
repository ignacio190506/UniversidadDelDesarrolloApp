import { Car, User, LogOut, CalendarCheck, Clock, ChevronRight } from 'lucide-react';
import type { ReservationData } from '../App';

interface HomeScreenProps {
  userName: string;
  reservations: ReservationData[];
  onNavigateToParking: () => void;
  onLogout: () => void;
}

export function HomeScreen({ userName, reservations, onNavigateToParking, onLogout }: HomeScreenProps) {
  const today = new Date().toISOString().split('T')[0];
  const upcoming = reservations
    .filter(r => r.date >= today)
    .sort((a, b) => a.date.localeCompare(b.date));

  const primary = upcoming[0] ?? null;
  const extraCount = upcoming.length - 1;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-[#005B96] text-white px-6 pt-6 pb-32 rounded-b-[3rem]">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-xl font-semibold">Mi UDD - Santiago</h1>
          <button
            onClick={onLogout}
            className="flex items-center gap-1.5 bg-white/15 hover:bg-white/25 transition-colors rounded-full px-3 py-1.5"
          >
            <LogOut className="w-4 h-4" />
            <span className="text-sm font-medium">Salir</span>
          </button>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
              <User className="w-7 h-7 text-[#005B96]" />
            </div>
            <div>
              <p className="text-sm opacity-90">Hola, <span className="font-bold">{userName}</span></p>
              <p className="text-xs opacity-75">Alumno Vigente</p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 -mt-20">
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">Servicios</h2>
            <button className="text-[#005B96] text-sm font-medium">Ver todo →</button>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <button
              onClick={onNavigateToParking}
              className="aspect-square bg-gradient-to-br from-[#005B96] to-[#003D66] rounded-2xl flex flex-col items-center justify-center text-white shadow-lg hover:shadow-xl transition-shadow active:scale-95"
            >
              <Car className="w-10 h-10 mb-2" />
              <span className="text-sm font-medium text-center leading-tight">Estacionamiento</span>
            </button>

            <button className="aspect-square bg-white border-2 border-gray-200 rounded-2xl flex flex-col items-center justify-center text-gray-700 hover:border-[#005B96] transition-colors">
              <div className="text-3xl mb-1">🎓</div>
              <span className="text-xs font-medium text-center">Mi UDD</span>
            </button>

            <button className="aspect-square bg-white border-2 border-gray-200 rounded-2xl flex flex-col items-center justify-center text-gray-700 hover:border-[#005B96] transition-colors">
              <div className="text-3xl mb-1">🏆</div>
              <span className="text-xs font-medium text-center">Deportes</span>
            </button>

            <button className="aspect-square bg-white border-2 border-gray-200 rounded-2xl flex flex-col items-center justify-center text-gray-700 hover:border-[#005B96] transition-colors">
              <div className="text-3xl mb-1">📚</div>
              <span className="text-xs font-medium text-center">Canvas</span>
            </button>

            <button className="aspect-square bg-white border-2 border-gray-200 rounded-2xl flex flex-col items-center justify-center text-gray-700 hover:border-[#005B96] transition-colors">
              <div className="text-3xl mb-1">📺</div>
              <span className="text-xs font-medium text-center">UDD TV</span>
            </button>

            <button className="aspect-square bg-white border-2 border-gray-200 rounded-2xl flex flex-col items-center justify-center text-gray-700 hover:border-[#005B96] transition-colors">
              <div className="text-3xl mb-1">📱</div>
              <span className="text-xs font-medium text-center">QR</span>
            </button>
          </div>
        </div>

        {/* Reservation status */}
        <div className="mt-6">
          {primary ? (
            <div className="bg-white rounded-2xl shadow-md overflow-hidden">
              <div className="border-l-4 border-[#005B96] px-5 py-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-[#005B96]/10 rounded-xl flex items-center justify-center shrink-0">
                    <CalendarCheck className="w-5 h-5 text-[#005B96]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <p className="font-bold text-gray-800 text-sm">
                        {primary.date === today ? 'Reserva de hoy' : 'Próxima reserva'}
                      </p>
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    </div>
                    <p className="text-xs text-gray-600 font-semibold">{primary.sectorLabel}</p>
                    <p className="text-xs text-gray-400 mt-0.5">Espacio {primary.spotId}</p>
                    <div className="flex items-center gap-1 mt-1.5">
                      <Clock className="w-3 h-3 text-[#005B96]" />
                      <p className="text-xs text-[#005B96] font-medium">{primary.date} · {primary.time}</p>
                    </div>
                  </div>
                  {extraCount > 0 && (
                    <div className="flex items-center gap-1 shrink-0">
                      <span className="text-xs text-gray-400">+{extraCount} más</span>
                      <ChevronRight className="w-4 h-4 text-gray-300" />
                    </div>
                  )}
                </div>
              </div>

              {/* Extra reservations list */}
              {extraCount > 0 && upcoming.slice(1).map(r => (
                <div key={r.date} className="border-t border-gray-100 px-5 py-3 flex items-center gap-3">
                  <div className="w-7 h-7 bg-gray-100 rounded-lg flex items-center justify-center shrink-0">
                    <CalendarCheck className="w-3.5 h-3.5 text-gray-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-gray-700 truncate">{r.sectorLabel}</p>
                    <p className="text-xs text-gray-400">{r.spotId} · {r.date} · {r.time}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-md p-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center shrink-0">
                  <CalendarCheck className="w-5 h-5 text-gray-400" />
                </div>
                <div>
                  <p className="font-semibold text-gray-700 text-sm">Sin reservas activas</p>
                  <p className="text-xs text-gray-400 mt-0.5">Reserva desde el módulo de Estacionamiento</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
