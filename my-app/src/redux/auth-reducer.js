import {usersAPI} from '../api/api';
import {stopSubmit} from 'redux-form';

const SET_USER_DATA = 'SET_USER_DATA';

const initialState = {
	userId: null,
	email: null,
	login: null,
	isAuth: false
};

const authReducer = (state = initialState, action) => {
	switch(action.type) {
		case SET_USER_DATA:
			return {
				...state,
				...action.data
			}
		
		default:
			return state;
	}
};

export default authReducer;

export const setAuthUserData = (userId, email, login, isAuth) => ({type: SET_USER_DATA, data: {userId, email, login, isAuth}});

// thunk

// получение и установка авторизационных(пользоватеьских данных)
export const getAuthUserData = () => (dispatch) => {
	usersAPI.me().then(response => {
		if(response.data.resultCode === 0) {
			let {id, email, login} = response.data.data;
			dispatch(setAuthUserData(id, email, login, true));
		}
	});
};

export const login = (email, password, rememberMe) => (dispatch) => {
	usersAPI.login(email, password, rememberMe).then(response => {
		if(response.data.resultCode === 0) {
			dispatch(getAuthUserData());
		} else {
			let message = response.data.messages.length > 0 ? response.data.messages[0] : "Some error"
			// первый параметр-уникальное имя формы
			// второй имя поля(name) и текст ошибки
			// _error выводит общую для всей формы ошибку
			dispatch(stopSubmit("loginForm", {_error: message}));
		}
	});
};

export const logout = () => (dispatch) => {
	usersAPI.logout().then(response => {
		if(response.data.resultCode === 0) {
			dispatch(setAuthUserData(null, null, null, false));
		}
	});
};