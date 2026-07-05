import { useEffect, useRef } from 'react';

export interface SpotData {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
  sector: 'A' | 'B' | 'C';
  row: number;
}

const SW = 14, SH = 20;

export const SPOTS: SpotData[] = [
  // Sector A row 0 (top)
  { id: 'A-01', x: 8,  y: 18, w: SW, h: SH, sector: 'A', row: 0 },
  { id: 'A-02', x: 25, y: 18, w: SW, h: SH, sector: 'A', row: 0 },
  { id: 'A-03', x: 42, y: 18, w: SW, h: SH, sector: 'A', row: 0 },
  { id: 'A-04', x: 59, y: 18, w: SW, h: SH, sector: 'A', row: 0 },
  { id: 'A-05', x: 76, y: 18, w: SW, h: SH, sector: 'A', row: 0 },
  { id: 'A-06', x: 93, y: 18, w: SW, h: SH, sector: 'A', row: 0 },
  // Sector A row 1 (bottom)
  { id: 'A-07', x: 8,  y: 56, w: SW, h: SH, sector: 'A', row: 1 },
  { id: 'A-08', x: 25, y: 56, w: SW, h: SH, sector: 'A', row: 1 },
  { id: 'A-09', x: 42, y: 56, w: SW, h: SH, sector: 'A', row: 1 },
  { id: 'A-10', x: 59, y: 56, w: SW, h: SH, sector: 'A', row: 1 },
  { id: 'A-11', x: 76, y: 56, w: SW, h: SH, sector: 'A', row: 1 },
  { id: 'A-12', x: 93, y: 56, w: SW, h: SH, sector: 'A', row: 1 },
  // Sector B row 0 (top)
  { id: 'B-01', x: 139, y: 18, w: SW, h: SH, sector: 'B', row: 0 },
  { id: 'B-02', x: 156, y: 18, w: SW, h: SH, sector: 'B', row: 0 },
  { id: 'B-03', x: 173, y: 18, w: SW, h: SH, sector: 'B', row: 0 },
  { id: 'B-04', x: 190, y: 18, w: SW, h: SH, sector: 'B', row: 0 },
  { id: 'B-05', x: 207, y: 18, w: SW, h: SH, sector: 'B', row: 0 },
  { id: 'B-06', x: 224, y: 18, w: SW, h: SH, sector: 'B', row: 0 },
  // Sector B row 1 (bottom)
  { id: 'B-07', x: 139, y: 56, w: SW, h: SH, sector: 'B', row: 1 },
  { id: 'B-08', x: 156, y: 56, w: SW, h: SH, sector: 'B', row: 1 },
  { id: 'B-09', x: 173, y: 56, w: SW, h: SH, sector: 'B', row: 1 },
  { id: 'B-10', x: 190, y: 56, w: SW, h: SH, sector: 'B', row: 1 },
  { id: 'B-11', x: 207, y: 56, w: SW, h: SH, sector: 'B', row: 1 },
  { id: 'B-12', x: 224, y: 56, w: SW, h: SH, sector: 'B', row: 1 },
  // Sector C row 0
  { id: 'C-01', x: 8,   y: 96, w: SW, h: SH, sector: 'C', row: 0 },
  { id: 'C-02', x: 25,  y: 96, w: SW, h: SH, sector: 'C', row: 0 },
  { id: 'C-03', x: 42,  y: 96, w: SW, h: SH, sector: 'C', row: 0 },
  { id: 'C-04', x: 59,  y: 96, w: SW, h: SH, sector: 'C', row: 0 },
  { id: 'C-05', x: 76,  y: 96, w: SW, h: SH, sector: 'C', row: 0 },
  { id: 'C-06', x: 93,  y: 96, w: SW, h: SH, sector: 'C', row: 0 },
  { id: 'C-07', x: 110, y: 96, w: SW, h: SH, sector: 'C', row: 0 },
  { id: 'C-08', x: 127, y: 96, w: SW, h: SH, sector: 'C', row: 0 },
  // Sector C row 1
  { id: 'C-09', x: 8,   y: 130, w: SW, h: SH, sector: 'C', row: 1 },
  { id: 'C-10', x: 25,  y: 130, w: SW, h: SH, sector: 'C', row: 1 },
  { id: 'C-11', x: 42,  y: 130, w: SW, h: SH, sector: 'C', row: 1 },
  { id: 'C-12', x: 59,  y: 130, w: SW, h: SH, sector: 'C', row: 1 },
  { id: 'C-13', x: 76,  y: 130, w: SW, h: SH, sector: 'C', row: 1 },
  { id: 'C-14', x: 93,  y: 130, w: SW, h: SH, sector: 'C', row: 1 },
  { id: 'C-15', x: 110, y: 130, w: SW, h: SH, sector: 'C', row: 1 },
  { id: 'C-16', x: 127, y: 130, w: SW, h: SH, sector: 'C', row: 1 },
];

