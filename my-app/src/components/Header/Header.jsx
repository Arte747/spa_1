import React from 'react';
import s from './Header.module.css';
import image from '../../img/logo.png';

const Header = (props) => {
	return (
		<div className={s.header}>
			<img src={image} alt="logo" />
		</div>
	);
};

export default Header;