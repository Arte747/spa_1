const UPDATE_NEW_POST_TEXT = 'UPDATE_NEW_POST_TEXT';
const ADD_POST = 'ADD_POST';

const initialState = {
	
};

const profileReducer = (state = initialState, action) => {
	
	switch(action.type) {
		case UPDATE_NEW_POST_TEXT:
			state.newPostText = action.text;
			return state;
			
		case ADD_POST:
			let newPost = {
				id: 6,
				message: state.newPostText
			}
			state.posts.push(newPost);
			state.newPostText = '';
			return state;
		
		default:
			return state;
	}
	
};

export default profileReducer;

export const updateNewPostTextAC = (text) => ({type: UPDATE_NEW_POST_TEXT, text});
export const addPostAC = () => ({type: ADD_POST});