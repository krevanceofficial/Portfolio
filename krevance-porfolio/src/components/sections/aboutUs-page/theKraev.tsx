"use client";

import { cubicBezier, motion } from "framer-motion";
import styles from "../../../styles/theKraev.module.css";

const TEAM = [
  { id: "01", name: "Giuliani Calais", role: "Chief Creative Officer" },
  { id: "02", name: "Giuliani Calais", role: "Chief Creative Officer" },
  { id: "03", name: "Giuliani Calais", role: "Chief Creative Officer" },
  { id: "04", name: "Giuliani Calais", role: "Chief Creative Officer" },
];

export default function TheKraev() {
  const headerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 },
    },
  };

  const headerItem = {
    hidden: { opacity: 0, y: 12, filter: "blur(4px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.55, ease: cubicBezier(0.22, 1, 0.36, 1) },
    },
  };

  const gridContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.1 },
    },
  };

  const cardItem = {
    hidden: { opacity: 0, y: 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: cubicBezier(0.22, 1, 0.36, 1) },
    },
  };

  const backgroundDrift = {
    backgroundPosition: ["0px 0px", "24px 24px", "0px 0px"],
    transition: {
      duration: 18,
      ease: cubicBezier(0.42, 0, 0.58, 1),
      repeat: Infinity,
    },
  };

  return (
    <motion.section className={styles.section} animate={backgroundDrift}>
      <div className={styles.inner}>
        <motion.div
          className={styles.header}
          variants={headerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.6 }}
        >
          <motion.p className={styles.eyebrow} variants={headerItem}>
            The People Behind It
          </motion.p>
          <motion.h2 className={styles.title} variants={headerItem}>
            Meet The Kraev
          </motion.h2>
          <motion.p className={styles.subtitle} variants={headerItem}>
            Get to know the minds behind Krevance
          </motion.p>
        </motion.div>

        <motion.div
          className={styles.grid}
          variants={gridContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
        >
          {TEAM.map((member) => (
            <motion.article key={member.id} className={styles.card} variants={cardItem}>
              <span className={styles.cardNumber}>{member.id}</span>
              <div className={styles.avatar} aria-hidden="true" />
              <div className={styles.cardContent}>
                <h3 className={styles.name}>{member.name}</h3>
                <p className={styles.role}>{member.role}</p>
                <p className={styles.bio}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                  sed do eiusmod tempor incididunt ut labore.
                </p>

                <div className={styles.actions}>
                  <button type="button" className={styles.cvButton}>
                    CV
                  </button>
                  <button
                    type="button"
                    className={styles.iconButton}
                    aria-label="Instagram"
                  >
                    ◎
                  </button>
                  <button
                    type="button"
                    className={styles.iconButton}
                    aria-label="LinkedIn"
                  >
                    in
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
