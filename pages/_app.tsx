import Head from 'next/head'
import { useEffect } from 'react'
import { ConfigProvider } from 'antd'
import { events } from '@ranger-theme/utils'
import type { AppProps } from 'next/app'
import 'antd/dist/reset.css'

import '@/styles/global.css'

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
        <main className="main-root-c9- bg-white relative text-colorDefault z-foreground">
          <div className="header-switchersContainer-oIh bg-gray-100 hidden px-8 w-full sm_block">
            <div className="header-switchers-K3o auto-cols-max grid grid-flow-col justify-end max-w-site mx-auto relative w-full z-menu">
              <div className="storeSwitcher-root-qtK grid items-center justify-items-start max-w-site mx-auto my-0 px-xs py-2xs relative sm_justify-items-end" />
              <div className="currencySwitcher-root-oE0 grid items-center justify-items-start max-w-site mx-auto my-0 p-0 relative sm_justify-items-end" />
            </div>
          </div>
          <Component {...pageProps} />
          <div className="border-t-2 border-solid border-light gap-y-16 grid leading-normal max-w-site min-h-[15rem] mx-auto my-0 pt-16 text-sm text-subtle w-full" />
        </main>
      </ConfigProvider>
    </>
  )
}

export default App
