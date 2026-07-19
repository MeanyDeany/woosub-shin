import type { ClaimStatus, ClaimTone } from "@/lib/public-progress";

export const buildLogKo = [
  {
    date: "2026년 7월 19일",
    phase: "과거 데이터 실험",
    title: "검증된 시장 데이터가 결정론적 과거 데이터 결과까지 연결됐다.",
    summary:
      "검증 완료된 BTCUSDT 5분봉 run bundle을 읽기 전용으로 materialize하고, 고정된 기술통계 ExperimentResult를 생성하는 제한된 경로가 완성됐다.",
    proof: [
      "materialization 전후 전체 run bundle 재검증",
      "심볼릭 링크 차단과 파일 변경 감지",
      "불변 bar dataset과 고정 기술통계",
    ],
    boundary: "과거 데이터 기술통계는 백테스트·전략 결과·수익성 주장·매매 허가가 아니다.",
  },
  {
    date: "2026년 7월 19일",
    phase: "공개 인터페이스",
    title: "방문자 개인정보를 노출하지 않고 사이트 트래픽을 공개했다.",
    summary:
      "Vercel Analytics의 집계 방문자 수와 페이지 조회 수를 서버 전용 API 경계를 통해 footer에 표시한다.",
    proof: [
      "분석 토큰은 브라우저로 전달되지 않음",
      "집계 숫자만 공개",
      "분석 접근 실패 시 가짜 숫자를 표시하지 않음",
    ],
    boundary: "방문자 수는 웹사이트 트래픽일 뿐 연구 품질이나 사업 성과가 아니다.",
  },
  {
    date: "2026년 7월 18일",
    phase: "실행 구조 증명",
    title: "제한된 synthetic experiment 하나가 처음부터 끝까지 실행된다.",
    summary:
      "고정된 메모리 내 Decimal 시계열 실험이 하나의 run을 조정하고 9개 기술통계를 계산해 결정론적 결과를 반환한다.",
    proof: [
      "임의 코드 없는 단일 고정 entrypoint",
      "파일시스템·네트워크·provider·거래 연동 없음",
      "Decimal precision이 달라도 canonical output 동일",
    ],
    boundary: "Synthetic 실행은 과거 데이터 검증이나 전략 권한이 아니다.",
  },
  {
    date: "2026년 7월 18일",
    phase: "증거 식별자",
    title: "Experiment run과 result가 결정론적 식별자를 갖게 됐다.",
    summary:
      "Manifest, dataset observation reference, typed metric, run, result를 재현 가능한 canonical evidence로 묶는다.",
    proof: [
      "경로와 무관한 run/result identity",
      "중첩 데이터 훼손 시 identity 생성 전 거부",
      "metric 값 타입을 명시적으로 제한",
    ],
    boundary: "결정론적 결과는 증거 식별자이지 모델 승인이 아니다.",
  },
  {
    date: "2026년 7월 18일",
    phase: "공개 책임성",
    title: "실패 사례·로드맵·직접 답변을 공개했다.",
    summary:
      "연구소 페이지에 거부되는 실패 유형, 완료·계획 단계, 거래와 매출에 대한 직접적인 답변을 기록했다.",
    proof: ["Failure Museum", "현재 단계 로드맵", "FAQ와 명시적 미승인 상태"],
    boundary: "공개 문서는 검증된 경계를 설명하되 비공개 구현 세부사항은 노출하지 않는다.",
  },
  {
    date: "2026년 7월",
    phase: "오프라인 검증",
    title: "완료된 증거 bundle을 다시 읽고 오프라인에서 검증할 수 있다.",
    summary:
      "고정된 completed-run 구조를 신뢰하지 않는 디스크 기록에서 복원하고 authoritative verifier로 확인한다.",
    proof: ["bounded no-follow read", "exact-tree verification", "완료 마커보다 byte mismatch 우선"],
    boundary: "오프라인 검증은 로컬 증거 식별자를 증명할 뿐 provider 진실성이나 연구 적합성을 보장하지 않는다.",
  },
  {
    date: "2026년 7월",
    phase: "데이터 수명주기",
    title: "공개 BTCUSDT byte가 canonical research evidence가 됐다.",
    summary:
      "하나의 고정된 public-data lifecycle이 Binance USD-M 원본 byte를 수집하고 canonical CSV로 정규화한 뒤 검증해 불변 run bundle로 저장한다.",
    proof: ["제한된 공개 HTTPS 수집", "결정론적 정규화", "독립 검증과 atomic publication"],
    boundary: "하나의 provider·asset 경계를 증명한 것이며 일반적인 멀티애셋 데이터 플랫폼은 아니다.",
  },
] as const;

