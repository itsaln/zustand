import axios from 'axios'
import { StateCreator } from 'zustand'

import { BASE_URL } from '../api/api'

import { OrderCoffeeRes, OrderItem } from '../types/coffeeTypes'
import { CartActions, CartState, ListActions, ListState } from './storeTypes'

export const cartSlice: StateCreator<
	CartState & CartActions & ListState & ListActions,
	[['zustand/devtools', never], ['zustand/persist', unknown]],
	[['zustand/devtools', never], ['zustand/persist', unknown]],
	CartState & CartActions
> = (set, get) => ({
	cart: undefined,
	address: undefined,
	setAddress: (address) => {
		set({ address })
	},
	clearCart: () => {
		set({ cart: undefined })
	},
	addToCart: (item) => {
		const { cart } = get()
		const { id, name, subTitle } = item
		const preparedItem: OrderItem = {
			id,
			name: `${name} ${subTitle}`,
			size: 'L',
			quantity: 1
		}
		set({ cart: cart ? [...cart, preparedItem] : [preparedItem] })
	},
	orderCoffee: async () => {
		const { cart, address, clearCart } = get()

		try {
			const { data } = await axios.post<OrderCoffeeRes>(BASE_URL + '/order', {
				address,
				orderItems: cart
			})

			if (data.success) {
				alert(data.message)
				clearCart()
			}
		} catch (error) {
			console.log(error)
		}
	}
})
