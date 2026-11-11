// 입력 페이지·공유 페이지 하단 고정 바: ← 이전 / 다음 →
export default function WizardBar({ backLabel, onBack, nextLabel, onNext, nextDisabled, hint, primary = true }) {
  return (
    <div className="bar wbar">
      <div className="wbar-inner">
        <button type="button" className="btn" onClick={onBack} disabled={!onBack}>
          ← {backLabel || 'Back'}
        </button>
        <span className="wbar-hint">{hint}</span>
        <button type="button" className={`btn ${primary ? 'primary' : ''}`} onClick={onNext} disabled={nextDisabled}>
          {nextLabel} →
        </button>
      </div>
    </div>
  );
}
