"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Navbar.module.css';

export default function Navbar() {
    const pathname = usePathname();

    return (
        <header className={styles.navbar}>
            <nav>
                <ul className={styles.navLinks}>
                    <li><Link href="/" className={pathname === '/' ? styles.active : ''}>HOME</Link></li>
                    <li><Link href="/work" className={pathname === '/work' ? styles.active : ''}>WORK</Link></li>
                    <li><Link href="/about" className={pathname === '/about' ? styles.active : ''}>ABOUT</Link></li>
                    <li><Link href="/contact" className={pathname === '/contact' ? styles.active : ''}>CONTACT</Link></li>
                </ul>
            </nav>
        </header>
    );
}
