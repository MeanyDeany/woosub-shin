import Link from "next/link";
import type { ReactNode } from "react";

export type Accent = "amber" | "blue" | "cyan" | "emerald" | "violet";

const accentText: Record<Accent, string> = {
  amber: "annotation-accent annotation-accent--amber text-[#A85D08]",
  blue: "annotation-accent annotation-accent--blue text-[#2563C9]",
  cyan: "annotation-accent annotation-accent--cyan text-[#087E9B]",
  emerald: "annotation-accent annotation-accent--emerald text-[#08765A]",
  violet: "annotation-accent annotation-accent--violet text-[#7251C8]",
};

const statusAccent: Record<Accent, string> = {
  amber: "status-label--amber",
  blue: "status-label--blue",
  cyan: "status-label--cyan",
  emerald: "status-label--emerald",
  violet: "status-label--violet",
};

export type MetaItem = {
  label: string;
  value: string;
};

export function PageHero({
  accent = "cyan",
  actions,
  eyebrow,
  intro,
  metadata,
  title,
}: {
  accent?: Accent;
  actions?: ReactNode;
  eyebrow: string;
  intro: string;
  metadata?: readonly MetaItem[];
  title: string;
}) {
  return (
    <section className="relative overflow-hidden border-b border-[#6880A8]/15 bg-white/22 backdrop-blur-sm">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 -top-44 h-[32rem] w-[32rem] rounded-full bg-[#70C4FF]/20 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-36 top-0 h-[28rem] w-[28rem] rounded-full bg-[#B5A0FF]/16 blur-3xl"
      />
      <div className="relative mx-auto grid max-w-[1320px] gap-10 px-5 py-16 sm:py-24 lg:grid-cols-[minmax(0,1.35fr)_minmax(18rem,0.65fr)] lg:gap-16 lg:px-8 lg:py-28">
        <div className="min-w-0">
          <p
            className={`eyebrow-label text-[0.68rem] font-semibold uppercase tracking-[0.18em] ${accentText[accent]}`}
          >
            {eyebrow}
          </p>
          <h1 className="mt-5 max-w-5xl text-[clamp(3rem,7vw,6.2rem)] font-semibold leading-[0.94] tracking-[-0.06em] text-[#111A2E]">
            {title}
          </h1>
          <p className="mt-7 max-w-[46rem] text-lg leading-8 text-[#5F6C82] sm:text-xl sm:leading-9">
            {intro}
          </p>
          {actions ? (
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              {actions}
            </div>
          ) : null}
        </div>

        {metadata?.length ? (
          <TechnicalMetadata rows={metadata} accent={accent} className="self-end" />
        ) : null}
      </div>
    </section>
  );
}

export function SectionHeading({
  accent = "cyan",
  eyebrow,
  intro,
  title,
}: {
  accent?: Accent;
  eyebrow?: string;
  intro?: string;
  title: string;
}) {
  return (
    <div className="mb-10 max-w-4xl sm:mb-12">
      {eyebrow ? (
        <p
          className={`eyebrow-label text-[0.68rem] font-semibold uppercase tracking-[0.18em] ${accentText[accent]}`}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2 className="mt-3 max-w-3xl text-3xl font-semibold leading-tight tracking-[-0.04em] text-[#111A2E] sm:text-4xl lg:text-[3rem]">
        {title}
      </h2>
      {intro ? (
        <p className="mt-5 max-w-[48rem] text-base leading-7 text-[#657189] sm:text-lg sm:leading-8">
          {intro}
        </p>
      ) : null}
    </div>
  );
}

const sectionTones = {
  base: "bg-white/18",
  deep: "bg-white/38",
  elevated: "bg-white/54",
  warm: "bg-[#FFF9F0]/48",
} as const;

export function EditorialSection({
  accent = "cyan",
  children,
  className = "",
  eyebrow,
  id,
  intro,
  title,
  tone = "base",
}: {
  accent?: Accent;
  children: ReactNode;
  className?: string;
  eyebrow?: string;
  id?: string;
  intro?: string;
  title?: string;
  tone?: keyof typeof sectionTones;
}) {
  return (
    <section
      id={id}
      className={`border-t border-[#6880A8]/13 backdrop-blur-[2px] ${sectionTones[tone]} ${className}`}
    >
      <div className="mx-auto max-w-[1320px] px-5 py-16 sm:py-20 lg:px-8 lg:py-24">
        {title ? (
          <SectionHeading
            accent={accent}
            eyebrow={eyebrow}
            intro={intro}
            title={title}
          />
        ) : null}
        {children}
      </div>
    </section>
  );
}

export function ResearchTag({ children }: { children: ReactNode }) {
  return (
    <span className="research-tag inline-flex rounded-full px-3 py-1.5 text-[0.69rem] font-medium uppercase tracking-[0.09em] backdrop-blur-lg">
      {children}
    </span>
  );
}

export function StatusLabel({
  accent = "cyan",
  children,
}: {
  accent?: Accent;
  children: ReactNode;
}) {
  return (
    <span
      className={`status-label ${statusAccent[accent]} inline-flex w-fit items-center rounded-full border px-3 py-1.5 text-[0.66rem] font-semibold uppercase tracking-[0.12em]`}
    >
      <span aria-hidden="true" className="mr-2 h-1.5 w-1.5 rounded-full bg-current" />
      {children}
    </span>
  );
}

export function CtaLink({
  children,
  href,
  kind = "secondary",
  newTab = false,
}: {
  children: ReactNode;
  href: string;
  kind?: "primary" | "secondary" | "text";
  newTab?: boolean;
}) {
  const className =
    kind === "primary"
      ? "inline-flex min-h-11 items-center justify-center rounded-full border border-[#17243D] bg-[#17243D] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(32,55,94,0.18)] transition-transform hover:-translate-y-0.5 hover:bg-[#22375B]"
      : kind === "text"
        ? "inline-flex min-h-10 items-center border-b border-[#2580D8]/35 py-2 text-sm font-semibold text-[#176FC1] transition-colors hover:border-[#176FC1] hover:text-[#0C5798]"
        : "inline-flex min-h-11 items-center justify-center rounded-full border border-[#7187AB]/24 bg-white/58 px-5 py-2.5 text-sm font-semibold text-[#24324A] shadow-[inset_0_1px_0_rgba(255,255,255,0.95)] backdrop-blur-xl transition-all hover:-translate-y-0.5 hover:border-[#2580D8]/45 hover:bg-white/82";

  if (newTab) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={className}>
        {children}
        <span className="ml-2" aria-hidden="true">↗</span>
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {children}
      <span className="ml-2" aria-hidden="true">→</span>
    </Link>
  );
}

export function TechnicalMetadata({
  accent = "cyan",
  className = "",
  rows,
}: {
  accent?: Accent;
  className?: string;
  rows: readonly MetaItem[];
}) {
  return (
    <dl className={`glass-panel technical-metadata rounded-[1.75rem] px-5 py-2 ${className}`}>
      {rows.map((row) => (
        <div
          key={row.label}
          className="technical-metadata__row grid grid-cols-[minmax(5.5rem,0.7fr)_minmax(0,1.3fr)] gap-4 border-b py-4 last:border-b-0"
        >
          <dt className="metadata-key">
            {row.label}
          </dt>
          <dd className={`technical-metadata__value min-w-0 text-sm leading-5 ${accentText[accent]}`}>{row.value}</dd>
        </div>
      ))}
    </dl>
  );
}

export function SubtleDivider() {
  return <div className="h-px w-full bg-[#7187AB]/15" aria-hidden="true" />;
}

export function CapabilityBand({
  items,
  label = "Capabilities",
}: {
  items: readonly string[];
  label?: string;
}) {
  return (
    <div className="capability-band border-y backdrop-blur-lg">
      <div className="mx-auto max-w-[1320px] px-5 py-7 lg:px-8">
        <p className="eyebrow-label annotation-accent annotation-accent--blue mb-5 text-[0.65rem] font-semibold uppercase tracking-[0.16em]">
          {label}
        </p>
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {items.map((item, index) => (
            <li key={item} className="glass-panel capability-chip rounded-2xl px-4 py-4 text-sm leading-6">
              <span className="annotation-accent annotation-accent--blue mr-3 font-mono text-[0.62rem]">
                {String(index + 1).padStart(2, "0")}
              </span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export type ProjectIndexRowProps = {
  accent?: Accent;
  contribution: string;
  href: string;
  index: string;
  methods: readonly string[];
  question: string;
  status: string;
  title: string;
  type: string;
};

export function ProjectIndexRow({
  accent = "cyan",
  contribution,
  href,
  index,
  methods,
  question,
  status,
  title,
  type,
}: ProjectIndexRowProps) {
  return (
    <article className="glass-panel mb-5 rounded-[2rem] p-6 last:mb-0 sm:p-8">
      <div className="grid gap-6 md:grid-cols-[3rem_minmax(0,1.15fr)_minmax(15rem,0.85fr)] md:gap-8">
        <p className={`font-mono text-xs ${accentText[accent]}`}>{index}</p>
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <p className={`text-[0.67rem] font-semibold uppercase tracking-[0.16em] ${accentText[accent]}`}>
              {type}
            </p>
            <StatusLabel accent={accent}>{status}</StatusLabel>
          </div>
          <h3 className="mt-4 text-2xl font-semibold leading-tight tracking-[-0.03em] text-[#111A2E] sm:text-3xl">
            {title}
          </h3>
          <p className="mt-5 max-w-2xl text-base leading-7 text-[#5F6C82]">
            {question}
          </p>
        </div>
        <div className="flex flex-col justify-between gap-7">
          <div>
            <p className="metadata-key">
              Contribution
            </p>
            <p className="mt-3 text-sm leading-6 text-[#657189]">{contribution}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {methods.map((method) => (
                <ResearchTag key={method}>{method}</ResearchTag>
              ))}
            </div>
          </div>
          <div>
            <CtaLink href={href} kind="text">Open project</CtaLink>
          </div>
        </div>
      </div>
    </article>
  );
}

export function EvidenceBand({
  accent = "amber",
  items,
}: {
  accent?: Accent;
  items: readonly MetaItem[];
}) {
  return (
    <dl className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item) => (
        <div key={item.label} className="glass-panel rounded-2xl px-5 py-5">
          <dt className="metadata-key">
            {item.label}
          </dt>
          <dd className={`mt-2 text-sm leading-6 ${accentText[accent]}`}>{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}
