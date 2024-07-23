import { createProxyMiddleware } from 'http-proxy-middleware'
import type { NextApiRequest, NextApiResponse } from 'next/types'

const handler = (request: NextApiRequest, response: NextApiResponse) => {
  const isProd = process.env.NODE_ENV === 'production'
  const isCloud = process.env.NEXT_PUBLIC_MAGENTO_CLOUD === 'true'

  const apiProxy: any = createProxyMiddleware({
    changeOrigin: true,
    secure: true,
    pathRewrite: {
      '^/api/rest': '/rest'
    },
    router: async (req: any) => {
      const URL = process.env.NEXT_PUBLIC_API_URL
      return isCloud && isProd ? req.headers['origin-host'] : URL
    }
  })

  apiProxy(request, response, (result) => {
    if (result instanceof Error) {
      throw result
    }

    throw new Error(`Request '${request.url}' is not proxied! We should never reach here!`)
  })
}

export const config = {
  api: {
    externalResolver: true,
    bodyParser: false
  }
}

export default handler
