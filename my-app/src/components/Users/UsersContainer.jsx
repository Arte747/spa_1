import React from 'react';
import Users from './Users';
import {connect} from 'react-redux';
import {follow, unFollow, setCurrentPage, getUsersThunkCreator} from '../../redux/users-reducer.js';
import Preloader from '../../common/Preloader/Preloader';
import {withAuthRedirect} from '../../hoc/withAuthRedirect';


class UsersContainer extends React.Component {
	componentDidMount() {
		
		this.props.getUsersThunkCreator(this.props.currentPage, this.props.pageSize);
		
	}
	
	onPageChange = (pageNumber) => {
		
		this.props.getUsersThunkCreator(pageNumber, this.props.pageSize);
		
		this.props.setCurrentPage(pageNumber);
		
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
				   unFollow={this.props.unFollow}
				   followingInProgress={this.props.followingInProgress}/>
			
		</div>);
	}
};

const withRedirect = withAuthRedirect(UsersContainer);


// вызывается при каждом изменении в state
// при изменении только этих параметров
const mapStateToProps = (state) => ({
	users: state.usersPage.users,
	pageSize: state.usersPage.pageSize,
	totalUsersCount: state.usersPage.totalUsersCount,
	currentPage: state.usersPage.currentPage,
	isFetching: state.usersPage.isFetching,
	followingInProgress: state.usersPage.followingInProgress
});

export default connect(mapStateToProps, {
	follow,
	unFollow,
	setCurrentPage,
	getUsersThunkCreator})(withRedirect);