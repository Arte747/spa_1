import {usersAPI} from '../api/api';

const UPDATE_NEW_POST_TEXT = 'UPDATE_NEW_POST_TEXT';
const ADD_POST = 'ADD_POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';

const initialState = {
	posts: [
			{id: 1, message: 'Hello world!'},
			{id: 2, message: 'Haw are you?'},
			{id: 3, message: 'Yo'},
			{id: 4, message: '!!!!!!!'},
			{id: 5, message: 'Hi'}
		],
		newPostText: '',
		profile: null
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
		
		case SET_USER_PROFILE:
			return {
				...state,
				profile: action.profile
			}
		
		default:
			return state;
	}
	
};

export default profileReducer;

export const updateNewPostTextAC = (text) => ({type: UPDATE_NEW_POST_TEXT, text});
export const addPostAC = () => ({type: ADD_POST});
const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile});

// thunk
export const getUserProfile = (userId) => (dispatch) => {
	usersAPI.getUserProfile(userId).then(response => {
		dispatch(setUserProfile(response.data));
	});
};