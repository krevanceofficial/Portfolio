"use client";

import { cubicBezier, motion } from "framer-motion";
import Image from "next/image";
import styles from "../../../styles/aboutUsSection.module.css";

import krev1 from "../../kreav-images/krev1.png";
import krev2 from "../../kreav-images/krev2.png";
import krev3 from "../../kreav-images/krev3.png";
import krev4 from "../../kreav-images/krev4.png";

const KRAEV_IMAGES = [krev1, krev2, krev3, krev4];

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

  const rightContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const imageVariant = {
    hidden: { opacity: 0, y: 40, filter: "blur(2px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.65, ease: cubicBezier(0.25, 1, 0.5, 1) },
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
            About Us — EST. 2026
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
          variants={rightContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
        >
          <div className={styles.imageWrapper}>
            {KRAEV_IMAGES.map((imgSrc, index) => (
              <motion.div
                key={`kraev-member-${index}`}
                className={styles.memberImageContainer}
                variants={imageVariant}
                style={{ zIndex: index + 1 }}
              >
                {/* Tinakdaan ng sapat na width at height base sa aspect ratio ng mga portraits */}
                <Image
                  src={imgSrc}
                  alt={`Krevance Member ${index + 1}`}
                  className={styles.memberImage}
                  width={320}
                  height={420}
                  priority
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}