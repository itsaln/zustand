import { useShallow } from 'zustand/react/shallow'
import { Button, Input } from 'antd'

import {
	clearCart,
	orderCoffee,
	setAddress,
	useCoffeeStore
} from '../model/coffeeStore'

export const Cart = () => {
	const [cart, address] = useCoffeeStore(
		useShallow((state) => [state.cart, state.address])
	)

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
