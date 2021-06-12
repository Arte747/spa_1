const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE_NEW_MESSAGE_TEXT';
const SEND_MESSAGE = 'SEND_MESSAGE';

const initialState = {
	dialogs: [
			{id: 1, name: 'Dimuch'},
			{id: 2, name: 'Sveta'},
			{id: 3, name: 'Andrew'},
			{id: 4, name: 'Stive'},
			{id: 5, name: 'Alex'}
		],
		
		messages: [
			{id: 1, message: 'Hello'},
			{id: 2, message: 'Haw are you?'},
			{id: 3, message: '=)))'},
			{id: 4, message: 'Go!!!!!!'},
			{id: 5, message: 'Let go to the movi!'}
		],
		newMessageText: ''
};

const dialogsReducer = (state = initialState, action) => {
	switch(action.type) {
		case UPDATE_NEW_MESSAGE_TEXT:
			state.newMessageText = action.text;
			return state;
		
		case SEND_MESSAGE:
			let newMessage = {
				id: 6,
				message: state.newMessageText
			}
			state.messages.push(newMessage);
			state.newMessageText = '';
			return state;
		
		default:
			return state;
	}
};

export default dialogsReducer;

export const updateNewMessageTextAC = (text) => ({type: UPDATE_NEW_MESSAGE_TEXT, text});
export const sendMessageAC = () => ({type: SEND_MESSAGE});