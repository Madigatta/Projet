import { GET_ALL_PRODUCTS } from "../actions/actions-types";

const INITIAL_STATE = {
	productInfos: [],
};

const productReducer = (state = INITIAL_STATE, action) => {
	 console.log(action);
	switch (action.type) {
		case GET_ALL_PRODUCTS:
			return { ...state, productInfos: action.payload};
// no default
	}
	return state;
};

export default productReducer;
