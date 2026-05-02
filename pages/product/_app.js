import '../styles/globals.css'
import { CartProvider } from '../lib/cart'
import Script from 'next/script'
import Head from 'next/head'
import CookieBanner from '../components/CookieBanner'

export default function App({ Component, pageProps }) {
  return (
    <CartProvider>
      <Head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta name="theme-color" content="#0f172a" />
      </Head>
      <Script id="ga-consent" strategy="beforeInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('consent', 'default', {
            analytics_storage: 'denied',
            ad_storage: 'denied',
            wait_for_update: 500
          });
          try {
            const consent = localStorage.getItem('cookie_consent');
            if (consent === 'all') {
              gtag('consent', 'update', {
                analytics_storage: 'granted',
                ad_storage: 'granted'
              });
            }
          } catch(e) {}
        `}
      </Script>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-BECPWQMY4D"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-BECPWQMY4D');
        `}
      </Script>
      <Component {...pageProps} />
      <CookieBanner />
    </CartProvider>
  )
}
