import { useEffect } from 'react'
import { Input } from 'antd'

import { useUrlStorage } from './helpers/useUrlStorage'

import { useCoffeeStore } from './model/coffeeStore'

import { CoffeeCard } from './components/CoffeeCard'
import { Cart } from './components/Cart'

import './App.css'

function App() {
	const { getCoffeeList, coffeeList, params, setParams } = useCoffeeStore()
	useUrlStorage(params, setParams)

	useEffect(() => {
		getCoffeeList(params)
	}, [])

	return (
		<div className='wrapper'>
			<Input
				value={params.text}
				placeholder='Поиск'
				onChange={(e) => setParams({ text: e.target.value })}
			/>

			<div style={{ display: 'flex' }}>
				<div className='cardsContainer'>
					{coffeeList &&
						coffeeList.map((coffee, index) => (
							<CoffeeCard key={`${coffee.id}_${index}`} coffee={coffee} />
						))}
				</div>
				<Cart />
			</div>
		</div>
	)
}

export default App
