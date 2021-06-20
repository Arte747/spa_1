import React from 'react';
import s from './ProfileStatus.module.css';

class ProfileStatus extends React.Component {
	
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
	
	deactivateMode() {
		this.setState({
			editMode: false
		});
		this.props.updateStatus(this.state.status);
	}
	
	onStatusChange = (e) => {
		this.setState({
			status: e.currentTarget.value
		});
	}
	
	componentDidUpdate(prevProps, prevState) {
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
				? <input onChange={this.onStatusChange} autoFocus={true} onBlur={this.deactivateMode.bind(this)} value={this.state.status} type="text" />
					: <span onDoubleClick={this.activateEdiMode.bind(this)}>{this.props.status ? this.props.status : '---------'}</span>}
			</div>
		);
	};
};

export default ProfileStatus;