import { useEffect } from 'react'
import { useShallow } from 'zustand/react/shallow'
import { Input } from 'antd'

import { useUrlStorage } from '../helpers/useUrlStorage'

import { getCoffeeList, setParams, useCoffeeStore } from '../model/coffeeStore'

export const SearchInput = () => {
	const [params] = useCoffeeStore(useShallow((state) => [state.params]))
	useUrlStorage(params, setParams)

	useEffect(() => {
		getCoffeeList(params)
	}, [])

	return (
		<Input
			value={params.text}
			placeholder='Поиск'
			onChange={(e) => setParams({ text: e.target.value })}
		/>
	)
}
