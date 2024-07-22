import { useEffect, useState } from 'react'
import { Button, Card, Rate, Tag, Input } from 'antd'
import { ShoppingCartOutlined } from '@ant-design/icons'

import { useCoffeeStore } from './model/coffeeStore'

import './App.css'

function App() {
	const [text, setText] = useState('')

	const { getCoffeeList, coffeeList } = useCoffeeStore()

	const handleSearch = (text: string) => {
		getCoffeeList({ text })
		setText(text)
	}

	useEffect(() => {
		getCoffeeList()
	}, [])

	return (
		<div className='wrapper'>
			<Input
				value={text}
				placeholder='Поиск'
				onChange={(e) => handleSearch(e.target.value)}
			/>

			<div className='cardsContainer'>
				{coffeeList &&
					coffeeList.map((coffee, index) => (
						<Card
							key={`${coffee.id}_${index}`}
							cover={<img src={coffee.image} alt={coffee.name} />}
							actions={[
								<Button icon={<ShoppingCartOutlined />}>{coffee.price}</Button>
							]}
						>
							<Card.Meta title={coffee.name} description={coffee.subTitle} />
							<Tag color='purple' style={{ marginTop: 12 }}>
								{coffee.type}
							</Tag>
							<Rate defaultValue={coffee.rating} disabled allowHalf />
						</Card>
					))}
			</div>
		</div>
	)
}

export default App
