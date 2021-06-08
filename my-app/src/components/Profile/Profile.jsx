import React from 'react';
import s from './Profile.module.css';
import Post from './Post/Post';

const Profile = (props) => {
	return (
		<div className={s.profile}>
			main content
			<div>
				ava + description
			</div>
			<div>
				posts
				<div>
					newpost
					<div><input type="text" name="" id="" /></div>
					<div><button>Добавить пост</button></div>
					<div className={s.postList}>
						<Post message={'Hello world!'} />
						<Post message={'Haw are you?'} />
						<Post message={'Yo'} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Profile;