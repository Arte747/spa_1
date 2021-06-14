import React from 'react';
import s from './Navbar.module.css';
import {NavLink} from 'react-router-dom';

const Navbar = (props) => {
	return (
		<div className={s.nav}>
			<div className={s.item}>
				<NavLink to='/profile' activeClassName={s.active}>Профайл</NavLink>
			</div>
			<div className={s.item}>
				<NavLink to='/dialogs' activeClassName={s.active}>Сообщения</NavLink>
			</div>
			<div className={s.item}>
				<NavLink to='/users' activeClassName={s.active}>Пользователи</NavLink>
			</div>
			<div className={s.item}>
				<NavLink to='/test' activeClassName={s.active}>Тест</NavLink>
			</div>
		</div>
	);
};

export default Navbar;