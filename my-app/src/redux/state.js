const UPDATE_NEW_POST_TEXT = 'UPDATE_NEW_POST_TEXT';
const ADD_POST = 'ADD_POST';

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
			]
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
		switch(action.type) {
			case UPDATE_NEW_POST_TEXT:
				this._state.profilePage.newPostText = action.text;
				this._collSubscriber(this._state);
				break;
				
			case ADD_POST:
				let newPost = {
					id: 6,
					message: this._state.profilePage.newPostText
				}
				this._state.profilePage.posts.push(newPost);
				this._state.profilePage.newPostText = '';
				this._collSubscriber(this._state);
				break;
		}
	}
	
};

window.store = store;

export default store;

export const updateNewPostTextAC = (text) => ({type: UPDATE_NEW_POST_TEXT, text});
export const addPostAC = () => ({type: ADD_POST});