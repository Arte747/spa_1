import {usersAPI} from '../api/api';

const ADD_POST = 'ADD_POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_USER_STATUS = 'SET_USER_STATUS';
const DELETE_POST = 'DELETE_POST';

const initialState = {
	posts: [
			{id: 1, message: 'Hello world!'},
			{id: 2, message: 'Haw are you?'},
			{id: 3, message: 'Yo'},
			{id: 4, message: '!!!!!!!'},
			{id: 5, message: 'Hi'}
		],
		profile: null,
		status: ''
};

const profileReducer = (state = initialState, action) => {
	
	switch(action.type) {
		
		case ADD_POST:
			let newPost = {
				id: 6,
				message: action.newPost
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
		
		case SET_USER_STATUS:
			return {
				...state,
				status: action.status
			}
		
		case DELETE_POST:
			return {
				...state,
				posts: state.posts.filter(p => p.id != action.postId)
			}
		
		default:
			return state;
	}
	
};

export default profileReducer;

export const addPostAC = (newPost) => ({type: ADD_POST, newPost});
const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile});
const setUserStatus = (status) => ({type: SET_USER_STATUS, status});
export const deletePost = (postId) => ({type: DELETE_POST, postId});

// thunk
export const getUserProfile = (userId) => (dispatch) => {
	usersAPI.getUserProfile(userId).then(response => {
		dispatch(setUserProfile(response.data));
	});
};

export const getUserStatus = (userId) => (dispatch) => {
	usersAPI.getStatus(userId).then(response => {
		dispatch(setUserStatus(response.data));
	});
};

export const updateStatus = (status) => (dispatch) => {
	usersAPI.updateStatus(status).then(response => {
		if(response.data.resultCode === 0) {
			dispatch(setUserStatus(status));
		}
	});
};