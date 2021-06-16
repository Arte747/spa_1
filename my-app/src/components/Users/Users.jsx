import React from 'react';
import s from './Users.module.css';
import image from '../../img/avatar.png';

const Users = (props) => {
	
	let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
	
	let pages = [];
	
	for(let i = 1;i <= pagesCount;i++) {
		pages.push(i);
	}
	
	return (
		
		<div className={s.users}>
				
			<div>
				{pages.map(p => <button onClick={()=>{props.onPageChange(p)}} className={props.currentPage === p ? s.active : undefined} key={p}>{p}</button>)}
			</div>
			
			{
				props.users.map(u => <div className={s.user} key={u.id}>
					<div className={s.ava}>{u.photos.small
						? <img src={u.photos.small} alt="ava" />
						: <img src={image} alt="ava" />}</div>
					{u.followed
						? <button onClick={() => {props.unfollowed(u.id)}}>Unfollow</button>
						: <button onClick={() => {props.followed(u.id)}}>Follow</button>}
					<div>{u.name}</div>
					<div>{u.status}</div>
				</div>)
			}
		</div>
		
	);
};

export default Users;