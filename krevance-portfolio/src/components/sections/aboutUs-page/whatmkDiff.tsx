"use client";

import { cubicBezier, motion } from "framer-motion";
import Image from "next/image";
import styles from "../../../styles/whatmkDiff.module.css";

import clientCenteredIcon from "../../icons/Why choose us ICON/icon_client-centered.png";
import creativeIcon from "../../icons/Why choose us ICON/icon_creative.png";
import endToEndIcon from "../../icons/Why choose us ICON/icon_endtoend.png";
import startupIcon from "../../icons/Why choose us ICON/icon_startup.png";
import transparentIcon from "../../icons/Why choose us ICON/icon_transparent.png";

const FEATURES = [
  {
    id: "01",
    title: "Startup-Friendly Customization",
    text: "We design packages that fit the needs of startups - balancing budget, function, and timeline without compromising quality.",
    icon: startupIcon,
    alt: "Startup-friendly customization icon",
  },
  {
    id: "02",
    title: "End-To-End Service Model",
    text: "From concept to launch, we manage every stage - giving clients a seamless and worry-free development journey.",
    icon: endToEndIcon,
    alt: "End-to-end service model icon",
  },
  {
    id: "03",
    title: "Creative-Functional Balance",
    text: "Each design combines visual creativity with strong usability - ensuring experiences that are both engaging and practical.",
    icon: creativeIcon,
    alt: "Creative-functional balance icon",
  },
  {
    id: "04",
    title: "Transparent Communication",
    text: "Clients receive consistent updates, progress reports, and clear timelines - ensuring trust and accountability at every step.",
    icon: transparentIcon,
    alt: "Transparent communication icon",
  },
  {
    id: "05",
    title: "Client-Centered Approach",
    text: "Every solution is crafted with the client’s vision in mind - balancing functionality with brand personality.",
    icon: clientCenteredIcon,
    alt: "Client-centered approach icon",
  },
];

export default function WhatMakesDifferent() {
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
          <motion.div className={styles.headerLeft} variants={headerItem}>
            <p className={styles.eyebrow}>Why Choose Us</p>
            <h2 className={styles.title}>What Makes Us Different?</h2>
          </motion.div>
          <motion.p className={styles.headerNote} variants={headerItem}>
            From the smallest interface element to the overall system flow,
            Krevance ensures precision, creativity, and strategy align to
            create lasting value for clients.
          </motion.p>
        </motion.div>

        <motion.div
          className={styles.grid}
          variants={gridContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
        >
          {FEATURES.map((feature) => (
            <motion.article key={feature.id} className={styles.card} variants={cardItem}>
              <span className={styles.cardNumber}>{feature.id}</span>
              <span className={styles.cardIcon} aria-hidden="true">
                <Image
                  src={feature.icon}
                  alt={feature.alt}
                  className={styles.cardIconImage}
                  width={20}
                  height={20}
                />
              </span>
              <h3 className={styles.cardTitle}>{feature.title}</h3>
              <p className={styles.cardText}>{feature.text}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
