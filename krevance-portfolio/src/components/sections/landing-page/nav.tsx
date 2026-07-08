"use client";

import { useEffect, useMemo, useState } from "react";
import type { MouseEvent } from "react";
import styles from "../../../styles/nav.module.css";
import Image from "next/image";
import Link from "next/link";
import navLogo from "../../images/navlogo.svg";
import mobileViewLogo from "../../images/mobile_view_logo.svg";
import logoIcon from "../../images/logo.png";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const HAMBURGER_VARIANTS = (reducedMotion: boolean) => ({
  closed: {
    rotate: 0,
    transition: reducedMotion ? { duration: 0 } : { duration: 0.3 },
  },
  open: {
    rotate: 90,
    transition: reducedMotion ? { duration: 0 } : { duration: 0.3 },
  },
});

const HAMBURGER_LINE_VARIANTS = {
  closed: {
    rotate: 0,
    y: 0,
  },
  open: {
    rotate: 45,
    y: 8,
  },
};

const HAMBURGER_LINE_VARIANTS_MIDDLE = {
  closed: {
    opacity: 1,
  },
  open: {
    opacity: 0,
  },
};

const HAMBURGER_LINE_VARIANTS_BOTTOM = {
  closed: {
    rotate: 0,
    y: 0,
  },
  open: {
    rotate: -45,
    y: -8,
  },
};

const MOBILE_MENU_VARIANTS = (reducedMotion: boolean) => ({
  hidden: {
    opacity: 0,
    y: -10,
    pointerEvents: "none" as const,
  },
  visible: {
    opacity: 1,
    y: 0,
    pointerEvents: "auto" as const,
    transition: reducedMotion
      ? { duration: 0 }
      : {
          type: "spring" as const,
          stiffness: 300,
          damping: 30,
          mass: 0.8,
        },
  },
  exit: {
    opacity: 0,
    y: -10,
    pointerEvents: "none" as const,
    transition: reducedMotion ? { duration: 0 } : { duration: 0.2 },
  },
});

const NAV_CONTAINER_VARIANTS = (reducedMotion: boolean) => ({
  expanded: {
    width: "100%",
    padding: "1.2rem 3rem",
    borderRadius: "22px",
    gap: "2.5rem",
    y: 0,
    backgroundColor: "rgba(56, 75, 58, 0.95)",
    backdropFilter: "blur(6px)",
    boxShadow: "0 10px 24px rgba(0, 0, 0, 0.22)",
    
    // Framer motion will now cleanly morph this clipPath string:
    clipPath: "polygon(0% 0%, 100% 0%, 90% 100%, 10% 100%)",
    
    transition: reducedMotion
      ? { duration: 0 }
      : { type: "spring" as const, stiffness: 220, damping: 28, mass: 0.9 },
  },
  collapsed: {
    width: "22%",
    padding: "0.55rem 1rem",
    borderRadius: "20px",
    gap: "0.2rem",
    y: 6,
    backgroundColor: "rgba(56, 75, 58, 0.82)",
    backdropFilter: "blur(14px)",
    boxShadow: "0 18px 34px rgba(0, 0, 0, 0.28)",
    
    // Matches your target collapsed layout layout clip geometry:
    clipPath: "polygon(0% 0%, 100% 0%, 70% 100%, 30% 100%)",
    
    transition: reducedMotion
      ? { duration: 0 }
      : { type: "spring" as const, stiffness: 240, damping: 32, mass: 0.85 },
  },
});

const LINK_GROUP_VARIANTS = (reducedMotion: boolean) => ({
  hidden: {
    opacity: 0,
    y: -8,
    filter: reducedMotion ? "blur(0px)" : "blur(6px)",
  },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: reducedMotion
      ? { duration: 0 }
      : {
          type: "spring" as const,
          stiffness: 260,
          damping: 24,
          mass: 0.6,
          staggerChildren: 0.07,
          delayChildren: 0.12,
        },
  },
  exit: {
    opacity: 0,
    y: -10,
    filter: reducedMotion ? "blur(0px)" : "blur(6px)",
    transition: reducedMotion
      ? { duration: 0 }
      : {
          duration: 0.2,
          ease: EASE_OUT,
          staggerChildren: 0.05,
          staggerDirection: -1,
        },
  },
});

const LINK_ITEM_VARIANTS = (reducedMotion: boolean) => ({
  hidden: {
    opacity: 0,
    y: -8,
    filter: reducedMotion ? "blur(0px)" : "blur(6px)",
  },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: reducedMotion
      ? { duration: 0 }
      : { type: "spring" as const, stiffness: 260, damping: 22, mass: 0.55 },
  },
  exit: {
    opacity: 0,
    y: -6,
    filter: reducedMotion ? "blur(0px)" : "blur(6px)",
    transition: reducedMotion ? { duration: 0 } : { duration: 0.18, ease: EASE_OUT },
  },
});

