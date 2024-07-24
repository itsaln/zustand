import { CoffeeType, GetCoffeeListReqParams, OrderItem } from '../types/coffeeTypes'

export type ListState = {
	coffeeList?: CoffeeType[]
	controller?: AbortController
	params: GetCoffeeListReqParams
}

export type ListActions = {
	getCoffeeList: (params?: GetCoffeeListReqParams) => void
	setParams: (params?: GetCoffeeListReqParams) => void
}

export type CartState = {
	cart?: OrderItem[]
	address?: string
}

export type CartActions = {
	orderCoffee: () => void
	addToCart: (item: CoffeeType) => void
	clearCart: () => void
	setAddress: (address: string) => void
}
