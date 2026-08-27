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
    id: "business-operations-system",
    number: "01",
    listTitle: "Business Operations System",
    listSubtitle: "Manage your daily operations",
    detailTitle: "Business Operations System",
    detailTagline: "Manage your daily operations",
    price: "\u20b120,000",
    description:
      "A centralized system for organizing business records, tasks, staff activity, and daily operations in one place.",
    features: [
      "Custom Admin Dashboard",
      "Task and Record Management",
      "Single Admin Account",
      "Basic Activity Summary",
      "Responsive Interface",
      "System Security Setup",
    ],
  },
  {
    id: "inventory-management-system",
    number: "02",
    listTitle: "Inventory Management System",
    listSubtitle: "Track stock with confidence",
    detailTitle: "Inventory Management System",
    detailTagline: "Track stock with confidence",
    price: "\u20b120,000",
    description:
      "A dedicated system for managing products, monitoring stock levels, and keeping inventory records organized.",
    features: [
      "Product Catalog Management",
      "Stock Level Tracking",
      "Low Stock Alerts",
      "Basic Admin Dashboard",
      "Single User Access",
      "System Security Setup",
    ],
  },
  {
    id: "ecommerce-website",
    number: "03",
    listTitle: "E-commerce Website",
    listSubtitle: "Sell your products online",
    detailTitle: "E-commerce Website",
    detailTagline: "Sell your products online",
    price: "\u20b155,000",
    description:
      "A complete online store where customers can browse, order, and pay while your business manages products and orders more efficiently.",
    features: [
      "Unlimited Product Listings",
      "Customer Accounts",
      "Inventory Management",
      "Promo and Discount System",
      "Live Chat Integration",
      "SEO Product Setup",
    ],
  },
  {
    id: "portfolio-website",
    number: "04",
    listTitle: "Portfolio Website",
    listSubtitle: "Showcase your work online",
    detailTitle: "Portfolio Website",
    detailTagline: "Showcase your work online",
    price: "\u20b110,000",
    description:
      "A clean professional website for presenting your work, services, or business to potential clients and partners.",
    features: [
      "Custom One-Page Design",
      "Up to 5 Sections",
      "Contact Form",
      "Mobile Responsive Design",
      "Basic SEO Setup",
      "Website Security Setup",
    ],
  },
  {
    id: "digital-invitation-website",
    number: "05",
    listTitle: "Digital Invitation Website",
    listSubtitle: "Make your event easy to share",
    detailTitle: "Digital Invitation Website",
    detailTagline: "Make your event easy to share",
    price: "\u20b15,000",
    description:
      "A personalized online invitation that brings your event details together in one accessible and mobile-friendly page.",
    features: [
      "Custom One-Page Invitation Design",
      "Event Details Section",
      "List of Attendees",
      "Mobile Responsive Design",
      "1 Revision Round",
    ],
  },
  {
    id: "branding-creative-design",
    number: "06",
    listTitle: "Branding and Creative Design",
    listSubtitle: "Build a consistent brand identity",
    detailTitle: "Branding and Creative Design",
    detailTagline: "Build a consistent brand identity",
    price: "\u20b13,000",
    description:
      "A creative package that helps your business build a professional and consistent identity across its essential brand materials.",
    features: [
      "Logo Design",
      "Brand Color Palette",
      "Typography Selection",
      "Social Media Profile Kit",
      "1 Revision Round",
    ],
  },
  {
    id: "system-maintenance-care-plan",
    number: "07",
    listTitle: "System Maintenance and Care Plan",
    listSubtitle: "Keep your website running smoothly",
    detailTitle: "System Maintenance and Care Plan",
    detailTagline: "Keep your website running smoothly",
    price: "\u20b11,500 / Monthly | \u20b115,000 / Yearly",
    description:
      "Ongoing website support that handles common technical issues and helps keep your delivered system reliable.",
    features: [
      "Bug Fixes",
      "Password Resets",
      "Scope-Related Fixes",
      "Database Issue Resolution",
      "Login and Authentication Fixes",
      "Minor UI Fixes",
    ],
  },
];

export default function WhatWeDo() {
  const [activeIndex, setActiveIndex] = useState(0);
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
            Seven focused services built to cover every dimension of your digital
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
                  <span className={styles.listSubtitle}>
                    {service.listSubtitle}
                  </span>
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

            <p className={styles.detailDescription}>
              {activeService.description}
            </p>

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
