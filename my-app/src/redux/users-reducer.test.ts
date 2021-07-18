import usersReducer, {initialStateType, actions} from './users-reducer';

let state: initialStateType;

beforeEach(() => {
	state = {
		users: [
			{id: 0, name: 'Alex 0', followed: false, photos: {small: null, large: null}, status: 'Status 0'},
			{id: 1, name: 'Alex 1', followed: false, photos: {small: null, large: null}, status: 'Status 1'},
			{id: 2, name: 'Alex 2', followed: true, photos: {small: null, large: null}, status: 'Status 2'},
			{id: 3, name: 'Alex 3', followed: true, photos: {small: null, large: null}, status: 'Status 3'}
		],
		pageSize:  10,
		totalUsersCount: 0,
		currentPage: 1,
		isFetching: false,
		followingInProgress: [],
		portionSize: 10
	}
});
 

test("Follow success", () => {
	
	let newState = usersReducer(state, actions.followSuccess(1));
	
	expect(newState.users[0].followed).toBeFalsy();	
	expect(newState.users[1].followed).toBeTruthy();	
});

test("Unfollow success", () => {
	
	let newState = usersReducer(state, actions.unfollowSuccess(3));
	
	expect(newState.users[2].followed).toBeTruthy();	
	expect(newState.users[3].followed).toBeFalsy();	
});