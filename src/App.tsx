import { Card, Checkbox, Input } from 'antd'

import { useTodoStore } from './model/todoStore'

import './App.css'
import { useState } from 'react'

function App() {
	const { todos, addTodo, changeIsComplete } = useTodoStore()

	const [value, setValue] = useState('')

	return (
		<div className='wrapper'>
			<Input
				style={{ width: 300 }}
				onChange={(e) => setValue(e.target.value)}
				value={value}
				onKeyDown={(e) => {
					if (e.key === 'Enter') {
						addTodo(value)
						setValue('')
					}
				}}
			/>
			{todos.map((todo, index) => (
				<Card key={`${todo.title}_${index}`} className='cardsContainer'>
					<Checkbox
						checked={todo.isComplete}
						onChange={() => changeIsComplete(index)}
					/>
					<span>{todo.title}</span>
				</Card>
			))}
		</div>
	)
}

export default App
