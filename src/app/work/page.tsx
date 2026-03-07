import styles from './page.module.css';

const projects = [
    { id: 1, title: 'Neon Shadows', category: 'Narrative Short' },
    { id: 2, title: 'Echoes of the North', category: 'Documentary' },
    { id: 3, title: 'Velvet', category: 'Music Video' },
    { id: 4, title: 'Apex Horizon', category: 'Commercial' },
    { id: 5, title: 'The Last Ember', category: 'Feature Film' },
    { id: 6, title: 'Urban Pulse', category: 'Brand Anthem' },
];

export default function WorkPage() {
    return (
        <main className={styles.main}>
            <div className={styles.container}>
                <h1 className={styles.title}>Our Work</h1>
                <div className={styles.grid}>
                    {projects.map((project) => (
                        <div key={project.id} className={styles.card}>
                            <div className={styles.cardImage}>
                                <div className={styles.overlay} />
                            </div>
                            <div className={styles.cardContent}>
                                <h2>{project.title}</h2>
                                <p>{project.category}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
