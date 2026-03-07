import styles from './page.module.css';

export default function AboutPage() {
    return (
        <main className={styles.main}>
            <div className={styles.container}>
                <div className={styles.panel}>
                    <div className={styles.imageSection}>
                        <div className={styles.imagePlaceholder}>
                            <div className={styles.placeholderIcon}>CF</div>
                        </div>
                    </div>
                    <div className={styles.textSection}>
                        <h1 className={styles.title}>About Us</h1>
                        <h2 className={styles.subtitle}>Raw. Authentic. Uncompromising.</h2>
                        <div className={styles.content}>
                            <p>
                                We are <strong>Cavemen Films</strong>, a creative studio dedicated to crafting visually stunning narratives that leave a lasting impact. Born from a passion for cinematic storytelling, we specialize in high-end commercials, thought-provoking documentaries, and bold narrative films.
                            </p>
                            <p>
                                Our philosophy is simple: strip away the unnecessary and focus on the core emotion. In a digital world overflowing with noise, we believe in the power of striking visuals and genuine human connection. We bring the fire back to filmmaking.
                            </p>
                        </div>
                        <div className={styles.statsRow}>
                            <div className={styles.statLine}>
                                <span className={styles.statNumber}>10+</span>
                                <span className={styles.statLabel}>Years Active</span>
                            </div>
                            <div className={styles.statLine}>
                                <span className={styles.statNumber}>150</span>
                                <span className={styles.statLabel}>Projects Delivered</span>
                            </div>
                            <div className={styles.statLine}>
                                <span className={styles.statNumber}>12</span>
                                <span className={styles.statLabel}>Awards Won</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
