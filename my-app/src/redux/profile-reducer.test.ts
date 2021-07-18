import profileRecer, {addPostAC, deletePost, actions} from './profile-reducer';

const state = {
		posts: [
				{id: 1, message: 'Hello world!'},
				{id: 2, message: 'Haw are you?'},
				{id: 3, message: 'Yo'},
				{id: 4, message: '!!!!!!!'},
				{id: 5, message: 'Hi'}
			]
	};

test('Length of posts should be incremented', () => {
	// startData
	let action = actions.addPostAC("Hello world!");
	
	// action
	let newState = profileRecer(state, action);
	
	// expectation
	expect(newState.posts.length).toBe(6);
});

test('message should be correct "Hello world!"', () => {
	// startData
	let action = actions.addPostAC("Hello world!");
	
	
	
	// action
	
	let newState = profileRecer(state, action);
	
	// expectation
	expect(newState.posts[5].message).toBe("Hello world!");
});

test('after deleted length of messages should be decrement', () => {
	// startData
	let action = actions.deletePost(1);
	
	
	
	// action
	
	let newState = profileRecer(state, action);
	
	// expectation
	expect(newState.posts.length).toBe(4);
});