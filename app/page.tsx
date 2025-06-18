"use client";

import { Header } from "@/components/ui/Header";
import { Carousel } from "@/components/ui/Carousel";
import { SearchBar } from "@/components/ui/SearchBar";
import { TagFilter } from "@/components/ui/TagFilter";
import {
  games,
  getFeaturedGames,
  getPopularGames,
  getRecentGames,
  categories,
  popularTags,
} from "@/lib/data/games";

export default function HomePage() {
  const featuredGames = getFeaturedGames();
  const popularGames = getPopularGames(8);
  const recentGames = getRecentGames(8);

  return (
    <div className="min-h-screen bg-game-dark">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative bg-gradient-game py-20 lg:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-gaming font-bold text-white mb-6">
                Master Your
                <span className="text-gradient block">Keyboard Skills</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
                Discover the best keyboard and mouse games online. Improve your
                typing speed, test your coordination, and challenge yourself
                with addictive gaming experiences.
              </p>

              {/* Hero Search */}
              <div className="max-w-2xl mx-auto mb-8">
                <SearchBar
                  onSearch={(query) => console.log("Hero search:", query)}
                  placeholder="Search for games, categories, or tags..."
                  className="w-full"
                />
              </div>

              {/* Hero Stats */}
              <div className="flex justify-center space-x-8 text-center">
                <div>
                  <div className="text-2xl font-bold text-primary-400">
                    {games.length}+
                  </div>
                  <div className="text-gray-400 text-sm">Games Available</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary-400">
                    100%
                  </div>
                  <div className="text-gray-400 text-sm">Free to Play</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary-400">
                    24/7
                  </div>
                  <div className="text-gray-400 text-sm">Always Online</div>
                </div>
              </div>
            </div>
          </div>

          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-game-pattern bg-repeat"></div>
          </div>
        </section>

        {/* Tag Filters */}
        <section className="py-8 bg-game-darker">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-6">
              <h2 className="text-xl font-gaming font-semibold text-white mb-4">
                Quick Filters
              </h2>
              <TagFilter
                tags={popularTags.slice(0, 12)}
                selectedTags={[]}
                onTagToggle={(tag) => console.log("Tag selected:", tag)}
                className="justify-center"
              />
            </div>
          </div>
        </section>

        {/* Featured Games */}
        {featuredGames.length > 0 && (
          <section className="py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <Carousel
                title="Featured Games"
                games={featuredGames}
                showViewAll={false}
              />
            </div>
          </section>
        )}

        {/* Popular Games */}
        <section className="py-16 bg-game-darker/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Carousel
              title="Popular Games"
              games={popularGames}
              category="Popular"
            />
          </div>
        </section>

        {/* Recent Games */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Carousel
              title="Recently Added"
              games={recentGames}
              category="New"
            />
          </div>
        </section>

        {/* Category Grid */}
        <section className="py-16 bg-game-darker/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-gaming font-bold text-white mb-4">
                Browse by Category
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Find your perfect game by exploring our carefully curated
                categories
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {categories.map((category) => {
                const categoryGames = games.filter(
                  (game) => game.category === category
                );
                return (
                  <a
                    key={category}
                    href={`/categories/${category.toLowerCase()}`}
                    className="group bg-game-darker rounded-xl p-6 text-center hover:bg-primary-600/20 transition-all duration-300 border border-gray-700 hover:border-primary-500"
                  >
                    <div className="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-500 transition-colors duration-200">
                      <span className="text-white font-gaming font-bold text-lg">
                        {category.charAt(0)}
                      </span>
                    </div>
                    <h3 className="font-semibold text-white mb-2 group-hover:text-primary-400 transition-colors duration-200">
                      {category}
                    </h3>
                    <p className="text-gray-400 text-sm">
                      {categoryGames.length} games
                    </p>
                  </a>
                );
              })}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 bg-gradient-to-r from-primary-600 to-game-highlight">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-gaming font-bold text-white mb-6">
              Ready to Level Up Your Skills?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Join thousands of players improving their keyboard and mouse
              coordination with our collection of free online games.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/games" className="btn-primary text-lg px-8 py-3">
                Start Playing Now
              </a>
              <a
                href="/categories"
                className="btn-outline text-lg px-8 py-3 border-white text-white hover:bg-white hover:text-primary-600"
              >
                Browse Categories
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-game-darker border-t border-gray-700 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-game-highlight rounded-lg flex items-center justify-center">
                  <span className="text-white font-gaming font-bold text-sm">
                    CK
                  </span>
                </div>
                <span className="text-white font-gaming font-bold text-xl text-gradient">
                  Crazy Keyboard Games
                </span>
              </div>
              <p className="text-gray-400 mb-4">
                The ultimate destination for keyboard and mouse gaming. Improve
                your skills, challenge yourself, and have fun with our
                collection of free online games.
              </p>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="/"
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="/games"
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    All Games
                  </a>
                </li>
                <li>
                  <a
                    href="/categories"
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    Categories
                  </a>
                </li>
                <li>
                  <a
                    href="/favorites"
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    Favorites
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Categories</h3>
              <ul className="space-y-2">
                {categories.slice(0, 6).map((category) => (
                  <li key={category}>
                    <a
                      href={`/categories/${category.toLowerCase()}`}
                      className="text-gray-400 hover:text-white transition-colors duration-200"
                    >
                      {category}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p className="text-gray-400 text-sm">
              © 2024 Crazy Keyboard Games. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
