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
				...action.data,
				isAuth: true
			}
		
		default:
			return state;
	}
};

export default authReducer;

export const setAuthUserData = (userId, email, login) => ({type: SET_USER_DATA, data: {userId, email, login}});

// thunk
export const getAuthUserData = () => (dispatch) => {
	usersAPI.me().then(response => {
		if(response.data.resultCode === 0) {
			let {userId, email, login} = response.data.data;
			dispatch(setAuthUserData(userId, email, login));
		}
	});
};