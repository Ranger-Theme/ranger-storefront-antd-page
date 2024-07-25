import { createAsyncThunk } from '@reduxjs/toolkit'

import { getItem } from '@ranger-theme/utils'

import { slice } from './slice'

const { actions } = slice

export const setShippingAddress = createAsyncThunk(
  'checkout/setShippingAddress',
  async (payload: any, { getState }) => {
    const { addresses, shippingAddressMutation } = payload
    const { cart }: any = getState()
    const { cartId } = cart
    const cookieId = getItem(null, 'cart_id')
    const cart_id = cookieId || cartId

    try {
      const { data } = await shippingAddressMutation({
        variables: { cartId: cart_id, addresses }
      })
      const cartDetail: any = data?.shippingAddress?.cart ?? null
      return cartDetail
    } catch (error: any) {
      return null
    }
  }
)

export const setShippingMethod = createAsyncThunk(
  'checkout/setShippingMethod',
  async (payload: any, { dispatch, getState }) => {
    const { method, shippingMethodMutation } = payload
    const { cart }: any = getState()
    const { cartId } = cart

    try {
      const { data } = await shippingMethodMutation({
        variables: { cartId, method }
      })
      const cartDetail: any = data?.shippingMethods?.cart ?? null
      await dispatch(actions.setPageLoading(false))
      return cartDetail
    } catch (error: any) {
      await dispatch(actions.setPageLoading(false))
      return null
    }
  }
)

export const setPaymentMethod = createAsyncThunk(
  'checkout/setPaymentMethod',
  async (payload: any, { dispatch, getState }) => {
    const { method, paymentMethodMutation } = payload
    const { cart }: any = getState()
    const { cartId } = cart

    try {
      const { data } = await paymentMethodMutation({
        variables: { cartId, method }
      })
      const cartDetail: any = data?.paymentMethod?.cart ?? null
      return Promise.resolve(cartDetail)
    } catch (error: any) {
      await dispatch(actions.setPayLoading(false))
      return Promise.reject(error)
    }
  }
)

export const setBillingAddress = createAsyncThunk(
  'checkout/setBillingAddress',
  async (payload: any, { dispatch, getState }) => {
    const { addresses, billingAddressMutation, shippingMethodMutation } = payload
    const { cart }: any = getState()
    const { cartId } = cart
    const cookieId = getItem(null, 'cart_id')
    const cart_id = cookieId || cartId

    try {
      const { data } = await billingAddressMutation({
        variables: { cartId: cart_id, addresses }
      })
      const cartDetail: any = data?.billingAddress?.cart ?? null
      const methods: any[] = cartDetail?.shipping_addresses?.[0]?.available_shipping_methods ?? []
      const activeMethod: any = methods.find((method: any) => method.carrier_code === 'nexrates')

      if (activeMethod) {
        const { carrier_code, method_code } = activeMethod
        await dispatch(
          setShippingMethod({
            method: [
              {
                carrier_code,
                method_code
              }
            ],
            shippingMethodMutation
          })
        )
      }
      return cartDetail
    } catch (error: any) {
      return null
    }
  }
)

export const placeOrder = createAsyncThunk(
  'checkout/placeOrder',
  async (payload: any, { dispatch, getState }) => {
    const { placeOrderMutation } = payload
    const { cart }: any = getState()
    const { cartId } = cart

    try {
      const { data } = await placeOrderMutation({
        variables: { cartId }
      })
      const order: any = data?.placeOrder?.order ?? null
      return Promise.resolve(order)
    } catch (error: any) {
      await dispatch(actions.setPageLoading(false))
      return Promise.reject(error)
    }
  }
)
