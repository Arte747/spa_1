import React from 'react';
import * as axios from 'axios';
import Users from './Users';
import {connect} from 'react-redux';
import {setUsers, follow, unfollow, setCurrentPage, setTotalUsersCount, toggleIsFetching} from '../../redux/users-reducer.js';
import Preloader from '../../common/Preloader/Preloader';


class UsersContainer extends React.Component {
	componentDidMount() {
		this.props.toggleIsFetching(true);
		axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
			.then(response => {
				this.props.toggleIsFetching(false);
				this.props.setTotalUsersCount(response.data.totalCount);
				this.props.setUsers(response.data.items);
			});
	}
	
	onPageChange = (pageNumber) => {
		this.props.setCurrentPage(pageNumber);
		this.props.toggleIsFetching(true);
		axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`)
			.then(response => {
				this.props.toggleIsFetching(false);
				this.props.setTotalUsersCount(response.data.totalCount);
				this.props.setUsers(response.data.items);
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
				   isFetching={this.props.isFetching}/>
			
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