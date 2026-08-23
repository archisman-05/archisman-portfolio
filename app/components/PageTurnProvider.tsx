"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";

type PageTurnContextType = {
  navigateWithPageTurn: (href: string) => void;
  isTurning: boolean;
};

const PageTurnContext = createContext<PageTurnContextType | null>(null);

export function PageTurnProvider({
  children,
}: {
  children: ReactNode;
}) {
  const router = useRouter();

  const [isTurning, setIsTurning] = useState(false);

  const navigateTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const finishTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const navigateWithPageTurn = (href: string) => {
  if (isTurning || !href) return;

  // Start loading the next page immediately
  router.prefetch(href);

  setIsTurning(true);

  // Change route while the paper is still covering the screen
  window.setTimeout(() => {
    router.push(href);
  }, 850);

  // Finish animation
  window.setTimeout(() => {
    setIsTurning(false);
  }, 2200);
};

  useEffect(() => {
    return () => {
      if (navigateTimer.current) {
        clearTimeout(navigateTimer.current);
      }

      if (finishTimer.current) {
        clearTimeout(finishTimer.current);
      }
    };
  }, []);

  return (
    <PageTurnContext.Provider
      value={{
        navigateWithPageTurn,
        isTurning,
      }}
    >
      {children}

      {isTurning && (
        <div className="newspaper-turn" aria-hidden="true">
          {/* Shadow over the page underneath */}
          <div className="newspaper-turn-shadow" />

          {/* Physical turning sheet */}
          <div className="newspaper-sheet">
            {/* FRONT SIDE */}
            <div className="newspaper-sheet-front">
              <div className="newspaper-texture" />
              <div className="paper-light" />
            </div>

            {/* BACK SIDE */}
            <div className="newspaper-sheet-back">
              <div className="newspaper-texture" />
              <div className="paper-back-shadow" />
            </div>

            {/* Moving fold shadow */}
            <div className="paper-fold-shadow" />
          </div>
        </div>
      )}

      <style jsx global>{`
        /* =========================================
           NEWSPAPER PAGE TURN OVERLAY
        ========================================= */

        .newspaper-turn {
          position: fixed;
          inset: 0;
          z-index: 999999;
          overflow: hidden;
          pointer-events: none;

          perspective: 1800px;
          perspective-origin: 50% 50%;
        }

        /* =========================================
           SHADOW CAST ON PAGE BELOW
        ========================================= */

        .newspaper-turn-shadow {
          position: absolute;
          inset: 0;

          background: linear-gradient(
            90deg,
            rgba(0, 0, 0, 0.3),
            rgba(0, 0, 0, 0.1) 35%,
            transparent 75%
          );

          opacity: 0;

          animation: underShadow 2.2s ease-in-out forwards;
        }

        /* =========================================
           MAIN PAPER SHEET
        ========================================= */

        .newspaper-sheet {
          position: absolute;
          inset: 0;

          width: 100%;
          height: 100%;

          transform-origin: left center;
          transform-style: preserve-3d;

          will-change: transform;

          animation: newspaperTurn 2.2s
            cubic-bezier(0.72, 0.02, 0.18, 1)
            forwards;
        }

        /* =========================================
           FRONT + BACK PAPER
        ========================================= */

        .newspaper-sheet-front,
        .newspaper-sheet-back {
          position: absolute;
          inset: 0;

          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }

        /* FRONT */

        .newspaper-sheet-front {
          background: var(--paper);

          box-shadow:
            30px 0 80px rgba(0, 0, 0, 0.32),
            inset -20px 0 40px rgba(0, 0, 0, 0.07);

          transform: translateZ(1px);
        }

        /* BACK */

        .newspaper-sheet-back {
          transform: rotateY(180deg) translateZ(1px);

          background:
            linear-gradient(
              90deg,
              rgba(0, 0, 0, 0.13),
              transparent 35%,
              rgba(255, 255, 255, 0.04)
            ),
            var(--paper);

          box-shadow:
            inset 30px 0 55px rgba(0, 0, 0, 0.14);
        }

        /* =========================================
           PAPER TEXTURE
        ========================================= */

        .newspaper-texture {
          position: absolute;
          inset: 0;

          opacity: 0.12;

          background:
            repeating-linear-gradient(
              0deg,
              transparent 0px,
              transparent 4px,
              rgba(0, 0, 0, 0.025) 5px
            );

          pointer-events: none;
        }

        /* =========================================
           LIGHT MOVING ACROSS FOLD
        ========================================= */

        .paper-light {
          position: absolute;
          inset: 0;

          background: linear-gradient(
            90deg,
            transparent 15%,
            rgba(255, 255, 255, 0.32) 48%,
            transparent 78%
          );

          opacity: 0;

          pointer-events: none;

          animation: paperLightMove 2.2s ease-in-out forwards;
        }

        /* =========================================
           BACKSIDE SHADOW
        ========================================= */

        .paper-back-shadow {
          position: absolute;
          inset: 0;

          background: linear-gradient(
            90deg,
            rgba(0, 0, 0, 0.2),
            transparent 45%
          );

          pointer-events: none;
        }

        /* =========================================
           FOLD SHADOW
        ========================================= */

        .paper-fold-shadow {
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;

          width: 28%;

          background: linear-gradient(
            90deg,
            transparent,
            rgba(0, 0, 0, 0.42)
          );

          opacity: 0;

          transform-origin: right center;

          pointer-events: none;

          animation: foldShadow 2.2s ease-in-out forwards;
        }

        /* =========================================
           REAL PAPER TURN
        ========================================= */

        @keyframes newspaperTurn {
          0% {
            transform:
              rotateY(0deg)
              rotateZ(0deg)
              translateX(0);

            opacity: 1;
          }

          /* Paper begins lifting */

          10% {
            transform:
              rotateY(-3deg)
              rotateZ(0.1deg)
              translateX(0);

            opacity: 1;
          }

          /* Initial physical bend */

          25% {
            transform:
              rotateY(-18deg)
              rotateZ(0.25deg)
              translateX(0.5%);

            opacity: 1;
          }

          /* Paper now covers most of old page */

          38% {
            transform:
              rotateY(-42deg)
              rotateZ(0.4deg)
              translateX(1.5%);

            opacity: 1;
          }

          /* Route has changed by this point */

          52% {
            transform:
              rotateY(-82deg)
              rotateZ(-0.25deg)
              translateX(3%);

            opacity: 1;
          }

          /* Back of paper starts appearing */

          68% {
            transform:
              rotateY(-125deg)
              rotateZ(-0.2deg)
              translateX(5%);

            opacity: 1;
          }

          84% {
            transform:
              rotateY(-165deg)
              rotateZ(0deg)
              translateX(8%);

            opacity: 1;
          }

          /* New page is revealed */

          100% {
            transform:
              rotateY(-180deg)
              rotateZ(0deg)
              translateX(12%);

            opacity: 0;
          }
        }

        /* =========================================
           UNDER PAGE SHADOW
        ========================================= */

        @keyframes underShadow {
          0% {
            opacity: 0;
          }

          20% {
            opacity: 0.5;
          }

          45% {
            opacity: 0.75;
          }

          75% {
            opacity: 0.3;
          }

          100% {
            opacity: 0;
          }
        }

        /* =========================================
           LIGHT MOVEMENT
        ========================================= */

        @keyframes paperLightMove {
          0% {
            opacity: 0;
            transform: translateX(-60%);
          }

          20% {
            opacity: 0.25;
          }

          42% {
            opacity: 0.75;
            transform: translateX(-10%);
          }

          65% {
            opacity: 0.5;
            transform: translateX(35%);
          }

          100% {
            opacity: 0;
            transform: translateX(110%);
          }
        }

        /* =========================================
           FOLD SHADOW MOVEMENT
        ========================================= */

        @keyframes foldShadow {
          0% {
            opacity: 0;
            transform: scaleX(0.4);
          }

          20% {
            opacity: 0.35;
          }

          42% {
            opacity: 0.85;
            transform: scaleX(1);
          }

          68% {
            opacity: 0.55;
            transform: scaleX(1.3);
          }

          100% {
            opacity: 0;
            transform: scaleX(0.7);
          }
        }

        /* =========================================
           MOBILE
        ========================================= */

        @media (max-width: 768px) {
          .newspaper-turn {
            perspective: 1100px;
          }

          .newspaper-sheet {
            width: 108%;
          }

          .paper-fold-shadow {
            width: 35%;
          }
        }

        /* =========================================
           REDUCED MOTION
        ========================================= */

        @media (prefers-reduced-motion: reduce) {
          .newspaper-sheet,
          .newspaper-turn-shadow,
          .paper-light,
          .paper-fold-shadow {
            animation-duration: 0.45s !important;
          }
        }
      `}</style>
    </PageTurnContext.Provider>
  );
}

export function usePageTurn() {
  const context = useContext(PageTurnContext);

  if (!context) {
    throw new Error(
      "usePageTurn must be used inside PageTurnProvider"
    );
  }

  return context;
}