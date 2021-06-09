import React from 'react';
import s from './Dialogs.module.css';
import Dialog from './Dialog/Dialog';
import Message from './Message/Message';

const Dialogs = (props) => {
	
	let dialogsData = [
		{id: 1, name: 'Dimuch'},
		{id: 2, name: 'Sveta'},
		{id: 3, name: 'Andrew'},
		{id: 4, name: 'Stive'},
	];
	
	let messagesData = [
		{id: 1, message: 'Hello'},
		{id: 2, message: 'Haw are you?'},
		{id: 3, message: '=)))'},
		{id: 4, message: 'Go!!!!!!'},
	];
	
	let dialogsElements = dialogsData.map(d => <Dialog key={d.id} name={d.name} id={d.id} />);
	
	let messagesElements = messagesData.map(m => <Message key={m.id} message={m.message}/>);
	
	return (
		<div className={s.dialogs}>
			<div className={s.dialogsList}>
				{dialogsElements}
			</div>
			<div className={s.messages}>
				{messagesElements}
			</div>
		</div>
	);
};

export default Dialogs;