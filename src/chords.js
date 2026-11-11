// 운지 데이터
// frets: 6번줄(저음 E) → 1번줄(고음 e) 순서. -1 = 안 치는 줄(X), 0 = 개방현(O)
// barre: { fret, from, to } — from/to는 frets 배열 인덱스(0 = 6번줄)

export const CHORDS = {
  // 메이저
  C: { frets: [-1, 3, 2, 0, 1, 0] },
  D: { frets: [-1, -1, 0, 2, 3, 2] },
  E: { frets: [0, 2, 2, 1, 0, 0] },
  F: { frets: [1, 3, 3, 2, 1, 1], barre: { fret: 1, from: 0, to: 5 } },
  G: { frets: [3, 2, 0, 0, 0, 3] },
  A: { frets: [-1, 0, 2, 2, 2, 0] },

  // 마이너
  Am: { frets: [-1, 0, 2, 2, 1, 0] },
  Bm: { frets: [-1, 2, 4, 4, 3, 2], barre: { fret: 2, from: 1, to: 5 } },
  Dm: { frets: [-1, -1, 0, 2, 3, 1] },
  Em: { frets: [0, 2, 2, 0, 0, 0] },
  'F#m': { frets: [2, 4, 4, 2, 2, 2], barre: { fret: 2, from: 0, to: 5 } },
  'C#m': { frets: [-1, 4, 6, 6, 5, 4], barre: { fret: 4, from: 1, to: 5 } },

  // 7th
  A7: { frets: [-1, 0, 2, 0, 2, 0] },
  B7: { frets: [-1, 2, 1, 2, 0, 2] },
  D7: { frets: [-1, -1, 0, 2, 1, 2] },
  E7: { frets: [0, 2, 0, 1, 0, 0] },
  G7: { frets: [3, 2, 0, 0, 0, 1] },

  // sus4
  Asus4: { frets: [-1, 0, 2, 2, 3, 0] },
  Dsus4: { frets: [-1, -1, 0, 2, 3, 3] },
  Esus4: { frets: [0, 2, 2, 2, 0, 0] },

  // 분수 코드
  'G/B': { frets: [-1, 2, 0, 0, 0, 3] },
  'D/F#': { frets: [2, -1, 0, 2, 3, 2] },
  'C/E': { frets: [0, 3, 2, 0, 1, 0] },
  'A/C#': { frets: [-1, 4, 2, 2, 2, 0] },

  // maj7
  Cmaj7: { frets: [-1, 3, 2, 0, 0, 0] },
  Fmaj7: { frets: [-1, -1, 3, 2, 1, 0] },
};

export const CHORD_GROUPS = [
  { name: '메이저', chords: ['C', 'D', 'E', 'F', 'G', 'A'] },
  { name: '마이너', chords: ['Am', 'Bm', 'Dm', 'Em', 'F#m', 'C#m'] },
  { name: '7th', chords: ['A7', 'B7', 'D7', 'E7', 'G7'] },
  { name: 'sus4', chords: ['Asus4', 'Dsus4', 'Esus4'] },
  { name: '분수 코드', chords: ['G/B', 'D/F#', 'C/E', 'A/C#'] },
  { name: 'maj7', chords: ['Cmaj7', 'Fmaj7'] },
];

export const PRESETS = [
  { name: 'G키 기본 진행', progression: 'G:4 D:4 Em:4 C:4' },
  { name: 'D키 기본 진행', progression: 'D:4 A:4 Bm:4 G:4' },
  { name: 'A키 기본 진행', progression: 'A:4 E:4 F#m:4 D:4' },
  { name: 'G키 베이스가 내려가는 진행', progression: 'G:4 D/F#:4 Em:4 C:4' },
];
