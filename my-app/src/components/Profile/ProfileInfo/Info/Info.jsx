import React from 'react';
import s from './Info.module.css';
import ProfileStatusWithHooks from '../ProfileStatus/ProfileStatusWithHooks';

const Info = (props) => {
	
	const Contact = ({contactTitle, contactValue}) => {
		return (
			<div className={s.contact}>
				<b>{contactTitle} :</b> {contactValue}
			</div>
		);
	};
	
	return (
		<div className={s.info}>
			{props.isOwner ? <button onClick={props.onEditMode}>Редактировать</button> : null}
			<div>
				<b>Full name: </b>{props.profile.fullName}
			</div>
			
			<div>
				<b>Status: </b><ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus} />
			</div>
			<div>
				<b>Looking for a job:</b> {props.profile.lookingForAJob ? "yes" : "no"}
			</div>
			<div>
				<b>My professional skills: </b> {props.profile.lookingForAJobDescription}
			</div>
			<div>
				<b>About me: </b>{props.profile.aboutMe}
			</div>
			<div>
				<h3>Contacts: </h3>
				{Object.keys(props.profile.contacts).map(key => {
					return <Contact key={key} contactTitle={key} contactValue={props.profile.contacts[key]} />
				})}
			</div>
		</div>
	);
};

export default Info;