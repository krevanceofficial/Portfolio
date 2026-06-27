"use client";

import { cubicBezier, motion } from "framer-motion";
import styles from "../../../styles/theKraev.module.css";
// I-import ang Instagram at LinkedIn icons dito:
import { SiInstagram } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa6"; // Mas stable ang export nito

// 1. Import your local images
import sherlettImg from "../../kreav-images/sherlett.png"; 
import giulianiImg from "../../kreav-images/gil.jpg"; 
import dhanielImg from "../../kreav-images/dhaniel.png";
import loelImg from "../../kreav-images/loel.png";

// 2. Expanded array to handle URLs for each member
const TEAM = [
  { 
    id: "01", 
    name: "Sherlett Acoba", 
    role: "Chief Operations Officer", 
    image: sherlettImg.src,
    bio: "Leads operations, project coordination, and client relations at Krevance. Ensures projects stay organized, on schedule, and aligned with client goals while overseeing business administration and strategic partnerships.",
    cvUrl: "/kreav-cv/sherlett-cv.pdf",
    instagramUrl: "https://www.instagram.com/sherletttt",
    linkedinUrl: "https://www.linkedin.com/in/sherlett-acoba-97b0563a8/"
  },
  { 
    id: "02", 
    name: "Giuliani Calais", 
    role: "Chief Creative Officer", 
    image: giulianiImg.src,
    bio: "Leads the creative direction of Krevance through UI/UX design, branding, and visual strategy. Focuses on creating engaging digital experiences that balance creativity, usability, and business objectives.",
    cvUrl: "/kreav-cv/giuliani-cv.pdf",
    instagramUrl: "https://www.instagram.com/dyil_cls",
    linkedinUrl: "https://ph.linkedin.com/in/giuliani-calais-798824228"
  },
  { 
    id: "03", 
    name: "Dhaniel Lofamia", 
    role: "Chief Technology Officer", 
    image: dhanielImg.src,
    bio: "Contributes to product development through full-stack development, UI/UX implementation, and technical innovation. Focuses on transforming concepts into functional digital products while improving workflows and system performance.",
    cvUrl: "/kreav-cv/dhaniel-cv.pdf",
    instagramUrl: "https://www.instagram.com/dhnlein",
    linkedinUrl: "https://www.linkedin.com/in/dhaniel-lofamia-5ab913388"
  },
  { 
    id: "04", 
    name: "Loel Campaña", 
    role: "Chief Technology Officer", 
    image: loelImg.src,
    bio: "Oversees system architecture, software development, and technical infrastructure. Specializes in building secure, scalable, and high-performing digital solutions while ensuring development standards are maintained.",
    cvUrl: "/kreav-cv/loel-cv.pdf",
    instagramUrl: "https://www.instagram.com/kairos.clm/",
    linkedinUrl: "https://www.linkedin.com/in/loel-campaña-dev/"
  },
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
              
              <div 
                className={styles.avatar} 
                style={{ backgroundImage: `url(${member.image})` }}
                aria-hidden="true" 
              />
              
              <div className={styles.cardContent}>
                <h3 className={styles.name}>{member.name}</h3>
                <p className={styles.role}>{member.role}</p>
                <p className={styles.bio}>
                  {member.bio}
                </p>

                <div className={styles.actions}>
                  <a 
                    href={member.cvUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className={styles.cvButton}
                  >
                    CV
                  </a>
                  
                  {/* Pinalitan ang ◎ ng <SiInstagram /> */}
                  <a
                    href={member.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.iconButton}
                    aria-label={`${member.name}'s Instagram`}
                  >
                    <SiInstagram size={13} />
                  </a>

                  {/* Pinalitan ang 'in' ng <SiLinkedin /> */}
                  <a
                    href={member.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.iconButton}
                    aria-label={`${member.name}'s LinkedIn`}
                  >
                    <FaLinkedin size={13} />
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}