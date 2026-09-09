import { CtaLink, EditorialSection, PageHero } from "@/components/editorial";
import { PageShell } from "@/components/site-shell";

export function KoreanRecruiterProjectsPage() {
  return (
    <PageShell locale="ko">
      <div className="research-page">
        <PageHero
          eyebrow="신우섭 · 시스템"
          title="시스템과 연구 인프라"
          intro="재현 가능한 연구와 안정적인 운영을 지원하는 엔지니어링입니다. 연구 가설·증거·검증과 실행 시스템의 전송·복구·상태 일관성·운영 안전성을 분리합니다."
          actions={<><CtaLink href="/asra" kind="primary">ASRA 연구 구조 (English)</CtaLink><CtaLink href="/research">연구 결과 (English)</CtaLink></>}
          metadata={[{ label: "연구", value: "가설 · 증거 · 검증" }, { label: "실행 시스템", value: "전송 · 복구 · 상태 일관성" }, { label: "텔레메트리", value: "읽기 전용 운영 증거" }]}
        />
        <EditorialSection id="research-infrastructure" eyebrow="01 · 연구 인프라" title="실험의 근거를 확인할 수 있는 구조" intro="ASRA는 현재 연구 프로그램입니다. 기존 연구소와 BTC 증거 시스템은 구조적 이력을 설명하며, 모든 과거 구성 요소가 이미 ASRA에 통합됐다는 뜻은 아닙니다.">
          <div className="research-grid">
            <article className="research-card"><h3>Multi-Asset Research Lab</h3><p className="research-prose">데이터 contract, provenance, 불변 artifact, 결정론적 replay, 고정된 비교, historical-to-forward 경계를 다룹니다.</p><CtaLink href="/ko/projects/multi-asset-research-lab">연구 인프라 보기</CtaLink></article>
            <article className="research-card"><h3>BTC 연구 증거 시스템</h3><p className="research-prose">변동성 증거, forward outcome, 실패 처리와 연구 관측 화면을 제공합니다. 개념적 도표와 과거 snapshot은 원래의 출처 범위를 유지합니다.</p><CtaLink href="/ko/projects/btc-futures-research#observatory">연구 관측 화면 보기</CtaLink></article>
          </div>
        </EditorialSection>
        <EditorialSection id="execution-gateway" eyebrow="02 · 별도의 실행 엔지니어링" title="Systematic Execution Gateway" intro="전송, 복구, 상태 일관성, 운영 안전성은 연구 가설이나 forecast loss와 별도로 평가합니다.">
          <div className="authority-boundary"><p className="research-kicker">RESEARCH — ASRA</p><p>가설 · 증거 · 검증</p><p><strong>NO AUTOMATIC EXECUTION AUTHORITY · 자동 실행 권한 없음</strong></p><p className="research-kicker">EXECUTION SYSTEMS</p><p>전송 · 복구 · 상태 일관성 · 운영 안전성</p></div>
          <p className="research-prose">독립 평가에서 확인된 것은 위험 예측 정보입니다. 별도의 고정 policy는 사전 등록된 효용 기준을 충족하지 못했습니다. 연구 결과가 방향성 alpha, sizing, veto, 거래 또는 실행 권한을 부여하지 않습니다.</p>
          <CtaLink href="/build-log#pr41-boundary-digest">과거 검증 제약 확인 (English)</CtaLink>
        </EditorialSection>
        <EditorialSection id="telemetry" eyebrow="03 · 운영 증거" title="읽기 전용 텔레메트리" intro="정제된 실행 계정 포지션과 입출금 조정 성과를 표시합니다. 데이터의 최신 여부는 운영 상태이며 ASRA나 과거 EMA 연구의 예측 성능이 아닙니다.">
          <p className="research-prose">Timestamp, stale·unavailable 상태와 성과 계산 방식은 기존 monitor에서 확인할 수 있습니다. 계정 성과를 H_PLUS_C의 성과나 독립적인 policy 확인으로 해석하지 않습니다.</p>
          <div className="research-actions"><CtaLink href="/ko/projects/btc-futures-research/live-position" kind="primary">읽기 전용 monitor 열기</CtaLink><CtaLink href="/ko/build-log">엔지니어링 이력</CtaLink></div>
        </EditorialSection>
      </div>
    </PageShell>
  );
}
