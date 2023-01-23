import { Link } from 'react-router-dom';

import React from 'react';

const Public = () => {
	const content = (
		<section className='public'>
			<header>
				<h1>
					CarWoś <span className='nowrap'>centrum zadań </span>
				</h1>
			</header>
			<main className='public__main'>
				<p>
					Zakład mieści się w pięknej miejscowości Orły na ulicy lipowej.
					Warsztat zapewnia wykfalifikowaną obsługę mechaników i elektroników
					gotowych naprawić twój samochód.
				</p>
				<address className='public__addr'>
					CarWoś Jan Woś <br />
					37-716 Orły <br />
					ul. Lipowa 88 <br />
					<a href='tel +777 777 777'>777 777 777</a>
					<br />
					<p> Właściciel Jan Woś</p>
				</address>
			</main>
			<footer>
				<Link to='/login'>Logowanie dla pracowników</Link>
			</footer>
		</section>
	);
	return content;
};

export default Public;
