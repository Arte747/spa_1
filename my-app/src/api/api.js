import * as axios from 'axios';


const instance = axios.create({
	withCredentials: true,
	baseURL: 'https://social-network.samuraijs.com/api/1.0/',
	headers: {
		"API-KEY": "d9b3b67d-4244-4bca-ab4c-32d743550bdc"
	}
});

export const usersAPI = {
	getUsers(currentPage, pageSize) {
		return instance.get(`users?page=${currentPage}&count=${pageSize}`)
			.then(response => response.data);
	},
	
	follow(userId) {
		return instance.post(`https://social-network.samuraijs.com/api/1.0/follow/${userId}`)
	},
	
	unFollow(userId) {
		return instance.delete(`https://social-network.samuraijs.com/api/1.0/follow/${userId}`)
	},
	
	me() {
		return instance.get(`auth/me`)
	},
	
	getUserProfile(userId) {
		return instance.get(`profile/${userId}`)
	},
	
	getStatus(userId) {
		return instance.get(`profile/status/${userId}`);
	},
	
	updateStatus(status) {
		return instance.put(`profile/status`, {status});
	},
	
	login(email, password, rememberMe = false, captcha) {
		return instance.post(`auth/login`, {email, password, rememberMe, captcha});
	},
	
	logout() {
		return instance.delete(`auth/login`);
	},
	
	savePhoto(photo) {
		const formData = new FormData();
		formData.append("image", photo)
		// третим параметром указываем, что тип данных не json, а formData
		return instance.put(`profile/photo`, formData, {
			'Content-Type': 'multipart/form-data'
		});
	},
	
	saveProfile(profile) {
		return instance.put(`/profile`, profile);
	},
	
	getCaptcha() {
		return instance.put(`security/get-captcha-url`);
	}
};