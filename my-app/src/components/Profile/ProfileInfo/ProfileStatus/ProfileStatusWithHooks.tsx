import React, {useState, useEffect, ChangeEvent} from 'react';
import s from './ProfileStatus.module.css';

// useState, useEffect -> hooks

type PropsType = {
	status: string
	updateStatus: (status: string) => void
}

const ProfileStatusWithHooks: React.FC<PropsType> = (props) => {
	
	let [editMode, setEditMode] = useState(false);
	let [status, setStatus] = useState(props.status);
	
	// выполнится после отрисовки компонента
	// синхронизируем статус из useState данными из props
	// второй параметр это зависимости
	// если propsStatus будет не таким как раньше, запускается effect
	useEffect(() => {
		setStatus(props.status);
	}, [props.status]);
	
	const activateEditMode = () => {
		setEditMode(true);
	};
	
	const deactivateEditMode = () => {
		setEditMode(false);
		props.updateStatus(status);
	};
	
	const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
		setStatus(e.currentTarget.value);
	};
	
	return (
		<div className={s.profileStatus}>
			{editMode ? <input onChange={onStatusChange} value={status} autoFocus={true} onBlur={deactivateEditMode} type="text" /> : <span onDoubleClick={activateEditMode}>{props.status}</span>}
			
		</div>
	);
};

export default ProfileStatusWithHooks;