export const latestBuildLogKo = buildLogKo.slice(0, 3);

export const claimLedgerKo: readonly {
  claim: string;
  evidence: string;
  limit: string;
  status: ClaimStatus;
  statusLabel: string;
  tone: ClaimTone;
}[] = [
  {
    claim: "고정된 BTCUSDT 5분봉 public-data lifecycle이 작동한다.",
    evidence:
      "제한된 HTTPS 수집, 원본 byte 보존, canonical CSV 정규화, 독립 검증, 불변 run bundle이 하나의 Binance USD-M 경계에서 구현됐다.",
    limit: "하나의 provider와 asset을 증명했을 뿐 전체 시장 데이터 범위를 증명하지 않는다.",
    status: "Demonstrated",
    statusLabel: "검증됨",
    tone: "emerald",
  },
  {
    claim: "완료된 research run을 오프라인에서 다시 읽고 검증할 수 있다.",
    evidence:
      "고정된 completed-run tree를 bounded record에서 복원하고 exact layout과 byte identity를 확인한 뒤 authoritative verifier에 위임한다.",
    limit: "로컬 증거 무결성을 증명할 뿐 provider 진실성, 모델 타당성, 수익성을 증명하지 않는다.",
    status: "Demonstrated",
    statusLabel: "검증됨",
    tone: "emerald",
  },
  {
    claim: "Experiment specification, run, metric, result가 결정론적 identity를 가진다.",
    evidence:
      "Manifest, observation reference, typed metric, run hash, result hash가 canonical하며 모순된 중첩 상태를 거부한다.",
    limit: "재현 가능성과 identity가 연구 결론의 정답이나 운영 승인을 의미하지 않는다.",
    status: "Demonstrated",
    statusLabel: "검증됨",
    tone: "emerald",
  },
  {
    claim: "제한된 synthetic experiment 하나를 실행할 수 있다.",
    evidence:
      "고정된 parameter-free Decimal summary가 메모리에서 실행되고 검토된 result factory를 통해 결정론적 ExperimentResult를 반환한다.",
    limit: "임의 코드를 받지 않으며 과거 시장 성과를 말하지 않는다.",
    status: "Demonstrated",
    statusLabel: "검증됨",
    tone: "emerald",
  },
  {
    claim: "검증된 과거 시장 데이터 실험 경로가 작동한다.",
    evidence:
      "검증 완료된 BTCUSDT run bundle을 읽기 전용으로 재로딩하고, 불변 5분봉 OHLCV row로 materialize하며, 선언된 run과 조정해 결정론적 기술통계 ExperimentResult를 만든다.",
    limit: "기술통계만 포함한다. 수익률 연구, 백테스트, 전략 결과, 수익성 주장, 거래 승인이 아니다.",
    status: "Demonstrated",
    statusLabel: "검증됨",
    tone: "emerald",
  },
  {
    claim: "정확한 과거 close-return evidence가 작동한다.",
    evidence: "검증된 historical-bar pipeline 이후 exact rational close-return transform을 현재 구축 중이다.",
    limit: "Transform과 독립 검증이 merge되기 전에는 완료된 return evidence를 주장하지 않는다.",
    status: "In progress",
    statusLabel: "진행 중",
    tone: "cyan",
  },
  {
    claim: "연구소가 현재 여러 자산의 live adapter를 운영한다.",
    evidence:
      "Contract는 asset-neutral이지만 현재 end-to-end로 증명된 구체적 public-data adapter는 BTCUSDT 5분봉 하나다.",
    limit: "Multi-asset은 검증 중인 구조이며 여러 자산이 이미 가동 중이라는 주장이 아니다.",
    status: "Not claimed",
    statusLabel: "주장하지 않음",
    tone: "violet",
  },
  {
    claim: "연구 프레임워크가 수익을 낸다.",
    evidence:
      "현재 산출물은 인프라, 결정론적 증거, 검증 경계다. Live strategy, fund, signal service, software revenue 주장이 없다.",
    limit: "연구 증거를 track record나 기대수익으로 표현해서는 안 된다.",
    status: "Not claimed",
    statusLabel: "주장하지 않음",
    tone: "violet",
  },
  {
    claim: "Paper 또는 live trading이 승인됐다.",
    evidence:
      "Broker integration, order routing, position management, entry permission, short permission, leverage authority가 없다.",
    limit: "연구 진척이 paper/live execution을 자동으로 해제하지 않는다.",
    status: "Not approved",
    statusLabel: "미승인",
    tone: "amber",
  },
];
