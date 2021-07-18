import {usersAPI, APIResponseType} from '../api/api';
import {updateObjectInArray} from '../utils/objects-helpers';
import {PhotosType} from '../types/types';
import {UserType} from '../types/types'
import {AppStateType, InferActionsTypes, BaseThunkType} from './redux-store'
import {Dispatch} from 'redux'


const initialState = {
	users: [] as Array<UserType>,
	pageSize:  10,
	totalUsersCount: 0,
	currentPage: 1,
	isFetching: true,
	followingInProgress: [] as Array<number>,
	portionSize: 10 
};



const usersReducers = (state = initialState, action: ActionsTypes): initialStateType => {
	switch(action.type) {
		case 'SET_USERS':
			return {
				...state,
				users: action.users
			}
			
		case 'FOLLOW': 
			return {
				...state,
				users: updateObjectInArray(state.users, action.userId, "id", {followed: true})
			}
		
		case 'UNFOLLOW':
			return {
				...state,
				users: updateObjectInArray(state.users, action.userId, "id", {followed: false})
			}
		
		case 'SET_CURRENT_PAGE':
			return {
				...state,
				currentPage: action.pageNumber
			}
		
		case 'SET_TOTAL_USERS_COUNT':
			return {
				...state,
				totalUsersCount: action.usersCount
			}
		
		case 'TOGGLE_IS_FETCHING':
			return {
				...state,
				isFetching: action.isFetching
			}
		
		case 'TOGGLE_IS_FOLLOWING_IN_PROGRESS':
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



export const actions = {
	followSuccess: (userId: number) => ({type: 'FOLLOW', userId}as const),
	unfollowSuccess:(userId: number) => ({type: 'UNFOLLOW', userId}as const),
	setUsers:(users: Array<UserType>) => ({type: 'SET_USERS', users}as const),
	setCurrentPage: (pageNumber: number) => ({type: 'SET_CURRENT_PAGE', pageNumber}as const),
	setTotalUsersCount: (usersCount: number) => ({type: 'SET_TOTAL_USERS_COUNT', usersCount}as const),
	toggleIsFetching: (isFetching: boolean) => ({type: 'TOGGLE_IS_FETCHING', isFetching}as const),
	toggleFollowingProgress: (isFetching: boolean, userId: number) => ({type: 'TOGGLE_IS_FOLLOWING_IN_PROGRESS', isFetching, userId}as const)
}

// thunk



export const getUsersThunkCreator = (currentPage: number, pageSize: number) => async (dispatch: Dispatch<ActionsTypes>, getState: AppStateType) => {
	dispatch(actions.toggleIsFetching(true));
	let data = await usersAPI.getUsers(currentPage, pageSize);
	dispatch(actions.setCurrentPage(currentPage));
	dispatch(actions.toggleIsFetching(false));
	dispatch(actions.setTotalUsersCount(data.totalCount));
	// dispatch(actions.setCurrentPage(pageNumber));
	dispatch(actions.setUsers(data.items));
};


// дублирующаяся логика для follow unFollow
const followOverall = async (dispatch: Dispatch<ActionsTypes>,
							 userId: number,
							 apiMethod: (userId: number) => Promise<APIResponseType>,
							 actionCreator: (userId: number) => ActionsTypes ) => {
	dispatch(actions.toggleFollowingProgress(true, userId));
	let res = await apiMethod(userId);
	if(res.resultCode === 0) {
		dispatch(actionCreator(userId));
	}
	debugger
	dispatch(actions.toggleFollowingProgress(false, userId));
}

export const follow = (userId: number): ThunkType => async (dispatch) => {
	await followOverall(dispatch, userId, usersAPI.follow.bind(userId), actions.followSuccess);
};

export const unFollow = (userId: number): ThunkType => async (dispatch) => {
	await followOverall(dispatch, userId, usersAPI.unFollow.bind(userId), actions.unfollowSuccess);
};

export type initialStateType = typeof initialState;
type ActionsTypes = InferActionsTypes<typeof actions>;
type ThunkType = BaseThunkType<ActionsTypes>