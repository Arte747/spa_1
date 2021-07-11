import {InferActionsType} from './redux-store';



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


const dialogsReducer = (state = initialState, action: ActionsType): InitialStateType => {
	switch(action.type) {
		
		case 'SEND_MESSAGE':
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

export const actions = {
	sendMessage: (newMessage: string) => ({type: 'SEND_MESSAGE', newMessage} as const)
}


// выводим тип initialState
export type InitialStateType = typeof initialState;
// выводим тип actions
type ActionsType = InferActionsType<typeof actions>