const OCCUPIED = new Set([
  'A-01', 'A-03', 'A-04', 'A-06',
  'A-07', 'A-09', 'A-10', 'A-12',
  'B-01', 'B-02', 'B-04', 'B-06',
  'B-07', 'B-08', 'B-10', 'B-12',
  'C-01', 'C-03', 'C-05', 'C-07',
  'C-09', 'C-11', 'C-13', 'C-15',
]);

// Maps sector selection label → assigned spot ID
export const SECTOR_SPOT_MAP: Record<string, string> = {
  'Sector A - Cerca salida principal': 'A-02',
  'Sector B - Techado': 'B-03',
  'Sector C - Estadio': 'C-02',
};

function getSpotStatus(id: string, reserved: string[]): 'available' | 'occupied' | 'reserved' {
  if (reserved.includes(id)) return 'reserved';
  if (OCCUPIED.has(id)) return 'occupied';
  return 'available';
}

function buildRoute(spot: SpotData): string {
  const cx = spot.x + SW / 2;
  const entryX = 4, entryY = 200;

  if (spot.sector === 'A' || spot.sector === 'B') {
    if (spot.row === 0) {
      // Come up left road → main road → center gap → aisle → spot bottom
      return `M${entryX},${entryY} L${entryX},86 L123,86 L123,47 L${cx},47 L${cx},38`;
    } else {
      // Come up left road → main road → across → spot bottom
      return `M${entryX},${entryY} L${entryX},86 L${cx},86 L${cx},76`;
    }
  } else {
    if (spot.row === 0) {
      // Come up left road → C aisle → spot bottom
      return `M${entryX},${entryY} L${entryX},123 L${cx},123 L${cx},116`;
    } else {
      // Come up left road → bottom road → spot bottom
      return `M${entryX},${entryY} L${entryX},159 L${cx},159 L${cx},150`;
    }
  }
}

interface ParkingMapProps {
  reservedSpotIds?: string[];
  /** Single spot ID to draw the animated route toward */
  routeTargetId?: string | null;
  showRoute?: boolean;
  className?: string;
}

