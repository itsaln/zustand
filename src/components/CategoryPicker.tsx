import { useShallow } from 'zustand/react/shallow'
import { Button } from 'antd'

import { CoffeeCategoryEnum } from '../types/coffeeTypes'

import { setParams, useCoffeeStore } from '../model/coffeeStore'

export const CategoryPicker = () => {
	const [params] = useCoffeeStore(useShallow((state) => [state.params]))

	return (
		<div>
			{Object.keys(CoffeeCategoryEnum).map((key, index) => (
				<Button
					key={`${key}_${index}`}
					danger={params.type === key}
					onClick={() =>
						setParams({
							type: CoffeeCategoryEnum[key as keyof typeof CoffeeCategoryEnum]
						})
					}
				>
					{key}
				</Button>
			))}
		</div>
	)
}
