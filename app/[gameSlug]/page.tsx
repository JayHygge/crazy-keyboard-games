import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/ui/Header";
import { GameEmbed } from "@/components/games/GameEmbed";
import { RecommendationSidebar } from "@/components/games/RecommendationSidebar";
import { getGameBySlug, getRelatedGames, games } from "@/lib/data/games";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ gameSlug: string }>;
}): Promise<Metadata> {
  const { gameSlug } = await params;
  const game = getGameBySlug(gameSlug);

  if (!game) {
    return {
      title: "Game Not Found",
    };
  }

  return {
    title: `${game.title} - Play Online | Crazy Keyboard Games`,
    description: game.description,
    keywords: [
      game.title,
      ...game.tags,
      game.category,
      "keyboard games",
      "online games",
      "free games",
      "typing games",
      "mouse games",
    ],
    openGraph: {
      title: `${game.title} - Play Online`,
      description: game.description,
      type: "website",
      url: `https://crazykeyboardgames.com/${game.slug}`,
      images: [
        {
          url: game.thumbnail,
          width: 1200,
          height: 630,
          alt: game.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${game.title} - Play Online`,
      description: game.description,
      images: [game.thumbnail],
    },
    alternates: {
      canonical: `https://crazykeyboardgames.com/${game.slug}`,
    },
  };
}

export function generateStaticParams() {
  return games.map((game) => ({
    gameSlug: game.slug,
  }));
}

export default async function GamePage({
  params,
}: {
  params: Promise<{ gameSlug: string }>;
}) {
  const { gameSlug } = await params;
  const game = getGameBySlug(gameSlug);

  if (!game) {
    notFound();
  }

  const relatedGames = getRelatedGames(game, 6);

  // Structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Game",
    name: game.title,
    description: game.description,
    image: game.thumbnail,
    url: `https://crazykeyboardgames.com/${game.slug}`,
    genre: game.category,
    gamePlatform: "Web Browser",
    applicationCategory: "Game",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
    aggregateRating: game.rating
      ? {
          "@type": "AggregateRating",
          ratingValue: game.rating,
          ratingCount: game.playCount || 0,
        }
      : undefined,
    publisher: game.developer || "Crazy Keyboard Games",
    datePublished: game.releaseDate,
  };

  return (
    <div className="min-h-screen bg-game-dark">
      <Header />

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Game Header */}
        <div className="mb-8">
          <nav className="text-sm text-gray-400 mb-4">
            <a
              href="/"
              className="hover:text-white transition-colors duration-200"
            >
              Home
            </a>
            <span className="mx-2">/</span>
            <a
              href={`/categories/${game.category.toLowerCase()}`}
              className="hover:text-white transition-colors duration-200"
            >
              {game.category}
            </a>
            <span className="mx-2">/</span>
            <span className="text-white">{game.title}</span>
          </nav>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Game Title and Info */}
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-gaming font-bold text-white mb-4">
                {game.title}
              </h1>
              <p className="text-gray-300 text-lg mb-6">{game.description}</p>

              {/* Game Stats */}
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center space-x-2">
                  <span className="bg-primary-600 text-white text-sm px-3 py-1 rounded-full">
                    {game.category}
                  </span>
                </div>
                {game.difficulty && (
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-400 text-sm">Difficulty:</span>
                    <span
                      className={`text-sm font-medium ${
                        game.difficulty === "Easy"
                          ? "text-green-400"
                          : game.difficulty === "Medium"
                          ? "text-yellow-400"
                          : "text-red-400"
                      }`}
                    >
                      {game.difficulty}
                    </span>
                  </div>
                )}
                {game.playCount && (
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-400 text-sm">Plays:</span>
                    <span className="text-white text-sm font-medium">
                      {game.playCount.toLocaleString()}
                    </span>
                  </div>
                )}
                {game.rating && (
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-400 text-sm">Rating:</span>
                    <div className="flex items-center">
                      <svg
                        className="w-4 h-4 text-yellow-400 mr-1"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                      <span className="text-white text-sm font-medium">
                        {game.rating}
                      </span>
                    </div>
                  </div>
                )}
                <div className="flex items-center space-x-2">
                  <span className="text-gray-400 text-sm">Controls:</span>
                  <span
                    className={`text-sm font-medium ${
                      game.isKeyboardOnly ? "text-blue-400" : "text-purple-400"
                    }`}
                  >
                    {game.isKeyboardOnly ? "Keyboard Only" : "Mouse + Keyboard"}
                  </span>
                </div>
              </div>

              {/* Tags */}
              {game.tags.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-white font-semibold mb-2">Tags:</h3>
                  <div className="flex flex-wrap gap-2">
                    {game.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-gray-700 text-gray-300 text-sm px-3 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Game Thumbnail */}
            <div className="lg:w-80">
              <div className="bg-game-darker rounded-xl overflow-hidden">
                <img
                  src={game.thumbnail}
                  alt={game.title}
                  className="w-full h-48 object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Game Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Game Area */}
          <div className="lg:col-span-3">
            <GameEmbed game={game} />

            {/* Google AdSense - Top */}
            <div className="my-8 text-center">
              <div className="bg-gray-800 rounded-lg p-4">
                <p className="text-gray-400 text-sm mb-2">Advertisement</p>
                <div className="w-full h-90 bg-gray-700 rounded flex items-center justify-center">
                  <span className="text-gray-500">
                    Google AdSense - Top Banner
                  </span>
                </div>
              </div>
            </div>

            {/* Game Description */}
            <div className="bg-game-darker rounded-xl p-6 mb-8">
              <h2 className="text-2xl font-gaming font-bold text-white mb-4">
                About This Game
              </h2>
              <div className="prose prose-invert max-w-none">
                <p className="text-gray-300 leading-relaxed">
                  {game.description}
                </p>
                {game.developer && (
                  <p className="text-gray-400 mt-4">
                    <strong>Developer:</strong> {game.developer}
                  </p>
                )}
                {game.releaseDate && (
                  <p className="text-gray-400">
                    <strong>Released:</strong>{" "}
                    {new Date(game.releaseDate).toLocaleDateString()}
                  </p>
                )}
              </div>
            </div>

            {/* Google AdSense - Bottom */}
            <div className="my-8 text-center">
              <div className="bg-gray-800 rounded-lg p-4">
                <p className="text-gray-400 text-sm mb-2">Advertisement</p>
                <div className="w-full h-90 bg-gray-700 rounded flex items-center justify-center">
                  <span className="text-gray-500">
                    Google AdSense - Bottom Banner
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <RecommendationSidebar
              currentGame={game}
              allGames={games}
              maxRecommendations={6}
            />

            {/* Google AdSense - Sidebar */}
            <div className="mt-8 text-center">
              <div className="bg-gray-800 rounded-lg p-4">
                <p className="text-gray-400 text-sm mb-2">Advertisement</p>
                <div className="w-full h-60 bg-gray-700 rounded flex items-center justify-center">
                  <span className="text-gray-500">
                    Google AdSense - Sidebar
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
