"use client";

import { cubicBezier, motion } from "framer-motion";
import styles from "../../../styles/ourStory.module.css";

export default function OurStory() {
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

  const storyCardVariant = {
    hidden: { opacity: 0, scale: 0.98 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: cubicBezier(0.22, 1, 0.36, 1) },
    },
  };

  const cardsContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.08 },
    },
  };

  const cardItem = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.48, ease: cubicBezier(0.22, 1, 0.36, 1) },
    },
  };

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <motion.div
          className={styles.header}
          variants={headerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.6 }}
        >
          <motion.p className={styles.eyebrow} variants={headerItem}>
            Our Background
          </motion.p>
          <motion.h2 className={styles.title} variants={headerItem}>
            Our Story
          </motion.h2>
          <motion.p className={styles.subtitle} variants={headerItem}>
            Discover the journey that shaped Krevance
          </motion.p>
        </motion.div>

        <motion.div
          className={styles.storyCard}
          variants={storyCardVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.45 }}
        >
          <p>
            Krevance was built by a team of designers, developers, and strategists
            united by one vision: to transform ideas into digital success. Each
            founder brings a unique expertise, and together they form a
            collaborative force that turns challenges into opportunities.
          </p>
        </motion.div>

        <motion.div
          className={styles.cards}
          variants={cardsContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
        >
          <motion.article className={styles.card} variants={cardItem}>
            <span className={styles.cardIcon} aria-hidden="true">
              ✦
            </span>
            <h3 className={styles.cardTitle}>Mission</h3>
            <p className={styles.cardText}>
              Krevance was built by a team of designers, developers, and strategists
              united by one vision: to transform ideas into digital success. Each
              founder brings a unique expertise, and together they form a
              collaborative force that turns challenges into opportunities.
            </p>
          </motion.article>

          <motion.article className={styles.card} variants={cardItem}>
            <span className={styles.cardIcon} aria-hidden="true">
              ✦
            </span>
            <h3 className={styles.cardTitle}>Core Values</h3>
            <p className={styles.cardText}>
              Krevance was built by a team of designers, developers, and strategists
              united by one vision: to transform ideas into digital success. Each
              founder brings a unique expertise, and together they form a
              collaborative force that turns challenges into opportunities.
            </p>
          </motion.article>

          <motion.article className={styles.card} variants={cardItem}>
            <span className={styles.cardIcon} aria-hidden="true">
              ✦
            </span>
            <h3 className={styles.cardTitle}>Vision</h3>
            <p className={styles.cardText}>
              Krevance was built by a team of designers, developers, and strategists
              united by one vision: to transform ideas into digital success. Each
              founder brings a unique expertise, and together they form a
              collaborative force that turns challenges into opportunities.
            </p>
          </motion.article>
        </motion.div>
      </div>
    </section>
  );
}
