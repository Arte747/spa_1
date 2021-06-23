import React from 'react';
import s from './Login.module.css';
import {reduxForm, Field} from 'redux-form';
import {requireField, maxLengthCreator} from '../../utils/validators/validators';
import {Input} from '../../common/FormsControls/FormsControls';
import {connect} from 'react-redux';
import {login} from '../../redux/auth-reducer';
import {Redirect} from 'react-router-dom';

const Login = (props) => {
	
	let maxLength = maxLengthCreator(30);
	
	const LoginForm = (props) => {
		return (
			// у любой формы есть событие onsubmit
			// ему доверяется обработка формы
			// при клике на кнопку не происходит перезагрузка страницы
			<form onSubmit={props.handleSubmit}>
				<div>
					<Field component={Input} name={"email"} validate={[requireField, maxLength]} placeholder={"Login"} />
				</div>
				<div>
					<Field component={Input} type="password" name={"password"} validate={[requireField, maxLength]} placeholder={"Password"} />
				</div>
				<div>
					<Field component={'input'} name={"rememberMe"} type={"checkbox"} />
				</div>
				{props.error ? <div className={s.orerallError}>{props.error}</div> : null}
				<div>
					<button>Login</button>
				</div>
			</form>
		);
	};
	
	const LoginReduxForm = reduxForm({form: 'loginForm'})(LoginForm);
	
	// срабатывает при сабмите формы
	const onsubmit = (formData) => {
		props.login(formData.email, formData.password, formData.rememberMe);
	};
	
	if(props.isAuth) return <Redirect to={'profile'} />
	
	return (
		<div className={s.login}>
			<h3>Login</h3>
			<LoginReduxForm onSubmit={onsubmit} />
		</div>
	);
};

const mapStateToProps = (state) => ({
	isAuth: state.auth.isAuth
});

export default connect(mapStateToProps, {login})(Login);