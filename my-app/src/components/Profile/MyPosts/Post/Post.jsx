import React from 'react';
import s from './Post.module.css';
import image from '../../../../img/avatar.png';

const Post = (props) => {
	return (
		<div className={s.post}>
			<img src={image} alt="" />
			{props.message}
		</div>
	);
};

export default Post;