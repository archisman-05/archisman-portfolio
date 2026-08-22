"use client";

import { useEffect, useRef, useState } from "react";

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMusicOpen, setIsMusicOpen] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    audio.volume = 0.25;

    const startMusic = async () => {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch {
        // Autoplay blocked by browser.
        // Music will attempt to start on first user interaction.
      }
    };

    startMusic();

    const startOnFirstInteraction = async () => {
      if (!audio.paused) return;

      try {
        await audio.play();
        setIsPlaying(true);
      } catch {
        // Browser still blocked playback.
      }
    };

    document.addEventListener(
      "click",
      startOnFirstInteraction,
      { once: true }
    );

    document.addEventListener(
      "touchstart",
      startOnFirstInteraction,
      { once: true }
    );

    document.addEventListener(
      "keydown",
      startOnFirstInteraction,
      { once: true }
    );

    return () => {
      document.removeEventListener(
        "click",
        startOnFirstInteraction
      );

      document.removeEventListener(
        "touchstart",
        startOnFirstInteraction
      );

      document.removeEventListener(
        "keydown",
        startOnFirstInteraction
      );
    };
  }, []);

  const toggleMusic = async () => {
    const audio = audioRef.current;

    if (!audio) return;

    try {
      if (audio.paused) {
        audio.volume = 0.25;

        await audio.play();

        setIsPlaying(true);
      } else {
        audio.pause();

        setIsPlaying(false);
      }
    } catch (error) {
      console.error("Unable to play music:", error);
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src="music/magiksolo-pirate-tavern-full-version-167990.mp3"
        loop
        preload="auto"
      />

      <div className="fixed bottom-5 left-5 z-[9999]">
        <div
          className={`flex items-center overflow-hidden border border-[var(--ink)] bg-[var(--paper)] shadow-[4px_4px_0_rgba(0,0,0,0.12)] transition-all duration-300 ${
            isMusicOpen
              ? "h-10 w-[240px] px-2"
              : "h-10 w-10 justify-center"
          }`}
        >
          {/* Main expand / collapse button */}
          <button
            type="button"
            onClick={() => setIsMusicOpen(!isMusicOpen)}
            aria-label={
              isMusicOpen
                ? "Close music controls"
                : "Open music controls"
            }
            className="flex h-9 w-9 shrink-0 items-center justify-center bg-transparent text-[var(--ink)] transition-transform duration-200 hover:scale-110 hover:!bg-transparent hover:!text-[var(--ink)]"
          >
            <span className="font-mono text-[11px] leading-none">
              {isMusicOpen ? "×" : "▶"}
            </span>
          </button>

          {/* Expanded controls */}
          <div
            className={`flex min-w-[185px] items-center gap-3 overflow-hidden transition-all duration-300 ${
              isMusicOpen
                ? "ml-2 translate-x-0 opacity-100"
                : "-translate-x-4 opacity-0"
            }`}
          >
            {/* Play / Pause */}
            <button
              type="button"
              onClick={toggleMusic}
              className="font-[var(--font-mono)] text-[9px] font-bold uppercase tracking-[0.18em] text-[var(--ink)] transition-opacity hover:opacity-60 hover:!bg-transparent hover:!text-[var(--ink)]"
            >
              {isPlaying ? "Pause" : "Play"}
            </button>

            {/* Divider */}
            <span className="h-4 w-px shrink-0 bg-[var(--ink)] opacity-30" />

            {/* Newspaper label */}
            <span className="font-[var(--font-mono)] text-[8px] uppercase tracking-[0.14em] text-[var(--ink-muted)]">
              Audio Archive
            </span>

            {/* Tiny equalizer */}
            {isPlaying && (
              <span className="ml-auto flex h-4 items-end gap-[2px]">
                <span className="music-bar h-2 w-[2px]" />
                <span className="music-bar music-bar-delay-1 h-4 w-[2px]" />
                <span className="music-bar music-bar-delay-2 h-3 w-[2px]" />
              </span>
            )}
          </div>
        </div>
      </div>
    </>
  );
}