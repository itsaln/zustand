// import { useEffect, useState } from 'react'
import { Button } from 'antd'
// import { ShoppingCartOutlined } from '@ant-design/icons'

import { resetAllStores } from './helpers/create'

// import { useCoffeeStore } from './model/coffeeStore'
import { useCounterStore } from './model/counterStore'
import { useTodoStore } from './model/todoStore'

import './App.css'

function App() {
	// const [text, setText] = useState('')

	// const { getCoffeeList, coffeeList } = useCoffeeStore()
	const { increment, decrement, counter, persistedCounter } =
		useCounterStore()
	const { todos, addTodo } = useTodoStore()

	// const handleSearch = (text: string) => {
	// 	getCoffeeList({ text })
	// 	setText(text)
	// }

	// useEffect(() => {
	// 	getCoffeeList()
	// }, [])

	return (
		<div className='wrapper'>
			<Button onClick={increment}>+</Button>
			<span>{counter}</span>
			<span>{persistedCounter}</span>
			<Button onClick={decrement}>-</Button>

			<Button onClick={resetAllStores}>reset</Button>

			<Button onClick={() => addTodo('Some')}>addTodo</Button>

			{todos &&
				todos.map((todo, index) => (
					<span key={`${todo.title}_${index}`}>{todo.title}</span>
				))}

			{/*<Input*/}
			{/*	value={text}*/}
			{/*	placeholder='Поиск'*/}
			{/*	onChange={(e) => handleSearch(e.target.value)}*/}
			{/*/>*/}

			{/*<div className='cardsContainer'>*/}
			{/*	{coffeeList &&*/}
			{/*		coffeeList.map((coffee, index) => (*/}
			{/*			<Card*/}
			{/*				key={`${coffee.id}_${index}`}*/}
			{/*				cover={<img src={coffee.image} alt={coffee.name} />}*/}
			{/*				actions={[*/}
			{/*					<Button icon={<ShoppingCartOutlined />}>{coffee.price}</Button>*/}
			{/*				]}*/}
			{/*			>*/}
			{/*				<Card.Meta title={coffee.name} description={coffee.subTitle} />*/}
			{/*				<Tag color='purple' style={{ marginTop: 12 }}>*/}
			{/*					{coffee.type}*/}
			{/*				</Tag>*/}
			{/*				<Rate defaultValue={coffee.rating} disabled allowHalf />*/}
			{/*			</Card>*/}
			{/*		))}*/}
			{/*</div>*/}
		</div>
	)
}

export default App
