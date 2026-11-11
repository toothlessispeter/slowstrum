import { useEffect, useMemo, useState } from 'react';
import Nav from './components/Nav.jsx';
import WizardBar from './components/WizardBar.jsx';
import PracticeScreen from './components/PracticeScreen.jsx';
import { ChordsStep, ShareStep, SongStep, TempoStep } from './components/Steps.jsx';
import { DEFAULT_CONFIG, configToQuery, readConfigFromUrl, validateConfig } from './config.js';
import { PRACTICE_STEP, SHARE_STEP, STEPS, canReach, stepFromHash, stepValidity } from './steps.js';

// 주소 = ?설정값#페이지  (예: /?p=G:4+D:4&b=72&ts=4-4&s=50#practice)
function urlFor(step, cfg, validation) {
  const query = validation.ok ? `?${configToQuery(cfg)}` : '';
  return `${window.location.pathname}${query}#${STEPS[step].key}`;
}

function readLocation() {
  const r = readConfigFromUrl(window.location.search);
  const cfg = r.status === 'ok' ? r.cfg : DEFAULT_CONFIG;
  let step = stepFromHash(window.location.hash);
  // 학생이 받은 링크(#없음)는 바로 연습 페이지로
  if (step < 0) step = r.status === 'ok' ? PRACTICE_STEP : 0;
  if (!canReach(step, validateConfig(cfg))) step = 0;
  return { cfg, step, status: r.status };
}

export default function App() {
  const initial = useMemo(readLocation, []);
  const [cfg, setCfg] = useState(initial.cfg);
  const [step, setStep] = useState(initial.step);
  const [linkError, setLinkError] = useState(initial.status === 'bad');

  const validation = useMemo(() => validateConfig(cfg), [cfg]);
  const reachable = (i) => canReach(i, validation);

  // 브라우저 뒤로가기/앞으로가기
  useEffect(() => {
    const onPop = () => {
      const loc = readLocation();
      if (loc.status === 'ok') setCfg(loc.cfg);
      setStep(loc.step);
      window.scrollTo(0, 0);
    };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  // 주소가 항상 현재 페이지와 설정값을 담고 있게 유지
  useEffect(() => {
    window.history.replaceState(null, '', urlFor(step, cfg, validation));
  }, [step, cfg, validation]);

  const goTo = (i) => {
    if (i === step || !canReach(i, validation)) return;
    window.history.pushState(null, '', urlFor(i, cfg, validation));
    setStep(i);
    setLinkError(false);
    window.scrollTo(0, 0);
  };

  const restart = () => {
    setCfg(DEFAULT_CONFIG);
    window.history.pushState(null, '', `${window.location.pathname}#song`);
    setStep(0);
    window.scrollTo(0, 0);
  };

  const ok = stepValidity(validation);
  const stepProps = { cfg, setCfg, validation };

  return (
    <>
      <Nav step={step} reachable={reachable} onGo={goTo} />

      {step === 0 && <SongStep {...stepProps} linkError={linkError} />}
      {step === 1 && <ChordsStep {...stepProps} />}
      {step === 2 && <TempoStep {...stepProps} onEdit={goTo} />}
      {step === PRACTICE_STEP && (
        <PracticeScreen
          cfg={cfg}
          validation={validation}
          onSpeed={(speed) => setCfg((c) => ({ ...c, speed }))}
          onShare={() => goTo(SHARE_STEP)}
        />
      )}
      {step === SHARE_STEP && <ShareStep cfg={cfg} validation={validation} />}

      {step < PRACTICE_STEP && (
        <WizardBar
          onBack={step > 0 ? () => goTo(step - 1) : null}
          nextLabel={step === 2 ? '연습 시작하기' : '다음'}
          onNext={() => goTo(step + 1)}
          nextDisabled={!ok[step]}
          hint={ok[step] ? `${step + 1}/${STEPS.length}단계` : '빨간 글씨로 표시된 부분을 고쳐 주세요'}
        />
      )}
      {step === SHARE_STEP && (
        <WizardBar
          onBack={() => goTo(PRACTICE_STEP)}
          nextLabel="새 곡 만들기"
          onNext={restart}
          primary={false}
          hint="새 곡을 만들면 1단계로 돌아가요"
        />
      )}
    </>
  );
}
