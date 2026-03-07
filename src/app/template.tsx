"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Template({ children }: { children: React.ReactNode }) {
    const [introComplete, setIntroComplete] = useState(false);
    const [shouldAnimate, setShouldAnimate] = useState(false);

    useEffect(() => {
        // If intro already played this session, animate immediately
        if (sessionStorage.getItem("cavemen_intro_played")) {
            setIntroComplete(true);
            setShouldAnimate(true);
            return;
        }

        // Otherwise wait for the intro to finish
        const handleIntroComplete = () => {
            setIntroComplete(true);
            // Small delay so the black-to-content transition feels intentional
            setTimeout(() => setShouldAnimate(true), 100);
        };
        window.addEventListener("introComplete", handleIntroComplete);
        return () => window.removeEventListener("introComplete", handleIntroComplete);
    }, []);

    // While intro is playing, render children but keep them invisible
    if (!introComplete) {
        return <div style={{ opacity: 0 }}>{children}</div>;
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={shouldAnimate ? { opacity: 1 } : { opacity: 0 }}
            transition={{ ease: "easeInOut", duration: 1.5 }}
        >
            {children}
        </motion.div>
    );
}
