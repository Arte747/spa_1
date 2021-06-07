import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import Profile from './components/Profile/Profile';
import Footer from './components/Footer/Footer';

const App = (props) => {
	return (
		<div className='wrapper'>
			<Header />
			<Navbar />
			<div className='content'>
				<Profile />
			</div>
			<Footer />
		</div>
	);
};

export default App;