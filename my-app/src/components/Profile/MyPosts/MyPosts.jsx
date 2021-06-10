import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';

const MyPosts = (props) => {
	
	let postsElements = props.posts.map(p => <Post key={p.id} message={p.message} />);
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