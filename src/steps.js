// 와이어프레임 흐름: 페이지 5개
export const STEPS = [
  { key: 'song', label: 'Song', ko: '곡 정보' },
  { key: 'chords', label: 'Chords', ko: '코드 진행' },
  { key: 'tempo', label: 'Tempo', ko: '템포' },
  { key: 'practice', label: 'Practice', ko: '연습' },
  { key: 'share', label: 'Share', ko: '공유' },
];

export const PRACTICE_STEP = 3;
export const SHARE_STEP = 4;

// 각 입력 페이지(01~03)가 통과했는지
export function stepValidity(v) {
  return [!v.titleError, v.progressionErrors.length === 0, !v.bpmError];
}

// i번째 페이지로 갈 수 있는가 = 앞 입력 페이지가 모두 통과했는가
export function canReach(i, v) {
  const ok = stepValidity(v);
  for (let k = 0; k < Math.min(i, ok.length); k += 1) {
    if (!ok[k]) return false;
  }
  return true;
}

export function stepFromHash(hash) {
  return STEPS.findIndex((s) => `#${s.key}` === hash);
}

export const pad = (n) => String(n).padStart(2, '0');
