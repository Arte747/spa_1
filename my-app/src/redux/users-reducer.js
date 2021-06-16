const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';

const initialState = {
	users: [],
	pageSize: 10,
	totalUsersCount: 100,
	currentPage: 1
}

const usersReducers = (state = initialState, action) => {
	switch(action.type) {
		case SET_USERS:
			return {
				...state,
				users: action.users
			}
		case FOLLOW: 
			return {
				...state,
				users: state.users.map(u => {
					if(u.id === action.userId) {
						return {...u, followed: true}
					}
					return u;
				})
			}
		
		case UNFOLLOW:
			return {
				...state,
				users: state.users.map(u => {
					if(u.id === action.userId) {
						return {...u, followed: false}
					}
					return u;
				})
			}
		
		case SET_CURRENT_PAGE:
			return {
				...state,
				currentPage: action.pageNumber
			}
		
		case SET_TOTAL_USERS_COUNT:
			return {
				...state,
				totalUsersCount: action.usersCount
			}
		
		default:
			return state;
	}
};

export default usersReducers;

export const followAC = (userId) => ({type: FOLLOW, userId});
export const unfollowAC = (userId) => ({type: UNFOLLOW, userId});
export const setUsersAC = (users) => ({type: SET_USERS, users});
export const setCurrentPageAC = (pageNumber) => ({type: SET_CURRENT_PAGE, pageNumber});
export const setTotalUsersCountAC = (usersCount) => ({type: SET_TOTAL_USERS_COUNT, usersCount});