"use client";

import { useMemo, useState } from "react";
import Image, { StaticImageData } from "next/image";
import { ChevronLeft, ChevronRight, ExternalLink, Github } from "lucide-react";
import styles from "../../../styles/kraevsWork.module.css";
import OLImage from "../../images/Online-exam.jpg";
import OmegaImage from "../../images/omega-ecom.jpg";

interface ProjectItem {
	id: number;
	title: string;
	description: string;
	image?: string | StaticImageData;
	liveLink?: string;
	githubLink?: string;
}

const PROJECTS: ProjectItem[] = [
	{
		id: 1,
		title: "Online Examination with Proctoring System",
		description:
			"A web-based examination platform with automated proctoring features to ensure academic integrity.",
		image: OLImage,
		githubLink:
			"https://github.com/karinaonly/Online-Examination-with-Proctoring-System",
	},
	{
		id: 2,
		title: "Omega E-Commerce System",
		description:
			"Omega-Ecommerce is a full-stack e-commerce web application. It features a modern, responsive design and backend architecture.",
		image: OmegaImage,
		liveLink: "https://omega.synchores.com",
		githubLink: "https://github.com/Synchores-Dhaniel/E-Commerce-Project",
	},
	{
		id: 3,
		title: "Burvon Website",
		description:
			"A modern jewelry website featuring 3D viewing and virtual try-on.",
	},
	{
		id: 4,
		title: "Burvon Website",
		description:
			"A modern jewelry website featuring 3D viewing and virtual try-on.",
	},
];

const VISIBLE_COUNT = 3;

export default function KraevsWork() {
	const [currentIndex, setCurrentIndex] = useState(0);

	const visibleProjects = useMemo(() => {
		return Array.from({ length: VISIBLE_COUNT }, (_, idx) => {
			const projectIndex = (currentIndex + idx) % PROJECTS.length;
			return PROJECTS[projectIndex];
		});
	}, [currentIndex]);

	const handlePrev = () => {
		setCurrentIndex((prev) => (prev === 0 ? PROJECTS.length - 1 : prev - 1));
	};

	const handleNext = () => {
		setCurrentIndex((prev) => (prev === PROJECTS.length - 1 ? 0 : prev + 1));
	};

	return (
		<section id="portfolio" className={styles.section}>
			<div className={styles.inner}>
				<header className={styles.header}>
					<div className={styles.headerLeft}>
						<p className={styles.eyebrow}>Portfolio</p>
						<h2 className={styles.title}>Kraev&apos;s Works</h2>
					</div>
					<div className={styles.headerRight}>
						<p className={styles.subtitle}>
							For Krevance, every completed project is a chapter in its clients&apos;
							stories. The team ensures that every design and platform reflects
							identity and delivers impact in the digital world.
						</p>
					</div>
				</header>

				<div className={styles.cards}>
					{visibleProjects.map((project, idx) => {
						const hasLinks = project.liveLink || project.githubLink;

						return (
							<article key={`${project.id}-${idx}`} className={styles.card}>
								<div className={styles.preview}>
									{project.image && (
										<Image
											src={project.image}
											alt={project.title}
											fill
											style={{ objectFit: "cover" }}
											sizes="(max-width: 768px) 100vw, 33vw"
										/>
									)}

									{hasLinks && (
										<div className={styles.linkBadges}>
											{project.liveLink && (
												<a
													href={project.liveLink}
													target="_blank"
													rel="noopener noreferrer"
													className={`${styles.linkBadge} ${styles.linkBadgePrimary}`}
													aria-label={`Visit live site of ${project.title}`}
												>
													<ExternalLink size={13} strokeWidth={2.2} />
													<span>Live</span>
												</a>
											)}

											{project.githubLink && (
												<a
													href={project.githubLink}
													target="_blank"
													rel="noopener noreferrer"
													className={`${styles.linkBadge} ${styles.linkBadgeSecondary}`}
													aria-label={`View GitHub repository of ${project.title}`}
												>
													<Github size={13} strokeWidth={2.2} />
													<span>Code</span>
												</a>
											)}
										</div>
									)}
								</div>

								<h3 className={styles.cardTitle}>{project.title}</h3>
								<p className={styles.cardDescription}>{project.description}</p>
							</article>
						);
					})}
				</div>

				<div className={styles.controls}>
					<div className={styles.arrows}>
						<button
							type="button"
							className={styles.arrowButton}
							onClick={handlePrev}
							aria-label="Previous projects"
						>
							<ChevronLeft size={18} />
						</button>
						<button
							type="button"
							className={styles.arrowButton}
							onClick={handleNext}
							aria-label="Next projects"
						>
							<ChevronRight size={18} />
						</button>
					</div>

					<div className={styles.dots}>
						{PROJECTS.map((project, idx) => (
							<button
								key={project.id}
								type="button"
								className={`${styles.dot} ${idx === currentIndex ? styles.dotActive : ""}`}
								aria-label={`Go to ${project.title}`}
								aria-current={idx === currentIndex ? "true" : "false"}
								onClick={() => setCurrentIndex(idx)}
							/>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}