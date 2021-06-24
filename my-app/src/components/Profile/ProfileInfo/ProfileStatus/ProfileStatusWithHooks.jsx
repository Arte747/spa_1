import React, {useState} from 'react';
import s from './ProfileStatus.module.css';

const ProfileStatusWithHooks = (props) => {
	console.log(props);
	let [editMode, setEditMode] = useState(false);
	let [status, setStatus] = useState(props.status);
	
	const activateEditMode = () => {
		setEditMode(true);
	};
	
	const deactivateEditMode = () => {
		setEditMode(false);
		props.updateStatus(status);
	};
	
	const onStatusChange = (e) => {
		setStatus(e.currentTarget.value);
	};
	
	return (
		<div className={s.profileStatus}>
			{console.log('return')}
			{editMode ? <input onChange={onStatusChange} value={status} autoFocus={true} onBlur={deactivateEditMode} type="text" /> : <span onDoubleClick={activateEditMode}>{props.status}</span>}
			
		</div>
	);
};

export default ProfileStatusWithHooks;