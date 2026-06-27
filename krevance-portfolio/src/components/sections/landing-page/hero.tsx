"use client";
import Link from "next/link";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import styles from "../../../styles/hero.module.css";

// I-import ang lahat ng mga logos rito:
import logoHolder from "../../icons/logoholder.png"; 
import logoHolder1 from "../../icons/logoholder1.png"; 
import logoHolder2 from "../../icons/logoholder2.png"; 

export default function Hero() {
    const marqueeRef = useRef<HTMLDivElement>(null);
    const tweenRef = useRef<gsap.core.Tween | null>(null);

    // 2. Dito mo i-add sa loob ng array ang mga bagong logo.
    // Pwede mong dagdagan ng kahit ilan, basta magkakasama sila sa listahan:
    const logos = [
        logoHolder,
        logoHolder1,
        logoHolder2,
        logoHolder,
        logoHolder1,
        logoHolder2
    ];

    useEffect(() => {
        const marquee = marqueeRef.current;
        if (!marquee) return;

        // Awtomatikong babasahin ng GSAP kung gaano kahaba ang nadagdag mong mga logo
        const scrollWidth = marquee.scrollWidth / 2;

        tweenRef.current = gsap.to(marquee, {
            x: -scrollWidth,
            duration: 30, // Tip: Kung marami kang idinagdag na logo, taasan mo ito (gawing 30 o 35) para hindi masyadong mabilis ang takbo.
            ease: "none",
            repeat: -1,
        });

        return () => {
            if (tweenRef.current) tweenRef.current.kill();
        };
    }, []);

    const handleMouseEnter = () => {
        if (tweenRef.current) tweenRef.current.pause();
    };

    const handleMouseLeave = () => {
        if (tweenRef.current) tweenRef.current.play();
    };

    return (
        <section className={styles.heroSection}>
            <div className={styles.heroInner}>
                <div className={styles.left}>
                    <span className={styles.eyebrow}>Digital Solutions and Software Development Company</span>
                    <h1 className={styles.title}>
                        Where Startup Visions
                        <br />
                        Become Digital
                        <br />
                        Success
                    </h1>

                    <p className={styles.subtitle}>
                        We partner with founders and businesses to design, develop, and
                        deliver digital solutions that drive growth.
                    </p>

                    {/* Lalagyan ng Button Group para magkatabi sila */}
                    <div className={styles.ctaGroup}>
                        <Link className={styles.cta} href="/contactus">
                            Let's Build Together &gt;
                        </Link>
                        
                        <div className={styles.secondaryLink}>
                            {/* Minimalist Checkmark SVG Icon */}
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10"/>
                                <path d="m9 12 2 2 4-4"/>
                            </svg>
                            <span>Free consultation</span>
                        </div>
                    </div>
                </div>

                <div className={styles.right}>
                    <ul className={styles.statsList}>
                        <li className={styles.statItem}>
                            <span className={styles.statValue}>80+</span>
                            <span className={styles.divider}></span>
                            <span className={styles.statText}>
                                <span className={styles.statLabel}>Trusted Collaborations</span>
                                <span className={styles.statNote}>Supporting Businesses and Startups.</span>
                            </span>
                        </li>
                        <li className={styles.statItem}>
                            <span className={styles.statValue}>95%</span>
                            <span className={styles.divider}></span>
                            <span className={styles.statText}>
                                <span className={styles.statLabel}>Client Satisfaction</span>
                                <span className={styles.statNote}>Delivering Reliable Digital Experiences.</span>
                            </span>
                        </li>
                        <li className={styles.statItem}>
                            <span className={styles.statValue}>120+</span>
                            <span className={styles.divider}></span>
                            <span className={styles.statText}>
                                <span className={styles.statLabel}>Projects Delivered</span>
                                <span className={styles.statNote}>Launching Creative Digital Platforms.</span>
                            </span>
                        </li>
                    </ul>
                </div>
            </div>

            {/* --- CAROUSEL SECTION (Walang kailangang baguhin dito, kusa itong mag-aadjust) --- */}
            {/* <div className={styles.carouselContainer}>
                <div 
                    className={styles.carouselMask}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <div className={styles.marqueeTrack} ref={marqueeRef}>
                        <div className={styles.logoRow}>
                            {logos.map((logo, index) => (
                                <div key={`orig-${index}`} className={styles.logoWrapper}>
                                    <Image src={logo} alt={`Client Logo ${index + 1}`} className={styles.logoImage} />
                                </div>
                            ))}
                        </div>
                        <div className={styles.logoRow} aria-hidden="true">
                            {logos.map((logo, index) => (
                                <div key={`dup-${index}`} className={styles.logoWrapper}>
                                    <Image src={logo} alt={`Client Logo Duplicate ${index + 1}`} className={styles.logoImage} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div> */}
        </section>
    );
}