import axios from 'axios'
import { create, StateCreator } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

import {
	CoffeeType,
	GetCoffeeListReqParams,
	OrderCoffeeRes,
	OrderItem
} from '../types/coffeeTypes'

const BASE_URL = 'https://purpleschool.ru/coffee-api'

type CoffeeState = {
	coffeeList?: CoffeeType[]
	controller?: AbortController
	cart?: OrderItem[]
	address?: string
	params: GetCoffeeListReqParams
}

type CoffeeActions = {
	getCoffeeList: (params?: GetCoffeeListReqParams) => void
	addToCart: (item: CoffeeType) => void
	clearCart: () => void
	orderCoffee: () => void
	setAddress: (address: string) => void
	setParams: (params?: GetCoffeeListReqParams) => void
}

const coffeeSlice: StateCreator<
	CoffeeState & CoffeeActions,
	[['zustand/devtools', never], ['zustand/persist', unknown]]
> = (set, get) => ({
	coffeeList: undefined,
	controller: undefined,
	cart: undefined,
	address: undefined,
	params: {
		text: undefined
	},
	setParams: (newParams) => {
		const { getCoffeeList, params } = get()
		set({ params: { ...params, ...newParams } }, false, 'setParams')
		getCoffeeList(params)
	},
	clearCart: () => {
		set({ cart: undefined })
	},
	setAddress: (address) => {
		set({ address })
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
	},
	getCoffeeList: async (params) => {
		const { controller } = get()

		if (controller) controller.abort()

		const newController = new AbortController()
		set({ controller: newController })
		const { signal } = newController

		try {
			const { data } = await axios.get(BASE_URL, { params, signal })
			set({ coffeeList: data })
		} catch (error) {
			if (axios.isCancel(error)) return
			console.log(error)
		}
	}
})

export const useCoffeeStore = create<CoffeeState & CoffeeActions>()(
	devtools(
		persist(coffeeSlice, {
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
