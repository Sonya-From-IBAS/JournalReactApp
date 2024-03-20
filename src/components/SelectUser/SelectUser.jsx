import { UserContext } from '../../context/user.context';
import { useContext } from 'react';

function SelectUser() {
	const {userId, setUserId} = useContext(UserContext);

	const changeUser = (e) => {
		setUserId(Number(e.target.value));
	};
	return (
		<select name="user" id="user" value={userId} onChange={changeUser}>
			<option value="1">Leonid</option>
			<option value="2">Leonid2</option>
		</select>
	);
}

export default SelectUser;