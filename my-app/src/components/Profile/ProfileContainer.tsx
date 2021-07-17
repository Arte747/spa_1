import React from 'react';
import Profile from './Profile';
import {connect} from 'react-redux';
import {getUserProfile, getUserStatus, updateStatus, savePhoto, saveProfile} from '../../redux/profile-reducer';
import {withRouter, RouteComponentProps} from 'react-router-dom';
import {compose} from 'redux';
import {AppStateType} from '../../redux/redux-store';
import {ProfileType} from '../../types/types';

type MapPropsType = ReturnType<typeof mapStateToProps>


type DispatchPropsType = {
	getUserProfile: (userId: number) => void
	getUserStatus: (userId: number) => void
	updateStatus: (status: string) => void
	savePhoto: (file: File) => void
	saveProfile: (profile: ProfileType) => Promise<any>
}

type PathParamsType = {
	userId: string
}

type PropsType = MapPropsType & DispatchPropsType & RouteComponentProps<PathParamsType>

class ProfileContainer extends React.Component<PropsType> {
	refreshProfile() {
		let userId: number | null = +this.props.match.params.userId;
		if(!userId){
			userId = this.props.autorizedUserId;
			if(!userId) this.props.history.push("/login ");
		}
		
		if(!userId) {
			throw new Error ("Id should exists");
		} else {
			this.props.getUserProfile(userId);
			this.props.getUserStatus(userId);
		}
	}
	
	componentDidMount() {
		console.log(this.props.match.params.userId);
		this.refreshProfile();
	}
	// если userId из текущих props не равен userId из предыдущих
	componentDidUpdate(prevProps: PropsType, prevState: PropsType) {
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

const mapStateToProps = (state: AppStateType) => ({
	profile: state.profilePage.profile,
	status: state.profilePage.status,
	autorizedUserId: state.auth.autorizedUserId,
	isAuth: state.auth.isAuth
});

export default compose<React.ComponentType>(
	connect(mapStateToProps, {getUserProfile, getUserStatus, updateStatus, savePhoto, saveProfile}),
	withRouter,
	// withAuthRedirect
)(ProfileContainer);