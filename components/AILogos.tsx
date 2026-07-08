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

// DeepSeek — silueta de ballena estilizada, más clara y compacta
export function DeepSeekMark({ className, style }: MarkProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={style} fill="currentColor" aria-hidden>
      <path d="M20.5 5.2c-.4 1.8-1.6 3-3.3 3.7-1.6.6-3.2.5-4.8.7-2.6.3-4.6 1.5-5.7 4-.2.5-.4.7-1 .7-1.6-.1-2.8.6-3.5 2 .2-1.7 1.2-2.7 2.8-3.1.5-.1.7-.3.8-.8.5-2.9 2.4-4.6 5.2-5.2 1.3-.3 2.6-.3 3.9-.6 1.9-.4 3.4-1.4 4.4-3.2.1-.2.2-.4.5-.4.3.6.4 1.4.4 2.4Z" />
      <path d="M6.5 15.8c2.2 1.5 4.6 2 7.2 1.6 2.4-.4 4.3-1.6 5.4-3.9.1-.2.2-.5.6-.5.3 1.7-.6 3.6-2.4 4.7-2.6 1.6-6.6 1.4-9.1-.4-.8-.6-1.4-1.3-1.7-1.1Z" />
      <circle cx="16.2" cy="6.4" r="1" />
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
