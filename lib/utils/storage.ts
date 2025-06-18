import { UserPreferences } from "@/lib/types/game";

const STORAGE_KEYS = {
  USER_PREFERENCES: "crazy-keyboard-games-user-preferences",
  FAVORITES: "crazy-keyboard-games-favorites",
  RECENTLY_PLAYED: "crazy-keyboard-games-recently-played",
} as const;

// Initialize default user preferences
const getDefaultPreferences = (): UserPreferences => ({
  favorites: [],
  recentlyPlayed: [],
  preferredCategories: [],
  preferredTags: [],
});

// Get user preferences from localStorage
export const getUserPreferences = (): UserPreferences => {
  if (typeof window === "undefined") {
    return getDefaultPreferences();
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEYS.USER_PREFERENCES);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error("Error reading user preferences from localStorage:", error);
  }

  return getDefaultPreferences();
};

// Save user preferences to localStorage
export const saveUserPreferences = (preferences: UserPreferences): void => {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(
      STORAGE_KEYS.USER_PREFERENCES,
      JSON.stringify(preferences)
    );
  } catch (error) {
    console.error("Error saving user preferences to localStorage:", error);
  }
};

// Get favorites from localStorage
export const getFavorites = (): string[] => {
  if (typeof window === "undefined") return [];

  try {
    const stored = localStorage.getItem(STORAGE_KEYS.FAVORITES);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error("Error reading favorites from localStorage:", error);
  }

  return [];
};

// Save favorites to localStorage
export const saveFavorites = (favorites: string[]): void => {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favorites));
  } catch (error) {
    console.error("Error saving favorites to localStorage:", error);
  }
};

// Add game to favorites
export const addToFavorites = (gameId: string): void => {
  const favorites = getFavorites();
  if (!favorites.includes(gameId)) {
    const newFavorites = [...favorites, gameId];
    saveFavorites(newFavorites);
  }
};

// Remove game from favorites
export const removeFromFavorites = (gameId: string): void => {
  const favorites = getFavorites();
  const newFavorites = favorites.filter((id) => id !== gameId);
  saveFavorites(newFavorites);
};

// Check if game is in favorites
export const isFavorite = (gameId: string): boolean => {
  const favorites = getFavorites();
  return favorites.includes(gameId);
};

// Toggle favorite status
export const toggleFavorite = (gameId: string): boolean => {
  const isFav = isFavorite(gameId);
  if (isFav) {
    removeFromFavorites(gameId);
    return false;
  } else {
    addToFavorites(gameId);
    return true;
  }
};

// Get recently played games from localStorage
export const getRecentlyPlayed = (): string[] => {
  if (typeof window === "undefined") return [];

  try {
    const stored = localStorage.getItem(STORAGE_KEYS.RECENTLY_PLAYED);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error("Error reading recently played from localStorage:", error);
  }

  return [];
};

// Save recently played games to localStorage
export const saveRecentlyPlayed = (recentlyPlayed: string[]): void => {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(
      STORAGE_KEYS.RECENTLY_PLAYED,
      JSON.stringify(recentlyPlayed)
    );
  } catch (error) {
    console.error("Error saving recently played to localStorage:", error);
  }
};

// Add game to recently played
export const addToRecentlyPlayed = (gameId: string): void => {
  const recentlyPlayed = getRecentlyPlayed();
  const maxRecent = 20; // Keep only last 20 games

  // Remove if already exists
  const filtered = recentlyPlayed.filter((id) => id !== gameId);

  // Add to beginning
  const newRecentlyPlayed = [gameId, ...filtered].slice(0, maxRecent);
  saveRecentlyPlayed(newRecentlyPlayed);
};

// Clear all user data
export const clearUserData = (): void => {
  if (typeof window === "undefined") return;

  try {
    localStorage.removeItem(STORAGE_KEYS.USER_PREFERENCES);
    localStorage.removeItem(STORAGE_KEYS.FAVORITES);
    localStorage.removeItem(STORAGE_KEYS.RECENTLY_PLAYED);
  } catch (error) {
    console.error("Error clearing user data from localStorage:", error);
  }
};

// Get user statistics
export const getUserStats = () => {
  const favorites = getFavorites();
  const recentlyPlayed = getRecentlyPlayed();

  return {
    totalFavorites: favorites.length,
    totalRecentlyPlayed: recentlyPlayed.length,
    hasFavorites: favorites.length > 0,
    hasRecentlyPlayed: recentlyPlayed.length > 0,
  };
};
