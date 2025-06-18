"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { CarouselProps } from "@/lib/types/game";
import { GameCard } from "@/components/games/GameCard";

export function Carousel({
  title,
  games,
  category,
  showViewAll = true,
}: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const itemsPerView = {
    sm: 1,
    md: 2,
    lg: 3,
    xl: 4,
  };

  const getCurrentItemsPerView = () => {
    if (typeof window === "undefined") return itemsPerView.lg;

    const width = window.innerWidth;
    if (width >= 1280) return itemsPerView.xl;
    if (width >= 1024) return itemsPerView.lg;
    if (width >= 768) return itemsPerView.md;
    return itemsPerView.sm;
  };

  const [itemsPerViewState, setItemsPerViewState] = useState(itemsPerView.lg);

  useEffect(() => {
    const handleResize = () => {
      setItemsPerViewState(getCurrentItemsPerView());
    };

    // Set initial value on client
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxIndex = Math.max(0, games.length - itemsPerViewState);
  const canGoNext = currentIndex < maxIndex;
  const canGoPrev = currentIndex > 0;

  const goToNext = () => {
    if (canGoNext) {
      setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
    }
  };

  const goToPrev = () => {
    if (canGoPrev) {
      setCurrentIndex((prev) => Math.max(prev - 1, 0));
    }
  };

  const goToIndex = (index: number) => {
    setCurrentIndex(Math.max(0, Math.min(index, maxIndex)));
  };

  const getTransformValue = () => {
    const itemWidth = 100 / itemsPerViewState;
    return `translateX(-${currentIndex * itemWidth}%)`;
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <h2 className="text-2xl font-gaming font-bold text-white">{title}</h2>
          {category && (
            <span className="bg-primary-600 text-white text-xs px-2 py-1 rounded-full font-medium">
              {category}
            </span>
          )}
        </div>

        {showViewAll && (
          <Link
            href={category ? `/categories/${category.toLowerCase()}` : "/games"}
            className="text-primary-400 hover:text-primary-300 text-sm font-medium transition-colors duration-200"
          >
            View All →
          </Link>
        )}
      </div>

      {/* Carousel Container */}
      <div className="relative overflow-hidden" ref={carouselRef}>
        {/* Track */}
        <div
          ref={trackRef}
          className="carousel-track"
          style={{ transform: getTransformValue() }}
        >
          {games.map((game) => (
            <div
              key={game.id}
              className="flex-shrink-0 px-2"
              style={{ width: `${100 / itemsPerViewState}%` }}
            >
              <GameCard game={game} />
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        {canGoPrev && (
          <button
            onClick={goToPrev}
            className={`absolute left-2 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-all duration-200 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
            aria-label="Previous games"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
        )}

        {canGoNext && (
          <button
            onClick={goToNext}
            className={`absolute right-2 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-all duration-200 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
            aria-label="Next games"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        )}

        {/* Dots Indicator */}
        {maxIndex > 0 && (
          <div className="flex justify-center space-x-2 mt-4">
            {Array.from({ length: maxIndex + 1 }, (_, index) => (
              <button
                key={index}
                onClick={() => goToIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  index === currentIndex
                    ? "bg-primary-500 w-6"
                    : "bg-gray-600 hover:bg-gray-500"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Keyboard Navigation */}
      <div className="sr-only">
        <button onClick={goToPrev} disabled={!canGoPrev}>
          Previous
        </button>
        <button onClick={goToNext} disabled={!canGoNext}>
          Next
        </button>
      </div>
    </div>
  );
}
