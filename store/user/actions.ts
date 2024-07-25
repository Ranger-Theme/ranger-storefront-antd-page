import { createAsyncThunk } from '@reduxjs/toolkit'

export const getWishlists = createAsyncThunk('user/getWishlists', async (payload: any) => {
  const { fetchWishlists } = payload

  try {
    const { data } = await fetchWishlists({
      fetchPolicy: 'no-cache'
    })
    return data?.customer?.wishlists ?? []
  } catch (error: any) {
    return Promise.reject(error)
  }
})

export const getUserDetails = createAsyncThunk('user/getUserDetails', async (payload: any) => {
  const { fetchUser } = payload

  try {
    const { data } = await fetchUser()
    const customer = data.customer ?? {}
    return customer
  } catch (error: any) {
    return Promise.reject(error)
  }
})

export const getUserAddress = createAsyncThunk('user/getUserAddress', async (payload: any) => {
  const { fetchAddress } = payload

  try {
    const { data } = await fetchAddress({
      fetchPolicy: 'no-cache'
    })
    const address = data?.customer?.address ?? []
    return address
  } catch (error: any) {
    return Promise.reject(error)
  }
})

export const addToWishlists = createAsyncThunk(
  'app/addToCompare',
  async (payload: any, { getState }) => {
    try {
      const { items, addToWishlistsMutation } = payload
      const { user }: any = getState()
      const wishlistsId = user?.wishlistsId ?? ''

      try {
        const { data } = await addToWishlistsMutation({
          variables: {
            wishlistId: wishlistsId,
            wishlistItems: items
          }
        })
        return data?.addProductsToWishlist?.wishlist?.items_v2?.items ?? []
      } catch (error) {
        return Promise.reject()
      }
    } catch (error: any) {
      return Promise.reject(error)
    }
  }
)

export const removeWishlistsItem = createAsyncThunk(
  'app/removeWishlistsItem',
  async (payload: any, { getState }) => {
    try {
      const { ids, removeWishlistsItemMutation } = payload
      const { user }: any = getState()
      const wishlistsId = user?.wishlistsId ?? ''

      try {
        const { data } = await removeWishlistsItemMutation({
          variables: {
            wishlistId: wishlistsId,
            wishlistItemsIds: ids
          }
        })
        return data?.removeProductsFromWishlist?.wishlist?.items_v2?.items ?? []
      } catch (error) {
        return Promise.reject()
      }
    } catch (error: any) {
      return Promise.reject(error)
    }
  }
)
