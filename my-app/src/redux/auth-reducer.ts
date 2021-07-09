import {usersAPI} from '../api/api';
import {stopSubmit} from 'redux-form';
import {ResultCodesEnum, ResultCodeWithCaptcha} from '../api/api';

const SET_USER_DATA = 'SET_USER_DATA';
const GET_CAPTCHA_URL_SUCCESS = 'GET_CAPTCHA_URL_SUCCESS';

const initialState = {
	autorizedUserId: null as number | null,
	email: null as string | null,
	login: null as string | null,
	isAuth: false,
	captchaUrl: null as string | null // если Null, captcha не обязательна
};

export type initialStateType = typeof initialState;

const authReducer = (state = initialState, action: any): initialStateType => {
	switch(action.type) {
		case SET_USER_DATA:
			return {
				...state,
				...action.payLoad
			}
		
		case GET_CAPTCHA_URL_SUCCESS:
			return {
				...state,
				...action.payLoad
			}
		
		default:
			return state;
	}
};

export default authReducer;

type setAuthUserDataActionpayLoadType = {
	autorizedUserId: number | null
	email: string | null
	login: string | null
	isAuth: boolean
};

type setAuthUserDataActionType = {
	type: typeof SET_USER_DATA,
	payLoad: setAuthUserDataActionpayLoadType
};

export const setAuthUserData = (autorizedUserId: number | null, email: string | null, login: string | null, isAuth: boolean): setAuthUserDataActionType => ({type: SET_USER_DATA, payLoad: {autorizedUserId, email, login, isAuth}});



type getCaptchaUrlSuccessActionType = {
	type: typeof GET_CAPTCHA_URL_SUCCESS,
	payLoad: {captchaUrl: string}
}

export const getCaptchaUrlSuccess = (captchaUrl: string): getCaptchaUrlSuccessActionType => ({type: GET_CAPTCHA_URL_SUCCESS, payLoad: {captchaUrl}});

// thunk

// получение и установка авторизационных(пользоватеьских данных)
export const getAuthUserData = () => async (dispatch: any) => {
	let meData = await usersAPI.me();
	
	if(meData.resultCode === ResultCodesEnum.Success) {
		let {id, email, login} = meData.data;
		dispatch(setAuthUserData(id, email, login, true));
	}
};

export const login = (email: string, password: string, rememberMe: boolean, captcha: string) => async (dispatch: any) => {
	let loginData = await usersAPI.login(email, password, rememberMe, captcha);
	
	if(loginData.resultCode === ResultCodesEnum.Success) {
		dispatch(getAuthUserData());
	} else {
		if(loginData.resultCode === ResultCodeWithCaptcha.CaptchaIsRequired) {
			dispatch(getCaptchaUrl());
		}
		let message = loginData.messages.length > 0 ? loginData.messages[0] : "Some error"
		// первый параметр-уникальное имя формы
		// второй имя поля(name) и текст ошибки
		// _error выводит общую для всей формы ошибку
		dispatch(stopSubmit("loginForm", {_error: message}));
	}
};

export const logout = () => async (dispatch: any) => {
	let response = await usersAPI.logout();
	
	if(response.data.resultCode === 0) {
		dispatch(setAuthUserData(null, null, null, false));
	}
};

export const getCaptchaUrl = () => async (dispatch: any) => {
	const response = await usersAPI.getCaptcha();
	const captchaUrl = response.data.url;
	dispatch(getCaptchaUrlSuccess(captchaUrl));
}