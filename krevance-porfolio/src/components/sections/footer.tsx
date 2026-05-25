import Image from "next/image";
import styles from "../../styles/footer.module.css";
import logo from "../images/logo.png";
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin } from "lucide-react";

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
							<span className={styles.contactIcon} aria-hidden="true"><Mail size={14} /></span>
							krevance.official@gmail.com
						</li>
						<li>
							<span className={styles.contactIcon} aria-hidden="true"><Phone size={14} /></span>
							+6391 958 7721
						</li>
						<li>
							<span className={styles.contactIcon} aria-hidden="true"><MapPin size={14} /></span>
							Bacoor City, Cavite, Philippines
						</li>
					</ul>

					<div className={styles.socials}>
						<a href="#" aria-label="Facebook" className={styles.socialIcon}><Facebook size={14} /></a>
						<a href="#" aria-label="Instagram" className={styles.socialIcon}><Instagram size={14} /></a>
						<a href="#" aria-label="LinkedIn" className={styles.socialIcon}><Linkedin size={14} /></a>
					</div>
				</div>
			</div>

			<div className={styles.bottomBar}>
				<p>© 2026 Krevance. All rights reserved.</p>
				<p>Designed & Built with by Krevance</p>
			</div>
		</footer>
	);
}
