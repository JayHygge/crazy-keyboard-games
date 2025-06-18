"use client";

import { useState, useEffect } from "react";
import { GameEmbedProps } from "@/lib/types/game";
import {
  addToRecentlyPlayed,
  isFavorite,
  toggleFavorite,
} from "@/lib/utils/storage";

export function GameEmbed({
  game,
  theaterMode = false,
  onTheaterModeToggle,
}: GameEmbedProps) {
  const [isFavoriteState, setIsFavoriteState] = useState(false);
  const [isTheaterMode, setIsTheaterMode] = useState(theaterMode);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsFavoriteState(isFavorite(game.id));
    addToRecentlyPlayed(game.id);
  }, [game.id]);

  const handleFavoriteToggle = () => {
    const newFavoriteState = toggleFavorite(game.id);
    setIsFavoriteState(newFavoriteState);
  };

  const handleTheaterModeToggle = () => {
    const newTheaterMode = !isTheaterMode;
    setIsTheaterMode(newTheaterMode);
    onTheaterModeToggle?.();
  };

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  const handleIframeError = () => {
    setIsLoading(false);
    console.error("Failed to load game iframe");
  };

  if (isTheaterMode) {
    return (
      <div className="theater-mode">
        <div className="absolute top-4 right-4 z-10 flex space-x-2">
          <button
            onClick={handleTheaterModeToggle}
            className="bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors duration-200"
            aria-label="Exit theater mode"
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="game-iframe">
          <iframe
            src={game.gameUrl}
            title={game.title}
            className="w-full h-full border-0"
            allowFullScreen
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            onLoad={handleIframeLoad}
            onError={handleIframeError}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-game-darker rounded-xl overflow-hidden">
      {/* Game Controls */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <div className="flex items-center space-x-4">
          <h2 className="text-xl font-gaming font-bold text-white">
            {game.title}
          </h2>
          <span className="bg-primary-600 text-white text-xs px-2 py-1 rounded-full">
            {game.category}
          </span>
        </div>

        <div className="flex items-center space-x-2">
          {/* Favorite Button */}
          <button
            onClick={handleFavoriteToggle}
            className={`p-2 rounded-lg transition-colors duration-200 ${
              isFavoriteState
                ? "bg-red-600/20 text-red-400 hover:bg-red-600/30"
                : "bg-gray-700 text-gray-400 hover:bg-gray-600 hover:text-white"
            }`}
            aria-label={
              isFavoriteState ? "Remove from favorites" : "Add to favorites"
            }
          >
            <svg
              className="w-5 h-5"
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

          {/* Theater Mode Button */}
          <button
            onClick={handleTheaterModeToggle}
            className="bg-gray-700 text-gray-400 hover:bg-gray-600 hover:text-white p-2 rounded-lg transition-colors duration-200"
            aria-label="Enter theater mode"
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
                d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
              />
            </svg>
          </button>

          {/* Fullscreen Button */}
          <button
            onClick={() => {
              const iframe = document.querySelector(
                `iframe[src="${game.gameUrl}"]`
              ) as HTMLIFrameElement;
              if (iframe && iframe.requestFullscreen) {
                iframe.requestFullscreen();
              }
            }}
            className="bg-gray-700 text-gray-400 hover:bg-gray-600 hover:text-white p-2 rounded-lg transition-colors duration-200"
            aria-label="Fullscreen"
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
                d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Game Iframe Container */}
      <div className="relative">
        {/* Loading State */}
        {isLoading && (
          <div className="absolute inset-0 bg-game-darker flex items-center justify-center z-10">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
              <p className="text-gray-400">Loading game...</p>
            </div>
          </div>
        )}

        {/* Game Iframe */}
        <div className="iframe-container">
          <iframe
            src={game.gameUrl}
            title={game.title}
            className="w-full h-full border-0"
            allowFullScreen
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            onLoad={handleIframeLoad}
            onError={handleIframeError}
          />
        </div>
      </div>

      {/* Game Info Footer */}
      <div className="p-4 border-t border-gray-700">
        <div className="flex items-center justify-between text-sm text-gray-400">
          <div className="flex items-center space-x-4">
            <span className="flex items-center">
              <svg
                className="w-4 h-4 mr-1"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
              </svg>
              {game.playCount?.toLocaleString() || "0"} plays
            </span>
            {game.rating && (
              <span className="flex items-center">
                <svg
                  className="w-4 h-4 text-yellow-400 mr-1"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                {game.rating}
              </span>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <span
              className={`px-2 py-1 rounded text-xs font-medium ${
                game.isKeyboardOnly
                  ? "bg-blue-600/20 text-blue-400"
                  : "bg-purple-600/20 text-purple-400"
              }`}
            >
              {game.isKeyboardOnly ? "⌨️ Keyboard" : "🖱️ Mouse + Keyboard"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
