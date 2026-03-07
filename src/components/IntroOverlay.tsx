"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./IntroOverlay.module.css";
import FramePlayer from "./FramePlayer";

const INTRO_PLAYED_KEY = "cavemen_intro_played";

export default function IntroOverlay() {
    const [phase, setPhase] = useState<"playing" | "fading" | "done">("playing");

    useEffect(() => {
        if (sessionStorage.getItem(INTRO_PLAYED_KEY)) {
            setPhase("done");
            window.dispatchEvent(new CustomEvent("introComplete"));
        }
    }, []);

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
                <FramePlayer
                    onFadeStart={() => setPhase("fading")}
                    onComplete={() => { }}
                />

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
