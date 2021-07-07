import React from 'react';
import Users from './Users';
import {connect} from 'react-redux';
import {follow, unFollow, setCurrentPage, getUsersThunkCreator} from '../../redux/users-reducer.ts';
import Preloader from '../../common/Preloader/Preloader';
import {withAuthRedirect} from '../../hoc/withAuthRedirect';
import {compose} from 'redux';
import {getUsers, getPageSize, getTotalUsersCount, getCurrentPage, getIsFetching, getFollowingInProgress} from '../../redux/users-selectors';


class UsersContainer extends React.Component {
	
	componentDidMount() {
		
		this.props.getUsersThunkCreator(this.props.currentPage, this.props.pageSize);
		
	}
	
	onPageChange = (pageNumber) => {
		
		this.props.getUsersThunkCreator(pageNumber, this.props.pageSize);
		
		this.props.setCurrentPage(pageNumber);
		
	}
	
	render() {
		
		console.log('Render users');
		
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
				   followingInProgress={this.props.followingInProgress}
				   portionSize={this.props.portionSize}/>
		</div>);
	}
};

const mapStateToProps = (state) => ({
		users: getUsers(state),
		pageSize: getPageSize(state),
		totalUsersCount: getTotalUsersCount(state),
		currentPage: getCurrentPage(state),
		isFetching: getIsFetching(state),
		followingInProgress: getFollowingInProgress(state),
		portionSize: state.usersPage.portionSize
});

export default compose(
	connect(mapStateToProps, {follow, unFollow, setCurrentPage, getUsersThunkCreator}),
	withAuthRedirect
)(UsersContainer);