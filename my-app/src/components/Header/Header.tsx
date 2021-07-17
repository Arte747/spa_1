import React from 'react';
import s from './Header.module.css';
import image from '../../img/logo.png';
import {NavLink} from 'react-router-dom';

export type MapPropsType = {
	login: string | null
	isAuth: boolean
}

export type DispatchPropsType = {
	logout: () => void
}

const Header: React.FC<MapPropsType & DispatchPropsType> = (props) => {
	return (
		<div className={s.header}>
			<img src={image} alt="logo" />
			<div className={s.loginBlock}>
				{props.isAuth
					? <div>{props.login} --- <button onClick={props.logout}>Logout</button></div>
					: <NavLink to={'/login'}>Login</NavLink>}
			</div>
		</div>
		
	);
};

export default Header;