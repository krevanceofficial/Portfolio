import styles from "../../../styles/inquirySection.module.css";

export default function InquirySection() {
	return (
		<section id="contact" className={styles.section}>
			<div className={styles.inner}>
				<div className={styles.header}>
					<p className={styles.eyebrow}>It all starts with a</p>
					<h2 className={styles.title}>Conversation</h2>
					<p className={styles.subtitle}>
						Collaborate with a team that understands your vision.
					</p>
				</div>

				<div className={styles.card}>
					<form className={styles.form}>
						<div className={styles.column}>
							<h3 className={styles.columnTitle}>Client Information</h3>
							<p className={styles.columnNote}>Please provide your personal details.</p>

							<div className={styles.row}>
								<label className={styles.field}>
									<span className={styles.label}>First Name*</span>
									<input className={styles.input} type="text" name="firstName" />
								</label>
								<label className={styles.field}>
									<span className={styles.label}>Last Name*</span>
									<input className={styles.input} type="text" name="lastName" />
								</label>
							</div>

							<label className={styles.field}>
								<span className={styles.label}>Email Address*</span>
								<input className={styles.input} type="email" name="email" />
							</label>

							<label className={styles.field}>
								<span className={styles.label}>Contact Number*</span>
								<input className={styles.input} type="tel" name="contact" />
							</label>

							<label className={styles.field}>
								<span className={styles.label}>Message</span>
								<textarea className={styles.textarea} name="message" rows={5} />
							</label>
						</div>

						<div className={styles.column}>
							<h3 className={styles.columnTitle}>Project Details</h3>
							<p className={styles.columnNote}>Please tell us about your needs.</p>

							<div className={styles.group}>
								<span className={styles.label}>Type of Service/s</span>
								<div className={styles.checkboxGrid}>
									<label className={styles.checkItem}>
										<input type="checkbox" name="service" value="application" />
										<span>System Development</span>
									</label>
									<label className={styles.checkItem}>
										<input type="checkbox" name="service" value="graphics" />
										<span>Graphics Design & Layout</span>
									</label>
									<label className={styles.checkItem}>
										<input type="checkbox" name="service" value="website" />
										<span>Website & Digital Services</span>
									</label>
									<label className={styles.checkItem}>
										<input type="checkbox" name="service" value="invitation" />
										<span>Web-Based Invitation</span>
									</label>
									<label className={styles.checkItem}>
										<input type="checkbox" name="service" value="maintenance" />
										<span>Website Maintenance</span>
									</label>
								</div>
							</div>

							<div className={styles.group}>
								<span className={styles.label}>Budget Range</span>
								<div className={styles.budgetGrid}>
									<label className={styles.pill}>
										<input type="radio" name="budget" defaultChecked />
										<span>P10,000 - P20,000</span>
									</label>
									<label className={styles.pill}>
										<input type="radio" name="budget" />
										<span>P20,000 - P50,000</span>
									</label>
									<label className={styles.pill}>
										<input type="radio" name="budget" />
										<span>P50,000 - P100,000</span>
									</label>
									<label className={styles.pill}>
										<input type="radio" name="budget" />
										<span>P100,000+</span>
									</label>
								</div>
							</div>

							<label className={styles.field}>
								<span className={styles.label}>Project Name*</span>
								<input className={styles.input} type="text" name="project" />
							</label>

							<button className={styles.submit} type="submit">
								Submit
							</button>
						</div>
					</form>
				</div>
			</div>
		</section>
	);
}
