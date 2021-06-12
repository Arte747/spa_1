import React from 'react';
import MyPosts from './MyPosts';
import {updateNewPostTextAC, addPostAC} from '../../../redux/profile-reducer';

const MyPostsContainer = (props) => {
	
	let onPostChange = (text) => {
		props.dispatch(updateNewPostTextAC(text));
	};
	
	let addPost = () => {
		props.dispatch(addPostAC());
	};
	
	return (
		<MyPosts posts={props.posts}
				 newPostText={props.newPostText}
				 onPostChange={onPostChange}
				 addPost={addPost}/>
	);
};

export default MyPostsContainer;