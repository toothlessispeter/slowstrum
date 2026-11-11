# SlowStrum

찬양팀 기타 레슨용 코드 전환 연습 웹페이지 (PRD_SlowStrum 프로토타입)

페이지 5개를 이전 / 다음 버튼으로 넘기는 구조 (상단 단계 표시로도 이동)

| 페이지 | 내용 | 다음으로 넘어가는 조건 |
|---|---|---|
| 1 · 곡 | 곡 제목, 학생 화면 미리보기 | 30자 이하 (비워도 됨) |
| 2 · 코드 | 자주 쓰는 진행, 직접 입력(`코드:박자 수`), 운지 미리보기 | 코드 오류 없음 |
| 3 · 빠르기 | 원곡 빠르기, 박자, 입력 내용 확인 | 빠르기 40~200 |
| 4 · 연습 | 느린 메트로놈, 박자 그리드, 지금/다음 코드 | — |
| 5 · 공유 | 링크에 담기는 내용, 링크 복사하기 | — |

학생이 받은 링크(`?p=...`, # 없음)를 열면 4단계 연습 화면이 바로 열립니다.

색: 검정 · 흰색 + 베이지(#d8c8a8) 1개. 베이지는 지금 박자, 선택된 항목, 다음 행동 버튼, 진행 표시에만 씁니다.

## 문서

- [PRD](docs/PRD_SlowStrum.md) — 문제 정의 · 타겟 · MVP · 사용자 흐름 · 입출력 · 제외 범위
- [DESIGN.md](DESIGN.md) — 색 · 서체 · 레이아웃 · 컴포넌트 · 반응형
- [와이어프레임 캡처](docs/wireframe) — 5페이지 데스크톱/모바일

## 로컬 실행

```bash
npm install
npm run dev
```

## Vercel 배포

### 방법 1. GitHub 연결 (추천)

```bash
git init
git add .
git commit -m "SlowStrum prototype"
git branch -M main
git remote add origin https://github.com/<내 아이디>/slowstrum.git
git push -u origin main
```

1. https://vercel.com/new 에서 방금 만든 `slowstrum` 저장소를 Import
2. Framework Preset이 **Vite**로 잡히는지 확인 (Build: `npm run build`, Output: `dist`)
3. Deploy → `https://slowstrum.vercel.app` 같은 주소가 생성됨

### 방법 2. CLI

```bash
npm i -g vercel
vercel        # 첫 배포(미리보기)
vercel --prod # 실제 주소로 배포
```

## 파일 구조

```
src/
  App.jsx                 페이지 전환 · URL 동기화 · 뒤로가기 처리
  steps.js                페이지 5개 정의 · 이동 가능 조건
  config.js               입력 검증 · 박자 계산 · 링크 변환
  chords.js               26개 코드 운지 데이터 · 프리셋
  useMetronome.js         Web Audio lookahead 메트로놈
  components/
    Nav.jsx               상단 워드마크 + 단계 표시 + 진행 바
    WizardBar.jsx         하단 이전 / 다음 바
    Steps.jsx             1 곡 · 2 코드 · 3 빠르기 · 5 공유
    PracticeScreen.jsx    4 연습
    BeatGrid.jsx          박자 그리드
    ChordDiagram.jsx      운지 다이어그램 (SVG)
  styles.css              디자인 토큰 (검정 · 흰색 · 베이지 / 필 버튼 / 0px 모서리)
```

## 링크 형식

```
/?t=제목&p=G:4+D/F%23:4+Em:4+C:4&b=120&ts=4-4&s=50#practice
```

| 키 | 의미 | 범위 |
|---|---|---|
| t | 제목 | 최대 30자, 생략 가능 |
| p | 코드 진행 | 코드 64개, 박자 수 1~8 |
| b | 원곡 BPM | 40~200 |
| ts | 박자표 | 4-4 / 3-4 / 6-8 |
| s | 연습 속도 % | 25~100, 5 단위 |

`#song` `#chords` `#tempo` `#practice` `#share` 가 현재 페이지입니다. 값이 잘못된 링크는 오류 문구를 보여 주고 1단계로 이동합니다.
