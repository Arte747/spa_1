import React from 'react';
import s from './Login.module.css';
import {reduxForm, Field} from 'redux-form';

const Login = (props) => {
	
	const LoginForm = (props) => {
		return (
			// у любой формы есть событие onsubmit
			// ему доверяется обработка формы
			// при клике на кнопку не происходит перезагрузка страницы
			<form onSubmit={props.handleSubmit}>
				<div>
					<Field component={'input'} name={"login"} placeholder={"Login"} />
				</div>
				<div>
					<Field component={'input'} name={"password"} placeholder={"Password"} />
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