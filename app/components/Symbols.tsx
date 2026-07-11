export default function Symbols() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
      <symbol id="ytmark" viewBox="0 0 200 200">
        <path
          fill="currentColor"
          d="M110,58 C136,50 158,54 176,68 C171,72 166,74 160,74 C140,68 120,72 104,82 C104,74 106,64 110,58 Z"
        />
        <path
          fill="currentColor"
          d="M90,58 C64,50 42,54 24,68 C29,72 34,74 40,74 C60,68 80,72 96,82 C96,74 94,64 90,58 Z"
        />
        <path fill="currentColor" d="M100,46 L106,60 L94,60 Z" />
        <path
          fill="currentColor"
          d="M90,60 L95,128 Q95,131 98,131 L102,131 Q105,131 105,128 L110,60 Z"
        />
        <path
          fill="currentColor"
          d="M34,101 Q60,85 86,101 Q60,117 34,101 Z"
          transform="rotate(-6 60 101)"
        />
        <path
          fill="currentColor"
          d="M114,101 Q140,85 166,101 Q140,117 114,101 Z"
          transform="rotate(6 140 101)"
        />
        <rect fill="currentColor" x="72" y="139" width="56" height="16" rx="8" />
      </symbol>

      <symbol id="eye" viewBox="0 0 100 60">
        <path fill="currentColor" d="M6,30 Q50,4 94,30 Q50,56 6,30 Z" />
      </symbol>

      <symbol id="play" viewBox="0 0 24 24">
        <path fill="currentColor" d="M8 5.14v13.72L19.27 12 8 5.14z" />
      </symbol>

      <pattern id="maskpat" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
        <use href="#eye" x="10" y="18" width="44" height="26" style={{ color: 'var(--ivoire)' }} />
        <use href="#eye" x="66" y="18" width="44" height="26" style={{ color: 'var(--ocre)' }} />
        <use href="#eye" x="38" y="72" width="44" height="26" style={{ color: 'var(--ocre)' }} />
        <use href="#eye" x="-16" y="72" width="44" height="26" style={{ color: 'var(--ivoire)' }} />
        <use href="#eye" x="94" y="72" width="44" height="26" style={{ color: 'var(--ivoire)' }} />
      </pattern>
    </svg>
  );
}
