import profileReducers from './profile-reducer';
import dialogsReducers from './dialogs-reducer';

let store = {
	_state: {
		
		profilePage: {
			posts: [
				{id: 1, message: 'Hello world!'},
				{id: 2, message: 'Haw are you?'},
				{id: 3, message: 'Yo'},
				{id: 4, message: '!!!!!!!'},
				{id: 5, message: 'Hi'}
			],
			newPostText: ''
		},
		
		dialogsPage: {
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
		}
		
	},
	
	getState() {
		return this._state;
	},
	
	subscribe(observer) {
		this._collSubscriber = observer;
	},
	
	_collSubscriber(state) {
		console.log('state was changed');
	},
	
	dispatch(action) {
		
		this._state.profilePage = profileReducers(this._state.profilePage, action);
		this._state.dialogsPage = dialogsReducers(this._state.dialogsPage, action);
		
		this._collSubscriber(this._state);
	}
	
};

export default store;

window.store = store;