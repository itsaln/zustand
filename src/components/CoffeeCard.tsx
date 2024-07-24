import { Button, Card, Rate, Tag } from 'antd'
import { ShoppingCartOutlined } from '@ant-design/icons'

import { useCoffeeStore } from '../model/coffeeStore'

import { CoffeeType } from '../types/coffeeTypes'

export const CoffeeCard = ({ coffee }: { coffee: CoffeeType }) => {
	const { addToCart } = useCoffeeStore()

	return (
		<Card
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
	)
}
