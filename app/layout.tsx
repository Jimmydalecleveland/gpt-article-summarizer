import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

// @TODO - Update with real metadata and images
export const metadata: Metadata = {
  title: 'JimmyDC Blog Post Summarizer',
  description: 'Get a short summary of any blog post on blog.jimmydc.com',
  openGraph: {
    title: 'JimmyDC Blog Post Summarizer',
    description: 'Get a short summary of any blog post on blog.jimmydc.com',
    url: 'https://blog.jimmydc.com/summarizer',
    siteName: 'JimmyDC Blog Post Summarizer',
    images: [
      {
        url: '/images/swash-og-800x600.png',
        width: 800,
        height: 600,
        alt: "OpenGraph image for 'Swashbuckling with Code' blog featuring a dark, moody pirate theme. In the center, a quill writes code on parchment atop an antique desk. Surrounding the parchment are elements of old and modern navigation: a ship's wheel intertwined with digital gears and circuitry. The aesthetic blends the adventure of piracy with the precision of software development.",
      },
      {
        url: '/images/swash-og-1152x1024.png',
        width: 1152,
        height: 1024,
        alt: "OpenGraph image for 'Swashbuckling with Code' blog featuring a dark, moody pirate theme. In the center, a quill writes code on parchment atop an antique desk. Surrounding the parchment are elements of old and modern navigation: a ship's wheel intertwined with digital gears and circuitry. The aesthetic blends the adventure of piracy with the precision of software development.",
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  // @TODO - Add Twitter metadata
  // twitter: {
  //   handle: '@jimmydc',
  // }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
