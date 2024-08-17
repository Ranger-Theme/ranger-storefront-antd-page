import Head from 'next/head'
import { StyleProvider, legacyLogicalPropertiesTransformer } from '@ant-design/cssinjs'
import { ConfigProvider as AntdConfigProvider } from 'antd'
import { ApolloProvider } from '@apollo/client'
import { Provider as ReduxProvider } from 'react-redux'
import { ThemeProvider, StyleSheetManager } from 'styled-components'
import { withApollo, withRedux } from '@ranger-theme/core'
import { shouldForwardProp } from '@ranger-theme/utils'
import { isEmpty } from 'lodash-es'
import type { AppProps as NextAppProps } from 'next/app'
import 'antd/dist/reset.css'
import '@/styles/global.css'

import { antdConfig } from '@/config/antd.config'
import { styledConfig } from '@/config/styled.config'
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
          <StyleProvider
            ssrInline
            hashPriority="high"
            transformers={[legacyLogicalPropertiesTransformer]}
          >
            <StyleSheetManager enableVendorPrefixes shouldForwardProp={shouldForwardProp}>
              <ThemeProvider theme={styledConfig}>
                <AntdConfigProvider
                  prefixCls={antdConfig.prefix}
                  iconPrefixCls={antdConfig.prefix}
                  theme={antdConfig.variables}
                >
                  <AppLayout>
                    <Component {...pageProps} />
                  </AppLayout>
                </AntdConfigProvider>
              </ThemeProvider>
            </StyleSheetManager>
          </StyleProvider>
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
