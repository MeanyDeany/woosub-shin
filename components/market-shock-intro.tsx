import styles from "./market-shock-intro.module.css";

export function MarketShockIntro() {
  return (
    <section className={styles.hero} aria-labelledby="market-shock-title">
      <div className={styles.noise} aria-hidden="true" />
      <div className={styles.inner}>
        <div className={styles.topline}>
          <span className={styles.liveDot}>Systematic trading research</span>
          <span>Assume the regime can break</span>
        </div>

        <div className={styles.stage}>
          <svg
            className={styles.chart}
            style={{ animationDuration: "414ms", animationDelay: "2.38s" }}
            viewBox="0 0 1200 520"
            preserveAspectRatio="xMidYMid meet"
            aria-hidden="true"
            focusable="false"
          >
            <defs>
              <linearGradient id="marketStroke" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#3979ff" stopOpacity="0.45" />
                <stop offset="42%" stopColor="#58d9ff" stopOpacity="0.92" />
                <stop offset="100%" stopColor="#a8ecff" stopOpacity="1" />
              </linearGradient>
            </defs>
            <line className={styles.baseline} x1="24" y1="400" x2="1170" y2="400" />
            <line className={styles.baseline} x1="24" y1="270" x2="1170" y2="270" />
            <line className={styles.baseline} x1="24" y1="140" x2="1170" y2="140" />
            <path
              className={styles.marketPath}
              style={{ animationDuration: "1.9s", animationDelay: "300ms" }}
              pathLength="1"
              d="M 22 336 C 74 318, 108 343, 154 305 C 198 269, 242 291, 286 252 C 330 214, 370 251, 414 226 C 460 198, 495 223, 538 181 C 581 140, 623 171, 668 151 C 712 130, 748 164, 786 128 C 826 92, 861 122, 894 110 C 918 101, 937 116, 952 96"
            />
            <path
              className={styles.crashGlow}
              style={{ animationDuration: "483ms", animationDelay: "2.2s" }}
              pathLength="1"
              d="M 952 96 C 967 90, 976 98, 983 111 C 988 124, 988 159, 992 202 C 997 258, 1001 315, 1006 365 C 1010 408, 1018 450, 1036 478"
            />
            <path
              className={styles.crashPath}
              style={{ animationDuration: "483ms", animationDelay: "2.2s" }}
              pathLength="1"
              d="M 952 96 C 967 90, 976 98, 983 111 C 988 124, 988 159, 992 202 C 997 258, 1001 315, 1006 365 C 1010 408, 1018 450, 1036 478"
            />
            <circle
              className={styles.crashPoint}
              style={{ animationDuration: "897ms", animationDelay: "2.51s" }}
              cx="1036"
              cy="478"
              r="7"
            />
          </svg>

          <p
            className={styles.prelude}
            style={{ animationDuration: "299ms", animationDelay: "2.21s" }}
          >
            Orderly markets are temporary
          </p>

          <div
            className={styles.copy}
            style={{ animationDuration: "713ms", animationDelay: "2.51s" }}
          >
            <p className={styles.kicker}>Market reality, first principle</p>
            <h1 id="market-shock-title" className={styles.headline}>
              SHIT ALWAYS HAPPENS
              <span>IN THE MARKET.</span>
            </h1>
            <p className={styles.subhead}>So build systems that assume it will.</p>
          </div>
        </div>

        <a
          className={styles.scrollCue}
          style={{ animationDuration: "575ms", animationDelay: "3.13s" }}
          href="#research-intro"
        >
          See what comes after the drop
          <span className={styles.arrow} aria-hidden="true">↓</span>
        </a>
      </div>
    </section>
  );
}
