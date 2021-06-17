import React from 'react';
import s from './ProfileInfo.module.css';
import Preloader from '../../../common/Preloader/Preloader';

const ProfileInfo = (props) => {
	
	if(!props.profile) {
		return <Preloader />
	}
	
	return (
		<div className={s.profileInfo}>
			<div>
				<img src={props.profile.photos.large} alt="" />
			</div>
		</div>
	);
};

export default ProfileInfo;