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
        url: 'https://nextjs.org/og.png',
        width: 800,
        height: 600,
      },
      {
        url: 'https://nextjs.org/og-alt.png',
        width: 1800,
        height: 1600,
        alt: 'My custom alt',
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
