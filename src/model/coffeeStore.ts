import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

import { GetCoffeeListReqParams } from '../types/coffeeTypes'
import { CartActions, CartState, ListActions, ListState } from './storeTypes'

import { listSlice } from './listSlice'
import { cartSlice } from './cartSlice'

export const useCoffeeStore = create<
	CartState & CartActions & ListState & ListActions
>()(
	devtools(
		persist((...arg) => ({ ...listSlice(...arg), ...cartSlice(...arg) }), {
			name: 'coffeeStore',
			partialize: (state) => ({
				cart: state.cart,
				address: state.address
			})
		}),
		{
			name: 'coffeeStore'
		}
	)
)

export const getCoffeeList = (params?: GetCoffeeListReqParams) =>
	useCoffeeStore.getState().getCoffeeList(params)
