import Users from './Users';
import {connect} from 'react-redux';
import {setUsersAC, followAC, unfollowAC, setCurrentPageAC, setTotalUsersCountAC} from '../../redux/users-reducer.js';

const mapStateToProps = (state) => ({
	users: state.usersPage.users,
	pageSize: state.usersPage.pageSize,
	totalUsersCount: state.usersPage.totalUsersCount,
	currentPage: state.usersPage.currentPage
});

const mapDispatchToProps = (dispatch) => ({
	setUsers(users) {
		dispatch(setUsersAC(users));
	},
	followed(userId) {
		dispatch(followAC(userId))
	},
	unfollowed(userId) {
		dispatch(unfollowAC(userId));
	},
	setCurrentPage(pageNumber) {
		dispatch(setCurrentPageAC(pageNumber));
	},
	setTotalUsersCount(usersCount) {
		dispatch(setTotalUsersCountAC(usersCount));
	}
});

let UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users);

export default UsersContainer;