"use client";

import { useState } from "react";
import styles from "../../../styles/whatWeDo.module.css";
import Link from "next/link";

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
    id: "system-development",
    number: "01",
    listTitle: "System Development",
    listSubtitle: "Build smarter business operations",
    detailTitle: "System Development",
    detailTagline: "Build smarter business operations",
    price: "₱15,000",
    description:
      "Create custom systems and web applications designed to simplify workflows, improve productivity and support business growth.",
    features: [
      "Custom web systems",
      "Admin dashboard",
      "User management",
      "Process automation",
      "Business reports",
      "Secure access",
    ],
  },
  {
    id: "ecommerce-solutions",
    number: "02",
    listTitle: "E-Commerce Solutions",
    listSubtitle: "Sell online with confidence",
    detailTitle: "E-Commerce Solutions",
    detailTagline: "Sell online with confidence",
    price: "₱50,000",
    description:
      "Complete online selling solutions with payment integration, inventory management, and customer-focused features.",
    features: [
      "Online payments",
      "Product management",
      "Inventory tracking",
      "Customer dashboard",
      "Sales reports",
      "Live chat support",
    ],
  },
  {
    id: "branding-creative",
    number: "03",
    listTitle: "Branding & Digital Creative",
    listSubtitle: "Build a brand people remember",
    detailTitle: "Branding & Digital Creative",
    detailTagline: "Build a brand people remember",
    price: "₱2,500",
    description:
      "Create a professional and consistent visual identity that strengthens your brand and builds customer trust.",
    features: [
      "Logo design",
      "Brand identity",
      "Color palette",
      "Typography selection",
      "Marketing materials",
      "Brand guidelines",
    ],
  },
  {
    id: "website-maintenance",
    number: "04",
    listTitle: "Website Maintenance & Care",
    listSubtitle: "Always online, always updated",
    detailTitle: "Website Maintenance & Care",
    detailTagline: "Always online, always updated",
    price: "₱3,000 / Month",
    description:
      "Keep your website secure, updated, and running smoothly while you focus on growing your business.",
    features: [
      "Website monitoring",
      "Security checks",
      "Backup management",
      "Content updates",
      "Technical support",
      "Performance maintenance",
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
            growth, from first idea to long-term success.
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

            <p className={styles.detailPriceLabel}>INVESTMENT STARTS AT</p>
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

            <Link href="/contactus" className={styles.detailButton}>
              Get Started
              <span className={styles.detailButtonArrow}>&gt;</span>
            </Link>
          </article>
        </div>
      </div>
    </section>
  );
}