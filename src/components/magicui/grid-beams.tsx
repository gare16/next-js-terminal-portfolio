"use client";

import { motion } from "motion/react";
import React, { HTMLAttributes, memo, useMemo, useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const createGridMask = (start: number, end: number): string => {
  const mid = (start + end) / 2;
  return `linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.05) ${start}%, rgba(0,0,0,0.2) ${mid}%, rgba(0,0,0,0.6) ${
    end - 20
  }%, rgba(0,0,0,1) ${end}%)`;
};

const generateRayConfig = (index: number, total: number) => {
  const progress = index / Math.max(total - 1, 1);
  const leftPercent = 2 + progress * 96;
  const rotation = 28 - progress * 56;
  const variation = (index * 0.618) % 1;

  return {
    left: `${leftPercent}%`,
    rotation,
    width: 40 + variation * 25,
    duration: 6 + variation * 5,
    delay: -variation * 10,
    swayDuration: 12 + variation * 9,
    swayDelay: -variation * 10,
    blur: 24 + variation * 9,
    strongSway: index % 2 === 0,
  };
};

interface GridBeamsProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  gridSize?: number;
  gridColor?: string;
  rayCount?: number;
  rayOpacity?: number;
  raySpeed?: number;
  rayLength?: string;
  gridFadeStart?: number;
  gridFadeEnd?: number;
  backgroundColor?: string;
}

interface LightRayProps {
  left: string;
  rotation: number;
  width: number;
  delay: number;
  duration: number;
  swayDuration: number;
  swayDelay: number;
  blurAmount: number;
  isStrongerSway: boolean;
  opacity: number;
  speed: number;
  length: string;
}

const LightRay = memo<LightRayProps>(
  ({
    left,
    rotation,
    width,
    delay,
    duration,
    swayDuration,
    swayDelay,
    blurAmount,
    isStrongerSway,
    opacity,
    speed,
    length,
  }) => {
    return (
      <motion.div
        className="absolute pointer-events-none -top-[5%] origin-top mix-blend-screen"
        style={{
          left,
          width: `${width}px`,
          height: length,
          opacity,
          filter: `blur(${blurAmount}px)`,
          background: `linear-gradient(to bottom, rgba(200,220,255,${opacity}), rgba(200,220,255,0))`,
          transform: `translateX(-50%) rotate(${rotation}deg)`,
          willChange: 'transform, opacity',
        }}
        animate={{
          opacity: [0.3, 0.7, 0.3],
          transform: [
            `translateX(-50%) rotate(${rotation}deg)`,
            `translateX(-50%) rotate(${
              rotation + (isStrongerSway ? 1 : 0.5)
            }deg)`,
            `translateX(-50%) rotate(${rotation}deg)`,
          ],
        }}
        transition={{
          opacity: {
            duration: duration / speed,
            delay: delay / speed,
            repeat: Infinity,
            ease: "easeInOut",
          },
          transform: {
            duration: swayDuration / speed,
            delay: swayDelay / speed,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
      />
    );
  }
);

LightRay.displayName = "LightRay";

export const GridBeams: React.FC<GridBeamsProps> = ({
  children,
  className,
  gridSize = 40,
  gridColor = "rgba(200, 220, 255, 0.2)",
  rayCount = 5, // Reduced from 15 to improve performance
  rayOpacity = 0.35,
  raySpeed = 1,
  rayLength = "45vh",
  gridFadeStart = 30,
  gridFadeEnd = 90,
  backgroundColor = "#020412",
  ...props
}) => {
  // Memoize ray configs to prevent unnecessary recalculations
  const rayConfigs = useMemo(() => {
    return Array.from({ length: rayCount }, (_, i) =>
      generateRayConfig(i, rayCount)
    );
  }, [rayCount]);

  // Memoize grid mask to prevent recalculation
  const gridMask = useMemo(
    () => createGridMask(gridFadeStart, gridFadeEnd),
    [gridFadeStart, gridFadeEnd]
  );

  const gridBeamsRef = useRef<HTMLDivElement>(null);

  // Optimize by reducing ray count during theme transitions
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [currentRayConfigs, setCurrentRayConfigs] = useState(rayConfigs);

  useEffect(() => {
    const handleThemeChangeStart = () => setIsTransitioning(true);
    const handleThemeChangeEnd = () => setIsTransitioning(false);

    // Listen for theme change events
    document.addEventListener('themeChangeStart', handleThemeChangeStart);
    document.addEventListener('themeChangeEnd', handleThemeChangeEnd);

    return () => {
      document.removeEventListener('themeChangeStart', handleThemeChangeStart);
      document.removeEventListener('themeChangeEnd', handleThemeChangeEnd);
    };
  }, []);

  // Update ray configs when transitioning
  useEffect(() => {
    if (isTransitioning) {
      // Show only a few rays during transitions for better performance
      const reducedRayConfigs = rayConfigs.slice(0, Math.max(1, Math.floor(rayConfigs.length / 3)));
      setCurrentRayConfigs(reducedRayConfigs);
    } else {
      // Show all rays after transition
      setCurrentRayConfigs(rayConfigs);
    }
  }, [isTransitioning, rayConfigs]);

  return (
    <div
      ref={gridBeamsRef}
      className={cn(
        "relative overflow-hidden bg-[var(--bg-color)] bg-[radial-gradient(ellipse_at_50%_-20%,#1a2c5a,transparent_70%)]",
        className
      )}
      style={
        {
          "--bg-color": backgroundColor,
        } as React.CSSProperties
      }
      {...props}
    >
      <div
        className="absolute inset-0 pointer-events-none bg-[linear-gradient(var(--grid-color)_1px,transparent_1px),linear-gradient(90deg,var(--grid-color)_1px,transparent_1px)] bg-size-[var(--grid-size)_var(--grid-size)] [mask-image:var(--grid-mask)] [webkit-mask-image:var(--grid-mask)]"
        style={
          {
            "--grid-color": gridColor,
            "--grid-size": `${gridSize}px`,
            "--grid-mask": gridMask,
          } as React.CSSProperties
        }
      />
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {currentRayConfigs.map((config, index) => (
          <LightRay
            key={index}
            left={config.left}
            rotation={config.rotation}
            width={config.width}
            delay={config.delay}
            duration={config.duration}
            swayDuration={config.swayDuration}
            swayDelay={config.swayDelay}
            blurAmount={config.blur}
            isStrongerSway={config.strongSway}
            opacity={rayOpacity}
            speed={raySpeed}
            length={rayLength}
          />
        ))}
      </div>

      <div className="relative z-10">{children}</div>
    </div>
  );
};
