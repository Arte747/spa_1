import React, {ChangeEvent} from 'react';
import s from './ProfileStatus.module.css';

type PropsType = {
	status: string
	updateStatus: (newStatus: string) => void 
}

type StateType = {
	editMode: boolean
	status: string
}

class ProfileStatus extends React.Component<PropsType, StateType> {
	
	state = {
		editMode: false,
		status: this.props.status
	}
	// использовать стрелочную функцию для сохранения this
	activateEdiMode() {
		this.setState({
			editMode: true
		});
	}
	
	deactivateEditMode() {
		this.setState({
			editMode: false
		});
		this.props.updateStatus(this.state.status);
	}
	
	onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
		this.setState({
			status: e.currentTarget.value
		});
	}
	
	componentDidUpdate(prevProps: PropsType, prevState: StateType) {
		if(this.props.status !== prevProps.status) {
			this.setState({
				status: this.props.status
			});
		}
	}
	
	render() {
		return (
			<div className={s.profileStatus}>
				{this.state.editMode
				? <input onChange={this.onStatusChange} autoFocus={true} onBlur={this.deactivateEditMode.bind(this)} value={this.state.status} type="text" />
					: <span onDoubleClick={this.activateEdiMode.bind(this)}>{this.props.status ? this.props.status : '---------'}</span>}
			</div>
		);
	};
};

export default ProfileStatus;