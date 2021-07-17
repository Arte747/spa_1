import React from 'react';
import s from './Dialogs.module.css';
import Dialog from './Dialog/Dialog';
import Message from './Message/Message';
import {reduxForm, Field, InjectedFormProps} from 'redux-form';
import {requireField, maxLengthCreator} from '../../utils/validators/validators';
import {Textarea, Input, createField} from '../../common/FormsControls/FormsControls';
import {InitialStateType} from '../../redux/dialogs-reducer';

// это должно быть за пределами компоненты
let maxLength = maxLengthCreator(15);

// типы передаваемых ключей
type NewMessageFormValuesKeysType = Extract<keyof NewMessageFormValuesType, string>;

type PropsType2 = {}

const MessageForm: React.FC<InjectedFormProps<NewMessageFormValuesType, PropsType2> & PropsType2> = (props) => {
	return (
		<form onSubmit={props.handleSubmit}>
			<div>
				{createField<NewMessageFormValuesKeysType>(Textarea, "newMessage", [requireField, maxLength], "message")}
			</div>
			<div>
				<button>Отправить</button>
			</div>
		</form>
	);
};
	
const ReduxMessageForm = reduxForm<NewMessageFormValuesType>({form: 'messageForm'})(MessageForm);

//-------------------------------------------------------------------------------------------

type PropsDialogsType = {
	id: number
	name: string
}

type PropsMessagesType = {
	id: number
	message: string
}

type PropsType = {
	dialogs: Array<PropsDialogsType>
	messages: Array<PropsMessagesType>
	sendMessage: (newMessage: string) => void
}

// тип для данных для onsubmit
// эти данный приходят из формы
// newMessage это содержимое определенного филда
type NewMessageFormValuesType = {
	newMessage: string
}



const Dialogs: React.FC<PropsType> = (props) => {
	
let dialogsElements = props.dialogs.map(d => <Dialog key={d.id} name={d.name} id={d.id} />);	let messagesElements = props.messages.map(m => <Message key={m.id} message={m.message}/>);
	
	const onSubmit = (values: NewMessageFormValuesType) => {
		props.sendMessage(values.newMessage);
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