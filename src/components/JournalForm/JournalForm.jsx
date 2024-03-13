import Button from '../Button/Button';
import styles from './JournalForm.module.css';
import { useEffect, useReducer } from 'react';
import { INITIAL_STATE, formReducer } from './JournalForm.state';
import cn from 'classnames';
import { useRef } from 'react';
import Input from '../Input/Input';

const JournalForm = ({ onSubmit }) => {
	const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE);
	const { isValid, isFormReadyToSubmit, values } = formState;
	const titleRef = useRef();
	const dateRef = useRef();
	const textRef = useRef();

	useEffect(() => {
		let timerId;
		if (!isValid.date || !isValid.text || !isValid.title) {
			focusError(isValid);
			timerId = setTimeout(() => {
				dispatchForm({ type: 'RESET_VALIDITY' });
			}, 2000);
		}
		return () => {
			clearTimeout(timerId);
		};
	}, [isValid]);

	useEffect(() => {
		if (isFormReadyToSubmit) {
			onSubmit(values);
			dispatchForm({ type: 'CLEAR' });
		}
	}, [isFormReadyToSubmit, values, onSubmit]);

	const addJournalItem = (e) => {
		e.preventDefault();
		dispatchForm({ type: 'SUBMIT'});
	};

	const onChange = (e) => {
		dispatchForm({
			type: 'SET_VALUE',
			payload: { [e.target.name]: e.target.value }
		});
	};

	const focusError = (isValid) => {
		switch(true) {
		case !isValid.title:
			titleRef.current.focus();
			break;
		case !isValid.date:
			dateRef.current.focus();
			break;
		case !isValid.text:
			textRef.current.focus();
			break;
		}
	};

	return (
		<form className={styles['journal-form']} onSubmit={addJournalItem}>
			<div>
				<Input
					type="text"
					name="title"
					ref={titleRef}
					value={values.title}
					onChange={onChange}
					isValid={isValid.title}
					appearence="title"
				/>
			</div>
			<div className={styles['form-row']}>
				<label htmlFor="date" className={styles['form-label']}>
					<img src="/date.svg" alt="date icon" />
					<span>Дата</span>
				</label>
				<Input
					type="date"
					name="date"
					ref={dateRef}
					value={values.date}
					id="date"
					onChange={onChange}
					isValid={isValid.date}
				/>
			</div>

			<div className={styles['form-row']}>
				<label htmlFor="tag" className={styles['form-label']}>
					<img src="/folder.svg" alt="folder icon" />
					<span>Метки</span>
				</label>
				<Input
					type="text"
					name="tag"
					id="tag"
					value={values.tag}
					onChange={onChange}

				/>
			</div>

			<textarea
				name="text"
				ref={textRef}
				id=""
				cols="30"
				rows="10"
				value={values.text}
				onChange={onChange}
				className={cn(styles['input'], {
					[styles['invalid']]: !isValid.text
				})}
			></textarea>
			<Button text="Сохранить" />
		</form>
	);
};

export default JournalForm;
