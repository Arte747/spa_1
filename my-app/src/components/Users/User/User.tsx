import React from 'react';
import s from './User.module.css';
import image from '../../../img/avatar.png';
import {NavLink} from 'react-router-dom';
import {UserType} from '../../../types/types';


type PropsType = {
	user: UserType
	followingInProgress: Array<number>
	unFollow: (userId: number) => void
	follow: (userId: number) => void
}

const User: React.FC<PropsType> = (props) => {
	
	const onFollow = (userId: number) => {
		props.follow(userId);
	}
	
	const onUnFollow = (userId: number) => {
		props.unFollow(userId);
	}
	
	return (
		<div className={s.user} key={props.user.id}>
			<NavLink to={'/profile/' + props.user.id}>
				
					<img className={s.ava} src={props.user.photos.small ? props.user.photos.small : image} alt="ava" />
				
			</NavLink>
				
			{props.user.followed
				? <button disabled={props.followingInProgress.some(id=>id === props.user.id)} onClick={()=>{onUnFollow(props.user.id)}}>Unfollow</button>
				: <button disabled={props.followingInProgress.some(id=>id === props.user.id)} onClick={()=>{onFollow(props.user.id)}}>Follow</button>}
			<div>{props.user.name}</div>
			<div>{props.user.status}</div>
		</div>
	);
};

export default User;