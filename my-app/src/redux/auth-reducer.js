import {usersAPI} from '../api/api';

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
			let {userId, email, login} = response.data.data;
			dispatch(setAuthUserData(userId, email, login, true));
		}
	});
};

export const login = (email, password, rememberMe) => (dispatch) => {
	usersAPI.login(email, password, rememberMe).then(response => {
		if(response.data.resultCode === 0) {
			dispatch(getAuthUserData());
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