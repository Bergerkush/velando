import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="de">
      <Head>
        <meta charSet="utf-8" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <meta name="theme-color" content="#0f172a" />
      </Head>
      <body>
        <Main />
        <NextScript />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              setTimeout(function(){
                var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
                var s1=document.createElement("script");
                s1.async=true;
                s1.src='https://embed.tawk.to/69f736c60f7c9c1c2fb084c1/1jnmqrut9';
                s1.charset='UTF-8';
                s1.setAttribute('crossorigin','*');
                document.body.appendChild(s1);
              }, 3000);
            `
          }}
        />
      </body>
    </Html>
  )
}
