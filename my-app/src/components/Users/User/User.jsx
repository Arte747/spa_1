import React from 'react';
import s from './User.module.css';
import image from '../../../img/avatar.png';
import {NavLink} from 'react-router-dom';

const User = (props) => {
	
	const onFollow = (userId) => {
		props.follow(userId);
	}
	
	const onUnFollow = (userId) => {
		props.unFollow(userId);
	}
	
	return (
		<div className={s.user} key={props.id}>
			<NavLink to={'/profile/' + props.id}>
				
					<img className={s.ava} src={props.photo ? props.photo : image} alt="ava" />
				
			</NavLink>
				
			{props.followed
				? <button disabled={props.followingInProgress.some(id=>id === props.id)} onClick={()=>{onUnFollow(props.id)}}>Unfollow</button>
				: <button disabled={props.followingInProgress.some(id=>id === props.id)} onClick={()=>{onFollow(props.id)}}>Follow</button>}
			<div>{props.name}</div>
			<div>{props.status}</div>
		</div>
	);
};

export default User;