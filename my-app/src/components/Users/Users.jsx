import React from 'react';
import s from './Users.module.css';
import image from '../../img/avatar.png';

const Users = (props) => {
	
	if(props.users.length === 0) {
		props.setUsers([
			{id: 1, followed: false, fullName: 'Dmitrij', status: 'Im boss', location: {country: 'Russia', city: 'Saint-Petersberg'}},
			{id: 2, followed: true, fullName: 'Nikolay', status: 'Im boss', location: {country: 'Russia', city: 'Saint-Petersberg'}},
			{id: 3, followed: false, fullName: 'Andrew', status: 'Im boss', location: {country: 'Russia', city: 'Saint-Petersberg'}},
			{id: 4, followed: false, fullName: 'Stive', status: 'Im boss', location: {country: 'Russia', city: 'Saint-Petersberg'}},
			{id: 5, followed: false, fullName: 'Sveta', status: 'Im boss', location: {country: 'Russia', city: 'Saint-Petersberg'}}
		]);
	}
	
	const follow = (userId) => {
		// console.log(userId);
		props.followed(userId);
	}
	
	const unFollow = (userId) => {
		props.unfollowed(userId);
	}
	
	return (
		<div className={s.users}>
			{
				props.users.map(u => <div className={s.user} key={u.id}>
					<div className={s.ava}><img src={image} alt="ava" /></div>
					{u.followed
						? <button onClick={() => {unFollow(u.id)}}>Unfollow</button>
						: <button onClick={() => {follow(u.id)}}>Follow</button>}
					<div>{u.fullName}</div>
					<div>{u.status}</div>
				</div>)
			}
		</div>
	);
};

export default Users;