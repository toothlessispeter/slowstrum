import { useEffect, useRef, useState } from 'react';
import { CHORD_GROUPS, PRESETS } from '../chords.js';
import { TIME_SIGNATURES, TITLE_MAX, configToQuery, effectiveBpm } from '../config.js';
import { STEPS } from '../steps.js';
import ChordDiagram from './ChordDiagram.jsx';

function StepHeader({ index, title, lead }) {
  return (
    <header className="step-head">
      <p className="caption">
        {index + 1}/{STEPS.length}단계 · {STEPS[index].ko}
      </p>
      <h1 className="display-lg">{title}</h1>
      {lead && <p className="lead">{lead}</p>}
    </header>
  );
}

function validChords(validation) {
  return validation.items.filter((i) => !i.error);
}
function usedChords(validation) {
  return [...new Set(validChords(validation).map((i) => i.chord))];
}
function totalBeats(validation) {
  return validChords(validation).reduce((s, i) => s + i.beats, 0);
}

/* ---------------- 1단계 · 곡 ---------------- */
export function SongStep({ cfg, setCfg, validation, linkError }) {
  const title = cfg.title.trim();
  return (
    <main className="page step-page">
      {linkError && (
        <p className="notice" role="alert">
          링크를 열 수 없어요. 선생님께 링크를 다시 보내 달라고 해 주세요.
        </p>
      )}
      <StepHeader
        index={0}
        title="어떤 곡을 연습할까요?"
        lead="연습 화면 맨 위에 보일 제목이에요. 카포 위치나 예배 날짜를 같이 적으면 학생도 바로 알 수 있어요."
      />

      <section className="panel">
        <label className="field-label" htmlFor="title">
          곡 제목
        </label>
        <input
          id="title"
          className="input big"
          value={cfg.title}
          onChange={(e) => setCfg((c) => ({ ...c, title: e.target.value }))}
          maxLength={TITLE_MAX}
          placeholder="예) 11/9 예배 2번 곡, 카포 2"
          autoComplete="off"
        />
        <p className="hint">
          안 적어도 괜찮아요 · {cfg.title.length}/{TITLE_MAX}자
        </p>
        {validation.titleError && <p className="error">{validation.titleError}</p>}
      </section>

      <section className="preview-card">
        <p className="caption">학생 화면에는 이렇게 보여요</p>
        <p className={`preview-title ${title ? '' : 'empty'}`}>{title || '제목 없음'}</p>
      </section>
    </main>
  );
}

