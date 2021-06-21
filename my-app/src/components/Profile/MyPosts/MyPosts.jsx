import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';
import {reduxForm, Field} from 'redux-form';

const MyPosts = (props) => {
	
	let newPostElement = React.createRef();
	
	let postsElements = props.posts.map(p => <Post key={p.id} message={p.message} />);
	
	const postForm = (props) => {
		return (
			<form onSubmit={props.handleSubmit}>
				<div>
					<Field component={'input'} name={"newPost"} />
				</div>
				<div>
					<button>Добавить пост</button>
				</div>
			</form>
		);
	};
	
	const ReduxPostForm = reduxForm({form: 'postForm'})(postForm);
	
	const onSubmit = (values) => {
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