import React from 'react';
import s from './Profile.module.css';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import MyPosts from './MyPosts/MyPosts';

const Profile = (props) => {
	return (
		<div className={s.profile}>
			main content
			<ProfileInfo />
			<MyPosts posts={props.profilePage.posts}
					 newPostText={props.profilePage.newPostText}
					 dispatch={props.dispatch} />
		</div>
	);
};

export default Profile;