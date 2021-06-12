const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE_NEW_MESSAGE_TEXT';
const SEND_MESSAGE = 'SEND_MESSAGE';

const initialState = {
	
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