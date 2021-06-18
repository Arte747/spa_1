import React from 'react';
import s from './Users.module.css';
import image from '../../img/avatar.png';
import {NavLink} from 'react-router-dom';
import * as axios from 'axios';
import {usersAPI} from '../../api/api';

const Users = (props) => {
	
	let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
	
	let pages = [];
	
	for(let i = 1;i <= pagesCount;i++) {
		pages.push(i);
	}
	
	const onFollow = (userId) => {
		props.toggleFollowingProgress(true, userId);
		usersAPI.follow(userId).then(response => {
			if(response.data.resultCode === 0) {
				props.follow(userId);
			}
			props.toggleFollowingProgress(false, userId);
		});
	}
	
	const onUnfollow = (userId) => {
		props.toggleFollowingProgress(true, userId);
		usersAPI.unFollow(userId).then(response => {
			if(response.data.resultCode === 0) {
				props.unfollow(userId);
			}
			props.toggleFollowingProgress(false, userId);
		});
	}
	
	return (
		
		<div className={s.users}>
				
			<div>
				{pages.map(p => <button onClick={()=>{props.onPageChange(p)}} className={props.currentPage === p ? s.active : undefined} key={p}>{p}</button>)}
			</div>
			
			{
				props.users.map(u => <div className={s.user} key={u.id}>
					<NavLink to={'/profile/' + u.id}>
						
							<img className={s.ava} src={u.photos.small ? u.photos.small : image} alt="ava" />
						
					</NavLink>
						
					{u.followed
						? <button disabled={props.followingInProgress.some(id=>id === u.id)} onClick={()=>{onUnfollow(u.id)}}>Unfollow</button>
						: <button disabled={props.followingInProgress.some(id=>id === u.id)} onClick={()=>{onFollow(u.id)}}>Follow</button>}
					<div>{u.name}</div>
					<div>{u.status}</div>
				</div>)
			}
		</div>
		
	);
};

export default Users;