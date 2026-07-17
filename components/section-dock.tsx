"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export type SectionDockItem = {
  id: string;
  label: string;
};

export function SectionDock({ items }: { items: readonly SectionDockItem[] }) {
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sections = items
      .map((item) => document.getElementById(item.id))
      .filter((section): section is HTMLElement => Boolean(section));

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        const next = visible[0]?.target.id;
        if (next) setActiveId(next);
      },
      {
        rootMargin: "-18% 0px -68% 0px",
        threshold: [0, 0.05, 0.2, 0.5],
      },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [items]);

  useEffect(() => {
    function handlePointerDown(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  function supportsHover() {
    return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  }

  return (
    <div
      ref={rootRef}
      className={`section-dock ${open ? "section-dock--open" : ""}`}
      onMouseEnter={() => {
        if (supportsHover()) setOpen(true);
      }}
      onMouseLeave={() => {
        if (supportsHover()) setOpen(false);
      }}
    >
      <button
        type="button"
        className="section-dock__trigger"
        aria-label="Open page sections"
        aria-expanded={open}
        aria-controls="btc-page-sections"
        onClick={() => setOpen((current) => !current)}
      >
        <span aria-hidden="true" className="section-dock__icon">
          <i />
          <i />
          <i />
        </span>
        <span className="section-dock__trigger-label">Sections</span>
      </button>

      <nav
        id="btc-page-sections"
        aria-label="BTC research page sections"
        className="section-dock__panel"
      >
        <p className="section-dock__eyebrow">Quick navigation</p>
        <ol className="section-dock__list">
          {items.map((item, index) => {
            const active = activeId === item.id;
            return (
              <li key={item.id}>
                <Link
                  href={`#${item.id}`}
                  aria-current={active ? "location" : undefined}
                  className={`section-dock__link ${active ? "section-dock__link--active" : ""}`}
                  onClick={() => setOpen(false)}
                >
                  <span className="section-dock__index">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ol>
      </nav>
    </div>
  );
}
