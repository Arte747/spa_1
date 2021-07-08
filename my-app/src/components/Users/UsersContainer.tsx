import React from 'react';
import Users from './Users';
import {connect} from 'react-redux';
import {follow, unFollow, setCurrentPage, getUsersThunkCreator} from '../../redux/users-reducer';
import Preloader from '../../common/Preloader/Preloader';
import {withAuthRedirect} from '../../hoc/withAuthRedirect';
import {compose} from 'redux';
import {getUsers, getPageSize, getTotalUsersCount, getCurrentPage, getIsFetching, getFollowingInProgress} from '../../redux/users-selectors';
import {UserType} from '../../types/types';
import {AppStateType} from '../../redux/redux-store';

type MapStatePropsType = {
	users: Array<UserType>
	pageSize: number
	totalUsersCount: number
	currentPage: number
	isFetching: boolean
	followingInProgress: Array<number>
	portionSize: number
}

type MapDispatchPropsType = {
	follow:(userId: number) => void
	unFollow: (userId: number) => void
	setCurrentPage: (pageNumber: number) => void
	getUsersThunkCreator: (currentPage: number, pageSize: number) => void
}

type OwnPropsType = {
	pageTitle: string
}

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType


class UsersContainer extends React.Component<PropsType> {
	
	componentDidMount() {
		
		this.props.getUsersThunkCreator(this.props.currentPage, this.props.pageSize);
		
	}
	
	onPageChange = (pageNumber: number) => {
		
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
				   // @ts-ignore
				   isFetching={this.props.isFetching}
				   follow={this.props.follow}
				   unFollow={this.props.unFollow}
				   followingInProgress={this.props.followingInProgress}
				   portionSize={this.props.portionSize}/>
		</div>);
	}
};

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
		users: getUsers(state),
		pageSize: getPageSize(state),
		totalUsersCount: getTotalUsersCount(state),
		currentPage: getCurrentPage(state),
		isFetching: getIsFetching(state),
		followingInProgress: getFollowingInProgress(state),
		portionSize: state.usersPage.portionSize
});

export default compose(
	connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(mapStateToProps, {follow, unFollow, setCurrentPage, getUsersThunkCreator}),
	withAuthRedirect
)(UsersContainer);