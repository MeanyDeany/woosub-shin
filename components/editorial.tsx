import Link from "next/link";
import type { ReactNode } from "react";

export type Accent = "amber" | "blue" | "cyan" | "emerald" | "violet";

const accentText: Record<Accent, string> = {
  amber: "text-[#FFC56F]",
  blue: "text-[#8CB5FF]",
  cyan: "text-[#67DFF7]",
  emerald: "text-[#79E8B5]",
  violet: "text-[#C3AEFF]",
};

const accentBorder: Record<Accent, string> = {
  amber: "border-[#FFB547]/50",
  blue: "border-[#4D8DFF]/50",
  cyan: "border-[#42D7F5]/50",
  emerald: "border-[#3DDC97]/50",
  violet: "border-[#9B6CFF]/50",
};

const accentBackground: Record<Accent, string> = {
  amber: "bg-[#FFB547]/[0.06]",
  blue: "bg-[#4D8DFF]/[0.06]",
  cyan: "bg-[#42D7F5]/[0.06]",
  emerald: "bg-[#3DDC97]/[0.06]",
  violet: "bg-[#9B6CFF]/[0.06]",
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
    <section className="border-b border-[#7E8B9D]/15 bg-[#07090D]">
      <div className="mx-auto grid max-w-[1320px] gap-10 px-5 py-14 sm:py-18 lg:grid-cols-[minmax(0,1.4fr)_minmax(17rem,0.6fr)] lg:gap-16 lg:px-8 lg:py-24">
        <div className="min-w-0">
          <p
            className={`text-[0.68rem] font-semibold uppercase tracking-[0.18em] ${accentText[accent]}`}
          >
            {eyebrow}
          </p>
          <h1 className="mt-5 max-w-5xl text-[clamp(2.65rem,7vw,5.7rem)] font-semibold leading-[0.98] tracking-[-0.055em] text-[#F4F7FB]">
            {title}
          </h1>
          <p className="mt-7 max-w-[46rem] text-lg leading-8 text-[#B6C0CF] sm:text-xl sm:leading-9">
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
          className={`text-[0.68rem] font-semibold uppercase tracking-[0.18em] ${accentText[accent]}`}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2 className="mt-3 max-w-3xl text-3xl font-semibold leading-tight tracking-[-0.035em] text-[#F4F7FB] sm:text-4xl lg:text-[2.75rem]">
        {title}
      </h2>
      {intro ? (
        <p className="mt-5 max-w-[46rem] text-base leading-7 text-[#8996A8] sm:text-lg sm:leading-8">
          {intro}
        </p>
      ) : null}
    </div>
  );
}

const sectionTones = {
  base: "bg-[#07090D]",
  deep: "bg-[#080B11]",
  elevated: "bg-[#0A0E15]",
  warm: "bg-[#0D0C0B]",
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
      className={`border-t border-[#7E8B9D]/12 ${sectionTones[tone]} ${className}`}
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
    <span className="inline-flex border border-[#7E8B9D]/20 bg-[#0B0F16] px-2.5 py-1.5 text-[0.69rem] font-medium uppercase tracking-[0.09em] text-[#A8B3C2]">
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
      className={`inline-flex w-fit items-center border px-2.5 py-1.5 text-[0.66rem] font-semibold uppercase tracking-[0.12em] ${accentBorder[accent]} ${accentBackground[accent]} ${accentText[accent]}`}
    >
      <span
        aria-hidden="true"
        className={`mr-2 h-1.5 w-1.5 rounded-full bg-current`}
      />
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
      ? "inline-flex min-h-11 items-center justify-center border border-[#42D7F5] bg-[#42D7F5] px-5 py-2.5 text-sm font-semibold text-[#061016] transition-colors hover:border-[#7BE7FA] hover:bg-[#7BE7FA] focus-visible:outline-none"
      : kind === "text"
        ? "inline-flex min-h-10 items-center border-b border-[#42D7F5]/45 py-2 text-sm font-semibold text-[#DCE3EC] transition-colors hover:border-[#42D7F5] hover:text-white focus-visible:outline-none"
        : "inline-flex min-h-11 items-center justify-center border border-[#7E8B9D]/35 bg-transparent px-5 py-2.5 text-sm font-semibold text-[#DCE3EC] transition-colors hover:border-[#42D7F5]/75 hover:text-white focus-visible:outline-none";

  if (newTab) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={className}>
        {children}
        <span className="ml-2" aria-hidden="true">
          ↗
        </span>
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {children}
      <span className="ml-2" aria-hidden="true">
        →
      </span>
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
    <dl className={`border-y border-[#7E8B9D]/18 ${className}`}>
      {rows.map((row) => (
        <div
          key={row.label}
          className="grid grid-cols-[minmax(5.5rem,0.7fr)_minmax(0,1.3fr)] gap-4 border-b border-[#7E8B9D]/12 py-3.5 last:border-b-0"
        >
          <dt className="text-[0.65rem] font-semibold uppercase tracking-[0.13em] text-[#6F7D90]">
            {row.label}
          </dt>
          <dd className={`text-sm leading-5 ${accentText[accent]}`}>{row.value}</dd>
        </div>
      ))}
    </dl>
  );
}

