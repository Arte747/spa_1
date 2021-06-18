const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_IN_PROGRESS = 'TOGGLE_IS_FOLLOWING_IN_PROGRESS'

const initialState = {
	users: [],
	pageSize: 10,
	totalUsersCount: 0,
	currentPage: 1,
	isFetching: true,
	followingInProgress: []
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
		
		case TOGGLE_IS_FETCHING:
			return {
				...state,
				isFetching: action.isFetching
			}
		
		case TOGGLE_IS_FOLLOWING_IN_PROGRESS:
			return {
				...state,
				followingInProgress: action.isFetching
					? [...state.followingInProgress, action.userId]
					: state.followingInProgress.filter(id => id != action.userId)
			}
		
		default:
			return state;
	}
};

export default usersReducers;

export const follow = (userId) => ({type: FOLLOW, userId});
export const unfollow = (userId) => ({type: UNFOLLOW, userId});
export const setUsers = (users) => ({type: SET_USERS, users});
export const setCurrentPage = (pageNumber) => ({type: SET_CURRENT_PAGE, pageNumber});
export const setTotalUsersCount = (usersCount) => ({type: SET_TOTAL_USERS_COUNT, usersCount});
export const toggleIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching});
export const toggleFollowingProgress = (isFetching, userId) => ({type: TOGGLE_IS_FOLLOWING_IN_PROGRESS, isFetching, userId});