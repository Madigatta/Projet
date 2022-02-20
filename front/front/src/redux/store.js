import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import cartReducer from "./reducers/cartReducer" 
import productReducer from "./reducers/productReducer" 
import userReducer from "./reducers/userReducer" 

const composedEnhancer = composeWithDevTools(applyMiddleware(thunk));

const reducers = combineReducers({
	userReducer,
	productReducer,
	cartReducer,
});

const store = createStore(reducers, {}, composedEnhancer);

export default store;
