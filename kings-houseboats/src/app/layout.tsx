import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { WhatsAppButton } from "@/components/shared/whatsapp-button";
import { CallButton } from "@/components/shared/call-button";
import { SchemaMarkup } from "@/components/seo/schema-markup";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://kingshouseboats.com"),
  title: {
    default: "Kings Houseboats — Luxury Houseboat Stay on Nigeen Lake, Srinagar",
    template: "%s | Kings Houseboats — Nigeen Lake, Srinagar",
  },
  description:
    "Experience royal Kashmiri hospitality at Kings Houseboats on Nigeen Lake, Srinagar. Luxury houseboat accommodation with breathtaking lake views, traditional woodwork, authentic cuisine & unforgettable memories in Kashmir.",
  keywords: [
    "Best Houseboat in Srinagar",
    "Best Houseboat in Nigeen Lake",
    "Luxury Houseboat Srinagar",
    "Nigeen Lake Houseboat",
    "Houseboat in Kashmir",
    "Srinagar Houseboat Booking",
    "Luxury Stay in Kashmir",
    "Kashmir Houseboat Stay",
    "Premium Houseboat Srinagar",
    "Houseboat Accommodation Srinagar",
    "Honeymoon Houseboat Srinagar",
    "Family Houseboat Kashmir",
    "Traditional Kashmiri Houseboat",
  ],
  authors: [{ name: "Kings Houseboats" }],
  creator: "Kings Houseboats",
  publisher: "Kings Houseboats",
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://kingshouseboats.com",
    siteName: "Kings Houseboats",
    title: "Kings Houseboats — Luxury Houseboat on Nigeen Lake, Srinagar, Kashmir",
    description:
      "Discover luxury houseboat living on the tranquil waters of Nigeen Lake. Enjoy authentic Kashmiri hospitality, elegant interiors, breathtaking lake views & unforgettable memories.",
    images: [
      {
        url: "/images/hero/hero-lake-mountains.png",
        width: 1200,
        height: 630,
        alt: "Kings Houseboats on Nigeen Lake with snow-capped mountains, Srinagar Kashmir",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kings Houseboats — Luxury Houseboat on Nigeen Lake, Srinagar",
    description:
      "Experience royal Kashmiri hospitality at Kings Houseboats. Luxury accommodation on Nigeen Lake with stunning views & authentic cuisine.",
    images: ["/images/hero/hero-lake-mountains.png"],
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
  alternates: {
    canonical: "https://kingshouseboats.com",
  },
  category: "Travel & Tourism",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} h-full`}
    >
      <head>
        <SchemaMarkup />
        {/* Google Analytics 4 - Replace GA_MEASUREMENT_ID with your actual ID */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'GA_MEASUREMENT_ID');
            `,
          }}
        />
        {/* Google Tag Manager - Replace GTM_CONTAINER_ID with your actual ID */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM_CONTAINER_ID');
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col font-[family-name:var(--font-inter)] antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton />
        <CallButton />
      </body>
    </html>
  );
}
