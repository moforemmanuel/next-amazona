import { ServerStyleSheets } from '@mui/styles';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import React from 'react';

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

// get initial props
// MyDocument.getInitialProps = async(ctx) => {

//     const sheets = new ServerStyleSheets();
//     // get original render page from context

//     const originalRenderPage = ctx.renderPage;
//     ctx.renderPage = () => {
//         return originalRenderPage({
//             enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
//         });
//     };

//     //call get initial props
//     const initialProps = await Document.getInitialProps(ctx);

//     return {
//         ...initialProps,
//         styles: [
//             ...React.Children.toArray(initialProps.styles),
//             sheets.getStyleElement(),
//         ]
//     }
// }