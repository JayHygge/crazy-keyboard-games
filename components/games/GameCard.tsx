"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { GameCardProps } from "@/lib/types/game";
import { isFavorite, toggleFavorite } from "@/lib/utils/storage";

export function GameCard({
  game,
  showVideoPreview = true,
  compact = false,
}: GameCardProps) {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isFavoriteState, setIsFavoriteState] = useState(isFavorite(game.id));

  const handleMouseEnter = () => {
    if (showVideoPreview) {
      setIsVideoPlaying(true);
    }
  };

  const handleMouseLeave = () => {
    if (showVideoPreview) {
      setIsVideoPlaying(false);
    }
  };

  const handleFavoriteToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const newFavoriteState = toggleFavorite(game.id);
    setIsFavoriteState(newFavoriteState);
  };

  const formatPlayCount = (count: number): string => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "text-green-400";
      case "Medium":
        return "text-yellow-400";
      case "Hard":
        return "text-red-400";
      default:
        return "text-gray-400";
    }
  };

  return (
    <Link href={`/${game.slug}`}>
      <div
        className={`game-card group cursor-pointer ${
          compact ? "h-48" : "h-64"
        }`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Image/Video Container */}
        <div className="relative w-full h-32 overflow-hidden">
          {/* Thumbnail Image */}
          <Image
            src={game.thumbnail}
            alt={game.title}
            width={300}
            height={180}
            className="w-full h-full object-cover transition-opacity duration-300"
            style={{ opacity: isVideoPlaying ? 0 : 1 }}
          />

          {/* Video Preview */}
          {showVideoPreview && game.videoPreview && (
            <video
              src={game.videoPreview}
              className="video-preview"
              muted
              loop
              playsInline
              style={{ opacity: isVideoPlaying ? 1 : 0 }}
            />
          )}

          {/* Favorite Button */}
          <button
            onClick={handleFavoriteToggle}
            className="absolute top-2 right-2 p-1.5 bg-black/50 hover:bg-black/70 rounded-full transition-all duration-200 opacity-0 group-hover:opacity-100"
            aria-label={
              isFavoriteState ? "Remove from favorites" : "Add to favorites"
            }
          >
            <svg
              className={`w-4 h-4 ${
                isFavoriteState ? "text-red-500 fill-current" : "text-white"
              }`}
              fill={isFavoriteState ? "currentColor" : "none"}
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>

          {/* Play Button Overlay */}
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
              <svg
                className="w-6 h-6 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>

          {/* Category Badge */}
          <div className="absolute bottom-2 left-2">
            <span className="bg-primary-600 text-white text-xs px-2 py-1 rounded-full font-medium">
              {game.category}
            </span>
          </div>

          {/* Keyboard/Mouse Indicator */}
          <div className="absolute bottom-2 right-2">
            <span
              className={`text-xs px-2 py-1 rounded-full font-medium ${
                game.isKeyboardOnly
                  ? "bg-blue-600 text-white"
                  : "bg-purple-600 text-white"
              }`}
            >
              {game.isKeyboardOnly ? "⌨️" : "🖱️"}
            </span>
          </div>
        </div>

        {/* Game Info */}
        <div className="p-4">
          <h3 className="font-semibold text-white text-sm mb-1 line-clamp-1 group-hover:text-primary-400 transition-colors duration-200">
            {game.title}
          </h3>

          {!compact && (
            <p className="text-gray-400 text-xs mb-2 line-clamp-2">
              {game.description}
            </p>
          )}

          {/* Game Stats */}
          <div className="flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center space-x-2">
              {game.difficulty && (
                <span className={getDifficultyColor(game.difficulty)}>
                  {game.difficulty}
                </span>
              )}
              {game.playCount && (
                <span className="flex items-center">
                  <svg
                    className="w-3 h-3 mr-1"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
                  </svg>
                  {formatPlayCount(game.playCount)}
                </span>
              )}
            </div>

            {game.rating && (
              <div className="flex items-center">
                <svg
                  className="w-3 h-3 text-yellow-400 mr-1"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                <span>{game.rating}</span>
              </div>
            )}
          </div>

          {/* Tags */}
          {!compact && game.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {game.tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="bg-gray-700 text-gray-300 text-xs px-1.5 py-0.5 rounded"
                >
                  {tag}
                </span>
              ))}
              {game.tags.length > 2 && (
                <span className="text-gray-500 text-xs">
                  +{game.tags.length - 2}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
