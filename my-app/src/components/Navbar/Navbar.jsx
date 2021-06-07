import React from 'react';
import s from './Navbar.module.css';

const Navbar = (props) => {
	return (
		<div className={s.nav}>
			<div>Профайл</div>
			<div>Users</div>
			<div>Настройки</div>
		</div>
	);
};

export default Navbar;