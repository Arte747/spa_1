import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';

const MyPosts = (props) => {
	return (
		<div className={s.myPosts}>
			<div className={s.newPost}>
				newpost
				<div><input type="text" name="" id="" /></div>
				<div><button>Добавить пост</button></div>
			</div>
			
			<div className={s.postList}>
				<Post message={'Hello world!'} />
				<Post message={'Haw are you?'} />
				<Post message={'Yo'} />
			</div>
		</div>
	);
};

export default MyPosts;