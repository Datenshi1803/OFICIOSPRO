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
      <head>
        {/* Microsoft Clarity */}
        <Script
          id="clarity-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "wxwsawh8u8");
            `,
          }}
        />
      </head>
      <body className="font-sans antialiased">
        {/* Sincronización de ajustes locales */}
        <Script id="settings-sync" strategy="beforeInteractive">
          {`(function(){try{var rawTheme=localStorage.getItem('settings_theme');var rawLang=localStorage.getItem('settings_lang');var rawTimezone=localStorage.getItem('settings_timezone');var theme=rawTheme?JSON.parse(rawTheme):'claro';var lang=rawLang?JSON.parse(rawLang):'es';var timezone=rawTimezone?JSON.parse(rawTimezone):'America/Panama';var root=document.documentElement;if(theme==='oscuro'){root.classList.add('dark')}else{root.classList.remove('dark')}root.lang=lang;root.setAttribute('data-lang',lang);root.setAttribute('data-timezone',timezone);}catch(e){}})()`}
        </Script>

        <Providers>
          {children}
          <CookieBanner />
        </Providers>

        {process.env.NODE_ENV === 'production' && (
          <>
            {/* Google Analytics */}
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

            {/* Vercel Analytics */}
            <Analytics />
          </>
        )}
      </body>
    </html>
  )
}
