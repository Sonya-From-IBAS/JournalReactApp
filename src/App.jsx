import './App.css';
import JournalList from './components/JournalList/JournalList';
import LeftPanel from './layout/LeftPanel/LeftPanel';
import Body from './layout/Body/Body';
import Header from './components/Header/Header';
import JournalAddButton from './components/JournalAddButton/JournalAddButton';
import JournalForm from './components/JournalForm/JournalForm';
import { useEffect, useState } from 'react';
import { UserContextProvider } from './context/user.context';

function App() {
	const [items, setItems] = useState([]);
	const [selectedItem, setSelectedItem] = useState(null);
	useEffect(() => {
		const data = JSON.parse(localStorage.getItem('data'));
		if (data) {
			setItems(
				data.map((item) => ({
					...item,
					date: new Date(item.date)
				}))
			);
		}
	}, []);

	useEffect(() => {
		if (items.length) {
			console.log('Запись');
			localStorage.setItem('data', JSON.stringify(items));
		}
	}, [items]);

	const addItem = (item) => {
		if(!item.id){
			setItems((oldItems) => [
				...oldItems,
				{
					...item,
					date: item.date ? new Date(item.date) : new Date(),
					id:
						oldItems.length > 0 ? Math.max(...oldItems.map((i) => i.id)) + 1 : 1
				}
			]);
		} else {
			setItems((oldItems) => [
				...oldItems.map(i => {
					if(i.id === item.id){
						return {
							...item,
							date: new Date(item.date)
						};
					} 
					return i;
				})
			]);
		}
	};

	const deleteItem = (id) => {
		setItems([...items.filter(i => i.id !== id)]);
	};

	return (
		<UserContextProvider>
			<div className="app">null
				<LeftPanel>
					<Header />
					<JournalAddButton clearForm={() => setSelectedItem()}/>
					<JournalList items={items} setItem={setSelectedItem}/>
				</LeftPanel>
				<Body>
					<JournalForm onSubmit={addItem} onDelete={deleteItem} data={selectedItem}/>
				</Body>
			</div>
		</UserContextProvider>
	);
}

export default App;
