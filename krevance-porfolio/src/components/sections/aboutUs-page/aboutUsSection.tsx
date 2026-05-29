"use client";

import { cubicBezier, motion } from "framer-motion";
import styles from "../../../styles/aboutUsSection.module.css";

export default function AboutUsSection() {
  const leftContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 },
    },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 12, filter: "blur(4px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.55, ease: cubicBezier(0.22, 1, 0.36, 1) },
    },
  };

  const titleTop = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: cubicBezier(0.22, 1, 0.36, 1) },
    },
  };

  const titleBottom = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: cubicBezier(0.22, 1, 0.36, 1) },
    },
  };

  const rightPanel = {
    hidden: { opacity: 0, scale: 0.98 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: cubicBezier(0.22, 1, 0.36, 1),
        delay: 0.1,
      },
    },
  };

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <motion.div
          className={styles.left}
          variants={leftContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.6 }}
        >
          <motion.p className={styles.eyebrow} variants={fadeUp}>
            About Us
          </motion.p>
          <motion.h1 className={styles.title} variants={fadeUp}>
            <motion.span className={styles.titleTop} variants={titleTop}>
              THE
            </motion.span>
            <motion.span className={styles.titleBottom} variants={titleBottom}>
              KRAEV
            </motion.span>
          </motion.h1>
          <motion.p className={styles.subtitle} variants={fadeUp}>
            Partnership of four driven individuals with
            diverse expertise in design, development,
            operations, and marketing.
          </motion.p>
        </motion.div>
        <motion.div
          className={styles.right}
          aria-hidden="true"
          variants={rightPanel}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        />
      </div>
    </section>
  );
}
