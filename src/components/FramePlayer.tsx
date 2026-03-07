"use client";

import { useEffect, useRef } from "react";
import styles from "./IntroOverlay.module.css";

interface FramePlayerProps {
    onComplete: () => void;
    onFadeStart: () => void;
}

export default function FramePlayer({ onComplete, onFadeStart }: FramePlayerProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const frameCount = 66;

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;
        let isCancelled = false;

        const updateSize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        updateSize();
        window.addEventListener("resize", updateSize);

        const images: HTMLImageElement[] = [];
        let loaded = 0;
        let pRequested = false;

        const drawImageCover = (img: HTMLImageElement) => {
            if (!ctx || !canvas) return;
            const canvasRatio = canvas.width / canvas.height;
            const imgRatio = img.width / img.height;
            let drawWidth = canvas.width;
            let drawHeight = canvas.height;
            let offsetX = 0;
            let offsetY = 0;

            if (canvasRatio > imgRatio) {
                drawHeight = canvas.width / imgRatio;
                offsetY = (canvas.height - drawHeight) / 2;
            } else {
                drawWidth = canvas.height * imgRatio;
                offsetX = (canvas.width - drawWidth) / 2;
            }

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
        };

        const fps = 14;
        const frameInterval = 1000 / fps;
        let lastDrawTime = performance.now();
        let currentFrame = 0;

        const playFrames = (time: number) => {
            if (isCancelled) return;
            const deltaTime = time - lastDrawTime;

            if (deltaTime >= frameInterval) {
                if (currentFrame < frameCount) {
                    drawImageCover(images[currentFrame]);

                    if (currentFrame === 58) {
                        onFadeStart();
                    }

                    currentFrame++;
                    lastDrawTime = time - (deltaTime % frameInterval);
                } else {
                    onComplete();
                    return;
                }
            }
            animationFrameId = requestAnimationFrame(playFrames);
        };

        for (let i = 1; i <= frameCount; i++) {
            const img = new Image();
            img.src = `/frames_webp/ezgif-frame-${i.toString().padStart(3, "0")}.webp`;
            img.onload = () => {
                if (isCancelled) return;
                loaded++;
                // Start tracking progress visually by drawing the first frame immediately,
                // but only start animation when all or mostly all frames are loaded
                if (loaded === 1) {
                    drawImageCover(images[0]);
                }

                if (loaded === frameCount && !pRequested) {
                    pRequested = true;
                    lastDrawTime = performance.now();
                    animationFrameId = requestAnimationFrame(playFrames);
                }
            };
            images.push(img);
        }

        return () => {
            isCancelled = true;
            window.removeEventListener("resize", updateSize);
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
            }
        };
    }, [onComplete]);

    return <canvas ref={canvasRef} className={styles.introVideo} />;
}
