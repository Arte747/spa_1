import React from 'react';
import Profile from './Profile';
import {connect} from 'react-redux';
import {getUserProfile} from '../../redux/profile-reducer';
import {withRouter, Redirect} from 'react-router-dom';
import {usersAPI} from '../../api/api';

class ProfileContainer extends React.Component {
	
	componentDidMount() {
		let userId = this.props.match.params.userId;
		if(!userId) userId = 13699;
		
		this.props.getUserProfile(userId);
		
	}
	
	render() {
		
		if(!this.props.isAuth) return <Redirect to={"/login"} />
		
		return (
			<Profile {...this.props} profile={this.props.profile} />
		)
	}
};

const mapStateToProps = (state) => ({
	profile: state.profilePage.profile,
	isAuth: state.auth.isAuth
});


let WithURLDataContainerComponent = withRouter(ProfileContainer);

export default connect(mapStateToProps, {getUserProfile})(WithURLDataContainerComponent);