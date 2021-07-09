import {usersAPI} from '../api/api';
import {stopSubmit} from 'redux-form';
import {PhotosType, ProfileType, ContactsType} from '../types/types';
// import {ProfileType} from '../types/types';
// import {ContactsType} from '../types/types';

const ADD_POST = 'ADD_POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_USER_STATUS = 'SET_USER_STATUS';
const DELETE_POST = 'DELETE_POST';
const SAVE_PHOTO_SUCCESS = 'SAVE_PHOTO_SUCCESS';

type PostType = {
	id: number,
	message: string
};

const initialState = {
	posts: [
			{id: 1, message: 'Hello world!'},
			{id: 2, message: 'Haw are you?'},
			{id: 3, message: 'Yo'},
			{id: 4, message: '!!!!!!!'},
			{id: 5, message: 'Hi'}
		] as Array<PostType>,
		profile: null as ProfileType | null,
		status: '',
		newPostText: null as string | null
};

export type initialStateType = typeof initialState;

const profileReducer = (state = initialState, action: any): initialStateType => {
	
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
				profile: {...state.profile, photos: action.photos} as ProfileType
			}
		
		default:
			return state;
	}
	
};

export default profileReducer;

type AddPostACType = {
	type: typeof ADD_POST,
	newPost: string
}

export const addPostAC = (newPost: string): AddPostACType => ({type: ADD_POST, newPost});

type SetUserProfileType = {
	type: typeof SET_USER_PROFILE,
	profile: ProfileType
}

const setUserProfile = (profile: ProfileType): SetUserProfileType => ({type: SET_USER_PROFILE, profile});

type SetUserStatusType = {
	type: typeof SET_USER_STATUS, 
	status: string
}

const setUserStatus = (status: string): SetUserStatusType => ({type: SET_USER_STATUS, status});

type DeletePostType = {
	type: typeof DELETE_POST,
	postId: number
}

export const deletePost = (postId: number): DeletePostType => ({type: DELETE_POST, postId});

type SavePhotoSuccessType = {
	type: typeof SAVE_PHOTO_SUCCESS, 
	photos: PhotosType
}

const savePhotoSuccess = (photos: PhotosType): SavePhotoSuccessType => ({type: SAVE_PHOTO_SUCCESS, photos});

// thunk
export const getUserProfile = (userId: number) => async (dispatch: any) => {
	let response = await usersAPI.getUserProfile(userId);
	
	dispatch(setUserProfile(response.data));
};

export const getUserStatus = (userId: number) => async (dispatch: any) => {
	let response = await usersAPI.getStatus(userId);
	
	dispatch(setUserStatus(response.data));
};

export const updateStatus = (status: string) => async (dispatch: any) => {
	// try {
		// let response = await usersAPI.updateStatus(status);
		
		// if(response.data.resultCode === 0) {
			// dispatch(setUserStatus(status));
		// }
	// } catch (error) {
		// debugger
	// }
	
	let response = await usersAPI.updateStatus(status);
		
		if(response.data.resultCode === 0) {
			dispatch(setUserStatus(status));
		}
};

// в ответе сервера придет объект Photos, в котором будут url на фото
export const savePhoto = (photo: any) => async (dispatch: any) => {
	let response = await usersAPI.savePhoto(photo);
	
	if(response.data.resultCode === 0) {
		dispatch(response.data.data.photos);
	}
};

export const saveProfile = (profile: ProfileType) => async (dispatch: any, getState: any) => {
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