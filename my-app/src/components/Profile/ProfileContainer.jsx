import React from 'react';
import Profile from './Profile';
import * as axios from 'axios';
import {connect} from 'react-redux';
import {setUserProfile} from '../../redux/profile-reducer';
import {withRouter} from 'react-router-dom';
import {usersAPI} from '../../api/api';

class ProfileContainer extends React.Component {
	
	componentDidMount() {
		let userId = this.props.match.params.userId;
		if(!userId) userId = 2;
		
		usersAPI.getUserProfile(userId).then(response => {
				this.props.setUserProfile(response.data);
			});
	}
	
	render() {
		return (
			<Profile {...this.props} profile={this.props.profile} />
		)
	}
};

const mapStateToProps = (state) => ({
	profile: state.profilePage.profile
});


let WithURLDataContainerComponent = withRouter(ProfileContainer);

export default connect(mapStateToProps, {setUserProfile})(WithURLDataContainerComponent);