import { ArrowLeft } from 'lucide-react';
import { ParkingMap, SPOTS } from './ParkingMap';
import type { ReservationData } from '../App';

const OCCUPIED_IDS = new Set([
  'A-01','A-03','A-04','A-06','A-07','A-09','A-10','A-12',
  'B-01','B-02','B-04','B-06','B-07','B-08','B-10','B-12',
  'C-01','C-03','C-05','C-07','C-09','C-11','C-13','C-15',
]);

interface AvailableSpotsScreenProps {
  onBack: () => void;
  reservations: ReservationData[];
}

export function AvailableSpotsScreen({ onBack, reservations }: AvailableSpotsScreenProps) {
  const reservedSpotIds = reservations.map(r => r.spotId);

  const occupied = SPOTS.filter(s => !reservedSpotIds.includes(s.id) && OCCUPIED_IDS.has(s.id)).length;
  const reserved = reservedSpotIds.length;
  const available = SPOTS.length - occupied - reserved;

  const sectorStats = (['A', 'B', 'C'] as const).map((sector) => {
    const sectorSpots = SPOTS.filter(s => s.sector === sector);
    const occ = sectorSpots.filter(s => !reservedSpotIds.includes(s.id) && OCCUPIED_IDS.has(s.id)).length;
    const res = sectorSpots.filter(s => reservedSpotIds.includes(s.id)).length;
    const avail = sectorSpots.length - occ - res;
    return { sector, total: sectorSpots.length, available: avail, occupied: occ };
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-[#005B96] text-white px-6 pt-6 pb-8">
        <div className="flex items-center mb-4">
          <button onClick={onBack} className="mr-4">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-2xl font-bold">Espacios Disponibles</h1>
        </div>

        <div className="flex gap-4">
          <div className="flex-1 bg-white/10 rounded-xl px-4 py-3 text-center">
            <p className="text-2xl font-bold">{available}</p>
            <p className="text-xs opacity-75">disponibles</p>
          </div>
          <div className="flex-1 bg-white/10 rounded-xl px-4 py-3 text-center">
            <p className="text-2xl font-bold">{occupied}</p>
            <p className="text-xs opacity-75">ocupados</p>
          </div>
          <div className="flex-1 bg-white/10 rounded-xl px-4 py-3 text-center">
            <p className="text-2xl font-bold">{reserved}</p>
            <p className="text-xs opacity-75">reservados</p>
          </div>
        </div>
      </div>

      <div className="px-4 py-5">
        <div className="bg-[#111827] rounded-2xl overflow-hidden shadow-xl mb-5">
          <div className="flex items-center justify-between px-4 pt-3 pb-1">
            <p className="text-white/70 text-xs font-semibold tracking-wide">MAPA EN TIEMPO REAL</p>
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
              <span className="text-green-400 text-xs">En vivo</span>
            </div>
          </div>
          <ParkingMap reservedSpotIds={reservedSpotIds} className="px-2 pb-3" />
        </div>

        {/* Legend */}
        <div className="flex gap-3 mb-5">
          <div className="flex-1 flex items-center gap-2 bg-white rounded-xl p-3 shadow-sm">
            <div className="w-3.5 h-3.5 rounded bg-green-500 shrink-0" />
            <span className="text-xs font-medium text-gray-700">Disponible</span>
          </div>
          <div className="flex-1 flex items-center gap-2 bg-white rounded-xl p-3 shadow-sm">
            <div className="w-3.5 h-3.5 rounded bg-red-500 shrink-0" />
            <span className="text-xs font-medium text-gray-700">Ocupado</span>
          </div>
          <div className="flex-1 flex items-center gap-2 bg-white rounded-xl p-3 shadow-sm">
            <div className="w-3.5 h-3.5 rounded bg-yellow-400 shrink-0" />
            <span className="text-xs font-medium text-gray-700">Reservado</span>
          </div>
        </div>

        {/* Per-sector stats */}
        <div className="bg-white rounded-2xl shadow-md p-5">
          <h3 className="font-semibold text-gray-800 mb-4">Por sector</h3>
          <div className="space-y-4">
            {sectorStats.map(({ sector, total: t, available: a, occupied: o }) => {
              const pct = Math.round((a / t) * 100);
              const label =
                sector === 'A' ? 'Sector A — Cerca salida' :
                sector === 'B' ? 'Sector B — Techado' :
                'Sector C — Estadio';
              return (
                <div key={sector}>
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-sm font-semibold text-gray-700">{label}</span>
                    <span className="text-sm font-bold text-gray-800">{a}/{t}</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                    <div
                      className="h-2.5 rounded-full transition-all"
                      style={{
                        width: `${pct}%`,
                        background: pct > 50 ? '#22c55e' : pct > 25 ? '#f59e0b' : '#ef4444',
                      }}
                    />
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className="text-xs text-gray-400">{pct}% disponible</span>
                    <span className="text-xs text-gray-400">{o} ocupados</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
