"use client";

import { useState, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import styles from './Background.module.css';

export default function Background() {
    const pathname = usePathname();
    const [isMuted, setIsMuted] = useState(true);
    const audioRef = useRef<HTMLAudioElement>(null);
    const [introComplete, setIntroComplete] = useState(false);

    useEffect(() => {
        const checkDone = () => {
            const isMobile = window.matchMedia("(max-width: 768px)").matches;
            if (sessionStorage.getItem('cavemen_intro_played') || isMobile) {
                setIntroComplete(true);
            }
        };

        checkDone();
        window.addEventListener('resize', checkDone);
        
        const handleIntroComplete = () => setIntroComplete(true);
        window.addEventListener('introComplete', handleIntroComplete);
        return () => {
            window.removeEventListener('introComplete', handleIntroComplete);
            window.removeEventListener('resize', checkDone);
        };
    }, []);

    const toggleMute = () => {
        if (audioRef.current) {
            const newMutedState = !isMuted;
            audioRef.current.muted = newMutedState;
            setIsMuted(newMutedState);

            if (!newMutedState && audioRef.current.paused) {
                audioRef.current.play().catch(e => console.error("Playback failed:", e));
            }
        }
    };

    return (
        <>
            <audio
                ref={audioRef}
                src="/bonfire.mp3"
                loop
                autoPlay
                muted={isMuted}
            />

            <button
                onClick={toggleMute}
                className={`${styles.audioControls} ${introComplete ? styles.visible : styles.hidden}`}
                aria-label={isMuted ? "Unmute sound" : "Mute sound"}
            >
                {isMuted ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path><path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path></svg>
                )}
            </button>

            <div className={`${styles.bgWrapper} ${introComplete ? styles.bgVisible : styles.bgHidden}`}>
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className={`${styles.backgroundVideo} ${styles.desktopVideo}`}
                >
                    <source src="/background.mp4" type="video/mp4" />
                </video>
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className={`${styles.backgroundVideo} ${styles.mobileVideo}`}
                >
                    <source src="/mobile_view.mp4" type="video/mp4" />
                </video>
                <div className={styles.videoOverlay} />
                <div className={styles.glassMorphism} />
            </div>
        </>
    );
}
