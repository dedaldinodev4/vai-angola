/**
 * Ilustrações de demonstração (SVG plano) que ocupam o lugar das fotografias.
 * Substituir por imagens reais (next/image) quando existirem direitos e ficheiros.
 */

import type { DemoTone, DemoScene } from "@/types";

const SKY: Record<DemoTone, string> = {
  0: "fill-sand",
  1: "fill-terracotta/30",
  2: "fill-olive/30",
};

function Scene({ scene, sky }: { scene: DemoScene; sky: string }) {
  switch (scene) {
    case "falls":
      return (
        <>
          <rect width="800" height="600" className={sky} />
          <path d="M0 330 L120 280 L260 320 L420 260 L600 310 L800 270 V600 H0Z" className="fill-olive" />
          <path d="M0 600 V250 L150 230 L260 300 L330 340 V600Z" className="fill-ink" />
          <path d="M800 600 V240 L650 250 L540 310 L470 350 V600Z" className="fill-ink" />
          <path d="M330 340 L470 350 L480 520 L320 520Z" className="fill-white" />
          {[350, 385, 420, 450].map((x) => (
            <rect key={x} x={x} y="350" width="3" height="170" className="fill-sand/60" />
          ))}
          <rect x="300" y="520" width="200" height="80" className="fill-olive-deep" />
          <ellipse cx="400" cy="522" rx="120" ry="26" className="fill-white/50" />
        </>
      );
    case "cliffs":
      return (
        <>
          <rect width="800" height="600" className={sky} />
          <circle cx="600" cy="170" r="56" className="fill-terracotta" />
          <path d="M0 330 L140 290 L300 340 L460 280 L640 350 L800 300 V600 H0Z" className="fill-olive/60" />
          <path d="M0 420 L180 370 L340 440 L540 380 L800 450 V600 H0Z" className="fill-olive" />
          <path d="M0 520 L220 480 L420 540 L640 490 L800 530 V600 H0Z" className="fill-ink" />
        </>
      );
    case "moon":
      return (
        <>
          <rect width="800" height="600" className={sky} />
          <circle cx="180" cy="150" r="40" className="fill-white/70" />
          <path d="M0 360 L90 300 L130 340 L230 270 L300 330 L420 280 L520 350 L640 290 L800 360 V600 H0Z" className="fill-terracotta" />
          <path d="M0 440 L120 390 L200 430 L330 370 L430 440 L560 400 L680 450 L800 410 V600 H0Z" className="fill-terracotta-deep" />
          <path d="M0 520 L800 500 V600 H0Z" className="fill-ink" />
        </>
      );
    case "coast":
      return (
        <>
          <rect width="800" height="600" className={sky} />
          <circle cx="560" cy="190" r="70" className="fill-terracotta" />
          <rect y="330" width="800" height="130" className="fill-olive-deep" />
          {[360, 390, 420].map((y) => (
            <rect key={y} x="80" y={y} width="640" height="3" className="fill-white/35" />
          ))}
          <path d="M0 470 Q260 440 520 465 T800 450 V600 H0Z" className="fill-paper" />
          <path d="M0 540 Q300 510 800 545 V600 H0Z" className="fill-sand" />
        </>
      );
    case "fort":
      return (
        <>
          <rect width="800" height="600" className={sky} />
          <rect y="380" width="800" height="90" className="fill-olive-deep" />
          <rect y="470" width="800" height="130" className="fill-sand" />
          <rect x="140" y="300" width="520" height="170" className="fill-ink" />
          {Array.from({ length: 10 }, (_, i) => (
            <rect key={i} x={140 + i * 52} y="280" width="32" height="20" className="fill-ink" />
          ))}
          <rect x="330" y="200" width="140" height="100" className="fill-ink" />
          <path d="M380 470 V410 A20 20 0 0 1 420 410 V470Z" className="fill-terracotta" />
          <rect x="398" y="150" width="4" height="50" className="fill-ink" />
          <path d="M402 150 L450 165 L402 180Z" className="fill-terracotta" />
        </>
      );
    case "rocks":
      return (
        <>
          <rect width="800" height="600" className={sky} />
          <circle cx="640" cy="150" r="44" className="fill-terracotta" />
          <path d="M0 430 L800 410 V600 H0Z" className="fill-sand" />
          <path d="M120 450 C130 330 260 300 330 360 C380 400 400 430 410 455Z" className="fill-ink" />
          <path d="M330 455 C350 280 520 250 600 340 C650 390 660 430 670 460Z" className="fill-olive-deep" />
          <path d="M560 465 C580 400 680 380 740 420 L760 465Z" className="fill-ink" />
        </>
      );
  }
}

type DemoArtProps = {
  scene: DemoScene;
  tone?: DemoTone;
  label: string;
  className?: string;
};

export function DemoArt({ scene, tone = 0, label, className = "" }: DemoArtProps) {
  return (
    <svg
      viewBox="0 0 800 600"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label={`${label} (ilustração de demonstração)`}
      className={`block ${className}`}
    >
      <Scene scene={scene} sky={SKY[tone]} />
    </svg>
  );
}
