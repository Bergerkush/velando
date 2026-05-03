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

      {/* Consent Mode — первым, до любых тегов */}
      <Script id="ga-consent" strategy="beforeInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('consent', 'default', {
            analytics_storage: 'denied',
            ad_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied',
            wait_for_update: 500
          });
          try {
            const consent = localStorage.getItem('cookie_consent');
            if (consent === 'all') {
              gtag('consent', 'update', {
                analytics_storage: 'granted',
                ad_storage: 'granted',
                ad_user_data: 'granted',
                ad_personalization: 'granted'
              });
            }
          } catch(e) {}
        `}
      </Script>

      {/* Один gtag.js для обоих аккаунтов */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=AW-18130689976"
        strategy="afterInteractive"
      />

      {/* GA4 + Google Ads */}
      <Script id="google-tags" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-BECPWQMY4D');
          gtag('config', 'AW-18130689976');
        `}
      </Script>

      <Component {...pageProps} />
      <CookieBanner />
      <Script id="tawk-to" strategy="afterInteractive">
        {`
          var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
          (function(){
            var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
            s1.async=true;
            s1.src='https://embed.tawk.to/69f736c60f7c9c1c2fb084c1/1jnmqrut9';
            s1.charset='UTF-8';
            s1.setAttribute('crossorigin','*');
            s0.parentNode.insertBefore(s1,s0);
          })();
        `}
      </Script>
    </CartProvider>
  )
}
