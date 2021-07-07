const SEND_MESSAGE = 'SEND_MESSAGE';

type dialogType = {
	id: number,
	name: string
}

type messageType = {
	id: number,
	message: string
}

const initialState = {
	dialogs: [
			{id: 1, name: 'Dimuch'},
			{id: 2, name: 'Sveta'},
			{id: 3, name: 'Andrew'},
			{id: 4, name: 'Stive'},
			{id: 5, name: 'Alex'}
		] as Array<dialogType>,
		
		messages: [
			{id: 1, message: 'Hello'},
			{id: 2, message: 'Haw are you?'},
			{id: 3, message: '=)))'},
			{id: 4, message: 'Go!!!!!!'},
			{id: 5, message: 'Let go to the movi!'}
		] as Array<messageType>,
		newMessageText: ''
};

export type initialStateType = typeof initialState;

const dialogsReducer = (state = initialState, action: any): initialStateType => {
	switch(action.type) {
		
		case SEND_MESSAGE:
			let newMessage = {
				id: 6,
				message: action.newMessage
			}
			return {
				...state,
				messages: [...state.messages, newMessage],
				newMessageText: ''
			}
		
		default:
			return state;
	}
};

export default dialogsReducer;

type sendMessageACType = {
	type: typeof SEND_MESSAGE,
	newMessage: string
}

export const sendMessageAC = (newMessage: string): sendMessageACType => ({type: SEND_MESSAGE, newMessage});