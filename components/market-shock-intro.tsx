"use client";

import { useCallback, useState } from "react";

import { MarketShockTerminal } from "./market-shock-terminal";
import styles from "./market-shock-intro.module.css";

export function MarketShockIntro() {
  const [crashing, setCrashing] = useState(false);
  const [crashed, setCrashed] = useState(false);
  const handleCrashStart = useCallback(() => setCrashing(true), []);
  const handleCrashComplete = useCallback(() => setCrashed(true), []);

  return (
    <section
      className={`${styles.hero} ${crashing ? styles.isCrashing : ""} ${crashed ? styles.isCrashed : ""}`}
      aria-labelledby="market-shock-title"
    >
      <div className={styles.noise} aria-hidden="true" />
      <div className={styles.inner}>
        <div className={styles.topline}>
          <span className={styles.liveDot}>Systematic trading research</span>
          <span>Assume the regime can break</span>
        </div>

        <div className={styles.stage}>
          <MarketShockTerminal
            onCrashStart={handleCrashStart}
            onCrashComplete={handleCrashComplete}
          />

          <p className={styles.prelude}>Orderly markets are temporary</p>

          <div className={styles.copy}>
            <p className={styles.kicker}>Market reality, first principle</p>
            <h1 id="market-shock-title" className={styles.headline}>
              SHIT ALWAYS HAPPENS
              <span>IN THE MARKET.</span>
            </h1>
            <p className={styles.subhead}>So build systems that assume it will.</p>
          </div>
        </div>

        <a className={styles.scrollCue} href="#research-intro">
          See what comes after the drop
          <span className={styles.arrow} aria-hidden="true">↓</span>
        </a>
      </div>
    </section>
  );
}
