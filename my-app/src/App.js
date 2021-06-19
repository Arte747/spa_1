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
import {Route} from 'react-router-dom';

const App = (props) => {
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
};

export default App;