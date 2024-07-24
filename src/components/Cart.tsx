import { Button, Input } from 'antd'

import { useCoffeeStore } from '../model/coffeeStore'

export const Cart = () => {
	const { cart, orderCoffee, clearCart, address, setAddress } = useCoffeeStore()

	return (
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
	)
}
