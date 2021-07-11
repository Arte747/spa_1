import {usersAPI} from '../api/api';
import {stopSubmit, FormAction} from 'redux-form';
import {ResultCode, ResultCodeWithCaptchaEnum} from '../api/api';
import {BaseThunkType, InferActionsType} from './redux-store';
import {Action} from 'redux';

const initialState = {
	autorizedUserId: null as number | null,
	email: null as string | null,
	login: null as string | null,
	isAuth: false,
	captchaUrl: null as string | null // если Null, captcha не обязательна
};



const authReducer = (state = initialState, action: ActionsType): initialStateType => {
	switch(action.type) {
		case 'SET_USER_DATA':
			return {
				...state,
				...action.payLoad
			}
		
		case 'GET_CAPTCHA_URL_SUCCESS':
			return {
				...state,
				...action.payLoad
			}
		
		default:
			return state;
	}
};

export default authReducer;

export const actions = {
	setAuthUserData: (autorizedUserId: number | null, email: string | null, login: string | null, isAuth: boolean) => ({type: 'SET_USER_DATA', payLoad: {autorizedUserId, email, login, isAuth}} as const),

	getCaptchaUrlSuccess: (captchaUrl: string) => ({type: 'GET_CAPTCHA_URL_SUCCESS', payLoad: {captchaUrl}} as const)
}

// thunk

// получение и установка авторизационных(пользоватеьских данных)
export const getAuthUserData = (): ThunkType => async (dispatch) => {
	let meData = await usersAPI.me();
	
	if(meData.resultCode === ResultCode.Success) {
		let {id, email, login} = meData.data;
		dispatch(actions.setAuthUserData(id, email, login, true));
	}
};
export const login = (email: string, password: string, rememberMe: boolean, captcha: string): ThunkType => async (dispatch) => {
	let loginData = await usersAPI.login(email, password, rememberMe, captcha);
	
	if(loginData.resultCode === ResultCode.Success) {
		dispatch(getAuthUserData());
	} else {
		if(loginData.resultCode === ResultCodeWithCaptchaEnum.CaptchaIsRequired) {
			dispatch(getCaptchaUrl());
		}
		let message = loginData.messages.length > 0 ? loginData.messages[0] : "Some error"
		// первый параметр-уникальное имя формы
		// второй имя поля(name) и текст ошибки
		// _error выводит общую для всей формы ошибку
		dispatch(stopSubmit("loginForm", {_error: message}));
	}
};
export const logout = (): ThunkType => async (dispatch) => {
	let response = await usersAPI.logout();
	
	if(response.data.resultCode === 0) {
		dispatch(actions.setAuthUserData(null, null, null, false));
	}
};
export const getCaptchaUrl = (): ThunkType => async (dispatch) => {
	const data = await usersAPI.getCaptcha();
	const captchaUrl = data.url;
	dispatch(actions.getCaptchaUrlSuccess(captchaUrl));
}
// выводим тип initialState
export type initialStateType = typeof initialState;
// выводим тип action
type ActionsType = InferActionsType<typeof actions>
// выводим тип thunk
type ThunkType = BaseThunkType<ActionsType | FormAction>;