import { parseCookies, destroyCookie } from '@ranger-theme/utils'

export const useApp = async ({ ctx, storeQuery, appActions, userActions }: any) => {
  const { apollo, reduxStore, req, res } = ctx
  const { dispatch, getState } = reduxStore
  const cookies = parseCookies({ req })
  const state = getState()
  const store: string = cookies?.store_code ?? ''
  const token: string = cookies?.access_token ?? ''

  await apollo
    .query({
      query: storeQuery,
      context: {
        headers: {
          Store: state?.app?.storeConfig?.code ?? store
        }
      }
    })
    .then(async (response: any) => {
      if (response.data) {
        const key = response.data.storeConfig.locale
        console.info(key)
        // const i18nJson = await import(`/public/i18n/${key}.json`)
        await dispatch(
          appActions.setAppConfig({
            ...response.data
          })
        )
        // await dispatch(i18nActions.setLanguages(i18nJson.default))
        await dispatch(userActions.setUserToken(token))
      }
    })
    .catch((error: any) => {
      console.info(error)
      destroyCookie(ctx, 'access_token')
      destroyCookie(ctx, 'cart_id')
      destroyCookie(ctx, 'store_code')
      destroyCookie(ctx, 'currency_code')
      res.writeHead(302, { Location: '/' })
      res.end()
    })
}
