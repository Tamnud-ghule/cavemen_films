import Image from 'next/image'
import styles from './page.module.css'

export default function Home() {
  return (
    <main className={styles.main}>

      <div className={styles.content}>
        <div className={styles.titleContainer}>
          <Image
            src="/cavemen.svg"
            alt="Cavemen"
            width={600}
            height={200}
            className={styles.imageCavemen}
            priority
          />
          <Image
            src="/films.svg"
            alt="Films"
            width={400}
            height={150}
            className={styles.imageFilms}
            priority
          />
        </div>
      </div>
    </main>
  )
}

