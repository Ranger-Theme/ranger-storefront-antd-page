import Head from 'next/head'
import { useEffect } from 'react'
import { ConfigProvider } from 'antd'
import { events } from '@ranger-theme/utils'
import type { AppProps } from 'next/app'
import 'antd/dist/reset.css'

import { theme } from '@/config/theme.config'

const App = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    window.events = window.events || events
  }, [])

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
