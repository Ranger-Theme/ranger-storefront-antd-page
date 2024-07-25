import type { FC, PropsWithChildren } from 'react'

import Header from '@/components/Header'

const AppLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <main className="main-root bg-white relative text-colorDefault z-foreground">
      <div className="header-switchersContainer bg-gray-100 hidden px-8 w-full sm_block">
        <div className="header-switchers auto-cols-max grid grid-flow-col justify-end max-w-site mx-auto relative w-full z-menu">
          <div className="storeSwitcher grid items-center justify-items-start max-w-site mx-auto my-0 px-xs py-2xs relative sm_justify-items-end" />
          <div className="currencySwitcher grid items-center justify-items-start max-w-site mx-auto my-0 p-0 relative sm_justify-items-end" />
        </div>
      </div>
      <Header />
      {children}
      <div className="border-t-2 border-solid border-light gap-y-16 grid leading-normal max-w-site min-h-[15rem] mx-auto my-0 pt-16 text-sm text-subtle w-full" />
    </main>
  )
}

export default AppLayout
