import axios from 'axios';
import {ProfileType, UserType, PhotosType} from '../types/types';


const instance = axios.create({
	withCredentials: true,
	baseURL: 'https://social-network.samuraijs.com/api/1.0/',
	headers: {
		"API-KEY": "d9b3b67d-4244-4bca-ab4c-32d743550bdc"
	}
});

export enum ResultCode {
	Success = 0,
	Error = 1,
	CaptchaIsRequired = 10
}

export enum ResultCodeWithCaptchaEnum {
	CaptchaIsRequired = 10
}

type MeResponseDataType = {
	id: number
	email: string
	login: string
}

type LoginResponseDataType = {
	userId: number
}

//

type GetItemsType = {
	items: Array<UserType>
	totalCount: number
	error: string | null
}
// D = {} тип пустой объект
// RC = ResultCode тип
type APIResponseType<D = {}, RC = ResultCode> = {
	data: D
	messages: string
	resultCode: RC
}

type SavePhotoResponseDataType = {
	photos: PhotosType
}

type GetCaptchaURLResponseType = {
	url: string
}

export const usersAPI = {
	// users
	getUsers(currentPage: number, pageSize: number) {
		return instance.get<GetItemsType>(`users?page=${currentPage}&count=${pageSize}`)
			.then(res => res.data);
	},
	
	follow(userId: number) {
		return instance.post<APIResponseType>(`follow/${userId}`).then(res => res.data);
	},
	
	unFollow(userId: number) {
		return instance.delete(`follow/${userId}`).then(res => res.data) as Promise<APIResponseType>
	},
	//
	me() {
		return instance.get<APIResponseType<MeResponseDataType>>(`auth/me`).then(res => res.data);
	},
	
	getUserProfile(userId: number) {
		return instance.get<ProfileType>(`profile/${userId}`).then(res => res.data);
	},
	
	getStatus(userId: number) {
		return instance.get<string>(`profile/status/${userId}`).then(res => res.data);
	},
	
	updateStatus(status: string) {
		return instance.put<APIResponseType>(`profile/status`, {status}).then(res => res.data);
	},
	
	login(email: string, password: string, rememberMe = false, captcha: null | string = null) {
		return instance.post<APIResponseType<LoginResponseDataType, ResultCode | ResultCodeWithCaptchaEnum>>(`auth/login`, {email, password, rememberMe, captcha}).then(res => res.data);
	},
	
	logout() {
		return instance.delete(`auth/login`);
	},
	
	savePhoto(photo: any) {
		const formData = new FormData();
		formData.append("image", photo)
		// третим параметром указываем, что тип данных не json, а formData
		return instance.put<APIResponseType<SavePhotoResponseDataType>>(`profile/photo`, formData, {
			headers: {'Content-Type': 'multipart/form-data'}
		}).then(res => res.data);
	},
	
	saveProfile(profile: ProfileType) {
		return instance.put<APIResponseType>(`/profile`, profile).then(res => res.data);
	},
	
	getCaptcha() {
		return instance.put<GetCaptchaURLResponseType>(`security/get-captcha-url`).then(res => res.data);
	}
};