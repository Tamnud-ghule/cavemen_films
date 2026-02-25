"use client";

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import localFont from 'next/font/local'
import styles from './page.module.css'

export default function Home() {
  const [isMuted, setIsMuted] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    // Attempt to autoplay audio. Browsers often block this unless muted or after interaction.
    if (audioRef.current) {
      audioRef.current.play().catch(error => {
        console.log("Audio autoplay blocked by browser. User interaction required:", error)
      })
    }
  }, [])

  const toggleMute = () => {
    if (audioRef.current) {
      const newMutedState = !isMuted;
      audioRef.current.muted = newMutedState;
      setIsMuted(newMutedState);

      // If unmuting and it's paused (like after an autoplay block), try playing again
      if (!newMutedState && audioRef.current.paused) {
        audioRef.current.play().catch(e => console.error("Playback failed:", e))
      }
    }
  }

  return (
    <main className={styles.main}>
      <audio
        ref={audioRef}
        src="/bonfire.mp3"
        loop
        autoPlay
        muted={isMuted}
      />

      <button
        onClick={toggleMute}
        className={styles.audioControls}
        aria-label={isMuted ? "Unmute sound" : "Mute sound"}
      >
        {isMuted ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path><path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path></svg>
        )}
      </button>
      <video
        autoPlay
        loop
        muted
        playsInline
        className={styles.backgroundVideo}
      >
        <source src="/background.mp4" type="video/mp4" />
      </video>
      <div className={styles.videoOverlay} />
      <div className={styles.glassMorphism} />

      <header className={styles.navbar}>
        <nav>
          <ul className={styles.navLinks}>
            <li><a href="#work">WORK</a></li>
            <li><a href="#about">ABOUT</a></li>
            <li><a href="#contact">CONTACT</a></li>
          </ul>
        </nav>
      </header>

      <div className={styles.content}>
        <div className={styles.titleContainer}>
          <Image
            src="/cavemen.svg"
            alt="Cavemen"
            width={600}
            height={200}
            className={styles.imageCavemen}
            priority
          />
          <Image
            src="/films.svg"
            alt="Films"
            width={400}
            height={150}
            className={styles.imageFilms}
            priority
          />
        </div>
      </div>
    </main>
  )
}

