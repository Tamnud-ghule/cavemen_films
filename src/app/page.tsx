"use client";

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import styles from './page.module.css'

export default function Home() {
  const [delay, setDelay] = useState(2);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const isMobile = typeof window !== 'undefined' ? window.matchMedia("(max-width: 768px)").matches : false;
    if (sessionStorage.getItem('cavemen_intro_played') || isMobile) {
      setDelay(0.2);
    }
    setIsVisible(true);
  }, []);

  if (!isVisible) return <main className={styles.main}></main>;

  return (
    <main className={styles.main}>

      <div className={styles.content}>
        <motion.div
          className={styles.titleContainer}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: delay }}
        >
          <motion.img
            src="/cavemen.svg"
            alt="Cavemen"
            className={styles.imageCavemen}
          />
          <motion.img
            src="/films.svg"
            alt="Films"
            className={styles.imageFilms}
          />
        </motion.div>
      </div>
    </main>
  )
}

