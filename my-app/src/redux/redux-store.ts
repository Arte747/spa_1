import {combineReducers, createStore, applyMiddleware, compose} from 'redux';
import profileReducer from './profile-reducer';
import dialogsReducer from './dialogs-reducer';
import testReducer from './test-reducer';
import usersReducer from './users-reducer';
import authReducer from './auth-reducer';
import appReducer from './app-reducer';
import thunkMiddleware from 'redux-thunk';
import {reducer as formReducer} from 'redux-form';

let rootReducer = combineReducers({
	profilePage: profileReducer,
	dialogsPage: dialogsReducer,
	usersPage: usersReducer,
	testPage: testReducer,
	auth: authReducer,
	form: formReducer,
	app: appReducer
});

type RootReducerType = typeof rootReducer;
// определяем то что возвращает RootReducerType
// и фиксируем этот тип под именем AppStateType
export type AppStateType = ReturnType<RootReducerType> // ReturnType метод из typeScript

// это для объекта actions
// T extends если переданный тип T является объектом у которого
// [key: string] ключ типа строка
// infer U определи значение
// и верни значение U (U это actionCreator)
// в противном случаи ничего
type PropertiesTypes<T> = T extends {[key: string]: infer U} ? U : never;

export type InferActionsType<T extends {[key: string]: (...args: any[]) => any}> = ReturnType<PropertiesTypes<T>>

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)));



export default store;
// @ts-ignore
window.store = store;