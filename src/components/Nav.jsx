import { STEPS } from '../steps.js';

// 상단: 워드마크 + 5단계 표시 + 진행 바. 앞 단계를 다 채워야 뒤 단계를 누를 수 있다.
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
                <span className="step-no">{i + 1}</span>
                {s.ko}
              </button>
            </li>
          ))}
        </ol>

        <span className="step-mobile">
          {step + 1}/{STEPS.length}단계 · {STEPS[step].ko}
        </span>
      </nav>
      <div className="progress" aria-hidden="true">
        <span style={{ width: `${((step + 1) / STEPS.length) * 100}%` }} />
      </div>
    </header>
  );
}
