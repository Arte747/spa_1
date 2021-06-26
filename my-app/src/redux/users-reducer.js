import {usersAPI} from '../api/api';
import {updateObjectInArray} from '../utils/objects-helpers';

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
	portionSize: 10 
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
				users: updateObjectInArray(state.users, action.userId, "id", {followed: true})
			}
		
		case UNFOLLOW:
			return {
				...state,
				users: updateObjectInArray(state.users, action.userId, "id", {followed: false})
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
export const getUsersThunkCreator = (currentPage, pageSize) => async (dispatch) => {
	dispatch(toggleIsFetching(true));
	let data = await usersAPI.getUsers(currentPage, pageSize);
	
	dispatch(toggleIsFetching(false));
	dispatch(setTotalUsersCount(data.totalCount));
	dispatch(setUsers(data.items));
};

const followOverall = async (dispatch, userId, apiMethod, actionCreator) => {
	dispatch(toggleFollowingProgress(true, userId));
	let response = await apiMethod(userId);
	if(response.data.resultCode === 0) {
		dispatch(actionCreator(userId));
	}
	dispatch(toggleFollowingProgress(false, userId));
}

export const follow = (userId) => async (dispatch) => {
	followOverall(dispatch, userId, usersAPI.follow.bind(userId), followSuccess);
};

export const unFollow = (userId) => async (dispatch) => {
	followOverall(dispatch, userId, usersAPI.unFollow.bind(userId), unfollowSuccess);
};

