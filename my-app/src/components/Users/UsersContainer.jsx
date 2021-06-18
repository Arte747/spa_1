import React from 'react';
import * as axios from 'axios';
import Users from './Users';
import {connect} from 'react-redux';
import {setUsers, follow, unfollow, setCurrentPage, setTotalUsersCount, toggleIsFetching} from '../../redux/users-reducer.js';
import Preloader from '../../common/Preloader/Preloader';
import {usersAPI} from '../../api/api';


class UsersContainer extends React.Component {
	componentDidMount() {
		this.props.toggleIsFetching(true);
		
		usersAPI.getUsers(this.props.currentPage, this.props.pageSize).then(data => {
			this.props.toggleIsFetching(false);
			this.props.setTotalUsersCount(data.totalCount);
			this.props.setUsers(data.items);
		});
	}
	
	onPageChange = (pageNumber) => {
		this.props.setCurrentPage(pageNumber);
		this.props.toggleIsFetching(true);
		
		usersAPI.getUsers(pageNumber, this.props.pageSize).then(data => {
			this.props.toggleIsFetching(false);
			this.props.setTotalUsersCount(data.totalCount);
			this.props.setUsers(data.items);
		});
	}
	
	render() {
		return (<div>
			{this.props.isFetching ? <Preloader /> : null}
			<Users totalUsersCount={this.props.totalUsersCount}
				   pageSize={this.props.pageSize}
				   currentPage={this.props.currentPage}
				   onPageChange={this.onPageChange}
				   users={this.props.users}
				   isFetching={this.props.isFetching}
				   follow={this.props.follow}
				   unfollow={this.props.unfollow}/>
			
		</div>);
	}
};


// вызывается при каждом изменении в state
// при изменении только этих параметров
const mapStateToProps = (state) => ({
	users: state.usersPage.users,
	pageSize: state.usersPage.pageSize,
	totalUsersCount: state.usersPage.totalUsersCount,
	currentPage: state.usersPage.currentPage,
	isFetching: state.usersPage.isFetching
});



export default connect(mapStateToProps, {
	setUsers,
	follow,
	unfollow,
	setCurrentPage,
	setTotalUsersCount,
	toggleIsFetching})(UsersContainer);