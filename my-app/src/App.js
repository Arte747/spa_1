import React from 'react';
import s from './App.module.css';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import Profile from './components/Profile/Profile';
import UsersContainer from './components/Users/UsersContainer';
import Footer from './components/Footer/Footer';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import Test from './components/Test/Test';
import {Route} from 'react-router-dom';

const App = (props) => {
	return (
		<div className={s.wrapper}>
			<Header />
			<Navbar />
			<div className={s.content}>
				<Route path="/profile" render={()=><Profile/>} />
				
				<Route path="/dialogs" render={()=><DialogsContainer />} />
				
				<Route path="/users" render={()=><UsersContainer />} />
							 
				<Route path="/test" component={Test} />
			</div>
			
			<Footer />
		</div>
	);
};

export default App;