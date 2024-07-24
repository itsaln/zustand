import { SearchInput } from './components/SearchInput'
import { CategoryPicker } from './components/CategoryPicker'
import { CardList } from './components/CardList'
import { Cart } from './components/Cart'

import './App.css'

function App() {
	return (
		<div className='wrapper'>
			<SearchInput />
			<CategoryPicker />
			<div style={{ display: 'flex' }}>
				<CardList />
				<Cart />
			</div>
		</div>
	)
}

export default App
