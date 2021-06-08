import React from 'react';
import s from './App.module.css';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import Profile from './components/Profile/Profile';
import Footer from './components/Footer/Footer';
import Dialogs from './components/Dialogs/Dialogs';

const App = (props) => {
	return (
		<div className={s.wrapper}>
			<Header />
			<Navbar />
			{/*<Profile />*/}
			<Dialogs />
			<Footer />
		</div>
	);
};

export default App;