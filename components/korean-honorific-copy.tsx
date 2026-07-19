import {
  Children,
  cloneElement,
  isValidElement,
  type ReactElement,
  type ReactNode,
} from "react";

const replacements: readonly [RegExp, string][] = [
  [/수 있는가\?/gu, "수 있나요?"],
  [/해야 하는가\?/gu, "해야 하나요?"],
  [/무엇을 하는가\?/gu, "무엇을 하나요?"],
  [/거래하는가\?/gu, "거래하나요?"],
  [/버는가\?/gu, "버나요?"],
  [/시작했는가\?/gu, "시작했나요?"],
  [/만드는가\?/gu, "만드나요?"],
  [/인가\?/gu, "인가요?"],
  [/없는가\./gu, "없나요?"],
  [/아니다\./gu, "아닙니다."],
  [/없다\./gu, "없습니다."],
  [/있다\./gu, "있습니다."],
  [/않는다\./gu, "않습니다."],
  [/한다\./gu, "합니다."],
  [/된다\./gu, "됩니다."],
  [/됐다\./gu, "되었습니다."],
  [/바꾼다\./gu, "바꿉니다."],
  [/만든다\./gu, "만듭니다."],
  [/좁힌다\./gu, "좁힙니다."],
  [/맞춘다\./gu, "맞춥니다."],
  [/남긴다\./gu, "남깁니다."],
  [/묶는다\./gu, "묶습니다."],
  [/잠근다\./gu, "잠급니다."],
  [/막는다\./gu, "막습니다."],
  [/얻는다\./gu, "얻습니다."],
  [/따른다\./gu, "따릅니다."],
  [/나눈다\./gu, "나눕니다."],
  [/따라붙는다\./gu, "따라붙습니다."],
  [/보인다\./gu, "보입니다."],
  [/쌓인다\./gu, "쌓입니다."],
  [/필요하다\./gu, "필요합니다."],
  [/연구다\./gu, "연구입니다."],
  [/기반이다\./gu, "기반입니다."],
  [/플랫폼이다\./gu, "플랫폼입니다."],
  [/시스템이다\./gu, "시스템입니다."],
  [/진단이다\./gu, "진단입니다."],
  [/일부다\./gu, "일부입니다."],
  [/원칙이다\./gu, "원칙입니다."],
  [/요구사항이다\./gu, "요구사항입니다."],
  [/때문이다\./gu, "때문입니다."],
  [/자격이 있는지 시험한다\./gu, "자격이 있는지 시험합니다."],
];

function polishText(value: string): string {
  if (!/[가-힣]/u.test(value)) return value;

  return replacements.reduce(
    (current, [pattern, replacement]) => current.replace(pattern, replacement),
    value,
  );
}

function isPlainObject(value: object): value is Record<string, unknown> {
  const prototype = Object.getPrototypeOf(value);
  return prototype === Object.prototype || prototype === null;
}

function polishValue(value: unknown): unknown {
  if (typeof value === "string") return polishText(value);
  if (Array.isArray(value)) return value.map(polishValue);
  if (isValidElement(value)) return polishElement(value);
  if (value && typeof value === "object" && isPlainObject(value)) {
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [key, polishValue(item)]),
    );
  }
  return value;
}

function polishElement(element: ReactElement): ReactElement {
  const props = element.props as Record<string, unknown>;
  const polishedProps = Object.fromEntries(
    Object.entries(props).map(([key, value]) => [
      key,
      key === "children"
        ? Children.map(value as ReactNode, polishNode)
        : polishValue(value),
    ]),
  );

  return cloneElement(
    element as ReactElement<Record<string, unknown>>,
    polishedProps,
  );
}

function polishNode(node: ReactNode): ReactNode {
  if (typeof node === "string") return polishText(node);
  if (isValidElement(node)) return polishElement(node);
  return node;
}

export function KoreanHonorificCopy({ children }: { children: ReactNode }) {
  return <>{Children.map(children, polishNode)}</>;
}
