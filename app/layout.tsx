import type { Metadata, Viewport } from 'next'
import { Quicksand, Mulish } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
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
  title: 'GoPesca - Encontre e Reserve Experiências de Pesca no Brasil',
  description: 'Guias verificados, destinos incríveis e reservas online. A plataforma que conecta pescadores a guias de pesca em todo o Brasil.',
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning className={`${mulish.variable} ${quicksand.variable}`}>
      <body className="font-sans antialiased bodyScrollbar">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
