import { useEffect, useRef } from 'react';

// 마디 × 박자 칸. 한 줄에 2마디, 현재 박자 칸은 흰색으로 채운다.
export default function BeatGrid({ cells, items, beatsPerBar, current }) {
  const measureRefs = useRef([]);

  const measures = [];
  for (let i = 0; i < cells.length; i += beatsPerBar) {
    measures.push(
      cells.slice(i, i + beatsPerBar).map((cell, k) => ({ ...cell, index: i + k, pos: k }))
    );
  }

  const currentMeasure = current === null ? null : Math.floor(current / beatsPerBar);

  // 진행이 길 때 현재 마디가 화면 밖으로 나가지 않게 따라간다
  useEffect(() => {
    if (currentMeasure === null) return;
    measureRefs.current[currentMeasure]?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }, [currentMeasure]);

  return (
    <div className="beat-grid">
      {measures.map((measure, mi) => (
        <div
          key={mi}
          ref={(el) => {
            measureRefs.current[mi] = el;
          }}
          className={`measure ${mi === currentMeasure ? 'is-current' : ''}`}
          style={{ '--beats': beatsPerBar }}
        >
          <span className="measure-no">{String(mi + 1).padStart(2, '0')}</span>
          {measure.map((cell) => (
            <div
              key={cell.index}
              className={`cell ${cell.index === current ? 'now' : ''} ${cell.isChange ? 'change' : ''}`}
            >
              <div className="cell-label">
                {cell.isChange && <span className="cell-chord">{items[cell.itemIndex].chord}</span>}
                {cell.pos === 0 && <span className="downbeat" aria-label="1박자" />}
              </div>
              <div className="cell-box">{cell.pos + 1}</div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