export function SubtleDivider() {
  return <div className="h-px w-full bg-[#7E8B9D]/15" aria-hidden="true" />;
}

export function CapabilityBand({
  items,
  label = "Capabilities",
}: {
  items: readonly string[];
  label?: string;
}) {
  return (
    <div className="border-y border-[#7E8B9D]/18 bg-[#080B11]">
      <div className="mx-auto max-w-[1320px] px-5 py-7 lg:px-8">
        <p className="mb-5 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-[#67DFF7]">
          {label}
        </p>
        <ul className="grid gap-px overflow-hidden border border-[#7E8B9D]/15 bg-[#7E8B9D]/15 sm:grid-cols-2 lg:grid-cols-5">
          {items.map((item, index) => (
            <li key={item} className="bg-[#0B0F16] px-4 py-4 text-sm leading-6 text-[#B6C0CF]">
              <span className="mr-3 font-mono text-[0.62rem] text-[#4D8DFF]">
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
    <article className={`border-t ${accentBorder[accent]} py-9 first:pt-0`}>
      <div className="grid gap-6 md:grid-cols-[3rem_minmax(0,1.15fr)_minmax(15rem,0.85fr)] md:gap-8">
        <p className={`font-mono text-xs ${accentText[accent]}`}>{index}</p>
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <p className={`text-[0.67rem] font-semibold uppercase tracking-[0.16em] ${accentText[accent]}`}>
              {type}
            </p>
            <StatusLabel accent={accent}>{status}</StatusLabel>
          </div>
          <h3 className="mt-4 text-2xl font-semibold leading-tight tracking-[-0.025em] text-[#F4F7FB] sm:text-3xl">
            {title}
          </h3>
          <p className="mt-5 max-w-2xl text-base leading-7 text-[#B6C0CF]">
            {question}
          </p>
        </div>
        <div className="flex flex-col justify-between gap-7">
          <div>
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.13em] text-[#6F7D90]">
              Contribution
            </p>
            <p className="mt-3 text-sm leading-6 text-[#A8B3C2]">{contribution}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {methods.map((method) => (
                <ResearchTag key={method}>{method}</ResearchTag>
              ))}
            </div>
          </div>
          <div>
            <CtaLink href={href} kind="text">
              Open project
            </CtaLink>
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
    <dl className="grid gap-px overflow-hidden border border-[#7E8B9D]/15 bg-[#7E8B9D]/15 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item) => (
        <div key={item.label} className="bg-[#0B0F16] px-5 py-5">
          <dt className="text-[0.65rem] font-semibold uppercase tracking-[0.13em] text-[#6F7D90]">
            {item.label}
          </dt>
          <dd className={`mt-2 text-sm leading-6 ${accentText[accent]}`}>{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}
