// 입력 페이지·공유 페이지 하단 고정 바: 이전 / 다음
export default function WizardBar({ onBack, nextLabel, onNext, nextDisabled, hint, primary = true }) {
  return (
    <div className="bar wbar">
      <div className="wbar-inner">
        <button type="button" className="btn" onClick={onBack} disabled={!onBack}>
          이전
        </button>
        <span className={`wbar-hint ${nextDisabled ? 'warn' : ''}`}>{hint}</span>
        <button
          type="button"
          className={`btn ${primary ? 'primary' : ''}`}
          onClick={onNext}
          disabled={nextDisabled}
        >
          {nextLabel}
        </button>
      </div>
    </div>
  );
}
