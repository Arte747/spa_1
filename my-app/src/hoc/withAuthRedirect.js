import React from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

// hoc
// Это функция принимает компонент
// и возвращает его обернутым в контейнер с доп. поведением
export const withAuthRedirect = (Component) => {
	class RedirectComponent extends React.Component {
		render() {
			if(!this.props.isAuth) return <Redirect to={"/login"} />
			return <Component {...this.props} />
		}
	}
	
	const mapStateToPropsForRedirect = (state) => ({
		isAuth: state.auth.isAuth
	});
	
	let ConnectedAuthRedirectComponent = connect(mapStateToPropsForRedirect)(RedirectComponent);
	
	return ConnectedAuthRedirectComponent;
	
};