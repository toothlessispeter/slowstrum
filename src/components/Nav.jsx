import { STEPS, pad } from '../steps.js';

// 상단: 워드마크 + 5단계 진행 표시. 앞 단계가 통과해야 뒤 단계를 누를 수 있다.
export default function Nav({ step, reachable, onGo }) {
  return (
    <header className="topbar">
      <nav className="nav">
        <span className="wordmark">SlowStrum</span>

        <ol className="steps">
          {STEPS.map((s, i) => (
            <li key={s.key}>
              <button
                type="button"
                className={`step-link ${i === step ? 'active' : ''} ${i < step ? 'done' : ''}`}
                disabled={!reachable(i)}
                onClick={() => onGo(i)}
                aria-current={i === step ? 'step' : undefined}
              >
                <span className="step-no">{pad(i + 1)}</span>
                {s.label}
              </button>
            </li>
          ))}
        </ol>

        <span className="step-mobile">
          {pad(step + 1)} / {pad(STEPS.length)} · {STEPS[step].label}
        </span>
      </nav>
      <div className="progress" aria-hidden="true">
        <span style={{ width: `${((step + 1) / STEPS.length) * 100}%` }} />
      </div>
    </header>
  );
}
