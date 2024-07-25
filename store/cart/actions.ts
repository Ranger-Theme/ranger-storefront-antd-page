import { createAsyncThunk } from '@reduxjs/toolkit'

import { getItem, setItem } from '@ranger-theme/utils'

import { slice } from './slice'

const { actions } = slice

export const getCartDetails = createAsyncThunk(
  'cart/getCartDetails',
  async (payload: any, { dispatch }) => {
    const { fetchCustomerCart } = payload
    const fetchCartDetails = fetchCustomerCart
    const cacheId = getItem(null, 'cart_id') || ''

    await dispatch(actions.setLoading(true))
    try {
      const { data } = await fetchCartDetails({
        fetchPolicy: 'no-cache'
      })
      const cartDetail: any = data.cart
      if (!cacheId) setItem(null, 'cart_id', cartDetail.id)
      return cartDetail
    } catch (error: any) {
      //
    } finally {
      await dispatch(actions.setLoading(false))
    }
  }
)

export const addProductsToCart = createAsyncThunk(
  'cart/addProductsToCart',
  async (payload: any, { getState }) => {
    const { addToCartMutation, cartItems } = payload
    const { cart }: any = getState()
    const { cartId } = cart
    const cacheId = getItem(null, 'cart_id') || ''
    const cart_id = cacheId === cartId ? cacheId : cartId

    try {
      const { data } = await addToCartMutation({
        variables: {
          cartId: cart_id,
          cartItems
        }
      })

      const result: any = data.addToCart.cart
      // hack checkout success cart_id will be override
      if (result.id !== cacheId) setItem(null, 'cart_id', result.id)
      return data.addToCart.cart
    } catch (error: any) {
      return Promise.reject(error)
    }
  }
)

export const updateCartItem = createAsyncThunk(
  'cart/updateCartItem',
  async (payload: any, { dispatch, getState }) => {
    const { customizable, id, quantity, updateCartMutaion } = payload
    const { cart }: any = getState()
    const { cartId } = cart
    const cacheId = getItem(null, 'cart_id') || ''
    const cart_id = cacheId === cartId ? cacheId : cartId
    const selected_options = customizable ? { selected_options: customizable } : {}

    try {
      dispatch(actions.setLoading(true))
      const { data } = await updateCartMutaion({
        variables: {
          cartId: cart_id,
          cartItems: [
            {
              cart_item_id: id,
              quantity,
              ...selected_options
            }
          ]
        }
      })

      const cartDetail = data.updateCart.cart
      dispatch(actions.setLoading(false))
      return cartDetail
    } catch (error: any) {
      dispatch(actions.setLoading(false))
      return Promise.reject(error)
    }
  }
)

export const removeCartItem = createAsyncThunk(
  'cart/removeCartItem',
  async (payload: any, { dispatch, getState }) => {
    const { id, removeCartMutation } = payload
    const { cart }: any = getState()
    const { cartId } = cart
    const cacheId = getItem(null, 'cart_id') || ''
    const cart_id = cacheId === cartId ? cacheId : cartId

    try {
      dispatch(actions.setLoading(true))
      const { data } = await removeCartMutation({
        variables: {
          cart_id,
          cart_item_id: id
        }
      })

      const cartDetail = data.removeCart.cart
      return cartDetail
    } catch (error: any) {
      return Promise.reject(error)
    } finally {
      dispatch(actions.setLoading(false))
    }
  }
)

export const removeCartBatchItems = createAsyncThunk(
  'cart/removeCartItems',
  async (payload: any, { dispatch, getState }) => {
    const { items, removeCartItemsMutation } = payload
    const { cart }: any = getState()
    const { cartId } = cart
    const cacheId = getItem(null, 'cart_id') || ''
    const cart_id = cacheId === cartId ? cacheId : cartId

    try {
      dispatch(actions.setLoading(true))
      const { data } = await removeCartItemsMutation({
        variables: {
          cartId: cart_id,
          items
        }
      })

      const cartDetail = data.RemoveBatchItemsFromCart.cart
      dispatch(actions.setLoading(false))
      return cartDetail
    } catch (error: any) {
      dispatch(actions.setLoading(false))
      return Promise.reject(error)
    }
  }
)

export const applyCouponCode = createAsyncThunk(
  'cart/applyCouponCode',
  async (payload: any, { getState }) => {
    const { promo, applyCouponMutaion } = payload
    const { cart }: any = getState()
    const { cartId } = cart

    try {
      const { data } = await applyCouponMutaion({
        variables: { cartId, promo }
      })
      const cartDetail: any = data?.applyCoupon?.cart ?? null
      return Promise.resolve(cartDetail)
    } catch (error: any) {
      return Promise.reject(error)
    }
  }
)

export const cancelCouponCode = createAsyncThunk(
  'cart/cancelCouponCode',
  async (payload: any, { getState }) => {
    const { cancelCouponMutaion } = payload
    const { cart }: any = getState()
    const { cartId } = cart

    try {
      const { data } = await cancelCouponMutaion({
        variables: { cartId }
      })
      const cartDetail: any = data?.cancelCoupon?.cart ?? null
      return Promise.resolve(cartDetail)
    } catch (error: any) {
      return Promise.reject(error)
    }
  }
)
