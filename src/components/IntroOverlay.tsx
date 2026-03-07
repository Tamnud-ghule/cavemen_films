"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./IntroOverlay.module.css";

const INTRO_PLAYED_KEY = "cavemen_intro_played";

export default function IntroOverlay() {
    const [phase, setPhase] = useState<"playing" | "fading" | "done">("playing");
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (sessionStorage.getItem(INTRO_PLAYED_KEY)) {
            setPhase("done");
            window.dispatchEvent(new CustomEvent("introComplete"));
        }
    }, []);

    const handleTimeUpdate = () => {
        if (videoRef.current && videoRef.current.currentTime >= 5 && phase === "playing") {
            videoRef.current.pause();
            setPhase("fading");
        }
    };

    const handleFadeComplete = () => {
        sessionStorage.setItem(INTRO_PLAYED_KEY, "true");
        setPhase("done");
        window.dispatchEvent(new CustomEvent("introComplete"));
    };

    if (phase === "done") return null;

    return (
        <AnimatePresence>
            <motion.div
                className={styles.overlay}
                key="intro-overlay"
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
            >
                <video
                    ref={videoRef}
                    className={styles.introVideo}
                    autoPlay
                    muted
                    playsInline
                    onTimeUpdate={handleTimeUpdate}
                >
                    <source src="/cavemenintro.mp4" type="video/mp4" />
                </video>

                <AnimatePresence>
                    {phase === "fading" && (
                        <motion.div
                            key="fade-black"
                            className={styles.fadeToBlack}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1.2, ease: "easeInOut" }}
                            onAnimationComplete={handleFadeComplete}
                        />
                    )}
                </AnimatePresence>
            </motion.div>
        </AnimatePresence>
    );
}
