import { useEffect, useRef, useState } from 'react';
import { CHORD_GROUPS, PRESETS } from '../chords.js';
import { TIME_SIGNATURES, TITLE_MAX, configToQuery, effectiveBpm } from '../config.js';
import { STEPS, pad } from '../steps.js';
import ChordDiagram from './ChordDiagram.jsx';

function StepHeader({ index, title, lead }) {
  return (
    <header className="step-head">
      <p className="caption">
        {pad(index + 1)} / {pad(STEPS.length)} — {STEPS[index].ko}
      </p>
      <h1 className="display-lg">{title}</h1>
      {lead && <p className="lead">{lead}</p>}
    </header>
  );
}

function usedChords(validation) {
  return [...new Set(validation.items.filter((i) => !i.error).map((i) => i.chord))];
}

function totalBeats(validation) {
  return validation.items.filter((i) => !i.error).reduce((s, i) => s + i.beats, 0);
}

/* ---------------- 01 SONG ---------------- */
export function SongStep({ cfg, setCfg, validation, linkError }) {
  return (
    <main className="page step-page">
      {linkError && (
        <p className="notice" role="alert">
          링크 정보를 읽을 수 없어요. 선생님께 링크를 다시 받아 주세요.
        </p>
      )}
      <StepHeader
        index={0}
        title="What are we playing?"
        lead="이번 주에 연습할 곡의 제목을 적어 주세요. 카포 위치나 예배 날짜를 같이 적으면 학생에게 메모로 전달돼요."
      />

      <section className="panel">
        <label className="field-label caption" htmlFor="title">
          곡 제목 · 메모 (선택)
        </label>
        <input
          id="title"
          className="input big"
          value={cfg.title}
          onChange={(e) => setCfg((c) => ({ ...c, title: e.target.value }))}
          maxLength={TITLE_MAX}
          placeholder="11/9 예배 2번 곡 · 카포 2"
          autoComplete="off"
        />
        <p className="hint">
          {cfg.title.length}/{TITLE_MAX}
        </p>
        {validation.titleError && <p className="error">{validation.titleError}</p>}
      </section>

      <section className="wire-note">
        <p className="caption">이 페이지에서 정하는 것</p>
        <ul>
          <li>연습 화면 맨 위에 보일 제목</li>
          <li>비워 두면 &ldquo;제목 없음&rdquo;으로 표시</li>
        </ul>
      </section>
    </main>
  );
}

