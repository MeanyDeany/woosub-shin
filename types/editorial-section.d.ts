import type { ReactNode } from "react";

declare module "@/components/editorial" {
  export function EditorialSection(props: {
    accent?: "amber" | "blue" | "cyan" | "emerald" | "violet";
    children?: ReactNode;
    className?: string;
    eyebrow?: string;
    id?: string;
    intro?: string;
    title?: string;
    tone?: "base" | "deep" | "elevated" | "warm";
  }): ReactNode;
}
