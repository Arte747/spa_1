import React from 'react';
import s from './App.module.css';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import Profile from './components/Profile/Profile';
import Footer from './components/Footer/Footer';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import Test from './components/Test/Test';
import {Route} from 'react-router-dom';

const App = (props) => {
	return (
		<div className={s.wrapper}>
			<Header />
			<Navbar />
			<Route path="/profile" render={()=>
				<Profile profilePage={props.state.profilePage}
						 dispatch={props.dispatch}/>} />
				
			<Route path="/dialogs" render={()=>
				<DialogsContainer dialogs={props.state.dialogsPage.dialogs}
								  messages={props.state.dialogsPage.messages}
								  newMessageText={props.state.dialogsPage.newMessageText}
								  dispatch={props.dispatch}/>} />
						 
			<Route path="/test" component={Test} />
			
			<Footer />
		</div>
	);
};

export default App;