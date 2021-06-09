import React from 'react';
import s from './Dialogs.module.css';
import Dialog from './Dialog/Dialog';
import Message from './Message/Message';

const Dialogs = (props) => {
	return (
		<div className={s.dialogs}>
			<div className={s.dialogsList}>
				<Dialog name='Dimuch' id='1' />
				<Dialog name='Sveta' id='2' />
				<Dialog name='Andrew' id='3' />
			</div>
			<div className={s.messages}>
				<Message message='Hello!'/>
				<Message message='Haw are you?'/>
				<Message message='=)))'/>
			</div>
		</div>
	);
};

export default Dialogs;