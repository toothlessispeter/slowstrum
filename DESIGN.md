---
name: SlowStrum Design System
version: 1.0
description: 찬양팀 기타 레슨용 코드 전환 연습 웹페이지 SlowStrum의 디자인 시스템
colors:
  canvas: "#000000"
  surface-soft: "#0d0d0d"
  surface-card: "#141414"
  surface-elevated: "#1f1f1f"
  hairline: "#262626"
  hairline-strong: "#3a3a3a"
  on-dark: "#ffffff"
  body: "#cccccc"
  body-strong: "#e6e6e6"
  muted: "#999999"
  muted-soft: "#666666"
  beige: "#d8c8a8"
  beige-soft: "rgba(216, 200, 168, 0.14)"
  on-beige: "#000000"
  warning: "#d4a017"
typography:
  fonts: { display: "Pretendard", text: "Gowun Batang (고운바탕)", mono: "IBM Plex Mono" }
  display-lg: { family: display, size: 48px, weight: 400, lineHeight: 1.2, letterSpacing: -0.5px, case: upper }
  display-md: { family: display, size: 32px, weight: 400, lineHeight: 1.2, letterSpacing: -0.3px, case: upper }
  chord-lg: { family: display, size: 56px, weight: 400, lineHeight: 1.0, letterSpacing: -1px, case: none }
  chord-md: { family: display, size: 32px, weight: 400, lineHeight: 1.0, letterSpacing: -0.5px, case: none }
  chord-sm: { family: display, size: 20px, weight: 400, lineHeight: 1.0, letterSpacing: 0, case: none }
  bpm: { family: display, size: 44px, weight: 400, lineHeight: 1.0, letterSpacing: -1px, numeric: tabular }
  wordmark: { family: display, size: 14px, weight: 400, lineHeight: 1.0, letterSpacing: 4px, case: upper }
  lead: { family: text, size: 17px, weight: 400, lineHeight: 1.75 }
  body-md: { family: text, size: 16px, weight: 400, lineHeight: 1.7 }
  button: { family: display, size: 14px, weight: 400, lineHeight: 1.0, letterSpacing: 1.5px, case: upper }
  nav-link: { family: display, size: 12px, weight: 400, lineHeight: 1.4, letterSpacing: 1px, case: upper }
  caption: { family: display, size: 12px, weight: 400, lineHeight: 1.4, letterSpacing: 0.6px, case: upper }
  code: { family: mono, size: 13-16px, weight: 400, letterSpacing: 0 }
spacing:
  xxs: 4px
  xs: 8px
  sm: 12px
  md: 16px
  lg: 24px
  xl: 40px
  xxl: 64px
  section: 120px
rounded:
  none: 0px
  pill: 9999px
  full: 50%
---

# SlowStrum Design System

## 1. Overview

SlowStrum은 기타 입문자(교회 찬양팀 고등학생)가 **코드 전환을 박자에 맞추는 연습**을 하는 웹페이지다. 학생은 기타를 든 채로 화면을 본다. 그래서 디자인의 목표는 장식이 아니라 **멀리서도 "지금 칠 코드"와 "지금 박자"가 한눈에 보이는 것**이다.

이를 위해 시스템은 세 가지 원칙을 따른다.

1. **검정 캔버스 + 흰 글자**: 배경과 글자의 대비를 최대로 둔다. 화면에서 빛나는 요소가 적을수록 눈이 갈 곳이 분명해진다.
2. **포인트 색은 베이지 하나**: 베이지는 "지금 / 선택됨 / 다음 행동"에만 쓴다. 베이지가 보이면 거기가 지금 봐야 할 곳이다.
3. **굵기 대신 크기·자간·대문자**: 모든 글자는 weight 400. 강조는 글자 크기, 넓은 자간, 대문자, 서체 대비로 만든다.

