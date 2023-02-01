import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useLocation } from 'react-router-dom';

import useAuth from '../hooks/useAuth';

const DashFooter = () => {
	const { username, status } = useAuth();
	const navigate = useNavigate();
	const { pathname } = useLocation();

	const onGoHomeHandler = () => {
		navigate('/dash');
	};

	let goHomeButton = null;

	if (pathname !== '/dash') {
		goHomeButton = (
			<button
				className='dash-footer__button icon-button'
				title='Home'
				onClick={onGoHomeHandler}
			>
				<FontAwesomeIcon icon={faHouse} />
			</button>
		);
	}

	return (
		<footer className='dash-footer'>
			{goHomeButton}
			<p>Aktualny użytkownik: {username}</p>
			<p>Status: {status}</p>
		</footer>
	);
};

export default DashFooter;
