import {usersAPI} from '../api/api';
import {updateObjectInArray} from '../utils/objects-helpers';
import {PhotosType} from '../types/types';
import {UserType} from '../types/types';

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_IN_PROGRESS = 'TOGGLE_IS_FOLLOWING_IN_PROGRESS'

const initialState = {
	users: [] as Array<UserType>,
	pageSize:  10,
	totalUsersCount: 0,
	currentPage: 1,
	isFetching: true,
	followingInProgress: [] as Array<number>,
	portionSize: 10 
};

export type initialStateType = typeof initialState;

const usersReducers = (state = initialState, action: any): initialStateType => {
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

type FollowSuccessActionType = {
	type: typeof FOLLOW,
	userId: number
}

const followSuccess = (userId: number): FollowSuccessActionType => ({type: FOLLOW, userId});

type UnfollowSuccessActionType = {
	type: typeof UNFOLLOW,
	userId: number
}

const unfollowSuccess = (userId: number): UnfollowSuccessActionType => ({type: UNFOLLOW, userId});

type SetUsersActionType = {
	type: typeof SET_USERS,
	users: UserType
}

const setUsers = (users: UserType): SetUsersActionType => ({type: SET_USERS, users});

type SetCurrentPageActionType = {
	type: typeof SET_CURRENT_PAGE,
	pageNumber: number
}

export const setCurrentPage = (pageNumber: number): SetCurrentPageActionType => ({type: SET_CURRENT_PAGE, pageNumber});

type setTotalUsersCountActionType = {
	type: typeof SET_TOTAL_USERS_COUNT,
	usersCount: number
}

const setTotalUsersCount = (usersCount: number): setTotalUsersCountActionType => ({type: SET_TOTAL_USERS_COUNT, usersCount});

type ToggleIsFetchingActionType = {
	type: typeof TOGGLE_IS_FETCHING,
	isFetching: boolean
}

const toggleIsFetching = (isFetching: boolean): ToggleIsFetchingActionType => ({type: TOGGLE_IS_FETCHING, isFetching});

type ToggleFollowingProgressActionType = {
	type: typeof TOGGLE_IS_FOLLOWING_IN_PROGRESS,
	isFetching: boolean,
	userId: number
}

export const toggleFollowingProgress = (isFetching: boolean, userId: number): ToggleFollowingProgressActionType => ({type: TOGGLE_IS_FOLLOWING_IN_PROGRESS, isFetching, userId});

// thunk
export const getUsersThunkCreator = (currentPage: number, pageSize: number) => async (dispatch: any) => {
	dispatch(toggleIsFetching(true));
	let data = await usersAPI.getUsers(currentPage, pageSize);
	
	dispatch(toggleIsFetching(false));
	dispatch(setTotalUsersCount(data.totalCount));
	dispatch(setUsers(data.items));
};

const followOverall = async (dispatch: any, userId: number, apiMethod: any, actionCreator: any) => {
	dispatch(toggleFollowingProgress(true, userId));
	let response = await apiMethod(userId);
	if(response.data.resultCode === 0) {
		dispatch(actionCreator(userId));
	}
	dispatch(toggleFollowingProgress(false, userId));
}

export const follow = (userId: number) => async (dispatch: any) => {
	followOverall(dispatch, userId, usersAPI.follow.bind(userId), followSuccess);
};

export const unFollow = (userId: number) => async (dispatch: any) => {
	followOverall(dispatch, userId, usersAPI.unFollow.bind(userId), unfollowSuccess);
};