**Key Characteristics**
- 배경은 `{colors.canvas}` (#000000) 하나. 라이트 모드는 없다.
- 포인트 색은 `{colors.beige}` (#d8c8a8) 하나. 오류 표시용 `{colors.warning}`은 의미 색이라 포인트 색으로 치지 않는다.
- 서체 3종 분리: **Pretendard**(제목·코드명·숫자·버튼·라벨), **고운바탕**(본문 명조), **IBM Plex Mono**(코드 진행처럼 정렬이 필요한 문자열).
- 버튼만 알약 모양(`{rounded.pill}`), 나머지 카드·입력·그리드는 모두 각진 모서리(`{rounded.none}`).
- 그림자, 그라데이션, 반투명 유리 효과를 쓰지 않는다. 깊이는 `{colors.surface-card}` 한 단계로만 표현한다.

---

## 2. Colors

### 2-1. 포인트 (Accent)
| 토큰 | 값 | 쓰는 곳 |
|---|---|---|
| `{colors.beige}` | #d8c8a8 | 지금 박자 칸, 카운트인 숫자, 다음 행동 버튼(primary), 선택된 프리셋·박자표 테두리, 상단 진행 바, 현재 단계 표시, 속도 슬라이더 손잡이, 입력 포커스 밑줄, NOW 라벨, 다음 코드 깜빡임 |
| `{colors.beige-soft}` | rgba(216,200,168,0.14) | 선택된 프리셋 카드 배경 |
| `{colors.on-beige}` | #000000 | 베이지 위에 올라가는 글자 |

**베이지 사용 규칙**: 한 화면에서 베이지 버튼(primary)은 하나만 둔다. 공유 페이지에서는 COPY LINK만 베이지로 두고, NEW SONG은 흰 외곽선 버튼으로 둔다. 두 버튼이 같은 색이면 무엇을 먼저 눌러야 할지 판단하는 데 시간이 걸리기 때문이다.

### 2-2. 표면 (Surface)
| 토큰 | 값 | 쓰는 곳 |
|---|---|---|
| `{colors.canvas}` | #000000 | 모든 페이지 배경, 상단 바, 하단 고정 바 |
| `{colors.surface-soft}` | #0d0d0d | 운지 다이어그램 미리보기 카드 |
| `{colors.surface-card}` | #141414 | 프리셋 카드, NOW/NEXT 코드 카드, 안내 박스 |
| `{colors.surface-elevated}` | #1f1f1f | 버튼 눌림(active) 상태 |
| `{colors.hairline}` | #262626 | 섹션 구분선, 박자 칸 테두리, 요약 표 행 구분 |
| `{colors.hairline-strong}` | #3a3a3a | 입력 밑줄, 칩·토글 테두리, 비활성 버튼 테두리 |

### 2-3. 글자 (Text)
| 토큰 | 값 | 쓰는 곳 |
|---|---|---|
| `{colors.on-dark}` | #ffffff | 제목, 코드명, BPM 숫자, 기본 버튼 |
| `{colors.body-strong}` | #e6e6e6 | 페이지 설명(lead), 요약 표 값 |
| `{colors.body}` | #cccccc | 본문, 칩 글자, NEXT 코드명 |
| `{colors.muted}` | #999999 | 캡션, 라벨, 비선택 단계·토글 |
| `{colors.muted-soft}` | #666666 | 힌트, 박자 번호, 마디 번호, 마디 세로선 |

### 2-4. 의미 색 (Semantic)
| 토큰 | 값 | 쓰는 곳 |
|---|---|---|
| `{colors.warning}` | #d4a017 | 입력 오류 문구, 오류 코드 칩 테두리 |

---

## 3. Typography

### 3-1. 서체 3종 — 한글 기준
처음에는 영문 서체(콘덴스드 산세리프 + 영문 세리프 + 고정폭)를 썼지만, 한글이 대체 서체로 섞이면서 영문과 한글의 굵기·높이가 맞지 않았다. 넓은 자간의 고정폭 대문자 라벨도 한글에서는 글자가 흩어져 보였다. 그래서 **한글을 먼저 기준으로** 서체를 다시 골랐다.

| 역할 | 서체 | 고른 이유 | 쓰는 곳 |
|---|---|---|---|
| **Display / UI** | Pretendard 400 | 한글·영문·숫자의 높이와 굵기가 함께 설계된 한글 산세리프. 작은 라벨부터 큰 숫자까지 한 서체로 일관되게 보인다 | 페이지 제목, 코드명, BPM 숫자, 버튼, 단계 표시, 라벨 |
| **Text** | 고운바탕 (Gowun Batang) 400 | 획이 부드러운 한글 명조. 설명문에 읽는 리듬을 주고, UI 글자(Pretendard)와 역할이 구분된다 | 페이지 설명, 본문, 입력값 일부, 요약 표 값 |
| **Mono** | IBM Plex Mono 400 | 글자 폭이 같아 `G:4 D/F#:4`처럼 기호가 섞인 문자열이 흐트러지지 않는다 | 코드 진행 입력, 프리셋 진행, 칩, 박자 번호, 공유 링크 |

- 세 서체 모두 npm 패키지(`pretendard`, `@fontsource/gowun-batang`, `@fontsource/ibm-plex-mono`)로 **사이트 안에 직접 포함**한다. 외부 글꼴 서버가 막힌 환경(학교 와이파이 등)에서도 똑같이 보인다.
- 대체 순서: Pretendard → Apple SD Gothic Neo → 맑은 고딕 / 고운바탕 → Noto Serif KR → AppleMyungjo.
- Mono는 **정렬이 필요한 문자열에만** 쓴다. 라벨이나 버튼에 고정폭 서체를 쓰지 않는다.

### 3-2. 위계
| 토큰 | 서체 | 크기 | 행간 | 자간 | 대소문자 | 쓰는 곳 |
|---|---|---|---|---|---|---|
| `{typography.display-lg}` | Pretendard | 48px | 1.2 | -0.5px | 대문자 | 입력 페이지 제목 (WHAT ARE WE PLAYING?) |
| `{typography.display-md}` | Pretendard | 32px | 1.2 | -0.3px | 대문자 | 연습 페이지 곡 제목 |
| `{typography.chord-lg}` | Pretendard | 56px | 1.0 | -1px | **변환 없음** | NOW 코드명 |
| `{typography.chord-md}` | Pretendard | 32px | 1.0 | -0.5px | 변환 없음 | NEXT 코드명 |
| `{typography.chord-sm}` | Pretendard | 20px | 1.0 | 0 | 변환 없음 | 다이어그램 미리보기 코드명 |
| `{typography.bpm}` | Pretendard | 44px | 1.0 | -1px | — | 하단 바 BPM 숫자 (숫자 폭 고정) |
| `{typography.wordmark}` | Pretendard | 14px | 1.0 | 4px | 대문자 | 상단 워드마크 SLOWSTRUM |
| `{typography.lead}` | 고운바탕 | 17px | 1.75 | 0 | 문장형 | 페이지 설명 |
| `{typography.body-md}` | 고운바탕 | 16px | 1.7 | 0 | 문장형 | 본문 |
| `{typography.button}` | Pretendard | 14px | 1.0 | 1.5px | 대문자 | 모든 버튼 |
| `{typography.nav-link}` | Pretendard | 12px | 1.4 | 1px | 대문자 | 상단 단계 표시 |
| `{typography.caption}` | Pretendard | 12px | 1.4 | 0.6px | 대문자 | 라벨, 메타 정보, 진행 번호 |
| `{typography.code}` | IBM Plex Mono | 13~16px | — | 0 | 변환 없음 | 코드 진행, 칩, 박자 번호, 링크 |

### 3-3. 원칙
- **굵은 글씨는 없다.** 모든 글자는 weight 400. 강조는 ① 크기 ② 자간 ③ 대문자 ④ 서체 대비로 만든다.
- **자간은 한글 기준으로 잡는다.** 큰 제목과 숫자는 음수 자간(-0.3 ~ -1px)으로 단단하게 모으고, 작은 라벨은 0.6~1.5px만 벌린다. 2px 이상 벌리면 한글이 낱자로 흩어져 보인다. 예외는 워드마크(4px) 하나다.
- **한글 줄바꿈은 단어 단위**(`word-break: keep-all`)로 하고, 본문 행간은 1.7 이상으로 둔다.
- **코드명은 절대 대문자로 바꾸지 않는다.** `Am`을 `AM`으로, `F#m`을 `F#M`으로 바꾸면 다른 코드가 된다. 코드명에는 `text-transform: none`을 고정한다.
- 숫자가 바뀌는 곳(BPM)은 `font-variant-numeric: tabular-nums`로 숫자 폭을 고정해서, 값이 바뀌어도 글자가 흔들리지 않게 한다.

---

## 4. Layout

### 4-1. 간격 (4px 기준)
| 토큰 | 값 | 쓰는 곳 |
|---|---|---|
| `{spacing.xxs}` | 4px | 셀 라벨 안 간격 |
| `{spacing.xs}` | 8px | 칩·카드·버튼 사이 |
| `{spacing.sm}` | 12px | 라벨과 입력 사이 |
| `{spacing.md}` | 16px | 카드 안쪽 여백(모바일), 하단 바 위아래 |
| `{spacing.lg}` | 24px | 카드 안쪽 여백(데스크톱), 좌우 여백, 마디 줄 간격 |
| `{spacing.xl}` | 40px | 섹션 안 위아래, 그리드와 코드 패널 사이 |
| `{spacing.xxl}` | 64px | 입력 페이지 상단 여백 |
| `{spacing.section}` | 120px | 큰 구획 사이 (예비) |

### 4-2. 컨테이너
| 영역 | 최대 너비 | 구성 |
|---|---|---|
| 입력 페이지 (01·02·03·05) | 880px 가운데 정렬 | 한 열. 제목 → 패널들(위 헤어라인으로 구분) |
| 연습 페이지 (04) | 1280px | 데스크톱: 왼쪽 2/3 박자 그리드 + 오른쪽 1/3 코드 패널 |
| 좌우 여백 | 24px (모바일 16px) | — |

### 4-3. 페이지 구조 (와이어프레임)
```
┌────────────────────────────────────────────────────────┐
│ SLOWSTRUM            01 SONG 02 CHORDS 03 TEMPO 04 05   │ ← 상단 바 56px
├━━━━━━━━━━━━━━━━━━──────────────────────────────────────┤ ← 진행 바 2px (베이지)
│                                                        │
│   01 / 05 — 곡 정보                    (caption, 베이지) │
│   WHAT ARE WE PLAYING?                 (display-lg)     │
│   페이지 설명                           (lead)           │
│   ──────────────────────────────────────────────────   │
│   패널: 라벨 + 입력                                       │
│   ──────────────────────────────────────────────────   │
│   패널 …                                                │
│                                                        │
├────────────────────────────────────────────────────────┤
│ (← BACK)        다음 — 코드 진행          (CHORDS → )    │ ← 하단 고정 바
└────────────────────────────────────────────────────────┘
```

| 페이지 | 제목 | 내용 | 다음으로 넘어가는 조건 |
|---|---|---|---|
| 01 Song | WHAT ARE WE PLAYING? | 곡 제목·메모 입력, 페이지 설명 메모 | 제목 30자 이하 |
| 02 Chords | CHORD PROGRESSION | 프리셋 4개, 코드 진행 입력, 칩 미리보기, 운지 다이어그램 | 코드 진행 오류 없음 |
| 03 Tempo | TEMPO & TIME | 원곡 BPM, 박자표, 입력 요약 | BPM 40~200 |
| 04 Practice | (곡 제목) | 박자 그리드, NOW/NEXT 코드, 속도·재생 바 | — |
| 05 Share | SEND TO YOUR STUDENT | 링크에 담기는 설정 요약, 링크 복사 | — |

---

## 5. Elevation & Depth

| 단계 | 처리 | 쓰는 곳 |
|---|---|---|
| Flat | 그림자·테두리 없음 | 페이지 배경, 상단 바, 본문 |
| Hairline | 1px `{colors.hairline}` 선 | 섹션 구분, 박자 칸, 요약 표 행 |
| Card | `{colors.surface-card}` 배경, 그림자 없음 | 프리셋, NOW/NEXT 카드, 안내 박스 |
| Overlay | 검정 82% 덮개 | 카운트인 화면 (유일한 덮개) |

그림자, 그라데이션, 흐림 효과는 쓰지 않는다. 카드와 배경의 차이는 #000000 → #141414 한 단계뿐이다.

---

## 6. Shapes

| 토큰 | 값 | 쓰는 곳 |
|---|---|---|
| `{rounded.none}` | 0px | 카드, 입력, 칩, 박자 칸, 다이어그램 카드 — 기본값 |
| `{rounded.pill}` | 9999px | 버튼, 박자표 토글 |
| `{rounded.full}` | 50% | 슬라이더 손잡이, 1박자 점 |

모서리 규칙은 둘 중 하나다. 누를 수 있는 버튼은 알약, 나머지는 각진 모서리. 4px·8px 같은 중간값은 쓰지 않는다.

---

## 7. Components

### 7-1. 내비게이션
**`top-bar`** — 화면 위에 고정. 높이 56px, 배경 `{colors.canvas}`. 왼쪽에 워드마크, 오른쪽에 단계 표시 5개.

**`step-link`** — 단계 표시 하나. `{typography.nav-link}`, 번호(01~05) + 영문 이름.
| 상태 | 글자 색 |
|---|---|
| 현재 | `{colors.beige}` |
| 지난 단계 | `{colors.body}` |
| 갈 수 있는 다음 단계 | `{colors.muted}` |
| 갈 수 없음 (앞 단계 오류) | `{colors.hairline-strong}`, 클릭 불가 |

**`progress`** — 상단 바 바로 아래 2px 선. 배경 `{colors.hairline}`, 채움 `{colors.beige}`. 너비 = 현재 단계 ÷ 5.

### 7-2. 버튼
**`button`** (기본) — 배경 투명, 1px 흰 외곽선, `{rounded.pill}`, 높이 44px, 좌우 32px, `{typography.button}`. 눌림: 배경 `{colors.surface-elevated}`.

**`button-primary`** — 다음 행동 버튼. 배경·테두리 `{colors.beige}`, 글자 `{colors.on-beige}`. 눌림: 흰색으로 바뀜. 한 화면에 하나만 둔다.
- 쓰는 곳: CHORDS → / TEMPO → / START PRACTICE → / ▶ START / COPY LINK

**`button-sm`** — 속도 조절 −5% / +5%. 좌우 16px, 글자 12px.

**`button` 비활성** — 테두리 `{colors.hairline-strong}`, 글자 `{colors.muted-soft}`, 배경 투명. primary도 비활성이면 베이지를 빼고 같은 모양이 된다.

**`toggle`** — 박자표 4/4 · 3/4 · 6/8. `{rounded.pill}`, 높이 44px, 테두리 `{colors.hairline-strong}`. 선택: 테두리·글자 `{colors.beige}`.

### 7-3. 입력
**`text-input`** — 배경 투명, 테두리 없이 **아래 1px 밑줄만** `{colors.hairline-strong}`. 높이 44px 이상. 포커스: 밑줄 `{colors.beige}`. placeholder `{colors.muted-soft}`.
| 변형 | 서체 | 크기 | 쓰는 곳 |
|---|---|---|---|
| 기본 | 고운바탕 | 17px | — |
| big | Pretendard | 30px, 자간 -0.5px | 곡 제목 |
| mono | IBM Plex Mono | 16px, 자간 0 | 코드 진행 |
| bpm | Pretendard | 48px, 숫자 폭 고정 | 원곡 BPM |
| link | IBM Plex Mono | 12px | 공유 링크(읽기 전용) |

### 7-4. 카드와 정보 블록
**`preset-card`** — 배경 `{colors.surface-card}`, 안쪽 16px, 최소 높이 88px, 2열 그리드. 위에 키 이름(caption), 아래에 진행(Mono 13px). 선택: 테두리 `{colors.beige}` + 배경 `{colors.beige-soft}` + 이름 베이지.

**`chip`** — 코드 미리보기. 1px `{colors.hairline-strong}` 테두리, Mono 12px, `G · 4` 형식. 오류: 테두리·글자 `{colors.warning}`.

**`diagram-card`** — 운지 미리보기. 배경 `{colors.surface-soft}`, 코드명(`chord-sm`) + 다이어그램.

**`chord-diagram`** — SVG, 6줄 × 4프렛.
| 요소 | 표현 |
|---|---|
| 줄 | 1px `{colors.muted-soft}` |
| 프렛 | 1px `{colors.hairline-strong}` |
| 너트 (1프렛 시작) | 3px 흰 선 |
| 손가락 위치 | 흰 원 |
| 바레 | 흰 가로 막대 |
| 개방현 | O (`{colors.body}` 외곽선 원) |
| 안 치는 줄 | X (`{colors.muted}`) |
| 시작 프렛 | 왼쪽에 `4fr` (Mono 7px) |

**`wire-note`** — 페이지 역할 메모. 1px 점선 `{colors.hairline-strong}`, 안쪽 24px. 와이어프레임 단계에서 각 페이지가 무엇을 정하는지 적는다.

**`summary-table`** — 입력 요약·공유 설정. 행마다 위 헤어라인, 왼쪽 140px 라벨(caption) + 오른쪽 값(`{colors.body-strong}`).

### 7-5. 연습 페이지
**`beat-grid`** — 한 줄에 2마디.
| 요소 | 표현 |
|---|---|
| 마디 세로선 | 2px `{colors.muted-soft}` |
| 박자 칸 | 높이 64px(모바일 48px), 1px `{colors.hairline}` 테두리, 박자 번호 Mono 13px |
| 코드 바뀌는 칸 | 칸 위에 코드명(Pretendard 18px) |
| 1박자 | 칸 위 오른쪽에 5px 흰 점 |
| **지금 박자** | 칸 전체 `{colors.beige}` 채움, 번호 `{colors.on-beige}` |
| 마디 번호 | 마디 아래 01·02… Mono 10px. 지금 마디는 베이지 |

**`now-card`** — 배경 `{colors.surface-card}`, 안쪽 24px. NOW 라벨(베이지) + 코드명(`chord-lg`) + 큰 다이어그램(최대 170px).

**`next-card`** — NOW 옆(3:2 비율). NEXT 라벨 + 코드명(`chord-md`, `{colors.body}`) + 작은 다이어그램(최대 96px, 불투명도 80%). **바뀌기 1박자 전에 테두리가 베이지로 0.4초 간격 깜빡인다.**

**`practice-bar`** — 화면 아래 고정, 위 헤어라인. 왼쪽 BPM 숫자(`{typography.bpm}`) + `원곡 120의 50%`(caption), 가운데 −5% / 슬라이더 / +5%, 오른쪽 ▶ START(primary) · SHARE →. 재생 중에는 START가 ■ STOP(기본 버튼)으로 바뀐다.

**`slider`** — 트랙 1px `{colors.hairline-strong}`, 손잡이 20px 원 `{colors.beige}`. 25~100%, 5% 단위.

**`count-in`** — 화면 전체 검정 82% 덮개 + 가운데 숫자(Pretendard 220px, 모바일 160px, `{colors.beige}`, 이 숫자만 굵기 300으로 가늘게 — 크게 띄워도 화면을 누르지 않게). 4 → 3 → 2 → 1.

### 7-6. 하단 고정 바 (입력·공유 페이지)
**`wizard-bar`** — 화면 아래 고정, 위 헤어라인. 왼쪽 `← 이전 단계`(기본 버튼), 가운데 `다음 — 코드 진행` 안내(caption), 오른쪽 `다음 단계 →`(primary). 입력 오류가 있으면 다음 버튼이 비활성되고, 안내가 `표시된 입력을 먼저 고쳐 주세요`로 바뀐다.

### 7-7. 메시지
| 컴포넌트 | 표현 | 예시 |
|---|---|---|
| `notice` | 배경 `{colors.surface-card}`, 왼쪽 2px 베이지 선 | 링크 정보를 읽을 수 없어요. 선생님께 링크를 다시 받아 주세요. |
| `error` | `{colors.warning}`, 15px | BPM은 40에서 200 사이로 입력해 주세요. |
| `success` | `{colors.beige}`, 15px | 링크를 복사했어요. 카카오톡에 붙여넣어 보내세요. |
| `hint` | IBM Plex Mono 11px, `{colors.muted-soft}` | 19/30 |

---

## 8. Do's and Don'ts

### Do
- 베이지는 "지금 박자 / 선택됨 / 다음 행동"에만 쓴다.
- 한 화면에 primary(베이지) 버튼은 하나만 둔다.
- 모든 글자를 weight 400으로 두고, 크기·자간·대문자로 위계를 만든다.
- 코드명은 입력한 대소문자 그대로 보여 준다.
- 입력은 밑줄 하나로만 표현한다.
- 버튼만 알약 모양, 나머지는 0px 모서리로 둔다.
- 오류는 `{colors.warning}`으로, 그 입력 바로 아래에 문장으로 알려 준다.

### Don't
- 베이지 외에 새 포인트 색(파랑, 빨강 등)을 넣지 않는다.
- 굵은 글씨를 쓰지 않는다.
- 그림자, 그라데이션, 흐림 효과를 쓰지 않는다.
- 카드·입력·박자 칸에 둥근 모서리를 주지 않는다.
- 코드명에 대문자 변환을 걸지 않는다.
- 재생 중 움직이는 요소를 늘리지 않는다. 움직이는 것은 **지금 박자 칸**과 **NEXT 깜빡임** 두 가지뿐이다. 움직이는 요소가 많으면 학생이 어디를 봐야 할지 판단하는 데 시간이 걸려 코드 전환이 늦어진다.

---

## 9. Responsive

### 9-1. 구간
| 이름 | 너비 | 바뀌는 점 |
|---|---|---|
| Mobile | < 768px | 좌우 여백 16px, 제목 48→30px, 프리셋 2열 유지, 연습 페이지 1열(코드 패널이 그리드 위로), 하단 바 3줄(BPM / 속도 / 버튼 2개) |
| Tablet | 768–900px | 상단 단계 표시가 `02 / 05 · CHORDS` 한 줄로 줄어듦 |
| Desktop | > 900px | 단계 5개 모두 표시, 연습 페이지 그리드 2/3 + 코드 패널 1/3 |

### 9-2. 모바일 우선 이유
학생은 카카오톡으로 받은 링크를 **스마트폰**으로 연다. 그래서 연습 페이지는 모바일 세로 화면에서 위부터 **제목 → NOW/NEXT 코드 → 박자 그리드 → 하단 고정 바** 순서로 배치한다. 기타를 잡은 손을 떼지 않고 볼 수 있게, 가장 중요한 코드 카드를 화면 위쪽에 둔다.

### 9-3. 터치 영역
- 모든 버튼·토글·단계 링크는 최소 44 × 44px.
- 입력 높이 최소 44px.
- 슬라이더 터치 높이 44px.

### 9-4. 모바일에서만 바뀌는 것
- 코드가 바뀌는 칸에서는 1박자 점을 숨긴다. 좁은 칸에서 `D/F#`과 점이 겹치기 때문이다.
- 박자 칸 높이 64 → 48px, 코드명 18 → 14px.
- NOW 다이어그램 170 → 120px, NEXT 96 → 80px.

---

## 10. 구현 메모

- 토큰은 `src/styles.css`의 `:root` CSS 변수로 정의되어 있다. 새 색을 hex로 직접 쓰지 않고 변수를 쓴다.
- 서체는 npm 패키지로 설치해 `src/main.jsx`에서 불러온다 (Pretendard 가변 글꼴 동적 서브셋, 고운바탕 400, IBM Plex Mono 400). 외부 글꼴 서버에 의존하지 않는다.
- 상태는 기본(Default)과 눌림(Active) 두 가지만 정의한다. hover 상태는 따로 디자인하지 않는다 (주 사용 기기가 터치 화면).
- 새 컴포넌트는 기본 모서리 0px으로 시작하고, 누르는 버튼일 때만 `{rounded.pill}`을 쓴다.
