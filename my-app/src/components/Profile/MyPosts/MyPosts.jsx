import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';

const MyPosts = (props) => {
	
	let newPostElement = React.createRef();
	
	let onPostChange = (e) => {
		let text = e.target.value;
		props.onPostChange(text);
	};
	
	let addPost = () => {
		props.addPost();
	};
	
	let postsElements = props.posts.map(p => <Post key={p.id} message={p.message} />);
	
	return (
		<div className={s.myPosts}>
			{console.log('render')}
			<div className={s.newPost}>
				newpost
				<div><textarea onChange={onPostChange} ref={newPostElement} value={props.newPostText}></textarea></div>
				<div>
					<button onClick={addPost}>Добавить пост</button>
				</div>
			</div>
			
			<div className={s.postList}>
				{postsElements}
			</div>
		</div>
	);
};

export default MyPosts;