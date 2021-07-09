import axios from 'axios';
import {ProfileType} from '../types/types';


const instance = axios.create({
	withCredentials: true,
	baseURL: 'https://social-network.samuraijs.com/api/1.0/',
	headers: {
		"API-KEY": "d9b3b67d-4244-4bca-ab4c-32d743550bdc"
	}
});

export enum ResultCodesEnum {
	Success = 0,
	Error = 1,
	CaptchaIsRequired = 10
}

export enum ResultCodeWithCaptcha {
	CaptchaIsRequired = 10
}

type MeResponseType = {
	data: {
		id: number
		email: string
		login: string
	}
	resultCode: ResultCodesEnum
	messages: Array<string>
}

type LoginResponseType = {
	data: {
		userId: number
	}
	resultCode: ResultCodesEnum | ResultCodeWithCaptcha
	messages: Array<string>
}

export const usersAPI = {
	getUsers(currentPage: number, pageSize: number) {
		return instance.get(`users?page=${currentPage}&count=${pageSize}`)
			.then(response => response.data);
	},
	
	follow(userId: number) {
		return instance.post(`https://social-network.samuraijs.com/api/1.0/follow/${userId}`)
	},
	
	unFollow(userId: number) {
		return instance.delete(`https://social-network.samuraijs.com/api/1.0/follow/${userId}`)
	},
	
	me() {
		return instance.get<MeResponseType>(`auth/me`).then(res => res.data);
	},
	
	getUserProfile(userId: number) {
		return instance.get(`profile/${userId}`)
	},
	
	getStatus(userId: number) {
		return instance.get(`profile/status/${userId}`);
	},
	
	updateStatus(status: string) {
		return instance.put(`profile/status`, {status});
	},
	
	login(email: string, password: string, rememberMe = false, captcha: null | string = null) {
		return instance.post<LoginResponseType>(`auth/login`, {email, password, rememberMe, captcha}).then(res => res.data);
	},
	
	logout() {
		return instance.delete(`auth/login`);
	},
	
	savePhoto(photo: any) {
		const formData = new FormData();
		formData.append("image", photo)
		// третим параметром указываем, что тип данных не json, а formData
		return instance.put(`profile/photo`, formData, {
			headers: {'Content-Type': 'multipart/form-data'}
		});
	},
	
	saveProfile(profile: ProfileType) {
		return instance.put(`/profile`, profile);
	},
	
	getCaptcha() {
		return instance.put(`security/get-captcha-url`);
	}
};