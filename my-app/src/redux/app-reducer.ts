import {getAuthUserData} from './auth-reducer';
import {InferActionsTypes} from './redux-store';


const initialState = {
	initialized: false
};

export type initialStateType = typeof initialState;
// автоматически выводим тип для экшенов
type ActionsType = InferActionsTypes<typeof actions>

const appReducer = (state = initialState, action: ActionsType): initialStateType => {
	switch(action.type) {
		case 'INITIALIZED_SUCCESS':
			return {
				...state,
				initialized: true
			}
		
		default:
			return state;
	}
};

export default appReducer;


const actions = {
	initializedSuccess: () =>({type: 'INITIALIZED_SUCCESS'} as const)
}



export const initializeApp = () => (dispatch: Function) => {
	let promise = dispatch(getAuthUserData());
	Promise.all([promise])
		.then(() => {
			dispatch(actions.initializedSuccess());
		});
	
}