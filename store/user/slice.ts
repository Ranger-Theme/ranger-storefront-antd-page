import { createSlice, Slice } from '@reduxjs/toolkit'

import {
  getUserDetails,
  getUserAddress,
  addToWishlists,
  getWishlists,
  removeWishlistsItem
} from './actions'

const initialState = {
  isLogin: false,
  token: null,
  userDetail: null,
  addressList: [],
  viewOrderId: '',
  wishlistsId: '',
  wishlists: [],
  bomList: []
}

export const slice: Slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserToken: (state: any, { payload }) => {
      state.isLogin = !!payload
      state.token = payload
    },
    setUserDetail: (state: any, { payload }) => {
      state.isLogin = true
      state.userDetail = payload
      const wishlistsId = payload?.wishlists?.[0]?.id ?? ''
      if (wishlistsId) {
        state.wishlistsId = wishlistsId
      }
    },
    setWishlistsId: (state: any, { payload }) => {
      state.wishlistsId = payload
    },
    setWishlists: (state: any, { payload }) => {
      state.wishlists = payload
    },
    setViewOrderId: (state: any, { payload }) => {
      state.viewOrderId = payload
    },
    setAddressList: (state: any, { payload }) => {
      state.addressList = payload
    },
    setBomList: (state: any, { payload }) => {
      state.bomList = payload
    },
    updateUserDetail: (state: any, { payload }) => {
      const { telephone } = payload
      state.userDetail = { ...state.userDetail, telephone }
    },
    setInitialState: () => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserDetails.fulfilled, (state, { payload }) => {
        state.userDetail = payload || null
        const wishlistsId = payload?.wishlists?.[0]?.id ?? ''
        if (wishlistsId) {
          state.wishlistsId = wishlistsId
        }
      })
      .addCase(getUserDetails.rejected, (state) => {
        state.isLogin = false
        state.token = null
        state.userDetail = null
      })
      .addCase(getUserAddress.fulfilled, (state, { payload }) => {
        state.addressList = payload
      })
      .addCase(getUserAddress.rejected, (state) => {
        state.addressList = []
      })
      .addCase(addToWishlists.fulfilled, (state, { payload }) => {
        state.wishlists = payload
      })
      .addCase(removeWishlistsItem.fulfilled, (state, { payload }) => {
        state.wishlists = payload
      })
      .addCase(getWishlists.fulfilled, (state, { payload }) => {
        const wishlistsId = payload?.[0]?.id ?? ''
        const wishlistsItems = payload?.[0]?.items_v2?.items ?? []
        state.wishlistsId = wishlistsId
        state.wishlists = wishlistsItems
      })
  }
})
