import Link from "next/link";
import { ContactForm } from "@/components/contact-form";
import {
  CapabilityBand,
  CtaLink,
  EditorialSection,
  EvidenceBand,
  PageHero,
  ProjectIndexRow,
  ResearchTag,
  StatusLabel,
} from "@/components/editorial";
import { PageShell } from "@/components/site-shell";
import { buildLogKo, claimLedgerKo, latestBuildLogKo } from "@/lib/public-progress-ko";

const primaryButton =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#17243D] px-6 text-sm font-semibold text-white shadow-[0_14px_34px_rgba(39,66,109,0.20)] transition-transform hover:-translate-y-0.5 hover:bg-[#22375B]";

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

export function KoreanHomePage() {
  const answers = [
    {
      number: "01",
      question: "무엇인가?",
      answer: "시스템 트레이딩을 위한 연구·검증 인프라다.",
      detail: "데이터, 실험 identity, 재현성, 증거 품질을 확인한 뒤에야 연구 결론을 신뢰하도록 만드는 계층이다.",
    },
    {
      number: "02",
      question: "무엇을 하는가?",
      answer: "원시 시장 데이터를 감사 가능한 증거로 바꾼다.",
      detail: "Dataset을 검증하고 provenance를 보존하며, 동일한 실험을 재구성하고 결과가 사후에 조용히 바뀌지 못하게 한다.",
    },
    {
      number: "03",
      question: "지금 돈을 버는가?",
      answer: "아니다.",
      detail: "Live strategy, fund, signal service, trading revenue가 없다. 현재 산출물은 향후 시스템 전략을 위한 연구 기반이다.",
    },
  ] as const;

  return (
    <PageShell locale="ko">
      <PageHero
        accent="blue"
        eyebrow="시스템 트레이딩 연구 인프라"
        title="자본을 걸기 전에, 트레이딩 아이디어를 검증한다."
        intro="원시 시장 데이터를 검증된 dataset, 재현 가능한 experiment, 감사 가능한 연구 결과로 바꾸는 시스템을 구축한다."
        actions={
          <>
            <CtaLink href="/ko/projects/multi-asset-research-lab" kind="primary">
              대표 시스템 보기
            </CtaLink>
            <CtaLink href="/ko/projects">전체 연구 보기</CtaLink>
          </>
        }
        metadata={[
          { label: "시스템", value: "정량 연구·검증 플랫폼" },
          { label: "현재 단계", value: "인프라와 과거 데이터 실험" },
          { label: "실거래", value: "없음" },
          { label: "매매 신호", value: "없음" },
          { label: "현재 매출", value: "거래·소프트웨어 매출 없음" },
        ]}
      />

      <EditorialSection
        eyebrow="쉽게 설명하면"
        title="그래서 이 시스템은 실제로 무엇을 하는가?"
        intro="한 가지 질문에 답한다. 돈을 위험에 노출하기 전에 시스템 트레이딩 아이디어를 신뢰할 수 있는가?"
        tone="deep"
      >
        <ol className="grid gap-5 lg:grid-cols-3">
          {answers.map((item) => (
            <li key={item.number} className="glass-panel rounded-[2rem] p-7 sm:p-9">
              <div className="flex items-center justify-between gap-4">
                <span className="font-mono text-xs text-[#2563C9]">{item.number}</span>
                <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[#77839A]">
                  {item.question}
                </span>
              </div>
              <h2 className="mt-9 text-3xl font-semibold leading-tight tracking-[-0.04em] text-[#111A2E]">
                {item.answer}
              </h2>
              <p className="mt-5 text-base leading-7 text-[#657189]">{item.detail}</p>
            </li>
          ))}
        </ol>
      </EditorialSection>

      <EditorialSection
        accent="cyan"
        eyebrow="연구 체인"
        title="데이터에서 통제된 의사결정까지"
        intro="각 단계는 다음 단계가 할 수 있는 일을 좁힌다. 좋은 모델 결과가 주문 버튼으로 순간이동할 수 없다."
      >
        <EvidenceBand
          accent="cyan"
          items={[
            { label: "01", value: "원시 시장 데이터" },
            { label: "02", value: "검증된 dataset" },
            { label: "03", value: "재현 가능한 experiment" },
            { label: "04", value: "감사 가능한 result" },
          ]}
        />
        <p className="mt-8 max-w-4xl border-l-2 border-[#2580D8]/45 pl-5 text-base leading-8 text-[#657189]">
          이 시스템은 비행기가 아니라 풍동이다. 미래의 트레이딩 엔진이 존재할 자격이 있는지 시험한다.
        </p>
      </EditorialSection>

      <EditorialSection
        accent="blue"
        eyebrow="최근 빌드"
        title="포부보다 완료된 증분을 보여준다"
        intro="공개 기록은 완료된 엔지니어링, 뒷받침되는 주장, 남아 있는 한계를 분리한다."
        tone="deep"
      >
        <div className="grid gap-5 lg:grid-cols-3">
          {latestBuildLogKo.map((entry, index) => (
            <article key={`${entry.date}-${entry.title}`} className="glass-panel flex min-h-[26rem] flex-col rounded-[2rem] p-7 sm:p-9">
              <div className="flex items-center justify-between text-xs uppercase tracking-[0.14em] text-[#77839A]">
                <span>{entry.phase}</span>
                <span className="font-mono text-[#2563C9]">{String(index + 1).padStart(2, "0")}</span>
              </div>
              <p className="mt-7 text-sm font-semibold text-[#1677D2]">{entry.date}</p>
              <h3 className="mt-5 text-3xl font-semibold leading-tight tracking-[-0.04em] text-[#111A2E]">{entry.title}</h3>
              <p className="mt-5 text-base leading-7 text-[#657189]">{entry.summary}</p>
              <p className="mt-auto border-l-2 border-[#D68A2A]/40 pl-4 pt-8 text-sm leading-6 text-[#5F6C82]">{entry.boundary}</p>
            </article>
          ))}
        </div>
        <div className="mt-10">
          <Link href="/ko/build-log" className={primaryButton}>전체 빌드 로그 <Arrow /></Link>
        </div>
      </EditorialSection>
    </PageShell>
  );
}

export function KoreanProjectsPage() {
  const projects = [
    {
      accent: "cyan" as const,
      contribution: "불변 contract, canonical identity, 통제된 public-data acquisition, 결정론적 normalization, persistent run bundle, offline verification을 갖춘 자산 중립 연구 기반.",
      href: "/ko/projects/multi-asset-research-lab",
      index: "01",
      methods: ["불변 contract", "Canonical hash", "통제된 HTTPS", "Run bundle", "Offline verification"],
      question: "실험을 실행하기 전에 멀티애셋 연구 프레임워크가 데이터 identity, provenance, 재현성, 실패 경계를 어떻게 증명해야 하는가?",
      status: "대표 인프라 구축",
      title: "멀티애셋 연구소",
      type: "연구 인프라",
    },
    {
      accent: "emerald" as const,
      contribution: "변동성 예측, forward outcome, append-only evidence, provenance, maturity review, 운영 무결성 검사를 결합하되 전략·실행 권한과 분리한 BTCUSDT freezer validation 시스템.",
      href: "/ko/projects/btc-futures-research",
      index: "02",
      methods: ["GARCH", "EGARCH", "GJR-GARCH", "HAR-RV", "Forward validation"],
      question: "BTCUSDT 변동성 연구가 진입 허가, 전략 승인, 주문 실행으로 넘어가지 않으면서 검토 가능한 forward evidence를 어떻게 축적할 수 있는가?",
      status: "Freezer 검증 시스템",
      title: "BTC 선물 연구 시스템",
      type: "운영 연구 증거",
    },
    {
      accent: "blue" as const,
      contribution: "NQ, ES, Crude Oil 선물을 대상으로 동일한 intraday logic에 EGARCH 조건부 변동성 계층을 추가해 risk/admissibility 기여를 비교한 학술 연구.",
      href: "/ko/projects/volatility-regime-filtering",
      index: "03",
      methods: ["NQ", "ES", "Crude Oil", "EGARCH", "5분봉", "Robustness"],
      question: "EGARCH를 방향 예측기로 취급하지 않으면서 변동성 국면 필터가 intraday futures framework의 규율을 개선할 수 있는가?",
      status: "학술 기반",
      title: "선물시장 변동성 국면 필터링",
      type: "금융계량경제학",
    },
    {
      accent: "amber" as const,
      contribution: "우측 꼬리 explosive-root 진단을 적용해 비트코인 가격의 통계적 폭발 구간을 식별하고 해석한 시계열 연구.",
      href: "/ko/projects/bitcoin-bubble-gsadf",
      index: "04",
      methods: ["Bitcoin", "GSADF", "Explosive root", "시계열"],
      question: "GSADF 검정으로 통계적 폭발 구간을 식별하면서 진단 증거를 시장 추천과 분리할 수 있는가?",
      status: "초기 시계열 연구",
      title: "GSADF 기반 비트코인 버블 탐지",
      type: "암호자산 진단",
    },
  ] as const;

  return (
    <PageShell locale="ko">
      <PageHero
        eyebrow="MeanyDeany · 연구 시스템"
        title="연구 시스템과 학술적 계보"
        intro="자산 중립 연구 프레임워크, 별도의 BTC freezer validation 시스템, 두 시스템의 바탕이 된 금융계량 연구를 명확히 분리한다."
        metadata={[
          { label: "대표 시스템", value: "멀티애셋 연구소" },
          { label: "운영 연구", value: "BTCUSDT freezer validation" },
          { label: "학술 기반", value: "석사 논문 · 세미나 페이퍼" },
          { label: "경계", value: "실행 시스템 없음" },
        ]}
      />
      <EditorialSection eyebrow="프로그램 구성" title="하나의 연구 프로그램, 네 개의 계층" intro="각 시스템은 고유한 저장소 경계, provenance, 연구 질문, 방법론, 제한된 기여를 유지한다.">
        <div>{projects.map((project) => <ProjectIndexRow key={project.href} {...project} />)}</div>
      </EditorialSection>
      <EditorialSection accent="amber" eyebrow="공통 기준" title="모든 연구를 관통하는 원칙" tone="deep">
        <EvidenceBand items={[
          { label: "시간", value: "정보가 실제로 알려질 수 있었던 시점에 맞춘다." },
          { label: "모델", value: "모델의 역할은 전략 주장보다 좁다." },
          { label: "검증", value: "비교와 한계를 명시적으로 남긴다." },
          { label: "증거", value: "결과와 함께 provenance와 경계를 보존한다." },
        ]} />
      </EditorialSection>
    </PageShell>
  );
}

export function KoreanLabPage() {
  const architecture = [
    ["01", "연구 contract", "Asset, session, bar schema, dataset, code, environment, slice, parameter, randomness를 실행 전에 선언한다.", "기반 완료"],
    ["02", "통제된 데이터 경계", "Allowlist된 공개 GET 요청만 제한적으로 허용하며 최초 lifecycle은 BTCUSDT 5분봉으로 고정한다.", "좁은 adapter"],
    ["03", "Canonical evidence", "원본 response byte, normalized CSV, manifest, receipt, observation에 결정론적 identity를 부여한다.", "검증됨"],
    ["04", "Persistent research run", "완료된 증거를 atomic하게 불변 run bundle로 publish하고 exact-tree 검증과 offline reload를 지원한다.", "오프라인 검증"],
    ["05", "Experiment identity", "Manifest, dataset observation, typed metric, run, result를 path-free canonical identity로 묶는다.", "검증됨"],
    ["06", "Bounded execution", "Synthetic proof와 verified historical-bar descriptive experiment를 고정 entrypoint로 실행한다.", "검증됨"],
  ] as const;
  const failures = [
    ["TLS transport 실패", "Dataset이나 run bundle을 만들지 않고 중단한다."],
    ["손상되거나 과대한 JSON", "Bounded parsing이 입력을 거부한다."],
    ["Run 내부 예상 밖 파일", "Exact-tree verification이 completed directory를 거부한다."],
    ["Symlink 또는 경로 우회", "모호하거나 리다이렉트된 filesystem path를 거부한다."],
    ["Hash·observation 불일치", "Canonical identity reconciliation이 fail closed한다."],
    ["읽기 중 파일 변경", "전·중·후 file identity 검사로 materialization을 거부한다."],
  ] as const;
  const roadmap = [
    ["01", "연구 contract", "완료", "emerald" as const],
    ["02", "시장 데이터 evidence", "완료", "emerald" as const],
    ["03", "검증 가능한 run bundle", "완료", "emerald" as const],
    ["04", "Experiment run/result identity", "완료", "emerald" as const],
    ["05", "Synthetic experiment runner", "완료", "emerald" as const],
    ["06", "Verified historical-bar experiment", "완료", "emerald" as const],
    ["07", "Exact close-return evidence", "진행 중", "cyan" as const],
    ["08", "Paper evaluation", "미승인", "amber" as const],
    ["09", "Live trading", "미승인", "amber" as const],
  ] as const;
  const faq = [
    ["이 시스템은 거래하는가?", "아니다. 주문, 포지션 관리, broker 연결, 진입·숏 허가를 제공하지 않는다."],
    ["현재 돈을 버는가?", "아니다. Live trading, fund, signal subscription, software revenue가 없다."],
    ["왜 전략보다 인프라를 먼저 만드는가?", "데이터·코드·가정·결과 이력을 재현할 수 없는 수익성 좋은 backtest는 약한 증거이기 때문이다."],
    ["왜 BTCUSDT부터 시작했는가?", "연속적이고 유동성이 높으며 공개 데이터로 첫 end-to-end lifecycle을 증명하기 좋은 통제 환경이기 때문이다."],
    ["왜 하나의 adapter인데 multi-asset인가?", "Contract와 evidence model이 asset-neutral이기 때문이다. 여러 자산이 이미 운영 중이라는 뜻은 아니다."],
    ["Paper/live 전에 무엇이 필요한가?", "별도의 성과 증거, 통제, 운영 검증, 명시적 승인 절차가 필요하다. 연구 진척만으로 허가되지 않는다."],
  ] as const;

  return (
    <PageShell locale="ko">
      <PageHero
        accent="cyan"
        eyebrow="멀티애셋 연구소"
        title="돈을 위험에 노출하기 전에 트레이딩 아이디어를 신뢰할 수 있는가?"
        intro="원시 시장 데이터를 검증된 dataset, 재현 가능한 experiment, 감사 가능한 result로 바꾸는 연구·검증 플랫폼이다."
        actions={<><CtaLink href="#what-it-is" kind="primary">시스템 설명</CtaLink><CtaLink href="#proof">증명된 내용</CtaLink></>}
        metadata={[
          { label: "시스템", value: "시스템 트레이딩 연구 인프라" },
          { label: "현재 단계", value: "검증된 과거 데이터 실험" },
          { label: "오늘 거래", value: "없음" },
          { label: "현재 매출", value: "없음" },
        ]}
      />
      <CapabilityBand label="현재 산출물" items={["검증된 dataset", "재현 가능한 experiment", "감사 가능한 result", "보이는 실패", "통제된 의사결정"]} />
      <EditorialSection id="what-it-is" eyebrow="쉽게 설명하면" title="정량 트레이딩 연구의 품질관리 시스템" intro="약한 데이터, 재현 불가능한 실험, 과장된 모델 주장이 거래 의사결정에 닿기 전에 멈추도록 설계됐다.">
        <div className="grid gap-5 md:grid-cols-3">
          {[
            ["입력", "원시 시장 데이터와 연구 아이디어", "데이터, 코드, parameter, session, 가정을 정확히 선언한다."],
            ["품질관리", "검증·재현·보존", "데이터 identity를 확인하고 provenance를 잠그며 결과의 사후 변경을 막는다."],
            ["출력", "감사 가능한 증거", "결과를 검토·비교·반박·기각할 수 있게 만든다."],
          ].map(([label, title, detail], index) => (
            <article key={label} className="glass-panel rounded-[2rem] p-6 sm:p-8">
              <span className="font-mono text-xs text-[#087E9B]">{String(index + 1).padStart(2, "0")}</span>
              <p className="mt-5 text-xs font-semibold uppercase tracking-[0.14em] text-[#77839A]">{label}</p>
              <h2 className="mt-5 text-2xl font-semibold text-[#111A2E]">{title}</h2>
              <p className="mt-4 text-base leading-7 text-[#657189]">{detail}</p>
            </article>
          ))}
        </div>
      </EditorialSection>
      <EditorialSection id="architecture" eyebrow="시스템 구조" title="연구 엔진보다 증명 시스템을 먼저 만든다" intro="미래의 model runner가 결과를 본 뒤 경계를 발명하지 못하도록 contract와 evidence mechanics를 먼저 고정한다." tone="deep">
        <div className="grid gap-5 md:grid-cols-2">
          {architecture.map(([index, title, detail, status]) => (
            <article key={index} className="glass-panel rounded-[2rem] p-6 sm:p-8">
              <div className="flex items-center justify-between"><span className="font-mono text-xs text-[#087E9B]">{index}</span><StatusLabel accent="cyan">{status}</StatusLabel></div>
              <h3 className="mt-7 text-2xl font-semibold text-[#111A2E]">{title}</h3>
              <p className="mt-4 text-base leading-7 text-[#657189]">{detail}</p>
            </article>
          ))}
        </div>
      </EditorialSection>
      <EditorialSection id="proof" accent="amber" eyebrow="수익이 아니라 증명" title="시스템이 숨기지 않은 실패" intro="성공처럼 보이는 증거를 제조하지 않고 실제로 거부하도록 설계·테스트한 실패 유형이다." tone="warm">
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {failures.map(([trigger, response], index) => (
            <article key={trigger} className="glass-panel rounded-[2rem] p-6 sm:p-7">
              <div className="flex justify-between"><span className="font-mono text-xs text-[#A85D08]">{String(index + 1).padStart(2, "0")}</span><StatusLabel accent="amber">거부</StatusLabel></div>
              <h3 className="mt-6 text-2xl font-semibold text-[#111A2E]">{trigger}</h3>
              <p className="mt-4 text-sm leading-6 text-[#657189]">{response}</p>
            </article>
          ))}
        </div>
      </EditorialSection>
      <EditorialSection id="roadmap" accent="blue" eyebrow="현재 단계 로드맵" title="완료·진행·미승인을 분리한다" intro="기술 계층의 완료가 다음 운영 상태를 자동으로 허가하지 않는다." tone="deep">
        <ol className="overflow-hidden rounded-[2rem] border border-[#7187AB]/15 bg-white/32">
          {roadmap.map(([index, title, status, tone]) => (
            <li key={index} className="grid gap-5 border-b border-[#7187AB]/14 p-6 last:border-b-0 md:grid-cols-[3rem_minmax(0,1fr)_auto] md:items-center">
              <span className="font-mono text-xs text-[#2563C9]">{index}</span><h3 className="text-xl font-semibold text-[#111A2E]">{title}</h3><StatusLabel accent={tone}>{status}</StatusLabel>
            </li>
          ))}
        </ol>
      </EditorialSection>
      <EditorialSection id="faq" accent="violet" eyebrow="직접 답변" title="회의적인 방문자가 물어야 할 질문">
        <div className="grid gap-4 lg:grid-cols-2">
          {faq.map(([question, answer]) => <article key={question} className="glass-panel rounded-[1.75rem] p-6 sm:p-7"><h3 className="text-xl font-semibold text-[#111A2E]">{question}</h3><p className="mt-4 text-sm leading-6 text-[#657189]">{answer}</p></article>)}
        </div>
      </EditorialSection>
      <EditorialSection id="boundaries" accent="amber" eyebrow="강제 경계" title="연구소가 허가할 수 없는 것" intro="실행 계층의 부재는 미완성 기능이 아니라 설계 요구사항이다." tone="warm">
        <div className="flex flex-wrap gap-2">{["실거래 없음", "모의매매 승인 없음", "주문 라우팅 없음", "진입·숏 허가 없음", "레버리지·포지션 사이징 없음", "전략 승인 없음", "투자 조언 없음"].map((item) => <ResearchTag key={item}>{item}</ResearchTag>)}</div>
      </EditorialSection>
    </PageShell>
  );
}

export function KoreanBtcPage() {
  return (
    <PageShell locale="ko">
      <PageHero
        accent="emerald"
        eyebrow="BTCUSDT · Freezer validation"
        title="BTC 선물 연구 시스템"
        intro="변동성 forecast, forward outcome, provenance, operational integrity를 축적하는 연구 전용 시스템이다. 진입 신호나 자동매매 엔진이 아니다."
        actions={<CtaLink href="/projects/btc-futures-research" kind="primary">영문 인터랙티브 상세 보기</CtaLink>}
        metadata={[
          { label: "현재 자산", value: "BTCUSDT 5분봉" },
          { label: "모델", value: "GARCH · EGARCH · GJR · HAR-RV" },
          { label: "상태", value: "Freezer forward validation" },
          { label: "실행 연동", value: "없음" },
        ]}
      />
      <EditorialSection id="evidence-pipeline" eyebrow="증거 파이프라인" title="예측과 결과와 운영 상태를 분리해 기록한다" intro="각 ledger는 append-only evidence와 source identity를 보존하며, 모델 출력이 자동으로 policy나 entry permission으로 변하지 못하게 한다.">
        <EvidenceBand accent="emerald" items={[
          { label: "Fit", value: "고정 시점의 모델 specification과 parameter" },
          { label: "State", value: "예측 당시의 변동성 evidence" },
          { label: "Outcome", value: "시간이 지난 뒤 관측된 factual result" },
          { label: "Integrity", value: "중복·stale·lock·schedule 상태" },
        ]} />
      </EditorialSection>
      <EditorialSection accent="violet" eyebrow="모델 역할" title="변동성 context이지 방향 예측기가 아니다" tone="deep">
        <div className="grid gap-5 md:grid-cols-2">
          {[
            ["GARCH(1,1)-t", "대칭적 조건부 분산 baseline"],
            ["EGARCH(1,1)-t", "비대칭 volatility response"],
            ["GJR-GARCH(1,1)-t", "Threshold asymmetry"],
            ["HAR-RV", "여러 horizon의 realized volatility 구조"],
          ].map(([name, detail]) => <article key={name} className="glass-panel rounded-[1.75rem] p-6"><h3 className="text-xl font-semibold text-[#111A2E]">{name}</h3><p className="mt-3 text-sm leading-6 text-[#657189]">{detail}</p></article>)}
        </div>
      </EditorialSection>
      <EditorialSection accent="amber" eyebrow="연구 경계" title="좋은 forecast도 매매 허가가 아니다" tone="warm">
        <div className="flex flex-wrap gap-2">{["Live trading 금지", "Paper approval 없음", "Binance execution 없음", "Entry permission 없음", "Short permission 없음", "Leverage sizing 없음", "Automatic veto 없음"].map((item) => <ResearchTag key={item}>{item}</ResearchTag>)}</div>
      </EditorialSection>
    </PageShell>
  );
}

export function KoreanVolatilityPage() {
  const methodology = [
    ["01", "변동성 계층", ["EGARCH(1,1) Student-t", "일별 조건부 변동성", "Percentile 국면 분류", "비대칭 shock response"]],
    ["02", "Intraday 계층", ["NQ·ES·Crude Oil 5분봉", "일별 국면을 intraday date에 정렬", "Trend·mean-reversion 연구 모듈", "거래비용·risk control 가정"]],
    ["03", "검증 계층", ["EGARCH vs no-filter ablation", "대체 volatility filter", "Walk-forward", "Bootstrap·subperiod robustness"]],
  ] as const;
  return (
    <PageShell locale="ko">
      <PageHero accent="blue" eyebrow="코펜하겐대학교 경제학 석사 논문" title="선물시장 변동성 국면 필터링" intro="EGARCH를 방향 예측기가 아니라 NQ·ES·Crude Oil intraday 연구의 risk/admissibility 계층으로 사용한 연구다." actions={<CtaLink href="/papers/volatility-regime-filtering-thesis.pdf" kind="primary" newTab>영문 논문 원문 보기</CtaLink>} metadata={[
        { label: "시장", value: "NQ · ES · Crude Oil" }, { label: "주기", value: "일별 모델 · 5분봉 평가" }, { label: "모델 역할", value: "Risk와 admissibility" }, { label: "맥락", value: "학술 연구" },
      ]} />
      <EditorialSection eyebrow="연구 범위" title="방향 예측을 과장하지 않는 변동성 context" intro="일별 EGARCH estimate를 5분봉에 정렬하고, volatility environment가 학술 framework에서 exposure 고려에 적합한지 평가한다.">
        <EvidenceBand accent="blue" items={[
          { label: "입력", value: "일별 futures return" }, { label: "출력", value: "조건부 변동성 국면" }, { label: "Intraday", value: "NQ·ES·CL 5분봉" }, { label: "비교", value: "Filter 적용 vs 미적용" },
        ]} />
      </EditorialSection>
      <EditorialSection accent="violet" eyebrow="방법론" title="역할이 분리된 세 계층" tone="deep">
        <div className="grid gap-5 lg:grid-cols-3">{methodology.map(([index, title, items]) => <article key={index} className="glass-panel rounded-[2rem] p-6"><span className="font-mono text-xs text-[#7251C8]">{index}</span><h3 className="mt-5 text-2xl font-semibold text-[#111A2E]">{title}</h3><ul className="mt-5 space-y-3">{items.map((item) => <li key={item} className="text-sm leading-6 text-[#657189]">{item}</li>)}</ul></article>)}</div>
      </EditorialSection>
      <EditorialSection accent="amber" eyebrow="해석" title="증거가 지지하는 것과 지지하지 않는 것" tone="warm">
        <div className="grid gap-5 md:grid-cols-2"><article className="glass-panel rounded-[2rem] p-6"><StatusLabel accent="emerald">지지되는 해석</StatusLabel><p className="mt-5 text-base leading-7 text-[#657189]">EGARCH conditioning은 주요 학술 setting에서 risk/admissibility context로 유용한 기여를 보였으며, ablation은 underlying logic과 filter 기여를 분리한다.</p></article><article className="glass-panel rounded-[2rem] p-6"><StatusLabel accent="amber">지지되지 않는 해석</StatusLabel><p className="mt-5 text-base leading-7 text-[#657189]">EGARCH는 가격 방향을 확정하지 않으며, 결과는 인과 증명·보편 규칙·실거래 허가가 아니다.</p></article></div>
      </EditorialSection>
    </PageShell>
  );
}

export function KoreanGsadfPage() {
  const steps = [
    ["01", "시계열 정의", "Bitcoin price sample과 연구 질문을 먼저 고정한다."],
    ["02", "우측 꼬리 검정", "여러 recursive window에서 unit-root behavior 이탈을 평가한다."],
    ["03", "Episode dating", "Test statistic과 critical value를 비교해 통계적 폭발 구간을 식별한다."],
    ["04", "해석 제한", "탐지를 trading signal이나 fundamental mispricing 증명으로 확대하지 않는다."],
  ] as const;
  return (
    <PageShell locale="ko">
      <PageHero accent="amber" eyebrow="세미나 페이퍼 · 암호자산 진단" title="GSADF 기반 비트코인 버블 탐지" intro="우측 꼬리 explosive-root 검정을 적용해 비트코인 가격의 통계적 폭발 구간을 식별·해석한 시계열 연구다." actions={<CtaLink href="/papers/bitcoin-bubble-gsadf-seminar-paper.pdf" kind="primary" newTab>영문 페이퍼 원문 보기</CtaLink>} metadata={[
        { label: "자산", value: "Bitcoin" }, { label: "방법", value: "GSADF" }, { label: "질문", value: "Explosive price dynamics" }, { label: "맥락", value: "학술 진단" },
      ]} />
      <EditorialSection eyebrow="연구 framing" title="시장 추천이 아니라 진단 질문" intro="통계 결과는 sample 안의 시계열을 설명하며 매수·매도·타이밍·실행을 추천하지 않는다.">
        <EvidenceBand accent="amber" items={[
          { label: "검정", value: "우측 꼬리 explosive-root test" }, { label: "설계", value: "Sample 내 varying recursive window" }, { label: "출력", value: "통계적 폭발 episode" }, { label: "경계", value: "거래·투자 가이드 없음" },
        ]} />
      </EditorialSection>
      <EditorialSection accent="violet" eyebrow="방법" title="Recursive testing과 제한된 해석" tone="deep">
        <ol className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">{steps.map(([index, title, text]) => <li key={index} className="glass-panel rounded-[1.75rem] p-6"><span className="font-mono text-xs text-[#7251C8]">{index}</span><h3 className="mt-5 text-lg font-semibold text-[#111A2E]">{title}</h3><p className="mt-3 text-sm leading-6 text-[#657189]">{text}</p></li>)}</ol>
      </EditorialSection>
      <EditorialSection accent="amber" eyebrow="연구 경계" title="학술 해석 전용" tone="warm"><p className="max-w-4xl text-base leading-8 text-[#657189]">이 페이퍼는 매매 신호를 제공하거나 Bitcoin 매수·매도를 권고하지 않으며 투자 조언이 아니다.</p></EditorialSection>
    </PageShell>
  );
}

export function KoreanPapersPage() {
  const papers = [
    {
      title: "Volatility Regime Filtering in Futures Markets",
      type: "경제학 석사 논문",
      abstract: "일별 EGARCH volatility regime이 NQ·ES·Crude Oil intraday framework의 risk/admissibility layer로 기능하는지 연구한다. 방향 예측기가 아니라 conditioning context로 평가한다.",
      scope: "E-mini Nasdaq-100, E-mini S&P 500, Crude Oil intraday futures",
      methods: ["EGARCH(1,1)", "Student-t", "Ablation", "Walk-forward", "Bootstrap"],
      pdf: "/papers/volatility-regime-filtering-thesis.pdf",
      project: "/ko/projects/volatility-regime-filtering",
      accent: "blue" as const,
    },
    {
      title: "Bitcoin Bubble Detection with GSADF",
      type: "세미나 페이퍼",
      abstract: "우측 꼬리 explosive-root test로 Bitcoin price의 통계적 폭발 구간을 살핀다. 시장 가이드나 trading rule이 아닌 time-series diagnostic이다.",
      scope: "Bitcoin price dynamics",
      methods: ["GSADF", "Right-tailed test", "Explosive root", "Time series"],
      pdf: "/papers/bitcoin-bubble-gsadf-seminar-paper.pdf",
      project: "/ko/projects/bitcoin-bubble-gsadf",
      accent: "amber" as const,
    },
  ] as const;
  return (
    <PageShell locale="ko">
      <PageHero accent="blue" eyebrow="MeanyDeany · 논문 아카이브" title="논문" intro="연구 프로그램의 학술적 기반인 금융계량경제학과 암호자산 시계열 진단 원문을 제공한다." metadata={[
        { label: "아카이브", value: "학술 논문 2편" }, { label: "방법", value: "EGARCH · GSADF" }, { label: "범위", value: "NQ · ES · Crude Oil · Bitcoin" }, { label: "원문", value: "영문 PDF" },
      ]} />
      <EditorialSection eyebrow="학술 연구" title="논문 기록" intro="한국어 페이지는 연구 맥락을 설명하며 PDF 원문은 영어로 제공한다.">
        <ol className="space-y-6">{papers.map((paper, index) => <li key={paper.title} className="glass-panel rounded-[2rem] p-6 sm:p-8"><div className="grid gap-7 lg:grid-cols-[3rem_minmax(0,1.2fr)_minmax(16rem,0.8fr)]"><span className="font-mono text-xs text-[#2563C9]">{String(index + 1).padStart(2, "0")}</span><article><StatusLabel accent={paper.accent}>{paper.type}</StatusLabel><h2 className="mt-5 text-3xl font-semibold text-[#111A2E]">{paper.title}</h2><p className="mt-5 text-base leading-7 text-[#657189]">{paper.abstract}</p><p className="mt-5 text-sm text-[#5F6C82]">범위: {paper.scope}</p></article><div className="flex flex-col justify-between gap-8"><div className="flex flex-wrap gap-2">{paper.methods.map((method) => <ResearchTag key={method}>{method}</ResearchTag>)}</div><div className="flex flex-wrap gap-3"><CtaLink href={paper.pdf} kind="primary" newTab>영문 PDF 원문</CtaLink><CtaLink href={paper.project}>한국어 프로젝트 설명</CtaLink></div></div></div></li>)}</ol>
      </EditorialSection>
    </PageShell>
  );
}

export function KoreanResearchPage() {
  const principles = [
    ["01", "허가보다 증거", "모델 출력은 검증을 통해 해석 자격을 얻는다. 자동으로 entry, veto, sizing, execution instruction이 되지 않는다."],
    ["02", "시간 정합성", "Feature, state, outcome은 평가 시점에 이용 가능했던 정보만 사용하며 missing data를 조용히 수선하지 않는다."],
    ["03", "비교와 robustness", "단일 유리한 통계보다 ablation, alternative specification, walk-forward, subperiod check를 중시한다."],
    ["04", "불변 evidence와 provenance", "가설이 바뀌어도 과거 연구 기록, source identity, transformation history를 결과와 함께 남긴다."],
    ["05", "운영 신뢰성", "중복 방지, stale input, lock, scheduling, failure state도 반복 증거 생산 시스템의 연구 타당성 일부다."],
    ["06", "Evidence·policy·execution 분리", "Descriptive evidence가 policy 연구에 쓰일 수 있지만 policy state도 entry permission이 아니며 execution을 허가하지 않는다."],
  ] as const;
  return (
    <PageShell locale="ko">
      <PageHero accent="violet" eyebrow="MeanyDeany · 방법론" title="연구 방법론" intro="시간 정합성, 좁은 모델 역할, robust comparison, 불변 evidence, 보이는 failure state를 중심에 둔다." metadata={[
        { label: "데이터", value: "시간 정합" }, { label: "모델", value: "비교 대상이지 교리가 아님" }, { label: "증거", value: "감사 가능하고 불변" }, { label: "허가", value: "모델 출력 밖의 별도 상태" },
      ]} />
      <EditorialSection accent="violet" eyebrow="작업 원칙" title="연구 신뢰도는 누적된다" intro="단일 diagnostic이 시스템 타당성을 확정하지 않는다. 시간 규율, robustness, provenance, 운영 무결성, 좁은 주장이 쌓여 신뢰도를 만든다." tone="deep">
        <ol className="grid gap-5 lg:grid-cols-2">{principles.map(([index, title, text]) => <li key={index} className="glass-panel rounded-[2rem] p-6 sm:p-8"><div className="flex items-center gap-4"><span className="font-mono text-xs text-[#7251C8]">{index}</span><StatusLabel accent="violet">{title}</StatusLabel></div><p className="mt-6 text-base leading-8 text-[#657189]">{text}</p></li>)}</ol>
      </EditorialSection>
      <EditorialSection accent="amber" eyebrow="책임 분리" title="하나의 파이프라인, 네 개의 책임" tone="warm"><EvidenceBand accent="cyan" items={[
        { label: "Evidence", value: "데이터와 모델 기록이 실제로 지지하는 것" }, { label: "Interpretation", value: "증거를 어떻게 framing하고 반박하는가" }, { label: "Policy", value: "명시적 규칙을 가진 별도 연구 계층" }, { label: "Execution", value: "현재 공개 포트폴리오에 없음" },
      ]} /></EditorialSection>
    </PageShell>
  );
}

export function KoreanBuildLogPage() {
  return (
    <PageShell locale="ko">
      <PageHero accent="blue" eyebrow="빌드 로그" title="무엇이 바뀌었고, 무엇을 증명했으며, 무엇을 아직 주장할 수 없는가." intro="마케팅 피드가 아니라 선별된 engineering record다. 각 항목은 완료된 capability, 근거, 계속 유효한 boundary를 함께 기록한다." actions={<><CtaLink href="/ko/projects/multi-asset-research-lab" kind="primary">대표 시스템</CtaLink><CtaLink href="/ko/projects/multi-asset-research-lab/claims">주장 장부</CtaLink></>} metadata={[
        { label: "항목", value: String(buildLogKo.length) }, { label: "출처", value: "검증된 repository milestone" }, { label: "갱신", value: "자동이 아닌 선별 기록" }, { label: "거래 권한", value: "없음" },
      ]} />
      <EditorialSection eyebrow="시간순 기록" title="완료된 증분으로 시스템을 보여준다" intro="최신 항목부터 표시하며, 미완성 작업과 지원되지 않는 주장을 분리할 수 있을 때만 공개 기록에 포함한다." tone="deep">
        <ol className="space-y-5">{buildLogKo.map((entry, index) => <li key={`${entry.date}-${entry.title}`} className="glass-panel rounded-[2rem] p-6 sm:p-8"><article className="grid gap-7 lg:grid-cols-[10rem_minmax(0,1fr)]"><div><span className="font-mono text-xs text-[#2563C9]">{String(index + 1).padStart(2, "0")}</span><p className="mt-5 text-sm font-semibold text-[#24324A]">{entry.date}</p><div className="mt-3"><StatusLabel accent="blue">{entry.phase}</StatusLabel></div></div><div><h2 className="text-2xl font-semibold text-[#111A2E] sm:text-3xl">{entry.title}</h2><p className="mt-5 text-base leading-7 text-[#657189]">{entry.summary}</p><div className="mt-7 flex flex-wrap gap-2">{entry.proof.map((item) => <ResearchTag key={item}>{item}</ResearchTag>)}</div><p className="mt-7 border-l-2 border-[#D68A2A]/45 pl-4 text-sm leading-6 text-[#5F6C82]"><strong>경계:</strong> {entry.boundary}</p></div></article></li>)}</ol>
      </EditorialSection>
      <EditorialSection accent="amber" eyebrow="읽는 법" title="빌드 완료는 승인 완료가 아니다" intro="새 인프라가 연구 재현성을 높여도 전략의 수익성·안전성·실행 준비 상태를 보장하지 않는다." tone="warm" />
    </PageShell>
  );
}

export function KoreanClaimsPage() {
  return (
    <PageShell locale="ko">
      <PageHero accent="violet" eyebrow="연구 주장 장부" title="모든 공개 주장에는 증거와 한계가 따라붙는다." intro="검증된 것, 구축 중인 것, 주장하지 않는 것, 명시적으로 승인되지 않은 상태를 분리한다." actions={<><CtaLink href="/ko/projects/multi-asset-research-lab" kind="primary">연구소로 돌아가기</CtaLink><CtaLink href="/ko/build-log">빌드 로그</CtaLink></>} metadata={[
        { label: "주장", value: String(claimLedgerKo.length) }, { label: "증거 기준", value: "좁고 재현 가능" }, { label: "수익성 주장", value: "없음" }, { label: "거래 승인", value: "없음" },
      ]} />
      <EditorialSection accent="violet" eyebrow="주장별 검토" title="장식 없는 증거" intro="각 행은 무엇을 말하는지, 무엇이 뒷받침하는지, 어디에서 멈추는지 답한다." tone="deep">
        <ol className="space-y-5">{claimLedgerKo.map((item, index) => <li key={item.claim} className="glass-panel rounded-[2rem] p-6 sm:p-8"><article className="grid gap-6 lg:grid-cols-[3rem_minmax(0,1fr)_minmax(18rem,0.9fr)]"><span className="font-mono text-xs text-[#7251C8]">{String(index + 1).padStart(2, "0")}</span><div><StatusLabel accent={item.tone}>{item.statusLabel}</StatusLabel><h2 className="mt-5 text-2xl font-semibold text-[#111A2E] sm:text-3xl">{item.claim}</h2><p className="mt-6 text-xs font-semibold uppercase tracking-[0.14em] text-[#77839A]">증거</p><p className="mt-3 text-base leading-7 text-[#657189]">{item.evidence}</p></div><aside className="rounded-[1.5rem] border border-[#D68A2A]/18 bg-[#FFF9F0]/56 p-5"><p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#A85D08]">주장 경계</p><p className="mt-4 text-sm leading-6 text-[#5F6C82]">{item.limit}</p></aside></article></li>)}</ol>
      </EditorialSection>
      <EditorialSection accent="amber" eyebrow="타협 불가 원칙" title="증거는 허가가 아니다" intro="가장 강한 연구 결과도 주문, 포지션, 진입 허가, 숏 허가, 레버리지 결정, 실행 권한을 만들지 않는다." tone="warm" />
    </PageShell>
  );
}

export function KoreanContactPage() {
  const interests = ["정량 연구 인프라", "금융계량경제학", "시장 데이터 검증", "변동성과 risk diagnostics", "재현 가능한 연구 시스템"] as const;
  return (
    <PageShell locale="ko">
      <PageHero eyebrow="연구 문의" title="기술·학술·커리어 관련 문의" intro="연구 토론, 기술 질문, 학술 연락, 전문적인 제안은 아래 비공개 메시지로 보낼 수 있다." actions={<><a href="#message" className={primaryButton}>메시지 작성 ↓</a><CtaLink href="https://github.com/MeanyDeany" newTab>GitHub 보기</CtaLink></>} metadata={[
        { label: "관심 분야", value: "Quant research · econometrics" }, { label: "시스템", value: "Market data · validation · evidence" }, { label: "이메일", value: "woosub815@gmail.com" }, { label: "GitHub", value: "MeanyDeany" },
      ]} />
      <EditorialSection id="message" accent="blue" eyebrow="비공개 메시지" title="직접 질문 보내기" intro="폼은 비공개 이메일 알림을 전송한다. 메시지는 공개되거나 웹사이트 database에 저장되지 않는다." tone="elevated">
        <div className="grid gap-8 lg:grid-cols-[minmax(15rem,0.55fr)_minmax(0,1.45fr)]"><aside className="glass-panel rounded-[2rem] p-6"><h2 className="text-xl font-semibold text-[#111A2E]">관련 주제</h2><ul className="mt-5 space-y-3">{interests.map((item, index) => <li key={item} className="flex gap-3 text-sm text-[#657189]"><span className="font-mono text-xs text-[#2563C9]">{String(index + 1).padStart(2, "0")}</span>{item}</li>)}</ul><p className="mt-6 text-xs leading-5 text-[#77839A]">시장 신호나 투자 조언 서비스가 아니다.</p></aside><ContactForm locale="ko" /></div>
      </EditorialSection>
    </PageShell>
  );
}
