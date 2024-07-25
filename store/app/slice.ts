import { createSlice, Slice } from '@reduxjs/toolkit'

export const slice: Slice = createSlice({
  name: 'app',
  initialState: {
    currency: null,
    loading: false,
    storeConfig: null,
    treeMenus: []
  },
  reducers: {
    setAppConfig: (state: any, { payload }) => {
      const { currency, storeConfig } = payload
      state.currency = currency
      state.storeConfig = storeConfig
    },
    setTreeMenus: (state: any, { payload }) => {
      const { treeMenus } = payload
      state.treeMenus = treeMenus
    },
    setLoading: (state, { payload }) => {
      state.loading = payload
    }
  }
})
