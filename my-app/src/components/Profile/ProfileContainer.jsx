import React from 'react';
import Profile from './Profile';
import {connect} from 'react-redux';
import {getUserProfile} from '../../redux/profile-reducer';
import {withRouter, Redirect} from 'react-router-dom';
import {usersAPI} from '../../api/api';
import {withAuthRedirect} from '../../hoc/withAuthRedirect';

class ProfileContainer extends React.Component {
	
	componentDidMount() {
		let userId = this.props.match.params.userId;
		if(!userId) userId = 13699;
		
		this.props.getUserProfile(userId);
		
	}
	
	render() {
		
		return (
			<Profile {...this.props} profile={this.props.profile} />
		)
	}
};

let AuthRedirectComponent = withAuthRedirect(ProfileContainer);

const mapStateToProps = (state) => ({
	profile: state.profilePage.profile
});

let WithURLDataContainerComponent = withRouter(AuthRedirectComponent);

export default connect(mapStateToProps, {getUserProfile})(WithURLDataContainerComponent);