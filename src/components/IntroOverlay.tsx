"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./IntroOverlay.module.css";
import FramePlayer from "./FramePlayer";

const INTRO_PLAYED_KEY = "cavemen_intro_played";

export default function IntroOverlay() {
    const [phase, setPhase] = useState<"waiting" | "playing" | "fading" | "done">("waiting");

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
                initial={{ opacity: 1 }}
                animate={{ opacity: phase === "fading" ? 0 : 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                onAnimationComplete={() => {
                    if (phase === "fading") handleFadeComplete();
                }}
                onClick={() => phase === "waiting" && setPhase("playing")}
                style={{ cursor: phase === "waiting" ? "pointer" : "default" }}
            >
                {phase === "waiting" ? (
                    <motion.div
                        className={styles.clickPrompt}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        click anywhere to enter...
                    </motion.div>
                ) : (
                    <FramePlayer
                        onFadeStart={() => setPhase("fading")}
                        onComplete={() => { }}
                    />
                )}
            </motion.div>
        </AnimatePresence>
    );
}
