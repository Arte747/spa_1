import {usersAPI} from '../api/api';

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
	followingInProgress: [],
	fake: 10
}

const usersReducers = (state = initialState, action) => {
	switch(action.type) {
		
		case "FAKE":
			return {
				...state,
				fake: state.fake + 1
			}
		
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
					: state.followingInProgress.filter(id => id !== action.userId)
			}
		
		default:
			return state;
	}
};

export default usersReducers;

const followSuccess = (userId) => ({type: FOLLOW, userId});
const unfollowSuccess = (userId) => ({type: UNFOLLOW, userId});
const setUsers = (users) => ({type: SET_USERS, users});
export const setCurrentPage = (pageNumber) => ({type: SET_CURRENT_PAGE, pageNumber});
const setTotalUsersCount = (usersCount) => ({type: SET_TOTAL_USERS_COUNT, usersCount});
const toggleIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching});
export const toggleFollowingProgress = (isFetching, userId) => ({type: TOGGLE_IS_FOLLOWING_IN_PROGRESS, isFetching, userId});

// thunk
export const getUsersThunkCreator = (currentPage, pageSize) => {
		return (dispatch) => {
			dispatch(toggleIsFetching(true));
			usersAPI.getUsers(currentPage, pageSize).then(data => {
				dispatch(toggleIsFetching(false));
				dispatch(setTotalUsersCount(data.totalCount));
				dispatch(setUsers(data.items));
			});
		};
};

export const follow = (userId) => (dispatch) => {
	dispatch(toggleFollowingProgress(true, userId));
	usersAPI.follow(userId).then(response => {
		if(response.data.resultCode === 0) {
			dispatch(followSuccess(userId));
		}
		dispatch(toggleFollowingProgress(false, userId));
	});
};

export const unFollow = (userId) => (dispatch) => {
	dispatch(toggleFollowingProgress(true, userId));
	usersAPI.unFollow(userId).then(response => {
		if(response.data.resultCode === 0) {
			dispatch(unfollowSuccess(userId));
		}
		dispatch(toggleFollowingProgress(false, userId));
	});
};

