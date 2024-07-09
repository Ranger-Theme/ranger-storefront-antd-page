import type { ThemeConfig } from 'antd'

interface Theme {
  prefix: string
  variables: ThemeConfig
}

export const theme: Theme = {
  prefix: 'ranger',
  variables: {
    token: {
      colorPrimary: '#70ADCB'
    },
    components: {
      Button: {
        colorPrimary: '#70ADCB',
        colorPrimaryHover: '#70ADCB'
      }
    }
  }
}
