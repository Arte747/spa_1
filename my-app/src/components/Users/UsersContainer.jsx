import Users from './Users';
import {connect} from 'react-redux';
import {setUsersAC, followAC, unfollowAC} from '../../redux/users-reducer.js';

const mapStateToProps = (state) => ({
	users: state.usersPage.users
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
	}
});

let UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users);

export default UsersContainer;