import './JournalList.css';
import CardButton from '../CardButton/CardButton';
import JournalItem from '../JournalItem/JournalItem';
import { useContext } from 'react';
import { UserContext } from '../../context/user.context';

function JournalList({ items, setItem }) {
	const { userId } = useContext(UserContext);

	if (items.length === 0) {
		return <p>Записей нет, добавьте первую</p>;
	}

	const sortItems = (a, b) => {
		if (a.date < b.date) {
			return 1;
		} else {
			return -1;
		}
	};

	return (
		<>
			{items
				.filter((elem) => elem.userId == userId)
				.sort(sortItems)
				.map((el) => (
					<CardButton key={el.id} onClick={() => setItem(el)}>
						<JournalItem
							title={el.title}
							date={el.date}
							text={el.text}
						/>
					</CardButton>
				))}
		</>
	);
}

export default JournalList;
