/**
 * Icon art for the catalogue.
 *
 * Drawn rather than imported: the page has to survive with no external assets,
 * and a gradient tile with one clear motif reads better at 56px than a photo
 * scaled down to it. Each tile carries its own inset highlight so it catches
 * light like the rest of the surface.
 */

const TILE =
  "relative h-full w-full overflow-hidden shadow-[inset_0_1px_0_rgba(255,255,255,0.28)]";

export function OdysseyIcon() {
  return (
    <div className={`${TILE} bg-[linear-gradient(150deg,#3C1E8C_0%,#6D3BD6_45%,#C05CE8_100%)]`}>
      <svg viewBox="0 0 64 64" className="absolute inset-0 h-full w-full" aria-hidden>
        <circle cx="28" cy="30" r="13" fill="#FFD9A0" opacity="0.95" />
        <circle cx="23" cy="26" r="3.2" fill="#E8A765" opacity="0.7" />
        <circle cx="33" cy="35" r="2.2" fill="#E8A765" opacity="0.6" />
        <ellipse
          cx="28"
          cy="31"
          rx="23"
          ry="7"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="2.4"
          opacity="0.85"
          transform="rotate(-22 28 31)"
        />
        <circle cx="50" cy="14" r="1.6" fill="#fff" opacity="0.9" />
        <circle cx="12" cy="49" r="1.2" fill="#fff" opacity="0.7" />
        <circle cx="54" cy="44" r="1" fill="#fff" opacity="0.6" />
      </svg>
    </div>
  );
}

export function RabbitIcon() {
  return (
    <div className={`${TILE} bg-[linear-gradient(160deg,#254D2A_0%,#4C8B43_55%,#8FBF63_100%)]`}>
      <svg viewBox="0 0 64 64" className="absolute inset-0 h-full w-full" aria-hidden>
        <ellipse cx="32" cy="45" rx="15" ry="12" fill="#F2EADF" />
        <circle cx="32" cy="29" r="10" fill="#F7F1E8" />
        <ellipse cx="26" cy="15" rx="3.6" ry="9" fill="#F7F1E8" transform="rotate(-12 26 15)" />
        <ellipse cx="38" cy="15" rx="3.6" ry="9" fill="#F7F1E8" transform="rotate(12 38 15)" />
        <ellipse cx="26" cy="15" rx="1.6" ry="5.5" fill="#E0A9AE" transform="rotate(-12 26 15)" />
        <ellipse cx="38" cy="15" rx="1.6" ry="5.5" fill="#E0A9AE" transform="rotate(12 38 15)" />
        <circle cx="28" cy="28" r="1.9" fill="#2B2320" />
        <circle cx="36" cy="28" r="1.9" fill="#2B2320" />
        <path d="M30.5 33h3l-1.5 2z" fill="#D98A92" />
      </svg>
    </div>
  );
}

export function GhostIcon() {
  return (
    <div className={`${TILE} bg-[linear-gradient(160deg,#0D1330_0%,#1B2450_60%,#2C1E55_100%)]`}>
      <svg viewBox="0 0 64 64" className="absolute inset-0 h-full w-full" aria-hidden>
        {[
          { x: 17, f: "#5FD0E8", d: 0 },
          { x: 32, f: "#FFD84D", d: -4 },
          { x: 47, f: "#FF7BA8", d: 2 },
        ].map((g) => (
          <g key={g.x} transform={`translate(${g.x} ${34 + g.d})`}>
            <path
              d="M-9 6a9 9 0 0 1 18 0v11l-3.6-3-3.6 3-3.6-3-3.6 3-3.6-3z"
              fill={g.f}
              opacity="0.95"
            />
            <circle cx="-3.2" cy="2" r="1.7" fill="#14142A" />
            <circle cx="3.2" cy="2" r="1.7" fill="#14142A" />
          </g>
        ))}
        <circle cx="10" cy="12" r="1.2" fill="#fff" opacity="0.7" />
        <circle cx="54" cy="52" r="1" fill="#fff" opacity="0.5" />
      </svg>
    </div>
  );
}

export function PirateIcon() {
  return (
    <div className={`${TILE} bg-[linear-gradient(160deg,#1E3A24_0%,#3F6B33_50%,#C9A227_100%)]`}>
      <svg viewBox="0 0 64 64" className="absolute inset-0 h-full w-full" aria-hidden>
        <path d="M6 58c6-10 14-14 26-14s20 4 26 14z" fill="#22451F" opacity="0.65" />
        <circle cx="32" cy="28" r="13" fill="#F4EDE0" />
        <path d="M17 22a15 15 0 0 1 30 0z" fill="#1B1B1B" />
        <rect x="14" y="20" width="36" height="4" rx="2" fill="#1B1B1B" />
        <circle cx="27" cy="29" r="2.4" fill="#2B2320" />
        <path d="M33 26.5h7v5h-7z" fill="#2B2320" opacity="0.9" />
        <path d="M26 37c3 2.2 9 2.2 12 0" stroke="#2B2320" strokeWidth="2" fill="none" strokeLinecap="round" />
        <circle cx="48" cy="46" r="4" fill="#E8C54B" />
        <circle cx="42" cy="52" r="3" fill="#E8C54B" opacity="0.85" />
      </svg>
    </div>
  );
}

export function MountainIcon() {
  return (
    <div className={`${TILE} bg-[linear-gradient(170deg,#CFE4F2_0%,#9BC2DC_55%,#6E9BBC_100%)]`}>
      <svg viewBox="0 0 64 64" className="absolute inset-0 h-full w-full" aria-hidden>
        <circle cx="46" cy="16" r="7" fill="#FFF6DC" opacity="0.9" />
        <path d="M0 52l16-22 11 14 8-11 13 19z" fill="#5E7F9B" />
        <path d="M16 30l5.5 7.5H10.5z" fill="#F4FAFF" />
        <path d="M35 33l4.5 6.5h-9z" fill="#F4FAFF" />
        <path d="M0 52h64v12H0z" fill="#46627C" />
        <circle cx="30" cy="45" r="2.6" fill="#2F3A44" />
        <rect x="28.6" y="47" width="2.8" height="6" rx="1.4" fill="#2F3A44" />
      </svg>
    </div>
  );
}
