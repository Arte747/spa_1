import React from 'react';
import s from './App.module.css';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import Profile from './components/Profile/Profile';
import Footer from './components/Footer/Footer';
import Dialogs from './components/Dialogs/Dialogs';
import Test from './components/Test/Test';
import {Route} from 'react-router-dom';

const App = (props) => {
	return (
		<div className={s.wrapper}>
			<Header />
			<Navbar />
			<Route path="/profile" component={Profile} />
			<Route path="/dialogs" component={Dialogs} />
			<Route path="/test" component={Test} />
			
			<Footer />
		</div>
	);
};

export default App;