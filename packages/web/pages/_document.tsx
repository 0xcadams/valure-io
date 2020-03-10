import { ServerStyleSheets } from '@material-ui/core/styles';
import { default as NextDocument, Head, Main, NextScript } from 'next/document';
import * as React from 'react';

export default class ValureDocument extends NextDocument {
  public render() {
    return (
      <html lang="en">
        <Head>
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
          />
          <link rel="manifest" href="/site.webmanifest.json" />
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#2F3061" />
          <link rel="shortcut icon" href="/favicon.ico" />
          <meta name="apple-mobile-web-app-title" content="Valure" />
          <meta name="application-name" content="Valure" />
          <meta name="msapplication-TileColor" content="#2f3061" />
          <meta name="theme-color" content="#2f3061" />
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
          />
          <meta charSet="utf-8" />

          <noscript>You need to enable JavaScript to run this app.</noscript>

          <link rel="stylesheet" href="https://use.typekit.net/zer2jbo.css" />
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}

ValureDocument.getInitialProps = async (ctx) => {
  // Resolution order
  //
  // On the server:
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. document.getInitialProps
  // 4. app.render
  // 5. page.render
  // 6. document.render
  //
  // On the server with error:
  // 1. document.getInitialProps
  // 2. app.render
  // 3. page.render
  // 4. document.render
  //
  // On the client
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. app.render
  // 4. page.render

  // Render app and page and get the context of the page with collected side effects.
  const sheets = new ServerStyleSheets();
  const originalRenderPage = ctx.renderPage;

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) => (props) => sheets.collect(<App {...props} />)
    });

  const initialProps = await NextDocument.getInitialProps(ctx);

  return {
    ...initialProps,
    // Styles fragment is rendered after the app and page rendering finish.
    styles: [
      ...React.Children.toArray(initialProps.styles),
      sheets.getStyleElement()
    ]
  };
};
