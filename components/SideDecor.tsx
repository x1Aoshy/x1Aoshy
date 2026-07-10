// Iconos tech/IA flotando en los márgenes laterales del marco central.
// Solo se ven en pantallas anchas (donde hay gutter libre a los lados),
// son decorativos (pointer-events-none) y flotan suavemente para darle
// vida a la página sin robar protagonismo al contenido.

type IconProps = { className?: string; style?: React.CSSProperties };

function Terminal({ className, style }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className} style={style} aria-hidden>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M7 9l3 3-3 3" />
      <path d="M13 15h4" />
    </svg>
  );
}

function Braces({ className, style }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className} style={style} aria-hidden>
      <path d="M8 3c-1.7 0-2.5 1-2.5 3v2c0 1.4-.6 2-2 2 1.4 0 2 .6 2 2v2c0 2 .8 3 2.5 3" />
      <path d="M16 3c1.7 0 2.5 1 2.5 3v2c0 1.4.6 2 2 2-1.4 0-2 .6-2 2v2c0 2-.8 3-2.5 3" />
    </svg>
  );
}

function Cloud({ className, style }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className} style={style} aria-hidden>
      <path d="M7 18a4 4 0 01-.5-7.97 5 5 0 019.7-1.4A3.5 3.5 0 0117.5 18H7z" />
    </svg>
  );
}

function Spark({ className, style }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} style={style} aria-hidden>
      <path d="M12 2c.5 4.4 4.1 8 8.5 8.5C16.1 11 12.5 14.6 12 19c-.5-4.4-4.1-8-8.5-8.5C7.9 10 11.5 6.4 12 2Z" />
    </svg>
  );
}

function GitBranch({ className, style }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className} style={style} aria-hidden>
      <circle cx="6" cy="5" r="2.2" />
      <circle cx="6" cy="19" r="2.2" />
      <circle cx="18" cy="7" r="2.2" />
      <path d="M6 7.2v9.6" />
      <path d="M18 9.2c0 4-4 3.3-6 5.8" />
    </svg>
  );
}

function Cube({ className, style }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className} style={style} aria-hidden>
      <path d="M12 2.5l8 4.5v9l-8 4.5-8-4.5v-9l8-4.5z" />
      <path d="M12 12l8-4.5M12 12v9.5M12 12L4 7.5" />
    </svg>
  );
}

function Network({ className, style }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className} style={style} aria-hidden>
      <circle cx="12" cy="4" r="2" />
      <circle cx="5" cy="19" r="2" />
      <circle cx="19" cy="19" r="2" />
      <path d="M12 6v4m0 0l-5.5 7m5.5-7l5.5 7" />
    </svg>
  );
}

function Infinity({ className, style }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className} style={style} aria-hidden>
      <path d="M7 8a4 4 0 000 8c3 0 4-8 10-8a4 4 0 010 8c-6 0-7-8-10-8z" />
    </svg>
  );
}

type Deco = {
  Icon: (p: IconProps) => React.JSX.Element;
  cls: string;
  delay: string;
};

const left: Deco[] = [
  { Icon: Terminal, cls: "left-8 top-[16%] h-9 w-9 text-blurple-light", delay: "0s" },
  { Icon: Braces, cls: "left-14 top-[34%] h-7 w-7 text-ink-400", delay: "1.4s" },
  { Icon: Spark, cls: "left-6 top-[52%] h-6 w-6 text-grape", delay: "0.7s" },
  { Icon: GitBranch, cls: "left-16 top-[68%] h-8 w-8 text-ink-400", delay: "2.1s" },
  { Icon: Cloud, cls: "left-9 top-[85%] h-9 w-9 text-blurple", delay: "1.1s" },
];

const right: Deco[] = [
  { Icon: Spark, cls: "right-10 top-[13%] h-7 w-7 text-blurple-light", delay: "0.5s" },
  { Icon: Cube, cls: "right-7 top-[30%] h-9 w-9 text-ink-400", delay: "1.8s" },
  { Icon: Network, cls: "right-14 top-[48%] h-8 w-8 text-grape", delay: "0.2s" },
  { Icon: Infinity, cls: "right-8 top-[66%] h-9 w-9 text-ink-400", delay: "2.4s" },
  { Icon: Braces, cls: "right-12 top-[83%] h-7 w-7 text-blurple", delay: "1.0s" },
];

export default function SideDecor() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 hidden overflow-hidden [@media(min-width:1400px)]:block"
      aria-hidden
    >
      {[...left, ...right].map(({ Icon, cls, delay }, i) => (
        <Icon
          key={i}
          style={{ animationDelay: delay }}
          className={`pointer-events-auto absolute animate-float-slow opacity-[0.18] transition-[opacity,filter,transform] duration-500 hover:scale-110 hover:opacity-70 hover:[filter:drop-shadow(0_0_10px_currentColor)] motion-reduce:animate-none ${cls}`}
        />
      ))}
    </div>
  );
}
