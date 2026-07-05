import { ArrowLeft, Search, MapPin, CalendarCheck } from 'lucide-react';

interface ParkingScreenProps {
  onBack: () => void;
  onFindCar: () => void;
  onAvailableSpots: () => void;
  onReserveSpot: () => void;
}

export function ParkingScreen({ onBack, onFindCar, onAvailableSpots, onReserveSpot }: ParkingScreenProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-[#005B96] text-white px-6 pt-6 pb-20 rounded-b-[3rem]">
        <div className="flex items-center mb-8">
          <button onClick={onBack} className="mr-4">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-2xl font-bold">Estacionamiento</h1>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
          <p className="text-sm opacity-90 mb-2">Estado del estacionamiento</p>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-3xl font-bold">127</p>
              <p className="text-xs opacity-75">espacios disponibles</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold">68%</p>
              <p className="text-xs opacity-75">ocupación</p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 -mt-12">
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">¿Qué necesitas?</h2>

          <button
            onClick={onFindCar}
            className="w-full bg-gradient-to-r from-[#005B96] to-[#003D66] text-white rounded-xl p-5 mb-4 flex items-center justify-between hover:shadow-lg transition-shadow active:scale-[0.98] transition-transform"
          >
            <div className="flex items-center">
              <div className="bg-white/20 rounded-lg p-3 mr-4">
                <Search className="w-6 h-6" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-lg">Encontrar tu auto</p>
                <p className="text-sm opacity-90">Localiza dónde estacionaste</p>
              </div>
            </div>
            <div className="text-2xl">→</div>
          </button>

          <button
            onClick={onAvailableSpots}
            className="w-full bg-white border-2 border-[#005B96] text-[#005B96] rounded-xl p-5 mb-4 flex items-center justify-between hover:bg-[#005B96] hover:text-white transition-colors active:scale-[0.98] transition-transform"
          >
            <div className="flex items-center">
              <div className="bg-[#005B96]/10 rounded-lg p-3 mr-4">
                <MapPin className="w-6 h-6" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-lg">Espacios disponibles</p>
                <p className="text-sm opacity-75">Ver mapa en tiempo real</p>
              </div>
            </div>
            <div className="text-2xl">→</div>
          </button>

          <button
            onClick={onReserveSpot}
            className="w-full bg-white border-2 border-[#005B96] text-[#005B96] rounded-xl p-5 flex items-center justify-between hover:bg-[#005B96] hover:text-white transition-colors active:scale-[0.98] transition-transform"
          >
            <div className="flex items-center">
              <div className="bg-[#005B96]/10 rounded-lg p-3 mr-4">
                <CalendarCheck className="w-6 h-6" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-lg">Reservar espacio</p>
                <p className="text-sm opacity-75">Cerca de la salida</p>
              </div>
            </div>
            <div className="text-2xl">→</div>
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6">
          <h3 className="font-semibold text-gray-800 mb-3">Tips</h3>
          <div className="space-y-2 text-sm text-gray-600">
            <p>💡 Reserva con anticipación para obtener los mejores espacios</p>
            <p>🕐 Horario peak: 8:00 - 9:00 AM y 17:00 - 19:00 PM</p>
            <p>📍 Estacionamientos techados en Sector B</p>
          </div>
        </div>
      </div>
    </div>
  );
}
