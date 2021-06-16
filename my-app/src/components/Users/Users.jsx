import React from 'react';
import s from './Users.module.css';
import image from '../../img/avatar.png';
import * as axios from 'axios';

class Users extends React.Component {
	
	
	componentDidMount() {
		axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
			.then(response => {
				this.props.setTotalUsersCount(response.data.totalCount);
				this.props.setUsers(response.data.items);
			});
	}
	
	onPageChange = (pageNumber) => {
		this.props.setCurrentPage(pageNumber);
		axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`)
			.then(response => {
				this.props.setTotalUsersCount(response.data.totalCount);
				this.props.setUsers(response.data.items);
			});
	}
	
	follow = (userId) => {
		this.props.followed(userId);
	}
	
	unFollow = (userId) => {
		this.props.unfollowed(userId);
	}
	
	render() {
		
		let pagesCount = Math.ceil(this.props.totalUsersCount / this.props.pageSize);
		
		let pages = [];
		
		for(let i = 1;i <= pagesCount;i++) {
			pages.push(i);
		}
		
		return (
			<div className={s.users}>
				
				<div>
					{pages.map(p => <button onClick={()=>{this.onPageChange(p)}} className={this.props.currentPage === p ? s.active : undefined} key={p}>{p}</button>)}
				</div>
				
				{
					this.props.users.map(u => <div className={s.user} key={u.id}>
						<div className={s.ava}>{u.photos.small
							? <img src={u.photos.small} alt="ava" />
							: <img src={image} alt="ava" />}</div>
						{u.followed
							? <button onClick={() => {this.unFollow(u.id)}}>Unfollow</button>
							: <button onClick={() => {this.follow(u.id)}}>Follow</button>}
						<div>{u.name}</div>
						<div>{u.status}</div>
					</div>)
				}
			</div>
		);
	};
};

export default Users;