// Punto de color con un halo que palpita de forma suave y continua.
// Sustituye a animate-ping (que cortaba el ciclo de golpe y hacía
// parpadear los puntos). `delay` desfasa el pulso para que cada punto
// palpite en su propio ritmo.
export default function PulseDot({
  color,
  pulse = true,
  delay = 0,
  className = "h-2 w-2",
}: {
  color: string;
  pulse?: boolean;
  delay?: number;
  className?: string;
}) {
  return (
    <span className={`relative flex shrink-0 ${className}`}>
      {pulse && (
        <span
          className={`absolute inset-0 rounded-full ${color} animate-pulse-ring motion-reduce:animate-none`}
          style={{ animationDelay: `${delay}s` }}
          aria-hidden
        />
      )}
      <span className={`relative inline-flex h-full w-full rounded-full ${color}`} />
    </span>
  );
}
