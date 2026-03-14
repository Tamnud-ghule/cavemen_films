"use client";

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import styles from './page.module.css'

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
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
          transition={{ duration: 1 }}
        >
          <img
            src="/cavemen.svg"
            alt="Cavemen"
            className={styles.imageCavemen}
          />
          <img
            src="/films.svg"
            alt="Films"
            className={styles.imageFilms}
          />
        </motion.div>
      </div>
    </main>
  )
}

