const UPDATE_NEW_POST_TEXT = 'UPDATE_NEW_POST_TEXT';
const ADD_POST = 'ADD_POST';

const initialState = {
	posts: [
			{id: 1, message: 'Hello world!'},
			{id: 2, message: 'Haw are you?'},
			{id: 3, message: 'Yo'},
			{id: 4, message: '!!!!!!!'},
			{id: 5, message: 'Hi'}
		],
		newPostText: ''
};

const profileReducer = (state = initialState, action) => {
	
	switch(action.type) {
		case UPDATE_NEW_POST_TEXT:
			// state.newPostText = action.text;
			// return state;
			return {
				...state,
				newPostText: action.text
			}
			
		case ADD_POST:
			let newPost = {
				id: 6,
				message: state.newPostText
			}
			return {
				...state,
				posts: [...state.posts, newPost],
				newPostText: ''
			}
		
		default:
			return state;
	}
	
};

export default profileReducer;

export const updateNewPostTextAC = (text) => ({type: UPDATE_NEW_POST_TEXT, text});
export const addPostAC = () => ({type: ADD_POST});