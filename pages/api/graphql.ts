import { createProxyMiddleware } from 'http-proxy-middleware'
import type { NextApiRequest, NextApiResponse } from 'next/types'

const isProd: boolean = process.env.NODE_ENV === 'production'
const isCloud: boolean = process.env.NEXT_PUBLIC_MAGENTO_CLOUD === 'true'

const apiProxy: any = createProxyMiddleware({
  changeOrigin: true,
  secure: true,
  pathRewrite: {
    '^/api/graphql': '/graphql'
  },
  router: async (req: any) => {
    const URL = process.env.NEXT_PUBLIC_API_URL
    return isCloud && isProd ? req.headers['origin-host'] : URL
  }
})

const handler = (request: NextApiRequest, response: NextApiResponse) => {
  if (request.headers['x-platform']) {
    apiProxy(request, response, (result) => {
      if (result instanceof Error) {
        throw result
      }

      throw new Error(`Request '${request.url}' is not proxied! We should never reach here!`)
    })
  } else {
    response.redirect(307, '/')
  }
}

export const config = {
  api: {
    externalResolver: true,
    bodyParser: false
  }
}

export default handler
