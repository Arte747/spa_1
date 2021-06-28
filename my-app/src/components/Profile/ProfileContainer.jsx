import React from 'react';
import Profile from './Profile';
import {connect} from 'react-redux';
import {getUserProfile, getUserStatus, updateStatus, savePhoto, saveProfile} from '../../redux/profile-reducer';
import {withRouter} from 'react-router-dom';
import {compose} from 'redux';

class ProfileContainer extends React.Component {
	refreshProfile() {
		let userId = this.props.match.params.userId;
		if(!userId){
			userId = this.props.autorizedUserId;
			if(!userId) this.props.history.push("/login ");
		}
		
		this.props.getUserProfile(userId);
		this.props.getUserStatus(userId);
	}
	
	componentDidMount() {
		console.log(this.props.match.params.userId);
		this.refreshProfile();
	}
	// если userId из текущих props не равен userId из предыдущих
	componentDidUpdate(prevProps, prevState, snapShot) {
		if(this.props.match.params.userId != prevProps.match.params.userId) {
			this.refreshProfile();
		};
	};
	
	render() {
		
		return (
			<Profile {...this.props}
					isOwner={!this.props.match.params.userId}
					profile={this.props.profile}
					status={this.props.status}
					updateStatus={this.props.updateStatus}
					savePhoto={this.props.savePhoto}
					saveProfile={this.props.saveProfile}/>
		)
	}
};

const mapStateToProps = (state) => {
	
	return {
	profile: state.profilePage.profile,
	status: state.profilePage.status,
	autorizedUserId: state.auth.autorizedUserId,
	isAuth: state.auth.isAuth
}
};

export default compose(
	connect(mapStateToProps, {getUserProfile, getUserStatus, updateStatus, savePhoto, saveProfile}),
	withRouter,
	// withAuthRedirect
)(ProfileContainer);