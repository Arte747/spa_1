import {combineReducers, createStore} from 'redux';
import profileReducers from './profile-reducer';
import dialogsReducers from './dialogs-reducer';
import testReducer from './test-reducer';

let reducers = combineReducers({
	profilePage: profileReducers,
	dialogsPage: dialogsReducers,
	testPage: testReducer
});

let store = createStore(reducers);

export default store;