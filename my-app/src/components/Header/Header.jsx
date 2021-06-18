import React from 'react';
import s from './Header.module.css';
import image from '../../img/logo.png';
import {NavLink} from 'react-router-dom';

const Header = (props) => {
	return (
		<div className={s.header}>
			<img src={image} alt="logo" />
			<div className={s.loginBlock}>
				{props.isAuth
					? props.login
					: <NavLink to={'/login'}>Login</NavLink>}
				
			</div>
		</div>
		
	);
};

export default Header;