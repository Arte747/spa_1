import React from 'react';
import s from './Users.module.css';
// import Paginator from './Paginator/Paginator';
import Paginator from './Paginator/Paginator';
import User from './User/User';
import {UserType} from '../../types/types';


type PropsType = {
	currentPage: number
	totalUsersCount: number
	pageSize: number
	onPageChange: (pageNumber: number) => void
	users: Array<UserType>
	portionSize: number
	followingInProgress: Array<number>
	follow: (id: number) => void
	unFollow: (id: number) => void
}

const Users: React.FC<PropsType> = ({currentPage, totalUsersCount, pageSize, onPageChange, users,portionSize, ...props}) => {
	
	return (
		
		<div className={s.users}>
			
			<Paginator currentPage={currentPage}
					   onPageChange={onPageChange}
					   totalUsersCount={totalUsersCount}
					   pageSize={pageSize}
					   portionSize={portionSize}
					   />
				
			
			{
				users.map(u => <User user={u}
									 followingInProgress={props.followingInProgress}
									 follow={props.follow}
									 unFollow={props.unFollow}/>)
			}
		</div>
		
	);
};

export default Users;