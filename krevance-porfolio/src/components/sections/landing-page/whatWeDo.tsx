"use client";

import { useState } from "react";
import styles from "../../../styles/whatWeDo.module.css";

interface ServiceItem {
  id: string;
  number: string;
  listTitle: string;
  listSubtitle: string;
  detailTitle: string;
  detailTagline: string;
  price: string;
  description: string;
  features: string[];
}

const SERVICES: ServiceItem[] = [
  {
    id: "app-dev",
    number: "01",
    listTitle: "Application Development",
    listSubtitle: "Build powerful, scalable apps",
    detailTitle: "Application Development",
    detailTagline: "Build powerful, scalable apps",
    price: "P25,000",
    description:
      "We design and build reliable applications that scale with your business needs. Every feature is engineered for speed, clarity, and long-term growth.",
    features: [
      "Product discovery",
      "UI and UX design",
      "App development",
      "Testing and QA",
      "Launch support",
      "Ongoing maintenance",
    ],
  },
  {
    id: "graphic-design",
    number: "02",
    listTitle: "Graphic Design & Layout",
    listSubtitle: "Visual identity that speaks louder",
    detailTitle: "Graphic Design & Layout",
    detailTagline: "Visual identity that speaks louder",
    price: "P20,000",
    description:
      "From brand identities to marketing collateral, we craft compelling visuals that communicate your story. Every pixel is purposeful - designed to leave a lasting impression.",
    features: [
      "Brand identity & logo design",
      "Social media graphics",
      "Illustration & visual assets",
      "Print & digital collateral",
      "Packaging & merchandise",
      "Layout systems",
    ],
  },
  {
    id: "website-services",
    number: "03",
    listTitle: "Website & Digital Services",
    listSubtitle: "Your complete digital presence",
    detailTitle: "Website & Digital Services",
    detailTagline: "Your complete digital presence",
    price: "P30,000",
    description:
      "We build modern websites that look great and perform even better. From launch to optimization, we cover every piece of your online presence.",
    features: [
      "Responsive web design",
      "Custom development",
      "SEO setup",
      "Analytics integration",
      "Content support",
      "Performance tuning",
    ],
  },
  {
    id: "web-invitation",
    number: "04",
    listTitle: "Web-Based Invitation",
    listSubtitle: "Unforgettable digital invites",
    detailTitle: "Web-Based Invitation",
    detailTagline: "Unforgettable digital invites",
    price: "P8,000",
    description:
      "Elevate your events with interactive, elegant invitations that guests will remember. Built for any screen with RSVP tools included.",
    features: [
      "Custom event pages",
      "RSVP system",
      "Guest management",
      "Mobile friendly design",
      "Shareable links",
      "Live updates",
    ],
  },
  {
    id: "website-maintenance",
    number: "05",
    listTitle: "Website Maintenance",
    listSubtitle: "Always on, always optimized",
    detailTitle: "Website Maintenance",
    detailTagline: "Always on, always optimized",
    price: "P5,000",
    description:
      "Keep your site secure, fast, and up to date. We handle updates, monitoring, and fixes so you stay focused on growth.",
    features: [
      "Routine updates",
      "Security monitoring",
      "Backups",
      "Bug fixes",
      "Uptime checks",
      "Content tweaks",
    ],
  },
];

export default function WhatWeDo() {
  const [activeIndex, setActiveIndex] = useState(1);
  const activeService = SERVICES[activeIndex];

  return (
    <section id="services" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <div>
            <p className={styles.eyebrow}>Services</p>
            <h2 className={styles.title}>What We Do?</h2>
          </div>
          <p className={styles.headerNote}>
            Five focused services built to cover every dimension of your digital
            growth - from first idea to long-term success.
          </p>
        </div>

        <div className={styles.body}>
          <div className={styles.list}>
            {SERVICES.map((service, index) => (
              <button
                key={service.id}
                type="button"
                className={`${styles.listItem} ${
                  index === activeIndex ? styles.listItemActive : ""
                }`}
                onClick={() => setActiveIndex(index)}
              >
                <span className={styles.listNumber}>{service.number}</span>
                <span className={styles.listText}>
                  <span className={styles.listTitle}>{service.listTitle}</span>
                  <span className={styles.listSubtitle}>{service.listSubtitle}</span>
                </span>
                <span className={styles.listArrow}>&gt;</span>
              </button>
            ))}
          </div>

          <article className={styles.detailCard}>
            <div className={styles.detailHeader}>
              <span className={styles.detailIcon} aria-hidden="true" />
              <span className={styles.detailNumber}>{activeService.number}</span>
            </div>

            <h3 className={styles.detailTitle}>{activeService.detailTitle}</h3>
            <p className={styles.detailTagline}>{activeService.detailTagline}</p>

            <p className={styles.detailPriceLabel}>Starts at</p>
            <p className={styles.detailPrice}>{activeService.price}</p>

            <p className={styles.detailDescription}>{activeService.description}</p>

            <div className={styles.detailFeatures}>
              {activeService.features.map((feature) => (
                <div key={feature} className={styles.detailFeature}>
                  <span className={styles.featureDot} aria-hidden="true" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            <button type="button" className={styles.detailButton}>
              Get Started
              <span className={styles.detailButtonArrow}>&gt;</span>
            </button>
          </article>
        </div>
      </div>
    </section>
  );
}