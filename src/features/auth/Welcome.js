import { Link } from 'react-router-dom';

const Welcome = () => {
	const date = new Date();
	const today = new Intl.DateTimeFormat('pl-PL', {
		dateStyle: 'full',
		timeStyle: 'long',
	}).format(date);

	return (
		<section className='welcome'>
			<p>{today}</p>
			<h1>Witamy!</h1>
			<p>
				<Link to='/dash/notes'>Wyświetl zadania</Link>
			</p>
			<p>
				<Link to='/dash/users'>Wyświetl użytkowników</Link>
			</p>
		</section>
	);
};

export default Welcome;
