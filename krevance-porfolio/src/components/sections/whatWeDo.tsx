'use client';

import { useState } from 'react';
import { Zen_Dots } from 'next/font/google';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import styles from '../../styles/whatWeDo.module.css';

const zenDots = Zen_Dots({
  weight: '400',
  subsets: ['latin'],
});

interface Service {
  id: string;
  name: string;
  description: string;
  price: string;
  features: string[];
}

const SERVICES_DATA: Service[] = [
  {
    id: 'app-dev',
    name: 'Application Development',
    price: '₱15,000',
    description: 'We believe great digital solutions are built when people collaborate, share ideas, and work toward a common goal.',
    features: [
      'Logo Design',
      'Color Palette',
      'Logo Design',
      'Color Palette',
      'Etc...',
    ],
  },
  {
    id: 'graphic-design',
    name: 'Graphic Design & Layout',
    price: '₱12,000',
    description: 'Professional visual design and layout services for all your branding needs with exceptional quality.',
    features: [
      'Brand Strategy',
      'Visual Design',
      'Layout Design',
      'Color Research',
      'Etc...',
    ],
  },
  {
    id: 'website-services',
    name: 'Website & Digital Services',
    price: '₱20,000',
    description: 'Complete website development and digital service solutions tailored to your business growth.',
    features: [
      'Web Design',
      'Development',
      'SEO Setup',
      'Analytics',
      'Etc...',
    ],
  },
  {
    id: 'web-invitation',
    name: 'Web-Based Invitation',
    price: '₱8,000',
    description: 'Interactive and elegant web-based invitation solutions for your special events and occasions.',
    features: [
      'Custom Design',
      'RSVP System',
      'Guest Management',
      'Responsive Design',
      'Etc...',
    ],
  },
  {
    id: 'website-maintenance',
    name: 'Website Maintenance',
    price: '₱5,000',
    description: 'Ongoing website maintenance and support to keep your digital presence running smoothly.',
    features: [
      'Regular Updates',
      'Security Monitoring',
      'Backup Services',
      'Support',
      'Etc...',
    ],
  },
];

export default function WhatWeDo() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? SERVICES_DATA.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === SERVICES_DATA.length - 1 ? 0 : prev + 1));
  };

  const getVisibleCards = () => {
    const cards = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % SERVICES_DATA.length;
      cards.push(SERVICES_DATA[index]);
    }
    return cards;
  };

  return (
    <section className={styles.whatWeDoSection}>
      <div className={styles.content}>
        <h1 className={`${zenDots.className} ${styles.title}`}>What We Do?</h1>

        <p className={styles.subtitle}>
          Every package is structured to deliver efficiency, creativity, and results that align
          with each client's goals.
        </p>

        {/* Carousel Container */}
        <div className={styles.carouselContainer}>
          <div className={styles.cardsWrapper}>
            {getVisibleCards().map((service) => (
              <div key={service.id} className={styles.cardWrapper}>
                <div className={styles.cardIcon}>
                  <svg viewBox="0 0 100 100" className={styles.hexagon}>
                    <polygon points="50,10 90,35 90,85 50,110 10,85 10,35" />
                  </svg>
                </div>

                <article className={styles.serviceCard}>
                  <h3 className={styles.cardTitle}>{service.name}</h3>

                <div className={styles.priceSection}>
                  <p className={styles.priceLabel}>Price starts @</p>
                  <p className={styles.priceValue}>{service.price}</p>
                </div>

                <p className={styles.cardDescription}>{service.description}</p>

                <ul className={styles.featuresList}>
                  {service.features.map((feature, idx) => (
                    <li key={idx} className={styles.featureItem}>
                      {feature}
                    </li>
                  ))}
                </ul>

                <button className={styles.selectButton} type="button">
                  <span>Select Service</span>
                  <span className={styles.arrow}>↗</span>
                </button>
                </article>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Controls */}
        <div className={styles.navigationControls}>
          <button
            className={styles.navButton}
            onClick={handlePrev}
            type="button"
            aria-label="Previous services"
          >
            <ChevronLeft size={24} />
          </button>

          <button
            className={styles.navButton}
            onClick={handleNext}
            type="button"
            aria-label="Next services"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </section>
  );
}
