import Head from 'next/head'
import { ConfigProvider } from 'antd'
import { ApolloProvider } from '@apollo/client'
import { Provider as ReduxProvider } from 'react-redux'
import { withApollo, withRedux } from '@ranger-theme/core'
import { isEmpty } from 'lodash-es'
import type { AppProps as NextAppProps } from 'next/app'
import 'antd/dist/reset.css'
import '@/styles/global.css'

import { theme } from '@/config/theme.config'
import { GET_STORE_CONFIG } from '@/apis/getStoreConfig'
import { rootReducer } from '@/store'
import { actions as appActions } from '@/store/app'
import { actions as userActions } from '@/store/user'
import { useApp } from '@/hooks/useApp'
import AppLayout from '@/components/AppLayout'

interface AppProps extends NextAppProps {
  apolloClient?: any
  reduxStore?: any
}

const App = ({ Component, pageProps, apolloClient, reduxStore }: AppProps) => {
  console.info('app is bootstrap...')

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, shrink-to-fit=no, viewport-fit=cover"
        />
      </Head>
      <ApolloProvider client={apolloClient}>
        <ReduxProvider store={reduxStore}>
          <ConfigProvider
            prefixCls={theme.prefix}
            iconPrefixCls={theme.prefix}
            theme={theme.variables}
          >
            <AppLayout>
              <Component {...pageProps} />
            </AppLayout>
          </ConfigProvider>
        </ReduxProvider>
      </ApolloProvider>
    </>
  )
}

App.getInitialProps = async ({ Component, ctx }) => {
  const { reduxStore } = ctx
  const state = reduxStore.getState()

  if (isEmpty(state.app.storeConfig)) {
    await useApp({
      ctx,
      storeQuery: GET_STORE_CONFIG,
      appActions,
      userActions
    })
  }

  const pageProps = Component.getInitialProps ? await Component.getInitialProps({ ...ctx }) : {}

  return { pageProps }
}

export default withApollo(withRedux(App, rootReducer))
