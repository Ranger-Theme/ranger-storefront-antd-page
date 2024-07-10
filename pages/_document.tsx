import Script from 'next/script'
import Document, { Html, Head, Main, NextScript } from 'next/document'
import {
  createCache,
  extractStyle,
  legacyLogicalPropertiesTransformer,
  px2remTransformer,
  StyleProvider
} from '@ant-design/cssinjs'
import type { DocumentContext, DocumentProps, DocumentInitialProps } from 'next/document'

class NextDocument extends Document<DocumentProps & { deviceType: string }> {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps & { deviceType: string }> {
    const cache = createCache()
    const originalRenderPage = ctx.renderPage
    const deviceType = (ctx.req?.headers['x-device-type'] as string) ?? 'PC'

    // Run the React rendering logic synchronously
    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App) => (props) => (
          <StyleProvider
            cache={cache}
            ssrInline
            hashPriority="high"
            transformers={[
              legacyLogicalPropertiesTransformer,
              px2remTransformer({
                rootValue: deviceType === 'H5' ? 50 : 100,
                precision: 5,
                mediaQuery: true
              })
            ]}
          >
            <App {...props} />
          </StyleProvider>
        ),
        enhanceComponent: (Component) => Component
      })

    // Run the parent `getInitialProps`, it now includes the custom `renderPage`
    const initialProps = await Document.getInitialProps(ctx)
    const style = extractStyle(cache, true)

    return {
      ...initialProps,
      deviceType,
      styles: (
        <>
          {initialProps.styles}
          <style id="__jss_server_side__" dangerouslySetInnerHTML={{ __html: style }} />
        </>
      )
    }
  }

  render() {
    return (
      <Html lang="en" style={{ fontSize: this.props.deviceType === 'H5' ? '50px' : '100px' }}>
        <Head>
          <meta name="robots" content="INDEX,FOLLOW" />
        </Head>
        <body>
          <Script
            id="__html_font_size__"
            strategy="beforeInteractive"
            dangerouslySetInnerHTML={{
              __html: `
              !(function(w) {
                var t = w.document,
                  n = t.documentElement,
                  a = 'orientationchange' in w ? 'orientationchange' : 'resize',
                  d = function() {
                    var e = w.innerWidth || 1200;
                    if (e <= 1200) {
                      n.style.fontSize = e / 7.5 + 'px';
                    } else {
                      n.style.fontSize = e / 19.2 + 'px';
                    }
                  };
                if (t.readyState === 'loading') d();
                document.documentElement.addEventListener(\"touchmove\",function(event){
                  if (event.touches.length > 1) event.preventDefault();
                }, false);
                t.addEventListener && (w.addEventListener(a, d, !1), 'interactive' === t.readyState || t.addEventListener('DOMContentLoaded', function() {
                  setTimeout(d);
                }, !1));
              })(window);
            `
            }}
          />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default NextDocument
