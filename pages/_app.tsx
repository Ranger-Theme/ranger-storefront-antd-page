import Head from 'next/head'
import { ConfigProvider } from 'antd'
import { withApollo, withRedux } from '@ranger-theme/core'
import type { AppProps } from 'next/app'
import 'antd/dist/reset.css'
import '@/styles/global.css'

import { theme } from '@/config/theme.config'
import { rootReducer } from '@/store'
import AppLayout from '@/components/AppLayout'

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
        <AppLayout>
          <Component {...pageProps} />
        </AppLayout>
      </ConfigProvider>
    </>
  )
}

export default withApollo(withRedux(App, rootReducer))
