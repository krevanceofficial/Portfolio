"use client";

import { useEffect, useState } from "react";
import styles from "../styles/nav.module.css";
import Image from "next/image";
import navLogo from "./images/navlogo.svg";
import logoIcon from "./images/logo.png";

export default function Nav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [forceExpand, setForceExpand] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY > 50;
      setIsScrolled(scrolled);
      // If user scrolls back to top, reset the manual override
      if (!scrolled) setForceExpand(false);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Logic: Collapse if scrolled, UNLESS the user clicked to force it open
  const isCollapsed = isScrolled && !forceExpand;

  return (
    <header className="sticky top-0 z-50 w-full flex flex-col items-center">
      <div className={styles["navtop-container"]} />

      <div className={styles["nav-wrap"]}>
        <nav
          className={`${styles["nav-shape"]} ${
            isCollapsed ? styles["nav-shape-collapsed"] : ""
          }`}
        >
          {/* Left Side Links */}
          <div className={`${styles["nav-links"]} ${isCollapsed ? styles["nav-links-hidden"] : ""}`}>
            <a href="#">About Us</a>
            <a href="#">Services</a>
          </div>

          {/* Logo / Toggle Button */}
          <button
            type="button"
            className={`${styles["logo-button"]} ${
              isCollapsed ? styles["logo-button-collapsed"] : ""
            }`}
            onClick={() => isScrolled && setForceExpand(!forceExpand)}
          >
            <Image
              src={isCollapsed ? logoIcon : navLogo}
              alt="Logo"
              width={isCollapsed ? 40 : 140}
              height={isCollapsed ? 40 : 50}
              className={isCollapsed ? styles["logo-collapsed"] : styles["logo-expanded"]}
            />
          </button>

          {/* Right Side Links */}
          <div className={`${styles["nav-links"]} ${isCollapsed ? styles["nav-links-hidden"] : ""}`}>
            <a href="#">Portfolio</a>
            <a href="#">Contact Us</a>
          </div>
        </nav>
      </div>
    </header>
  );
}