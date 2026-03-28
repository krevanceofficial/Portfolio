import Image from "next/image";
import { Zen_Dots } from "next/font/google";
import earthHero from "../images/eartHero.png";
import mailHero from "../images/mailHero.png";
import penHero from "../images/penHero.png";
import settingHero from "../images/settingHero.png";
import styles from "../../styles/hero.module.css";

const zenDots = Zen_Dots({
    weight: "400",
    subsets: ["latin"],
});

export default function Hero() {
    return (
        <section className={styles.heroSection}>
            <div className={`${styles.decor} ${styles.mail}`}>
                <Image src={mailHero} alt="" priority className={styles.mailImg} />
            </div>

            <div className={`${styles.decor} ${styles.pen}`}>
                <Image src={penHero} alt="" className={styles.penImg} />
            </div>

            <div className={`${styles.decor} ${styles.earth}`}>
                <Image src={earthHero} alt="" loading="eager" className={styles.earthImg} />
            </div>

            <div className={`${styles.decor} ${styles.setting}`}>
                <Image src={settingHero} alt="" className={styles.settingImg} />
            </div>

            <div className={styles.content}>
                <h1
                    className={`${zenDots.className} ${styles.title}`}
                >
                    Where Your Vision Becomes
                    <br />
                    A Digital Experience
                </h1>

                <p className={styles.subtitle}>
                    At Krevance, startups are empowered with smart, creative digital
                    solutions designed to spark growth and success.
                </p>
            </div>
        </section>
    );
}