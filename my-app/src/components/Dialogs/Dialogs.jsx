import React from 'react';
import s from './Dialogs.module.css';
import Dialog from './Dialog/Dialog';
import Message from './Message/Message';

const Dialogs = (props) => {
	
	
	
	let dialogsElements = props.dialogs.map(d => <Dialog key={d.id} name={d.name} id={d.id} />);
	
	let messagesElements = props.messages.map(m => <Message key={m.id} message={m.message}/>);
	
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