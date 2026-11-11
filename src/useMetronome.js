import { useCallback, useEffect, useRef, useState } from 'react';

// Web Audio lookahead 스케줄링
// - 25ms마다 앞으로 0.1초 안에 울릴 박자를 미리 예약한다.
// - 화면은 예약된 시각이 지나면 갱신한다 → 소리와 하이라이트가 어긋나지 않는다.
const LOOKAHEAD_MS = 25;
const SCHEDULE_AHEAD_SEC = 0.1;

export function useMetronome({ bpm, beatsPerBar, totalBeats }) {
  const ctxRef = useRef(null);
  const timerRef = useRef(null);
  const rafRef = useRef(null);
  const queueRef = useRef([]);
  const nextTimeRef = useRef(0);
  const beatRef = useRef(0);

  // 재생 중 속도를 바꾸면 다음 박자부터 적용되도록 ref로 최신값 유지
  const bpmRef = useRef(bpm);
  const barRef = useRef(beatsPerBar);
  const totalRef = useRef(totalBeats);
  bpmRef.current = bpm;
  barRef.current = beatsPerBar;
  totalRef.current = totalBeats;

  const [playing, setPlaying] = useState(false);
  // null = 정지, 음수 = 카운트인(-4 → -1), 0 이상 = 진행 중인 박자(누적)
  const [beat, setBeat] = useState(null);

  const click = (time, accent) => {
    const ctx = ctxRef.current;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.value = accent ? 1600 : 1000; // 1박자 = 높은 음
    gain.gain.setValueAtTime(0.0001, time);
    gain.gain.exponentialRampToValueAtTime(accent ? 0.9 : 0.5, time + 0.002);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.06);
    osc.connect(gain).connect(ctx.destination);
    osc.start(time);
    osc.stop(time + 0.07);
  };

  const scheduler = () => {
    const ctx = ctxRef.current;
    while (nextTimeRef.current < ctx.currentTime + SCHEDULE_AHEAD_SEC) {
      const b = beatRef.current;
      const bar = barRef.current;
      const pos = b < 0 ? b + bar : (b % totalRef.current) % bar;
      click(nextTimeRef.current, pos === 0);
      queueRef.current.push({ beat: b, time: nextTimeRef.current });
      nextTimeRef.current += 60 / bpmRef.current;
      beatRef.current = b + 1;
    }
  };

  const draw = () => {
    const ctx = ctxRef.current;
    let latest;
    while (queueRef.current.length && queueRef.current[0].time <= ctx.currentTime) {
      latest = queueRef.current.shift().beat;
    }
    if (latest !== undefined) setBeat(latest);
    rafRef.current = requestAnimationFrame(draw);
  };

  const halt = () => {
    clearInterval(timerRef.current);
    cancelAnimationFrame(rafRef.current);
    timerRef.current = null;
    queueRef.current = [];
  };

  const start = useCallback(async () => {
    // 브라우저 자동재생 차단 대응: 사용자가 버튼을 누른 순간에 오디오를 켠다
    if (!ctxRef.current) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      ctxRef.current = new AudioCtx();
    }
    const ctx = ctxRef.current;
    if (ctx.state === 'suspended') await ctx.resume();

    halt();
    beatRef.current = -barRef.current; // 1마디 카운트인
    nextTimeRef.current = ctx.currentTime + 0.12;
    timerRef.current = setInterval(scheduler, LOOKAHEAD_MS);
    scheduler();
    rafRef.current = requestAnimationFrame(draw);
    setPlaying(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const stop = useCallback(() => {
    halt();
    setPlaying(false);
    setBeat(null);
  }, []);

  useEffect(
    () => () => {
      halt();
      ctxRef.current?.close();
    },
    []
  );

  return { playing, beat, start, stop };
}
