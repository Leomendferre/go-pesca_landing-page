import type { Metadata, Viewport } from 'next'
import { Quicksand, Mulish } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { SITE_URL, BRAND_URL, SITE_NAME, SITE_TITLE, SITE_DESCRIPTION } from '@/lib/site'
import './globals.css'

const mulish = Mulish({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-mulish',
  display: 'swap',
})

const quicksand = Quicksand({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-quicksand',
  display: 'swap',
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  keywords: [
    'guia de pesca',
    'pescaria',
    'reservar pescaria',
    'pesca esportiva',
    'guias de pesca verificados',
    'pesca no Brasil',
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: '/images/og-gopesca.jpg',
        width: 1200,
        height: 630,
        alt: 'Pescaria ao amanhecer — GoPesca, guias de pesca verificados no Brasil',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ['/images/og-gopesca.jpg'],
  },
  icons: {
    icon: [
      {
        url: '/logo.jpeg',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/logo.jpeg',
        media: '(prefers-color-scheme: dark)',
      },
    ],
    apple: '/logo.jpeg',
  },
}

/** Dados estruturados (JSON-LD) — ajudam o Google a entender a marca e o site. */
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${BRAND_URL}/#organization`,
      name: SITE_NAME,
      url: BRAND_URL,
      logo: `${SITE_URL}/logo_hr_GP.png`,
      description:
        'Plataforma que conecta pescadores a guias de pesca verificados em todo o Brasil.',
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      name: SITE_NAME,
      url: SITE_URL,
      inLanguage: 'pt-BR',
      publisher: { '@id': `${BRAND_URL}/#organization` },
    },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning className={`${mulish.variable} ${quicksand.variable}`}>
      <body className="font-sans antialiased bodyScrollbar">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
