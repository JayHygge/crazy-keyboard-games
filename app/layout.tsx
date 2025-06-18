import type { Metadata } from "next";
import { Inter, Orbitron } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Crazy Keyboard Games - Best Keyboard & Mouse Games Online",
    template: "%s | Crazy Keyboard Games",
  },
  description:
    "Play the best keyboard and mouse games online! Improve your typing speed, test your coordination, and enjoy addictive gaming experiences. Free games updated daily.",
  keywords: [
    "keyboard games",
    "typing games",
    "mouse games",
    "online games",
    "free games",
    "typing speed",
    "coordination games",
    "skill games",
    "educational games",
    "puzzle games",
  ],
  authors: [{ name: "Crazy Keyboard Games" }],
  creator: "Crazy Keyboard Games",
  publisher: "Crazy Keyboard Games",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://crazykeyboardgames.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://crazykeyboardgames.com",
    title: "Crazy Keyboard Games - Best Keyboard & Mouse Games Online",
    description:
      "Play the best keyboard and mouse games online! Improve your typing speed, test your coordination, and enjoy addictive gaming experiences.",
    siteName: "Crazy Keyboard Games",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Crazy Keyboard Games - Best Keyboard & Mouse Games Online",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Crazy Keyboard Games - Best Keyboard & Mouse Games Online",
    description:
      "Play the best keyboard and mouse games online! Improve your typing speed, test your coordination, and enjoy addictive gaming experiences.",
    images: ["/images/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${orbitron.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#1a1a2e" />

        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="preconnect" href="https://www.gamemonetize.com" />

        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Crazy Keyboard Games",
              url: "https://crazykeyboardgames.com",
              description:
                "Play the best keyboard and mouse games online! Improve your typing speed, test your coordination, and enjoy addictive gaming experiences.",
              potentialAction: {
                "@type": "SearchAction",
                target:
                  "https://crazykeyboardgames.com/search?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        <div className="min-h-screen bg-game-dark">{children}</div>

        {/* Google AdSense */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXX"
          crossOrigin="anonymous"
        />
      </body>
    </html>
  );
}
