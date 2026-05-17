import { Zen_Dots } from "next/font/google";
import { ArrowRight, Lightbulb, ShieldCheck, UserRoundSearch } from "lucide-react";
import styles from "../../styles/about.module.css";

const zenDots = Zen_Dots({
  weight: "400",
  subsets: ["latin"],
});

export default function AboutOverview() {
  return (
    <section className={styles.aboutOverviewSection}>
      <div className={styles.content}>
        <h1 className={`${zenDots.className} ${styles.title}`}>Krevance</h1>

        <div className={styles.stage}>
          {/* The complex SVG connector line for pixel-perfect matching */}
          <div className={styles.svgConnector} aria-hidden="true">
            <svg viewBox="0 0 800 200" fill="none" preserveAspectRatio="none">
              <path 
                d="M150 160 H 300 V 80 H 650 V 10" 
                stroke="#6c7a6e" 
                strokeWidth="1.5"
              />
            </svg>
          </div>

          <div className={styles.leftColumn}>
            <article className={styles.introCard}>
              <p className={styles.kicker}>Krevance</p>
              <h2 className={styles.introTitle}>Is A Philippine-Based</h2>
              <p className={styles.introText}>
                Digital development company that specializes in creating smart, 
                scalable, and creative web and app solutions.
              </p>
            </article>

            <button type="button" className={styles.learnMoreButton}>
              <span className={styles.learnMoreIconWrap}>
                <ArrowRight size={14} />
              </span>
              Learn More
            </button>
          </div>

          <article>
            <div className={styles.introCard}>
              <ShieldCheck className={styles.icon} size={22} />
              <div>
                <h3 className={styles.featureTitle}>Reliable</h3>
                <p className={styles.featureText}>
                  Solutions are delivered with consistency and accuracy, ensuring
                </p>
              </div>
            </div>

            <div className={styles.introCard}>
              <Lightbulb className={styles.icon} size={22} />
              <div>
                <h3 className={styles.featureTitle}>Innovative</h3>
                <p className={styles.featureText}>
                  Every solution is built with creativity and forward thinking strategies to
                </p>
              </div>
            </div>

            <div className={styles.introCard}>
              <UserRoundSearch className={styles.icon} size={22} />
              <div>
                <h3 className={styles.featureTitle}>User-Centric</h3>
                <p className={styles.featureText}>
                  Services prioritize intuitive design and seamless functionality, focusing on the end-user experience.
                </p>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}