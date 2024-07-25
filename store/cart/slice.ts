import { createSlice, Slice } from '@reduxjs/toolkit'

import {
  getCartDetails,
  addProductsToCart,
  applyCouponCode,
  cancelCouponCode,
  updateCartItem,
  removeCartItem,
  removeCartBatchItems
} from './actions'

const initialState: any = {
  cartId: null,
  cartDetail: null,
  loading: false
}

export const slice: Slice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCartId: (state: any, { payload }) => {
      state.cartId = payload
    },
    setCartDetail: (state: any, { payload }) => {
      state.cartId = payload.id
      state.cartDetail = payload
      state.loading = false
    },
    setLoading: (state: any, { payload }) => {
      state.loading = payload
    },
    setInitialState: () => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCartDetails.fulfilled, (state, { payload }) => {
        state.cartId = payload?.id ?? null
        state.cartDetail = payload || null
      })
      .addCase(addProductsToCart.fulfilled, (state, { payload }) => {
        if (payload) {
          state.cartId = payload.id
          state.cartDetail = payload
        }
      })
      .addCase(updateCartItem.fulfilled, (state, { payload }) => {
        if (payload) {
          state.cartId = payload.id
          state.cartDetail = payload
        }
      })
      .addCase(removeCartItem.fulfilled, (state, { payload }) => {
        if (payload) {
          state.cartId = payload.id
          state.cartDetail = payload
        }
      })
      .addCase(removeCartBatchItems.fulfilled, (state, { payload }) => {
        if (payload) {
          state.cartId = payload.id
          state.cartDetail = payload
        }
      })
      .addCase(applyCouponCode.fulfilled, (state, { payload }) => {
        if (payload) {
          state.cartId = payload.id
          state.cartDetail = payload
        }
      })
      .addCase(cancelCouponCode.fulfilled, (state, { payload }) => {
        if (payload) {
          state.cartId = payload.id
          state.cartDetail = payload
        }
      })
  }
})
