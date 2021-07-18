import {follow, unFollow, actions} from './users-reducer';
import {APIResponseType, ResultCode} from '../api/api';
import {usersAPI} from '../api/api';

jest.mock('../api/api');

const userAPIMock = usersAPI as jest.Mocked<typeof usersAPI>

const dispatchMock = jest.fn();
const getStateMock = jest.fn();

beforeEach(() => {
	dispatchMock.mockClear();
	getStateMock.mockClear();
	userAPIMock.follow.mockClear();
	userAPIMock.unFollow.mockClear();
});

const result: APIResponseType = {
	resultCode: ResultCode.Success,
	messages: [],
	data: {}
}

test("follow thunk", async () => {
	
	usersAPI.follow.mockReturnValue(Promise.resolve(result));
	
	const thunk = follow(1);
	
	await thunk(dispatchMock, getStateMock, {});
	
	expect(dispatchMock).toBeCalledTimes(3);
	// определеныый вызов был вызван с каким то определеныым объектом
	expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleFollowingProgress(true, 1));
	expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.followSuccess(1));
	expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleFollowingProgress(false, 1));
	
});

test("unfollow thunk", async () => {
	
	usersAPI.unFollow.mockReturnValue(Promise.resolve(result));
	
	const thunk = unFollow(1);
	
	
	
	await thunk(dispatchMock, getStateMock, {});
	
	expect(dispatchMock).toBeCalledTimes(3);
	// определеныый вызов был вызван с каким то определеныым объектом
	expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleFollowingProgress(true, 1));
	expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.unfollowSuccess(1));
	expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleFollowingProgress(false, 1));
	
});