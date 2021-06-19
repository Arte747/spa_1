import React from 'react';
import s from './Dialogs.module.css';
import Dialog from './Dialog/Dialog';
import Message from './Message/Message';
import {Redirect} from 'react-router-dom';

const Dialogs = (props) => {
	
	let dialogsElements = props.dialogs.map(d => <Dialog key={d.id} name={d.name} id={d.id} />);
	
	let messagesElements = props.messages.map(m => <Message key={m.id} message={m.message}/>);
	
	const onMessageChange = (e) => {
		let text = e.target.value;
		props.onMessageChange(text);
	};
	
	const sendMessage = () => {
		props.sendMessage();
	};
	
	if(!props.isAuth) return <Redirect to={"/login"} />;
	
	return (
		<div className={s.dialogs}>
			<div className={s.dialogsList}>
				{dialogsElements}
			</div>
			<div className={s.messages}>
				<div className={s.newMessage}>
					<div>
						<input onChange={onMessageChange} value={props.newMessageText} type="text" name="" id="" />
					</div>
					<div>
						<button onClick={sendMessage}>Отправить</button>
					</div>
				</div>
				{messagesElements}
			</div>
		</div>
	);
};

export default Dialogs;