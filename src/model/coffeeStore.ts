import { create, StateCreator } from 'zustand'
import { devtools } from 'zustand/middleware'
import axios from 'axios'

import { CoffeeType, GetCoffeeListReqParams } from '../types/coffeeTypes'

const BASE_URL = 'http://purpleschool.ru/coffee-api'

type CoffeeState = {
	coffeeList?: CoffeeType[]
	controller?: AbortController
}

type CoffeeActions = {
	getCoffeeList: (params?: GetCoffeeListReqParams) => void
}

const coffeeSlice: StateCreator<
	CoffeeState & CoffeeActions,
	[['zustand/devtools', never]]
> = (set, get) => ({
	coffeeList: undefined,
	controller: undefined,
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
	devtools(coffeeSlice)
)
