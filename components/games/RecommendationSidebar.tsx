"use client";

import Link from "next/link";
import Image from "next/image";
import { RecommendationSidebarProps } from "@/lib/types/game";
import { getRelatedGames } from "@/lib/data/games";

export function RecommendationSidebar({
  currentGame,
  allGames,
  maxRecommendations = 4,
}: RecommendationSidebarProps) {
  const relatedGames = getRelatedGames(currentGame, maxRecommendations);

  if (relatedGames.length === 0) {
    return (
      <div className="bg-game-darker rounded-xl p-6">
        <h3 className="text-lg font-gaming font-bold text-white mb-4">
          More Games
        </h3>
        <p className="text-gray-400 text-sm">
          No related games found. Check out our full collection!
        </p>
        <Link href="/games" className="btn-primary w-full mt-4 text-center">
          Browse All Games
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-game-darker rounded-xl p-6">
      <h3 className="text-lg font-gaming font-bold text-white mb-4">
        You Might Also Like
      </h3>

      <div className="space-y-4">
        {relatedGames.map((game) => (
          <Link key={game.id} href={`/${game.slug}`} className="block group">
            <div className="flex space-x-3 p-3 rounded-lg hover:bg-gray-700/50 transition-colors duration-200">
              {/* Game Thumbnail */}
              <div className="flex-shrink-0">
                <div className="w-16 h-12 rounded-lg overflow-hidden bg-gray-700">
                  <Image
                    src={game.thumbnail}
                    alt={game.title}
                    width={64}
                    height={48}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                </div>
              </div>

              {/* Game Info */}
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-semibold text-white group-hover:text-primary-400 transition-colors duration-200 truncate">
                  {game.title}
                </h4>
                <p className="text-xs text-gray-400 truncate">
                  {game.category}
                </p>
                <div className="flex items-center space-x-2 mt-1">
                  {game.rating && (
                    <div className="flex items-center">
                      <svg
                        className="w-3 h-3 text-yellow-400 mr-1"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                      <span className="text-xs text-gray-400">
                        {game.rating}
                      </span>
                    </div>
                  )}
                  <span
                    className={`text-xs px-1.5 py-0.5 rounded ${
                      game.isKeyboardOnly
                        ? "bg-blue-600/20 text-blue-400"
                        : "bg-purple-600/20 text-purple-400"
                    }`}
                  >
                    {game.isKeyboardOnly ? "⌨️" : "🖱️"}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* View All Button */}
      <div className="mt-6 pt-4 border-t border-gray-700">
        <Link href="/games" className="btn-outline w-full text-center text-sm">
          View All Games
        </Link>
      </div>
    </div>
  );
}
