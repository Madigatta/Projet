import { CONNECT_USER, LOGOUT_USER } from "../actions/actions-types";

const INITIAL_STATE = {
	userInfos: null,
	isLogged: false,
};

const userReducer = (state = INITIAL_STATE, action) => {
	console.log(action);
	switch (action.type) {
		case CONNECT_USER:
			return { ...state, userInfos: action.payload, isLogged: true };

		case LOGOUT_USER:
			return INITIAL_STATE;

			// no default
	}
	return state;
};

export default userReducer;
