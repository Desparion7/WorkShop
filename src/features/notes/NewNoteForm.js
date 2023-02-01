import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAddNewNoteMutation } from './notesApiSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import { deploy } from '../../config/deploy';

const NewNoteForm = ({ users }) => {
	const [addNewNote, { isLoading, isSuccess, isError, error }] =
		useAddNewNoteMutation();

	const navigate = useNavigate();

	const [user, setUser] = useState(users[0].id);
	const [title, setTitle] = useState('');
	const [text, setText] = useState('');

	useEffect(() => {
		if (isSuccess) {
			setUser('');
			setTitle('');
			setText('');
			navigate(`${deploy}/dash/notes`);
		}
	}, [isSuccess, navigate]);

	const canSave =
		[user, title, text].every((value) => value !== '') && !isLoading;

	const onTitleChanged = (e) => setTitle(e.target.value);
	const onTextChanged = (e) => setText(e.target.value);

	const onUserChanged = (e) => {
		const value = Array.from(
			e.target.selectedOptions,
			(option) => option.value
		);
		setUser(value);
	};

	const onSaveNoteClicked = async (e) => {
		e.preventDefault();
		if (canSave) {
			await addNewNote({ user, title, text });
		}
	};
	const options = Object.values(users).map((user) => {
		return (
			<option key={user.id} value={user.id}>
				{user.username}
			</option>
		);
	});

	const errClass = isError ? 'errmsg' : 'offscreen';
	const validTextClass = text === '' ? 'form__input--incomplete' : '';
	const validTitleClass = title === '' ? 'form__input--incomplete' : '';
	const content = (
		<>
			<p className={errClass}>{error?.data?.message}</p>
			<form className='form' onSubmit={onSaveNoteClicked}>
				<div className='form__title-row'>
					<h2>Nowe Zadanie</h2>
					<div className='form__action-buttons'>
						<button className='icon-button' title='Save' disabled={!canSave}>
							<FontAwesomeIcon icon={faSave} />
						</button>
					</div>
				</div>
				<label className='form__label' htmlFor='user'>
					Wybierz użytkownika:
				</label>
				<select
					id='user'
					name='user'
					className='form__select'
					value={user}
					onChange={onUserChanged}
				>
					{options}
				</select>
				<label className='form__label' htmlFor='title'>
					Tytuł:
				</label>
				<input
					className={`form__input ${validTitleClass}`}
					id='title'
					name='title'
					type='title'
					autoComplete='off'
					value={title}
					onChange={onTitleChanged}
				/>
				<label className='form__label' htmlFor='text'>
					Zadanie:
				</label>
				<textarea
					className={`form__input ${validTextClass}`}
					id='text'
					name='text'
					type='text'
					value={text}
					onChange={onTextChanged}
				/>
			</form>
		</>
	);

	return content;
};

export default NewNoteForm;
