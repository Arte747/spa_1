import React from 'react';
import s from './Post.module.css';
import image from '../../../../img/avatar.png';
// import {PostType} from '../../../../types/types';

type PropsType = {
	message: string
}

const Post: React.FC<PropsType> = (props) => {
	return (
		<div className={s.post}>
			<img src={image} alt="" />
			{props.message}
		</div>
	);
};

export default Post;