/* ---------------- 02 CHORDS ---------------- */
export function ChordsStep({ cfg, setCfg, validation }) {
  const normalized = cfg.progression.trim().split(/\s+/).join(' ');
  const chords = usedChords(validation);

  return (
    <main className="page step-page">
      <StepHeader
        index={1}
        title="Chord progression"
        lead="프리셋을 고르거나 직접 입력하세요. 형식은 코드:박자 수, 코드 사이는 공백이에요."
      />

      <section className="panel">
        <p className="field-label caption">프리셋 — 찬양에 자주 쓰는 키</p>
        <div className="presets">
          {PRESETS.map((p) => (
            <button
              type="button"
              key={p.name}
              className={`preset ${normalized === p.progression ? 'selected' : ''}`}
              onClick={() => setCfg((c) => ({ ...c, progression: p.progression }))}
            >
              <span className="caption">{p.name}</span>
              <span className="preset-prog">{p.progression}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="panel">
        <label className="field-label caption" htmlFor="prog">
          직접 입력
        </label>
        <textarea
          id="prog"
          className="input mono-input"
          rows={3}
          value={cfg.progression}
          onChange={(e) => setCfg((c) => ({ ...c, progression: e.target.value }))}
          placeholder="G:4 D/F#:4 Em:4 C:4"
          spellCheck={false}
          autoCapitalize="off"
          autoCorrect="off"
        />

        {validation.items.length > 0 && (
          <div className="chips" aria-label="코드 미리보기">
            {validation.items.map((item, i) => (
              <span key={i} className={`chip ${item.error ? 'err' : ''}`}>
                {item.error === 'format' ? item.raw : `${item.chord} · ${item.beats}`}
              </span>
            ))}
          </div>
        )}

        {validation.progressionErrors.map((msg) => (
          <p key={msg} className="error">
            {msg}
          </p>
        ))}
      </section>

      {chords.length > 0 && (
        <section className="panel">
          <p className="field-label caption">
            쓰인 코드 {chords.length}개 · 총 {totalBeats(validation)}박자
          </p>
          <div className="diagram-list">
            {chords.map((name) => (
              <figure key={name} className="diagram-item">
                <figcaption className="chord-name sm">{name}</figcaption>
                <ChordDiagram name={name} />
              </figure>
            ))}
          </div>
        </section>
      )}

      <details className="supported">
        <summary className="caption">지원 코드 26개 보기</summary>
        <div className="supported-groups">
          {CHORD_GROUPS.map((g) => (
            <p key={g.name}>
              <span className="caption">{g.name}</span>
              <span className="mono-list">{g.chords.join('  ')}</span>
            </p>
          ))}
        </div>
      </details>
    </main>
  );
}

/* ---------------- 03 TEMPO ---------------- */
export function TempoStep({ cfg, setCfg, validation }) {
  const chords = validation.items.filter((i) => !i.error);
  const beats = totalBeats(validation);
  const measures = Math.ceil(beats / validation.beatsPerBar);

  return (
    <main className="page step-page">
      <StepHeader
        index={2}
        title="Tempo & time"
        lead="원곡 BPM과 박자표를 정해요. 연습 속도는 다음 페이지에서 %로 낮출 수 있어요."
      />

      <section className="panel tempo-panel">
        <div>
          <label className="field-label caption" htmlFor="bpm">
            원곡 BPM (40~200)
          </label>
          <div className="bpm-field">
            <input
              id="bpm"
              className="input bpm-input"
              inputMode="numeric"
              value={cfg.bpm}
              onChange={(e) => setCfg((c) => ({ ...c, bpm: e.target.value }))}
            />
            <span className="unit">BPM</span>
          </div>
          {validation.bpmError && <p className="error">{validation.bpmError}</p>}
        </div>

        <div>
          <p className="field-label caption">박자표</p>
          <div className="toggles" role="radiogroup" aria-label="박자표">
            {Object.keys(TIME_SIGNATURES).map((ts) => (
              <button
                type="button"
                key={ts}
                role="radio"
                aria-checked={cfg.ts === ts}
                className={`toggle ${cfg.ts === ts ? 'on' : ''}`}
                onClick={() => setCfg((c) => ({ ...c, ts }))}
              >
                {ts}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="summary">
        <p className="caption">지금까지 입력한 내용</p>
        <dl>
          <div>
            <dt className="caption">Title</dt>
            <dd>{cfg.title.trim() || '제목 없음'}</dd>
          </div>
          <div>
            <dt className="caption">Chords</dt>
            <dd className="mono-list">{chords.map((c) => c.chord).join('  ')}</dd>
          </div>
          <div>
            <dt className="caption">Length</dt>
            <dd>
              {beats}박자 · {measures}마디
            </dd>
          </div>
        </dl>
      </section>
    </main>
  );
}

/* ---------------- 05 SHARE ---------------- */
export function ShareStep({ cfg, validation }) {
  const [copy, setCopy] = useState(null);
  const timer = useRef(null);
  useEffect(() => () => clearTimeout(timer.current), []);

  const url = `${window.location.origin}${window.location.pathname}?${configToQuery(cfg)}`;
  const eff = effectiveBpm(validation.bpm, cfg.speed);

  const copyLink = async () => {
    clearTimeout(timer.current);
    try {
      await navigator.clipboard.writeText(url);
      setCopy('ok');
      timer.current = setTimeout(() => setCopy(null), 2000);
    } catch {
      setCopy('fail');
    }
  };

  return (
    <main className="page step-page">
      <StepHeader
        index={4}
        title="Send to your student"
        lead="링크를 복사해서 카카오톡에 붙여넣으세요. 학생은 로그인 없이 링크를 열면 연습 화면에서 바로 시작해요."
      />

      <section className="summary">
        <p className="caption">링크에 담기는 설정</p>
        <dl>
          <div>
            <dt className="caption">Title</dt>
            <dd>{cfg.title.trim() || '제목 없음'}</dd>
          </div>
          <div>
            <dt className="caption">Progression</dt>
            <dd className="mono-list">{cfg.progression.trim().split(/\s+/).join('  ')}</dd>
          </div>
          <div>
            <dt className="caption">Tempo</dt>
            <dd>
              원곡 {validation.bpm} BPM · {cfg.ts}
            </dd>
          </div>
          <div>
            <dt className="caption">Speed</dt>
            <dd>
              {eff.value} BPM (원곡의 {cfg.speed}%)
            </dd>
          </div>
        </dl>
      </section>

      <section className="panel">
        <label className="field-label caption" htmlFor="share-url">
          공유 링크
        </label>
        <input
          id="share-url"
          className="input link-input"
          readOnly
          value={url}
          onFocus={(e) => e.target.select()}
        />
        <div className="share-actions">
          <button type="button" className="btn primary" onClick={copyLink}>
            Copy link
          </button>
        </div>
        {copy === 'ok' && <p className="success">링크를 복사했어요. 카카오톡에 붙여넣어 보내세요.</p>}
        {copy === 'fail' && (
          <p className="error">자동 복사가 안 됐어요. 위 링크를 길게 눌러 복사해 주세요.</p>
        )}
      </section>
    </main>
  );
}
