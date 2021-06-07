import React from 'react';
import s from './Profile.module.css';

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
					<div>
						<div>Post 1</div>
						<div>Post 2</div>
						<div>Post 3</div>
						<div>Post 4</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Profile;