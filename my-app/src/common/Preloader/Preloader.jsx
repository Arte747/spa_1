import React from 'react';
import s from './Preloader';
import image from '../../img/preloader.gif';

const Preloader = (props) => {
	return (
		<div class={s.preloader}>
			<img src={image} alt="preloader" />
		</div>
	);
};

export default Preloader;