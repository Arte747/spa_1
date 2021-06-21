import React from 'react';
import s from './Login.module.css';
import {reduxForm, Field} from 'redux-form';
import {requireField, maxLengthCreator} from '../../utils/validators/validators';
import {Input} from '../../common/FormsControls/FormsControls';

const Login = (props) => {
	
	let maxLength = maxLengthCreator(5);
	
	const LoginForm = (props) => {
		return (
			// у любой формы есть событие onsubmit
			// ему доверяется обработка формы
			// при клике на кнопку не происходит перезагрузка страницы
			<form onSubmit={props.handleSubmit}>
				<div>
					<Field component={Input} name={"login"} validate={[requireField, maxLength]} placeholder={"Login"} />
				</div>
				<div>
					<Field component={Input} name={"password"} validate={[requireField, maxLength]} placeholder={"Password"} />
				</div>
				<div>
					<Field component={'input'} name={"rememberMe"} type={"checkbox"} />
				</div>
				<div>
					<button>Login</button>
				</div>
			</form>
		);
	};
	
	const LoginReduxForm = reduxForm({form: 'loginForm'})(LoginForm);
	
	// срабатывает при сабмите формы
	const onsubmit = (formData) => {
		console.log(formData);
	};
	
	return (
		<div className={s.login}>
			<h3>Login</h3>
			<LoginReduxForm onSubmit={onsubmit} />
		</div>
	);
};

export default Login;