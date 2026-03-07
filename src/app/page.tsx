"use client";

import { motion } from 'framer-motion'
import Image from 'next/image'
import styles from './page.module.css'

export default function Home() {
  return (
    <main className={styles.main}>

      <div className={styles.content}>
        <motion.div
          className={styles.titleContainer}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
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