const LOGO_VARIANTS = (reducedMotion: boolean) => ({
  enter: {
    opacity: 0,
    scale: 0.9,
    rotate: -4,
  },
  center: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: reducedMotion
      ? { duration: 0 }
      : { type: "spring" as const, stiffness: 240, damping: 20, mass: 0.5 },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    rotate: 4,
    transition: reducedMotion ? { duration: 0 } : { duration: 0.18, ease: EASE_OUT },
  },
});

const EASE_OUT: [number, number, number, number] = [0.4, 0, 0.2, 1];

const NAV_LINKS = {
  left: [
    { href: "/aboutus", label: "About Us" },
    { href: "/landingpage#services", label: "Services" },
  ],
  right: [
    { href: "/landingpage#portfolio", label: "Portfolio" },
    { href: "/contactus", label: "Contact Us" },
  ],
};

export default function Nav() {
  const [isMounted, setIsMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [forceExpand, setForceExpand] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const reducedMotion = useReducedMotion();
  
  // Wait until mounted before applying client preferences
  // This completely eliminates Hydration mismatches during SSR
  const shouldReduceMotion = isMounted ? (reducedMotion ?? false) : false;

  useEffect(() => {
    setIsMounted(true);
    
    // Set initial mobile state
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    
    const handleResize = () => checkMobile();
    window.addEventListener("resize", handleResize, { passive: true });
    
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!isMobile) return;
    
    const onScroll = () => {
      // On mobile, no scroll-collapse behavior
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    
    return () => window.removeEventListener("scroll", onScroll);
  }, [isMobile]);

  useEffect(() => {
    if (!isMobile) return;

    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobile(false);
      }
    };

    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, [isMobile]);

  // Desktop/Tablet scroll logic
  useEffect(() => {
    if (isMobile) return;

    const onScroll = () => {
      const scrolled = window.scrollY > 200;
      setIsScrolled(scrolled);
      if (!scrolled) setForceExpand(false);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    
    return () => window.removeEventListener("scroll", onScroll);
  }, [isMobile]);

  // Logic: Collapse if scrolled, UNLESS the user clicked to force it open
  const isCollapsed = isScrolled && !forceExpand;
  
  const navVariants = useMemo(
    () => NAV_CONTAINER_VARIANTS(shouldReduceMotion),
    [shouldReduceMotion]
  );
  const linkGroupVariants = useMemo(
    () => LINK_GROUP_VARIANTS(shouldReduceMotion),
    [shouldReduceMotion]
  );
  const linkItemVariants = useMemo(
    () => LINK_ITEM_VARIANTS(shouldReduceMotion),
    [shouldReduceMotion]
  );
  const logoVariants = useMemo(() => LOGO_VARIANTS(shouldReduceMotion), [shouldReduceMotion]);
  const hamburgerVariants = useMemo(() => HAMBURGER_VARIANTS(shouldReduceMotion), [shouldReduceMotion]);
  const mobileMenuVariants = useMemo(() => MOBILE_MENU_VARIANTS(shouldReduceMotion), [shouldReduceMotion]);

  const handleLogoClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (isCollapsed) {
      event.preventDefault();
      setForceExpand(true);
      return;
    }

    if (isScrolled) {
      setForceExpand(!forceExpand);
    }
  };

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const handleMobileNavClick = () => {
    closeMobileMenu();
  };

  return (
    <header className="sticky top-0 z-50 w-full flex flex-col items-center">
      <div className={styles["navtop-container"]} />

      {isMobile ? (
        // MOBILE LAYOUT
        <div className={styles["nav-wrap-mobile"]}>
          <div className={styles["nav-shape-mobile"]}>
            {/* Logo */}
            <Link
              href="/landingpage"
              className={styles["logo-button-mobile"]}
              onClick={(e) => {
                e.preventDefault();
                closeMobileMenu();
                window.location.href = "/landingpage";
              }}
            >
              <Image
                src={mobileViewLogo}
                alt="Logo"
                width={140}
                height={50}
                className={styles["logo-mobile"]}
              />
            </Link>

            {/* Hamburger Menu */}
            <motion.button
              className={styles["hamburger-button"]}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              variants={hamburgerVariants}
              animate={isMobileMenuOpen ? "open" : "closed"}
              aria-label="Toggle mobile menu"
              aria-expanded={isMobileMenuOpen}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <motion.line
                  x1="3"
                  y1="6"
                  x2="21"
                  y2="6"
                  variants={HAMBURGER_LINE_VARIANTS}
                  animate={isMobileMenuOpen ? "open" : "closed"}
                  transition={{ duration: 0.3 }}
                />
                <motion.line
                  x1="3"
                  y1="12"
                  x2="21"
                  y2="12"
                  variants={HAMBURGER_LINE_VARIANTS_MIDDLE}
                  animate={isMobileMenuOpen ? "open" : "closed"}
                  transition={{ duration: 0.3 }}
                />
                <motion.line
                  x1="3"
                  y1="18"
                  x2="21"
                  y2="18"
                  variants={HAMBURGER_LINE_VARIANTS_BOTTOM}
                  animate={isMobileMenuOpen ? "open" : "closed"}
                  transition={{ duration: 0.3 }}
                />
              </svg>
            </motion.button>
          </div>

          {/* Mobile Dropdown Menu */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                className={styles["mobile-menu"]}
                variants={mobileMenuVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <nav className={styles["mobile-menu-nav"]}>
                  {NAV_LINKS.left.map((link) => (
                    <motion.a
                      key={link.href}
                      href={link.href}
                      className={styles["mobile-menu-link"]}
                      onClick={handleMobileNavClick}
                      whileHover={shouldReduceMotion ? undefined : { x: 4 }}
                      whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
                    >
                      {link.label}
                    </motion.a>
                  ))}
                  {NAV_LINKS.right.map((link) => (
                    <motion.a
                      key={link.href}
                      href={link.href}
                      className={styles["mobile-menu-link"]}
                      onClick={handleMobileNavClick}
                      whileHover={shouldReduceMotion ? undefined : { x: 4 }}
                      whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
                    >
                      {link.label}
                    </motion.a>
                  ))}
                </nav>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ) : (
        // DESKTOP/TABLET LAYOUT
        <div className={styles["nav-wrap"]}>
          <motion.nav
            className={styles["nav-shape"]}
            variants={navVariants}
            animate={isCollapsed ? "collapsed" : "expanded"}
            initial={false}
            layout
          >
            <AnimatePresence mode="wait" initial={false}>
              {!isCollapsed && (
                <motion.div
                  key="left-links"
                  className={styles["nav-links"]}
                  variants={linkGroupVariants}
                  initial="hidden"
                  animate="show"
                  exit="exit"
                >
                  {NAV_LINKS.left.map((link) => (
                    <motion.a
                      key={link.href}
                      href={link.href}
                      className={styles["nav-link"]}
                      variants={linkItemVariants}
                      whileHover={shouldReduceMotion ? undefined : { y: -2 }}
                      whileFocus={shouldReduceMotion ? undefined : { y: -2 }}
                    >
                      <span className={styles["nav-link-text"]}>{link.label}</span>
                      <span className={styles["nav-link-underline"]} aria-hidden="true" />
                    </motion.a>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            <Link
              href="/landingpage"
              className={`${styles["logo-button"]} ${
                isCollapsed ? styles["logo-button-collapsed"] : ""
              }`.trim()}
              onClick={handleLogoClick}
            >
              <motion.div
                className={styles["logo-button-inner"]}
                whileHover={shouldReduceMotion ? undefined : { scale: 1.03 }}
                whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
                layout
              >
                <AnimatePresence mode="wait" initial={false}>
                  {isCollapsed ? (
                    <motion.div
                      key="logo-icon"
                      variants={logoVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                    >
                      <Image
                        src={logoIcon}
                        alt="Logo"
                        width={40}
                        height={40}
                        className={styles["logo-collapsed"]}
                      />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="logo-full"
                      variants={logoVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                    >
                      <Image
                        src={navLogo}
                        alt="Logo"
                        width={140}
                        height={50}
                        className={styles["logo-expanded"]}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </Link>

            <AnimatePresence mode="wait" initial={false}>
              {!isCollapsed && (
                <motion.div
                  key="right-links"
                  className={styles["nav-links"]}
                  variants={linkGroupVariants}
                  initial="hidden"
                  animate="show"
                  exit="exit"
                >
                  {NAV_LINKS.right.map((link) => (
                    <motion.a
                      key={link.href}
                      href={link.href}
                      className={styles["nav-link"]}
                      variants={linkItemVariants}
                      whileHover={shouldReduceMotion ? undefined : { y: -2 }}
                      whileFocus={shouldReduceMotion ? undefined : { y: -2 }}
                    >
                      <span className={styles["nav-link-text"]}>{link.label}</span>
                      <span className={styles["nav-link-underline"]} aria-hidden="true" />
                    </motion.a>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.nav>
        </div>
      )}
    </header>
  );
}