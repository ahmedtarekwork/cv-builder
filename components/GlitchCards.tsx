"use client";

// nextjs
import Image from "next/image";

// react
import { useState, useEffect } from "react";

const cards = [
  {
    id: 1,
    imgSrc: "/landing illustrations/hire.svg",
  },
  {
    id: 2,
    imgSrc: "/landing illustrations/folder.svg",
  },
  {
    id: 3,
    imgSrc: "/landing illustrations/online-resume.svg",
  },
];

const GlitchCards = () => {
  // State to keep track of the currently displayed card index
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  // State to control when the glitch animation is active
  const [isGlitching, setIsGlitching] = useState(false);

  // Constants for animation timing
  const displayDuration = 2000; // Time a card is fully visible (2 seconds)
  const glitchDuration = 300; // Duration of the glitch animation (0.3 seconds)

  // useEffect hook to manage the animation cycle
  useEffect(() => {
    let displayTimer;
    let glitchTimer;

    // Timer to start the glitch effect after the card has been displayed
    displayTimer = setTimeout(() => {
      setIsGlitching(true); // Activate glitch effect
    }, displayDuration);

    // Timer to end the glitch effect and switch to the next card
    glitchTimer = setTimeout(() => {
      setIsGlitching(false); // Deactivate glitch effect
      // Move to the next card, looping back to the first if at the end
      setCurrentCardIndex((prevIndex) => (prevIndex + 1) % cards.length);
    }, displayDuration + glitchDuration); // Glitch starts, runs for glitchDuration, then card swaps

    // Cleanup function to clear timers when the component unmounts or dependencies change
    return () => {
      clearTimeout(displayTimer);
      clearTimeout(glitchTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentCardIndex, cards.length, displayDuration, glitchDuration]); // Dependencies: re-run effect when these change

  return (
    <div className="relative w-full max-w-md h-80 flex items-center justify-center rounded-xl shadow-2xl bg-gradient-to-br from-primary to-secondary glow-border">
      {/* Custom CSS for the glitch animation */}
      <style jsx>{`
        @keyframes glitch-effect {
          0% {
            transform: translate(0, 0);
            text-shadow: none;
            opacity: 1;
          }
          5% {
            transform: translate(-6px, 6px);
            text-shadow: 12px -12px 0px rgba(0, 255, 0, 0.95); /* Even more spread, stronger green */
            opacity: 0.8;
          }
          10% {
            transform: translate(12px, -12px);
            text-shadow: -12px 12px 0px rgba(50, 205, 50, 0.95); /* Even more spread, stronger lime green */
            opacity: 0.7;
          }
          15% {
            transform: translate(-18px, 18px);
            text-shadow: 18px -18px 0px rgba(0, 128, 0, 0.9); /* Even more spread, stronger dark green */
            opacity: 0.6;
          }
          20% {
            transform: translate(24px, -24px);
            text-shadow: -24px 24px 0px rgba(127, 255, 0, 0.85); /* Even more spread, stronger chartreuse */
            opacity: 0.5;
          }
          25% {
            transform: translate(-30px, 30px);
            text-shadow: 30px -30px 0px rgba(0, 250, 154, 0.85); /* Even more spread, stronger medium spring green */
            opacity: 0.4;
          }
          30% {
            transform: translate(36px, -36px);
            text-shadow: -36px 36px 0px rgba(60, 179, 113, 0.85); /* Even more spread, stronger medium sea green */
            opacity: 0.3;
          }
          35% {
            transform: translate(-42px, 42px);
            text-shadow: 42px -42px 0px rgba(34, 139, 34, 0.8); /* Even more spread, stronger forest green */
            opacity: 0.2;
          }
          40% {
            transform: translate(48px, -48px);
            text-shadow: -48px 48px 0px rgba(144, 238, 144, 0.75); /* Even more spread, light green */
            opacity: 0.1;
          }
          45% {
            transform: translate(-54px, 54px);
            text-shadow: 54px -54px 0px rgba(0, 100, 0, 0.75); /* Even more spread, dark green */
            opacity: 0.05;
          }
          50% {
            transform: translate(0, 0);
            text-shadow: none;
            opacity: 0; /* Fully hidden during the middle of the glitch */
          }
          55% {
            transform: translate(54px, -54px);
            text-shadow: -54px 54px 0px rgba(0, 100, 0, 0.75); /* Even more spread, dark green */
            opacity: 0.05;
          }
          60% {
            transform: translate(-48px, 48px);
            text-shadow: 48px -48px 0px rgba(144, 238, 144, 0.75); /* Even more spread, light green */
            opacity: 0.1;
          }
          65% {
            transform: translate(42px, -42px);
            text-shadow: -42px 42px 0px rgba(34, 139, 34, 0.8); /* Even more spread, stronger forest green */
            opacity: 0.2;
          }
          70% {
            transform: translate(-36px, 36px);
            text-shadow: 36px -36px 0px rgba(60, 179, 113, 0.85); /* Even more spread, stronger medium sea green */
            opacity: 0.3;
          }
          75% {
            transform: translate(30px, -30px);
            text-shadow: -30px 30px 0px rgba(0, 250, 154, 0.85); /* Even more spread, stronger medium spring green */
            opacity: 0.4;
          }
          80% {
            transform: translate(-24px, 24px);
            text-shadow: 24px -24px 0px rgba(127, 255, 0, 0.85); /* Even more spread, stronger chartreuse */
            opacity: 0.5;
          }
          85% {
            transform: translate(18px, -18px);
            text-shadow: -18px 18px 0px rgba(0, 128, 0, 0.9); /* Even more spread, stronger dark green */
            opacity: 0.6;
          }
          90% {
            transform: translate(-12px, 12px);
            text-shadow: 12px -12px 0px rgba(50, 205, 50, 0.95); /* Even more spread, stronger lime green */
            opacity: 0.7;
          }
          95% {
            transform: translate(6px, -6px);
            text-shadow: -6px 6px 0px rgba(0, 255, 0, 0.95); /* Even more spread, stronger green */
            opacity: 0.8;
          }
          100% {
            transform: translate(0, 0);
            text-shadow: none;
            opacity: 1;
          }
        }

        .glitch-active {
          animation: glitch-effect ${glitchDuration}ms
            cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }
      `}</style>

      <div className="overflow-hidden w-full h-full relative">
        {/* Render each card, applying active and glitch classes conditionally */}
        {cards.map(({ id, imgSrc }, index) => (
          <div
            key={id}
            className={`
            absolute inset-0
            flex flex-col items-center justify-center
            p-6 text-center text-white
            bg-opacity-80 rounded-xl
            transition-opacity duration-500 ease-in-out
            ${
              index === currentCardIndex
                ? "opacity-100"
                : "opacity-0 pointer-events-none"
            }
            ${isGlitching && index === currentCardIndex ? "glitch-active" : ""}
          `}
          >
            <Image
              src={imgSrc}
              alt={`Landing Image No.${index + 1}`}
              fill
              className="object-contain"
              priority
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default GlitchCards;
