import { createSlice, Slice } from '@reduxjs/toolkit'

import {
  setShippingAddress,
  setBillingAddress,
  setShippingMethod,
  setPaymentMethod
} from './actions'

const initialState = {
  pageLoading: false,
  payLoading: false,
  blockList: [],
  billingAddress: null,
  shippingAddress: null,
  shippingMethods: [],
  paymentMethods: [],
  shippingMethod: null,
  paymentMethod: null,
  sameAsShipping: true
}

export const slice: Slice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    setCartId: (state: any, { payload }) => {
      state.cartId = payload
    },
    setCartDetail: (state: any, { payload }) => {
      state.cartId = payload.id
      state.cartDetail = payload
    },
    setBlockList: (state: any, { payload }) => {
      state.blockList = payload
    },
    setPageLoading: (state: any, { payload }) => {
      state.pageLoading = payload
    },
    setPayLoading: (state: any, { payload }) => {
      state.payLoading = payload
    },
    updateShippingAddress: (state: any, { payload }) => {
      state.shippingAddress = payload
    },
    updateShippingMethod: (state: any, { payload }) => {
      state.shippingMethod = payload
    },
    setInitialState: () => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(setShippingAddress.fulfilled, (state, { payload }) => {
        const shipping_methods: any[] =
          payload?.shipping_addresses?.[0]?.available_shipping_methods ?? []
        const shipping_method: any =
          payload?.shipping_addresses?.[0]?.selected_shipping_method ?? null
        const payment_methods: any[] = payload?.available_payment_methods ?? []
        state.shippingMethods = shipping_methods
        state.shippingMethod = shipping_method
        state.paymentMethods = payment_methods
      })
      .addCase(setBillingAddress.fulfilled, (state, { payload }) => {
        const shipping_methods: any[] =
          payload?.shipping_addresses?.[0]?.available_shipping_methods ?? []
        const payment_methods: any[] = payload?.available_payment_methods ?? []
        state.shippingMethods = shipping_methods
        state.paymentMethods = payment_methods
      })
      .addCase(setShippingMethod.fulfilled, (state, { payload }) => {
        const shipping_method: any =
          payload?.shipping_addresses?.[0]?.selected_shipping_method ?? null
        state.shippingMethod = shipping_method
      })
      .addCase(setPaymentMethod.fulfilled, (state, { payload }) => {
        state.paymentMethod = payload
      })
  }
})
