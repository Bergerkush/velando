import '../styles/globals.css'
import { CartProvider } from '../lib/cart'
import Script from 'next/script'

export default function App({ Component, pageProps }) {
  return (
    <CartProvider>
      {/* Google Analytics */}
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
    </CartProvider>
  )
}
