import React from 'react';
import s from './Login.module.css';
import {reduxForm, Field} from 'redux-form';
import {requireField, maxLengthCreator} from '../../utils/validators/validators';
import {Input, createField} from '../../common/FormsControls/FormsControls';
import {connect} from 'react-redux';
import {login} from '../../redux/auth-reducer';
import {Redirect} from 'react-router-dom';

const Login = ({handleSubmit, error, login, isAuth, captchaUrl}) => {
	
	let maxLength = maxLengthCreator(30);
	
	const LoginForm = ({handleSubmit, error}) => {
		return (
			// у любой формы есть событие onsubmit
			// ему доверяется обработка формы
			// при клике на кнопку не происходит перезагрузка страницы
			<form onSubmit={handleSubmit}>
				{createField(Input, "email", [requireField, maxLength], "Login")}
				
				{createField(Input, "password", [requireField, maxLength], "password", {type: "password"})}
				
				{createField(Input, "rememberMe", [], "", {type: "checkbox"}, 'remember me')}
				
				{captchaUrl ? <img src={captchaUrl} alt="captcha" /> : null}
				
				{captchaUrl ? createField(Input, "captcha", [requireField], "Введите символы на изображении", {}) : null}
				
				{error ? <div className={s.orerallError}>{error}</div> : null}
				<div>
					<button>Login</button>
				</div>
			</form>
		);
	};
	
	const LoginReduxForm = reduxForm({form: 'loginForm'})(LoginForm);
	
	// срабатывает при сабмите формы
	const onsubmit = (formData) => {
		login(formData.email, formData.password, formData.rememberMe, formData.captcha);
	};
	
	if(isAuth) return <Redirect to={'profile'} />
	
	return (
		<div className={s.login}>
			<h3>Login</h3>
			<LoginReduxForm onSubmit={onsubmit}
							captchaUrl={captchaUrl} />
		</div>
	);
};

const mapStateToProps = (state) => ({
	isAuth: state.auth.isAuth,
	captchaUrl: state.auth.captchaUrl
});

export default connect(mapStateToProps, {login, })(Login);