import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';
import {reduxForm, Field} from 'redux-form';
import {requireField, maxLengthCreator} from '../../../utils/validators/validators';
import {Textarea, createField, GetStringKeys} from '../../../common/FormsControls/FormsControls';
import ReduxPostForm, {AddPostFormValuesType} from './PostForm/PostForm';
import {PostType} from '../../../types/types';

export type MapPropsType = {
	posts: Array<PostType>
}

export type DispatchPropsType = {
	addPost: (newPost: string) => void
}

const MyPosts: React.FC<MapPropsType & DispatchPropsType> = (props) => {
	
	// let newPostElement = React.createRef();
	
	let postsElements = props.posts.map(p => <Post key={p.id} message={p.message} />);
	
	const onSubmit = (values: AddPostFormValuesType) => {
		let newPost = values.newPost;
		props.addPost(newPost);
	};
	
	return (
		<div className={s.myPosts}>
			<div className={s.newPost}>
				<ReduxPostForm onSubmit={onSubmit} />
			</div>
			
			<div className={s.postList}>
				{postsElements}
			</div>
		</div>
	);
};

export default MyPosts;