import Document, { Html, Head, Main, NextScript } from 'next/document'
import {
  createCache,
  extractStyle,
  legacyLogicalPropertiesTransformer,
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
            transformers={[legacyLogicalPropertiesTransformer]}
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
      <Html>
        <Head>
          <meta name="robots" content="INDEX,FOLLOW" />
        </Head>
        <body className="bg-body font-sans text-base text-colorDefault">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default NextDocument
