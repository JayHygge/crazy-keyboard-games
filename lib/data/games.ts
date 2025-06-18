import { Game } from "@/lib/types/game";

export const games: Game[] = [
  {
    id: "1",
    slug: "typing-speed-master",
    title: "Typing Speed Master",
    description:
      "Improve your typing speed and accuracy with this addictive typing game. Race against time and compete with players worldwide!",
    category: "Educational",
    tags: ["typing", "speed", "accuracy", "educational"],
    thumbnail: "/images/placeholder.svg",
    videoPreview: "/images/placeholder.svg",
    gameUrl: "https://www.gamemonetize.com/games/typing-speed-master-embed-url",
    isKeyboardOnly: true,
    difficulty: "Medium",
    playCount: 15420,
    rating: 4.8,
    releaseDate: "2024-01-15",
    developer: "SpeedGames Studio",
    featured: true,
  },
  {
    id: "2",
    slug: "keyboard-warrior",
    title: "Keyboard Warrior",
    description:
      "Defend your castle using only your keyboard skills! Type words to cast spells and defeat enemies in this action-packed adventure.",
    category: "Action",
    tags: ["typing", "action", "adventure", "defense"],
    thumbnail: "/images/placeholder.svg",
    videoPreview: "/images/placeholder.svg",
    gameUrl: "https://www.gamemonetize.com/games/keyboard-warrior-embed-url",
    isKeyboardOnly: true,
    difficulty: "Hard",
    playCount: 8920,
    rating: 4.6,
    releaseDate: "2024-02-03",
    developer: "ActionType Games",
    featured: true,
  },
  {
    id: "3",
    slug: "word-puzzle-challenge",
    title: "Word Puzzle Challenge",
    description:
      "Solve challenging word puzzles by typing the correct answers. Perfect for expanding your vocabulary while having fun!",
    category: "Puzzle",
    tags: ["typing", "puzzle", "words", "vocabulary"],
    thumbnail: "/images/placeholder.svg",
    videoPreview: "/images/placeholder.svg",
    gameUrl:
      "https://www.gamemonetize.com/games/word-puzzle-challenge-embed-url",
    isKeyboardOnly: true,
    difficulty: "Easy",
    playCount: 12350,
    rating: 4.7,
    releaseDate: "2024-01-28",
    developer: "PuzzleMasters",
  },
  {
    id: "4",
    slug: "mouse-keyboard-racer",
    title: "Mouse & Keyboard Racer",
    description:
      "Race through challenging tracks using both mouse and keyboard controls. Master the perfect coordination to win!",
    category: "Racing",
    tags: ["racing", "mouse", "keyboard", "coordination"],
    thumbnail: "/images/placeholder.svg",
    videoPreview: "/images/placeholder.svg",
    gameUrl:
      "https://www.gamemonetize.com/games/mouse-keyboard-racer-embed-url",
    isKeyboardOnly: false,
    difficulty: "Medium",
    playCount: 6780,
    rating: 4.5,
    releaseDate: "2024-02-10",
    developer: "RacingPro Games",
  },
  {
    id: "5",
    slug: "typing-rhythm-game",
    title: "Typing Rhythm Game",
    description:
      "Combine typing skills with rhythm in this musical typing game. Type to the beat and create beautiful melodies!",
    category: "Music",
    tags: ["typing", "music", "rhythm", "creative"],
    thumbnail: "/images/placeholder.svg",
    videoPreview: "/images/placeholder.svg",
    gameUrl: "https://www.gamemonetize.com/games/typing-rhythm-game-embed-url",
    isKeyboardOnly: true,
    difficulty: "Hard",
    playCount: 4560,
    rating: 4.9,
    releaseDate: "2024-02-15",
    developer: "MusicType Studio",
  },
  {
    id: "6",
    slug: "keyboard-shooter",
    title: "Keyboard Shooter",
    description:
      "A fast-paced shooting game controlled entirely by keyboard. Dodge, shoot, and survive in this intense action game!",
    category: "Action",
    tags: ["typing", "shooting", "action", "fast-paced"],
    thumbnail: "/images/placeholder.svg",
    videoPreview: "/images/placeholder.svg",
    gameUrl: "https://www.gamemonetize.com/games/keyboard-shooter-embed-url",
    isKeyboardOnly: true,
    difficulty: "Hard",
    playCount: 7890,
    rating: 4.4,
    releaseDate: "2024-01-20",
    developer: "ActionType Games",
  },
  {
    id: "7",
    slug: "mouse-precision-test",
    title: "Mouse Precision Test",
    description:
      "Test and improve your mouse precision with challenging targets and obstacles. Perfect for gamers and professionals!",
    category: "Skill",
    tags: ["mouse", "precision", "skill", "training"],
    thumbnail: "/images/placeholder.svg",
    videoPreview: "/images/placeholder.svg",
    gameUrl:
      "https://www.gamemonetize.com/games/mouse-precision-test-embed-url",
    isKeyboardOnly: false,
    difficulty: "Medium",
    playCount: 5430,
    rating: 4.6,
    releaseDate: "2024-02-05",
    developer: "SkillTrainer",
  },
  {
    id: "8",
    slug: "typing-adventure-story",
    title: "Typing Adventure Story",
    description:
      "Embark on an epic adventure where your typing skills determine the story's outcome. Choose your path and type your destiny!",
    category: "Adventure",
    tags: ["typing", "adventure", "story", "rpg"],
    thumbnail: "/images/placeholder.svg",
    videoPreview: "/images/placeholder.svg",
    gameUrl:
      "https://www.gamemonetize.com/games/typing-adventure-story-embed-url",
    isKeyboardOnly: true,
    difficulty: "Easy",
    playCount: 9870,
    rating: 4.8,
    releaseDate: "2024-01-25",
    developer: "StoryType Games",
  },
  {
    id: "9",
    slug: "coordination-challenge",
    title: "Coordination Challenge",
    description:
      "Master the art of using both mouse and keyboard simultaneously. Complete complex tasks that require perfect coordination!",
    category: "Skill",
    tags: ["mouse", "keyboard", "coordination", "skill"],
    thumbnail: "/images/placeholder.svg",
    videoPreview: "/images/placeholder.svg",
    gameUrl:
      "https://www.gamemonetize.com/games/coordination-challenge-embed-url",
    isKeyboardOnly: false,
    difficulty: "Hard",
    playCount: 3450,
    rating: 4.7,
    releaseDate: "2024-02-12",
    developer: "CoordinationPro",
  },
  {
    id: "10",
    slug: "speed-typing-battle",
    title: "Speed Typing Battle",
    description:
      "Compete against other players in real-time typing battles. Show off your speed and accuracy to become the typing champion!",
    category: "Competitive",
    tags: ["typing", "competitive", "multiplayer", "speed"],
    thumbnail: "/images/placeholder.svg",
    videoPreview: "/images/placeholder.svg",
    gameUrl: "https://www.gamemonetize.com/games/speed-typing-battle-embed-url",
    isKeyboardOnly: true,
    difficulty: "Medium",
    playCount: 11200,
    rating: 4.9,
    releaseDate: "2024-02-01",
    developer: "BattleType Games",
  },
];

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
