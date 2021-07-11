import {usersAPI} from '../api/api';
import {stopSubmit, FormAction} from 'redux-form';
import {PhotosType, ProfileType, ContactsType} from '../types/types';
import {InferActionsType, BaseThunkType} from './redux-store';

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



const profileReducer = (state = initialState, action: ActionsType): InitialStateType => {
	
	switch(action.type) {
		
		case 'ADD_POST':
			let newPost = {
				id: 6,
				message: action.newPost
			}
			return {
				...state,
				posts: [...state.posts, newPost],
				newPostText: ''
			}
		
		case 'SET_USER_PROFILE':
			return {
				...state,
				profile: action.profile
			}
		
		case 'SET_USER_STATUS':
			return {
				...state,
				status: action.status
			}
		
		case 'DELETE_POST':
			return {
				...state,
				posts: state.posts.filter(p => p.id != action.postId)
			}
		
		case 'SAVE_PHOTO_SUCCESS':
			return {
				...state,
				profile: {...state.profile, photos: action.photos} as ProfileType
			}
		
		default:
			return state;
	}
	
};

export default profileReducer;

export const actions = {
	addPostAC: (newPost: string) => ({type: 'ADD_POST', newPost} as const),
	setUserProfile: (profile: ProfileType) => ({type: 'SET_USER_PROFILE', profile} as const),
	setUserStatus: (status: string) => ({type: 'SET_USER_STATUS', status} as const),
	deletePost: (postId: number) => ({type: 'DELETE_POST', postId} as const),
	savePhotoSuccess: (photos: PhotosType) => ({type: 'SAVE_PHOTO_SUCCESS', photos} as const)
}
// thunk
export const getUserProfile = (userId: number): ThunkType => async (dispatch) => {
	let data = await usersAPI.getUserProfile(userId);
	
	dispatch(actions.setUserProfile(data));
};
export const getUserStatus = (userId: number): ThunkType => async (dispatch) => {
	let data = await usersAPI.getStatus(userId);
	
	dispatch(actions.setUserStatus(data));
};
export const updateStatus = (status: string): ThunkType => async (dispatch) => {
	try {
		let data = await usersAPI.updateStatus(status);
		if(data.resultCode === 0) {
			dispatch(actions.setUserStatus(status));
			
		}
	} catch (error) {
		
	}
	
	// let data = await usersAPI.updateStatus(status);
		
	// if(data.resultCode === 0) {
		// dispatch(setUserStatus(status));
	// } else {
		// let a = data.messages[0];
		// alert(a)
	// }
};

// в ответе сервера придет объект Photos, в котором будут url на фото
export const savePhoto = (photo: File): ThunkType => async (dispatch) => {
	let data = await usersAPI.savePhoto(photo);
	
	if(data.resultCode === 0) {
		dispatch(actions.savePhotoSuccess(data.data.photos));
	}
};
export const saveProfile = (profile: ProfileType): ThunkType => async (dispatch, getState) => {
	const userId = getState().auth.autorizedUserId;
	const data = await usersAPI.saveProfile(profile);
	if(data.resultCode === 0) {
		if(userId !== null) {
			dispatch(getUserProfile(userId));
		} else {
			throw new Error("userId can't be null")
		}
	} else {
		// эта ошибка попадет в InfoEditMode
		dispatch(stopSubmit("edit-profile", {_error: data.messages[0]}));
		return Promise.reject(data.messages[0]);
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

// определяем тип initialState
export type InitialStateType = typeof initialState;
// определяем тип action
type ActionsType = InferActionsType<typeof actions>
// выводим тип для thunk
type ThunkType = BaseThunkType<ActionsType | FormAction>;