/* ---------------- 2단계 · 코드 ---------------- */
export function ChordsStep({ cfg, setCfg, validation }) {
  const normalized = cfg.progression.trim().split(/\s+/).join(' ');
  const chords = usedChords(validation);

  return (
    <main className="page step-page">
      <StepHeader
        index={1}
        title="어떤 코드로 연습할까요?"
        lead="자주 쓰는 진행을 고르거나 직접 입력해 주세요."
      />

      <section className="panel">
        <p className="field-label">자주 쓰는 진행</p>
        <div className="presets">
          {PRESETS.map((p) => (
            <button
              type="button"
              key={p.name}
              className={`preset ${normalized === p.progression ? 'selected' : ''}`}
              onClick={() => setCfg((c) => ({ ...c, progression: p.progression }))}
            >
              <span className="preset-name">{p.name}</span>
              <span className="preset-prog">{p.progression}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="panel">
        <label className="field-label" htmlFor="prog">
          직접 입력하기
        </label>
        <p className="field-help">
          코드 이름 뒤에 :와 박자 수를 붙이고, 코드 사이는 띄어 써 주세요. G:4는 G 코드를 4박자
          동안 친다는 뜻이에요.
        </p>
        <textarea
          id="prog"
          className="input mono-input"
          rows={2}
          value={cfg.progression}
          onChange={(e) => setCfg((c) => ({ ...c, progression: e.target.value }))}
          placeholder="G:4 D:4 Em:4 C:4"
          spellCheck={false}
          autoCapitalize="off"
          autoCorrect="off"
        />

        {validation.items.length > 0 && (
          <div className="chips" aria-label="입력한 코드">
            {validation.items.map((item, i) => (
              <span key={i} className={`chip ${item.error ? 'err' : ''}`}>
                {item.error === 'format' ? item.raw : `${item.chord} ${item.beats}박자`}
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
          <p className="field-label">운지 미리보기</p>
          <p className="field-help">
            코드 {chords.length}개, 모두 {totalBeats(validation)}박자예요.
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
        <summary>쓸 수 있는 코드 26개 보기</summary>
        <div className="supported-groups">
          {CHORD_GROUPS.map((g) => (
            <p key={g.name}>
              <span className="supported-name">{g.name}</span>
              <span className="mono-list">{g.chords.join('   ')}</span>
            </p>
          ))}
        </div>
      </details>
    </main>
  );
}

/* ---------------- 3단계 · 빠르기 ---------------- */
export function TempoStep({ cfg, setCfg, validation, onEdit }) {
  const chords = validChords(validation);
  const beats = totalBeats(validation);
  const measures = Math.ceil(beats / validation.beatsPerBar);

  return (
    <main className="page step-page">
      <StepHeader
        index={2}
        title="원곡은 얼마나 빠른가요?"
        lead="원곡 빠르기와 박자를 알려 주세요. 연습할 때는 다음 화면에서 더 느리게 바꿀 수 있어요."
      />

      <section className="panel tempo-panel">
        <div>
          <label className="field-label" htmlFor="bpm">
            원곡 빠르기
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
          <p className="hint">잘 모르면 72로 두고 연습하면서 맞춰도 괜찮아요</p>
          {validation.bpmError && <p className="error">{validation.bpmError}</p>}
        </div>

        <div>
          <p className="field-label">박자</p>
          <div className="toggles" role="radiogroup" aria-label="박자">
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
          <p className="hint">찬양곡은 대부분 4/4예요</p>
        </div>
      </section>

      <section className="summary">
        <p className="field-label">입력한 내용을 확인해 주세요</p>
        <dl>
          <div>
            <dt>제목</dt>
            <dd>{cfg.title.trim() || '제목 없음'}</dd>
            <button type="button" className="text-btn" onClick={() => onEdit(0)}>
              고치기
            </button>
          </div>
          <div>
            <dt>코드</dt>
            <dd className="mono-list">{chords.map((c) => c.chord).join('  ')}</dd>
            <button type="button" className="text-btn" onClick={() => onEdit(1)}>
              고치기
            </button>
          </div>
          <div>
            <dt>길이</dt>
            <dd>
              {measures}마디, {beats}박자
            </dd>
          </div>
        </dl>
      </section>
    </main>
  );
}

/* ---------------- 5단계 · 공유 ---------------- */
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
      timer.current = setTimeout(() => setCopy(null), 2500);
    } catch {
      setCopy('fail');
    }
  };

  return (
    <main className="page step-page">
      <StepHeader
        index={4}
        title="학생에게 링크를 보내 주세요"
        lead="링크를 복사해서 카카오톡에 붙여 넣으면 돼요. 학생은 로그인 없이 링크를 열면 바로 연습 화면을 볼 수 있어요."
      />

      <section className="summary">
        <p className="field-label">링크에 담기는 내용</p>
        <dl>
          <div>
            <dt>제목</dt>
            <dd>{cfg.title.trim() || '제목 없음'}</dd>
          </div>
          <div>
            <dt>코드</dt>
            <dd className="mono-list">{cfg.progression.trim().split(/\s+/).join('  ')}</dd>
          </div>
          <div>
            <dt>원곡 빠르기</dt>
            <dd>
              {validation.bpm} BPM · {cfg.ts}박자
            </dd>
          </div>
          <div>
            <dt>연습 빠르기</dt>
            <dd>
              {eff.value} BPM (원곡의 {cfg.speed}%)
            </dd>
          </div>
        </dl>
      </section>

      <section className="panel">
        <label className="field-label" htmlFor="share-url">
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
            링크 복사하기
          </button>
        </div>
        {copy === 'ok' && <p className="success">링크를 복사했어요. 카카오톡 대화방에 붙여 넣어 주세요.</p>}
        {copy === 'fail' && (
          <p className="error">자동 복사가 안 됐어요. 위 링크를 길게 눌러서 복사해 주세요.</p>
        )}
      </section>
    </main>
  );
}
