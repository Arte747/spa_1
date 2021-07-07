import {getAuthUserData} from './auth-reducer';

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS';

export type initialStateType = {
	initialized: boolean
};

const initialState: initialStateType = {
	initialized: false
};

const appReducer = (state = initialState, action: any): initialStateType => {
	switch(action.type) {
		case INITIALIZED_SUCCESS:
			return {
				...state,
				initialized: true
			}
		
		default:
			return state;
	}
};

export default appReducer;

type initializedSuccessActionType = {
	type: typeof INITIALIZED_SUCCESS
};

const initializedSuccess = (): initializedSuccessActionType => ({type: INITIALIZED_SUCCESS});

export const initializeApp = () => (dispatch: Function) => {
	let promise = dispatch(getAuthUserData());
	Promise.all([promise])
		.then(() => {
			dispatch(initializedSuccess());
		});
	
}