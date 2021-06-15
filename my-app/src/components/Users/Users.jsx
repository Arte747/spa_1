import React from 'react';
import s from './Users.module.css';
import image from '../../img/avatar.png';
import * as axios from 'axios';

class Users extends React.Component {
	
	constructor(props) {
		super(props);
		axios.get('https://social-network.samuraijs.com/api/1.0/users')
			.then(response => {
				this.props.setUsers(response.data.items);
			});
	};
	
	follow = (userId) => {
		this.props.followed(userId);
	}
	
	unFollow = (userId) => {
		this.props.unfollowed(userId);
	}
	
	render() {
		return (
			<div className={s.users}>
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