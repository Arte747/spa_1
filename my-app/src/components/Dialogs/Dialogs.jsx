import React from 'react';
import s from './Dialogs.module.css';
import Dialog from './Dialog/Dialog';
import Message from './Message/Message';
import {reduxForm, Field} from 'redux-form';
import {requireField, maxLengthCreator} from '../../utils/validators/validators';
import {Textarea} from '../../common/FormsControls/FormsControls';

const Dialogs = (props) => {
	
	let dialogsElements = props.dialogs.map(d => <Dialog key={d.id} name={d.name} id={d.id} />);
	
	let messagesElements = props.messages.map(m => <Message key={m.id} message={m.message}/>);
	
	// это должно быть за пределами компоненты
	let maxLength = maxLengthCreator(15);
	
	const MessageForm = (props) => {
		
		return (
			<form onSubmit={props.handleSubmit}>
				<div>
					<Field component={Textarea} name={"message"} validate={[requireField, maxLength]} />
				</div>
				<div>
					<button>Отправить</button>
				</div>
			</form>
		);
	};
	
	const ReduxMessageForm = reduxForm({form: 'messageForm'})(MessageForm);
	
	const onSubmit = (values) => {
		let text = values.message;
		props.sendMessage(text);
	}
	
	return (
		<div className={s.dialogs}>
			<div className={s.dialogsList}>
				{dialogsElements}
			</div>
			<div className={s.messages}>
				<div className={s.newMessage}>
					<ReduxMessageForm onSubmit={onSubmit} />
				</div>
				{messagesElements}
			</div>
		</div>
	);
};

export default Dialogs;