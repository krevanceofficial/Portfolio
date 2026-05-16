import styles from "../../styles/hero.module.css";

export default function Hero() {
    return (
        <section className={styles.heroSection}>
            <div className={styles.heroInner}>
                <div className={styles.left}>
                    <span className={styles.eyebrow}>Digital Agency</span>
                    <h1 className={styles.title}>
                        Empowering Visions
                        <br />
                        Through Digital
                        <br />
                        Innovation
                    </h1>

                    <p className={styles.subtitle}>
                        At Krevance, startups are empowered with smart, creative digital
                        solutions designed to spark growth and success.
                    </p>

                    <button type="button" className={styles.cta}>
                        Talk To Us &gt;
                    </button>
                </div>

                <div className={styles.right}>
                    <ul className={styles.statsList}>
                        <li className={styles.statItem}>
                            <span className={styles.statValue}>80+</span>
                            <span className={styles.statText}>
                                <span className={styles.statLabel}>Team Clients</span>
                                <span className={styles.statNote}>
                                    Trusted by Growing Businesses
                                </span>
                            </span>
                        </li>
                        <li className={styles.statItem}>
                            <span className={styles.statValue}>95%</span>
                            <span className={styles.statText}>
                                <span className={styles.statLabel}>Promoting</span>
                                <span className={styles.statNote}>
                                    Client Satisfaction Rate
                                </span>
                            </span>
                        </li>
                        <li className={styles.statItem}>
                            <span className={styles.statValue}>120+</span>
                            <span className={styles.statText}>
                                <span className={styles.statLabel}>Relators</span>
                                <span className={styles.statNote}>
                                    Projects Launched Globally
                                </span>
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    );
}