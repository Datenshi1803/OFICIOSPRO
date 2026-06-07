import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Providers } from '@/components/providers'
import Script from 'next/script'
import './globals.css'
import CookieBanner from "@/components/CookieBanner"

const _geist = Geist({ subsets: ['latin'] })
const _geistMono = Geist_Mono({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'OficiosPro - Marketplace de Servicios Técnicos en Panamá',
  description:
    'Conectamos clientes con técnicos de aire acondicionado verificados en Panamá. Publica tu trabajo, recibe cotizaciones y elige la mejor opción.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className="bg-background">
      <body className="font-sans antialiased">
        <Providers>
          {children}
          <CookieBanner />
        </Providers>

        {process.env.NODE_ENV === 'production' && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
              strategy="afterInteractive"
            />

            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
              `}
            </Script>

            <Analytics />
          </>
        )}
      </body>
    </html>
  )
}