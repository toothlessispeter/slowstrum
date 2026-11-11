import { useEffect, useMemo, useRef, useState } from 'react';
import { useMetronome } from '../useMetronome.js';
import {
  FLOOR_BPM,
  SPEED_MAX,
  SPEED_MIN,
  SPEED_STEP,
  buildTimeline,
  effectiveBpm,
} from '../config.js';
import BeatGrid from './BeatGrid.jsx';
import ChordDiagram from './ChordDiagram.jsx';

export default function PracticeScreen({ cfg, validation, onSpeed, onShare }) {
  const { items, beatsPerBar, bpm } = validation;
  const cells = useMemo(() => buildTimeline(items), [items]);
  const total = cells.length;
  const measures = Math.ceil(total / beatsPerBar);
  const speed = cfg.speed;
  const eff = effectiveBpm(bpm, speed);

  const { playing, beat, start, stop } = useMetronome({
    bpm: eff.value,
    beatsPerBar,
    totalBeats: total,
  });

  const [notice, setNotice] = useState(null);
  const playingRef = useRef(playing);
  playingRef.current = playing;

  const counting = playing && beat !== null && beat < 0;
  const cellIndex = playing && beat !== null && beat >= 0 ? beat % total : null;
  const curItem = cellIndex === null ? 0 : cells[cellIndex].itemIndex;
  const nextItem = (curItem + 1) % items.length;
  const aboutToChange =
    cellIndex !== null && items.length > 1 && cells[(cellIndex + 1) % total].isChange;

  // 재생 중 다른 앱·탭으로 이동하면 정지
  useEffect(() => {
    const onVisibility = () => {
      if (document.hidden && playingRef.current) {
        stop();
        setNotice('다른 화면으로 이동해서 정지했어요. 다시 시작을 눌러 주세요.');
      }
    };
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, [stop]);

  const handleStart = () => {
    setNotice(null);
    start();
  };

  const toggle = () => (playingRef.current ? stop() : handleStart());

  // 노트북 레슨용: 스페이스바로 시작/정지
  useEffect(() => {
    const onKey = (e) => {
      if (e.code !== 'Space') return;
      const tag = e.target.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'BUTTON') return;
      e.preventDefault();
      toggle();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  const setSpeed = (v) => onSpeed(Math.min(SPEED_MAX, Math.max(SPEED_MIN, v)));

  const now = items[curItem].chord;
  const next = items[nextItem].chord;

  return (
    <>
      <main className="page practice">
        <header className="practice-head">
          <p className="caption">04 / 05 — 연습</p>
          <h1 className="display-md">{cfg.title.trim() || '제목 없음'}</h1>
          <p className="caption meta">
            원곡 {bpm} BPM · {cfg.ts} · 코드 {items.length}개 · {measures}마디
          </p>
        </header>

        {notice && (
          <p className="notice" role="status">
            {notice}
          </p>
        )}

        <div className="practice-body">
          <aside className="chord-panel" aria-live="polite">
            <div className="now-card">
              <p className="caption">Now</p>
              <p className="chord-name lg">{now}</p>
              <ChordDiagram name={now} className="lg" />
            </div>
            <div className={`next-card ${aboutToChange ? 'blink' : ''}`}>
              <p className="caption">Next</p>
              <p className="chord-name md">{next}</p>
              <ChordDiagram name={next} className="sm" />
            </div>
          </aside>

          <section className="grid-area" aria-label="박자 그리드">
            <BeatGrid cells={cells} items={items} beatsPerBar={beatsPerBar} current={cellIndex} />
          </section>
        </div>
      </main>

      <div className="bar">
        <div className="bar-inner">
          <div className="readout">
            <span className="bpm-big">
              {eff.value}
              <small> BPM</small>
            </span>
            <span className="caption">
              원곡 {bpm}의 {speed}%
            </span>
          </div>

          <div className="speed">
            <button
              type="button"
              className="btn sm"
              onClick={() => setSpeed(speed - SPEED_STEP)}
              disabled={speed <= SPEED_MIN}
            >
              −5%
            </button>
            <input
              type="range"
              className="slider"
              min={SPEED_MIN}
              max={SPEED_MAX}
              step={SPEED_STEP}
              value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
              aria-label="연습 속도"
            />
            <button
              type="button"
              className="btn sm"
              onClick={() => setSpeed(speed + SPEED_STEP)}
              disabled={speed >= SPEED_MAX}
            >
              +5%
            </button>
          </div>

          <div className="actions">
            <button
              type="button"
              className={`btn ${playing ? '' : 'primary'}`}
              onClick={toggle}
            >
              {playing ? '■ Stop' : '▶ Start'}
            </button>
            <button type="button" className="btn" onClick={onShare}>
              Share →
            </button>
          </div>
        </div>

        <div className="bar-notes">
          {eff.floored && <p>가장 느린 속도({FLOOR_BPM} BPM)예요.</p>}
          {playing && <p className="muted">소리가 안 들리면 무음 모드와 볼륨을 확인해 주세요.</p>}
        </div>
      </div>

      {counting && (
        <div className="countin" aria-live="assertive">
          <span>{-beat}</span>
        </div>
      )}
    </>
  );
}
