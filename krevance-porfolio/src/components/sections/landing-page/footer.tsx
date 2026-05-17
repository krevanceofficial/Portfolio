import Image from "next/image";
import styles from "../../styles/footer.module.css";
import logo from "../images/logo.png";

export default function Footer() {
	return (
		<footer className={styles.footer}>
			<div className={styles.inner}>
				<div className={styles.brand}>
					<div className={styles.brandTop}>
						<Image src={logo} alt="Krevance" width={44} height={44} />
						<h2 className={styles.brandName}>Krevance</h2>
					</div>
					<p className={styles.brandText}>
						Empowering startups and businesses with smart, creative digital
						solutions that spark growth.
					</p>
				</div>

				<div className={styles.navBlock}>
					<h3 className={styles.blockTitle}>Navigation</h3>
					<ul className={styles.navList}>
						<li><a href="#">About Us</a></li>
						<li><a href="#">Services</a></li>
						<li><a href="#">Portfolio</a></li>
						<li><a href="#">Contact Us</a></li>
					</ul>
				</div>

				<div className={styles.contact}>
					<h3 className={styles.blockTitle}>Get In Touch</h3>
					<ul className={styles.contactList}>
						<li>
							<span className={styles.contactIcon} aria-hidden="true">✉</span>
							krevance.official@gmail.com
						</li>
						<li>
							<span className={styles.contactIcon} aria-hidden="true">☎</span>
							+6391 958 7721
						</li>
						<li>
							<span className={styles.contactIcon} aria-hidden="true">⌂</span>
							Bacoor City, Cavite, Philippines
						</li>
					</ul>

					<div className={styles.socials}>
						<a href="#" aria-label="Facebook" className={styles.socialIcon}>f</a>
						<a href="#" aria-label="Instagram" className={styles.socialIcon}>◎</a>
						<a href="#" aria-label="LinkedIn" className={styles.socialIcon}>in</a>
					</div>
				</div>
			</div>
		</footer>
	);
}
