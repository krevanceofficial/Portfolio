"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import {
  SiBootstrap,
  SiCss,
  SiFigma,
  SiHtml5,
  SiJavascript,
  SiMysql,
  SiNestjs,
  SiNextdotjs,
  SiNodedotjs,
  SiPhp,
  SiReact,
  SiTailwindcss,
  SiTypeorm,
} from "react-icons/si";
import styles from "../../../styles/technologies.module.css";

// Idinagdag ang opisyal na dokumentasyon o website para sa bawat tool:
const LOGOS = [
  { name: "Reactjs", Icon: SiReact, url: "https://react.dev" },
  { name: "Nextjs", Icon: SiNextdotjs, url: "https://nextjs.org/docs" },
  { name: "Nestjs", Icon: SiNestjs, url: "https://docs.nestjs.com" },
  { name: "MySQL", Icon: SiMysql, url: "https://dev.mysql.com/doc" },
  { name: "Figma", Icon: SiFigma, url: "https://help.figma.com/hc/en-us" },
  { name: "JavaScript", Icon: SiJavascript, url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
  { name: "Nodejs", Icon: SiNodedotjs, url: "https://nodejs.org/docs" },
  { name: "HTML", Icon: SiHtml5, url: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
  { name: "CSS", Icon: SiCss, url: "https://developer.mozilla.org/en-US/docs/Web/CSS" },
  { name: "Bootstrap", Icon: SiBootstrap, url: "https://getbootstrap.com/docs" },
  { name: "Tailwind CSS", Icon: SiTailwindcss, url: "https://tailwindcss.com/docs" },
  { name: "Typeorm", Icon: SiTypeorm, url: "https://typeorm.io" },
  { name: "PHP", Icon: SiPhp, url: "https://www.php.net/docs.php" },
];

export default function Technologies() {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const marqueeRefAlt = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const tweenAltRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const marquee = marqueeRef.current;
    const marqueeAlt = marqueeRefAlt.current;
    if (!marquee || !marqueeAlt) return;

    const scrollWidth = marquee.scrollWidth / 2;
    const scrollWidthAlt = marqueeAlt.scrollWidth / 2;

    tweenRef.current = gsap.to(marquee, {
      x: -scrollWidth,
      duration: 28,
      ease: "none",
      repeat: -1,
    });

    tweenAltRef.current = gsap.fromTo(
      marqueeAlt,
      { x: -scrollWidthAlt },
      {
        x: 0,
        duration: 32,
        ease: "none",
        repeat: -1,
      }
    );

    return () => {
      if (tweenRef.current) {
        tweenRef.current.kill();
      }
      if (tweenAltRef.current) {
        tweenAltRef.current.kill();
      }
    };
  }, []);

  const handleMouseEnter = () => {
    if (tweenRef.current) {
      tweenRef.current.pause();
    }
    if (tweenAltRef.current) {
      tweenAltRef.current.pause();
    }
  };

  const handleMouseLeave = () => {
    if (tweenRef.current) {
      tweenRef.current.play();
    }
    if (tweenAltRef.current) {
      tweenAltRef.current.play();
    }
  };

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <p className={styles.eyebrow}>Our Stack</p>
          <h2 className={styles.title}>Tools & Technologies</h2>
          <p className={styles.subtitle}>
            Every project is developed using trusted design, coding, and management tools
            to ensure quality and efficiency.
          </p>
        </div>

        <div className={styles.marqueeStack}>
          {/* Unang Marquee Row (Takbong Pakaliwa) */}
          <div
            className={styles.marqueeMask}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className={styles.marqueeTrack} ref={marqueeRef}>
              <div className={styles.logoRow}>
                {LOGOS.map(({ name, Icon, url }, index) => (
                  <a 
                    key={`tech-${name}-${index}`} 
                    href={url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className={styles.logoItem}
                  >
                    <Icon className={styles.logoIcon} aria-hidden="true" />
                    <span className={styles.logoText}>{name}</span>
                  </a>
                ))}
              </div>
              <div className={styles.logoRow} aria-hidden="true">
                {LOGOS.map(({ name, Icon, url }, index) => (
                  <a 
                    key={`tech-dup-${name}-${index}`} 
                    href={url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className={styles.logoItem}
                  >
                    <Icon className={styles.logoIcon} aria-hidden="true" />
                    <span className={styles.logoText}>{name}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Ikalawang Marquee Row (Takbong Pakanan) */}
          <div
            className={styles.marqueeMask}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className={styles.marqueeTrack} ref={marqueeRefAlt}>
              <div className={styles.logoRow}>
                {LOGOS.map(({ name, Icon, url }, index) => (
                  <a 
                    key={`tech-alt-${name}-${index}`} 
                    href={url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className={styles.logoItem}
                  >
                    <Icon className={styles.logoIcon} aria-hidden="true" />
                    <span className={styles.logoText}>{name}</span>
                  </a>
                ))}
              </div>
              <div className={styles.logoRow} aria-hidden="true">
                {LOGOS.map(({ name, Icon, url }, index) => (
                  <a 
                    key={`tech-alt-dup-${name}-${index}`} 
                    href={url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className={styles.logoItem}
                  >
                    <Icon className={styles.logoIcon} aria-hidden="true" />
                    <span className={styles.logoText}>{name}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}