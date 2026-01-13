'use client';

import { motion, Variants, useInView } from 'framer-motion';
import { useRef, ReactNode } from 'react';

// FIX: Explicitly type as a Tuple of 4 numbers
const TECH_EASE: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  distance?: number;
}

export function AnimatedSection({
  children,
  className = "",
  delay = 0,
  direction = 'up',
  distance = 30
}: AnimatedSectionProps) {

  const getDirectionOffset = () => {
    switch (direction) {
      case 'up': return { y: distance };
      case 'down': return { y: -distance };
      case 'left': return { x: distance };
      case 'right': return { x: -distance };
      case 'none': return {};
      default: return { y: distance };
    }
  };

  const variants: Variants = {
    hidden: {
      opacity: 0,
      ...getDirectionOffset(),
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        duration: 0.6,
        ease: TECH_EASE, // Now this works
        delay: delay
      }
    }
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ------------------------------------------------------------------
// Stagger System
// ------------------------------------------------------------------

export function StaggerContainer({
  children,
  className = "",
  staggerDelay = 0.08,
  delayChildren = 0
}: {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
    delayChildren?: number;
}) {
  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delayChildren,
      }
    }
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-50px" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className = ""
}: {
  children: ReactNode;
  className?: string;
}) {
  const item: Variants = {
    hidden: { opacity: 0, y: 15 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: TECH_EASE // Now this works
      }
    }
  };

  return (
    <motion.div variants={item} className={className}>
      {children}
    </motion.div>
  );
}

// ------------------------------------------------------------------
// Scale In
// ------------------------------------------------------------------

export function ScaleIn({
  children,
  className = "",
  delay = 0
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.5,
        ease: TECH_EASE, // Now this works
        delay
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ------------------------------------------------------------------
// Reveal Text
// ------------------------------------------------------------------

export function RevealText({
  text,
  className = "",
  delay = 0
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-20px" });

  return (
    <span ref={ref} className={`inline-block overflow-hidden align-bottom ${className}`}>
      <motion.span
        initial={{ y: "100%" }}
        animate={isInView ? { y: 0 } : { y: "100%" }}
        transition={{
          duration: 0.7,
          ease: [0.33, 1, 0.68, 1],
          delay
        }}
        className="inline-block"
      >
        {text}
      </motion.span>
    </span>
  );
}