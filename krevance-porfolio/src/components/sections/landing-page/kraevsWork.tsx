"use client";

import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import styles from "../../../styles/kraevsWork.module.css";

interface ProjectItem {
	id: string;
	title: string;
	description: string;
}

const PROJECTS: ProjectItem[] = [
	{
		id: "burvon-website",
		title: "Burvon Website",
		description: "A modern jewelry website featuring 3D viewing and virtual try-on.",
	},
	{
		id: "burvon-website-2",
		title: "Burvon Website",
		description: "A modern jewelry website featuring 3D viewing and virtual try-on.",
	},
	{
		id: "burvon-website-3",
		title: "Burvon Website",
		description: "A modern jewelry website featuring 3D viewing and virtual try-on.",
	},
	{
		id: "burvon-website-4",
		title: "Burvon Website",
		description: "A modern jewelry website featuring 3D viewing and virtual try-on.",
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
					{visibleProjects.map((project, idx) => (
						<article key={`${project.id}-${idx}`} className={styles.card}>
							<div className={styles.preview} aria-hidden="true" />
							<h3 className={styles.cardTitle}>{project.title}</h3>
							<p className={styles.cardDescription}>{project.description}</p>
						</article>
					))}
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