export function ParkingMap({ reservedSpotIds = [], routeTargetId, showRoute = false, className = '' }: ParkingMapProps) {
  const routePathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (!showRoute || !routePathRef.current || !routeTargetId) return;
    const path = routePathRef.current;
    const len = path.getTotalLength();
    path.style.strokeDasharray = `${len}`;
    path.style.strokeDashoffset = `${len}`;
    path.getBoundingClientRect();
    path.style.transition = 'stroke-dashoffset 2.2s cubic-bezier(0.4,0,0.2,1)';
    path.style.strokeDashoffset = '0';
  }, [showRoute, routeTargetId]);

  const reservedSpot = routeTargetId ? SPOTS.find(s => s.id === routeTargetId) ?? null : null;
  const routePath = reservedSpot ? buildRoute(reservedSpot) : null;

  return (
    <svg
      viewBox="0 0 250 215"
      className={`w-full ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      style={{ background: '#111827' }}
    >
      {/* ── Surface layer ── */}
      {/* Left corridor (left road) */}
      <rect x="0" y="0" width="8" height="215" fill="#1f2937" />
      {/* Center gap road between A and B */}
      <rect x="107" y="0" width="32" height="96" fill="#1f2937" />
      {/* Main horizontal road between top sectors and C */}
      <rect x="0" y="76" width="250" height="20" fill="#1f2937" />
      {/* Aisle between A rows */}
      <rect x="8" y="38" width="99" height="18" fill="#1f2937" />
      {/* Aisle between B rows */}
      <rect x="139" y="38" width="99" height="18" fill="#1f2937" />
      {/* Aisle between C rows */}
      <rect x="0" y="116" width="155" height="14" fill="#1f2937" />
      {/* Bottom road */}
      <rect x="0" y="150" width="250" height="20" fill="#1f2937" />
      {/* Extra space below */}
      <rect x="0" y="170" width="250" height="45" fill="#111827" />

      {/* ── Dashed centre-line markings ── */}
      {[18, 36, 54, 72, 90].map((x) => (
        <rect key={`da-${x}`} x={x} y={43} width={3} height={8} fill="#374151" rx={1} />
      ))}
      {[149, 167, 185, 203, 221].map((x) => (
        <rect key={`db-${x}`} x={x} y={43} width={3} height={8} fill="#374151" rx={1} />
      ))}
      {[14, 32, 50, 68, 86, 104, 122, 140].map((x) => (
        <rect key={`dc-${x}`} x={x} y={120} width={3} height={6} fill="#374151" rx={1} />
      ))}

      {/* ── Sector background letters ── */}
      <text x="55"  y="65"  textAnchor="middle" fill="#ffffff" fillOpacity="0.04" fontSize="58" fontWeight="900" fontFamily="sans-serif">A</text>
      <text x="185" y="65"  textAnchor="middle" fill="#ffffff" fillOpacity="0.04" fontSize="58" fontWeight="900" fontFamily="sans-serif">B</text>
      <text x="75"  y="148" textAnchor="middle" fill="#ffffff" fillOpacity="0.04" fontSize="58" fontWeight="900" fontFamily="sans-serif">C</text>

      {/* ── Sector labels ── */}
      <text x="55"  y="13" textAnchor="middle" fill="#64748b" fontSize="5.5" fontFamily="sans-serif" fontWeight="700" letterSpacing="1">SECTOR A</text>
      <text x="185" y="13" textAnchor="middle" fill="#64748b" fontSize="5.5" fontFamily="sans-serif" fontWeight="700" letterSpacing="1">SECTOR B</text>
      <text x="75"  y="92" textAnchor="middle" fill="#64748b" fontSize="5.5" fontFamily="sans-serif" fontWeight="700" letterSpacing="1">SECTOR C</text>

      {/* EXIT badge near sector A */}
      <rect x="8" y="6" width="18" height="7" fill="#059669" rx="2" />
      <text x="17" y="11.5" textAnchor="middle" fill="white" fontSize="4.5" fontFamily="sans-serif" fontWeight="700">EXIT</text>

      {/* TECHADO badge for sector B */}
      <rect x="224" y="6" width="22" height="7" fill="#4f46e5" rx="2" />
      <text x="235" y="11.5" textAnchor="middle" fill="white" fontSize="4.5" fontFamily="sans-serif" fontWeight="700">TECHO</text>

      {/* ── Parking spots ── */}
      {SPOTS.map((spot) => {
        const status = getSpotStatus(spot.id, reservedSpotIds);
        const fill =
          status === 'occupied' ? '#ef4444'
          : status === 'reserved' ? '#eab308'
          : '#22c55e';
        const isRes = status === 'reserved';
        return (
          <g key={spot.id}>
            <rect
              x={spot.x} y={spot.y}
              width={spot.w} height={spot.h}
              fill={fill}
              fillOpacity={isRes ? 1 : 0.82}
              rx={2}
              stroke={isRes ? '#fde047' : '#111827'}
              strokeWidth={isRes ? 1.5 : 0.5}
            />
            {isRes && (
              <text
                x={spot.x + SW / 2}
                y={spot.y + SH / 2}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="white"
                fontSize="7"
              >★</text>
            )}
          </g>
        );
      })}

      {/* ── Route: ghost underlay + animated foreground ── */}
      {showRoute && routePath && (
        <>
          <path
            d={routePath}
            fill="none"
            stroke="#3b82f6"
            strokeWidth={3}
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity={0.18}
          />
          <path
            ref={routePathRef}
            d={routePath}
            fill="none"
            stroke="#60a5fa"
            strokeWidth={2.2}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="5 4"
          />
          {reservedSpot && (
            <circle
              cx={reservedSpot.x + SW / 2}
              cy={reservedSpot.y + SH / 2}
              r={5}
              fill="#1d4ed8"
              opacity={0.85}
            />
          )}
        </>
      )}

      {/* ── Entrance marker (bottom-left) ── */}
      <circle cx={4} cy={195} r={6} fill="#005B96" />
      <text x={4} y={195} textAnchor="middle" dominantBaseline="middle" fill="white" fontSize="5.5" fontWeight="700">E</text>
      <text x={14} y={199} fill="#64748b" fontSize="5" fontFamily="sans-serif">ENTRADA</text>
    </svg>
  );
}
