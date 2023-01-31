import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { deploy } from '../../config/deploy';

import { useDispatch } from 'react-redux';
import { setCredentials } from './authSlice';
import { useLoginMutation } from './authApiSlice';

import usePersist from '../../hooks/usePersist';

const Login = () => {
	const userRef = useRef();
	const errRef = useRef();
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [errMsg, setErrMsg] = useState('');
	const [persist, setPersist] = usePersist();

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [login, { isLoading }] = useLoginMutation();

	useEffect(() => {
		userRef.current.focus();
	}, []);

	useEffect(() => {
		setErrMsg('');
	}, [username, password]);

	const errClass = errMsg ? 'errmsg' : 'offscreen';

	const handleUserInput = (e) => setUsername(e.target.value);
	const handlePwdInput = (e) => setPassword(e.target.value);
	const handleToggle = () => {
		setPersist((prev) => !prev);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const { accessToken } = await login({ username, password }).unwrap();
			dispatch(setCredentials({ accessToken }));
			setUsername('');
			setPassword('');
			navigate(`${deploy}/dash`);
		} catch (err) {
			if (!err.status) {
				setErrMsg('Brak odpowiedzi servera');
			} else if (err.status === 400) {
				setErrMsg('Brak loginu lub hasła');
			} else if (err.status === 401) {
				setErrMsg('Niepoprawny login lub hasło');
			} else {
				setErrMsg(err.data?.message);
			}
			errRef.current.focus();
		}
	};

	if (isLoading) {
		return <p>Loading...</p>;
	}

	const content = (
		<section className='public'>
			<header>
				<h1>Centrum Logowania</h1>
			</header>
			<main className='login'>
				<p ref={errRef} className={errClass} aria-live='assertive'>
					{errMsg}
				</p>
				<form className='form' onSubmit={handleSubmit}>
					<label htmlFor='username'>Nazwa użytkownika</label>
					<input
						className='form__input'
						type='text'
						id='username'
						ref={userRef}
						value={username}
						onChange={handleUserInput}
						autoComplete='off'
						required
					/>
					<label htmlFor='password'>Hasło:</label>
					<input
						className='form__input'
						type='password'
						id='password'
						value={password}
						onChange={handlePwdInput}
						required
					/>
					<button className='form__submit-button'>Zaloguj się</button>
					<label htmlFor='persist' className='form__persist'>
						Dodaj uządzenie do zaufanych
					</label>
					<input
						type='checkbox'
						className='form__checkbox'
						id='persist'
						onChange={handleToggle}
						checked={persist}
					/>
				</form>
			</main>
			<footer>
				<Link to={`/${deploy}`}>Strona główna</Link>
			</footer>
		</section>
	);

	return content;
};

export default Login;
