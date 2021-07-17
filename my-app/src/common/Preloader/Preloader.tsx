import React from 'react';
import s from './Preloader.module.css';
import image from '../../img/preloader.gif';

const Preloader: React.FC = (props) => {
	return (
		<div className={s.preloader}>
			<img src={image} alt="preloader" />
		</div>
	);
};

export default Preloader;