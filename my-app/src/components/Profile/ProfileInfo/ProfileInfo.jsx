import React from 'react';
import s from './ProfileInfo.module.css';
import Preloader from '../../../common/Preloader/Preloader';
import ProfileStatus from './ProfileStatus/ProfileStatus';

const ProfileInfo = (props) => {
	
	if(!props.profile) {
		return <Preloader />
	}
	
	return (
		<div className={s.profileInfo}>
			<div>
				<img src={props.profile.photos.large} alt="" />
			</div>
			<div>
				{props.profile.fullName}
			</div>
			<div>
				Обо мне: {props.profile.aboutMe}
			</div>
			<div>
				<ProfileStatus status={props.status} updateStatus={props.updateStatus} />
			</div>
		</div>
	);
};

export default ProfileInfo;