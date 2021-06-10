import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom';

let postsData = [
		{id: 1, message: 'Hello world!'},
		{id: 2, message: 'Haw are you?'},
		{id: 3, message: 'Yo'},
		{id: 4, message: '!!!!!!!'},
		{id: 5, message: 'Hi'}
	];

let dialogsData = [
		{id: 1, name: 'Dimuch'},
		{id: 2, name: 'Sveta'},
		{id: 3, name: 'Andrew'},
		{id: 4, name: 'Stive'},
		{id: 5, name: 'Alex'}
	];
	
let messagesData = [
	{id: 1, message: 'Hello'},
	{id: 2, message: 'Haw are you?'},
	{id: 3, message: '=)))'},
	{id: 4, message: 'Go!!!!!!'},
	{id: 5, message: 'Let go to the movi!'}
];

ReactDOM.render(
  <React.StrictMode>
	<BrowserRouter>
		<App posts={postsData} dialogs={dialogsData} messages={messagesData} />
	</BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
