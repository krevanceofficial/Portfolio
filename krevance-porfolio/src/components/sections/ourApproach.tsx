import type { ComponentType, SVGProps } from "react";
import { ClipboardList, Code, Ear, PenTool, Rocket } from "lucide-react";
import styles from "../../styles/ourApproach.module.css";

type IconType = ComponentType<SVGProps<SVGSVGElement>>;

interface StepItem {
	id: string;
	number: string;
	title: string;
	tag: string;
	Icon: IconType;
}

const STEPS: StepItem[] = [
	{
		id: "listen",
		number: "01",
		title: "We Listen First",
		tag: "Discovery & Goals",
		Icon: Ear,
	},
	{
		id: "homework",
		number: "02",
		title: "We Do The Homework",
		tag: "Research & Strategy",
		Icon: ClipboardList,
	},
	{
		id: "make-it-yours",
		number: "03",
		title: "We Make It Yours",
		tag: "UI & Brand Identity",
		Icon: PenTool,
	},
	{
		id: "build-right",
		number: "04",
		title: "We Build It Right",
		tag: "Build & Engineering",
		Icon: Code,
	},
	{
		id: "launch",
		number: "05",
		title: "We Launch Together",
		tag: "QA & Deployment",
		Icon: Rocket,
	},
];

export default function OurApproach() {
	return (
		<section className={styles.section}>
			<div className={styles.inner}>
				<div className={styles.header}>
					<div className={styles.headerLeft}>
						<p className={styles.eyebrow}>Process</p>
						<h2 className={styles.title}>Our Approach</h2>
					</div>
					<p className={styles.subtitle}>
						With a clear five-step method, Krevance ensures every project
						moves from concept to launch with precision.
					</p>
				</div>

				<div className={styles.steps}>
					{STEPS.map((step) => (
						<article key={step.id} className={styles.step}>
							<div className={styles.stepHeader}>
								<span className={styles.stepBadge}>{step.number}</span>
								<step.Icon className={styles.stepIcon} aria-hidden="true" />
							</div>
							<h3 className={styles.stepTitle}>{step.title}</h3>
							<p className={styles.stepTag}>{step.tag}</p>
						</article>
					))}
				</div>
			</div>
		</section>
	);
}
