import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';
import {reduxForm, Field} from 'redux-form';
import {requireField, maxLengthCreator} from '../../../utils/validators/validators';
import {Textarea} from '../../../common/FormsControls/FormsControls';

const MyPosts = (props) => {
	
	let newPostElement = React.createRef();
	
	let postsElements = props.posts.map(p => <Post key={p.id} message={p.message} />);
	
	let maxLength = maxLengthCreator(10);
	
	const postForm = (props) => {
		return (
			<form onSubmit={props.handleSubmit}>
				<div>
					<Field component={Textarea} name={"newPost"} validate={[requireField, maxLength]} />
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