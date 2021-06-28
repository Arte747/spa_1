import {usersAPI} from '../api/api';
import {stopSubmit} from 'redux-form';

const ADD_POST = 'ADD_POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_USER_STATUS = 'SET_USER_STATUS';
const DELETE_POST = 'DELETE_POST';
const SAVE_PHOTO_SUCCESS = 'SAVE_PHOTO_SUCCESS';

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
		
		case SAVE_PHOTO_SUCCESS:
			return {
				...state,
				profile: {...state.profile, photos: action.photos}
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
const savePhotoSuccess = (photos) => ({type: SAVE_PHOTO_SUCCESS, photos});

// thunk
export const getUserProfile = (userId) => async (dispatch) => {
	let response = await usersAPI.getUserProfile(userId);
	
	dispatch(setUserProfile(response.data));
};

export const getUserStatus = (userId) => async (dispatch) => {
	let response = await usersAPI.getStatus(userId);
	
	dispatch(setUserStatus(response.data));
};

export const updateStatus = (status) => async (dispatch) => {
	let response = await usersAPI.updateStatus(status);
	
	if(response.data.resultCode === 0) {
		dispatch(setUserStatus(status));
	}
};

// в ответе сервера придет объект Photos, в котором будут url на фото
export const savePhoto = (photo) => async (dispatch) => {
	let response = await usersAPI.savePhoto(photo);
	
	if(response.data.resultCode === 0) {
		dispatch(response.data.data.photos);
	}
};

export const saveProfile = (profile) => async (dispatch, getState) => {
	const userId = getState().auth.autorizedUserId;
	const response = await usersAPI.saveProfile(profile);
	if(response.data.resultCode === 0) {
		dispatch(getUserProfile(userId));
	} else {
		dispatch(stopSubmit("edit-profile", {_error: response.data.messages[0]}));
		return Promise.reject();
	}
}

// доработать вывод ошибки валидации

// export const saveProfile = (profile) => async (dispatch, getState) => {
	// const userId = getState().auth.autorizedUserId;
	// const response = await usersAPI.saveProfile(profile);
	// if(response.data.resultCode === 0) {
		// dispatch(getUserProfile(userId));
	// } else {
		// dispatch(stopSubmit("edit-profile", {	"contacts": {"facebook": response.data.messages[0]}}));
	// }
// }