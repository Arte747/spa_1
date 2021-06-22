import * as axios from 'axios';


const instanse = axios.create({
	withCredentials: true,
	baseURL: 'https://social-network.samuraijs.com/api/1.0/',
	headers: {
		"API-KEY": "d9b3b67d-4244-4bca-ab4c-32d743550bdc"
	}
});

export const usersAPI = {
	getUsers(currentPage, pageSize) {
		return instanse.get(`users?page=${currentPage}&count=${pageSize}`)
			.then(response => response.data);
	},
	
	follow(userId) {
		return instanse.post(`https://social-network.samuraijs.com/api/1.0/follow/${userId}`)
	},
	
	unFollow(userId) {
		return instanse.delete(`https://social-network.samuraijs.com/api/1.0/follow/${userId}`)
	},
	
	me() {
		return instanse.get(`auth/me`)
	},
	
	getUserProfile(userId) {
		return instanse.get(`profile/${userId}`)
	},
	
	getStatus(userId) {
		return instanse.get(`profile/status/${userId}`);
	},
	
	updateStatus(status) {
		return instanse.put(`profile/status`, {status});
	},
	
	login(email, password, rememberMe = false) {
		return instanse.post(`auth/login`, {email, password, rememberMe});
	},
	
	logout() {
		return instanse.delete(`auth/login`);
	}
};