import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { deploy } from '../config/deploy';

import { useSendLogoutMutation } from '../features/auth/authApiSlice';

const DASH_REGEX = /^\/dash(\/)?$/;
const NOTES_REGEX = /^\/dash\/notes(\/)?$/;
const USERS_REGEX = /^\/dash\/users(\/)?$/;

const DashHeader = () => {
	const navigate = useNavigate();
	const { pathname } = useLocation;

	const [sendLogout, { isLoading, isSuccess, isError, error }] =
		useSendLogoutMutation();

	useEffect(() => {
		if (isSuccess) navigate(`/${deploy}`);
	}, [isSuccess, navigate]);

	const onLogoutClicked = () => sendLogout();

	if (isLoading) return <p>Trwa wylogowanie ...</p>;

	if (isError) return <p>Błąd:{error.data?.message}</p>;

	let dashClass = null;

	if (
		!DASH_REGEX.test(pathname) &&
		!NOTES_REGEX.test(pathname) &&
		!USERS_REGEX.test(pathname)
	) {
		dashClass = 'dash-header__container--small';
	}

	const logoutButton = (
		<button className='icon-button' title='Logout' onClick={onLogoutClicked}>
			<FontAwesomeIcon icon={faRightFromBracket} />
		</button>
	);
	return (
		<header className='dash-header'>
			<div className={`dash-header__container ${dashClass}`}>
				<Link to='/dash'>
					<h1 className='dash-header__title'>CarWoś</h1>
				</Link>
				<nav className='dash-header__nav'>{logoutButton}</nav>
			</div>
		</header>
	);
};

export default DashHeader;
