export interface Game {
  id: string;
  slug: string; // URL-friendly identifier
  title: string;
  description: string;
  category: string; // e.g., 'Action', 'Puzzle'
  tags: string[]; // e.g., ['typing', 'adventure']
  thumbnail: string; // Image path
  videoPreview: string; // MP4/WebM preview path
  gameUrl: string; // GameMonetize iframe URL
  isKeyboardOnly: boolean; // Keyboard vs Mouse+Keyboard
  difficulty?: "Easy" | "Medium" | "Hard";
  playCount?: number; // For popularity tracking
  rating?: number; // User rating (future)
  releaseDate?: string; // ISO date string
  developer?: string;
  featured?: boolean; // For hero banner
}

export interface GameCategory {
  id: string;
  name: string;
  description: string;
  icon?: string;
  color?: string;
}

export interface GameTag {
  id: string;
  name: string;
  color?: string;
}

export interface UserPreferences {
  favorites: string[]; // Array of game IDs
  recentlyPlayed: string[]; // Array of game IDs (last 20)
  preferredCategories: string[];
  preferredTags: string[];
}

export interface SearchFilters {
  query: string;
  category: string | null;
  tags: string[];
  difficulty: string | null;
  keyboardOnly: boolean | null;
}

export interface CarouselProps {
  title: string;
  games: Game[];
  category?: string;
  showViewAll?: boolean;
}

export interface GameCardProps {
  game: Game;
  showVideoPreview?: boolean;
  compact?: boolean;
}

export interface GameEmbedProps {
  game: Game;
  theaterMode?: boolean;
  onTheaterModeToggle?: () => void;
}

export interface RecommendationSidebarProps {
  currentGame: Game;
  allGames: Game[];
  maxRecommendations?: number;
}

export interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  className?: string;
}

export interface TagFilterProps {
  tags: string[];
  selectedTags: string[];
  onTagToggle: (tag: string) => void;
  className?: string;
}
