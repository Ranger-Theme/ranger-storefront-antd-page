import Head from 'next/head'
import { ConfigProvider } from 'antd'
import type { AppProps } from 'next/app'
import 'antd/dist/reset.css'

import { theme } from '@/config/theme.config'

const App = ({ Component, pageProps }: AppProps) => {
  console.info('app is bootstrap...')

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, shrink-to-fit=no, viewport-fit=cover"
        />
      </Head>
      <ConfigProvider prefixCls={theme.prefix} iconPrefixCls={theme.prefix} theme={theme.variables}>
        <Component {...pageProps} />
      </ConfigProvider>
    </>
  )
}

export default App
