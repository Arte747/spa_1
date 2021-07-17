import React from 'react';
import s from './Dialog.module.css';
import {NavLink} from 'react-router-dom';

type PropsType = {
	id: number
	name: string
}

const Dialog: React.FC<PropsType> = (props) => {
	return (
		<div className={s.dialog}>
			<NavLink to={'/dialogs/' + props.id} activeClassName={s.active}>{props.name}</NavLink>
		</div>
	);
};

export default Dialog;