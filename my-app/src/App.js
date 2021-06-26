import React from 'react';
import s from './App.module.css';
import Login from './components/Login/Login';
import HeaderContainer from './components/Header/HeaderContainer';
import Navbar from './components/Navbar/Navbar';
import ProfileContainer from './components/Profile/ProfileContainer';
import UsersContainer from './components/Users/UsersContainer';
import Footer from './components/Footer/Footer';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import Test from './components/Test/Test';
import {Route, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {initializeApp} from './redux/app-reducer';
import {compose} from 'redux';
import Preloader from './common/Preloader/Preloader';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './redux/redux-store';

class App extends React.Component {
	
	componentDidMount() {
		this.props.initializeApp();
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
					
					<Route path="/dialogs" render={()=><DialogsContainer />} />
					
					<Route path="/users" render={()=><UsersContainer />} />
								 
					<Route path="/test" component={Test} />
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