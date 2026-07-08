// Marcas SVG simplificadas de modelos de IA populares, en currentColor
// para poder teñirlas. Se usan como holográmas semitransparentes en el
// fondo de la sección de IA — formas limpias y reconocibles, no logos
// oficiales exactos.

type MarkProps = { className?: string; style?: React.CSSProperties };

// Gemini — destello de cuatro puntas
export function GeminiMark({ className, style }: MarkProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={style} fill="currentColor" aria-hidden>
      <path d="M12 1.5c.6 5.4 5.1 9.9 10.5 10.5C17.1 12.6 12.6 17.1 12 22.5 11.4 17.1 6.9 12.6 1.5 12 6.9 11.4 11.4 6.9 12 1.5Z" />
    </svg>
  );
}

// Claude / Anthropic — destello radial de múltiples puntas
export function ClaudeMark({ className, style }: MarkProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={style} fill="currentColor" aria-hidden>
      {[0, 30, 60, 90, 120, 150].map((a) => (
        <rect
          key={a}
          x="11.1"
          y="1.5"
          width="1.8"
          height="21"
          rx="0.9"
          transform={`rotate(${a} 12 12)`}
        />
      ))}
    </svg>
  );
}

// OpenAI / Codex — flor de seis pétalos
export function OpenAIMark({ className, style }: MarkProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={style} fill="currentColor" aria-hidden>
      {[0, 60, 120, 180, 240, 300].map((a) => (
        <ellipse
          key={a}
          cx="12"
          cy="7"
          rx="2.6"
          ry="5.5"
          transform={`rotate(${a} 12 12)`}
        />
      ))}
    </svg>
  );
}

// DeepSeek — silueta de ballena estilizada
export function DeepSeekMark({ className, style }: MarkProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={style} fill="currentColor" aria-hidden>
      <path d="M2 12.5c2.6-2.7 6.4-3.8 9.6-2.7 1.1-1.6 3-2.5 5-2.3-.7.8-1 1.9-.8 2.9 1-.6 2.2-.7 3.2-.3-1.4.7-2 2.3-1.6 3.7.3 1.1-.1 2.3-1 3-2.3 1.9-5.4 2.6-8.3 2C6.5 18 4 15.8 2.9 13c-.1-.2-.5-.3-.9-.5Z" />
      <circle cx="15.5" cy="11" r="0.9" fill="#0E0F10" />
    </svg>
  );
}

// Mistral — mosaico de barras
export function MistralMark({ className, style }: MarkProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={style} fill="currentColor" aria-hidden>
      <rect x="2" y="4" width="4" height="4" />
      <rect x="9" y="4" width="4" height="4" />
      <rect x="18" y="4" width="4" height="4" />
      <rect x="2" y="10" width="4" height="4" />
      <rect x="9" y="10" width="4" height="4" />
      <rect x="14" y="10" width="4" height="4" />
      <rect x="18" y="10" width="4" height="4" />
      <rect x="2" y="16" width="4" height="4" />
      <rect x="18" y="16" width="4" height="4" />
    </svg>
  );
}
