let state = {
	
	profilePage: {
		posts: [
			{id: 1, message: 'Hello world!'},
			{id: 2, message: 'Haw are you?'},
			{id: 3, message: 'Yo'},
			{id: 4, message: '!!!!!!!'},
			{id: 5, message: 'Hi'}
		],
		newPostText: ''
	},
	
	dialogsPage: {
		dialogs: [
			{id: 1, name: 'Dimuch'},
			{id: 2, name: 'Sveta'},
			{id: 3, name: 'Andrew'},
			{id: 4, name: 'Stive'},
			{id: 5, name: 'Alex'}
		],
		
		messages: [
			{id: 1, message: 'Hello'},
			{id: 2, message: 'Haw are you?'},
			{id: 3, message: '=)))'},
			{id: 4, message: 'Go!!!!!!'},
			{id: 5, message: 'Let go to the movi!'}
		]
	}
	
};

let rerenderEntireTree = (state) => {
	console.log('state was changed');
};

export const subscribe = (observer) => {
	rerenderEntireTree = observer;
}

window.state = state;

export const updateNewPostText = (text) => {
	state.profilePage.newPostText = text;
	rerenderEntireTree(state);
}

export const addPost = () => {
	let newPost = {
		id: 6,
		message: state.profilePage.newPostText
	}
	state.profilePage.posts.push(newPost);
	state.profilePage.newPostText = '';
	rerenderEntireTree(state);
};

export default state;