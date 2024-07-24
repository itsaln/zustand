import { SearchInput } from './components/SearchInput'
import { CardList } from './components/CardList'
import { Cart } from './components/Cart'

import './App.css'

function App() {
	return (
		<div className='wrapper'>
			<SearchInput />
			<div style={{ display: 'flex' }}>
				<CardList />
				<Cart />
			</div>
		</div>
	)
}

export default App
