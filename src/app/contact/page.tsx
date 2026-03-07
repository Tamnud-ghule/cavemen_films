import styles from './page.module.css';

export default function ContactPage() {
    return (
        <main className={styles.main}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h1 className={styles.title}>Contact</h1>
                    <p className={styles.subtitle}>Let's build something extraordinary together.</p>
                </div>

                <div className={styles.layout}>
                    <div className={styles.infoPanel}>
                        <div className={styles.infoBlock}>
                            <h3>Studio</h3>
                            <p>123 Cinematic Way</p>
                            <p>Creative District</p>
                            <p>Los Angeles, CA 90028</p>
                        </div>
                        <div className={styles.infoBlock}>
                            <h3>Connect</h3>
                            <p><a href="mailto:hello@cavemenfilms.com">hello@cavemenfilms.com</a></p>
                            <p><a href="tel:+15551234567">+1 (555) 123-4567</a></p>
                        </div>
                        <div className={styles.infoBlock}>
                            <h3>Socials</h3>
                            <div className={styles.socialLinks}>
                                <a href="#">Instagram</a>
                                <a href="#">Vimeo</a>
                                <a href="#">Twitter</a>
                            </div>
                        </div>
                    </div>

                    <div className={styles.formPanel}>
                        <form className={styles.form}>
                            <div className={styles.formGroup}>
                                <label htmlFor="name">Name</label>
                                <input type="text" id="name" placeholder="Your name" required />
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="email">Email</label>
                                <input type="email" id="email" placeholder="Your email address" required />
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="subject">Subject</label>
                                <input type="text" id="subject" placeholder="What is this regarding?" required />
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="message">Message</label>
                                <textarea id="message" rows={5} placeholder="Tell us about your project..." required></textarea>
                            </div>
                            <button type="submit" className={styles.submitBtn}>
                                <span>Send Message</span>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
}
