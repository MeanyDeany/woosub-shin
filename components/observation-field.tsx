// Static, decorative geometry: no measured data, browser state or animation.
const stars = [
  [42, 96, .8], [91, 421, 1], [167, 35, .7], [244, 512, .8],
  [347, 68, .7], [422, 459, 1], [519, 26, .8], [572, 538, .7],
  [641, 103, 1], [682, 384, .8], [714, 49, .7], [759, 476, 1.1],
  [806, 150, .8], [838, 31, 1], [868, 428, .7], [899, 511, .9],
  [930, 82, .7], [959, 367, 1], [988, 553, .7], [1031, 122, .9],
  [1075, 41, .8], [1089, 447, 1], [1118, 282, .7], [1148, 504, .8],
  [1181, 169, 1.1], [1173, 389, .7],
] as const;

export function ObservationField({ variant = "hero" }: { variant?: "hero" | "sequence" }) {
  return <div className={`observation-field observation-field--${variant}`} aria-hidden="true">
    <svg viewBox="0 0 1200 580" preserveAspectRatio="xMidYMid slice" focusable="false">
      <g className="observation-stars" fill="currentColor">
        {stars.map(([x, y, radius]) => <circle key={`${x}-${y}`} cx={x} cy={y} r={radius} />)}
      </g>
      <g className="observation-rules" fill="none" stroke="currentColor" strokeWidth=".7">
        <path d="M692 0V580M1016 0V580M600 94H1200M600 418H1200" />
        <path d="M684 94h16m-8-8v16m316 316h16m-8-8v16M846 256h16m-8-8v16" />
        <circle cx="854" cy="256" r="162" />
        <circle cx="854" cy="256" r="212" strokeDasharray="1 13" />
        <path d="M698 82a234 234 0 0 1 372 268M677 472a280 280 0 0 1-97-266" />
        <ellipse cx="854" cy="256" rx="265" ry="72" transform="rotate(-32 854 256)" />
      </g>
      <g className="observation-datums" fill="none" stroke="currentColor" strokeWidth="1">
        <path d="M1006 94h20m-10-10v20M682 418h20m-10-10v20" />
        <circle cx="994" cy="175" r="4" /><circle cx="714" cy="337" r="3" />
        <path d="M954 68h11m-5.5-5.5v11M1112 361h8m-4-4v8" />
      </g>
    </svg>
  </div>;
}
