import type { ThemeConfig } from 'antd'

type AntdConfigTYpe = {
  prefix: string
  variables: ThemeConfig
}

export const antdConfig: AntdConfigTYpe = {
  prefix: 'antd',
  variables: {
    token: {
      fontFamily: 'Barlow',
      colorPrimary: '#70ADCB',
      colorError: '#D11515',
      colorText: '#231F20'
    },
    components: {
      Button: {
        fontFamily: 'Barlow',
        controlHeight: 34,
        colorPrimary: '#70ADCB',
        colorPrimaryHover: '#70ADCB',
        colorBgContainerDisabled: '#EDEDED',
        colorTextDisabled: '#666666',
        borderRadius: 0
      },
      Input: {
        controlHeight: 34,
        colorText: '#221F1F',
        colorTextPlaceholder: '#BDBDBD',
        colorPrimaryHover: '#d9d9d9',
        colorBgContainerDisabled: '#F8F8F8',
        borderRadius: 4,
        paddingSM: 13
      },
      Form: {
        marginLG: 20
      },
      Select: {
        controlHeight: 34,
        borderRadius: 4,
        paddingSM: 13,
        controlItemBgHover: '#f6f8fc',
        controlItemBgActive: '#f6f8fc'
      },
      Checkbox: {
        colorPrimary: '#70ADCB',
        colorPrimaryHover: '#70ADCB',
        borderRadiusSM: 4
      },
      Radio: {
        colorBorder: '#70ADCB'
      },
      Dropdown: {
        colorText: '#333333',
        borderRadius: 4
      },
      Typography: {
        colorLink: '#231F20',
        colorLinkHover: '#231F20'
      },
      Steps: {
        iconSize: 41
      }
    }
  }
}
