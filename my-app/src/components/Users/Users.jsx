import React from 'react';
import s from './Users.module.css';
import Paginator from './Paginator/Paginator';
import User from './User/User';

const Users = (props) => {
	
	
	
	return (
		
		<div className={s.users}>
			
			<Paginator currentPage={props.currentPage}
					   onPageChange={props.onPageChange}
					   totalUsersCount={props.totalUsersCount}
					   pageSize={props.pageSize}/>
				
			
			{
				props.users.map(u => <User id={u.id}
										   photo={u.photos.small}
										   followed={u.followed}
										   followingInProgress={props.followingInProgress}
										   name={u.name}
										   status={u.status}
										   follow={props.follow}
										   unFollow={props.unFollow}/>)
			}
		</div>
		
	);
};

export default Users;