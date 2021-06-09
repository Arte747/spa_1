import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';

const MyPosts = (props) => {
	
	let postsData = [
		{id: 1, message: 'Hello world!'},
		{id: 2, message: 'Haw are you?'},
		{id: 3, message: 'Yo'},
		{id: 4, message: '!!!!!!!'},
	];
	
	
	let postsElements = postsData.map(p => <Post key={p.id} message={p.message} />);
	return (
		<div className={s.myPosts}>
			<div className={s.newPost}>
				newpost
				<div><input type="text" name="" id="" /></div>
				<div><button>Добавить пост</button></div>
			</div>
			
			<div className={s.postList}>
				{postsElements}
			</div>
		</div>
	);
};

export default MyPosts;