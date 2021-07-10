import React from 'react';
import s from './Login.module.css';
import {reduxForm, Field, InjectedFormProps} from 'redux-form';
import {requireField, maxLengthCreator} from '../../utils/validators/validators';
import {Input, createField} from '../../common/FormsControls/FormsControls';
import {connect} from 'react-redux';
import {login} from '../../redux/auth-reducer';
import {Redirect} from 'react-router-dom';
import {AppStateType} from '../../redux/redux-store';

let maxLength = maxLengthCreator(30);

type LoginFormOwnProps = {
	captchaUrl: string | null
}

// InjectedFormProps<LoginFormValuesType> заимжекченные свойства
// LoginFormOwnProps собственные свойства
const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType, LoginFormOwnProps> & LoginFormOwnProps> = ({handleSubmit, error, captchaUrl}) => {
	return (
		// у любой формы есть событие onsubmit
		// ему доверяется обработка формы
		// при клике на кнопку не происходит перезагрузка страницы
		<form onSubmit={handleSubmit}>
			{createField<LoginFormValuesTypeKeys>(Input, "email", [requireField, maxLength], "Login")}
			
			{createField<LoginFormValuesTypeKeys>(Input, "password", [requireField, maxLength], "password", {type: "password"})}
			
			{createField<LoginFormValuesTypeKeys>(Input, "rememberMe", [], undefined, {type: "checkbox"}, 'remember me')}
			
			{captchaUrl ? <img src={captchaUrl} alt="captcha" /> : null}
			
			{captchaUrl ? createField<LoginFormValuesTypeKeys>(Input, "captcha", [requireField], "Введите символы на изображении", {}) : null}
			
			{error ? <div className={s.orerallError}>{error}</div> : null}
			<div>
				<button>Login</button>
			</div>
		</form>
	);
};

// указываем какую компоненту мы отдаем redux-form
const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnProps>({form: 'loginForm'})(LoginForm);

type MapStatePropsType = {
	isAuth: boolean
	captchaUrl: string | null
}

type MapDispatchPropsType = {
	login: (email: string, password: string, rememberMe: boolean, captcha: string) => void
}


// тип для данных для onsubmit
type LoginFormValuesType = {
	email: string
	password: string
	rememberMe: boolean
	captcha: string
}

type LoginFormValuesTypeKeys = Extract<keyof LoginFormValuesType, string>;


const Login: React.FC<MapStatePropsType & MapDispatchPropsType> = (props) => {
	
	// срабатывает при сабмите формы
	const onsubmit = (formData: LoginFormValuesType) => {
		props.login(formData.email, formData.password, formData.rememberMe, formData.captcha);
	};
	
	if(props.isAuth) return <Redirect to={'profile'} />
	
	return (
		<div className={s.login}>
			<h3>Login</h3>
			<LoginReduxForm onSubmit={onsubmit}
							captchaUrl={props.captchaUrl} />
		</div>
	);
};

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
	isAuth: state.auth.isAuth,
	captchaUrl: state.auth.captchaUrl
});

export default connect(mapStateToProps, {login})(Login);