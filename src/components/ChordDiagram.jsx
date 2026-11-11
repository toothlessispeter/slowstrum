import { CHORDS } from '../chords.js';

// 6줄 × 4프렛 운지 다이어그램 (SVG)
const LEFT = 22;
const RIGHT = 88;
const TOP = 26;
const FRET_H = 22;
const FRETS = 4;
const STRING_GAP = (RIGHT - LEFT) / 5;

const sx = (i) => LEFT + i * STRING_GAP;

export default function ChordDiagram({ name, className = '' }) {
  const chord = CHORDS[name];
  if (!chord) return null;

  const { frets, barre } = chord;
  const pressed = frets.filter((f) => f > 0);
  const maxFret = Math.max(0, ...pressed);
  const base = maxFret > FRETS ? Math.min(...pressed) : 1;
  const rowY = (f) => TOP + (f - base + 0.5) * FRET_H;
  const bottom = TOP + FRETS * FRET_H;

  return (
    <svg
      className={`diagram ${className}`}
      viewBox="0 0 100 124"
      role="img"
      aria-label={`${name} 코드 운지`}
    >
      {/* 프렛 가로줄 */}
      {Array.from({ length: FRETS + 1 }, (_, k) => (
        <line
          key={`f${k}`}
          x1={LEFT}
          x2={RIGHT}
          y1={TOP + k * FRET_H}
          y2={TOP + k * FRET_H}
          stroke={k === 0 && base === 1 ? '#ffffff' : '#3a3a3a'}
          strokeWidth={k === 0 && base === 1 ? 3 : 1}
        />
      ))}

      {/* 줄 세로선 */}
      {frets.map((_, i) => (
        <line key={`s${i}`} x1={sx(i)} x2={sx(i)} y1={TOP} y2={bottom} stroke="#666666" strokeWidth="1" />
      ))}

      {/* 시작 프렛 표시 */}
      {base > 1 && (
        <text x="2" y={rowY(base) + 3} className="diagram-fr">
          {base}fr
        </text>
      )}

      {/* 개방현 O / 안 치는 줄 X */}
      {frets.map((f, i) => {
        const y = TOP - 10;
        if (f === 0) {
          return <circle key={`o${i}`} cx={sx(i)} cy={y} r="3.6" fill="none" stroke="#cccccc" strokeWidth="1.2" />;
        }
        if (f === -1) {
          return (
            <g key={`x${i}`} stroke="#999999" strokeWidth="1.2">
              <line x1={sx(i) - 3.4} x2={sx(i) + 3.4} y1={y - 3.4} y2={y + 3.4} />
              <line x1={sx(i) - 3.4} x2={sx(i) + 3.4} y1={y + 3.4} y2={y - 3.4} />
            </g>
          );
        }
        return null;
      })}

      {/* 바레 */}
      {barre && (
        <rect
          x={sx(barre.from) - 5}
          y={rowY(barre.fret) - 5}
          width={sx(barre.to) - sx(barre.from) + 10}
          height="10"
          rx="5"
          fill="#ffffff"
        />
      )}

      {/* 손가락 위치 점 */}
      {frets.map((f, i) => {
        if (f <= 0) return null;
        if (barre && f === barre.fret && i >= barre.from && i <= barre.to) return null;
        return <circle key={`d${i}`} cx={sx(i)} cy={rowY(f)} r="5.2" fill="#ffffff" />;
      })}
    </svg>
  );
}
