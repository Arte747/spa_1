import {combineReducers, createStore, applyMiddleware} from 'redux';
import profileReducer from './profile-reducer';
import dialogsReducer from './dialogs-reducer';
import testReducer from './test-reducer';
import usersReducer from './users-reducer';
import authReducer from './auth-reducer';
import appReducer from './app-reducer';
import thunkMiddleware from 'redux-thunk';
import {reducer as formReducer} from 'redux-form';

let reducers = combineReducers({
	profilePage: profileReducer,
	dialogsPage: dialogsReducer,
	usersPage: usersReducer,
	testPage: testReducer,
	auth: authReducer,
	form: formReducer,
	app: appReducer
	
	
});

let store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;

window.store = store;