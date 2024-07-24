import { useEffect } from 'react'
import { Button, Card, Input, Rate, Tag } from 'antd'
import { ShoppingCartOutlined } from '@ant-design/icons'

import { useCoffeeStore } from './model/coffeeStore'

import './App.css'
import { useUrlStorage } from './helpers/useUrlStorage.ts'

function App() {
	const {
		getCoffeeList,
		coffeeList,
		addToCart,
		cart,
		orderCoffee,
		clearCart,
		address,
		setAddress,
		params,
		setParams
	} = useCoffeeStore()
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
							<Card
								key={`${coffee.id}_${index}`}
								cover={<img src={coffee.image} alt={coffee.name} />}
								actions={[
									<Button
										icon={<ShoppingCartOutlined />}
										onClick={() => addToCart(coffee)}
									>
										{coffee.price}
									</Button>
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

				<aside className='cart'>
					<h1>Заказ</h1>
					{cart && cart.length > 0 ? (
						<>
							{cart.map((item, index) => (
								<span key={`${item.id}_${index}`}>{item.name}</span>
							))}
							<Input
								placeholder='Адрес'
								value={address}
								onChange={(e) => setAddress(e.target.value)}
							/>
							<Button type='primary' onClick={orderCoffee} disabled={!address}>
								Сделать заказ
							</Button>
							<Button onClick={clearCart}>Очистить корзину</Button>
						</>
					) : (
						<span>Добавить нипитки</span>
					)}
				</aside>
			</div>
		</div>
	)
}

export default App
