import gamesData from "./games.json";
import { Game } from "@/lib/types/game";

export const games: Game[] = gamesData.map((g: any) => ({
  id: g.id,
  slug: g.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, ""),
  title: g.title.trim(),
  description: g.description,
  category: g.category,
  tags: g.tags ? g.tags.split(",").map((t: string) => t.trim()) : [],
  thumbnail: g.thumb,
  videoPreview: "", // No video preview in feed
  gameUrl: g.url,
  isKeyboardOnly:
    g.instructions && g.instructions.toLowerCase().includes("keyboard"),
  difficulty: undefined, // Could be set based on category or tags
  playCount: 0,
  rating: 0,
  releaseDate: "",
  developer: "GameMonetize",
  featured: false,
}));

// Helper functions
export const getGameBySlug = (slug: string): Game | undefined => {
  return games.find((game) => game.slug === slug);
};

export const getGamesByCategory = (category: string): Game[] => {
  return games.filter((game) => game.category === category);
};

export const getGamesByTag = (tag: string): Game[] => {
  return games.filter((game) => game.tags.includes(tag));
};

export const getFeaturedGames = (): Game[] => {
  return games.filter((game) => game.featured);
};

export const getPopularGames = (limit: number = 6): Game[] => {
  return [...games]
    .sort((a, b) => (b.playCount || 0) - (a.playCount || 0))
    .slice(0, limit);
};

export const getRecentGames = (limit: number = 6): Game[] => {
  return [...games]
    .sort(
      (a, b) =>
        new Date(b.releaseDate || "").getTime() -
        new Date(a.releaseDate || "").getTime()
    )
    .slice(0, limit);
};

export const searchGames = (query: string): Game[] => {
  const lowercaseQuery = query.toLowerCase();
  return games.filter(
    (game) =>
      game.title.toLowerCase().includes(lowercaseQuery) ||
      game.description.toLowerCase().includes(lowercaseQuery) ||
      game.tags.some((tag) => tag.toLowerCase().includes(lowercaseQuery)) ||
      game.category.toLowerCase().includes(lowercaseQuery)
  );
};

export const getRelatedGames = (
  currentGame: Game,
  limit: number = 4
): Game[] => {
  const relatedGames = [...games]
    .filter(
      (game) =>
        game.id !== currentGame.id &&
        (game.category === currentGame.category ||
          game.tags.some((tag) => currentGame.tags.includes(tag)))
    )
    .sort((a, b) => (b.playCount || 0) - (a.playCount || 0));

  return relatedGames.slice(0, limit);
};

// Categories for filtering
export const categories = [
  "Action",
  "Adventure",
  "Competitive",
  "Educational",
  "Music",
  "Puzzle",
  "Racing",
  "Skill",
];

// Popular tags
export const popularTags = [
  "typing",
  "mouse",
  "keyboard",
  "action",
  "puzzle",
  "speed",
  "skill",
  "adventure",
  "competitive",
  "educational",
  "music",
  "coordination",
  "precision",
  "rhythm",
  "story",
  "rpg",
  "defense",
  "shooting",
  "racing",
  "training",
];
