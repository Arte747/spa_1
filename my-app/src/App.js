import React from 'react';
import s from './App.module.css';
import Login from './components/Login/Login';
import HeaderContainer from './components/Header/HeaderContainer';
import Navbar from './components/Navbar/Navbar';
import ProfileContainer from './components/Profile/ProfileContainer';
import UsersContainer from './components/Users/UsersContainer';
import Footer from './components/Footer/Footer';
import Test from './components/Test/Test';
import {BrowserRouter, Route, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {initializeApp} from './redux/app-reducer';
import {compose} from 'redux';
import Preloader from './common/Preloader/Preloader';
// import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './redux/redux-store';
import {withSuspense} from './hoc/withSuspense';
// lazy
const DialogsContainer = React.lazy(() => import('././components/Dialogs/DialogsContainer'));

class App extends React.Component {
	
	catchAllUnhandledErrors = (reason, promise) => {
		alert("Some error occured");
	}
	
	componentDidMount() {
		this.props.initializeApp();
		window.addEventListener("unhandledrejection", this.catchAllUnhandledErrors);
		console.log('didMount');
	}
	
	// после размонтирования компонента, неоходимо отключить слушателя
	componentWillUnmount() {
		window.removeEventListener("unhandledrejection", this.catchAllUnhandledErrors);
		console.log('willUnmount');
	}

	render() {
		if(!this.props.initialized) return <Preloader />
		
		return (
			<div className={s.wrapper}>
				<HeaderContainer />
				<Navbar />
				<div className={s.content}>
					
					<Route path="/login" render={()=><Login />} />
					
					{/* ? означает, что параметр не обязателен */}
					<Route path="/profile/:userId?" render={()=><ProfileContainer />} />
					
					<Route path="/dialogs" render={withSuspense(DialogsContainer)} />
					
					<Route path="/users" render={()=><UsersContainer pageTitle={'Самурай'} />} />
								 
					<Route path="/test" component={Test} />
					<Route exact path="/" component={Test} />
				</div>
				
				<Footer />
			</div>
		);
	}
};

const mapStateToProps = (state) => ({
	initialized: state.app.initialized
});

let AppContainer =  compose(
	withRouter,
	connect(mapStateToProps, {initializeApp}))(App);

const JsApp = (props) => {
	return (
		<BrowserRouter>
			<Provider store={store}>
				<AppContainer />
			</Provider>
		</BrowserRouter>
	);
};

export default JsApp;