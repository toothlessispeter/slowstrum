import { CHORDS } from './chords.js';

export const TIME_SIGNATURES = { '4/4': 4, '3/4': 3, '6/8': 6 };
export const BPM_MIN = 40;
export const BPM_MAX = 200;
export const MAX_CHORDS = 64;
export const TITLE_MAX = 30;
export const SPEED_MIN = 25;
export const SPEED_MAX = 100;
export const SPEED_STEP = 5;
export const FLOOR_BPM = 20;

export const DEFAULT_CONFIG = {
  title: '',
  progression: 'G:4 D:4 Em:4 C:4',
  bpm: '72',
  ts: '4/4',
  speed: 50,
};

function suggestFormat(raw) {
  if (CHORDS[raw]) return `${raw}:4`;
  const m = raw.match(/^(.+?)(\d)$/);
  if (m && CHORDS[m[1]]) return `${m[1]}:${m[2]}`;
  return 'D:4';
}

// "G:4 D/F#:4" → [{ raw, chord, beats, error }]
export function parseProgression(text) {
  const tokens = (text || '').trim().split(/\s+/).filter(Boolean);
  const items = [];
  const errors = [];

  if (!tokens.length) {
    return { items, errors: ['연습할 코드 진행을 하나 이상 입력해 주세요.'] };
  }
  if (tokens.length > MAX_CHORDS) {
    errors.push(`코드는 ${MAX_CHORDS}개까지 입력할 수 있어요.`);
  }

  for (const raw of tokens) {
    const m = raw.match(/^([^:]+):(\d+)$/);
    if (!m) {
      items.push({ raw, chord: raw, beats: 0, error: 'format' });
      errors.push(`"${raw}"처럼 쓰지 말고 "${suggestFormat(raw)}"처럼 코드와 박자 수 사이에 콜론(:)을 넣어 주세요.`);
      continue;
    }
    const chord = m[1];
    const beats = Number(m[2]);
    if (!CHORDS[chord]) {
      items.push({ raw, chord, beats, error: 'chord' });
      errors.push(`"${chord}"은 아직 지원하지 않는 코드예요. 지원 코드 목록을 확인해 주세요.`);
      continue;
    }
    if (beats < 1 || beats > 8) {
      items.push({ raw, chord, beats, error: 'beats' });
      errors.push(`"${raw}"의 박자 수는 1에서 8 사이로 입력해 주세요.`);
      continue;
    }
    items.push({ raw, chord, beats, error: null });
  }

  return { items, errors: [...new Set(errors)] };
}

export function validateConfig(cfg) {
  const { items, errors } = parseProgression(cfg.progression);
  const bpmText = String(cfg.bpm ?? '').trim();
  const bpm = Number(bpmText);
  const bpmError =
    !/^\d+$/.test(bpmText) || bpm < BPM_MIN || bpm > BPM_MAX
      ? `BPM은 ${BPM_MIN}에서 ${BPM_MAX} 사이로 입력해 주세요.`
      : null;
  const titleError =
    (cfg.title || '').length > TITLE_MAX ? `제목은 ${TITLE_MAX}자까지 입력할 수 있어요.` : null;
  const beatsPerBar = TIME_SIGNATURES[cfg.ts];

  return {
    ok: !errors.length && !bpmError && !titleError && Boolean(beatsPerBar),
    items,
    progressionErrors: errors,
    bpmError,
    titleError,
    bpm,
    beatsPerBar: beatsPerBar || 4,
  };
}

// 코드 진행 → 박자 칸 배열
export function buildTimeline(items) {
  const cells = [];
  items.forEach((item, itemIndex) => {
    for (let b = 0; b < item.beats; b += 1) {
      cells.push({ itemIndex, isChange: b === 0 });
    }
  });
  return cells;
}

export function effectiveBpm(bpm, speed) {
  const raw = Math.round((bpm * speed) / 100);
  return { raw, value: Math.max(FLOOR_BPM, raw), floored: raw < FLOOR_BPM };
}

// ---- 링크(URL) 변환: 서버 없이 설정값을 주소에 담는다 ----
export function configToQuery(cfg) {
  const q = new URLSearchParams();
  if (cfg.title.trim()) q.set('t', cfg.title.trim());
  q.set('p', cfg.progression.trim().split(/\s+/).join(' '));
  q.set('b', String(Number(cfg.bpm)));
  q.set('ts', cfg.ts.replace('/', '-'));
  q.set('s', String(cfg.speed));
  return q.toString();
}

export function readConfigFromUrl(search) {
  const q = new URLSearchParams(search);
  if (!q.has('p')) return { status: 'none' };

  const speed = Number(q.get('s') ?? 50);
  const cfg = {
    title: q.get('t') ?? '',
    progression: q.get('p') ?? '',
    bpm: q.get('b') ?? '',
    ts: (q.get('ts') ?? '4-4').replace('-', '/'),
    speed,
  };
  const speedOk =
    Number.isInteger(speed) && speed >= SPEED_MIN && speed <= SPEED_MAX && speed % SPEED_STEP === 0;

  if (!validateConfig(cfg).ok || !speedOk) return { status: 'bad' };
  return { status: 'ok', cfg };
}
