import React from 'react';
import Dialogs from './Dialogs';
import {updateNewMessageTextAC, sendMessageAC} from '../../redux/dialogs-reducer';

const DialogsContainer = (props) => {
	
	const onMessageChange = (text) => {
		props.dispatch(updateNewMessageTextAC(text));
	};
	
	const sendMessage = () => {
		props.dispatch(sendMessageAC());
	};
	
	return (
		<Dialogs dialogs={props.dialogs}
				 messages={props.messages}
				 newMessageText={props.newMessageText}
				 onMessageChange={onMessageChange}
				 sendMessage={sendMessage}/>
	);
};

export default DialogsContainer;